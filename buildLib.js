process.env.NODE_ENV = 'production'

const {
  buildLib
} = require('./src')

buildLib({
  entry: `${__dirname}/test`
})