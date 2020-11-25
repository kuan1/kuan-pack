const { merge } = require('webpack-merge')
const { getDevConfig } = require("./webpack.dev")
const { getRootWebpackConfig } = require('../utils')

exports.getProdConfig = function getProdConfig() {
  const devConfig = getDevConfig()
  delete devConfig.devtool

  const prodConfig = {
    mode: 'production',
    stats: 'none',
    performance: {
      maxAssetSize: 5 * 1024 * 1024,
      maxEntrypointSize: 5 * 1024 * 1024,
    },
  }

  return merge(devConfig, prodConfig, getRootWebpackConfig())
}