const WebpackBar = require("webpackbar")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

exports.getProdConfig = function getProdConfig() {
  const prodConfig = {
    output: {
      chunkFilename: '[name].js',
    },
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
      new WebpackBar({
        name: 'Kuan-pack',
        color: '#07c160',
      }),
      new HtmlWebpackPlugin({
        template: defaults.html,
        path: defaults.publicPath,
        hash: true
      }),
    ],
  }
}