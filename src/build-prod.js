const setEnv = require('./utils/setEnv')
const build = require('./build')

module.exports = function buildProd(entry, { config: webpackConfig, public }) {
  setEnv({ NODE_ENV: 'production', KUAN_PACK_ENTRY: entry || '', KUAN_PACK_WEBPACK_CONFIG: webpackConfig, KUAN_PACK_PUBLIC: public })

  const { getProdConfig } = require('./config/webpack.prod')
  const config = getProdConfig()

  return build(config)
}
