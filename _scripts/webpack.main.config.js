process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')
const { dependencies } = require('../package.json')

const mainConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.join(__dirname, '../src/main/index.js'),
  },
  externals: [...Object.keys(dependencies || {})],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.node'],
  },
  target: 'electron-main',
}

module.exports = mainConfig
