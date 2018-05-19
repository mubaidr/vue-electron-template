process.env.BABEL_ENV = 'main'

const path = require('path')
const { dependencies } = require('../package.json')

/* eslint-disable*/
const webpack = require('webpack')
/* eslint-enable */

const mainConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.join(__dirname, '../src/main/index.js')
  },
  externals: [...Object.keys(dependencies || {})],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
  },
  // plugins: [new webpack.NoEmitOnErrorsPlugin()],
  resolve: {
    extensions: ['.js', '.json', '.node']
  },
  target: 'electron-main'
}

module.exports = mainConfig
