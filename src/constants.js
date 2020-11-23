const { resolve, resolveApp } = require("./utils/resolve")

// kuan-pac
exports.PACKAGE_JSON_FILE = resolve('package.json')
exports.POSTCSS_CONFIG_FILE = resolve('src/config/postcss.config.js')

// root
exports.ROOT_PACKAGE_JSON_FILE = resolveApp('package.json')
exports.WEBPACK_CONFIG_FILE = resolveApp('webpack.config.js')
exports.ROOT_POSTCSS_CONFIG_FILE = resolveApp('postcss.config.js')
exports.ROOT_BABEL_CONFIG = resolveApp('babel.config.js')

exports.SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx']
exports.STYLE_EXTS = ['.css', '.less', '.scss']