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

  const htmlUrl = 'file://' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  console.log('Loading URL:', htmlUrl);
  await win.loadURL(htmlUrl);

  // Give resources time to load/render
  await new Promise(r => setTimeout(r, 1000));

  const result = await win.webContents.executeJavaScript(`
    (() => {
      const imgs = Array.from(document.querySelectorAll('.plate-img-box img'));
      return imgs.map(img => {
        const fallback = img.nextElementSibling;
        return {
          src: img.getAttribute('src'),
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          imgDisplay: window.getComputedStyle(img).display,
          fallbackDisplay: fallback ? window.getComputedStyle(fallback).display : 'none'
        };
      });
    })()
  `);

  console.log('--- IMAGES STATUS IN ELECTRON ---');
  console.log(JSON.stringify(result, null, 2));

  // Check console messages / errors
  app.quit();
});
