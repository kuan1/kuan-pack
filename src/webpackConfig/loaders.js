const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

// cssLoader
const getCssLoader = (name) => {
  return [{
      loader: !isProd ? 'style-loader' : MiniCssExtractPlugin.loader
    }, // 将 JS 字符串生成为 style 节点
    {
      loader: 'css-loader'
    }, // 将 CSS 转化成 CommonJS 模块
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('autoprefixer')({
            'browsers': ['> 1%', 'last 2 versions']
          })
        ],
      }
    },
    {
      loader: `${name}-loader` // 将 Sass 编译成 CSS
    }
  ]
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
      'autoprefixer': {}
    }
  }

  const styleLoader = !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader

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

module.exports = {
  lessLoader: getCssLoader('less'),
  sassLoader: getCssLoader('sass'),
  vueLoader
}