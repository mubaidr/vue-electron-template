process.env.NODE_ENV = 'development'

/* eslint-disable*/
const electron = require('electron')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
const kill = require('tree-kill')
/* eslint-enable */

const path = require('path')
const { spawn } = require('child_process')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

let electronProcess = null
let manualRestart = null

async function startRenderer() {
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

  const { pid } = electronProcess || {}
  if (pid) {
    kill(pid, err => {
      if (err) console.error(err)
    })
  }

  electronProcess = spawn(
    electron,
    [path.join(__dirname, '..', '/dist/electron/main.js')],
    {
      detached: false,
    },
  )

  // eslint-disable-next-line
  electronProcess.on('exit', (code, signal) => {
    if (!manualRestart) process.exit(0)
  })
}

function startMain() {
  const compiler = webpack(mainConfig)

  compiler.hooks.afterEmit.tap('afterEmit', () => {
    console.log('\nCompiled main script!')
    manualRestart = true
    restartElectron()
    manualRestart = false
    console.log('\nWatching file changes...')
  })

  compiler.watch({}, err => {
    if (err) console.error(err)
  })
}

startRenderer().then(startMain)
