const build = require('./build')
const libConf = require('./webpack.lib.conf.js')
const libMinConf = require('./webpack.lib.min.conf.js')
const libExtract = require('./webpack.lib.extract.conf')

const noop = config => config

function buildLib(extend = noop, config = libMinConf) {
  return new Promise(resolve => {
    // 暴露出去修改的方法
    extend(config)
    build(config, resolve)
  })
}

module.exports = async ({
  extend = noop,
  onSuccess = noop,
  config,
  extract = false
} = {}) => {
  if (!config) {
    // 默认配置
    await buildLib(extend, libConf)
    await buildLib(extend, libMinConf)
  } else if (extract) {
    await buildLib(extend, libExtract)
  } else {
    // 自定义打包配置
    await buildLib(extend, config)
  }
  onSuccess()
}
