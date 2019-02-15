#!/usr/bin/env node
const pkg = require('../package.json')

switch (process.argv[2]) {
  // 版本
  case '-v':
    console.log(`${pkg.name}: ${pkg.version}`)
  case 'dev':
    // 本地开发
    process.env.NODE_ENV = 'development'
    const dev = require('../build/dev')
    dev()
    break
  case 'build':
    process.env.NODE_ENV = 'production'
    const build = require('../build/build')
    build()
    break
  case 'build:lib':
    process.env.NODE_ENV = 'production'
    const buildLib = require('../build/buildLib')
    buildLib()
    break
  default:
    console.error(`Unknown command ${process.argv[2]}`)
    process.exit(1)
}
