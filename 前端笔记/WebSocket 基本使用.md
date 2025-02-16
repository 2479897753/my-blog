> WebSocket 是一种在浏览器和服务器之间进行全双工通信的协议，使用 WebSocket 可以实现实时性更强的数据传输。
>

+ **注意：** WebSocket 连接是需要建立在服务器端支持 WebSocket 协议的基础上才能实现的，因此在使用 WebSocket 时需要确保服务器端已经正确地实现了 WebSocket 协议的支持。

## 创建 WebSocket 对象
```javascript
const socket = new WebSocket('ws://localhost:3000');
```

## 监听 WebSocket 事件
```javascript
socket.onopen = (event) => {
  console.log('WebSocket opened');
}
socket.onmessage = (event) => {
  console.log('WebSocket message received:', event.data);
}
socket.onclose = (event) => {
  console.log('WebSocket closed');
}
socket.onerror = (event) => {
  console.log('WebSocket error occurred:', event);
}
```

## 向服务器发送数据
```javascript
socket.send('Hello, WebSocket!');
```

## 关闭 WebSocket 连接
```javascript
socket.close();
```

## socket.io-client 的使用
### 安装
```shell
npm i socket.io-client
```

### 引入
```javascript
/* 引入 vuex，这里是独立的 js 文件，因此需要引入 js 文件而不是 vuex */
import store from "./store";
import io from 'socket.io-client';

/**
 * @Description: 建立socket连接
 * @name: createConnect
 * @param {*} path 传入格式模板'localhost:8080'，连接地址，当传入为空时会取域名
 * @return {*}
 */
export function createConnect(path) {
  if (Object.keys(store.state.sockets).length === 0) {
    /* 判断vuex中是否已经存在socket对象，存在证明已经连接直接返回socket对象，避免重复连接 */
    let origin ='localhost:8080' // 后端提供的地址
    let socket = io('ws://' + origin); /* 建立连接 */
    store.dispatch('XXXX', socket); /* 把返回的对象存入vuex中 */
  }
  return store.state.sockets /* 返回vuex中保存的socket对象 */
}

/**
 * @Description: 断开socket连接
 * @name: disconnect
 * @param {*} 
 * @return {*}
 */
export function disconnect() {
  if (Object.keys(store.state.socket.sockets).length !== 0) {
    /* 判断vuex中是否已经存在socket对象，存在证明连接中，需断开连接 */
    store.state.socket.sockets.close()
  }
  store.dispatch('GetSocket', {}); /* 清空vuex中的socket对象 */
}
```

### 在组件内使用
```vue
<template></template>
<script>
import { createConnect, disconnect } from './socket.js'; /* 引入方法 */
  
export default {
  data(){
    return{
      socket: {}
    }
  }
  mounted(){
    // 建立socket连接
    this.sockets = createConnect();
    
    this.sockets.on('connect', () => {
      //监听连接是否成功
      console.log('connect');
    });
    
    this.sockets.on('disconnect', (reason) => {
      //监听连接异常中断
      console.log(reason);
    });
    
    this.sockets.on('XXXX', (data) => {
      //监听后端返回事件，XXXX是与后端约定的字段
      console.log('XXXX', data);
    });

    // 向后端发送数据
    this.sockets.emit('xxx', { name: 'zs', age: 18 })
  },
  
  destroyed() {
    //断开连接，需要时再执行
    disconnect();
  }
}
</script>
```

## vue-socket.io 在 Vue 项目中的使用
> vue-socket.io 其实是在 socket.io-client（在浏览器和服务器之间实现实时、双向和基于事件的通信）基础上做了一层封装，将 `**$socket**` 挂载到 Vue 实例上，同时可使用 `**sockets**` 对象轻松实现组件化的事件监听，在 Vue 项目中使用起来更方便。
>

### 安装
```shell
npm i vue-socket.io
```

### 引入
```javascript
// main.js
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
 
Vue.use(
  new VueSocketIO({
    // 生产环境建议关闭，开发环境打开（在控制台看到socket连接和事件监听的信息）
    debug: true, 
    
    // 必须的，WebSocket 服务器 url 或 socket.io-client 实例
    connection:'http://metinseylan.com:1992',
    
    options:{
      // 创建时是否自动连接 我们这里设定为 false，在指定页面再开启
      autoConnect: false,
      // 路径（默认值：/socket.io/）
      path: "/my-app/",
      // 目前有两种传输方式：HTTP long-polling（可简称：polling）、WebSocket
      transports: ['polling'],
      // 附加请求头（在服务器端的 socket.handshake.headers 对象中找到）
      extraHeaders:{}
    },
    
    // 如果没有使用到 store 可不写
    vuex: {
      store,
      actionPrefix: 'SOCKET_',  // vuex action 前缀
      mutationPrefix: 'SOCKET_' // vuex mutation 前缀
    }
  })
)
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### 在组件内使用
```vue
<template>
  <div class="wrap">
    <button @click="socketEmit">连接Socket</button>
    <button @click="socketSendmsg">发送数据</button>
  </div>
</template>
 
<script>
export default {
  data(){
    return {
      randomId: null
    }
  },
  methods:{
    socketEmit(){
      // 开始连接 socket
      this.$socket.open();
      
      // 订阅事件，testCall 是与后端约定好的名称
      this.sockets.subscribe('testCall', (res) => {
        if(res.code == 200 && res.randomId === this.randomId){
          console.log('召唤成功')
        }
      })
    },
    
    // 发送消息
    socketSendmsg(){
      this.randomId = Math.random();
      
      // testCall 是与后端约定好的名称
      this.$socket.emit('testCall', { 
        "randomId": this.randomId,
        "deviceId": "123456"
      });
    },
  },
  
  sockets: {
    connect: function () {
      console.log('连接成功')
    },
    
    disconnect: function () {
      console.log('断开连接')
    },
    
    reconnect: function () {
      console.log('重新连接')
    },

    // 监听后端触发的event事件，event 是与后端约定好的名称
    event: function () {
      console.log('监听了event事件')
    }
  },
  
  beforeDestroy(){
    // 关闭 Socket
    this.sockets.unsubscribe('testCall'); 
    this.$socket.close();
  }
}
</script>
```

