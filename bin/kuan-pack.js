#!/usr/bin/env node
const program = require('commander')

program
  .version(require('../package').version, '-v, --version')
  .option('-c, --config <configPath>', 'webpack config configPath', 'webpack.config.js')

program
  .command('dev <entry>')
  .description('webpack serve for production')
  .action(() => {
    process.env.NODE_ENV = 'development'
    const { dev } = require('../index')
    dev()
  })

program
  .command('build')
  .description('webpack build for production')
  .action(() => {
    process.env.NODE_ENV = 'production'
    const { build } = require('../index')
    build()
  })

program
  .command('build:package')
  .description('webpack build for package')
  .action(() => {
    const build = require('../src/build-package')
    build()
  })

program
  .command('gen babel')
  .description("generate babel.config.js")
  .action(() => {
    const genBabelConfig = require('../src/gen-babel-config')
    genBabelConfig()
  })

program
  .command('test')
  .description('kuan-pack for test success?')
  .action(() => {
    console.log('kuan-pack test success!')
  })

program.parse(process.argv)
