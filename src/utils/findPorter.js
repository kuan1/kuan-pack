const portfinder = require('portfinder')

// 查找没有被占用的端口号
module.exports = function findPorter(basePort) {
  return new Promise((resolve, reject) => {
    portfinder.basePort = basePort
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        resolve(port)
      }
    })
  })
}
