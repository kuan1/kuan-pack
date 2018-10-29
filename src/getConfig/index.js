const getDefault = require('./getDefault')
const getBaseConfig = require('./getBaseConfig')
const getProdConfig = require('./getProdConfig')

const getConfig = userConfig => {
  const options = getDefault(userConfig)

  const baseConfig = getBaseConfig(options)

  if (process.env.NODE_ENV === 'development') {
    return baseConfig // 返回 开发config
  }

  const prodConfig = getProdConfig(baseConfig, options)
  return prodConfig // 返回 生成config
}

module.exports = getConfig
