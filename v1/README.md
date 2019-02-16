# kuan-pack

> 简化 webpack，安装直接使用，不需要安装其他依赖，甚至不需要配置。默认支持 vue

## 安装

```
yarn add kuan-pack --dev
# or
npm i kuan-pack -D
```

## 开发

```
kuan-pack dev
```

## 编译

```
kuan-pack build
kuan-pack build:lib # 打包插件
```

## webpack 配置

> 根目录放置 kuan.js (kuan-pack.js 和 bin 下路径包名冲突)

```
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'test'), // 打包入口 默认： src/index.js
  publicPath: '', // sdn路径 默认：空
  distPath: path.resolve(__dirname, 'dist'), // 输入地址 默认： dist
  staticPath: path.resolve(__dirname, 'public'), // 静态资源目录 public
  htmlTemplate: 'index.html', // 模板html 默认：根目录index.html > 内部自定义模板
  htmlName: 'index.html', // 输出html路径 默认：'index.html'
  proxy: {
    // 代理地址
    '/api': {
      target: 'https://luzhongkuan.cn/api',
      changeOrigin: true
    }
  },
  disabledClean: false, // 是否自动清空dist
  extractCss: true, // 抽取css
  stylePath: 'src/style', // 设置less，sass变量文件夹
  config: {
    // 会合并到webpack.config
  }
}
```

## 更新

v1.1.4

"@babel/plugin-syntax-dynamic-import",

v1.1.2

- @babel/runtime

v1.0.14

- 默认安装 sass-resources-loader

v1.0.13

- 添加 sass-resources-loader
- 添加 sourceMap
- 去 console.log
- 新增配置详情请看

v1.0.12

- svg

v1.0.11

- fix scss-loader

v1.0.10

- 单独设置 css loader
- 关闭 clean-webpack-plugin: process.env.DISABLE_CLEAN = '0'

v1.0.9

- 默认 html 模板

v1.0.8

- 添加打包插件功能 使用: `kuan-pack build:lib`, 获取自定义使用 `buildLib.js`

v1.0.7

- 静态资源目录 static -> public
- window 和 mac 换行符问题