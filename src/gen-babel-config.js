const fs = require('fs-extra')
const chalk = require("chalk")
const { ROOT_BABEL_CONFIG } = require("./constants")

const defaultBabelConfig = {
  presets: ['kuan-pack/preset'],
}

module.exports = async () => {
  const isExist = await fs.pathExists(ROOT_BABEL_CONFIG)
  if (!isExist) {
    const config = `module.exports = ${JSON.stringify(defaultBabelConfig, null, 2)}`
    await fs.writeFile(ROOT_BABEL_CONFIG, config)
    console.log(chalk.cyan('generate babel.config.js success!'))
  } else {
    console.log(chalk.gray('babel.config.js is already exist!'))
  }
}
