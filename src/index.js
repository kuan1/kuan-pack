const getDevConfig = require('./get.config.dev')
const getProdConfig = require('./get.config.prod')

module.exports = {
  getDevConfig,
  getProdConfig
}

/*
  const options = {
    entry: '', // 打包入口
    PORT: '', // 端口号
    proxy: '', // 代理地址
    staticPath: '静态目录地址', // 静态资源地址
    publicPath: 'cdn路径', // cdn地址
    distPath: 'dist' // 打包目录
  }
  const devConfig = getDevConfig(options)
*/