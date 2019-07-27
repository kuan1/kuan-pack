const webpack = require('webpack')
const defaultConfig = require('./webpack.prod.conf')

module.exports = ({ config = defaultConfig, onSuccess } = {}) => {
  webpack(config, (err, stats) => {
    const message = `${stats.toString({ colors: true })} \n`
    if (err || stats.hasErrors()) {
      process.stdout.write('\x07') // 声音报警
      console.error(err || message)
      process.exit(1)
    }

    if (onSuccess) {
      onSuccess({
        stats
      })
    }
    console.log(message)
  })
}
