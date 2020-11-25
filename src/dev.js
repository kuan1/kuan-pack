const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { getRootWebpackConfig } = require("./utils")
const setEnv = require('./utils/setEnv')
const createCompiler = require("./utils/createCompiler")
const findPorter = require("./utils/findPorter")

// 开启开发服务器
module.exports = async function startDev(entry = '', { config: webpackConfig = '' }) {
  setEnv({ NODE_ENV: 'development', KUAN_PACK_ENTRY: entry, KUAN_PACK_WEBPACK_CONFIG: webpackConfig })

  const port = await findPorter(process.env.PORT || 8080)
  const { getDevConfig } = require('./config/webpack.dev')
  const compiler = createCompiler({ webpack, config: getDevConfig(), port })

  const serverConfig = {
    disableHostCheck: true,
    compress: true,
    logLevel: 'silent',
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true,
    overlay: false,
    // stats: 'none',
    host: process.env.HOST || '0.0.0.0',
    ...getRootWebpackConfig().devServer
  }

  const server = new WebpackDevServer(compiler, serverConfig)

  server.listen(port, serverConfig.host, err => {
    if (err) {
      return console.log(err)
    }
  })
}
