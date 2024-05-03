const { app, BrowserWindow, screen } = require('electron')
const { Collection } = require('./src/models/collection')
const { Velocidade } = require('./src/models/velocidade')
const { OperatingSystem } = require('./src/models/operating-system')
const { FastCli } = require('./src/models/fast-cli')


const defaultWidth = 735;
const defaultHeight = 375;
const defaultConsultInternetVelocity = 5 * 60
const defaultGetInfoSystem = 1.5

var historico = new Collection()
var operatingSystem = new OperatingSystem()
var fastCli = new FastCli()
var mainWindow = null

async function createWindow() {
    var displays = screen.getAllDisplays()
    var externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
    })

    mainWindow = new BrowserWindow({
        width: defaultWidth,
        height: defaultHeight,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: false,
        transparent: true,
        resizable: false,
        x: externalDisplay.bounds.x + (externalDisplay.bounds.width - defaultWidth),
        y: externalDisplay.bounds.y + (externalDisplay.bounds.height - defaultHeight - 50)
    });

    await mainWindow.loadFile('./src/pages/details.html')

    mainWindow.on('will-move', function(event, rect) {
        const { width, height } = externalDisplay.workAreaSize

        rect.y === 0 && event.preventDefault()
        rect.x === 0 && event.preventDefault()
        rect.height + rect.y > height && event.preventDefault()
        rect.width + rect.x > width && event.preventDefault()
    });

    mainWindow.setMinimizable(false)

    // mainWindow.webContents.openDevTools()
}



app.whenReady()
.then(() => {
    createWindow()

    getVelocity()
    getOperatingSystemInfo()
    
    setInterval(getVelocity, defaultConsultInternetVelocity * 1000)
    setInterval(getOperatingSystemInfo, defaultGetInfoSystem * 1000)
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

async function getVelocity() {
    let output = await fastCli.consultVelocity()

    let velocidade = new Velocidade(
        output.downloadSpeed,
        output.uploadSpeed,
        new Date,
    );

    historico.add(velocidade);
    mainWindow.webContents.send('set-velocity', velocidade)
    mainWindow.webContents.send('set-history', historico)
}

function getOperatingSystemInfo() {
    operatingSystem.updateFreeMemory()
    mainWindow.webContents.send('set-cpu', operatingSystem);
}
