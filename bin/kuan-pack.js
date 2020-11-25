#!/usr/bin/env node
const program = require('commander')
program
  .version(require('../package').version, '-v, --version')
  .option('-c, --config <configPath>', 'webpack config configPath', 'webpack.config.js')
  .option('-s, --public <staticPath>', 'webpack staticPath setting', 'public')
  .option('-n, --libName <libraryName>', 'custom library name')

program
  .command('dev [entry]')
  .description('webpack serve for production')
  .action((entry) => {
    const dev = require('../src/dev')
    dev(entry, program)
  })

program
  .command('build [entry]')
  .description('webpack build for production')
  .action((entry) => {
    const build = require('../src/build-prod')
    build(entry, program)
  })

program
  .command('build:package [entry]')
  .description('webpack build for package')
  .action((entry) => {
    const build = require('../src/build-package')
    build(entry, program)
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
