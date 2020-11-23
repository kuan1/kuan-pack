const fs = require('fs-extra')
const address = require('address')
const chalk = require("chalk")
const { WEBPACK_CONFIG_FILE, ROOT_PACKAGE_JSON_FILE, HTML_TPL_FILE, ROOT_HTML_TPL_FILE } = require('../constants')
const { resolveApp } = require('./resolve')

exports.logServerInfo = (port) => {
  const local = `http://localhost:${port}/`
  const network = `http://${address.ip()}:${port}/`

  console.log('\n  Site running at:\n')
  console.log(`  ${chalk.bold('Local')}:    ${chalk.cyan(local)} `)
  console.log(`  ${chalk.bold('Network')}:  ${chalk.cyan(network)}`)
}

exports.getRootWebpackConfig = () => {
  return fs.pathExistsSync(WEBPACK_CONFIG_FILE) ? require(WEBPACK_CONFIG_FILE) : {}
}

exports.getRootPkg = () => {
  if (fs.pathExistsSync(ROOT_PACKAGE_JSON_FILE)) {
    return require(ROOT_PACKAGE_JSON_FILE)
  }
  return { name: 'index' }
}

exports.getHTMLTemplate = () => {
  if (fs.pathExistsSync(ROOT_HTML_TPL_FILE)) {
    return ROOT_HTML_TPL_FILE
  }
  return HTML_TPL_FILE
}

exports.getEntryFile = () => {
  const src = process.env.KUAN_PACK_ENTRY || 'src'
  return resolveApp(src)
}