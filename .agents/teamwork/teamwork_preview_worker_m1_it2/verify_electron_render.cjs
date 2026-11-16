const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const indexPath = path.resolve(__dirname, '../../../index.html');
  await win.loadFile(indexPath);
  await new Promise(r => setTimeout(r, 1200));

  const stats = await win.webContents.executeJavaScript(`
    (() => {
      const boxes = Array.from(document.querySelectorAll('.plate-img-box'));
      return boxes.map((box, i) => {
        const img = box.querySelector('img');
        const fallback = box.querySelector('.plate-fallback');
        return {
          index: i + 1,
          src: img ? img.getAttribute('src') : null,
          complete: img ? img.complete : null,
          naturalWidth: img ? img.naturalWidth : 0,
          naturalHeight: img ? img.naturalHeight : 0,
          imgDisplay: img ? window.getComputedStyle(img).display : null,
          fallbackDisplay: fallback ? window.getComputedStyle(fallback).display : null
        };
      });
    })()
  `);

  console.log('--- ACTUAL INDEX.HTML LIVE RENDER IN ELECTRON ---');
  console.log(JSON.stringify(stats, null, 2));

  const allPassed = stats.length > 0 && stats.every(s => s.complete && s.naturalWidth > 0 && s.fallbackDisplay === 'none');
  console.log('VERIFICATION SUCCESS:', allPassed);

  app.quit();
  process.exit(allPassed ? 0 : 1);
});
