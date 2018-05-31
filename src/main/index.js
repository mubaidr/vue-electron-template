/* eslint-disable */
import { app, BrowserWindow, ipcMain, Menu, MenuItem } from 'electron'
/* eslint-enable */

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

let mainWindow
let winURL = 'http://localhost:9080'

if (process.env.NODE_ENV === 'development') {
  try {
    // eslint-disable-next-line
    require('electron-debug')({
      showDevTools: true
    })
  } catch (err) {
    console.log('Failed to install `electron-debug`: Please set `NODE_ENV=production` before build to avoid installing debugging packages. ')
  }
} else {
  winURL = `file://${__dirname}/index.html`

  /**
   * Set `__static` path to static files in production
   * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
   */
  // eslint-disable-next-line
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\') // eslint-disable-line
}

function installDevTools() {
  try {
    require('devtron').install() //eslint-disable-line
    require('vue-devtools').install() //eslint-disable-line
  } catch (err) {
    console.log('Failed to install `devtron` & `vue-devtools`: Please set `NODE_ENV=production` before build to avoid installing debugging packages. ')
  }
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 1000,
    height: 700,
    minWidth: 500,
    minHeight: 350,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegrationInWorker: true,
      webSecurity: false
    },
    show: false
  })

  // mainWindow.setMenu(null)
  mainWindow.loadURL(winURL)

  // Show when loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()

    if (
      process.env.ELECTRON_ENV === 'development' ||
      process.argv.indexOf('--debug') !== -1
    ) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()

  if (process.env.NODE_ENV === 'development') {
    installDevTools()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
