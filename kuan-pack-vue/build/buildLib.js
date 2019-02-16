const getConfigLib = require('./config.lib')
const nodeExternals = require('webpack-node-externals')
const build = require('./build')

// 可传入默认配置
module.exports = (options, onSuccess) => {
  const webpackConfig = getConfigLib(options)
  webpackConfig.externals = [nodeExternals()]
  build(webpackConfig, onSuccess)
}
