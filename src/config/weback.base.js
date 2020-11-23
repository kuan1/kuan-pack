const webpack = require('webpack')
const FriendlyErrorsPlugin = require('@nuxt/friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { STYLE_EXTS, SCRIPT_EXTS, POSTCSS_CONFIG_FILE } = require('../constants')
const { resolveApp } = require('../utils/resolve')
const { getEntryFile } = require("../utils")

const CSS_LOADERS = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: require(POSTCSS_CONFIG_FILE),
    },
  },
]

const plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  }),
  new VueLoaderPlugin(),
  new FriendlyErrorsPlugin({
    clearConsole: false,
    logLevel: 'WARNING',
  }),
]

const baseConfig = {
  mode: process.env.NODE_ENV || 'development',
  entry: getEntryFile(),
  resolve: {
    extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
    alias: {
      vue: 'vue/dist/vue.esm-browser.js',
      '@': resolveApp('src')
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules\//,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [...CSS_LOADERS, 'less-loader'],
      }
    ],
  },
  plugins
}

module.exports = baseConfig