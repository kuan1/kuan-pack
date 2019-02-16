const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackMerge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const config = require('./config.base')
// const { resolve } = require('./utils')

module.exports = webpackMerge(config, {
  mode: 'production',
  externals: nodeExternals(),
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  }
})
