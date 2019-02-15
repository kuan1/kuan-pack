process.env.NODE_ENV = 'production'

const { build } = require('./src')

build({
  entry: `${__dirname}/test`,
  stylePath: 'test/style'
})
