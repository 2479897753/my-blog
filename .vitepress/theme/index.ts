import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('MyGlobalComponent' /* ... */)
  }
} satisfies Theme