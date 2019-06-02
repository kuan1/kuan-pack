const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const loaders = require('./adapter/loaders')
const defaults = require('./adapter/defaults')

const { resolve } = require('./adapter/utils')

module.exports = {
  entry: defaults.entry,
  output: {
    path: defaults.distPath,
    publicPath: defaults.publicPath,
    filename: `${defaults.libName}.js`
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
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: defaults.html,
      path: defaults.publicPath,
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyWebpackPlugin(
      fs.existsSync(defaults.staticPath)
        ? [
          {
            from: defaults.staticPath,
            to: '',
            ignore: ['.*']
          }
        ]
        : []
    )
  ],
  resolve: {
    extensions: ['.vue', '.js', 'css', 'less', 'scss', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  }
}
