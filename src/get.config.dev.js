const ip = require('ip')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const getBase = require('./get.config.base')

const getProxy = (proxy) => {
  if (!proxy) return ''
  if (typeof proxy === 'string') {
    return {
      '/api': {
        target: proxy,
        changeOrigin: true
      }
    }
  }
  return proxy
}

// const fs = require('fs')
// function save(config) {
//   fs.writeFileSync(__dirname + '/test.json', JSON.stringify(config, null, 2))
// }

/**
 * @param options {object} {proxy: '代理地址', staticPath: '静态目录地址'}
 */
module.exports = (options = {}) => {
  const common = getBase(options) // 公用部分
  const {proxy, PORT = 8088} = options
  const devServer = {
    port: process.env.PORT || PORT,
    host: '0.0.0.0',
    openPage: '',
    useLocalIp: true,
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    open: false,
  }

  const finalProxy = getProxy(proxy)
  if (finalProxy) devServer.proxy = finalProxy

  const webpackConfig = merge(common, {
    mode: 'development',
    devServer
  })

  // save(webpackConfig)
  return new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || PORT
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        process.env.PORT = port
        webpackConfig.devServer.port = port

        webpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${ip.address()}:${port}`],
          }
        }))

        resolve(webpackConfig)
      }
    })
  })
}

