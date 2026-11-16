const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[CONSOLE]: ${message} (${sourceId}:${line})`);
  });

  const svgUrl = 'file:///' + path.resolve('assets/schematic_reaction_pierre.svg').replace(/\\/g, '/');
  console.log('Loading SVG URL:', svgUrl);
  try {
    await win.loadURL(svgUrl);
  } catch (err) {
    console.log('loadURL error:', err);
  }

  const title = await win.webContents.executeJavaScript('document.title');
  const body = await win.webContents.executeJavaScript('document.body ? document.body.innerHTML : document.documentElement.outerHTML');
  console.log('Title:', title);
  console.log('Body snippet:', body.slice(0, 500));

  app.quit();
});
