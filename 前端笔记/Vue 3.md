## 安装
```shell
npm create vue@latest

# 或
pnpm create vue@latest
```

## 创建应用
```javascript
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

// 创建一个应用实例
const app = createApp(App)
app.mount('#app') // 挂载到 id 为 app 的元素上
```

## 代码规范
1. **安装 eslint-plugin-vue 插件**

```shell
npm install -D eslint eslint-plugin-vue
```

2. **配置 eslint.config.js**

```javascript
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  skipFormatting,

  // 自定义规则
  {
    name: 'app/custom-rules',
    rules: {
      semi: ['error', 'never'], // 末尾不加分号
      quotes: ['error', 'single'], // 使用单引号
      'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }], // 每行最大 100 字符
      'comma-dangle': ['error', 'never'], // 不使用尾随逗号
      indent: ['error', 2, { SwitchCase: 1, flatTernaryExpressions: true }], // 缩进 2 个空格
      'no-tabs': 'error', // 使用空格缩进
      'linebreak-style': ['error', 'unix'], // 使用 Unix 换行符
      'arrow-parens': ['error', 'as-needed'] // 箭头函数参数只有一个时不加括号
    }
  }
]
```

3. **TypeScript 项目中 eslint.config.js 配置**

```typescript
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  skipFormatting,

  // 添加自定义规则
  {
    name: 'app/custom-rules',
    rules: {
      semi: ['error', 'never'], // 末尾不加分号
      quotes: ['error', 'single'], // 使用单引号
      'max-len': [
        'error',
        { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }
      ], // 每行最大 100 字符
      'comma-dangle': ['error', 'never'], // 不使用尾随逗号
      indent: ['error', 2, { SwitchCase: 1, flatTernaryExpressions: true }], // 缩进 2 个空格
      'no-tabs': 'error', // 使用空格缩进
      'linebreak-style': ['error', 'unix'], // 使用 Unix 换行符
      'arrow-parens': ['error', 'as-needed'] // 箭头函数参数只有一个时不加括号
    }
  }
]
```

## 文本插值
> 最基本的数据绑定形式，将 data 中的数据绑定到模板中
>

```vue
<span>Message: {{ msg }}</span>
```

## JS 表达式
```html
// 合法的表达式
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>

// 仅支持表达式，下面的例子都是无效的：
<!-- 这是一个语句，而非表达式 -->
{{ var a = 1 }}

<!-- 条件控制也不支持，请使用三元表达式 -->
{{ if (ok) { return message } }}

// 调用函数
// 注意：绑定的表达式不应该产生副作用，比如改变数据或触发异步操作。因为表达式中的方法会在组件每次更新时重新调用
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>

// 受限的全局访问
// - 在模板表达式中，只能访问全局变量的一个白名单，如 Math 和 Date。
// - 你不应该在模板表达式中试图访问用户定义的全局变量。例如用户附加在 window 上的属性。
```

## 响应式状态
### [ref()](https://cn.vuejs.org/api/reactivity-core.html#ref)
> 声明响应式状态
>

+ **语法；**`const ref = Vue.ref(initialValue)`
+ **参数：**`initialValue` - 初始值
+ **返回值：**`ref` - 响应式状态
+ **注意：** 在模板中使用 ref 时，不需要附加 .value，ref 会自动解包

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // 在 JavaScript 中需要 .value
      count.value++
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      increment
    }
  }
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

**使用** `<script setup>`

> `<script setup>` 中的顶层的导入、声明的变量和函数可在同一组件的模板中直接使用
>

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

#### ref 解包细节
1. **作为 reactive 对象的属性**
    - **注意：** 只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为浅层响应式对象的属性被访问时不会解包

```javascript
// 一个 ref 会作为响应式对象的属性被访问或修改时自动解包
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1

// 如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，它将替换旧的 ref，并且新的 ref 也会自动解包
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1
```

2. **数组和集合的注意事项**

```javascript
// 当 ref 作为响应式数组或原生集合类型（如 Map）中的元素被访问时，不会被解包
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)
```

3. **在模板中解包的注意事项**

```javascript
// 在模板渲染上下文中，只有顶级的 ref 属性才会被解包
const count = ref(0)
// 这里的 object.id 就不是顶级属性，不会被解包
const object = { id: ref(1) }

// 在模板中
{{ count + 1 }} // 1
{{ object.id + 1 }} // [object Object]1

// 可以对其进行解构来解决这个问题
const { id } = object
{{ id + 1 }} // 2

// 注意：如果 ref 是文本插值的最终计算值 (即 {{ }} 标签)，它也会自动解包
{{ object.id }} // 1  等价于 {{ object.id.value }}
```

### [reactive()](https://cn.vuejs.org/api/reactivity-core.html#reactive)
> 返回一个对象的响应式代理
>

+ **语法：**`Vue.reactive(obj)`
+ **参数：**`obj` - 需要转换的对象
+ **返回值：** 返回一个响应式对象

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })
</script>

<template>
  <button @click="state.count++">
    {{ state.count }}
  </button>
</template>
```

#### `Reactive Proxy` vs. `Original`
```javascript
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false

// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true

// 响应式对象内的嵌套对象依然是代理
const proxy = reactive({})
const raw = {}
proxy.nested = raw
console.log(proxy.nested === raw) // false
```

#### reactive() 的局限性
1. **有限的值类型：** 它只能用于对象类型 (对象、数组和如 `Map`、`Set` 这样的集合类型)。它不能持有如 `string`、`number` 或 `boolean` 这样的原始类型
2. **不能替换整个对象：** 由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用

```javascript
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 })
```

3. **对解构操作不友好：** 如果将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，将丢失响应性连接

```javascript
const state = reactive({ count: 0 })

// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```

## DOM 更新时机 - [nextTick()](https://cn.vuejs.org/api/general.html#nexttick)
> DOM 更新是异步的，当响应式状态发生变化时，Vue 会将变化缓冲到队列中，然后在下一个事件循环中更新 DOM，这样可以避免频繁更新 DOM，提高性能
>

```javascript
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

## 计算属性 - [computed()](https://cn.vuejs.org/api/reactivity-core.html#computed)
> 对数据进行计算并缓存计算结果
>

+ **语法：**`computed(options)`
+ **参数：**`options` - 计算选项。可以是一个 `getter` 函数，也可以是一个包含 `getter` 和 `setter` 的对象
+ **返回值：** 计算属性 ref
+ **说明：** Vue 的计算属性会自动追踪响应式依赖，计算属性值会基于其响应式依赖被缓存，直到它们的响应式依赖发生改变
+ **注意：**
    - **Getter 不应有副作用：** 不要改变其他状态、在 `getter` 中做异步请求或者更改 DOM！
    - **避免直接修改计算属性值：** 应该更新它所依赖的源状态以触发新的计算

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: ['Vue 2 - Advanced Guide', 'Vue 3 - Basic Guide', 'Vue 4 - The Mystery']
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

### 可写计算属性
> 计算属性默认是只读的。只在某些特殊场景中可能才需要用到“可写”的属性
>

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

## Class 绑定
+ **注意：** 当只有一个根元素的组件使用了 `class` attribute 时，这些 class 会被添加到根元素上并与该元素上已有的 class 合并，可以通过组件的 `$attrs` 属性来指定接受的元素

### 绑定对象
```vue
<script setup>
import { ref, reactive, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const error = ref(null)

const classObject1 = reactive({
  active: true,
  'text-danger': false
})

const classObject2 = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
</script>

<template>
  <!-- 渲染结果：<div class="static active"></div> -->
  <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>

  <!-- 可以直接绑定一个对象 -->
  <div :class="classObject1"></div>

  <!-- 也可以绑定一个返回对象的计算属性 -->
  <div :class="classObject2"></div>
</template>
```

### 绑定数组
```vue
<script setup>
import { ref } from 'vue'

const activeClass = ref('active')
const errorClass = ref('text-danger')

const isActive = ref(true)
</script>

<template>
  <!-- 渲染结果：<div class="active text-danger"></div> -->
  <div :class="[activeClass, errorClass]"></div>

  <!-- 可以使用三元表达式，进行有条件的渲染某个 class -->
  <div :class="[isActive ? activeClass : '', errorClass]"></div>

  <!-- 也可以在数组中嵌套对象 -->
  <div :class="[{ [activeClass]: isActive }, errorClass]"></div>
</template>
```

## Style 绑定
+ **自动前缀：** 当在 `:style` 中使用了需要浏览器特殊前缀的属性时，Vue 会自动添加相应前缀
+ **样式多值：** 一个样式属性提供多个（不同前缀的）值

```vue
<!-- 数组仅会渲染浏览器支持的最后一个值 -->
<!-- 如果浏览器支持不需要特殊前缀，下面示例将会渲染为 display: flex -->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

### 绑定对象
```vue
<script setup>
import { ref, reactive, computed } from 'vue'

const activeColor = ref('red')
const fontSize = ref(30)

const styleObject1 = reactive({
  color: 'red',
  fontSize: '30px'
})

const styleObject2 = computed(() => ({
  color: activeColor.value,
  fontSize: fontSize.value + 'px'
}))
</script>

<template>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

  <!-- 可以直接绑定一个样式对象 -->
  <div :style="styleObject1"></div>

  <!-- 也可以绑定一个返回样式对象的计算属性 -->
  <div :style="styleObject2"></div>
</template>
```

### 绑定数组
```vue
<script setup>
import { computed } from 'vue'

const baseStyles = computed(() => ({
  width: '100px',
  height: '100px',
  backgroundColor: 'red'
}))

const overridingStyles = computed(() => ({
  backgroundColor: 'blue'
}))
</script>

<template>
  <!-- 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上 -->
  <div :style="[baseStyles, overridingStyles]"></div>
</template>
```

## 条件渲染
### [v-if](https://cn.vuejs.org/api/built-in-directives.html#v-if)
> 基于表达式值的真假性，来条件性地渲染元素或者模板片段
>

+ **注意：** 当 `v-if` 和 `v-for` 同时存在于一个元素上的时候，`v-if` 会首先被执行。但 **不推荐** 同时使用

```html
<!-- v-if 用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染 -->
<h1 v-if="awesome">Vue is awesome!</h1>

<!-- v-else 用于为 v-if 添加一个 “else 区块” -->
<!-- 一个 v-else 元素必须跟在一个 v-if 或者 v-else-if 元素后面，否则它将不会被识别 -->
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

<!-- v-else-if 用于提供相应 v-if 的 “else if 区块”。他可以连续多次重复使用 -->
<!-- 和 v-else 类似，一个使用 v-else-if 的元素必须紧跟在一个 v-if 或一个 v-else-if 元素后面 -->
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

`<template>` **上的** `v-if`

> 当想要控制多个元素进行条件渲染时，可以使用 `<template>` 包装器元素，template 元素不会渲染到 DOM 中，但是会保留其作用域
>

+ **提示：**`v-else` 和 `v-else-if` 也可以在 `<template>` 上使用

```vue
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### [v-show](https://cn.vuejs.org/api/built-in-directives.html#v-show)
> 基于表达式值的真假性，来改变元素的可见性
>

+ **注意：**`v-show` 不支持在 `<template>` 元素上使用，也不能和 `v-else` 搭配使用

```vue
<h1 v-show="ok">Hello!</h1>
```

### `v-if` vs. `v-show`
+ `v-if` 是 “真实的” 按条件渲染，当切换条件时，条件区块内的事件监听器和子组件都会被销毁和重建
+ `v-if` 是**惰性**的：如果初始条件为假，则元素不会进行渲染，直到条件第一次变为真时才被渲染
+ `v-show` 元素无论初始条件如何，始终会被渲染，只有 CSS `display` 属性会被切换
+ **总结：**`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适

## 列表渲染 [v-for](https://cn.vuejs.org/api/built-in-directives.html#v-for)
> 基于原始数据多次渲染元素或模板块
>

+ **注意：**`v-if` 和 `v-for` 同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高（**不推荐**同时使用）。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名

### 遍历数组
+ **变更方法**（Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相应更新）**：**
    - `push()`
    - `pop()`
    - `shift()`
    - `unshift()`
    - `splice()`
    - `sort()`
    - `reverse()`

```vue
<script setup>
import { ref } from 'vue'

const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
</script>

<template>
  <!-- 在 v-for 块中可以完整地访问父作用域内的属性和变量 -->
  <!-- v-for 也支持使用可选的第二个参数表示当前项的位置索引 -->
  <li v-for="(item, index) in items">{{ parentMessage }} - {{ index }} - {{ item.message }}</li>

  <!-- 也可以在定义 v-for 的变量别名时使用解构 -->
  <li v-for="{ message } in items">
    {{ message }}
  </li>

  <!-- 有 index 索引时 -->
  <li v-for="({ message }, index) in items">{{ message }} {{ index }}</li>

  <!-- 也可以使用 of 作为分隔符来替代 in -->
  <div v-for="item of items"></div>

  <ul>
    <!-- 也可以在 <template> 标签上使用 v-for 来渲染一个包含多个元素的块 -->
    <template v-for="item in items">
      <li>{{ item.message }}</li>
      <li class="divider" role="presentation"></li>
    </template>
  </ul>

  <!-- 循环渲染组件 -->
  <MyComponent v-for="(item, index) in items" :item="item" :index="index" :key="item.id" />
</template>
```

### 遍历对象
```vue
<script setup>
import { reactive } from 'vue'

const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
</script>

<template>
  <!-- v-for 遍历对象的顺序取决于 Object.values () 的返回值 -->
  <!-- 第二个参数表示属性名 -->
  <!-- 第三个参数表示索引 -->
  <ul>
    <li v-for="(value, key, index) in myObject">{{ index }}. {{ key }}: {{ value }}</li>
  </ul>
</template>
```

### 遍历数字
```vue
<!-- v-for 可以接受一个整数值 -->
<!-- 注意：此处 n 的初值是从 1 开始而非 0 -->
<span v-for="n in 10">{{ n }}</span>
```

### 通过 key 管理状态
+ **说明：**Vue 默认按照“就地更新”的策略来更新通过 `v-for` 渲染的元素列表。默认模式是高效的，但**只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况**。
+ **注意：**
    - **推荐**在任何可行的时候为 `v-for` 提供一个 `key` attribute
    - `key` 绑定的值期望是一个基础类型的值，例如字符串或 number 类型。不要用对象作为 `v-for` 的 key。

```vue
<!-- 为每个元素对应的块提供一个唯一的 key attribute，以便 Vue 可以跟踪每个节点的标识，从而重用和重排现有的节点 -->
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>

<!-- 在使用 <template v-for> 时，key 应该被放置在这个 <template> 容器上 -->
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

## 事件处理 [v-on](https://cn.vuejs.org/api/built-in-directives.html#v-on)
> 给元素绑定事件监听器
>

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}

function say(message) {
  alert(message)
}

function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
</script>

<template>
  <!-- 内联事件处理器 -->
  <button @click="count++">Add 1</button>
  <p>Count is: {{ count }}</p>

  <!-- 方法事件处理器 -->
  <!-- `greet` 是上面定义过的方法名 -->
  <button @click="greet">Greet</button>

  <!-- 在内联处理器中调用方法 -->
  <button @click="say('hello')">Say hello</button>
  <button @click="say('bye')">Say bye</button>

  <!-- 在内联事件处理器中访问事件参数 -->
  <!-- 使用特殊的 $event 变量 -->
  <button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>

  <!-- 使用内联箭头函数 -->
  <button @click="event => warn('Form cannot be submitted yet.', event)">Submit</button>
</template>
```

### 事件修饰符
+ **事件修饰符：**
    - `.stop` - 阻止事件冒泡
    - `.prevent` - 阻止事件默认行为
    - `.self` - 仅当事件来自监听元素自身时触发回调
    - `.capture` - 使用事件捕获模式
    - `.once` - 只触发一次
    - `.passive` - 禁用事件的默认行为
+ **注意：**
    - `.capture`、`.once` 和 `.passive` 修饰符与原生 `addEventListener` 事件相对应
    - `.passive` 修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

:::info
**Tips**

+ 使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 `@click.prevent.self` 会阻止元素及其子元素的所有点击事件的默认行为，而 `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。
+ 请勿同时使用 `.passive` 和 `.prevent`，因为 `.passive` 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 `.prevent` 会被忽略，并且浏览器会抛出警告。

:::

### 按键修饰符
+ **按键修饰符：**
    - `.enter` - 回车键
    - `.tab` - Tab 键
    - `.delete` - 退格键 (捕获“Delete”和“Backspace”两个按键)
    - `.esc` - ESC 键
    - `.space` - 空格键
    - `.up` - 上箭头
    - `.down` - 下箭头
    - `.left` - 左箭头
    - `.right` - 右箭头
+ **系统按键修饰符：**
    - `.ctrl` - Ctrl 键
    - `.alt` - Alt 键
    - `.shift` - Shift 键
    - `.meta` - Meta 键
+ `.exact` **修饰符：**
    - `.exact` - 精确控制组合键
+ **鼠标按键修饰符：**
    - `.left` - 鼠标左键
    - `.right` - 鼠标右键
    - `.middle` - 鼠标中键

```html
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />

<!-- 可以直接使用 KeyboardEvent.key 暴露的按键名称作为修饰符。但需要转为 kebab-case -->
<!-- 仅会在 $event.key 为 'PageDown' 时调用事件处理 -->
<input @keyup.page-down="onPageDown" />

<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>

<!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>
```

:::info
**Tips：**

+ 请注意，系统按键修饰符和常规按键不同。与 `keyup` 事件一起使用时，该按键必须在事件发出时处于按下状态。换句话说，`keyup.ctrl` 只会在你仍然按住 `ctrl` 但松开了另一个键时被触发。若你单独松开 `ctrl` 键将不会触发。

:::

## 表单输入绑定 [v-model](https://cn.vuejs.org/api/built-in-directives.html#v-model)
> 在表单输入元素或组件上创建双向绑定
>

+ **注意：**
    - 文本类型的 `<input>` 和 `<textarea>` 元素会绑定 `value` property 并侦听 `input` 事件
    - `<input type="checkbox">` 和 `<input type="radio">` 会绑定 `checked` property 并侦听 `change` 事件
    - `<select>` 会绑定 `value` property 并侦听 `change` 事件

:::info
**Tips：**

+ `v-model` 会忽略任何表单元素上初始的 `value`、`checked` 或 `selected` attribute。它将始终将当前绑定的 JavaScript 状态视为数据的正确来源。你应该在 JavaScript 中使用响应式系统的 API来声明该初始值

:::

### 文本 - `<input>`
+ **注意：**`v-model` 不会在 [**IME**](https://en.wikipedia.org/wiki/Input_method)（中文，日文和韩文等）输入还在拼字阶段时触发更新。如果想在拼字阶段也触发更新，请直接使用自己的 `input` 事件监听器和 `value` 绑定而不要使用 `v-model`

```html
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

### 多行文本 - `<textarea>`
```html
<span>Multiline message is:</span>
<p style="white-space: pre-line">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>

<!-- 注意在 <textarea> 中是不支持插值表达式的。请使用 v-model 来替代： -->
<!-- 错误 -->
<textarea>{{ text }}</textarea>

<!-- 正确 -->
<textarea v-model="text"></textarea>
```

### 复选框 - `<input type="checkbox">`
```html
<!-- 单一复选框，绑定布尔类型值 -->
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>

<!-- 多个复选框，绑定到一个数组或集合类型的值 -->
const checkedNames = ref([])

<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>

<!-- true-value 和 false-value 是 Vue 特有的 attributes，仅支持和 v-model 配套使用 -->
<!-- toggle 属性的值会在选中时被设为 'yes'，取消选择时设为 'no' -->
const toggle = ref('')
const dynamicTrueValue = ref('yes')
const dynamicFalseValue = ref('no')
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue"
/>
```

:::info
**Tips：**

+ `true-value` 和 `false-value` attributes 不会影响 `value` attribute，因为浏览器在表单提交时，并不会包含未选择的复选框。为了保证这两个值 (例如：“yes”和“no”) 的其中之一被表单提交，请使用单选按钮作为替代。

:::

### 单选按钮 - `<input type="radio">`
```html
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>

<!-- pick 会在第一个按钮选中时被设为 first，在第二个按钮选中时被设为 second -->
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

### 选择器 - `<select>`
```html
<!-- 单选 -->
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<!-- 多选（值绑定到一个数组） -->
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<!-- 使用 v-for 渲染选项 -->
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])

<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected }}</div>

<!-- v-model 同样也支持非字符串类型的值绑定！ -->
<!-- 以下例子中，当选项被选中，selected 会被设为该对象字面量值 { number: 123 } -->
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

:::info
**Tips：**

+ 当 `v-model` 初始值为空时，在 iOS 上，用户将无法选择第一项，因为 iOS 在这种情况下不会触发第一项的 `change` 事件。因此，建议提供一个空值的禁用选项

:::

### 修饰符
+ **修饰符：**
    - `.lazy` - 取代 input 监听 change 事件
    - `.number` - 输入字符串转为数字
    - `.trim` - 输入首尾空格过滤

```vue
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />

<!-- 用户输入自动转换为数字 -->
<!-- 如果该值无法被 parseFloat() 处理，那么将返回原始值 -->
<!-- number 修饰符会在输入框有 type="number" 时自动启用 -->
<input v-model.number="age" />

<!-- 自动去除用户输入内容中两端的空格 -->
<input v-model.trim="msg" />
```

## 生命周期
### [onMounted()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onmounted)
> 注册一个回调函数，在组件挂载完成后执行
>

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

### 生命周期图示
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1735121885657-cbf91395-a472-464f-8c0c-d365c056d3f4.png)

## 侦听器 - [watch()](https://cn.vuejs.org/api/reactivity-core#watch)
> 侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数
>

+ **语法：watch(source, callback, options?)**
+ **参数：**
    - `source` - 可以是一个 ref、一个响应式对象、一个 getter 函数、或是由以上类型的值组成的数组
    - `callback` - 回调函数，当 source 变化时调用
    - `options` - 可选的配置对象
        * `deep` - 是否深度侦听，默认值为 false
        * `immediate` - 是否在侦听开始时立即执行回调，默认值为 false
        * `once` - 是否只执行一次回调，默认值为 false
        * `flush` - 决定回调函数的执行时机，默认值为 'pre'。可选值包括 'pre'、'post' 和 'sync'。'pre' 表示在组件更新之前调用，'post' 表示在组件更新之后调用，'sync' 则表示同步执行回调
+ **返回值：** 一个停止侦听的函数

```javascript
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, newX => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  sum => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

// 注意：不能直接侦听响应式对象的属性值
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, count => {
  console.log(`Count is: ${count}`)
})

// 这里需要用一个返回该属性的 getter 函数
watch(
  () => obj.count,
  count => {
    console.log(`Count is: ${count}`)
  }
)
```

### 深层侦听器 - deep
+ **提示：**`deep` 选项还可以是一个数字，用于指定嵌套的层级

```javascript
// 将响应式对象直接传递给 watch() 会自动启用深度侦听，这样对象中任何属性的变化都会触发回调函数
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++

// 一个返回响应式对象的 getter 函数，仅在返回不同的对象时触发回调
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)

// 可以通过 deep 选项来显示开启深层侦听
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```

:::info
**Tips：**

+ 深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。

:::

### 即时回调侦听器 - immediate
> `watch` 默认是懒执行的，仅当数据源变化时，才会执行回调
>

```javascript
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
```

### 一次性侦听器 - once
```javascript
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)
```

### [watchEffect()](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)
> 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行
>

```javascript
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
    data.value = await response.json()
  },
  { immediate: true }
)

// 可以使用 watchEffect() 来简化上面的代码
watchEffect(async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
  data.value = await response.json()
})
```

:::info
**Tips：**

+ `watchEffect` 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await` 之前的代码才会被追踪

:::

### `watch` vs. `watchEffect`
+ `watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。
+ 它们之间的主要区别是**追踪响应式依赖的方式**：
    - `watch` 只追踪明确侦听的数据源。能够更加精确地控制回调函数的触发时机
    - `watchEffect` 在副作用执行时自动追踪所有响应式依赖，使代码更简洁

### 副作用清理 - [onWatcherCleanup()](https://cn.vuejs.org/api/reactivity-core#onwatchercleanup)
> 注册一个清理函数，在侦听器重新运行之前执行，用于清理副作用
>

+ **注意：** 只能在 `watchEffect` 作用函数或 `watch` 回调函数的同步执行期间调用 (即不能在异步函数的 `await` 语句之后调用)

```javascript
import { watch, onWatcherCleanup } from 'vue'

watch(id, newId => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})

// 通过函数参数传递的 onCleanup 与侦听器实例相绑定，因此不受 onWatcherCleanup 的同步限制
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect(onCleanup => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})
```

### 回调的触发时机 - flush
> 默认情况下，侦听器回调会在父组件更新 (如有) **之后**、所属组件的 DOM 更新**之前**被调用
>

#### 后置侦听器 - [watchPostEffect()](https://cn.vuejs.org/api/reactivity-core#watchposteffect)
```javascript
// 侦听器回调在所属组件 DOM 更新之后执行
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})

// 后置侦听器 - watchPostEffect()
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

#### 同步侦听器 - [watchSyncEffect()](https://cn.vuejs.org/api/reactivity-core#watchsynceffect)
```javascript
// 侦听器回调在 Vue 进行任何更新之前执行
watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})

// 同步侦听器 - watchSyncEffect()
import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
})
```

:::info
**Tips：**

+ 同步侦听器不会进行批处理，每当检测到响应式数据发生变化时就会触发。可以使用它来监视简单的布尔值，但应避免在可能多次同步修改的数据源 (如数组) 上使用。

:::

### 停止侦听器
> 侦听器必须用**同步**语句创建，如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，则必须手动停止它，以防内存泄漏
>

```vue
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)

// 要手动停止一个侦听器，需要调用 watch 或 watchEffect 返回的函数：
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()

// 注意：需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，可以使用条件式的侦听逻辑
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
</script>
```

## 模板引用 - [useTemplateRef()](https://cn.vuejs.org/api/composition-api-helpers#usetemplateref)
> 返回一个浅层 `ref`，其值将与模板中的具有匹配 `ref` attribute 的元素或组件同步
>

+ **注意：** 需要在组件挂载后才能访问模板引用

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

### v-for 中的模板引用
> 当在 v-for 中使用模板引用时，返回一个数组，包含所有元素的引用
>

+ **注意：**`ref` 数组并不保证与源数组相同的顺序

```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = useTemplateRef('items')

onMounted(() => console.log(itemRefs.value)) // [li, li, li, ...]
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

### 组件上的 ref
+ **注意：** 使用了 `<script setup>` 的组件默认是私有的，如果父组件想要访问子组件中的方法或属性，子组件需要通过 `defineExpose` 宏显示暴露

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = useTemplateRef('child')

onMounted(() => {
  // childRef.value 将持有 <Child /> 的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```

_**Child**_

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
// 通过模板引用得到的实例类型为 { a: number, b: number }，ref 会自动解包
defineExpose({
  a,
  b
})
</script>
```

## 组件注册 - [app.component()](https://cn.vuejs.org/api/application.html#app-component)
:::info
**Tips：**

+ 组件名我们推荐使用 PascalCase，因为这样可以提高模板的可读性，能够帮助我们区分 Vue 组件和原生 HTML 元素。

:::

### 局部注册
+ **说明：** 在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册
+ **注意：** 局部注册的组件在后代组件中不可用

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

### 全局注册
```javascript
import { createApp } from 'vue'
import MyComponent from './App.vue'

const app = createApp({})

app.component('MyComponent', MyComponent)

// .component() 方法可以被链式调用
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)

// 全局注册的组件在当前应用的任意组件中都可用
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

### 自动全局注册
```javascript
import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    const requireComponent = import.meta.glob('./components/*.vue')

    Object.entries(requireComponent).forEach(([path, component]) => {
      const componentName = path.split('/').pop().replace(/\.\w+$/, '')
      app.component(componentName, defineAsyncComponent(component))
    })
  }
}
```

## Vue 组件通信
### 父向子传值 - Props
+ **校验选项中的 **`type`** 可以是下列这些原生构造函数：**
    - `String`
    - `Number`
    - `Boolean`
    - `Array`
    - `Object`
    - `Date`
    - `Function`
    - `Symbol`
    - `Error`
+ **说明：**`type` 也可以是自定义的类或构造函数，Vue 将会通过 `instanceof` 来检查类型是否匹配。
+ **注意：** props 应遵循单向数据流的原则，不应该在子组件中修改 props

```vue
<script setup>
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // 必传但可为 null 的字符串
  propD: {
    type: [String, null],
    required: true
  },
  // Number 类型的默认值
  propE: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propF: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回
    // 该函数接收组件所接收到的原始 prop 作为参数
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  // 完整的 props 作为第二个参数传入
  propG: {
    validator(value, props) {
      // 该值必须与这些字符串中的一个相匹配
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propH: {
    type: Function,
    // 不像对象或数组的默认，这不是一个工厂函数
    // 这是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})

const post = {
  id: 1,
  title: 'My Journey with Vue'
}
</script>

<template>
  <!-- 使用一个对象绑定多个 prop -->
  <BlogPost v-bind="post" />
  <!-- 等价于 -->
  <BlogPost :id="post.id" :title="post.title" />
</template>
```

:::info
**Tips：**

+ prop 命名应使用 camelCase 形式，然而对于传递的 props 来说，推荐使用 kebab-case 形式，更贴近 HTML 的书写风格。
+ `defineProps()` 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中。

:::

#### 响应式 Props 解构
```javascript
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // "foo" prop 变化时重新执行。编辑器会将 `foo` 转换为 `props.foo`
  console.log(foo)
})

// ❌ 下面代码等价于 watch(props.foo, ...) 不是响应式数据源
watch(foo, /* ... */)

// ✅ 可以通过将其包装在 getter 中来侦听解构的 prop
watch(() => foo, /* ... */)

// 如果需要传递解构的 prop 到外部函数中并保持响应性，可以将其包装在 getter 中
useComposable(() => foo) // 这是一个自定义的 composable 函数
```

#### Boolean 类型转换
+ **注意：**
    - 除 `Boolean` 外未传递的可选 prop 将会有一个默认值 `undefined`
    - `Boolean` 类型的未传递的 prop 将被转换为 `false`
    - 当一个 prop 同时允许多种类型时，`Boolean` 的转换规则依然适用。但有一个例外，当同时允许 `String` 和 `Boolean` 时，只有当 `Boolean` 出现在 `String` 之前时，Boolean 转换规则才适用

```html
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

```javascript
defineProps({
  disabled: Boolean
})

// disabled 将被转换为 true
defineProps({
  disabled: [Boolean, Number]
})

// disabled 将被转换为 true
defineProps({
  disabled: [Boolean, String]
})

// disabled 将被转换为 true
defineProps({
  disabled: [Number, Boolean]
})

// disabled 将被解析为空字符串 (disabled="")
defineProps({
  disabled: [String, Boolean]
})
```

### 子向父传值 - 事件传参
+ **注意：**
    - 在模板中推荐使用 kebab-case 形式来编写监听器
    - `defineEmits()` 宏不能在子函数中使用。它必须直接放置在 `<script setup>` 的顶级作用域下

**子组件**

```vue
<script setup>
// 显式声明要触发的事件
// const emit = defineEmits(['inFocus', 'submit'])

// 事件校验
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm() {
  emit('submit', { email, password })
}
</script>

<template>
  <!-- 触发自定义事件 -->
  <button @click="$emit('someEvent')">Click Me</button>

  <!-- 事件传参 -->
  <button @click="$emit('increaseBy', 1)">Increase by 1</button>
</template>
```

**父组件**

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increaseCount(n) {
  count.value += n
}
</script>

<template>
  <!-- 监听自定义事件 -->
  <MyComponent @some-event="callback" />

  <!-- <MyButton @increase-by="n => (count += n)" /> -->
  <MyButton @increase-by="increaseCount" />
</template>
```

:::info
**Tips：**

+ 所有传入 `$emit()` 的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3)` 触发后，监听器函数将会收到这三个参数值。
+ 如果一个原生事件的名字 (例如 `click`) 被定义在 `emits` 选项中，则监听器只会监听组件触发的 `click` 事件而不会再响应原生的 `click` 事件。

:::

### 依赖注入
+ **提示：** 当提供 / 注入响应式的数据时，**建议尽可能将任何对响应式状态的变更都保持在供给方组件中**

#### [provide()](https://cn.vuejs.org/api/composition-api-dependency-injection#provide)
> 为后代组件提供数据
>

```vue
<script setup>
import { provide } from 'vue'

// 第一个参数是 key，第二个参数是 value
provide('message', 'hello!')
</script>
```

**应用层 Provide**

+ **说明：** 应用级别提供的数据在该应用内的所有组件中都可以注入

```javascript
import { createApp } from 'vue'

const app = createApp({})

app.provide('message', 'hello!')
```

#### [inject()](https://cn.vuejs.org/api/composition-api-dependency-injection#inject)
> 注入上层组件提供的数据
>

```vue
<script setup>
import { inject } from 'vue'

// 第一个参数是要注入的 key
const message = inject('message')

// 注入默认值
// 如果没有祖先组件提供 "message"，则使用默认值
const value = inject('message', '这是默认值')

// 为了避免在用不到默认值的情况下进行不需要的计算或产生副作用，可以传入一个工厂函数
// 第三个参数表示默认值是一个工厂函数
const value = inject('key', () => new ExpensiveClass(), true)
</script>
```

#### 使用 Symbol 作注入名
> 当构建大型的应用，其包含非常多的依赖提供，或者在开发组件库，建议最好使用 Symbol 来作为注入名以避免潜在的冲突
>

+ **说明：** 推荐在一个单独的文件中导出这些注入名 Symbol

```javascript
// keys.js
export const myInjectionKey = Symbol()
```

```javascript
// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* 要提供的数据 */
})
```

```javascript
// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

## 组件 v-model
**子组件**

```vue
<script setup>
const model = defineModel()

// 可以通过给 defineModel 传递选项，来声明底层 prop 的配置
// 使 v-model 必填
// const model = defineModel({ required: true })

// 提供一个默认值
// const model = defineModel({ default: 0 })

// 可以通过将字符串作为第一个参数传递给 defineModel 来指定 prop 的名称
const title = defineModel('title')

// 也可以通过第二个参数传递选项来配置 prop
// const title = defineModel('title', { required: true })

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>

  <input type="text" v-model="title" />
</template>
```

**父组件**

```vue
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const countModel = ref(0)
const bookTitle = ref('')
</script>

<template>
  <Child v-model="countModel" />

  <!-- 也可以接受一个参数，用于指定 prop 的名字 -->
  <Child v-model:title="bookTitle" />
</template>
```

:::info
**Tips：**

+ 如果为 `defineModel` prop 设置了一个 `default` 值且父组件没有为该 prop 提供任何值，会导致父组件与子组件之间不同步。在下面的示例中，父组件的 myRef 是 undefined，而子组件的 model 是 1

:::

```vue
<!-- 子组件 -->
const model = defineModel({ default: 1 })

<!-- 父组件 -->
const myRef = ref()

<Child v-model="myRef"></Child>
```

### 底层机制
> defineModel 在编译过程中会被展开为一个名为 `modelValue` 的 prop 和名为 `update:modelValue` 的事件
>

**子组件**

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>
```

**父组件**

```vue
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const foo = ref('bar')
</script>

<template>
  <Child :modelValue="foo" @update:modelValue="$event => (foo = $event)" />
</template>
```

### 多个 `v-model` 绑定
**子组件**

```vue
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

**父组件**

```vue
<script setup>
import { ref } from 'vue'
import UserName from './UserName.vue'

const first = ref('John')
const last = ref('Doe')
</script>

<template>
  <UserName v-model:first-name="first" v-model:last-name="last" />
</template>
```

### 自定义修饰符
**子组件**

```vue
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      // 将首字母大写
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})

console.log(modifiers) // { capitalize: true }

const [firstName, firstNameModifiers] = defineModel('firstName', {
  set(value) {
    if (firstNameModifiers.capitalize) {
      // 将首字母大写
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
const [lastName, lastNameModifiers] = defineModel('lastName', {
  set(value) {
    if (lastNameModifiers.uppercase) {
      // 将所有字母大写
      return value.toUpperCase()
    }
    return value
  }
})

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>

<template>
  <input type="text" v-model="model" />

  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

**父组件**

```vue
<script setup>
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'

const myText = ref('hello')

const first = ref('john')
const last = ref('doe')
</script>

<template>
  <MyComponent v-model.capitalize="myText" />

  <!-- 带参数的 v-model 修饰符 -->
  <MyComponent v-model:first-name.capitalize="first" v-model:last-name.uppercase="last" />
</template>
```

## 透传 Attributes
> “透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 `v-on` 事件监听器
>

+ **注意：**
    - 透传的 attribute 也可以被子组件继承，即可被深层组件继承

**父组件**

```vue
<template>
  <!-- v-on 监听器同样会被子组件的根元素所继承，当子组件中根元素被点击时，会触发父组件的 onClick 事件 -->
  <MyButton class="large" @click="onClick" />
</template>
```

**子组件**

```vue
<script setup>
import { useAttrs } from 'vue'

// 可以通过 useAttrs 获取组件的所有透传 attribute
const attrs = useAttrs()
</script>

<template>
  <!-- 当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上 -->
  <button>Click Me</button>
  <!-- 将被渲染为： -->
  <!-- <button class="large">Click Me</button> -->
</template>
```

```vue
<template>
  <!-- 如果一个子组件的根元素已经有了 class 或 style attribute，它会和从父组件上继承的值合并 -->
  <button class="btn">Click Me</button>
  <!-- 将被渲染为： -->
  <!-- <button class="btn large">Click Me</button> -->
</template>
```

### 禁用 Attributes 继承
+ **注意：**
    - 和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 `foo-bar` 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问
    - 像 `@click` 这样的一个 `v-on` 事件监听器将在此对象下被暴露为一个函数 `$attrs.onClick`

```vue
<script setup>
// 如果 attribute 需要应用在根节点以外的其他元素上，则需要设置 inheritAttrs 选项为 false 来禁用 attribute 继承
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>

<template>
  <div class="btn-wrapper">
    <!-- $attrs 对象包含了除组件所声明的 props 和 emits 之外的所有其他 attribute -->
    <!-- 没有参数的 v-bind 会将一个对象的所有属性都作为 attribute 应用到目标元素上 -->
    <button class="btn" v-bind="$attrs">Click Me</button>
  </div>
</template>
```

### 多根节点的 Attributes 继承
+ **注意：** 有多个根节点的组件，`$attrs` 必须被显示绑定，否则将会抛出一个运行时警告

**父组件**

```vue
<template>
  <CustomLayout id="custom-layout" @click="changeValue" />
</template>
```

**子组件**

```vue
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

## 插槽 - Slots
### 默认插槽
**子组件**

```vue
<template>
  <button type="submit">
    <slot>
      Submit
      <!-- 默认内容 -->
    </slot>
  </button>
</template>
```

**父组件**

```vue
<template>
  <!-- 当没有提供任何插槽内容时，“Submit”将会被作为默认内容渲染 -->
  <SubmitButton />
  <!-- 将被渲染为： -->
  <!-- <button type="submit">Submit</button> -->

  <!-- 提供了插槽内容时，插槽内容将会取代默认内容 -->
  <SubmitButton>Save</SubmitButton>
  <!-- 将被渲染为： -->
  <!-- <button type="submit">Save</button> -->
</template>
```

### 具名插槽
+ **注意：** 当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容

**子组件**

```vue
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 没有提供 name 的 <slot> 出口会隐式地命名为 “default” -->
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>

    <!-- 条件插槽：可以根据插槽是否存在来渲染某些内容 -->
    <div v-if="$slots.cardFooter" class="card-footer">
      <slot name="cardFooter" />
    </div>
  </div>
</template>
```

**父组件**

```vue
<template>
  <BaseLayout>
    <!-- # 是 v-slot 的缩写，即 <template v-slot:header> 可以简写为 <template #header> -->
    <template #header>
      <h1>Here might be a page title</h1>
    </template>

    <template #default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>

    <!-- 隐式默认插槽 -->
    <!-- <p>A paragraph for the main content.</p> -->
    <!-- <p>And another one.</p> -->

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </BaseLayout>
</template>
```

**渲染结果**

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

### 动态插槽
```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

### 作用域插槽
**子组件**

```vue
<template>
  <div>
    <slot :message="hello"></slot>
    <!-- 注意：插槽上的 name 是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽 -->
    <slot name="footer" />
  </div>
</template>
```

**父组件**

```vue
<template>
  <!-- 默认插槽 -->
  <!-- v-slot 接收一个插槽 props 对象，可以通过解构赋值获取插槽的值 -->
  <MyComponent v-slot="{ message }"> {{ message }} </MyComponent>

  <!-- 具名插槽 -->
  <!-- v-slot:name="slotProps" 可以缩写为 #name="slotProps" -->
  <MyComponent>
    <template #header="headerProps">
      {{ headerProps }}
    </template>

    <template #default="defaultProps">
      {{ defaultProps }}
    </template>

    <template #footer="footerProps">
      {{ footerProps }}
    </template>
  </MyComponent>

  <!-- 如果同时使用了具名插槽和默认插槽，则需要为默认插槽使用显示的 <template> 标签 -->
  <MyComponent>
    <!-- 使用显式的默认插槽 -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```

## 异步组件 - [defineAsyncComponent()](https://cn.vuejs.org/api/general#defineasynccomponent)
```vue
<script setup>
import { defineAsyncComponent } from 'vue'

// 接收一个返回 Promise 的加载函数
const AdminPage = defineAsyncComponent(() => import('./components/AdminPageComponent.vue'))
</script>

<template>
  <AdminPage />
</template>
```

### 加载与错误状态
```javascript
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

### 惰性激活
**空闲时激活**

```javascript
import { defineAsyncComponent, hydrateOnIdle } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnIdle(/* 传递可选的最大超时 */)
})
```

**可见时激活**

```javascript
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnVisible() // hydrateOnVisible({ rootMargin: '100px' }) 表示在距离视窗 100px 时开始加载
})
```

**媒体查询匹配时激活**

```javascript
import { defineAsyncComponent, hydrateOnMediaQuery } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnMediaQuery('(max-width:500px)')
})
```

**交互时激活**

```javascript
import { defineAsyncComponent, hydrateOnInteraction } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnInteraction('click') // 也可以传入多个事件类型的数组
})
```

**自定义策略**

```javascript
import { defineAsyncComponent, type HydrationStrategy } from 'vue'

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  // forEachElement 是一个遍历组件未激活的 DOM 中所有根元素的辅助函数，
  // 因为根元素可能是一个片段而非单个元素
  forEachElement(el => {
    // ...
  })
  // 准备好时调用 `hydrate`
  hydrate()
  return () => {
    // 如必要，返回一个销毁函数
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: myStrategy
})
```

## 组合式函数
> 一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数
>

+ **注意：** 组合式函数约定用驼峰命名法命名，并以“use”作为开头

```javascript
import { ref, watchEffect, toValue } from 'vue'

// 使用 Fetch API 获取数据
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(async () => {
    // 在获取数据前重置状态
    data.value = null
    error.value = null

    // 同步解析 url 值，以便 watchEffect() 将其作为依赖关系进行跟踪
    const urlValue = toValue(url)

    try {
      // 如果是 ref 值，unref() 将返回 ref 值，否则将按原样返回
      const res = await fetch(urlValue)
      data.value = await res.json()
    } catch (e) {
      error.value = e
    }
  })

  return { data, error }
}
```

## 自定义指令 - [app.directive()](https://cn.vuejs.org/api/application.html#app-directive)
> 在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以当作自定义指令使用
>

+ **简化形式：** 当在 `mounted` 和 `updated` 上实现相同行为时，并且不需要其他钩子时，可以使用函数来定义指令
+ **注意：**
    - 只有当所需功能只能通过直接的 DOM 操作来实现时，才应该使用自定义指令
    - 不推荐在组件上使用自定义指令。当组件具有多个根节点时可能会出现预期外的行为

### 局部注册
```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: el => el.focus()
}

const vColor = (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
}

const color = ref('red')
</script>

<template>
  <input v-focus />
  <div v-color="color"></div>
</template>
```

### 全局注册
```javascript
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  mounted: el => el.focus()
})

app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

### 自动全局注册
```javascript
export default {
  install(app) {
    const requireDirective = import.meta.glob('./directives/*.js')

    Object.entries(requireDirective).forEach(([path, directive]) => {
      const directiveName = path.split('/').pop().replace(/\.\w+$/, '')

      app.directive(directiveName, directive)
    })
  }
}
```

### 指令钩子
+ **参数：**
    - `el` - 指令所绑定的元素，可以用来直接操作 DOM
    - `binding` - 一个对象，包含以下属性：
        * `value` - 指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`
        * `oldValue` - 指令绑定的前一个值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否改变，都可以使用
        * `arg` - 传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`
        * `modifiers` - 一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`
        * `instance` - 一个指向 Vue 实例的引用
        * `dir` - 指令的定义对象
    - `vnode` - Vue 编译生成的虚拟节点
    - `prevVnode` - 上一个虚拟节点，仅在 beforeUpdate 和 updated 钩子中可用

```javascript
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```

:::info
**Tips：**

+ 除了 `el` 外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，推荐通过元素的 `dataset` attribute 实现。

:::

## 插件 - [app.use()](https://cn.vuejs.org/api/application.html#app-use)
> 插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码
>

1. **定义插件**

```javascript
// myPlugin.js
export default {
  install(app, options) {
    // 配置此应用
    app.config.globalProperties.$myMethod = function () {
      console.log('myMethod')
    }
  }
}
```

2. **安装插件**

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import myPlugin from './myPlugin.js'

const app = createApp(App)
app.use(myPlugin, { someOption: true })
app.mount('#app')
```

:::info
**Tips：**

+ 请谨慎使用全局属性，如果在整个应用中使用不同插件注入的太多全局属性，很容易让应用变得难以理解和维护。

:::

## 内置组件
### [Transition](https://cn.vuejs.org/guide/built-ins/transition.html)
> 在元素进入或离开时，添加过渡效果
>

+ **注意：**`<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素
+ **CSS 过渡类名：**
    1. `v-enter-from` - 元素进入之前的状态
    2. `v-enter-active` - 元素进入中的状态
    3. `v-enter-to` - 元素进入之后的状态
    4. `v-leave-from` - 元素离开之前的状态
    5. `v-leave-active` - 元素离开中的状态
    6. `v-leave-to` - 元素离开之后的状态
+ **JS 钩子函数：**
    1. `@before-enter` - 元素进入之前
    2. `@enter` - 元素进入中
    3. `@after-enter` - 元素进入之后
    4. `@enter-cancelled` - 元素进入取消
    5. `@before-leave` - 元素离开之前
    6. `@leave` - 元素离开中
    7. `@after-leave` - 元素离开之后
    8. `@leave-cancelled` - 元素离开取消

```vue
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>
  </Transition>

  <!-- 可以为 Transition 组件添加 name 属性，用于自定义 class 名称 -->
  <Transition name="slide-fade">
    <p v-if="show">hello</p>
  </Transition>

  <Transition name="bounce">
    <p v-if="show" style="text-align: center">Hello here is some bouncy text!</p>
  </Transition>

  <!-- 假设你已经在页面中引入了 Animate.css -->
  <!-- 也可以向 Transition 组件传递以下 props 来指定自定义的 class 名称：
    - enter-from-class
    - enter-active-class
    - enter-to-class
    - leave-from-class
    - leave-active-class
    - leave-to-class -->
  <Transition
    name="custom-classes"
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-if="show">hello</p>
  </Transition>

  <!-- 如果同时使用 transition 和 animation，可以使用 type prop 来显式强调哪种过渡类型 -->
  <Transition type="animation">...</Transition>

  <!-- 可以使用深层级的 CSS 选择器来为嵌套元素添加动画 -->
  <!-- duration - 指定动画的持续时间，单位为毫秒。总持续时间等于 duration + delay -->
  <!-- :duration="{ enter: 500, leave: 800 }" duration 也可以是一个对象，用来分别指定进入和离开动画的持续时间 -->
  <Transition name="nested" :duration="550">
    <div v-if="show" class="outer">
      <div class="inner">Hello</div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
// 默认 class 名称
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

// 自定义 class 名称
// 进入和离开动画可以使用不同的持续时间和速度曲线。
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

// 自定义动画
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/* 应用于嵌套元素的规则 */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* 延迟嵌套元素的进入以获得交错效果 */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
</style>
```

### [TransitionGroup](https://cn.vuejs.org/guide/built-ins/transition-group.html)
> 用于对 v-for 列表中的元素或组件的插入、移除和顺序改变添加动画效果
>

```vue
<script setup>
function onBeforeEnter(el) {
  el.style.opacity = 0
  el.style.height = 0
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
</script>

<template>
  <!-- 默认情况下 TransitionGroup 不会渲染任何额外的元素，而是直接将子元素渲染到列表中 -->
  <!-- tag prop 可以用来指定渲染的元素 -->
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </TransitionGroup>

  <TransitionGroup
    tag="ul"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li v-for="(item, index) in computedList" :key="item.msg" :data-index="index">
      {{ item.msg }}
    </li>
  </TransitionGroup>
</template>

<style scoped lang="scss">
// 进入/离开动画
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

// 移动动画
// 可以使用 moveClass prop 为移动元素指定自定义过渡 class
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除，以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
```

### [KeepAlive](https://cn.vuejs.org/guide/built-ins/keep-alive.html)
> 缓存组件实例，避免多次创建和销毁
>

+ **注意：**
    - `onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用
    - 这两个生命周期钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>

<template>
  <!-- 非活跃的组件将会被缓存！ -->
  <KeepAlive>
    <component :is="activeComponent" />
  </KeepAlive>

  <!-- include 用于匹配需要缓存的组件，exclude 用于匹配不需要缓存的组件 -->
  <!-- 两者都支持字符串、正则表达式、数组 -->
  <!-- 以英文逗号分隔的字符串 -->
  <KeepAlive include="a,b">
    <component :is="view" />
  </KeepAlive>

  <!-- 正则表达式 (需使用 `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view" />
  </KeepAlive>

  <!-- 数组 (需使用 `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view" />
  </KeepAlive>

  <!-- max - 最多可以缓存多少组件实例 -->
  <!-- 如果缓存的组件超过了 max 值，Vue 会销毁最久未被访问的实例 -->
  <KeepAlive :max="10">
    <component :is="activeComponent" />
  </KeepAlive>
</template>
```

:::info
**Tips：**

+ 使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明

:::

### [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html)
> 将组件移动到指定的 DOM 节点下
>

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
const isMobile = ref(false)
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <!-- `to` prop 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素 -->
  <!-- disabled - 禁用 Teleport -->
  <Teleport to="body" :disabled="isMobile">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>

  <!-- 多个 Teleport 可以渲染到同一个目标： -->
  <Teleport to="#modals">
    <div>A</div>
  </Teleport>
  <Teleport to="#modals">
    <div>B</div>
  </Teleport>

  <!-- 渲染结果： -->
  <!-- <div id="modals">
    <div>A</div>
    <div>B</div>
  </div> -->

  <!-- 也可以使用 defer prop 来延迟渲染 Teleport 的内容 -->
  <!-- 注意：使用 defer 时，目标元素必须与 Teleport 在同一挂载/更新周期内渲染 -->
  <Teleport defer to="#late-div">...</Teleport>

  <!-- 稍后出现于模板中的某处 -->
  <div id="late-div"></div>
</template>
```

:::info
**Tips：**

+ `<Teleport>` 挂载时，传送的 `to` 目标必须已经存在于 DOM 中。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。如果目标元素也是由 Vue 渲染的，你需要确保在挂载 `<Teleport>` 之前先挂载该元素。

:::

## 性能优化
### 代码压缩
#### Gzip 压缩
1. **构建时生成预压缩文件**
    1. **安装插件**

```shell
npm install vite-plugin-compression --save-dev
```

    2. **配置 vite.config.js**

```javascript
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    viteCompression({
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 扩展名
      threshold: 10240, // 对超过10KB的文件压缩
      deleteOriginFile: false // 不删除源文件
    })
  ]
})
```

2. **服务器配置动态压缩**
    1. **Nginx 配置**

_**nginx.conf**_

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1k;
gzip_comp_level 6;
gzip_vary on;
```

    2. **静态托管服务（如 Netlify/Vercel）**

_**netlify.toml**_

```toml
[[headers]]
  for = "/*"
  [headers.values]
  Content-Encoding = "gzip"
```

3. **验证 Gzip 是否生效**
    1. **浏览器开发者工具**

在 Network 面板查看文件响应头，确认存在 `Content-Encoding: gzip`

    2. **命令行工具**

```shell
curl -I -H "Accept-Encoding: gzip" http://your-domain.com/your-file.js
```

#### Brotli 压缩
1. **基于 Vite 的配置**
    1. **安装插件**

```shell
npm install vite-plugin-compression -D
```

    2. **配置 vite.config.js**

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    compression({
      algorithm: 'brotliCompress', // 指定使用 Brotli 算法
      ext: '.br', // 生成文件后缀
      threshold: 10240, // 超过 10KB 的文件才压缩
      deleteOriginFile: false // 保留原始文件（建议生产环境设置为 true）
    })
  ],
  build: {
    brotliSize: false // 关闭 brotli 压缩大小报告
  }
})
```

2. **服务器配置示例（以 Nginx 为例）**
    1. **安装 Brotli 模块**

```shell
# 对于 Ubuntu/Debian
sudo apt install nginx-module-brotli

# 重新加载 Nginx
sudo systemctl restart nginx
```

    2. **Nginx 配置**

```nginx
http {
  brotli on;
  brotli_static on; # 优先使用预压缩的 .br 文件
  brotli_types text/plain text/css application/javascript application/json image/svg+xml;
  brotli_comp_level 6; # 压缩级别 1-11
}
```

3. **验证配置**
    1. **构建产物检查**

执行 `npm run build` 后，检查 `dist` 目录是否生成 `.br` 文件

    2. **浏览器验证**

在 Network 面板查看文件响应头，确认存在 `Content-Encoding: br`

### 虚拟列表
[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller/blob/master/packages/vue-virtual-scroller/README.md)

1. **安装**

```shell
npm install --save vue-virtual-scroller@next
```

2. **默认导入**

```javascript
// 注意：导入包时，需要包含 import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// 全局导入
import VueVirtualScroller from 'vue-virtual-scroller'
app.use(VueVirtualScroller)

// 按需导入
import { RecycleScroller } from 'vue-virtual-scroller'
app.component('RecycleScroller', RecycleScroller)
```

3. **使用**

**RecycleScroller**

> RecycleScroller 是一个虚拟滚动条，仅呈现可见项目。当用户滚动时，RecycleScroller 会重用所有组件和 DOM 节点以保持最佳性能。
>

+ **Props**
    - `items` - 列表数据
    - `direction` - 滚动方向，可选值为 `vertical` 或 `horizontal`，默认值为 `vertical`
    - `itemSize` - 每个元素的尺寸像素值（垂直模式为高度，水平模式为宽度），默认值为 `null`（表示可变大小）
    - `minItemSize` - 最小元素尺寸，用于动态计算元素尺寸
    - `keyField` - 用于标识元素的字段名，默认值为 `id`
    - `buffer` - 视口上下方预渲染的额外像素数量，默认值为 200
    - `pageMode` - 是否启用分页模式，默认值为 `false`
+ **Events**
    - `resize` - 当容器大小发生变化时触发
    - `visible` - 当容器在页面上可见时触发
    - `hidden` - 当容器在页面上隐藏时触发
    - `scroll-start` - 在渲染第一项时触发
    - `scroll-end` - 在渲染最后一项时触发
+ **Slots**
    - `item` - 当前渲染的元素
    - `index` - 当前渲染元素的索引
    - `active` - 当前渲染元素是否处于活动状态，即是否在视口内

```vue
<template>
  <RecycleScroller class="scroller" :items="list" :item-size="32" key-field="id" v-slot="{ item }">
    <div class="user">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>

<script>
export default {
  props: {
    list: Array
  }
}
</script>

<style scoped>
.scroller {
  height: 100%;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
```

## TypeScript


