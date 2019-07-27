const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const portfinder = require('portfinder')

const config = require('./webpack.base.conf')
const defaults = require('./adapter/defaults')

const { port, proxy = {} } = defaults
const HOST = process.env.HOST || '0.0.0.0'

const noop = config => config

// 开启开发服务器
module.exports = function startDev({
  config: webpackConfig = config, // webpack config配置
  extend = noop, // 修改webpack config
  onCompileDone = noop // 编译完成
} = {}) {
  choosePort(port)
    .then(port => {
      if (!port) return null
      webpackConfig.mode = 'development'

      extend(webpackConfig) // 允许修改配置的引用

      const compiler = webpack(webpackConfig)
      compiler.hooks.done.tap('webpack dev', stats => {
        const message = `${stats.toString('minimal')} \n`
        if (stats.hasErrors()) {
          console.log(chalk.red(message))
          process.stdout.write('\x07') // make sound
          return
        }
        console.log(message)
        console.log(
          `- App running at: \n ${chalk.cyan(`http://localhost:${port}`)}`
        )
        onCompileDone({
          stats
        })
      })

      const serverConfig = {
        disableHostCheck: true,
        compress: true,
        clientLogLevel: 'none',
        hot: true,
        quiet: true,
        headers: {
          'access-control-allow-origin': '*'
        },
        watchOptions: {
          ignored: /node_modules/
        },
        historyApiFallback: true,
        overlay: false,
        host: HOST,
        proxy,
        ...webpackConfig.devServer
      }

      const server = new WebpackDevServer(compiler, serverConfig)

      server.listen(port, HOST, err => {
        if (err) {
          console.log(err)
          return
        }
        console.log(chalk.cyan('Starting the development server...\n'))
      })
    })
    .catch(err => {
      console.log(err)
    })
}

// 查找没有被占用的端口号
function choosePort(DEFAULT_PORT) {
  return new Promise((resolve, reject) => {
    portfinder.basePort = DEFAULT_PORT
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        resolve(port)
      }
    })
  })
}
