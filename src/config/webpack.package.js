const fs = require('fs-extra')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const baseConfig = require("./weback.base")
const { resolveApp } = require('../utils/resolve')
const { getRootWebpackConfig, getRootPkg } = require("../utils")

module.exports = function getPackageConfig() {
  const { name } = getRootPkg()

  const config = {
    mode: 'production',
    stats: 'none',
    entry: {
      [name]: resolveApp('src'),
      [`${name}.min`]: resolveApp('src'),
    },
    output: {
      path: resolveApp('lib'),
      library: '[name]',
      libraryTarget: 'umd',
      filename: '[name].js',
      umdNamedDefine: true,
      globalObject: "typeof self !== 'undefined' ? self : this",
    },
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
      },
    },
    performance: false,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({ // 使用压缩插件
          include: /\.min\.js$/
        })
      ]
    }
  }

  return merge(baseConfig, config, getRootWebpackConfig())
}
