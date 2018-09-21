const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const portfinder = require('portfinder')

const defaultWebpackConfig = require('../src/webpack.config')
const {userConfig} = require('./utils')

const DEFAULT_PORT = process.env.PORT || 8888
const HOST = process.env.HOST || '0.0.0.0'
const {proxy: userProxy, historyApiFallback: userHistoryApiFallback = false} = userConfig

process.env.NODE_ENV = 'development'

const noop = () => {}

module.exports = function dev(
  {
    webpackConfig = defaultWebpackConfig,
    contentBase,
    onCompileDone = noop,
    proxy = userProxy,
    port,
    historyApiFallback = userHistoryApiFallback,
    serverConfig: serverConfigFromOpts = {},
  } = {}) {
  choosePort(port || DEFAULT_PORT)
    .then(port => {
      if (port === null) {
        return
      }
      webpackConfig.mode = 'development'
      const compiler = webpack(webpackConfig)
      compiler.hooks.done.tap('webpack dev', stats => {
        const message = `${stats.toString({colors: true})} \n`
        if (stats.hasErrors()) {
          console.log(chalk.red(message))
          process.stdout.write('\x07') // make sound
          return
        }
        console.log(message)
        console.log(`- App running at: ${chalk.cyan(`http://localhost:${port}`)}`)
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
          'access-control-allow-origin': '*',
        },
        stats: 'normal', // minimal normal
        publicPath: webpackConfig.output.publicPath,
        watchOptions: {
          ignored: /node_modules/,
        },
        historyApiFallback,
        overlay: false,
        host: HOST,
        proxy,
        contentBase: contentBase || process.env.CONTENT_BASE,
        ...serverConfigFromOpts,
        ...(webpackConfig.devServer || {}),
      }
      const server = new WebpackDevServer(compiler, serverConfig);
      ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
          server.close(() => {
            process.exit(0)
          })
        })
      })
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