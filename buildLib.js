process.env.NODE_ENV = 'production'
process.env.EXTRACT_CSS = '0'
process.env.DISCARD_HTML = '0'

const { resolve } = require('./src/webpackConfig/utils')

const { buildLib } = require('./src')

buildLib({
  entry: resolve('test'),
  libName: 'testBoundle',
  distPath: resolve('lib'), // 输入地址 默认： dist
  extractCss: false
})
