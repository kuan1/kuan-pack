const build = require('./build')
const libConf = require('./webpack.lib.conf.js')
const libMinConf = require('./webpack.lib.min.conf.js')
const libExtract = require('./webpack.lib.extract.conf')

const noop = config => config

function buildLib({ extend = noop, config = libMinConf } = {}) {
  return new Promise(resolve => {
    // 暴露出去修改config的方法
    extend(config)
    build({
      config,
      onSuccess: resolve
    })
  })
}

module.exports = async ({
  extend = noop,
  config,
  onSuccess = noop,
  extract = false
} = {}) => {
  // 自定义打包配置
  if (config) {
    await buildLib({
      extend,
      config
    })
    return onSuccess()
  }
  // 抽取css
  if (extract) {
    await buildLib({
      extend,
      config: libExtract
    })
    return onSuccess()
  }

  // 默认配置
  await buildLib({
    extend,
    config: libConf
  })
  await buildLib({
    extend,
    config: libMinConf
  })
  return onSuccess()
}
