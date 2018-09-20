const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const defaultWebpackConfig = require('../src/webpack.config')

const {resolve} = require('./utils')

module.exports = ({webpackConfig: commonConfig = defaultWebpackConfig, onSuccess, onFail} = {}) => {
  const webpackConfig = merge(commonConfig, {
    mode: 'production',
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
    ]
  })
  const distPath = webpackConfig.output.path || resolve('dist')
  webpackConfig.plugins.push(new CleanWebpackPlugin([distPath], {root: process.cwd()}))

  webpack(webpackConfig, (err, stats) => {
    const message = `${stats.toString({colors: true})} \n`
    if (err || stats.hasErrors()) {
      console.log(err || message)
      if (onFail) {
        onFail({ err, stats });
      }
      process.exit(1);
    }

    if (onSuccess) {
      onSuccess({ stats });
    }
    console.log(message)
  });
}
