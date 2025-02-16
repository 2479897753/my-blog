## 配置
```javascript

```

## 配置环境变量
> vite 内置了 dotenv 这个第三方库，dotenv 会自动读取 .env 文件，并解析这个文件中的对应环境变量并将其注入到 process 对象下(但是 vite 考虑到和其他配置的一些冲突问题，他不会直接注入到 process 对象下)
>

+  `**process**`** **是 `**node**`** **中的全局变量 
+  `**process.cwd()**` 会返回当前 `**node**`** **进程的工作目录 
+  `**process.env**` 可以获得环境变量 

**如果是组件内，**`**vite**`** 会将对应的环境变量注入到 **`**import.meta.env**`** 里去**

```javascript
import { defineConfig, loadEnv } from 'vite'

// command 的值为 serve 表示在开发环境，command 的值为 build 表示在生产环境
// mode 的值为 development 表示在开发环境，mode 的值为 production 表示在生产环境
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: env.APP_ENV
    }
  }
})
```

### 策略模式区分运行环境
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//策略模式
const envResolver = {
    "build": ()=>Object.assign({}, baseConfig, 生产环境的vite配置),
    "serve": ()=>Object.assign({}, baseConfig,开发环境的vite配置)
}

// https://vitejs.dev/config/
export default defineConfig(({command: "build" | "serve"})=>{
    return envResolver[command]();
})
```

### 全局环境
> `**.env**` 文件定义的变量，是全局的环境变量
>

### 开发环境
> `**.env.development**` 文件定义的变量，是开发环境的环境变量
>

+ 对应的命令：`**vite**`

```shell
# 开发环境根地址
VITE_APP_BASE_URL=http://localhost:8080
```

### 生产环境
> `**.env.production**` 文件定义的变量，是生产环境的环境变量
>

+ 对应的命令：`**vite build**`

```shell
# 生产环境根地址
VITE_APP_BASE_URL=http://localhost:3000
```

### 测试环境
> `**.env.testing**` 文件定义的变量，是测试环境的环境变量
>

+ 对应的命令：`**vite --mode testing**`

### 预发布环境
> `**.env.staging**` 文件定义的变量，是与发布环境的环境变量
>

+ 对应的命令：`**vite build --mode staging**`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vite --mode testing",
    "stag": "vite build --mode staging",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  }
}
```

## `path.resolve` 和 `path.join` 的区别
```javascript
path.resolve('/a', 'b', 'c') // return: "/a/b/c"
path.resolve('/a', '/b', 'c') // return: "/b/c"
path.resolve('/a', '/b', '/c') // return: "/c"

path.join('a', 'b', 'c') // return: "a/b/c"
path.join('/a', 'b', 'c') // return: "/a/b/c"
path.join('/a', '/b', 'c') // return: "/a/b/c"
path.join('/a', '/b', '/c') // return: "/a/b/c"
```

**无参数时**

+ **注意：**「当前工作目录」和「当前目录」的区别

```javascript
path.resolve() // 返回当前工作目录，相当于 `process.cwd()`，是绝对路径。
path.join() // 返回 `.`（当前目录），是相对路径。
```

**有参数时**

```javascript
path.resolve('/a', '/b', 'c') // 返回 `/b/c`，绝对路径。
path.join('/a', '/b', 'c') // 返回 `/a/b/c`，绝对路径。
```

```javascript
path.resolve('a', '/b', 'c') // 返回 `/b/c`，绝对路径。
path.join('a', '/b', 'c') // 返回 `a/b/c`，相对路径。
```

## postcss
> 将最新的 CSS 转换为大多数浏览器都能够理解的内容
>

+ 安装

```shell
npm i postcss-preset-env -D
```

+ 使用

```javascript
import { defineConfig } from 'vite'

const postcssPresetEnv = require('postcss-preset-env')
const path = require('path')

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssPresetEnv({
        // 意思是说让postcss知道，有一些全局变量它需要记下来
        // __dirname 始终返回当前文件所在目录
        importFrom: path.resolve(__dirname, './variable.css')
      })]
    }
  }
})
```

## 配置路径别名
```javascript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  }
})
```

## 处理 `svg` 资源
### 第一种使用 `svg` 的方式
```javascript
import svgIcon from './assets/svgs/fullScreen.svg'

console.log('svgIcon', svgIcon)
const img = document.createElement('img')
img.src = svgIcon
document.body.appendChild(img)
```

### 第二种使用 `svg` 的方式
```javascript
import svgRaw from './assets/svgs/fullScreen.svg?raw'

document.body.innerHTML = svgRaw
const svgElement = document.getElementByTagName('svg')[0]
svgElement.onmouseenter = function() {
  // svg 图标使用 fill 更改颜色
  this.style.fill = 'red'
}
```

## 解决跨域
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## 打包配置
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 配置 rollup 的一些构建策略
    rollupOptions: {
      // 控制输出
      output: {
        // 在 rollup 中，hash代表将你的文件名和文件内容进行组合计算得来的结果
        assetFileNames: '[hash].[name].[ext]'
      }
    },
    // 只要小于这个大小就会将静态资源转成base64格式
    assetsInlineLimit: 4096, // 默认大小4kb
    // 配置打包目录
    outDir: 'testDist',
    // 配置打包目录中的静态资源目录
    assetsDir: 'static',
    // 清除输出目录中的所有文件
    emptyOutDir: true
  }
})
```

## Vite 插件
> Vite 会在不同生命周期中去调用不同的插件以达到不同的目的
>

### `vite-aliases` 自动配置路径别名
**安装**

```shell
npm i vite-aliases -D
```

**使用**

```javascript
import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'

export default defineConfig({
  plugins: [
    // 自动检测配置别名
    ViteAliases()
  ]
})
```

### `vite-plugin-html`
+ 功能： 
    - HTML 压缩能力
    - EJS 模版能力
    - 多页应用支持
    - 支持自定义 `**entry**`
    - 支持自定义 `**template**`

**安装**

```shell
npm i vite-plugin-html -D
```

**使用**

```javascript
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: '首页'
        }
      }
    })
  ]
})
```

### `vite-plugin-mock` 提供本地和生产模拟服务
> vite 的数据模拟插件，是基于 vite.js 开发的。 并同时支持本地环境和生产环境。 Connect 服务中间件在本地使用，mockjs 在生产环境中使用。
>

**安装**

```shell
npm i mockjs -S

npm i vite-plugin-mock -D
```

**使用**

```javascript
import { defineConfig } from ''
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    viteMockServe()
  ]
})
```

```javascript
// mock/index.js
import Mock from 'mockjs'

const { data } = Mock.mock({
  'data|100': [{
    name: '@cname',
    'id|+1': 1,
    date: '@date'
  }]
})

module.exports = [
  {
    method: 'post',
    url: '/api/users',
    response: ({ body }) => {
      // body 就是请求体
      return {
        code: 200,
        msg: 'success',
        data
      }
    }
  }
]
```

## Vite 和 TS 的结合
**安装**

```shell
npm i vite-plugin-checker -D
```

**使用**

```javascript
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    checker({
      typescript: true
    })
  ]
})
```

```json
// tsconfig.json
// 配置ts的检查手段和检查规则
{
  "compilerOptions": {
    "skipLibCheck": true, // 是否跳过node_modules目录的检查
    "module": "ESNext"
  }
}
```

```tsx
// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROXY_TARGET: string
}
```

## Vite性能优化
### 性能优化概述
1. 页面性能指标
    - 首屏渲染：fcp（first content paint）页面中第一个元素的渲染时长
        * 懒加载：路由懒加载、图片懒加载
        * http优化：协商缓存、强缓存
2. js 逻辑
    - 清除副作用：计时器、事件监听
    - 防抖、节流、lodash js工具
3. css
    - 继承：能继承的属性就不需要重写
    - 尽量避免太过于深的css嵌套
4. 构建优化
    - 优化体积：压缩，treeshaking，图片资源压缩，cdn加载，分包 ...

### 构建优化
#### 分包策略
> 分包就是把一些不会常规更新的文件，进行单独打包处理
>

```json
// tsconfig.json
// 去配置一些ts的检查手段和检查规则
{
  "compilerOptions": {
    "moduleResolution": "node",
    "skipLibCheck": true, // 是否跳过 node_modules 目录的检查
    "module": "ESNext",
    "lib": ["ES2017", "DOM"],
    "allowSyntheticDefaultImports": true
  }
}
```

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import path from 'path'

export default defineConfig({
  build: {
    minify: false, // 禁止打包压缩
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html'),
        product: path.resolve(__dirname, './product.html')
      },
      output: {
        manualChunks: (id: string) => {
          // ts认为你这个当前环境不在es6以后
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  plugins: [checker({
    typescript: true
  })]
})
```

#### gzip 压缩
+ **注意：**体积不是很大的话，不要用 gzip 压缩

```javascript
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: {
    viteCompression()
  }
})
```

#### cdn 加速
1. 安装

```shell
npm i vite-plugin-cdn-import -D
```

2. 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { autoComplete, Plugin as importToCDN } from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [
    vue(),
    importToCDN({
      modules: [
        autoComplete('vue'), // 自动导入的cdn
        {
          name: 'element-plus',
          var: 'ElementPlus', // 根据main.ts中定义的来
          path: 'https://unpkg.com/element-plus@2.2.28/dist/index.full.js',
          css: 'https://unpkg.com/element-plus@2.2.28/dist/index.css'
        }
      ]
    })
  ]
})
```

3. 删除 main.ts 中不必要的代码

```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app')
```

