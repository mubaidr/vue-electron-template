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
  rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.renderer)

  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    const compiler = webpack(rendererConfig)
    const hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })

    compiler.hooks.afterEmit.tap('afterEmit', () => {
      hotMiddleware.publish({
        action: 'reload'
      })
      console.info('\nCompiled renderer script.')
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
      }
    })

    server.listen(9080)
  })
}

function electronLog(data) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach((line) => {
    log += `${line}\n`
  })
  console.info(log)
}

function startElectron() {
  electronProcess = spawn(electron, [
    '--inspect=5858',
    path.join(__dirname, '../dist/electron/main.js')
  ])

  electronProcess.stdout.on('data', (data) => {
    electronLog(data)
  })
  electronProcess.stderr.on('data', (data) => {
    electronLog(data)
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function startMain() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(mainConfig)
    // console.warn(mainConfig, Object.keys(compiler), Object.keys(compiler.hooks))

    compiler.hooks.afterEmit.tap('afterEmit', () => {
      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null

        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      console.info('\nCompiled main script.')
      resolve()
    })

    compiler.watch({}, (err) => {
      if (err) reject(err)
    })
  })
}

function init() {
  console.log('\nStarting pack scripts...')

  Promise.all([startRenderer(), startMain()])
    .then(() => {
      console.log('\nStarting electron...')
      startElectron()
    })
    .catch((err) => {
      console.error('\nError: \n', err)
    })
}

init()
