const { buildLib } = require('./index')
const config = require('./build/webpack.lib.disperse.conf')

function extend(config) {
  config.output.path = `${__dirname}/lib`
}

buildLib({ extend })