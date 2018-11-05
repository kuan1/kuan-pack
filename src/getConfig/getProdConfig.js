const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { resolve } = require('./utils')

function getProdConfig(baseConfig, userConfig = {}) {
  const finalConfig = merge(baseConfig, {
    mode: 'production',
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              drop_console: true,
              keep_infinity: true
            },
            output: {
              // 去除注释
              comments: false,
              // 紧凑输出
              beautify: false
            }
          }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `./css/[${userConfig.libName || 'name'}].[hash:7].css`,
        chunkFilename: './css/[id].[hash:7].css'
      })
    ]
  })
  if (!userConfig.disabledClean) {
    finalConfig.plugins.push(
      new CleanWebpackPlugin([finalConfig.output.path || resolve('dist')], {
        root: process.cwd()
      })
    )
  }
  return finalConfig
}

module.exports = getProdConfig
