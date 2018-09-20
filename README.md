# kuan-pack
> 简化webpack，安装直接使用，不需要安装任何东西

## 安装
```
yarn add kuan-pack --dev
# or
npm run kuan-pack -D
```

## 开发
```
kuan-pack dev
```

## 编译
```
kuan-pack build
```

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