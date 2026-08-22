export interface ElectronConfigOptions {
  appName: string;
  appId: string;
  width?: number;
  height?: number;
}

export function generateElectronMainJs(options: ElectronConfigOptions): string {
  const { appName, width = 1200, height = 800 } = options;

  return `const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: ${width},
    height: ${height},
    title: "${appName || 'Desktop App'}",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});`;
}
