## fetch()
> 用于发起请求，获取数据
>

+ **语法：**`fetch(resource, options?)`
+ **参数：**
    - `resource` - 请求的资源，可以是 URL 或 Request 对象
    - `options` - 可选，配置请求的选项，如请求方法、请求头等
+ **返回值：** Promise 对象，请求成功时返回 Response 对象，请求失败时返回错误对象

### 发起 GET 请求
```javascript
fetch('https://api.github.com/users')
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(response.status)
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

### 发起 POST 请求
```javascript
fetch('https://api.github.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username: 'example' })
})
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(response.status)
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

### 发起 PUT 请求
```javascript
fetch('https://api.github.com/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ username: 'example' })
})
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(response.status)
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

### 发起 DELETE 请求
```javascript
fetch('https://api.github.com/users/1', {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(response.status)
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
```

### 设置请求头
```javascript
fetch('https://api.github.com/users', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer token'
  }
})
```

### 设置请求超时
```javascript
const controller = new AbortController()
const { signal } = controller
const timeoutId = setTimeout(() => controller.abort(), 5000)

fetch('https://api.github.com/users', { signal })
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(response.status)
    }
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
  .finally(() => clearTimeout(timeoutId))
```

### 设置请求缓存模式
```javascript
// 确保每次都从服务器获取最新数据
fetch('https://api.github.com/users', { cache: 'no-store' })
```

### 设置请求模式
```javascript
// 允许跨域请求
fetch('https://api.github.com/users', { mode: 'cors' })
```

### 设置请求重定向策略
```javascript
// 自动跟随重定向
fetch('https://api.github.com/users', { redirect: 'follow' })
```

### 设置请求凭证
```javascript
// 允许跨域请求时携带 Cookie 等凭证信息
fetch('https://api.github.com/users', { credentials: 'include' })
```

---

---

