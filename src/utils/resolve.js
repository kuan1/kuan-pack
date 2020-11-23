const path = require('path')

const CWD = process.cwd()

console.log(CWD)

exports.resolveApp = (...dir) => path.resolve(CWD, ...dir)
exports.resolve = (...dir) => path.resolve(__dirname, '..', '..', ...dir)
