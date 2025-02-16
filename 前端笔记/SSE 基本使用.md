> SSE（Server-Sent Events）是一种用于实现服务器主动向客户端推送数据的技术，也被称为“事件流”（Event Stream）。它基于 HTTP 协议，利用了其长连接特性，在客户端与服务器之间建立一条持久化连接，并通过这条连接实现服务器向客户端的实时数据推送。
>

## 基本使用
1. **服务器端示例：**

```javascript
const express = require('express')
const app = express()

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  setInterval(() => {
    const data = new Date().toString()
    res.write(`data: ${data}\n\n`)
  }, 1000) // 每隔一秒发送一次数据
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
```

2. **前端示例：**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSE Example</title>
  </head>
  <body>
    <h1>Server-Sent Events</h1>
    <div id="events"></div>

    <script>
      const eventSource = new EventSource('http://localhost:3000/events')

      eventSource.onmessage = function (event) {
        const newElement = document.createElement('div')
        newElement.textContent = 'New message: ' + event.data
        document.getElementById('events').appendChild(newElement)
      }

      eventSource.onerror = function (err) {
        console.error('EventSource failed:', err)
        eventSource.close() // 关闭连接
      }
    </script>
  </body>
</html>
```

## @microsoft/fetch-event-source 库的使用
1. **安装**

```shell
npm install @microsoft/fetch-event-source
```

2. **用法**

```javascript
// 接收
const sse = new EventSource('/api/sse')
sse.onmessage = ev => {
  console.log(ev.data)
}

// 发送
import { fetchEventSource } from '@microsoft/fetch-event-source'

await fetchEventSource('/api/sse', {
  onmessage(ev) {
    console.log(ev.data)
  }
})

// 可以传入默认 fetch API 公开的所有其他参数
const ctrl = new AbortController()
fetchEventSource('/api/sse', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    foo: 'bar'
  }),
  signal: ctrl.signal
})
```

3. **添加更好的错误处理**

```javascript
class RetriableError extends Error {}
class FatalError extends Error {}

fetchEventSource('/api/sse', {
  async onopen(response) {
    if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
      return // 一切都很好
    } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
      // 客户端错误通常是不可恢复的:
      throw new FatalError()
    } else {
      throw new RetriableError()
    }
  },
  onmessage(msg) {
    // 如果服务器发出错误消息，抛出异常，它将被下面的 onerror 回调处理:
    if (msg.event === 'FatalError') {
      throw new FatalError(msg.data)
    }
  },
  onclose() {
    // 如果服务器意外关闭连接，请重试:
    throw new RetriableError()
  },
  onerror(err) {
    if (err instanceof FatalError) {
      throw err // 重新抛出以停止操作
    } else {
      // 不执行任何操作以自动重试，你也可以返回指定的重试间隔
    }
  }
})
```

