const { buildLib } = require('./index')

function extend(config) {
  config.output.path = `${__dirname}/lib`
}

buildLib(extend)