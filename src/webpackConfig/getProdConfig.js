const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const getBaseConfig = require('./getBaseConfig')

const {
  resolve
} = require('./utils')

function getProdConfig(userConfig = {}) {
  const webpackConfig = getBaseConfig(userConfig)
  const finalConfig = merge(webpackConfig, {
    mode: 'production',
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `./css/[${userConfig.libName || 'name'}].[hash:7].css`,
        chunkFilename: './css/[id].[hash:7].css',
      }),
      new CleanWebpackPlugin([webpackConfig.output.path || resolve('dist')], {
        root: process.cwd()
      })
    ]
  })

  return finalConfig
}

module.exports = getProdConfig