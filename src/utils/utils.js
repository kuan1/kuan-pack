const address = require('address')
const chalk = require("chalk")

exports.logServerInfo = (port) => {
  const local = `http://localhost:${port}/`
  const network = `http://${address.ip()}:${port}/`

  console.log('\n  Site running at:\n')
  console.log(`  ${chalk.bold('Local')}:    ${chalk.hex(GREEN)(local)} `)
  console.log(`  ${chalk.bold('Network')}:  ${chalk.hex(GREEN)(network)}`)
}

exports.setEnv = (config) => {
  Object.assign(process.env, config)
}