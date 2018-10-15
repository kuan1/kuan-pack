#!/usr/bin/env node

switch (process.argv[2]) {
  case 'dev':
    // 本地开发
    process.env.NODE_ENV = 'development'
    const serve = require('../src/dev')
    serve()
    break
  case 'build':
    process.env.NODE_ENV = 'production'
    const build = require('../src/build')
    build()
    break
  case 'build:lib':
    process.env.NODE_ENV = 'production'
    process.env.EXTRACT_CSS = '0'
    process.env.DISCARD_HTML = '0'
    const build = require('../src/buildLib')
    build()
    break
  default:
    console.error(`Unknown command ${process.argv[2]}`)
    process.exit(1)
}
