const { setEnv } = require('./utils/utils')
const build = require('./build')

module.exports = async function buildPackage() {
  setEnv({ NODE_ENV: 'production', BABEL_MODULE: 'esmodule' })
  const getPackageConfig = require('./config/webpack.package')
  const config = getPackageConfig()
  return build(config)
}
