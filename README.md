# kuan-pack

> 简化 webpack，安装直接使用，不需要安装其他依赖，甚至不需要配置。默认支持 vue

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

## webpack 配置

> 根目录放置 kuan.js (kuan-pack.js 和 bin 下路径包名冲突)

```
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'test'), // 打包入口 默认： src/index.js
  publicPath: '', // sdn路径 默认：空
  staticPath: path.resolve(__dirname, 'public'), // 静态资源目录 public
  distPath: path.resolve(__dirname, 'dist'), // 输入地址 默认： dist
  htmlTemplate: 'index.html', // 模板html 默认：根目录index.html > 内部自定义模板
  htmlName: 'index.html', // 输出html路径 默认：'index.html'
  proxy: { // 代理地址
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

## 更新

v1.0.7

- 静态资源目录 static -> public
- window 和 mac 换行符问题
