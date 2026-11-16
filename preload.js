/**
 * @file preload.js
 * @project Concept d'Identité Numérique (INFO208)
 * @author Chohaib Soufiane <chohaibsoufiane@gmail.com>
 * @repository https://github.com/chohaibsoufiane/Concept-Identite-Numerique
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  toggleFullScreen: () => ipcRenderer.send('window-fullscreen')
});
