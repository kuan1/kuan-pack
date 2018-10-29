const webpack = require('webpack')
const getConfig = require('./getConfig')

module.exports = (userConfig, onSuccess, onFail) => {
  const webpackConfig = getConfig(userConfig)

  webpack(webpackConfig, (err, stats) => {
    const message = `${stats.toString({ colors: true })} \n`
    if (err || stats.hasErrors()) {
      process.stdout.write('\x07') // 声音报警
      console.log(err || message)
      if (onFail) {
        onFail({
          err,
          stats
        })
      }
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
