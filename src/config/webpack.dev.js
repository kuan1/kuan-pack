const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')

const { getRootWebpackConfig, getHTMLTemplate } = require('../utils')

exports.getDevConfig = function getDevConfig() {
  const baseConfig = require('./weback.base')
  const devConfig = {
    output: {
      chunkFilename: '[name].js',
    },
    devtool: "source-map",
    optimization: {
      splitChunks: {
        cacheGroups: {
          chunks: {
            chunks: 'all',
            minChunks: 2,
            minSize: 0,
            name: 'chunks',
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: getHTMLTemplate(),
        hash: true
      }),
    ],
  }

  const rootConfig = getRootWebpackConfig()

  return merge(baseConfig, devConfig, rootConfig)
}
