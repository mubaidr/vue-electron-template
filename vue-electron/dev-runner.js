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
let oldElectronProcess = null

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

  oldElectronProcess = electronProcess

  electronProcess = spawn(
    electron,
    ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')],
    {
      detached: true,
    },
  )

  electronProcess.stdout.on('data', data => {
    console.log(data.toString())

    const { pid } = oldElectronProcess || { pid: null }
    if (pid && process.kill(pid, 0)) {
      kill(pid)
      oldElectronProcess = null
    }
  })
}

function startMain() {
  const compiler = webpack(mainConfig)

  compiler.hooks.afterEmit.tap('afterEmit', () => {
    console.log('\nCompiled main script!')
    restartElectron()
    console.log('\nWatching file changes...')
  })

  compiler.watch({}, err => {
    if (err) console.error(err)
  })
}

startRenderer().then(startMain)
