# kuan-pack
> 统一管理webpack配置，准备中

## 项目根目录下边创建.eslintrc，统一管理eslint风格
```
{
  "extends": "kuan-pack/eslint",
  "rules": {
  }
}
```

## 获取webpack配置
```
const options = {
  entry: '', // 打包入口
  PORT: '', // 端口号
  proxy: '', // 代理地址
  staticPath: '静态目录地址', // 静态资源地址
  publicPath: 'cdn路径', // cdn地址
  distPath: 'dist' // 打包目录
}
const devConfig = getDevConfig(options)
```