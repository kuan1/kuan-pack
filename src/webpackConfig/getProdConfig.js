const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const getBaseConfig = require('./getBaseConfig')

const { resolve } = require('./utils')

function getProdConfig(userConfig = {}) {
  const webpackConfig = getBaseConfig(userConfig)
  const finalConfig = merge(webpackConfig, {
    mode: 'production',
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              // 去除 console
              drop_console: true,
              // 去除部分影响性能代码，如：1/0
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

  if (process.env.DISABLE_CLEAN !== '0') {
    finalConfig.plugins.push(
      new CleanWebpackPlugin([webpackConfig.output.path || resolve('dist')], {
        root: process.cwd()
      })
    )
  }
  return finalConfig
}

module.exports = getProdConfig
