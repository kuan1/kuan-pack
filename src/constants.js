const { resolve, resolveApp } = require("./utils/resolve")

// kuan-pac
exports.PACKAGE_JSON_FILE = resolve('package.json')
exports.POSTCSS_CONFIG_FILE = resolve('src/config/postcss.config.js')
exports.HTML_TPL_FILE = resolve('src/config/tpl.html')

// root
exports.ROOT_STATIC_DIR = resolveApp(process.env.KUAN_PACK_PUBLIC || 'public')
exports.ROOT_HTML_TPL_FILE = resolveApp('public/index.html')
exports.ROOT_PACKAGE_JSON_FILE = resolveApp('package.json')
exports.WEBPACK_CONFIG_FILE = resolveApp(process.env.KUAN_PACK_WEBPACK_CONFIG || 'webpack.config.js')
exports.ROOT_POSTCSS_CONFIG_FILE = resolveApp('postcss.config.js')
exports.ROOT_BABEL_CONFIG = resolveApp('babel.config.js')

exports.SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx']
exports.STYLE_EXTS = ['.css', '.less', '.scss']