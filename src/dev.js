const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const portfinder = require('portfinder')

const getDefault = require('./getConfig/getDefault')
const getConfig = require('./getConfig')

const HOST = process.env.HOST || '0.0.0.0'

module.exports = function getDev(userConfig, onCompileDone) {
  const options = getDefault(userConfig)
  const webpackConfig = getConfig(userConfig)
  const { port, proxy = {} } = options
  choosePort(port)
    .then(port => {
      if (!port) return null
      webpackConfig.mode = 'development'

      const compiler = webpack(webpackConfig)
      compiler.hooks.done.tap('webpack dev', stats => {
        const message = `${stats.toString({ colors: true })} \n`
        if (stats.hasErrors()) {
          console.log(chalk.red(message))
          process.stdout.write('\x07') // make sound
          return
        }
        console.log(message)
        console.log(
          `- App running at: ${chalk.cyan(`http://localhost:${port}`)}`
        )
        if (onCompileDone) {
          onCompileDone({
            stats
          })
        }
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
        stats: 'errors-only', // minimal normal
        publicPath: webpackConfig.output.publicPath || '',
        watchOptions: {
          ignored: /node_modules/
        },
        historyApiFallback: true,
        overlay: false,
        host: HOST,
        proxy,
        ...(webpackConfig.devServer || {})
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
