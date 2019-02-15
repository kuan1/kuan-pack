process.env.NODE_ENV = 'development'

const { dev } = require('./src')

dev({
  stylePath: 'test/style',
  entry: `${__dirname}/test`
})
