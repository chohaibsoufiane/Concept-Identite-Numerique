const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  await win.loadURL('about:blank');

  const svgs = [
    'assets/schematic_reaction_pierre.svg',
    'assets/schematic_principe_planographique.svg'
  ];

  console.log('--- TESTING CHROMIUM DOMParser ON PROJECT SVGS ---');
  let allClean = true;

  for (const relPath of svgs) {
    const fullPath = path.resolve(__dirname, '..', relPath);
    const content = fs.readFileSync(fullPath, 'utf8');

    const result = await win.webContents.executeJavaScript(`
      (() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(${JSON.stringify(content)}, 'image/svg+xml');
        const pErr = doc.querySelector('parsererror');
        return {
          hasError: !!pErr,
          errorText: pErr ? pErr.textContent : null,
          rootTag: doc.documentElement ? doc.documentElement.tagName : null
        };
      })()
    `);

    console.log(`[SVG] ${relPath}:`);
    console.log(`  Root Tag: ${result.rootTag}`);
    console.log(`  ParserError: ${result.hasError ? result.errorText : 'NONE (VALID XML)'}`);
    if (result.hasError) allClean = false;
  }

  // Adversarial check: What if an SVG contains &bull; ?
  const poisonedSvg = '<svg xmlns="http://www.w3.org/2000/svg"><text>&bull;</text></svg>';
  const poisonResult = await win.webContents.executeJavaScript(`
    (() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(${JSON.stringify(poisonedSvg)}, 'image/svg+xml');
      const pErr = doc.querySelector('parsererror');
      return {
        hasError: !!pErr,
        errorText: pErr ? pErr.textContent : null
      };
    })()
  `);
  console.log('--- ADVERSARIAL ORACLE VERIFICATION (&bull; injection) ---');
  console.log(`  Poisoned SVG has parsererror: ${poisonResult.hasError}`);
  console.log(`  Error message snippet: ${poisonResult.errorText ? poisonResult.errorText.slice(0, 100) : 'none'}`);

  const passed = allClean && poisonResult.hasError;
  console.log('--- OVERALL SVG CHROMIUM DOMPARSER TEST RESULT ---');
  console.log('SUCCESS:', passed);

  app.quit();
  process.exit(passed ? 0 : 1);
});
