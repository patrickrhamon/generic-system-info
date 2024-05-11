import { createMainWindow, getMainWindow } from './mainWindow';
import { Memory } from './models/Memory';
import { CPU } from './models/Cpu';

const defaultGetInfoSystem = 1.5;

export async function startSystemInfoUpdates() {
  await createMainWindow();
  setInterval(updateOperatingSystemInfo, defaultGetInfoSystem * 1000);
}

async function updateOperatingSystemInfo() {
  const mainWindow = getMainWindow();
  if (!mainWindow) return;

  const memoryInfo = await getMemoryInfo();
  const cpuInfo = await getCPUInfo();

  mainWindow.webContents.send('set-memory', memoryInfo);
  mainWindow.webContents.send('set-cpu', cpuInfo);
}

async function getMemoryInfo() {
  // Implemente a lógica para obter as informações de memória
  return (new Memory()).updateMemoryInfo();
}

async function getCPUInfo() {
  // Implemente a lógica para obter as informações da CPU
  return (new CPU()).updateCPUInfo();
}
