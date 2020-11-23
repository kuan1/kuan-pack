const { setEnv } = require('./utils')
const build = require('./build')

module.exports = async function buildPackage() {
  setEnv({ NODE_ENV: 'production' })
  const getPackageConfig = require('./config/webpack.package')
  const config = getPackageConfig()
  return build(config)
}
