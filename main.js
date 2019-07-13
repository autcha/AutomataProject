const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
let win;

function createWindow(){
  win = new BrowserWindow({
    width: 1280,
    height: 760,
    webPreferences:{
      nodeIntegration: true
    }
  });
  win.setMenu(null);
  //win.loadFile(__dirname + 'index.html');
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'pages/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', function(){
    win = null;
  });
}

  app.on('ready', createWindow);

  app.on('window-all-closed', function(){
    if(process.platform !== 'darwin') app.quit();
  })

  app.on('activate', function(){
    if(win === null) createWindow();
  })
