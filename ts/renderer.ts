import { ipcRenderer } from "electron";

console.log('renderer code activated')

ipcRenderer.on('slipgate', (event, arg) => {
    console.log(event)
    console.log(arg)
})

// ipcRenderer.send('slipgate', 'ready');