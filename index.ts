import { app, BrowserWindow } from 'electron';
import { startSystemInfoUpdates } from './src/systemInfo';

app.whenReady().then(startSystemInfoUpdates);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    startSystemInfoUpdates();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
