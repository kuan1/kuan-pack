const setEnv = require('./utils/setEnv')
const build = require('./build')

module.exports = async function buildPackage(entry = '', { config: webpackConfig = '', libName = '' }) {
  setEnv({ NODE_ENV: 'production', KUAN_PACK_ENTRY: entry, KUAN_PACK_WEBPACK_CONFIG: webpackConfig, KUAN_PACK_NAME: libName })
  const getPackageConfig = require('./config/webpack.package')
  const config = getPackageConfig()
  return build(config)
}
