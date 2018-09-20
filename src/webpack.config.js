const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')

const { vueLoader, sassLoader, lessLoader } = require('./loaders')
const {resolve, userConfig} = require('./utils')

const htmlTemplate = fs.existsSync(resolve('index.html')) ? resolve('index.html') : `${__dirname}/../index.html`

const {
  entry = resolve('src'),
  publicPath = '',
  distPath = resolve('dist'),
  config: configFormUser = {}
} = userConfig

const webpackConfig = {
  entry,
  output: {
    path: distPath,
    filename: 'js/[name].[hash].js',
    publicPath,
    chunkFilename: 'js/[id].[hash].js'
  },
  module: {
    rules: [
      { test: /.vue$/, loader: 'vue-loader', options: vueLoader },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      { test: /\.(scss|css)$/, use: sassLoader },
      { test: /\.less$/, use: lessLoader }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'kuan-pack': `${__dirname}, 'index'`
    }
  },
  optimization: {
    namedChunks: true,
    splitChunks: {
      minSize: 30000,
      cacheGroups: {
        commons: {
          chunks: 'initial', // "initial", "async", "all"
          name: 'commons',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 0
        },
        vendor: {
          chunks: 'initial', // "initial", "async", "all"
          test: /node_modules/, // /[\\/]node_modules[\\/]vue/,
          name: 'vendor',
          priority: -10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        APP_TITLE: JSON.stringify(process.env.npm_package_name)
      }
    }),
    new CopyWebpackPlugin(
      fs.existsSync(resolve('static')) ?
        [{
          from: resolve('static'),
          to: '',
          ignore: ['.*']
        }] : []
    ),
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      path: publicPath,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true
      },
      chunksSortMode: 'dependency'
    }),
    new WebpackBar()
  ]
}

module.exports = merge(webpackConfig, configFormUser)
