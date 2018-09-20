const webpackConfig = require('../src/webpack.config')
const devServer = require('../src/dev')
const build = require('../src/build')

switch (process.argv[2]) {
  case 'dev':
    devServer({
      webpackConfig,
    })
    break
  case 'build':
    build({
      webpackConfig
    })
    break
  default:
    console.error(`Unknown command ${process.argv[2]}`)
    process.exit(1)
}
