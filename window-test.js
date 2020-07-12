const {app, BrowserWindow} = require('electron');

function createWindow() {
  let win = new BrowserWindow({ 
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.on('close', () => {win = null});
  win.loadFile('index.html');
  win.show();

  win.webContents.openDevTools();
}



app.whenReady().then(createWindow);
