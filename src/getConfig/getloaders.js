const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('./utils')

module.exports = options => {
  const extractCss = process.env.NODE_ENV === 'production' && options.extractCss

  // cssLoader
  const getCssLoader = name => {
    const loader = [
      {
        loader: !extractCss ? 'style-loader' : MiniCssExtractPlugin.loader
      }, // 将 JS 字符串生成为 style 节点
      {
        loader: 'css-loader'
      }, // 将 CSS 转化成 CommonJS 模块
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer')({
              browsers: ['> 1%', 'last 2 versions']
            })
          ]
        }
      }
    ]
    if (name) {
      loader.push({
        loader: `${name}-loader` // 将 Sass 编译成 CSS
      })
    }
    if (['less', 'sass'].includes(name)) {
      const nameMirror = {
        less: 'less',
        sass: 'scss'
      }
      const variablePath = resolve(
        `${options.stylePath}/variable.${nameMirror[name]}`
      )
      const mixinsPath = resolve(
        `${options.stylePath}/mixins.${nameMirror[name]}`
      )
      const resources = []
      if (fs.existsSync(variablePath)) resources.push(variablePath)
      if (fs.existsSync(mixinsPath)) resources.push(mixinsPath)
      if (resources.length) {
        loader.push({
          loader: 'sass-resources-loader',
          options: {
            resources
          }
        })
      }
    }
    return loader
  }

  // vue loader
  const vueLoader = (() => {
    const cssLoader = {
      loader: 'css-loader',
      options: {
        sourceMap: false
      }
    }
    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: false
      },
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        // to edit target browsers: use "browserslist" field in package.json
        autoprefixer: {}
      }
    }

    const styleLoader = !extractCss
      ? 'vue-style-loader'
      : MiniCssExtractPlugin.loader

    return {
      loaders: {
        css: [styleLoader, cssLoader, postcssLoader],
        sass: [styleLoader, cssLoader, postcssLoader, 'sass-loader']
      },
      cssSourceMap: false,
      cacheBusting: true,
      transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
      }
    }
  })()

  return {
    cssLoader: getCssLoader(),
    lessLoader: getCssLoader('less'),
    sassLoader: getCssLoader('sass'),
    vueLoader
  }
}
