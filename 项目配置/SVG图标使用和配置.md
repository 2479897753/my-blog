## 使用 Symbol
### 封装 SvgIcon 组件
_**components/SvgIcon.vue**_

```vue
<script setup>
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#333'
  }
})

// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`
})

// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  vertical-align: -2px;

  use {
    fill: currentColor;
  }
}
</style>
```

### 注册组件
_**src/main.js**_

```javascript
// main.js
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import './assets/styles/index.less'

// 引入Symbol图标文件
import './assets/fonts/iconfont'
import SvgIcon from '@/components/SvgIcon.vue'

// 注册全局icon图标组件
app.component('SvgIcon', SvgIcon)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

### 使用组件
```vue
<template>
  <div>
    <SvgIcon iconName="icon-save"></SvgIcon>
  </div>
</template>
```

## 使用 svg-sprite-loader
### 安装
```shell
npm install svg-sprite-loader --save-dev
```

### 配置
_**vue.config.js**_

```javascript
const path = require('path');
const resolve = dir => path.join(__dirname, dir)
 
module.exports = {
  // ...
  chainWebpack: config => {
    // 配置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
};
```

### 封装
```vue
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="svgPath" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    iconPrefix: {
      type: String,
      default: 'icon-'
    }
  },
  data() {
    return {}
  },
  computed: {
    iconName() {
      return this.iconClass.replace(this.iconPrefix, '')
    },
    svgClass() {
      return `svg-icon svg-icon-${this.iconName} ${this.className}`
    },
    svgPath() {
      return isExternal(this.iconClass) ? this.iconClass : `#${this.iconPrefix}${this.iconName}`
    }
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

### 注册
_**src/icons/index.js**_

```javascript
import SvgIcon from '@/components/SvgIcon.vue'

const plugin = {
  install(Vue) {
    Vue.component('SvgIcon', SvgIcon)
    const requireAll = requireContext => requireContext.keys().map(requireContext)
    const req = require.context('./svg', false, /\.svg$/)
    requireAll(req)
  }
}

export default plugin
```

_**main.js**_

```javascript
import Vue from 'vue'

// 自定义图标
import Icons from './icons'
Vue.use(Icons)
```

### 使用
```vue
<!-- icon-class的值对应的是目录中svg的名字 -->
<svg-icon icon-class="user" />
<svg-icon icon-class="advert" color='#27ac3d' />
<svg-icon icon-class="brand" color='red' />
```

## 使用 vite-plugin-svg-icons 插件
### 安装插件
```shell
yarn add vite-plugin-svg-icons -D
# or
npm i vite-plugin-svg-icons -D
# or
pnpm install vite-plugin-svg-icons -D
```

### 配置插件
_**vite.config.ts**_

```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: [
        './src/composables/**',
        './src/stores/**',
        './src/service/**',
        './src/utils/**',
        './src/api/**'
      ],
      dts: true,
      eslintrc: {
        enabled: true
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "@/styles/variable.scss";`
      }
    }
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 3000
  }
})
```

### 注册脚本
_**src/main.ts**_

```typescript
import 'virtual:svg-icons-register'
```

### 封装 SvgIcon 组件
_**components/SvgIcon.vue**_

```vue
<script setup lang="ts">
defineOptions({
  name: 'SvgIcon',
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<{
    name: string
    color?: string
  }>(),
  {
    color: '#333'
  }
)

const symbolId = computed(() => {
  return `#icon-${props.name}`
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <svg @click="emit('click')" class="svg-icon" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  vertical-align: -2px;

  use {
    fill: currentColor;
  }
}
</style>
```

### 使用组件
```vue
<!-- 
  # src/icons
  
  - icon1.svg
  - icon2.svg
  - icon3.svg
  - dir/icon1.svg
 -->

<template>
  <div>
    <SvgIcon name="icon1"></SvgIcon>
    <SvgIcon name="icon2"></SvgIcon>
    <SvgIcon name="icon3"></SvgIcon>
    <SvgIcon name="dir-icon1"></SvgIcon>
  </div>
</template>
```

