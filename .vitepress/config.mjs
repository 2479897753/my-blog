import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/repo/',
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
          items: [{ text: 'HTML', link: '/前端笔记/HTML.md' }]
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
