"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var createWindow = function () {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600
    });
    win.loadFile('./frontend/pages/index.html');
};
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
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
