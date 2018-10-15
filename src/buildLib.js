const webpack = require('webpack')
const getProdCOnfig = require('./webpackConfig/getProdConfig')
const nodeExternals = require('webpack-node-externals')
const defaultConfig = require('./webpackConfig/default')

module.exports = (userConfig, onSuccess, onFail) => {
  const options = {
    ...defaultConfig,
    ...userConfig
  }
  const webpackConfig = getProdCOnfig(userConfig)
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
