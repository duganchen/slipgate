import { app, BrowserWindow, ipcMain } from 'electron';
import { promises as fs, readFile } from 'fs'
import * as parser from 'fast-xml-parser'
import fetch from 'node-fetch'

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile(`${__dirname}/../index.html`);

    win.on('closed', () => {
        win = null;
    });

    win.webContents.openDevTools();
};

app.on('ready', async () => {
    createWindow();

    const dbFile = `${app.getPath('cache')}/slipgate/database.json`

    const dbUrl = 'https://www.quaddicted.com/reviews/quaddicted_database.xml'
    const dateFile = `${app.getPath('cache')}/slipgate/date.txt`

    await fs.mkdir(`${app.getPath('cache')}/slipgate`, { recursive: true })

    let lastModified: Date

    try {
        const lastStampPromise = await fs.readFile(dateFile)
        lastModified = new Date(await lastStampPromise.toString())
    } catch {
        lastModified = new Date(0)
    }

    const headerResponse = await fetch(
        'https://www.quaddicted.com/reviews/quaddicted_database.xml',
        { 'method': 'HEAD' }
    );
    const dateHeader: string = headerResponse.headers.get('date') || ""
    const upstreamModified = new Date(dateHeader)

    await fs.writeFile(dateFile, dateHeader)

    let dbExists: boolean = true
    try {
        await fs.access(dbFile)
    } catch {
        dbExists = false
    }

    if ((lastModified < upstreamModified) || !dbExists) {
        const response = await fetch(dbUrl)
        const xml = await response.text()
        await fs.writeFile(dbFile, xml)
    }

    const xmlPromise = await fs.readFile(dbFile)
    const xml = await xmlPromise.toString()
    const dbObj = parser.parse(xml, { ignoreAttributes: false })
    const maps = dbObj['files']['file']

    /* A sample map looks like this:

    {
  '@_id': '1000cuts1a',
  '@_type': '2',
  '@_rating': '5',
  author: 'sock',
  title: 'One Thousand Cuts',
  md5sum: '8e03d6c9202136c89d99707ab97a1020',
  size: 10396,
  date: '15.08.14',
  description: "Expanded standalone version of sock's map from <a " +
    'href="func_mapjam2.html">Func Map Jam 2</a>: a medium-sized, ' +
    'IKblue-themed, partially ruined temple with two individual ' +
    'routes for replayablility. It comes with a set of ' +
    'medieval-style item boxes.',
  techinfo: {
    zipbasedir: '1000cuts/',
    commandline: '-game 1000cuts',
    startmap: 'start'
  }
}
*/
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

