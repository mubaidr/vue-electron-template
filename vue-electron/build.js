/* eslint-disable*/
const del = require('del')
const webpack = require('webpack')
/* eslint-enable */

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

function clean() {
  del.sync(['dist/*', 'build/*', '!build/icons', '!build/icons/icon.*'])
  console.log(`\nCleaned!`)
  process.exit()
}

function pack(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err) => {
      if (err) reject(err.stack || err)

      resolve()
    })
  })
}

function build() {
  del.sync(['dist/electron/*', '!.gitkeep'])

  pack(mainConfig).then(() => {
    console.log('Compiled Main!')
  }).catch(err => {
    console.error(`\n${err}`)
    process.exit(1)
  })

  pack(rendererConfig).then(() => {
    console.log('Compiled Renderer!')
  }).catch(err => {
    console.error(`\n${err}`)
    process.exit(1)
  })
}

if (process.env.BUILD_TARGET === 'clean') clean()
else build()
