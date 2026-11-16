/**
 * @file main.js
 * @project Production des Formes Imprimantes — Les Plaques Offset
 * @module Procédés d'Impression Offset
 *
 * @team
 *   - Mohammed Badaoui
 *   - Abdelhafide Elhouate
 *   - Amine Amal
 *   - Chohaib Soufiane
 *   - Rayane El Makhloufi
 *   - Mhaitate Aymen
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 640,
    frame: false,
    backgroundColor: '#090a10',
    title: 'Production des Formes Imprimantes — Les Plaques Offset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.setMenu(null);
  win.loadFile('index.html');

  // Hot Reload (F5, Ctrl+F5, Ctrl+R)
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key.toLowerCase() === 'f5' || (input.control && input.key.toLowerCase() === 'r')) {
      win.webContents.reloadIgnoringCache();
      event.preventDefault();
    }
  });

  ipcMain.on('window-minimize', () => {
    win.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('window-close', () => {
    win.close();
  });

  ipcMain.on('window-fullscreen', () => {
    win.setFullScreen(!win.isFullScreen());
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
