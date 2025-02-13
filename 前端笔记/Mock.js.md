> 生成随机数据，拦截 Ajax 请求
>

## 使用 `mockjs`
1. 安装 `mockjs`

```shell
npm install mockjs
```

2. 新建 `mock` 文件

```javascript
// 导入mock模块
import Mock from 'mockjs'
```

3. 使用

```javascript
// 在 main.js 中引入
import Vue from 'vue'
import App FROM './App.vue'

import './mock/index.js'

Vue.config.productionTip = false

new Vue({
	render:h => h(App),
}).$mount('#app')
```

## `mock` 语法
### 生成字符串
```javascript
Mock.mock({
  "string|1-10": "★"
})

Mock.mock({
  "string|3": "★★★"
})
```

### 生成数字
```javascript
Mock.mock({
  "number|+1": 202
})

Mock.mock({
  "number|1-100": 100
})
```

### 生成布尔值
```javascript
Mock.mock({
  "boolean|1": true
})

Mock.mock({
  "boolean|1-2": true
})
```

### 生成对象
```javascript
Mock.mock({
  "object|2": {
    "310000": "上海市",
    "320000": "江苏省",
    "330000": "浙江省",
    "340000": "安徽省"
  }
})

Mock.mock({
  "object|2-4": {
    "110000": "北京市",
    "120000": "天津市",
    "130000": "河北省",
    "140000": "山西省"
  }
})
```

### 生成数组
```javascript
Mock.mock({
  "array|1": [
    "AMD",
    "CMD",
    "UMD"
  ]
})

Mock.mock({
  "array|+1": [
    "AMD",
    "CMD",
    "UMD"
  ]
})


Mock.mock({
  "array|1-10": [
    "Hello",
    "Mock.js",
    "!"
  ]
})

Mock.mock({
  "array|3": [
    "Hello",
    "Mock.js",
    "!"
  ]
})
```

### 生成文字
```javascript
Mock.mock('@cword')

Mock.mock('@cword("零一二三四五六七八九十")')

Mock.mock('@cword(3)')

Mock.mock('@cword("零一二三四五六七八九十", 3)')

Mock.mock('@cword(3, 5)')

Mock.mock('@cword("零一二三四五六七八九十", 5, 7)')
```

### 生成标题
```javascript
Mock.mock('@ctitle')

Mock.mock('@ctitle(5)')

Mock.mock('@ctitle(3, 5)')
```

### 生成句子
```javascript
Mock.mock('@csentence')

Mock.mock('@csentence(5)')

Mock.mock('@csentence(3, 5)')
```

### 生成段落
```javascript
Mock.mock('@cparagraph')

Mock.mock('@cparagraph(2)')

Mock.mock('@cparagraph(1, 3)')
```

### 生成 id
```javascript
Mock.mock('@increment')

Mock.mock('@increment(100)')
```

### 生成姓名
```javascript
Mock.mock('@cname')
```

### 生成身份证号
```javascript
Mock.mock('@id')
```

### 生成地址
```javascript
Mock.mock('@city')

Mock.mock('@city(true)')
```

### 生成时间
```javascript
Mock.mock('@date')

Mock.mock('@date("yyyy-MM-dd")')

Mock.mock('@time')

Mock.mock('@datetime')
```

## 使用 extend 扩展 Mock.Random 对象
1. 使用 Mock.Random.extend 方法添加自定义的随机数据生成方法

```javascript
Mock.Random.extend({
  customMethod: function() {
    return 'custom data';
  }
});
```

2. 在需要生成随机数据的地方，使用 @customMethod 来调用自定义方法

```javascript
var data = Mock.mock({
  'result': {
    'value': '@customMethod'
  }
});
console.log(data.result.value); // 输出：'custom data'
```

## `mock` 拦截请求
### 定义 `get` 请求
```javascript
Mock.mock(/\/api\/get\/news/, 'get', options => {
  // options 中包含请求信息
  console.log(options)
  return{
    status:200,
    message:"获取数据成功"
  }
})
```

### 定义 `post` 请求
```javascript
Mock.mock(/\/api\/get\/news/, 'post', options => {
  // options 中包含请求信息
  console.log(options)
  return{
    status:200,
    message:"获取数据成功"
  }
})
```

## 实际应用场景
### `mock` 分页功能
```javascript
import Mock from 'mockjs'

Mock.setup({
  timeout: 1000
})

const randoms = Mock.mock({
  'list|178': [
    {
      id: '@increment',
      billNumber: /^[a-z]\d{20}$/,
      billDate: '@date(yyyy-MM-dd)',
      invoiceCode: /^[a-z]\d{20}$/,
      invoiceNumber: /^[a-z]\d{20}$/,
      invoiceDate: '@date(yyyy-MM-dd)',
      invoiceAuthStatus: '@pick(["未认证", "已认证", "不认证"])',
      invoiceStatus: '@pick(["正常", "失控", "作废", "红冲"])',
      newBillAuthTime: '@date(yyyy-MM-dd hh:mm:ss)',
      invoiceAuthDate: '@date(yyyy-MM-dd hh:mm:ss)',
      invoiceIssuer: '@cname()',
      invoiceAmount: /[1-9][0-9]{2,}/,
      invoiceTax: /[1-9][0-9]{2,}/,
      invoiceTotalAmount: /[1-9][0-9]{2,}/,
      newBillAuthMethod: '@pick(["系统认证", "线下勾选"])',
      attachment: '@pick(["是", "否"])',
      billStatus: '@pick(["专票认证"])'
    }
  ]
})

const responseData = options => {
  const params = Object.fromEntries(new URLSearchParams(options.url.split('?')[1]))
  const { page, pageSize } = params
  delete params.page
  delete params.pageSize
  const list = randoms.list.filter(item => {
    for (const key in params) {
      if (item[key] !== params[key]) return false
    }
    return true
  })
  const start = (page - 1) * pageSize
  const end = page * pageSize > randoms.list.length ? randoms.list.length : page * pageSize
  return {
    list: list.slice(start, end),
    total: list.length
  }
}

// /\/api\/enum\/(\w+)/ 后面的是占位符

// 获取列表数据
Mock.mock(/\/reimburseInvoice\/list/, 'get', options => {
  const { list, total } = responseData(options)
  return {
    status: 200,
    message: '获取数据成功',
    data: {
      list,
      total
    }
  }
})
```

