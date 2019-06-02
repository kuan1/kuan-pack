#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package').version, '-v, --version')

program
  .command('dev')
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
  .command('buildLib')
  .description('webpack build for lib')
  .action(() => {
    process.env.NODE_ENV = 'production'
    const { buildLib } = require('../index')
    buildLib()
  })

program
  .command('test')
  .description('kuan-pack for test success?')
  .action(() => {
    console.log('kuan-pack test success!')
  })

program.parse(process.argv)

if (program.args.length < 1) return program.help()