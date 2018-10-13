process.env.NODE_ENV = 'development'

const { dev } = require('./src')

dev({
  entry: `${__dirname}/test`
})
