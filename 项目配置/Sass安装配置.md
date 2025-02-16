## Webpack中使用
1. **安装**

```shell
npm install --save-dev sass-loader node-sass
```

2. **配置**

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
```

## Vite中使用
1. **安装**

```shell
npm install --save-dev sass
```

2. 配置

```javascript
// vite.config.js
export default defineConfig({
  // ...其他配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/variables.scss";'
      }
    }
  }
})
```

