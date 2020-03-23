const { app, BrowserWindow, dialog } = require('electron')
const settings = require('electron-settings')
const path = require('path')
const url = require('url')

let win

var IMG_DIR = '/img/'
var HTML_DIR = "/app/"

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    icon: path.join(__dirname, IMG_DIR, 'icon.png'),
    transparent: true,
    resizable: false
  })

  win.loadFile(path.join(__dirname, HTML_DIR, 'index.html'))

  //win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('ready', () => {
  if (settings.has('stats.folder')) {
    console.log(settings.get('stats.folder'))
  } else {
    dialog.showOpenDialog({
        properties: ['openDirectory', 'showHiddenFiles'],
        title: "Select Your Kovaak's Aim Trainer Stats File"
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePaths[0])
      if (!result.canceled) {
        settings.set('stats', {
          folder: result.filePaths[0]
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})
