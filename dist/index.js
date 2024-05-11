"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var systemInfo_1 = require("./src/systemInfo");
electron_1.app.whenReady().then(systemInfo_1.startSystemInfoUpdates);
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        (0, systemInfo_1.startSystemInfoUpdates)();
    }
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
