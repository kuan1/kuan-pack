process.env.NODE_ENV = 'production'

const {
  resolve
} = require('./src/webpackConfig/utils')

const {
  buildLib
} = require('./src')

buildLib({
  entry: resolve('test'),
  distPath: resolve('lib'), // 输入地址 默认： dist
})