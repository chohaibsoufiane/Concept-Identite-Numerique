const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

app.whenReady().then(async () => {
  // Create sanitized temp SVGs
  const svg1 = fs.readFileSync('assets/schematic_reaction_pierre.svg', 'utf8').replace(/&bull;/g, '&#8226;');
  const svg2 = fs.readFileSync('assets/schematic_principe_planographique.svg', 'utf8').replace(/&bull;/g, '&#8226;');
  
  fs.writeFileSync('assets/temp_reaction_test.svg', svg1);
  fs.writeFileSync('assets/temp_planographique_test.svg', svg2);

  const testHtml = `
  <!DOCTYPE html>
  <html>
  <body>
    <img id="img1" src="assets/temp_reaction_test.svg" onerror="this.dataset.failed = 'true'">
    <img id="img2" src="assets/temp_planographique_test.svg" onerror="this.dataset.failed = 'true'">
  </body>
  </html>
  `;
  fs.writeFileSync('temp_svg_test.html', testHtml);

  const win = new BrowserWindow({ show: false });
  await win.loadURL('file://' + path.resolve('temp_svg_test.html').replace(/\\/g, '/'));
  await new Promise(r => setTimeout(r, 1000));

  const result = await win.webContents.executeJavaScript(`
    (() => {
      const i1 = document.getElementById('img1');
      const i2 = document.getElementById('img2');
      return {
        img1: { complete: i1.complete, width: i1.naturalWidth, height: i1.naturalHeight, failed: i1.dataset.failed || 'false' },
        img2: { complete: i2.complete, width: i2.naturalWidth, height: i2.naturalHeight, failed: i2.dataset.failed || 'false' }
      };
    })()
  `);

  console.log('--- SANITIZED SVG ELECTRON RENDER RESULT ---');
  console.log(JSON.stringify(result, null, 2));

  // Clean up test files
  fs.unlinkSync('assets/temp_reaction_test.svg');
  fs.unlinkSync('assets/temp_planographique_test.svg');
  fs.unlinkSync('temp_svg_test.html');

  app.quit();
});
