```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/singleline-html-element-content-newline': 'off', // 不检查单行元素的内容是否换行
    // prettier配置
    'prettier/prettier': [
      'warn',
      {
        semi: false, // 末尾不加分号
        tabWidth: 2, // 缩进2个空格
        singleQuote: true, // 使用单引号
        printWidth: 100, // 每行最大100个字符
        trailingComma: 'none', // 不添加尾随逗号
        arrowParens: 'avoid', // 箭头函数参数只有一个时不加括号
        endOfLine: 'auto' // 自动识别换行符
      }
    ],
    // 组件名使用多个单词
    'vue/multi-word-component-names': 'warn',
    // 函数名后面加空格
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always', // 匿名函数总是加空格
        named: 'never', // 命名函数不加空格
        asyncArrow: 'always' // 异步箭头函数总是加空格
      }
    ],
    // 单行最多属性个数
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 10 // 单行最多10个属性
      }
    ],
    // 组件标签闭合
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
```

