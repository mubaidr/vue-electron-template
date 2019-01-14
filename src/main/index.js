/* eslint-disable */
import { app, BrowserWindow } from 'electron'
/* eslint-enable */
const pkg = require('../../package.json')

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.ELECTRON_ENV === 'development' ||
  process.argv.indexOf('--debug') !== -1
let mainWindow

if (isDev) {
  // eslint-disable-next-line
  require('electron-debug')()
}

async function installDevTools() {
  try {
    require('devtron').install() //eslint-disable-line
    require('vue-devtools').install() //eslint-disable-line
  } catch (err) {
    console.error(err)
  }
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 800,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
      webSecurity: false,
    },
    show: false,
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:9080')
  } else {
    mainWindow.loadFile(`file://${__dirname}/index.html`)

    // eslint-disable-next-line
    global.__static = require('path')
      .join(__dirname, '/static')
      .replace(/\\/g, '\\\\') // eslint-disable-line
  }

  // Show when loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.setTitle(pkg.productName)
    mainWindow.show()
    mainWindow.focus()

    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  app.setName(pkg.productName)
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
