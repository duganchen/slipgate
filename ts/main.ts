import { app, BrowserWindow, ipcMain } from 'electron';
import { promises as fs } from 'fs'
import * as xml2js from 'xml2js'
import * as util from 'util'

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

    const parser = new xml2js.Parser()
    const buffer = await fs.readFile(dbFile)
    const xml = await buffer.toString()
    parser.parseString(xml, (err: any, data: any) => {
        console.log(util.inspect(data, false, null))
    })
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

