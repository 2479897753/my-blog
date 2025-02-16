> Vuex 是集中式状态管理工具
>

## 安装
```shell
npm install vuex --save

# 或
yarn add vuex
```

## 使用示例
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

new Vue({
  el: '#app',
  store,
})
```

## State
> 存储状态
>

### 常规用法
```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  }
})

const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
```

### 辅助函数 - mapState
```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState(state) {
      return state.count + this.localCount
    }
  })

  // 也可以给 mapState 传一个字符串数组
  // 映射 this.count 为 store.state.count
  // computed: mapState(['count'])

  // mapState 函数返回的是一个对象
  // computed: {
  //   // 使用对象展开运算符将此对象混入到外部对象中
  //   ...mapState({
  //     // ...
  //   })
  // }
}
```

## Getters
> 从 store 中获取 state 的状态，并返回给组件
>

### 常规用法
+ **注意：**getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果

```javascript
// Getter：state 的计算属性，依赖于 state，返回计算结果

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // Getter 也可以接受其他 getter 作为第二个参数
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // Getter 也可以返回一个函数，来实现给 getter 传参
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})

const DoneTodos = {
  template: '<div>Done todos: {{ doneTodosCount }}</div>',
  computed: {
    doneTodosCount() {
      return this.$store.getters.doneTodosCount
    }
  },
  methods: {
    getTodoById(id) {
      return this.$store.getters.getTodoById(id)
    }
  }
}
```

### 辅助函数 - mapGetters
```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter'
      // ...
    ]),

    // 如果想另起名字，可以使用对象形式
    ...mapGetters({
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    })
  }
}
```

## Mutations
> 修改状态，提交载荷（payload）
>

### 常规用法
+ **注意：mutation 必须是同步函数**

```javascript
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

// const SOME_MUTATION = 'SOME_MUTATION'

const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      // 变更状态
      state.count++
    },

    // 提交载荷（payload），可以包含多个参数
    incrementBy(state, n) {
      state.count += n
    },

    // 大多数情况下，载荷应该是一个对象，包含多个属性
    incrementByObject(state, payload) {
      state.count += payload.amount
    },

    // 使用常量替代 mutation 事件类型
    [SOME_MUTATION](state) {
      // mutate state
    }
  }
})

const IncrementButton = {
  template: '<button @click="increment">{{ count }}</button>',
  methods: {
    increment() {
      // 使用 this.$store.commit('increment') 调用 mutation
      this.$store.commit('increment')
    },
    incrementBy(n) {
      this.$store.commit('incrementBy', n)
    },
    incrementByObject(amount) {
      this.$store.commit('incrementByObject', { amount })
    },
    // 对象风格的提交方式
    incrementByObject2(amount) {
      this.$store.commit({
        type: 'incrementByObject',
        amount
      })
    }
  }
}
```

### 辅助函数 - mapMutations
```javascript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## Actions
> 提交 mutation，修改 state
>

### 常规用法
+ **注意：**
    - 不能直接修改 state，只能通过提交 mutation 修改 state
    - 异步操作需要使用 action 进行封装
    - `**store.dispatch**` 返回的是 Promise

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    },
    // 异步的 action
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    // 带参数的 action
    incrementByObject(context, payload) {
      context.commit('increment', payload.amount)
    },

    // 组合 action
    // 假设 getData() 和 getOtherData() 返回的是 Promise
    async actionA({ commit }) {
      commit('gotData', await getData())
    },
    async actionB({ dispatch, commit }) {
      await dispatch('actionA') // 等待 actionA 完成
      commit('gotOtherData', await getOtherData())
    }
  }
})

const IncrementButton = {
  template: '<button @click="increment">Increment</button>',
  methods: {
    increment() {
      this.$store.dispatch('increment')
    },
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    },
    // 以载荷形式分发
    incrementByObject(amount) {
      this.$store.dispatch('incrementByObject', { amount })
    },
    // 以对象形式分发
    incrementByObject2(amount) {
      this.$store.dispatch({
        type: 'incrementByObject',
        amount
      })
    }
  }
}
```

### 辅助函数 - mapActions
```javascript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## Modules
### 模块的局部状态
```javascript
const moduleA = {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    // 对于模块内部的 getter，根节点状态对象会作为第三个参数暴露出来
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count
    }
  },
  mutations: {
    increment(state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  actions: {
    // rootState - 根状态对象
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}

const moduleB = {
  state: () => ({}),
  mutations: {},
  actions: {}
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

// store.state.a // -> moduleA 的状态
// store.state.b // -> moduleB 的状态
```

### 命名空间
> 默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**
>

#### 开启命名空间
> 使用 `**namespaced: true**` 可以使模块开启命名空间
>

```javascript
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin() { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login() { ... } // -> dispatch('account/login')
      },
      mutations: {
        login() { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile() { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular() { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

#### 模块内部访问全局内容
> 在带命名空间的模块内访问全局内容
>

```javascript
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter(state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction(ctx, payload) { ... }
    }
  }
}
```

#### 模块内部注册全局 action
> 在带命名空间的模块注册全局 action
>

```javascript
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler(namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

#### 命名空间辅助函数
```javascript
import { createNamespacedHelpers } from 'vuex'

// const store = new Vuex.Store({
//   getters: {
//     getA: state => state['some/nested/module'].a,
//     getB: state => state['some/nested/module'].b
//   },
//   modules: {
//     'some/nested/module': {
//       namespaced: true,
//       state: () => ({
//         a: 1,
//         b: 2
//       }),
//       mutations: {
//         SET_A(state, payload) {
//           state.a = payload
//         },
//         SET_B(state, payload) {
//           state.b = payload
//         }
//       },
//       actions: {
//         foo(context, payload) {
//           context.commit('SET_A', payload)
//         },
//         bar(context, payload) {
//           context.commit('SET_B', payload)
//         }
//       }
//     }
//   }
// })

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions(['foo', 'bar'])
  }
}
```

## 数据持久化
1. **安装**

```shell
npm install --save vuex-persistedstate
```

2. **使用**

```javascript
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState()],
});
```

3. **自定义存储**

```javascript
import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const store = new Store({
  // ...
  plugins: [
    createPersistedState({
      // storage: window.localStorage,
      storage: {
        getItem: key => Cookies.get(key),
        // expires: 3 - 表示过期时间为3天 secure:true - 表示只在https协议下才可以存储
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      },
      key: 'vuex', // 存储的key值
      paths: ['user'] // 需要持久化的state的路径
    })
  ]
})
```

## 项目结构
```shell
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

