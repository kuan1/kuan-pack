const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const loaders = require('./loaders')
const options = require('./defaultOptions')

const { resolve } = require('./utils')

module.exports = {
  entry: options.entry,
  output: {
    path: options.distPath,
    publicPath: options.publicPath,
    filename: `${options.libName}.js`
  },
  module: {
    noParse: [/moment.js/],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: loaders.babelLoader
      },
      {
        test: /\.css$/,
        use: loaders.generateCssLoader()
      },
      {
        test: /\.scss$/,
        use: loaders.generateSassLoader()
      },
      {
        test: /\.less$/,
        use: loaders.generateLessLoader()
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
        use: loaders.generateUrlLoader('images')
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: loaders.generateUrlLoader('fonts')
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: options.html,
      path: options.publicPath,
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyWebpackPlugin(
      fs.existsSync(options.staticPath)
        ? [
            {
              from: options.staticPath,
              to: '',
              ignore: ['.*']
            }
          ]
        : []
    )
  ],
  resolve: {
    extensions: ['.vue', '.js', '.jsx', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  }
}
