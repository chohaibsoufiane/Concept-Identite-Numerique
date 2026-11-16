/**
 * @file scripts/run-electron.cjs
 * @project Concept d'Identité Numérique (INFO208)
 * @author Chohaib Soufiane <chohaibsoufiane@gmail.com>
 * @repository https://github.com/chohaibsoufiane/Concept-Identite-Numerique
 */

const { spawn } = require('child_process');
const electronPath = require('electron');
const path = require('path');

let child;

if (process.platform === 'win32') {
  // On Windows, running inside IDE integrated terminals (such as Antigravity or VS Code ConPTY)
  // runs processes inside an isolated sandbox virtual desktop (e.g. exebox-...).
  // This launcher explicitly connects the Electron GUI window to the interactive desktop (winsta0\default)
  // so the window physically renders on the user's primary monitor.
  const appRoot = path.resolve(__dirname, '..');
  const launcherScript = path.resolve(__dirname, 'launch-electron-desktop.ps1');

  child = spawn('powershell.exe', [
    '-NoProfile',
    '-NonInteractive',
    '-ExecutionPolicy', 'Bypass',
    '-File', launcherScript,
    '-ElectronPath', electronPath,
    '-ProjectDir', appRoot
  ], {
    stdio: 'inherit',
    windowsHide: false
  });
} else {
  child = spawn(electronPath, ['.'], {
    stdio: 'inherit'
  });
}

child.on('exit', (code) => {
  process.exit(code !== null ? code : 0);
});

child.on('error', (err) => {
  console.error('Failed to start Electron process:', err);
  process.exit(1);
});
