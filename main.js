/**
 * @file main.js
 * @project Concept d'Identité Numérique
 * @module INFO208 (Classe 108)
 * @supervisor Mme Batioui
 *
 * @author Chohaib Soufiane <chohaibsoufiane@gmail.com> (Lead Developer)
 * @repository https://github.com/chohaibsoufiane/Concept-Identite-Numerique
 *
 * @team
 *   - Mohammed Badaoui
 *   - Mehdi El Bouazizi
 *   - Youssef El Mekkaoui
 *   - Chohaib Soufiane
 *   - Rayane El Makhloufi
 *   - Mhaitate Aymen
 *
 * @contributors
 *   - Oualid Driwch
 *   - Abdllah Amhil
 *   - Bafrij Ilyass
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
    title: 'Concept : Identité Numérique',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.setMenu(null);
  win.loadFile('index.html');

  // Hot Reload (Ctrl+F5)
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'f5') {
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
