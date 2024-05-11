import { BrowserWindow, screen } from 'electron';

const defaultWidth = 735;
const defaultHeight = 375;

let mainWindow: BrowserWindow | null = null;

export async function createMainWindow() {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find(display => display.bounds.x !== 0 || display.bounds.y !== 0);

  mainWindow = new BrowserWindow({
    width: defaultWidth,
    height: defaultHeight,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    transparent: true,
    resizable: true,
    x: externalDisplay ? externalDisplay?.bounds.x + (externalDisplay?.bounds.width - defaultWidth) : undefined,
    y: externalDisplay ? externalDisplay?.bounds.y + (externalDisplay?.bounds.height - defaultHeight - 50) : undefined
  });

  await mainWindow.loadFile('./src/pages/details.html');

  mainWindow.on('will-move', (event, rect) => {
    const { width, height } = externalDisplay?.workAreaSize || { width: 0, height: 0 };

    rect.y === 0 && event.preventDefault();
    rect.x === 0 && event.preventDefault();
    rect.height + rect.y > height && event.preventDefault();
    rect.width + rect.x > width && event.preventDefault();
  });

  mainWindow.setMinimizable(true);
}

export function getMainWindow() {
  return mainWindow;
}
