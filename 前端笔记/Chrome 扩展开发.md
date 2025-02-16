**开发文档：**[**https://chrome.cenchy.com/**](https://chrome.cenchy.com/)

## 构建扩展程序
1. **添加扩展程序的相关信息**

> 在项目根目录创建 `**manifest.json**` 文件，该清单文件是唯一的必需文件
>

+ **说明：**
    - 该文件必须位于项目的根目录下
    - `**"manifest_version"**`、`**"name"**` 和 `**"version"**`** **是必需的键

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "在 Chrome 扩展文档文章中添加阅读时间"
}
```

2. **提供图标**

> 创建 images 目录，将对应尺寸的图标放入该目录下
>

+ `**16x16**` - 扩展程序页面和上下文菜单上的网站图标
+ `**32x32**` - Windows 计算机通常需要此大小
+ `**48x48**` - 显示在“扩展程序”页面上
+ `**128x128**` - 在安装和 Chrome 应用商店中显示

```json
{
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
}
```

3. **声明内容脚本**

> 扩展程序可以运行读取和修改网页内容的脚本
>

+ **说明：**
    - `**"matches"**` 字段可以具有一个或多个匹配模式。通过这些方法，确定要将内容脚本注入哪些网站。

```json
{
  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
        "https://developer.chrome.google.cn/docs/extensions/*",
        "https://developer.chrome.google.cn/docs/webstore/*"
      ]
    }
  ]
}
```

4. 计算并插入阅读时间

> 创建 scripts 目录，并在其文件夹中创建一个名为 content.js 文件
>

```javascript
const article = document.querySelector('article')

// `document.querySelector` 如果选择器不匹配任何东西可能返回null
if (article) {
  const text = article.textContent
  const wordMatchRegExp = /[^\s]+/g // 正则表达式
  const words = text.matchAll(wordMatchRegExp)
  // matchAll 返回一个迭代器，将其转换为数组以获取字数
  const wordCount = [...words].length
  const readingTime = Math.round(wordCount / 200)
  const badge = document.createElement('p')
  // 使用与文章标题中的发布信息相同的样式
  badge.classList.add('color-secondary-text', 'type--caption')
  badge.textContent = `⏱ 阅读时长：${readingTime} 分钟`

  // 支持 API 参考文档
  const heading = article.querySelector('h1')
  // 支持带有日期的文章文档
  const date = article.querySelector('time')?.parentNode

  ;(date ?? heading).insertAdjacentElement('afterend', badge)
}
```

