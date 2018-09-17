const {getDevConfig} = require('./src')

const options = {
  entry: `${__dirname}/test`
}

module.exports = getDevConfig(options)