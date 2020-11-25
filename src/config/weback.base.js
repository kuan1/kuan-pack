const webpack = require('webpack')
const WebpackBar = require("webpackbar")
const { VueLoaderPlugin } = require('vue-loader')
const { STYLE_EXTS, SCRIPT_EXTS, POSTCSS_CONFIG_FILE } = require('../constants')
const { resolveApp } = require('../utils/resolve')
const { getEntryFile } = require("../utils")

const CSS_LOADERS = [
  require.resolve('style-loader'),
  require.resolve('css-loader'),
  {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: require(POSTCSS_CONFIG_FILE),
    },
  },
]

const plugins = [
  new WebpackBar({
    name: 'Kuan-pack',
    color: '#07c160',
  }),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  }),
  new VueLoaderPlugin(),
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
            loader: require.resolve('vue-loader'),
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
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [...CSS_LOADERS, require.resolve('less-loader')],
      }
    ],
  },
  plugins
}

module.exports = baseConfig