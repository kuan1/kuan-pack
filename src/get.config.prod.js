const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const getBase = require('./get.config.base')

const basePath = process.cwd()
const resolve = (dir) => path.join(basePath, dir)

/**
 * @param options {object} {entry: '入口地址', publicPath: '代理地址', staticPath: '静态目录地址'， publicPath：'cdn路径', distPath}
 */
module.exports = (options = {}) => {
  const common = getBase(options) // 公用部分
  const {distPath = 'dist', publicPath = ''} = options
  return merge(common, {
    mode: 'production',
    output: {
      path: resolve(distPath),
      publicPath
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './css/[name].[hash:7].css',
        chunkFilename: './css/[id].[hash:7].css',
      }),
      new CleanWebpackPlugin([distPath], {root: process.cwd()})
    ]
  })
}
