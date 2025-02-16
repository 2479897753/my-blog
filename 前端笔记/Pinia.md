## 安装
```shell
npm install pinia
```

## 初始化设置
```javascript
import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
// 1. 创建 pinia 实例（根存储）
const pinia = createPinia()

const app = createApp(App)
// 2. 挂载到 Vue 根实例上
app.use(pinia)

app.mount('#app')
```

## 定义 Store
### 选项式
```javascript
import { defineStore } from 'pinia'

// 1. 定义并导出容器
// 	参数1: 容器的 ID，必须唯一，将来 Pinia 会把所有的容器挂载到跟容器
//  参数2: 选项对象
// 	返回值: 是一个函数，调用即得到容器实例
export const useMainStore = defineStore('main', {
  /**
   * 类似于组件的 data，用来存储全局状态的
   * 1. 必须是函数: 这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   * 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
   */
  state: () => {
    return {
      count: 10,
      msg: 'hello',
      arr: [1, 2, 3]
    }
  },

  /**
   * 类似于组件的 computed，用来封装计算属性，有缓存的功能
   */
  getters: {
    // 函数接收一个可选参数: state 状态对象
    // count10(state) {
    //   console.log('count10 被调用了')
    //   return state.count + 10
    // }

    // 如果在 getters 中使用了 this 则必须手动指定返回值类型，否则类型推导不出来
    count10(): number {
      console.log('count10 被调用了')
      return this.count + 10
    }
  },
  
  /**
   * 类似于组件的 methods，用来定义修改 state 中数据的方法，也可是异步方法
   */
  actions: {
    // 注意: 不能使用箭头函数定义 action
    changState(num: number) {
      this.count += num
      this.foo = 'hello'
      this.arr.push(4)

      // this.$patch({})
      // this.$patch(state => {})
    }
  }
})
```

### 组合式
```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 1. 定义并导出容器
// 	参数1: 容器的 ID，必须唯一，将来 Pinia 会把所有的容器挂载到跟容器
//  参数2: 选项对象
// 	返回值: 是一个函数，调用即得到容器实例
export const useMainStore = defineStore('main', () => {
  const count = ref(10)
  const msg = ref('hello')
  const arr = ref([1, 2, 3])
  const foo = ref(null)

  const count10 = computed(() => {
    console.log('count10 被调用了')
    return count.value + 10
  })

  const changState = (num) => {
    count.value += num
    foo.value = 'hello'
    arr.value.push(4)
  }

  return { count, msg, arr, foo, count10, changState }
})
```

## 使用
```vue
<template>
  <p>{{ mainStore.count }}</p>
  <p>{{ mainStore.foo }}</p>
  <p>{{ mainStore.arr }}</p>
  <p>{{ mainStore.count10 }}</p>
  <p>{{ mainStore.count10 }}</p>
  <p>{{ mainStore.count10 }}</p>

  <hr />

  <p>{{ count }}</p>
  <p>{{ foo }}</p>
  <p>{{ arr }}</p>

  <hr />

  <p>
    <button @click="handlerChangeState">修改数据</button>
  </p>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store'
const mainStore = useMainStore()

console.log(mainStore.count)

// 这是有问题的，因为这样拿到的数据不是响应式的，是一次性的
// Pinia 其实就是把 state 数据都做了 reactive 处理
// const { count, foo } = mainStore

// 解决办法就是使用 storeToRefs
// 把解构出来的数据做 ref 响应式处理
const { count, foo, arr } = storeToRefs(mainStore)

console.log(count.value)

const handlerChangeState = () => {
  // 方式一: 最简单的方式
  // mainStore.count++

  // 方式二: 如果需要修改多个数据，建议使用 $patch 批量更新
  // mainStore.$patch({
  //   count: mainStore.count + 1,
  //   foo: 'hello',
  //   arr: [...mainStore.arr, 4]
  // })

  // 方式三: 更好的批量更新的方式: $patch 传一个函数
  // mainStore.$patch(state => {
  //   state.count++
  //   state.foo = 'hello'
  //   state.arr.push(4)
  // })

  // 方式四: 逻辑比较多的时候可以封装到 actions 中做处理
  mainStore.changState(10)
}
</script>
```

## 数据持久化
### 基本使用
1. **安装**

```shell
npm i  pinia-plugin-persistedstate
# or
pnpm add pinia-plugin-persistedstate
```

2. **注册**

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
```

3. **使用**

```javascript
const useStore = defineStore(
  'main',
  () => {
    // ...省略
  },
  {
    // 开启数据持久化
    persist: true
    // ...省略
  }
);
```

### 进阶用法
> 可以通过配置，按需持久化所需数据
>

```javascript
export const useStore = defineStore(
  'main',
  () => {
    const someState = ref('hello pinia')
    const nested = ref({
      data: 'nested pinia'
    })
    return { someState, nested }
  },
  {
    // 所有数据持久化
    // persist: true
    // 持久化存储插件其他配置
    persist: {
      // 修改存储中使用的键名称，默认为当前 Store的 id
      key: 'storekey',
      // 修改为 sessionStorage，默认为 localStorage
      storage: window.sessionStorage,
      // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
      paths: ['nested.data']
    }
  }
)
```

### 小程序端持久化配置
```javascript
export const useStore = defineStore(
  'main',
  () => {
    const someState = ref('hello pinia')
    const nested = ref({
      data: 'nested pinia'
    })
    return { someState, nested }
  },
  {
    persist: {
      storage: {
        getItem: (key) => {
          return uni.getStorageSync(key)
        },
        setItem: (key, val) => {
          uni.setStorageSync(key, val)
        }
      }
    }
  }
)
```

