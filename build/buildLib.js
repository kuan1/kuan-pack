const build = require('./build')
const libConf = require('./webpack.lib.conf.js')
const libMinConf = require('./webpack.lib.min.conf.js')

const noop = config => config

function buildLib(extand = noop, config = libMinConf) {
  return new Promise(resolve => {
    // 暴露出去修改的方法
    extand(config)
    build(config, resolve)
  })
}

module.exports = async ({ extand = noop, onSuccess = noop } = {}) => {
  await buildLib(extand, libConf)
  await buildLib(extand, libMinConf)
  onSuccess()
}