import { app, BrowserWindow, ipcMain } from 'electron';
import { promises as fs } from 'fs'
import * as parser from 'fast-xml-parser'

import fetch from 'node-fetch';

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

    const dbFile = `${app.getPath('cache')}/slipgate/database.xml`
    const dbUrl = 'https://www.quaddicted.com/reviews/quaddicted_database.xml'
    const dateFile = `${app.getPath('cache')}/slipgate/date.txt`

    await fs.mkdir(`${app.getPath('cache')}/slipgate`, { recursive: true })

    const headerResponse = await fetch(
        'https://www.quaddicted.com/reviews/quaddicted_database.xml',
        { 'method': 'HEAD' }
    );
    const upstreamModified = new Date(headerResponse.headers.get('date') || "")

    let needFetch = false;

    try {
        await fs.access(dateFile)
    }
    catch
    {
        needFetch = true
    }

    try {
        fs.access(dbFile)
    }
    catch
    {
        needFetch = true
    }

    const lastModified = new Date(await fs.readFile(dateFile).toString())

    if (lastModified < upstreamModified) {
        needFetch = true
    }

    const response = await fetch(dbUrl)
    const text = await response.text()
    await fs.writeFile(dbFile, text)
    await fs.writeFile(dateFile, headerResponse.headers.get('date'))

    const buffer = await fs.readFile(dbFile)
    const xml = await buffer.toString()
    /*
    One map looks like this:
    {
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
    console.log(parser.parse(xml)['files']['file'][0])
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

