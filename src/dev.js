const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { clear: clearConsole } = require("@luzhongk/node-logger")
const { getRootWebpackConfig } = require("./utils")
const setEnv = require('./utils/setEnv')
const createCompiler = require("./utils/createCompiler")
const findPorter = require("./utils/findPorter")

const isInteractive = process.stdout.isTTY

// 开启开发服务器
module.exports = async function startDev(entry, { config, public }) {
  setEnv({ NODE_ENV: 'development', KUAN_PACK_ENTRY: entry || '', KUAN_PACK_WEBPACK_CONFIG: config, KUAN_PACK_PUBLIC: public })

  const port = await findPorter(process.env.PORT || 8080)
  const { getDevConfig } = require('./config/webpack.dev')
  const compiler = createCompiler({ webpack, config: getDevConfig(), port })

  const serverConfig = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true,
    overlay: false,
    host: process.env.HOST || '0.0.0.0',
    ...getRootWebpackConfig().devServer
  }

  const server = new WebpackDevServer(compiler, serverConfig)

  server.listen(port, serverConfig.host, err => {
    if (err) {
      return console.log(err)
    }
    if (isInteractive) {
      clearConsole()
    }
  })
}
