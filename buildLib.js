process.env.NODE_ENV = 'production'

const { resolve } = require('./src/getConfig/utils')

const { buildLib } = require('./src')

buildLib({
  entry: resolve('test'),
  libName: 'test',
  distPath: resolve('lib'), // 输入地址 默认： dist
  htmlTemplate: false,
  extractCss: false
})
