import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/my-blog/',
  title: 'Joker Huo - 前端知识库',
  description: '前端知识库',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端笔记', link: '/前端笔记/HTML.md' },
      { text: 'Java笔记', link: '/Java笔记/Java.md' }
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
          ]
        }
      ],
      '/Java笔记/': [
        {
          text: 'Java笔记',
          items: [{ text: 'Java', link: '/Java笔记/Java.md' }]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/2479897753/my-blog.git' }]
  }
})
