const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'test'), // 打包入口 默认： src/index.js
  publicPath: '', // sdn路径 默认：空
  distPath: path.resolve(__dirname, 'dist'), // 输入地址 默认： dist
  staticPath: path.resolve(__dirname, 'public'), // 静态资源目录 public
  htmlTemplate: 'index.html', // 模板html 默认：根目录index.html > 内部自定义模板
  htmlName: 'index.html', // 输出html路径 默认：'index.html'
  proxy: { // 代理地址
    '/api': {
      target: 'https://luzhongkuan.cn/api',
      changeOrigin: true
    }
  },
  historyApiFallback: true, // history路由刷新
  config: {
    // 会合并到webpack.config
  }
}