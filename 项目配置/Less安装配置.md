## Webpack中使用
1. **安装**

```shell
npm install --save-dev less less-loader
```

2. **配置**

```javascript
// vue.config.js
module.exports = {
  // ...其他配置
  module: {
    rules: [
      // ...其他规则
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          // {
          //   loader: 'less-loader',
          //   options: {
          //     prependData: '@import "./src/assets/style/global.less";'
          //   }
          // }
        ]
      }
    ]
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        prependData: '@import "./src/assets/style/global.less";'
      }
    },
    sourceMap: false
  }
}
```

## Vite中使用
1. **安装**

```shell
npm install --save-dev less less-loader
```

2. **配置**

```javascript
// vite.config.js
export default defineConfig({
  // ...其他配置
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "./src/assets/style/global.less";'
      }
    }
  }
})
```

