const fs = require('fs')
const {
  resolve
} = require('./utils')

// webpack默认配置
const defaultConfig = {
  port: 8000, // 开发端口
  entry: resolve('src'), // 打包入口 默认： src/index.js
  publicPath: '', // sdn路径 默认：空
  staticPath: resolve('public'), // 静态资源目录 public
  distPath: resolve('dist'), // 输入地址 默认： dist
  htmlTemplate: fs.existsSync(resolve('index.html')) ? resolve('index.html') : `${__dirname}/../index.html`,
  htmlName: 'index.html', // 输出html路径 默认：'index.html'
  proxy: {}, // 代理地址
  libName: process.env.npm_package_name,
  extractCss: true,
  config: {} // 会合并到webpack.config
}

console.log(defaultConfig.distPath);


// 获取用户webpack配置
const configPath = resolve('kuan.js')
const userConfig = !fs.existsSync(configPath) ? {} : require(configPath)

// 最终webpack默认配置
module.exports = {
  ...defaultConfig,
  ...userConfig
}