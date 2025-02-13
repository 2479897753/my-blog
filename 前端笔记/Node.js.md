> `Node.js` 是一个基于 `Chrome V8` 引擎的 `JavaScript` 运行环境
>

## `fs` 文件系统模块
> 如果要在 JavaScript 代码中，使用 `fs` 模块来操作文件，则需要先导入它
>

```javascript
const fs = require('fs')
```

### 读取文件的内容 `fs.readFile()`
+ 语法：`fs.readFile(path[, options], callback)`
+ 参数：
    - `path` 字符串，表示文件的路径
    - `options` 表示以什么编码格式来读取文件
    - `callback` 文件读取完成后，通过回调函数拿到读取的结果

```javascript
// 导入 fs 模块
const fs = require('fs')
fs.readFile('./index.html', (err, data) => {
  // 判断 err 对象是否为 null
  // 读取成功，err 值为 null
  // 读取失败，err 值为错误对象，data 值 undefined
  if (err) return console.log(err.message)
  
  console.log(data)
})
```

### 向指定文件写入内容 `fs.writeFile()`
+ 语法：`fs.writeFile(file, data[, options], callback)`
+ 参数：
    - `file` 字符串，表示文件的存放路径
    - `data` 表示要写入的内容
    - `options` 表示以什么格式写入文件内容，默认值是 `utf8`
    - `callback` 文件写入完成后的回调函数
+ **注意：**
    - `fs.writeFile()` 方法只能用来创建文件，不能用来创建目录
    - 如果写入一个已存在的文件，该方法会先将文件原有内容删除，然后再写入新内容

```javascript
const fs = require('fs')
fs.writeFile('./index.html', '<h1>hello world!</h1>', (err) => {
  if (err) return console.log(err.message)
  
  console.log('文件写入成功')
})
```

## `path` 路径模块
> 如果要在 JavaScript 代码中，使用 `path` 模块来操作文件，则需要先导入它
>

```javascript
const path = require('path')
```

### 路径拼接 `path.join()`
+ 语法：`path.join([...paths])`
+ 参数：`...paths` 路径片段序列
+ 返回值：拼接好的路径字符串

```javascript
const fs = require('fs')
const path = require('path')

// __dirname 属性是 Node 给提供的一个全局的属性，表示当前文件所处的目录
fs.readFile(path.join(__dirname, './index.html'), 'utf8', (err, data) => {
  if (err) return console.log(err.message)
  
  console.log(data)
})
```

### 获取路径中的文件名 `path.basename()`
+ 语法：`path.basename(path[, ext])`
+ 参数：
    - `path` 路径字符串
    - `ext` 可选，文件扩展名
+ 返回值：路径中最后一部分

```javascript
const path = require('path')

const fname = path.basename(path.join(__dirname, './index.html'))
console.log(fname) // index.html

const fname2 = path.basename(path.join(__dirname, './index.html'), '.html')
console.log(fname2) // index
```

### 获取路径中的文件扩展名
+ 语法：`path.extname(path)`
+ 参数：`path` 路径字符串
+ 返回值：返回文件的扩展名

```javascript
const path = require('path')

const fname = path.extname(path.join(__dirname, './index.html'))
console.log(fname) // .html
```

## `http` 模块
> 如果要使用 `http` 模块创建 Web 服务器，则需要先导入它
>

```javascript
const http = require('http')
```

### 使用 `http` 模块创建 web 服务器
```javascript
// 1.导入 http 模块
const http = require('http')

// 2.创建 web 服务器实例
const server = http.createServer()

// 3.为服务器实例绑定 request 事件
server.on('request', (req, res) => {
  // 只要客户端请求该服务器，就会触发 request 事件，就会调用这个事件处理程序
  console.log('访问服务器成功')
})

// 4.启动服务器
server.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

### `req` 请求对象
+ `req` 是请求对象，它包含了与客户端相关的数据和属性
+ `req.url` 获取客户端请求的 url 地址
+ `req.method` 获取客户端请求的类型

```javascript
server.on('request', (req, res) => {
  const str = `${req.url} -- ${req.method}`
  console.log(str)
})
```

### `res` 响应对象
+ `res` 是响应对象，它包含了与服务器相关的数据和属性
+ `res.end` 向客户端发送指定的内容，并结束这次请求的处理过程
+ **注意：**`res.end()` 表示结束请求，不要在该方法之后写其他代码

```javascript
server.on('request', (req, res) => {
  const str = `${req.url} -- ${req.method}`
  res.end(str)
})
```

### 解决中文乱码问题
> 当调用 `res.end()` 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式
>

+ 注意：如果返回的数据是一个 `html` 数据，数据包含的 `meta` 标签中设置了字符集，则就无需在响应头中设置字符集的编码格式了

```javascript
server.on('request', (req, res) => {
  // 发送中文的内容
  const str = `您请求的 url 地址是：${req.url}，请求的 method 类型是：${req.method}`
  
  // 为了防止中文乱码问题，需要设置响应头
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  
  // 把包含中文的内容返回给客户端
  res.end(str)
})
```

### 根据不同的 `url` 响应不同的内容
```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  let fpath = ''
  if (url === '/') {
    fpath = path.join(__dirname, './clock/index.html')
  } else {
    fpath = path.join(__dirname, './clock', url)
  }
  
  fs.readFile(fpath, 'utf8', (err, dataStr) => {
    if (err) return res.end('404 Not Fount')
    res.end(dataStr)
  })
})

server.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

## 模块化
**模块化的优点：**

+ 提高了代码的复用性
+ 提高了代码的可维护性
+ 可以实现按需加载

### Node 模块中的 3 个大类
1. **内置模块：** 内置模块是由 `Node.js` 官方提供的，例如 `fs`、`path`、`http` 等 
2. **自定义模块：** 用户创建的每个 `.js` 文件，都是自定义模块
3. **第三方模块：** 由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，**<font style="color:#DF2A3F;">使用前需要先下载</font>**

### 使用 `require()` 加载模块
+ **注意事项：**
    - 使用 `require()` 方法加载其他模块时，会执行被加载模块中的代码
    - 在使用 `require()` 加载用户自定义模块期间，可以省略 `.js` 后缀名

```javascript
// 1.加载内置模块
const fs = require('fs')

// 2.加载自定义模块
const custom = require('./custom.js')

// 3.加载第三方模块
const mysql = require('mysql')
```

### `module` 对象
> 在每个 `.js` 自定义模块中都有一个 `module` 对象，它里面存储了和当前模块有关的信息，打印如下：
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675299506627-afbefead-fbd9-48fa-be90-b02fd7493773.png)

#### `module.exports` 对象的作用
1. 在自定义模块中，可以使用 `module.exports` 对象，将模块内的成员共享出去，供外界使用
2. 外界用 `require()` 方法导入自定义模块时，得到的就是 `module.exports` 所指向的对象
3. `module.exports` 默认指向的是一个空对象

```javascript
// 被加载模块.js

module.exports.uname = 'zs'
module.exports.age = 23
module.exports.sayHello = () => {
  console.log(uname + ':' + 23)
}

// 或重新指向一个新对象
module.exports = {
  uname,
  age,
  sayHello
}
```

```javascript
// 加载模块.js

const m = require('./被加载模块.js')
console.log(m) // { uname: 'zs', age: 23, sayHello: [Function: sayHello] }
```

#### `exports` 对象
> 默认情况下，`exports` 和 `module.exports` 指向同一个对象。最终共享的结果，还是以 `module.exports` 指向的对象为准
>

+ **注意：** 如果两个对象同时存在时，以 `module.exports` 指向的对象为准，**<font style="color:#DF2A3F;">不建议同时使用</font>**

### `CommonJS` 模块化规范
> `Node.js` 遵循了 `CommonJS` 模块化规范，`CommonJS`规定了 **<font style="color:#DF2A3F;">模块的特性和各模块之间如何相互依赖</font>**
>

`CommonJS` **规定：**

+ 每个模块内部，`module` 变量代表当前模块
+ `module` 变量是一个对象，它的 `exports` 属性（即 `module.exports`）是对外的接口
+ 加载某个模块，其实是加载该模块的 `module.exports` 属性。`require()` 方法用于加载模块

## Express
> `Express` 是基于 `Node.js` 平台，快速、开放、极简的 `Web` 开发框架
>

### `express` 的基本使用
1. 安装

```shell
npm i express
```

2. 创建基本的 Web 服务器

```javascript
// 1.导入 express
const express = require('express')
// 2.创建 Web 服务器
const app = express()

// 3.调用 app.listen()，启动服务器
app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

### 监听 `GET` 和 `POST` 请求，并响应数据
```javascript
// 1.导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()

// 4. 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
  res.send({ name: 'zs', age: 20, gender: '男' })
})

app.post('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个文本字符串
  res.send('请求成功')
})

// 3. 调用 app.listen(端口号, 启动后的回调函数), 启动服务器
app.listen(3000, () => {
  console.log('running……')
})

// 127.0.0.1:3000/user
```

### 获取 URL 中携带的查询参数
```javascript
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  // 通过 req.query 可以获取到客户端发送过来的，查询参数
  // 注意：默认情况下， req.query 是一个空对象
  console.log(req.query)
  res.send(req.query)
})

app.listen(3000, () => {
  console.log('running……')
})
```

### 获取 URL 中的动态参数
```javascript
const express = require('express')
const app = express()

// 注意：这里的 :id 是一个动态的参数
app.get('/user/:id', (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
  console.log(req.params)
  res.send(req.params)
})

app.listen(3000, () => {
  console.log('running……')
})
```

### 托管静态资源
#### `express.static()`
> 通过该函数可以创建一个静态资源服务器，然后就可以访问被托管的目录下所有文件了
>

+ **注意：**`Express` 在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，**<font style="color:#DF2A3F;">存放静态文件的目录名 public 不会出现在 </font>**`URL`**<font style="color:#DF2A3F;"> 中</font>**

```javascript
const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速的对外提供静态资源
app.use(express.static('./public'))

app.listen(3000, () => {
  console.log('running……')
})

// http://127.0.0.1:3000/index.css
```

#### 托管多个静态资源目录
```javascript
const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速的对外提供静态资源
app.use(express.static('./public'))
app.use(express.static('./static'))

app.listen(3000, () => {
  console.log('running……')
})
```

#### 挂载路径前缀
> 挂载了路径前缀，在访问时就必须要带有地址前缀来访问文件了
>

+ 例如：http://localhost:3000/public/images/bg.jpg

```javascript
const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速的对外提供静态资源
app.use('/public', express.static('./public'))

app.listen(3000, () => {
  console.log('running……')
})
```

## Express 路由
> 在 `Express` 中，路由指的是 **<font style="color:#DF2A3F;">客户端的请求</font>** 与 **<font style="color:#DF2A3F;">服务器处理函数</font>** 之间的 **<font style="color:#DF2A3F;">映射关系</font>**
>

+ Express 中的路由分 3 部分组成，分别是 **<font style="color:#DF2A3F;">请求的类型</font>**、**<font style="color:#DF2A3F;">请求的 URL 地址</font>**、**<font style="color:#DF2A3F;">处理函数</font>**

```javascript
const express = require('express')
// 创建 web 服务器，命名为 app
const app = express()

// 挂载路由
app.get('/', (req, res) => {
  res.send('Hello, World')
})

app.post('/', (req, res) => {
  res.send('Hello, Tom')
})

app.listen(3000, () => {
  console.log('running……')
})
```

### 模块化路由
> 为了方便对路由进行模块化的管理，`Express` 不建议将路由直接挂载到 `app` 上，而是推荐将路由抽离为单独的模块
>

1. 创建路由

```javascript
// router.js 	文件
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象 !!! 注意这个 Router 千万不要写成小写的
const router = express.Router()

// 3. 挂载获取用户列表的路由
router.get('/user/list', (req, res) => {
  res.send('用户列表')
})

// 4. 挂载添加用户列表的路由
router.post('/user/add', (req, res) => {
  res.send('添加用户')
})

// 5. 向外导出路由对象 ！！！ 暴露的时候 router 千万不要带括号
module.exports = router
```

2. 注册路由

```javascript
const express = require('express')
const app = express()

// 导入路由模块
const userRouter = require('./router')

// 使用 app.use() 注册路由模块
app.use(userRouter)

app.listen(3000, () => {
  console.log('running……')
})
```

### 为路由模块添加前缀
+ **注意：** 添加了路由前缀后，访问的路由的时候，也应该加上前缀（类似托管静态资源的写法）

```javascript
const express = require('express')
const app = express()

// 导入路由模块
const userRouter = require('./002-router')

// 使用 app.use() 注册路由模块
// 给路由模块添加统一得到访问前缀 /api
app.use('/api', userRouter)

app.listen(3000, () => {
  console.log('running……')
})
```

## 中间件
> 所谓中间件（Middleware），就是中间处理函数
>

### 定义全局生效的中间件
> 中间件必须调用 `next()` 函数，它表示把流转关系 **<font style="color:#DF2A3F;">转交</font>**给**<font style="color:#DF2A3F;">下一个中间件</font>**或**<font style="color:#DF2A3F;">路由</font>**
>

```javascript
const express = require('express')
const app = express()

// 第一个全局中间件
app.use((req, res, next) => {
  console.log('调用了第一个全局的中间件')
  next()
})

// 第二个全局中间件
app.use((req, res, next) => {
  console.log('调用了第二个全局的中间件')
  next()
})

// 定义路由
// 请求这两个路由，会依次触发上述两个全局中间件
app.get('/user', (req, res) => {
  res.send('User Page')
})

app.listen(3000, () => {
  console.log('running……')
})
```

### 定义局部生效的中间件
```javascript
const express = require('express')
const app = express()

// 定义中间件函数 mv1
const mv1 = (req, res, next) => {
  console.log('这是第一个中间件函数')

  next()
}

// 定义中间件函数 mv2
const mv2 = (req, res, next) => {
  console.log('这是第二个中间件函数')

  next()
}

// mv1、mv2 这个中间件只在 "当前路由中生效"，这种用法属于 "局部生效的中间件"
app.get('/', mv1, mv2, (req, res) => {
  res.send('Home Page')
})

// 也可以使用数组的形式绑定两个中间件
app.get('/user', [mv1, mv2], (req, res) => {
  res.send('Home Page')
})

app.listen(3000, () => {
  console.log('running……')
})
```

### 中间件的 5 个使用注意事项
1. 一定要在 **<font style="color:#DF2A3F;">路由之前注册中间件</font>**
2. 客户端发送过来的请求，**<font style="color:#DF2A3F;">可以连续调用多个中间件</font>** 进行处理
3. **<font style="color:#DF2A3F;">执行完中间件</font>**的业务代码之后，不要忘记**<font style="color:#DF2A3F;">调用 </font>**`next()`**<font style="color:#DF2A3F;"> 函数</font>**
4. 为了防止代码逻辑混乱，**<font style="color:#DF2A3F;">调用 </font>**`next()`**<font style="color:#DF2A3F;"> 函数后不要再写额外的代码</font>**
5. **<font style="color:#DF2A3F;">连续</font>**调用多个中间件时，**<font style="color:#DF2A3F;">多个中间件之间，共享 </font>**`req`**<font style="color:#DF2A3F;"> 和 </font>**`res`**<font style="color:#DF2A3F;"> 对象</font>**

### 中间件的分类
#### 应用级别的中间件
> 通过 `app.use()` 或 `app.get()` 或 `app.post()`，**<font style="color:#DF2A3F;">绑定到 </font>**`app`**<font style="color:#DF2A3F;"> 实例上的中间件</font>**，叫做应用级别的中间件
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675301969544-fb7d1885-fdee-446b-a39c-5d2ced30288d.png)

#### 路由级别的中间件
> 绑定到 `express.Router()` 实例上的中间件，叫做路由级别的中间件
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675301936099-cc2d7782-6cbd-46c7-bbc8-c349bd149081.png)

#### 错误级别中间件
> 专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题
>

+ 格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 `(err, req, res, next)`
+ **注意： <font style="color:#DF2A3F;">错误级别的中间件，必须注册在所有路由之后</font>**

```javascript
const express = require('express')
const app = express()

// 1. 路由
app.get('/', (req, res) => {
  // 1.1 抛出一个自定义的错误
  throw new Error('服务器内部发生了错误')

  res.send('Home Page.')
})

// 2. 错误级别的中间件
// 注意：错误级别的中间件，必须注册在所有路由之后
app.use((err, req, res, next) => {
  // 2.1 在服务器打印错误消息
  console.log('发生了错误：' + err.message)

  // 2.2 向客户端响应错误相关的内容 
  res.send(err.message)
})

app.listen(3000, () => {
  console.log('running……')
})
```

#### Express 内置的中间件
1. `express.static` 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
2. `express.json` 解析 `JSON` 格式的请求体数据（**有兼容性**，仅在 `4.16.0+` 版本中可用）
3. `express.urlencoded` 解析 `URL-encoded` 格式的请求体数据（**有兼容性**，仅在 `4.16.0+` 版本中可用）

`express.json`**<font style="background-color:rgb(183, 159, 0);"> 中间件的使用</font>**

```javascript
const express = require('express')
const app = express()

// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())

app.post('/user', (req, res) => {
  // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('ok')
})

app.listen(3000, () => {
  console.log('running……')
})
```

`express.urlencoded`**<font style="background-color:rgb(189, 164, 0);"> 中间件的使用</font>**

```javascript
const express = require('express')
const app = express()

// 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
// extended: false：表示使用系统模块querystring来处理，也是官方推荐的
// extended: true：表示使用模块qs来处理

// querystring是node的核心模块，用于处理（解析和格式化）URL的查询字符串;
// qs是一个增加了安全性的查询字符串解析和字符串序列化的库;
app.use(express.urlencoded({ extended: false }))

app.post('/book', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('running……')
})
```

#### 第三方的中间件
> 非 `Express` 官方内置，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率
>

+ **注意：**`Express` 内置的 `express.urlencoded` 中间件，就是基于 `body-parser` 这个第三方中间件进一步封装出来的

```javascript
const express = require('express')
const app = express()

// 1. 导入解析表单数据的中间件 body-parser
const parser = require('body-parser')

// 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
// app.use(express.urlencoded({ extended: false }))

// 2. 使用 app.use() 注册中间件
app.use(parser.urlencoded({ extended: false }))

app.post('/book', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

app.listen(3000, () => {
  console.log('running……')
})
```

## npm
> `npm`（Node Package Manager）包管理工具
>

### `npm` 的基本使用
1. 安装包

```shell
npm install 包的名称
# 或
npm i 包的名称
```

2. 安装指定版本的包
    - 第 1 位数字：大版本
    - 第 2 位数字：功能版本
    - 第 3 位数字：bug 修复版本

```shell
npm i moment@2.22.2
```

3. 卸载包

```shell
npm uninstall 包的名称
```

### `node_modules` 和 `package-lock.json` 的作用
> 初次装包完成后，在项目文件夹下多一个叫做 `node_modules` 的文件夹和 `package-lock.json` 的配置文件
>

1. `node_modules` 文件夹用来存放所有已安装到项目中的包。`require()` 导入第三方包时，就是从这个目录中查找并加载包
2. `package-lock.json` 配置文件用来记录 `node_modules` 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等

### 包管理配置文件 `package.json`
> `npm` 规定，在项目根目录中，必须提供一个叫做 `package.json` 的包管理配置文件，用来记录与项目有关的一些配置信息
>

**快速创建 **`package.json`** 包管理配置文件：**

```shell
npm init -y
```

`package.json`**主要包含以下配置信息**

+ 项目的名称、版本号、描述等
+ 项目中都用到了哪些包
+ 哪些包只会在开发期间会用到
+ 哪些包在开发和部署时都需要用到

### 包的分类
#### 项目包
> 那些被安装到项目的 `node_modules` 目录中的包
>

**项目包又分为两类，分别是：**

+ **开发依赖包**，被记录到 `devDependencies` 节点中的包，只在开发期间会用到
+ **核心依赖包**，被记录到 `dependencies` 节点中的包，在开发期间和项目上线之后都会用到

```shell
npm i 包名 -D # 开发依赖包（会被记录到 devDependencies 节点下）
npm i 包名    # 核心依赖包（会被记录到 dependencies 节点下）
```

#### 全局包
> 在执行 `npm install` 命令时，如果提供了 `-g` 参数，则会把包安装为全局包
>

+ 说明：全局包会被安装到 `C:\Users\用户目录\AppData\Roaming\npm\node_modules` 目录下
+ **注意：**
    - 只有工具性质的包，才有全局安装的必要性。因为它们提供了好用的终端命令
    - 判断某个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可

```shell
npm i 包名 -g         # 全局安装指定的包
npm uninstall 包名 -g # 卸载全局安装的包
```

### 切换 `npm` 的下包镜像源
```shell
# 查看当前的下包镜像源
npm config get registry

# 将下包的镜像源切换为淘宝镜像源
npm config set registry https://registry.npmmirror.com/
```

### 使用 `nrm` 切换下载包的服务器
```shell
# 通过 npm 包管理器，将 nrm 安装为全局可用的工具
npm i nrm -g

# 查看所有可用的镜像源
nrm ls

# 将下包的镜像源切换为 taobao 镜像
nrm use taobao
```

### `npm` 常用命令
```shell
# 查看 npm 版本
npm -v

# 使用 npm 命令安装模块
npm install 模块名

# 安装指定版本的包
npm install 模块名@版本号

# 全局安装指定包
npm install 模块名 -g

# 查看所有全局安装的模块
npm list -g

# 查看某个模块的版本号
npm list 模块名

# 在 package 文件的 dependencies 节点写入依赖
npm install --save 模块名

# 在 package 文件的 devDependencies 节点写入依赖
npm install --save-dev 模块名
```

### 发布自己的包
#### 登录 `npm` 账号
> `npm` 账号注册完成后，可以在终端中执行 `npm login` 命令，依次输入用户名、密码、邮箱后，即可登录成功
>

+ **注意：** 在运行 `npm login` 命令之前，必须先把下包的服务器地址切换为 `npm` 的官方服务器。否则会导致发布包失败！

```shell
# 切换为 npm 官方服务器
npm config set registry https://registry.npmjs.org/
```

#### 把包发布到 `npm` 上
> 将终端切换到包的根目录之后，运行 `npm publish` 命令，即可将包发布到 `npm` 上（**注意：包名不能雷同**）
>

#### 删除已发布的包
> 运行 `npm unpublish 包名 --force` 命令，即可从 `npm` 删除已发布的包
>

+ **注意：**
    - `npm unpublish` 命令**只能删除 72 小时以内发布的包**
    - `npm unpublish` 删除的包，**在 24 小时内不允许重复发布**
    - 发布包的时候要慎重，尽量**不要往 **`npm`** 上发布没有意义的包！**

## nodemon
1. 安装 `nodemon`

```shell
npm i nodemon -g
```

2. 将 `node` 命令替换为 `nodemon` 命令，使用 `nodemon app.js` 来启动项目

> 代码被修改之后，会被 `nodemon` 监听到，从而实现自动重启项目的效果
>

```shell
// 使用 node 运行项目
node app.js

// 使用 nodemon 运行项目
nodemon index.js
```

