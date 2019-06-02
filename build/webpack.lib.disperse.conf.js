const WebpackBar = require('webpackbar')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const loaders = require('./adapter/loaders')

// 默认配置
const defaults = require('./adapter/defaults')

const { resolve } = require('./adapter/utils')

// 支持覆盖配置
module.exports = {
  mode: 'production',
  entry: defaults.entry,
  output: {
    path: defaults.distPath,
    filename: `${defaults.libName}.min.js`,
    library: defaults.libName,
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  externals: nodeExternals(),
  devtool: 'cheap-module-eval-source-map',
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
        use: loaders.generateUrlLoader()
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: loaders.generateUrlLoader('fonts')
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.scss', 'less', 'css', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          warnings: false
        }
      })
    ],
  }
}
