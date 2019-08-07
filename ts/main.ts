import {app, BrowserWindow} from 'electron';

let win: BrowserWindow;

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile(`${__dirname}/../main.html`);

    win.on('closed', () => {
        win = null;
    });

    win.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})