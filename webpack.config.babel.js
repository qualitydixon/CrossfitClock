import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
})

const base = {
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.less$/, loader: 'style!css!less-loader'},
    ],
  },
}

const developmentConfig = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/index',
  ],
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
}

const productionConfig = {
  entry: [
    './app/index',
  ],
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin, new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true,
    },
  })],
}

export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig)
