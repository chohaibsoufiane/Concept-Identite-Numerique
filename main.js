'use strict';

/**
 * Antigravity — Electron Main Process
 *
 * Responsibilities:
 *   - Create and manage the BrowserWindow
 *   - Load antigravity.html as a local file (no server required)
 *   - Suppress the default application menu in production
 *   - Expose DevTools via Ctrl+Shift+I / F12 in --dev mode
 *   - Handle macOS activate / window-all-closed lifecycle correctly
 */

const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('node:path');

// ── Flags ────────────────────────────────────────────────────────────────────
const IS_DEV = process.argv.includes('--dev');

// ── Window factory ───────────────────────────────────────────────────────────
function createWindow() {
  const win = new BrowserWindow({
    // Default size — user can resize freely
    width:     1440,
    height:    900,
    minWidth:  760,
    minHeight: 500,

    // Match the app's background so there is no white flash on launch
    backgroundColor: '#0b0b10',

    title: 'Antigravity',

    webPreferences: {
      // Best-practice security defaults.
      // The framework uses no Node APIs inside the renderer, so these can
      // stay false. If you later need IPC, add a preload script here.
      contextIsolation: true,
      nodeIntegration:  false,
      webSecurity:      true,

      // Allow local file: URLs to load without CORS issues
      // (only relevant if you reference other local assets)
      allowRunningInsecureContent: false,
    },

    // Defer show until the renderer has painted to eliminate the blank-window flash
    show: true,
  });

  // ── Load the renderer ──────────────────────────────────────────────────────
  win.loadFile(path.join(__dirname, 'antigravity.html'));

  // ── Show only when fully ready ─────────────────────────────────────────────
  win.show();
  if (IS_DEV) win.webContents.openDevTools({ mode: 'detach' });

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  // Toggle DevTools — useful when debugging injected node scripts
  win.webContents.on('before-input-event', (_event, input) => {
    const ctrl = input.control || input.meta; // Cmd on macOS
    if (ctrl && input.shift && input.key === 'I') {
      win.webContents.toggleDevTools();
    }
    // F11 → fullscreen toggle
    if (input.key === 'F11' && input.type === 'keyDown') {
      win.setFullScreen(!win.isFullScreen());
    }
  });

  return win;
}

// ── App lifecycle ────────────────────────────────────────────────────────────
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.whenReady().then(() => {
  // Remove the native menu bar entirely in production (clean presentation feel)
  if (!IS_DEV) {
    Menu.setApplicationMenu(null);
  }

  createWindow();

  // macOS: re-create a window when the dock icon is clicked and no windows exist
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (standard behaviour on Windows / Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
