const {getProdConfig} = require('./src')

const options = {
  entry: `${__dirname}/test`
}

module.exports = getProdConfig(options)