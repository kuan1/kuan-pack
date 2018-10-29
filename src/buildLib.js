const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const getDefault = require('./getConfig/getDefault')
const getConfig = require('./getConfig')

module.exports = (userConfig, onSuccess, onFail) => {
  const options = getDefault(userConfig)
  const webpackConfig = getConfig(options)

  webpackConfig.externals = [nodeExternals()]
  delete webpackConfig.optimization

  const output = {
    filename: `${options.libName}.js`,
    library: options.libName,
    libraryTarget: 'commonjs2'
  }
  webpackConfig.output = {
    ...webpackConfig.output,
    ...output
  }

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
