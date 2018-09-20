# kuan-pack
> 加入常用webpack配置，安装直接使用

## webpack配置
> 根目录放置 kuan-pack.js
```
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'test'),
  publicPath: '', // 只针对生产环境
  distPath: path.resolve(__dirname, 'dist'), // 只针对生产环境
  proxy: {
    '/api': {
      target: 'https://luzhongkuan.cn/api',
      changeOrigin: true
    }
  },
  config: {
    // 会合并到webpack.config
  }
}
```