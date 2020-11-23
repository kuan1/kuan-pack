const path = require('path')

const CWD = process.cwd()

exports.resolveApp = (...dir) => path.resolve(CWD, ...dir)
exports.resolve = (...dir) => path.resolve(__dirname, '..', '..', ...dir)
