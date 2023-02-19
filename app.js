const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const { Collection } = require('./src/collection');
const { Velocidade } = require('./src/velocidade');

// import { app, BrowserWindow, screen } from 'electron'
// import path from 'path'
// import { exec } from 'child_process'

var historico = new Collection();
var mainWindow = null;

async function createWindow() {
    mainWindow = new BrowserWindow({
        // width: 390,
        // height: 190,
        width: 1280,
        height: 940,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: true,
        transparent: true,
        resizable: true
    });

    await mainWindow.loadFile('./src/pages/details.html');

    mainWindow.on('will-move', function(event, rect) {
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;

        rect.height + rect.y > height && event.preventDefault()
        rect.width + rect.x > width && event.preventDefault()
    });

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    getVelocity();
    setInterval(getVelocity, 20000);
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

function getVelocity() {
    exec("fast --upload --json", (err, stdout, stderr) => {
        if (err) {
            console.log(`Error Occured: ${err.message}`);
            return;
        }
    
        if (stderr) {
            console.log(`Stderr: ${stderr}`);
            return;
        }

        let output = JSON.parse(stdout);
        let download = `${output.downloadSpeed} Mbps`;
        let upload = `${output.uploadSpeed} Mbps`;
        
        // console.log(`Download: ${download}  || Upload: ${upload}`);

        let velocidade = new Velocidade(
            output.downloadSpeed,
            output.uploadSpeed,
            new Date,
        );

        historico.add(velocidade);
        mainWindow.webContents.send('set-velocity', velocidade);
    });
}
