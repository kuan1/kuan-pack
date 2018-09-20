const webpackConfig = require('../src/webpack.config')
const devServer = require('../src/dev')
const build = require('../src/build')

switch (process.argv[2]) {
  case 'dev':
    process.env.NODE_ENV = 'development'
    devServer({
      webpackConfig,
    })
    break
  case 'build':
    process.env.NODE_ENV = 'production'
    build({
      webpackConfig
    })
    break
  default:
    console.error(`Unknown command ${process.argv[2]}`)
    process.exit(1)
}
