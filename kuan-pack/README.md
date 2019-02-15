# kuan-pack

> 简化 webpack，安装直接使用，不需要安装其他依赖，甚至不需要配置。新版本已经去除 Vue 支持，

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

> 根目录放置 kuan-pack.config.js

```
module.exports = {
  // port: 8000, // 开发端口
  // proxy: {}, // 代理地址
  // entry: { [pkgName]: resolve('src') }, // 打包入口 默认： src/index.js
  // publicPath: '', // cdn路径 默认：空
  // staticPath: resolve('public'), // 静态资源目录 public
  // distPath: resolve('dist'), // 输入地址 默认： dist
  // html: resolveFile('index.html') || `${__dirname}/../index.html`, // 默认html模板
  // libName: pkgName, // 打包文件名字
  // externals: {} // 打包忽略
}

```

## 更新

v2.0.0

- 重写 kuan-pack，结构更加清晰
- 去除 vue 支持，准备单独发布 vue 支持版本

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
