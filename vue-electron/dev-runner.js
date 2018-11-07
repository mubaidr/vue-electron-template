/* eslint-disable*/
const electron = require('electron')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
/* eslint-enable */

const path = require('path')
const { spawn } = require('child_process')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

let electronProcess = null
let manualRestart = false

function startRenderer() {
  rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(
    rendererConfig.entry.renderer,
  )

  // eslint-disable-next-line
  return new Promise(resolve => {
    const compiler = webpack(rendererConfig)
    const hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
    })

    compiler.hooks.afterEmit.tap('afterEmit', () => {
      console.log('\nCompiled renderer script!')
      console.log('\nWatching file changes...')
    })

    const server = new WebpackDevServer(compiler, {
      contentBase: path.join(__dirname, '../'),
      hot: true,
      quiet: true,
      before(app, ctx) {
        app.use(hotMiddleware)

        ctx.middleware.waitUntilValid(() => {
          resolve()
        })
      },
    })

    server.listen(9080)
  })
}

function restartElectron() {
  console.log('\nStarting electron...')

  if (electronProcess) {
    process.kill(electronProcess.pid)
    electronProcess = null
  }

  electronProcess = spawn(electron, [
    '--inspect=5858',
    path.join(__dirname, '../dist/electron/main.js'),
  ])

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit(0)
  })
}

function startMain() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(mainConfig)

    compiler.hooks.afterEmit.tap('afterEmit', () => {
      console.log('\nCompiled main script!')
      console.log('\nWatching file changes...')

      manualRestart = true

      restartElectron()

      setTimeout(() => {
        manualRestart = false
      }, 2500)

      resolve()
    })

    compiler.watch({}, err => {
      if (err) reject(err)
    })
  })
}

function init() {
  console.log('\nStarting...')

  startRenderer().then(startMain)
}

init()
