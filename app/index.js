"use strict"

const { app , BrowserWindow , Menu} = require('electron');
const path = require('path');
const gotTheLock = app.requestSingleInstanceLock();
let mainWindow;

// Make sure only one app at the time
if (!gotTheLock) {
    app.quit();
    return;
  }

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        minWidth:700,
        minHeight:500,
        show:false,
        webPreferences: {
            preload : path.join(__dirname,'preload.js'),
            nodeIntegration:false,
            sandbox:false,
            contextIsolation:true
        }
    });

    mainWindow.loadURL('http://localhost:1000');
    mainWindow.once('ready-to-show',() => {
        setTimeout(() => {
            mainWindow.reload();
            mainWindow.show();
            mainWindow.maximize();
            mainWindow.focus();

        }, 400);
    })
    
    
    
}

app.on('ready',createWindow);

app.on('activate',() => {
    if(BrowserWindow.getAllWindows().length === 0)
        createWindow();
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
     app.quit();
});