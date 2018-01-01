const webpack = require('webpack') // eslint-disable-line
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: 'index.html',
  inject: 'body',
})

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'build'
process.env.BABEL_ENV = LAUNCH_COMMAND

const base = {
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
}

const developmentConfig = {
  entry: PATHS.app,
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 3000,
  },
  plugins: [HtmlWebpackPluginConfig],
}

const productionConfig = {
  entry: { main: PATHS.app },
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, new UglifyJsPlugin()],
}

console.log(
  Object.assign(
    {},
    base,
    isProduction === true ? productionConfig : developmentConfig,
  ),
)

module.exports = Object.assign(
  {},
  base,
  isProduction === true ? productionConfig : developmentConfig,
)
