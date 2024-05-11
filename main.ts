import { app, BrowserWindow } from 'electron'

let win

app.on('ready', () => {
  win = new BrowserWindow({
    darkTheme: true
  })
  win.setBounds({
    x: 0,
    y: 0,
    width: 800,
    heigth: 600,
  })

  win.loadFile('./frontend/pages/index.html')

  app.setMaxListeners(10)
  app.setBadgeCount(1)
})

// import { startSystemInfoUpdates } from './src/systemInfo';

// app.whenReady().then(startSystemInfoUpdates);

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     startSystemInfoUpdates();
//   }
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });
