## HTML 插值
> `**public/index.html**` 文件是一个会被 html-webpack-plugin 处理的模板。在构建过程中，资源链接会被自动注入。
>

+ `**<%= VALUE %>**` 用来做不转义插值
+ `**<%- VALUE %>**` 用来做 HTML 转义插值
+ `**<% expression %>**` 用来描述 JavaScript 流程控制

```html
<!-- 除了被 html-webpack-plugin 暴露的默认值之外，所有客户端环境变量也可以直接使用 -->
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

## 模式
+ 默认情况下，一个 Vue CLI 项目有三个模式：
    - `**development**` 模式用于 `**vue-cli-service serve**`
    - `**test**` 模式用于 `**vue-cli-service test:unit**`
    - `**production**` 模式用于 `**vue-cli-service build**` 和 `**vue-cli-service test:e2e**`
+ 可以通过 `**--mode**` 选项参数为命令行覆写默认的模式，不同模式下会使用不同的环境变量，所有的环境变量都是从对应的环境文件中载入的

```shell
vue-cli-service build --mode development
```

## 环境变量
+ 在项目根目录放置以下文件来指定环境变量：

```shell
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

+ 一个环境文件只包含环境变量的“键=值”对：

```shell
FOO=foo
BAR=bar
VUE_APP_NOT_SECRET_CODE=some_value

# Vue CLI 3.5+ 支持
CONCAT=$FOO$BAR # CONCAT=foobar
```

:::info
**Tips：**

+ 只有 `**NODE_ENV**`，`**BASE_URL**` 和以 `**VUE_APP_**` 开头的变量将通过 `**webpack.DefinePlugin**` 静态地嵌入到客户端侧的代码中

:::

**在客户端侧代码中使用环境变量：**

```javascript
console.log(process.env.VUE_APP_SECRET)
```

## vue.config.js
:::info
**Tips：**

+ **相对路径 publicPath 的限制**（在以下情况下，应当避免使用相对 publicPath）
    - 当使用基于 HTML5 `**history.pushState**` 的路由时；
    - 当使用 `**pages**` 选项构建多页面应用时。

:::

```javascript
const { defineConfig } = require('@vue/cli-service')
// defineConfig 函数可以获得更好的类型提示
module.exports = defineConfig({
  transpileDependencies: true, // 开启依赖包的自动转译
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 设置部署路径
  devServer: {
    host: '0.0.0.0', // 允许外部访问
    open: true, // 自动打开浏览器
    // 在浏览器中显示编译警告和错误，默认情况下，只有在编译过程中出现错误时才会显示。
    overlay: {
      warnings: false,
      errors: true
    },	
    // 代理
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // 目标地址
        // ws: true, // 解决websocket问题
        changeOrigin: true, // 允许跨域
        // 路径重写
        pathRewrite: {
          '^/api': ''
        }
      }
      // '/foo': {
      //   target: 'http://192.168.115.110'
      // }
    }
  }
})
```

## 打包优化
### 开发环境排除某些文件夹下对 js 的处理
```javascript
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    // 开发环境打包时，Webpack 只处理非 node_modules 和 src 文件夹中的 JavaScript 文件。
    if (process.env.NODE_ENV === 'development') {
      config.module.rule('js').exclude.add(resolve('/node_modules')).add(resolve('/src'))
    }
    // ...
  }
  // ...
}

```

### dll 打包优化
> 前端dll打包是指将前端代码打包成一个或多个动态链接库（DLL）文件的过程。这样做的目的是为了提高前端代码的复用性和性能。
>

#### 安装 webpack-cli
```shell
# 需要安装与 webpack 指定版本的 webpack-cli
# vue-cli webpack4 对应的 webpack-cli@3.3.12
npm install webpack-cli@3.3.12 --save-dev
```

#### 创建 webpack.dll.js 文件
```javascript
// 用来提前打包一些第三方库
const path = require('path')
const webpack = require('webpack')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'vuex', 'vue-router', 'element-ui', 'echarts']
  }, // 打包的模块
  output: {
    path: path.join(__dirname, dllPath), // 打包后的文件存放的地方
    filename: '[name].dll.js', // 打包后输出文件的文件名 - vendor.dll.js
    // 保持与 Webpack.DllPlugin 中名称一致
    library: '[name]_[hash]' // 打包后全局变量名称，即 vendor.dll.js 中暴露出的全局变量名
  },
  plugins: [
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'), // 打包后输出manifest.json的存放地址 - vendor.manifest.json
      // 保持与 output.library 中名称一致
      name: '[name]_library', // 打包后全局变量名称
      context: process.cwd()
    })
  ]
}
```

#### 配置 dll 打包指令
> `**npm run dll**` 运行指令生成 dll 打包文件
>

```json
{
  "scripts": {
    "dll": "webpack --config webpack.dll.js",
  }
}
```

#### 在 index.html 中引入打包后的 dll 文件
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="<%= BASE_URL %>favicon.ico">
    <!-- 引入文件 -->
    <script src="<%= BASE_URL %>vendor/vendor.dll.js"></script>
    <title>Document</title>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

#### 配置 vue.config.js 文件
> 配置完成后，运行 `**npm run serve**`** **进行打包
>

```javascript
const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    // 开发环境打包时，Webpack 只处理非 node_modules 和 src 文件夹中的 JavaScript 文件。
    if (process.env.NODE_ENV === 'development') {
      config.module.rule('js').exclude.add(resolve('/node_modules')).add(resolve('/src'))
    }
    // ...
  }
  // ...
}
```

