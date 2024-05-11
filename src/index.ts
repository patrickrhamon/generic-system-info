import {app, ipcMain, BrowserWindow} from 'electron'

let mainWindow: BrowserWindow

app.on('ready', createWindows)

function createWindows(): void {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: __dirname + '/preload.js',
            nodeIntegration: true
        },
        show: false
    })

    mainWindow.loadFile("./pages/index.html")
    mainWindow.on("ready-to-show", () => mainWindow.show())
}