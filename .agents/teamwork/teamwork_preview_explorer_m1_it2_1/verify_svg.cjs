const { app, BrowserWindow } = require('electron');
const fs = require('fs');
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

  const assetDir = path.resolve(__dirname, '../../../assets');
  const raw1 = fs.readFileSync(path.join(assetDir, 'schematic_reaction_pierre.svg'), 'utf8');
  const raw2 = fs.readFileSync(path.join(assetDir, 'schematic_principe_planographique.svg'), 'utf8');

  const fix1 = raw1.replace(/&bull;/g, '&#8226;');
  const fix2 = raw2.replace(/&bull;/g, '&#8226;');

  const tempSvg1 = path.join(assetDir, 'temp_verify_reaction.svg');
  const tempSvg2 = path.join(assetDir, 'temp_verify_planographique.svg');

  fs.writeFileSync(tempSvg1, fix1, 'utf8');
  fs.writeFileSync(tempSvg2, fix2, 'utf8');

  // Create temporary test HTML mimicking index.html's .plate-img-box
  const tempHtmlPath = path.resolve(__dirname, 'temp_test_render.html');
  const testHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="../../../style.css">
  </head>
  <body>
    <div class="deck">
      <div class="plate-img-box" id="box1" style="width: 480px; height: 320px; position: relative;">
        <img src="../../../assets/temp_verify_reaction.svg" alt="Schéma Reaction Pierre" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="plate-fallback" style="display: none;">
          <span>📐</span>
          <strong>COUPE MICROSTRUCTURELLE DU CALCAIRE</strong>
          <small>assets/schematic_reaction_pierre.svg</small>
        </div>
      </div>

      <div class="plate-img-box" id="box2" style="width: 480px; height: 320px; position: relative;">
        <img src="../../../assets/temp_verify_planographique.svg" alt="Schéma Principe Planographique" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="plate-fallback" style="display: none;">
          <span>⚖️</span>
          <strong>PRINCIPE PLANOGRAPHIQUE & ANTAGONISME</strong>
          <small>assets/schematic_principe_planographique.svg</small>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  fs.writeFileSync(tempHtmlPath, testHtml, 'utf8');

  await win.loadURL('file://' + tempHtmlPath.replace(/\\/g, '/'));
  await new Promise(r => setTimeout(r, 1000));

  const renderStats = await win.webContents.executeJavaScript(`
    (() => {
      const boxes = [document.getElementById('box1'), document.getElementById('box2')];
      return boxes.map((box, idx) => {
        const img = box.querySelector('img');
        const fallback = box.querySelector('.plate-fallback');
        return {
          boxIndex: idx + 1,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          imgDisplay: window.getComputedStyle(img).display,
          fallbackDisplay: window.getComputedStyle(fallback).display,
          imgRect: img.getBoundingClientRect(),
          fallbackRect: fallback.getBoundingClientRect()
        };
      });
    })()
  `);

  console.log('--- LIVE RENDER IN CHROMIUM VIA IMG TAG ---');
  console.log(JSON.stringify(renderStats, null, 2));

  // Clean up temp files
  try { fs.unlinkSync(tempSvg1); } catch (e) {}
  try { fs.unlinkSync(tempSvg2); } catch (e) {}
  try { fs.unlinkSync(tempHtmlPath); } catch (e) {}

  app.quit();
});
