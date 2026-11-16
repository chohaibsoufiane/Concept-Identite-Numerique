const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const htmlUrl = 'file://' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  await win.loadURL(htmlUrl);
  await new Promise(r => setTimeout(r, 1000));

  const layoutReport = await win.webContents.executeJavaScript(`
    (() => {
      const results = [];
      const boxes = document.querySelectorAll('.plate-img-box');
      
      boxes.forEach((box, i) => {
        const slide = box.closest('.slide');
        const img = box.querySelector('img');
        const fallback = box.querySelector('.plate-fallback');
        
        // Initial state
        const initialBoxRect = box.getBoundingClientRect();
        const initialImgDisplay = window.getComputedStyle(img).display;
        const initialFbDisplay = window.getComputedStyle(fallback).display;

        // Force fallback if not already active
        img.dispatchEvent(new Event('error'));
        
        const fallbackBoxRect = box.getBoundingClientRect();
        const fallbackImgDisplay = window.getComputedStyle(img).display;
        const fallbackFbDisplay = window.getComputedStyle(fallback).display;
        
        const fallbackInner = {
          hasGlyph: !!fallback.querySelector('span'),
          hasStrong: !!fallback.querySelector('strong'),
          hasSmall: !!fallback.querySelector('small'),
          smallText: fallback.querySelector('small') ? fallback.querySelector('small').textContent : ''
        };

        const widthDelta = Math.abs(initialBoxRect.width - fallbackBoxRect.width);
        const heightDelta = Math.abs(initialBoxRect.height - fallbackBoxRect.height);

        results.push({
          slideId: slide ? slide.id : 'unknown',
          boxIndex: i,
          initialBox: { width: initialBoxRect.width, height: initialBoxRect.height },
          fallbackBox: { width: fallbackBoxRect.width, height: fallbackBoxRect.height },
          layoutShift: widthDelta > 1 || heightDelta > 1,
          widthDelta,
          heightDelta,
          initialImgDisplay,
          initialFbDisplay,
          fallbackImgDisplay,
          fallbackFbDisplay,
          fallbackInner
        });
      });
      return results;
    })()
  `);

  console.log('--- FALLBACK LAYOUT SIMULATION REPORT ---');
  console.log(JSON.stringify(layoutReport, null, 2));
  app.quit();
});
