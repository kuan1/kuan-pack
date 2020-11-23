const webpack = require("webpack")

module.exports = async function build(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      const message = `${stats.toString({ colors: true })} \n`
      if (err || (stats && stats.hasErrors())) {
        process.stdout.write('\x07') // 声音报警
        console.error(err || message)
        reject(err || '打包失败')
      } else {
        console.log(message)
        resolve('打包成功')
      }
    })
  })
}
