> Web Worker 是 HTML5 提供的一种 JavaScript 多线程解决方案，可以在浏览器中运行后台任务而不影响主线程的性能。
>

## 基本使用
### 创建一个新的 Worker 对象
```javascript
// 这里的 'worker.js' 是一个 JavaScript 文件，用于定义 Web Worker 的后台任务逻辑
const worker = new Worker('http://localhost:8080/worker.js') // 必须是同源的网络地址
```

### 在 worker.js 文件中编写后台任务逻辑
> 在 Web Worker 中，self 是一个指向当前 Worker 线程的全局对象
>

```javascript
// importScripts() 用于在 Web Worker 环境中加载其他 JavaScript 脚本文件
importScripts('http://localhost:8080/a.js') // 必须是网络地址，但这个地址可以跨域

// self.onmessage 用于接收主线程发送的消息
self.onmessage = function(event) {
  const data = event.data
  const result = processData(data)
  // self.postMessage 用于向主线程发送消息
  self.postMessage(result)
}

function processData(data) {
  // 处理数据的逻辑
  return processedData
}
```

### 在主线程中与 Web Worker 进行通信
```javascript
worker.postMessage(data)
worker.onmessage = function(event) {
  const result = event.data
  // 处理从 Web Worker 返回的数据
}
```

### 最后，在不需要时终止 Web Worker
```javascript
worker.terminate()
```

## 注意事项
+ Web Worker 不能使用本地文件，且有跨域限制
+ Web Worker 无法直接访问 DOM，也无法执行涉及 DOM 操作的代码。如果需要更新页面内容，可以通过 postMessage 将处理结果发送回主线程，再由主线程更新页面。
+ 有的东西是无法通过主线程传递给子线程的，比如方法，DOM 节点，一些对象中的特殊设置（freeze，getter，setter 这些，所以 Vue 的响应式对象是不能传递的）
+ 模块的引入问题（importScripts）

## 常见应用场景
1. **计算密集型任务：**Web Worker 可以用于执行耗时的计算任务，如图像处理、加密解密、数据处理等。通过将这些任务放在 Web Worker 中，可以避免阻塞主线程，提升页面的响应速度和性能。
2. **大数据处理：**处理大量数据时，可以将数据处理逻辑放在 Web Worker 中进行处理，避免阻塞主线程，同时提高页面的交互性和性能。
3. **网络请求：**在 Web Worker 中可以执行网络请求，例如使用 Fetch API 发起异步请求获取数据。这样可以将网络请求逻辑与主线程解耦，避免阻塞主线程。
4. **文件处理：**Web Worker 可以用于处理文件操作，比如读取大型文件、解析文件格式等。这样可以避免阻塞主线程，提高用户体验。



