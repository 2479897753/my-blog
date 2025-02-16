import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/my-blog/',
  title: 'Joker Huo - 前端知识库',
  description: '前端知识库',
  head: [['link', { rel: 'icon', href: '/my-blog/favicon.ico' }]],
  appearance: 'dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { light: '/book.svg', dark: '/book_light.svg' },

    nav: [
      { text: '首页', link: '/' },
      { text: '前端笔记', link: '/前端笔记/HTML.md', activeMatch: '^/前端笔记/' },
      { text: 'Java笔记', link: '/Java笔记/Java.md', activeMatch: '^/Java笔记/' },
      { text: '项目配置', link: '/项目配置/Vue CLI配置.md', activeMatch: '^/项目配置/' },
      { text: '组件封装', link: '/组件封装/JS组件封装.md', activeMatch: '^/组件封装/' },
      { text: '函数封装', link: '/函数封装/常用工具函数.md', activeMatch: '^/函数封装/' },
      { text: '性能优化', link: '/性能优化/前端性能优化.md', activeMatch: '^/性能优化/' },
      { text: '开发技巧', link: '/开发技巧/前端开发技巧.md', activeMatch: '^/开发技巧/' },
      { text: '开发工具', link: '/开发工具/PowerShell 个性化配置.md', activeMatch: '^/开发工具/' }
    ],

    sidebar: {
      '/前端笔记/': [
        {
          text: '前端笔记',
          items: [
            { text: 'HTML', link: '/前端笔记/HTML.md' },
            { text: 'CSS', link: '/前端笔记/CSS.md' },
            { text: 'SASS', link: '/前端笔记/SASS.md' },
            { text: 'Less', link: '/前端笔记/Less.md' },
            { text: 'Tailwind CSS', link: '/前端笔记/Tailwind CSS.md' },
            { text: 'UnoCSS', link: '/前端笔记/UnoCSS.md' },
            { text: 'JS', link: '/前端笔记/JS.md' },
            { text: 'WebAPI', link: '/前端笔记/WebAPI.md' },
            { text: 'ES6', link: '/前端笔记/ES6.md' },
            { text: 'Ajax', link: '/前端笔记/Ajax.md' },
            { text: 'FetchAPI', link: '/前端笔记/FetchAPI.md' },
            { text: 'Node.js', link: '/前端笔记/Node.js.md' },
            { text: 'Git', link: '/前端笔记/Git.md' },
            { text: 'Mock.js', link: '/前端笔记/Mock.js.md' },
            { text: 'SVG', link: '/前端笔记/SVG.md' },
            { text: 'Canvas', link: '/前端笔记/Canvas.md' },
            { text: 'Vue 2', link: '/前端笔记/Vue 2.md' },
            { text: 'Vue 3', link: '/前端笔记/Vue 3.md' },
            { text: 'VueUse', link: '/前端笔记/VueUse.md' },
            { text: 'Vue Router 3', link: '/前端笔记/Vue Router 3.md' },
            { text: 'Vuex', link: '/前端笔记/Vuex.md' },
            { text: 'Pinia', link: '/前端笔记/Pinia.md' },
            { text: 'TypeScript', link: '/前端笔记/TypeScript.md' },
            { text: '微信小程序', link: '/前端笔记/微信小程序.md' },
            { text: 'uni-app', link: '/前端笔记/uni-app.md' },
            { text: 'React 19', link: '/前端笔记/React 19.md' },
            { text: 'React Hooks', link: '/前端笔记/React Hooks.md' },
            { text: 'Three.js', link: '/前端笔记/Three.js.md' },
            { text: '文件上传', link: '/前端笔记/文件上传.md' },
            { text: '文件下载', link: '/前端笔记/文件下载.md' },
            { text: 'Excel、Word下载和预览', link: '/前端笔记/Excel、Word下载和预览.md' },
            { text: '项目内嵌 iframe - 交互', link: '/前端笔记/项目内嵌 iframe - 交互.md' },
            { text: '浏览器跨标签页通信', link: '/前端笔记/浏览器跨标签页通信.md' },
            { text: 'Lodash 常用方法', link: '/前端笔记/Lodash 常用方法.md' },
            { text: 'ECharts 常用配置', link: '/前端笔记/ECharts 常用配置.md' },
            { text: 'Web Worker 基本使用', link: '/前端笔记/Web Worker 基本使用.md' },
            { text: 'WebSocket 基本使用', link: '/前端笔记/WebSocket 基本使用.md' },
            { text: 'SSE 基本使用', link: '/前端笔记/SSE 基本使用.md' },
            { text: 'JSON Server 基本使用', link: '/前端笔记/JSON Server 基本使用.md' },
            { text: 'Chrome 扩展开发', link: '/前端笔记/Chrome 扩展开发.md' },
            { text: 'JS设计模式', link: '/前端笔记/JS设计模式.md' },
            { text: '前端算法', link: '/前端笔记/前端算法.md' },
            { text: 'Vim', link: '/前端笔记/Vim.md' }
          ]
        }
      ],
      '/Java笔记/': [
        {
          text: 'Java笔记',
          items: [
            { text: 'Java', link: '/Java笔记/Java.md' },
            { text: 'Java 高级', link: '/Java笔记/Java 高级.md' },
            { text: 'MySQL', link: '/Java笔记/MySQL.md' },
            { text: 'Mybatis', link: '/Java笔记/Mybatis.md' },
            { text: 'Maven', link: '/Java笔记/Maven.md' },
            { text: 'Maven 高级', link: '/Java笔记/Maven 高级.md' },
            { text: 'SpringBoot', link: '/Java笔记/SpringBoot.md' },
            { text: 'Spring AOP', link: '/Java笔记/Spring AOP.md' },
            { text: 'SpringBoot 原理', link: '/Java笔记/SpringBoot 原理.md' },
            { text: 'Linux', link: '/Java笔记/Linux.md' },
            { text: 'Nginx', link: '/Java笔记/Nginx.md' },
            { text: 'Java 设计模式', link: '/Java笔记/Java 设计模式.md' },
            { text: 'Java 算法', link: '/Java笔记/Java 算法.md' }
          ]
        }
      ],
      '/项目配置/': [
        {
          text: '项目配置',
          items: [
            { text: 'Vue CLI配置', link: '/项目配置/Vue CLI配置.md' },
            { text: 'Vite配置', link: '/项目配置/Vite配置.md' },
            { text: 'editorconfig 配置', link: '/项目配置/editorconfig 配置.md' },
            { text: 'prettierrc.json配置', link: '/项目配置/prettierrc.json配置.md' },
            { text: 'eslintrc.cjs配置', link: '/项目配置/eslintrc.cjs配置.md' },
            { text: 'tsconfig.json配置', link: '/项目配置/tsconfig.json配置.md' },
            { text: '开启TS托管模式', link: '/项目配置/开启TS托管模式.md' },
            { text: 'package.json限制node版本', link: '/项目配置/package.json限制node版本.md' },
            { text: '配置代码检查工作流', link: '/项目配置/配置代码检查工作流.md' },
            { text: '自动引入依赖', link: '/项目配置/自动引入依赖.md' },
            { text: 'Sass安装配置', link: '/项目配置/Sass安装配置.md' },
            { text: 'Less安装配置', link: '/项目配置/Less安装配置.md' },
            { text: 'SVG图标使用和配置', link: '/项目配置/SVG图标使用和配置.md' },
            { text: '自定义字体配置', link: '/项目配置/自定义字体配置.md' }
          ]
        }
      ],
      '/组件封装/': [
        {
          text: '组件封装',
          items: [
            { text: 'JS组件封装', link: '/组件封装/JS组件封装.md' },
            { text: 'Vue组件封装', link: '/组件封装/Vue组件封装.md' }
          ]
        }
      ],
      '/函数封装/': [
        {
          text: '函数封装',
          items: [
            { text: '常用工具函数', link: '/函数封装/常用工具函数.md' },
            { text: '请求工具', link: '/函数封装/请求工具.md' },
            { text: '并发请求工具', link: '/函数封装/并发请求工具.md' },
            { text: '动画', link: '/函数封装/动画.md' }
          ]
        }
      ],
      '/性能优化/': [
        {
          text: '性能优化',
          items: [{ text: '前端性能优化', link: '/性能优化/前端性能优化.md' }]
        }
      ],
      '/开发技巧/': [
        {
          text: '开发技巧',
          items: [
            { text: '前端开发技巧', link: '/开发技巧/前端开发技巧.md' },
            { text: 'Java开发技巧', link: '/开发技巧/Java开发技巧.md' }
          ]
        }
      ],
      '/开发工具/': [
        {
          text: '开发工具',
          items: [
            { text: 'PowerShell 个性化配置', link: '/开发工具/PowerShell 个性化配置.md' },
            { text: 'Git 安装与配置', link: '/开发工具/Git 安装与配置.md' },
            { text: 'SVN 安装与配置', link: '/开发工具/SVN 安装与配置.md' },
            { text: 'Scoop 安装与配置', link: '/开发工具/Scoop 安装与配置.md' },
            { text: 'FNM 安装与配置', link: '/开发工具/FNM 安装与配置.md' },
            { text: 'Maven 安装与配置', link: '/开发工具/Maven 安装与配置.md' },
            { text: 'MySQL 安装与配置', link: '/开发工具/MySQL 安装与配置.md' },
            { text: 'Redis 安装与配置', link: '/开发工具/Redis 安装与配置.md' },
            { text: 'JDK 安装与配置', link: '/开发工具/JDK 安装与配置.md' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/2479897753/my-blog.git' }]
  }
})
