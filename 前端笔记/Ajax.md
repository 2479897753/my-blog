## HTTP 常见请求方式
### `get` 请求
> 从服务器端 **<font style="color:#DF2A3F;">获取数据</font>**，请求body在地址栏上，用于获取资源，是安全的，幂等的
>

### `post` 请求
> 向服务器端 **<font style="color:#DF2A3F;">提交数据</font>**，请求数据在报文body里，发送一个修改数据的请求，需求数据要重新创建，用于创建、更新、删除资源、查询资源都可以，非安全，非幂等
>

### `put` 请求
> 向服务器端提交数据，请求数据在报文body里边，发送一个修改数据的请求，需求数据更新（**<font style="color:#DF2A3F;">全部更新</font>**），用于添加更新资源，非安全，幂等
>

### `delete` 请求
> 向服务器端提交数据，请求数据在报文body里边，发送一个 **<font style="color:#DF2A3F;">删除数据</font>** 的请求，用于删除资源，非安全，幂等
>

### `patch` 请求
> 向服务器端提交数据，请求数据在报文body里边，发送一个修改数据的请求，需求数据更新（**<font style="color:#DF2A3F;">部分更新</font>**），用于更新一部分资源，且是局部更新，非安全，幂等。
>

## 什么是 Ajax
> `Ajax` 的全称是 `Asynchronous JavaScript And XML`（异步 `JavaScript` 和 `xml`）
>
> 通俗理解：在网页中利用 `XMLHttpRequest` 对象和服务器进行数据交互的方式，就是 `Ajax`
>

## 什么是 axios
`axios` 是一个专门用于发送 `ajax` 请求的库

### `axios.get()` 发送 `GET` 请求
+ 语法：`axios.get('url', { params: { /*参数*/ } }).then(callback)`

```html
<button>axios 获取 数据</button>
<script>
  var button = document.querySelector('button')
  button.addEventListener('click', function () {
    var obj = {
      id: 1
    }
    var url = 'http://www.liulongbin.top:3006/api/getbooks'
    axios.get(url, {params:obj}).then(function ({ data }) {
      console.log(data);
    })
  })
</script>
```

### `axios.post()` 发送 `POST` 请求
+ 语法：`axios.post('url', { /*参数*/ }).then(callback)`

```html
<button>post 传递数据</button>
<script>
  var button = document.querySelector('button')
  button.addEventListener('click', function(){
    var data = {
      bookname: '测试1',
      author: '测试1',
      publisher: '测试1'
    }
    var url = 'http://www.liulongbin.top:3006/api/addbook'
    axios.post(url, data).then(function({data}) {
      console.log(data);
    })
  })
</script>
```

### 使用 `axios()` 发送请求
+ 语法：

```javascript
axios({
  method: '请求方式', // get, post
  url: '请求地址',
  data: { /* POST数据 */ }, // 拼接到请求体的参数,  post请求的参数
  params: { /* GET参数 */ } // 拼接到请求行的参数, get请求的参数
}).then(res => {
  console.log(res.data) // 后台返回的结果
}).catch(err => {
  console.log(err) // 后台返回的错误信息
})
```

**发送 **`get`** 请求**

```javascript
btn1.addEventListener('click', function() {
  var urlget = 'http://www.liulongbin.top:3006/api/getbooks'
  axios({
    method: 'GET',
    url: urlget,
    params: {id: 1}
  }).then(function({data}) {
    console.log(data);
  })
})
```

**发送 **`post`** 请求**

```javascript
btn2.addEventListener('click', function(){
  var urlpost = 'http://www.liulongbin.top:3006/api/addbook'
  axios({
    method: 'POST',
    url: urlpost,
    data: {bookname: '测试1', author: '测试1', publisher: '测试1'}
  }).then(function({data}) {
    console.log(data);
  })
})
```

### axios 的默认配置
```javascript
// 获取按钮
const btns = document.querySelectorAll('button');

// 默认配置
axios.defaults.method = 'GET'; // 设置默认的请求类型为 GET
axios.defaults.baseURL = 'http://localhost:3000'; // 设置基础 URL
axios.defaults.params = { id: 100 };
axios.defaults.timeout = 3000; // 如果请求发送时间等于 3秒 则停止请求

// 为所有请求设置了授权头信息
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
// 为所有 post 的请求设置授权头
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
 

btns[0].onclick = function () {
    axios({
        url: '/posts'
    }).then(response => {
        console.log(response);
    })
}
```

### axios 实例化配置
```javascript
import axios from 'axios'

// service 的功能和 axios 几乎一样
const service = axios.create({
  baseURL: 'http://123.57.109.30:3006',
  timeout: 5000,
  // 实例化配置请求头
  headers: {
    Authorization : `Bearer ${localStorage.getItem("access_token")}`
  }
})

// 可以重新设置请求等待时间
service.defaults.timeout = 3000

export default service
```

### axios 请求拦截器和响应拦截器
```javascript
// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`};
    // ...
  	return config;
  },
  error => {
    // ...
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.reponse.use(
  res => {
    // ...
    return config;
  },
  error => {
    // ...
    return Promise.reject(error);
  }
);
```

### 取消请求
#### CancelToken
```javascript
// 使用 axios.CancelToken 取消请求 (适用于旧版 axios)
import axios from 'axios'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

function fetchData() {
  axios
    .get('https://api.example.com/data', {
      cancelToken: source.token
    })
    .then(response => {
      console.log('Response:', response.data)
    })
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message)
      } else {
        console.error('Error:', error)
      }
    })
}

// 发起请求
fetchData()

// 在需要取消请求的时候调用
source.cancel('Operation canceled by the user.')
```

#### AbortController
```javascript
// 使用 AbortController 取消请求 (推荐在新版 axios 中使用)
const axios = require('axios')

const controller = new AbortController()

function fetchData() {
  axios
    .get('https://api.example.com/data', {
      signal: controller.signal
    })
    .then(response => {
      console.log('Response:', response.data)
    })
    .catch(error => {
      if (error.name === 'CanceledError' || error.message === 'canceled') {
        console.log('Request canceled')
      } else {
        console.error('Error:', error)
      }
    })
}

// 发起请求
fetchData()

// 在需要取消请求的时候调用
controller.abort()
```

## `XMLHTTPRequest` 对象
### 使用 xhr 发起 `GET` 请求
```javascript
// 1.创建 xhr 对象
const xhr = new XMLHttpRequest()
// 2.调用 open 函数，与服务器进行连接
xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks?id=1')
// 3.调用 send 函数，发送 ajax 请求
xhr.send()
// 4.监听 onreadystatechange 事件
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 获取服务器响应的数据
    console.log(xhr.responseText)
  }
}
```

### 使用 xhr 发起 `POST` 请求
```javascript
// 1.创建 xhr 对象
const xhr = new XMLHttpRequest()
// 2.调用 open 函数，与服务器进行连接
xhr.open('POST', 'http://www.liulongbin.top:3006/api/addbook')
// 3.设置请求头参数格式类型
xhr.setRequestHeader('Content-Type', 'x-www-form-urlencoded')
// 3.调用 send 函数，发送 ajax 请求
xhr.send('bookname=水浒传&author=施耐庵&publisher=上海图书出版社')
// 4.监听 onreadystatechange 事件
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 获取服务器响应的数据
    console.log(xhr.responseText)
  }
}
```

### xhr 对象的 `readyState` 属性
> `XMLHttpRequest` 对象的 `readyState` 属性，用来表示<font style="color:#DF2A3F;">当前 </font>`<font style="color:#DF2A3F;">Ajax</font>`<font style="color:#DF2A3F;"> 请求所处的状态</font>。每个 `Ajax` 请求必然处于以下状态中的一个：
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675256691338-af98fed7-3332-4446-8afd-6d6bc6ada948.png)

## URL 编码与解码
### `encodeURI` 和 `decodeURI`
> 特殊符号`; / ? : @ & = + $ , #`不进行编码，**注意：** **<font style="color:#DF2A3F;">它不对单引号</font>**`<font style="color:#DF2A3F;">'</font>`**<font style="color:#DF2A3F;">编码</font>**
>

```javascript
let url = "http://localhost:8080/index.html?name=李星云&age=23"
 
// encodeURI() 编码：
let encodeURI_url = encodeURI(url) // 'http://localhost:8080/index.html?name=%E6%9D%8E%E6%98%9F%E4%BA%91&age=23'
 
// decodeURI() 解码：
decodeURI(encodeURI_url) // 'http://localhost:8080/index.html?name=李星云&age=23'
```

### `encodeURIComponent` 和 `decodeURIComponent`（推荐使用）
> 特殊符号也可以进行编码
>

```javascript
let url = "http://localhost:8080/index.html?name=李星云&age=23"
 
// encodeURIComponent() 编码：
let encodeURI_url = encodeURIComponent(url) // 'http%3A%2F%2Flocalhost%3A8080%2Findex.html%3Fname%3D%E6%9D%8E%E6%98%9F%E4%BA%91%26age%3D23'
 
// decodeURIComponent() 解码：
decodeURIComponent(encodeURI_url) // 'http://localhost:8080/index.html?name=李星云&age=23'
```

## 数据交换格式
### XML
> `XML` 的英文全称是 `EXtensible Markup Language`，即 **<font style="color:#DF2A3F;">可扩展标记语言</font>**
>

+ `XML` 是用来 **<font style="color:#DF2A3F;">传输和存储数据</font>**，是数据的载体
+ `XML` 格式臃肿，和数据无关的代码多，体积大，传输效率低

### JSON
> `JSON` 的英文全称是 `JavaScript Object Notation`，即 **<font style="color:#DF2A3F;">JavaScript 对象表示法</font>**
>

+ `JSON` 是一种轻量级的文本数据交换格式，在作用上类似于 `XML`，专门用于 **<font style="color:#DF2A3F;">存储和传输数据</font>**，但是 `JSON` 比 `XML` 更小、更快、更易解析
+ `JSON` 中包含 **<font style="color:#DF2A3F;">对象</font>**和**<font style="color:#DF2A3F;">数组</font>**两种结构，`key` 必须使用英文的双引号包裹，`value`** **数据类型可以是**<font style="color:#DF2A3F;">数字、字符串、布尔值、null、数组、对象</font>** 6 种类型

`JSON` 语法**注意事项：**

1. **<font style="color:#DF2A3F;">属性名</font>** 必须使用 **<font style="color:#DF2A3F;">双引号</font>** 包裹
2. **<font style="color:#DF2A3F;">字符串</font>** 类型的值必须使用 **<font style="color:#DF2A3F;">双引号</font>** 包裹
3. `JSON` 中 **<font style="color:#DF2A3F;">不能写注释</font>**
4. `JSON` 的 **<font style="color:#DF2A3F;">最外层</font>** 必须是 **<font style="color:#DF2A3F;">对象</font>** 或 **<font style="color:#DF2A3F;">数组</font>** 格式
5. **<font style="color:#DF2A3F;">不能使用</font>** `undefined` 或 **<font style="color:#DF2A3F;">函数</font>** 作为 `JSON` 的值

### <font style="background-color:rgb(190, 164, 0);">序列化和反序列化</font>
> 把 **<font style="color:#DF2A3F;">数据对象</font>** <font style="color:#DF2A3F;"> </font>**<font style="color:#DF2A3F;">转换为</font>**<font style="color:#DF2A3F;"> </font>**<font style="color:#DF2A3F;">字符串</font>**的过程，叫做**<font style="color:#DF2A3F;">序列化</font>**，例如：调用 `JSON.stringify()` 函数的操作，叫做 `JSON` 序列化
>

> 把 **<font style="color:#DF2A3F;">字符串</font>** **<font style="color:#DF2A3F;">转换为</font>** **<font style="color:#DF2A3F;">数据对象</font>** 的过程，叫做 **<font style="color:#DF2A3F;">反序列化</font>**，例如：调用 `JSON.parse()` 函数的操作，叫做 `JSON` 反序列化
>

## 封装 `Ajax` 函数
```javascript
// 处理 data 参数
function resolveData(data) {
  var arr = []
  for (let key in data) {
    arr.push(`${key}=${data[key]}`)
  }
  return arr.join('&')
}

// 定义封装函数
function myAxios(options) {
  const xhr = new XMLHttpRequest()
  const qs = resolveData(options.data)
  if (options.method.toUpperCase() === 'GET') {
    xhr.open('GET', options.url + `${options.data ? '?' + qs : ''}`)
    xhr.send()
  } else if (options.method.toUpperCase() === 'POST') {
    xhr.open('POST', options.url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(`${qs}`)
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      options.success(JSON.parse(xhr.responseText))
    }
  }
}
```

**测试封装**

```javascript
// 测试 get 请求方法
myAxios({
  method: 'GET',
  url: 'http://www.liulongbin.top:3006/api/getbooks',
  data: {
    id: 1
  },
  success: function (res) {
    console.log(res)
  }
})

// 测试 post 请求方法
myAxios({
  method: 'POST',
  url: 'http://www.liulongbin.top:3006/api/addbook',
  data: {
    bookname: '血狼传',
    author: '黑色小白',
    publisher: '天地出版社'
  },
  success: function (res) {
    console.log(res)
  }
})
```

## `XMLHttpRequest Level2` 新特性
1. 可以 **<font style="color:#DF2A3F;">设置 </font>**`HTTP`**<font style="color:#DF2A3F;"> 请求的时限</font>**
2. 可以使用 `FormData`**<font style="color:#DF2A3F;"> 对象管理表单数据</font>**
3. 可以 **<font style="color:#DF2A3F;">上传文件</font>**
4. 可以获得 **<font style="color:#DF2A3F;">数据传输的进度</font>** 信息

### 设置 `HTTP` 请求时限
> 新版本的 `XMLHttpRequest` 对象，增加了 `timeout` 属性，可以设置 `HTTP` 请求的时限，过了这个时限，就自动停止 `HTTP` 请求
>

> 与之配套的还有一个 `timeout` 事件，用来指定回调函数
>

```javascript
var xhr = new XMLHttpRequest()
// 设置 超时时间
xhr.timeout = 30
// 设置超时以后的处理函数
xhr.ontimeout = function () {
  console.log('请求超时了！')
}
xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks')
xhr.send()
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}
```

### 使用 `FormData` 对象管理表单数据
> Ajax 操作往往用来提交表单数据。为了方便表单处理，`HTML5` 新增了一个 `FormData` 对象，可以模拟表单操作：
>

```javascript
// 1. 新建 FormData 对象
var fd = new FormData()
// 2. 为 FormData 添加表单项
fd.append('uname', 'zs')
fd.append('upwd', '123456')
// 3. 创建 XHR 对象
var xhr = new XMLHttpRequest()
// 4. 指定请求类型与 URL 地址
xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
// 5. 直接提交 FormData 对象，这与提交网页表单的效果，完全一样
xhr.send(fd)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText))
  } 
}
```

`FormData` **对象也可以用来获取网页表单的值，示例代码如下：**

```html
<form id="form1">
  <input type="text" name="uname" />
  <input type="password" name="upwd" />
  <button>提交</button>
</form>
<script>
  // 获取表单元素
  var form = document.querySelector('#form1')
  // 监听表单元素的 submit 事件
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    // 根据 form 表单创建 FormData 对象，会自动将表单数据填充到 FormData 对象中
    var fd = new FormData(form)
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://www.liulongbin.top:3006/api/formdata')
    xhr.send(fd)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText))
      }
    }
  })
</script>
```

### 上传文件
> 新版 `XMLHttpRequest` 对象，不仅可以发送文本信息，还可以上传文件
>

```html
<!-- 1. 文件选择框 -->
<input type="file" id="file1" />
<!-- 2. 上传按钮 -->
<button id="btnUpload">上传文件</button>
<br />
<!-- 3. 显示上传到服务器上的图片 -->
<img src="" alt="" id="img" width="400" />

<script>
  // 1. 获取上传文件的按钮
  var btnUpload = document.querySelector('#btnUpload')
  // 2. 为按钮添加 click 事件监听
  btnUpload.addEventListener('click', function () {
    // 3. 获取到选择的文件列表
    var files = document.querySelector('#file1').files // 是一个数组
    if (files.length <= 0) return alert('请选择要上传的文件！')

    // 1. 创建 FormData 对象
    var fd = new FormData()
    // 2. 向 FormData 中追加文件
    fd.append('avatar', files[0])

    // 1. 创建 xhr 对象
    var xhr = new XMLHttpRequest()

    // 2. 调用 open 函数，指定请求类型与URL地址。其中，请求类型必须为 POST
    xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar')
    // 3. 发起请求
    xhr.send(fd)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText)
        if (data.status === 200) {
          // 上传文件成功
          // 将服务器返回的图片地址，设置为 <img> 标签的 src 属性
          document.querySelector('#img').src = 'http://www.liulongbin.top:3006' + data.url
        } else {
          // 上传文件失败
          console.log(data.message)
        }
      }
    }
  })
</script>
```

### 显示文件上传进度
1. 导入需要的库

```html
<link rel="stylesheet" href="./lib/bootstrap.css" />
```

2. 基于 `Bootstrap` 渲染进度条

```html
<div class="progress" style="width: 500px;">
  <div class="progress-bar progress-bar-striped active" id="percent"  style="width: 0%">
    0%
  </div>
</div>
```

3. 动态设置到进度条上
    - **注意：** 在与服务器建立连接之前监听上传事件

```javascript
// 监听 xhr.upload 的 onprogress 事件
xhr.upload.onprogress = function(e) {
  // e.lengthComputable 是一个布尔值，表示当前上传的资源是否具有可计算的长度
  if (e.lengthComputable) {
    // 1. 计算出当前上传进度的百分比
    // e.loaded 已传输的字节
    // e.total 需传输的总字节
    var loadCom = Math.ceil((e.loaded / e.total) * 100)
    var com = document.querySelector('#percent')
    com.style = `width:${loadCom}%`
    com.innerHTML = loadCom + '%'
  }
}
```

4. 监听上传完成的事件

```javascript
xhr.upload.onload = function() {
  document.querySelector('#percent').className = 'progress-bar progress-bar-success'
}
```

## 同源策略
> **同源策略**（英文全称 Same origin policy）是**浏览器**提供的一个**安全功能**
>

+ 如果两个页面的 **<font style="color:#DF2A3F;">协议</font>**，**<font style="color:#DF2A3F;">域名</font>**和**<font style="color:#DF2A3F;">端口</font>**都相同，则两个页面具有**相同的源**
+ 端口默认是 `80`

```shell
https://www.baidu.com:80
协议：https
域名：www.baidu.com
端口：80
```

## 跨域
> **同源**指的是两个 URL 的协议、域名、端口一致，反之，则是**跨域**
>

+ **注意：** 浏览器允许发起跨域请求，但是，跨域请求回来的数据，会被浏览器拦截，无法被页面获取到！

### 实现跨域数据请求
> 现如今，实现跨域数据请求，最主要的两种解决方案，分别是 `JSONP` 和 `CORS`
>

1. `JSONP`：出现的早，兼容性好（兼容低版本IE）。是前端程序员为了解决跨域问题，被迫想出来的一种临时解决方案。**缺点**是只支持 `GET` 请求，不支持 `POST`请求
2. `CORS`：出现的较晚，它是 `W3C` 标准，属于跨域 `Ajax` 请求的根本解决方案。支持 `GET` 和 `POST` 请求。缺点是不兼容某些低版本的浏览器
3. 代理：在现代的前后端分离项目中，`vue` 和 `react` 中 都提供了一个叫代理的 api（`proxy`），可以将你当前的项目请求的接口，通过内置服务器进行转发，因为跨域是浏览器的同源政策导致的，代理就相当于本地服务器，我们请求本地服务器，由它进行数据的转发，从而解决浏览器跨域的问题

## HTTP 常用响应状态码
> HTTP 状态码由 **<font style="color:#DF2A3F;">三个十进制数字</font>**组成，**<font style="color:#DF2A3F;">第一个十进制数字</font>**定义了**<font style="color:#DF2A3F;">状态码的类型</font>**，后两个数字用来对状态码进行细分。
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675578613120-707f94e2-d225-46b2-b565-377e25108af3.png)

**<font style="background-color:rgb(182, 158, 0);">日常开发中常见状态码及含义</font>**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675578669322-ceb51268-29a8-4ab2-b15c-914fba040bc1.png)

