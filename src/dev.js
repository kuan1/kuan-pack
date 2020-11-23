const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const portfinder = require('portfinder')
const { getRootWebpackConfig, logServerInfo } = require("./utils")
const setEnv = require('./utils/setEnv')

// 开启开发服务器
module.exports = async function startDev(entry, { config, public }) {
  setEnv({ NODE_ENV: 'development', KUAN_PACK_ENTRY: entry || '', KUAN_PACK_WEBPACK_CONFIG: config, KUAN_PACK_PUBLIC: public })

  const port = await choosePort(process.env.PORT || 8080)

  const { getDevConfig } = require('./config/webpack.dev')
  const compiler = webpack(getDevConfig())
  compiler.hooks.done.tap('webpack dev', stats => {
    const message = `${stats.toString('minimal')} \n`
    if (stats.hasErrors()) {
      console.log(chalk.red(message))
      process.stdout.write('\x07') // make sound
      return
    }
    console.log(message)
    logServerInfo(port)
  })

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
    stats: 'errors-only',
    host: process.env.HOST || '0.0.0.0',
    ...getRootWebpackConfig().devServer
  }

  const server = new WebpackDevServer(compiler, serverConfig)

  server.listen(port, serverConfig.host, err => {
    if (err) {
      console.log(err)
      return
    }
  })
}

// 查找没有被占用的端口号
function choosePort(basePort) {
  return new Promise((resolve, reject) => {
    portfinder.basePort = basePort
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        resolve(port)
      }
    })
  })
}
