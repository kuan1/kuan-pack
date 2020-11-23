# kuan-pack(不建议其他人使用，推荐 @vue/cli)

> vue3.0 快速打包工具。

## 介绍

```bash
Usage: kuan-pack [options] [command]

Options:
  -v, --version              output the version number
  -c, --config <configPath>  webpack config configPath (default: "webpack.config.js")
  -s --public <staticPath>   webpack staticPath setting (default: "public")
  -h, --help                 output usage information

Commands:
  dev [entry]                webpack serve for production
  build [entry]              webpack build for production
  build:package [entry]      webpack build for package
  gen                        generate babel.config.js
  test                       kuan-pack for test success?
```
