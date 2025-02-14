## 安装
```shell
vue create my-project
```

## data - 响应式状态
> 当一个 Vue 实例被创建时，`data` 对象中的所有 `property` 将会被加入到 Vue 的响应式系统中。当这些 `property` 的值发生改变时，视图将会响应更新并匹配对应的值
>

+ **注意：**
    - 如果修改实例上的 `property`，并不在 `data` 中，则不会触发任何视图的更新
    - 一个组件的 `data` 选项必须是一个函数，这样才可以保证每个实例都有自己的数据副本。

```javascript
const data = { a: 1 }
const vm = new Vue({
  data() {
    return data
  }
})

// 获取实例上的 property，会返回源数据中对应的字段
console.log(vm.a === data.a) // true

// 设置 property 会影响到原始数据，反之亦然
vm.a = 2
console.log(data.a) // 2
```

## 生命周期
> 在 Vue 实例生命周期的不同阶段执行一些特定任务
>

+ `beforeCreate()` - 实例创建之前，数据观测和事件配置之前
+ `created()` - 实例创建之后，数据观测和事件配置之后
+ `beforeMount()` - 挂载开始之前
+ `mounted()` - 实例挂载之后
+ `beforeUpdate()` - 数据更新时调用，发生在虚拟 DOM 打补丁之前
+ `updated()` - 由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后
+ `beforeDestroy()` - 实例销毁之前调用
+ `destroyed()` - 实例销毁之后调用
+ **注意：**
    - `mounted` 不会保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 `mounted` 内部使用 `vm.$nextTick`
    - `updated` 不会保证所有的子组件也都被重新渲染完毕。如果你希望等到整个视图都渲染完毕，可以在 `updated` 里使用 `vm.$nextTick`

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1719275341622-03a7bfc0-dee0-4c06-8276-4d72036c5632.png)

## 文本插值（声明式渲染）
> 在 Dom 标签中，直接插入内容
>

+ **语法：**`{{ 表达式 }}`
+ **注意：** 模板表达式都被放在沙盒中，只能访问[**全局变量的一个白名单**](https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9)，如 `Math` 和 `Date` 。不能在模板表达式中访问用户定义的全局变量。

```vue
<template>
	<div>
    <p>{{ msg }}</p>
    <p>{{ number + 1 }}</p>
    <p>{{ ok ? 'YES' : 'NO' }}</p>
    <p>{{ msg.split('').reverse().join('') }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: "Hello, Vue",
        number: 2,
        ok: true
      }
    }
  }
</script>
```

## Vue 指令
### `v-bind`
> 绑定数据到元素的属性上
>

+ **语法：**`v-bind:属性名="表达式"`
+ **缩写：**`:属性名="表达式"`
+ **动态参数：**`:[属性名]="表达式"`
+ **使用动态参数时的注意事项：**
    1. 参数属性名，可以是一个变量，也可以是一个表达式
    2. 定义的参数属性名，必须小写
    3. 如果是一个变量，预期得到的值是一个字符串，任何其它非字符串类型的值都会触发一个警告
    4. 如果是一个表达式，应避免使用空格和引号等特殊字符，否则会触发一个编译警告，例如：`<a v-bind:['foo' + bar]="value"> ... </a>`
+ **注意：** 属性名必须是合法的 HTML 特性名，不能包含空格、大写字母、数字、连字符、点号等特殊字符。

```vue
<template>
  <a :href="url">我是a标签</a>
  <img :src="imgSrc">
</template>

<script>
  export default {
    data() {
      return {
        url: 'www.baidu.com',
        imgSrc: 'https://www.itheima.com/images/logo.png'
      }
    }
  }
</script>
```

#### .sync 修饰符
> 对 prop 实现双向数据绑定
>

+ **注意：** 带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用 ，例如 `:title.sync="doc.title + '!'"` 是无效的，类似 `v-model`

```vue
<text-document :title.sync="doc.title"></text-document>

<!-- 等价于 -->
<text-document
  :title="doc.title"
  @update:title="doc.title = $event"
></text-document>

<!-- 可以使用一个对象，.sync 同时对多个 prop 进行修饰 -->
<!-- 注意：v-bind.sync 绑定的值，不能是一个字面量的对象，例如 v-bind.sync="{ title: doc.title }"，这样是无法正常工作的 -->
<text-document v-bind.sync="doc"></text-document>
```

### `v-on`
> 绑定事件监听器
>

+ **语法：**`v-on:事件名="函数名"`
+ **缩写：**`@事件名="函数名"`
+ **动态参数：**`@:[事件名]="函数名"`
+ **使用动态参数时的注意事项：请结合** [**v-bind**](#GakWA)
+ **常用事件名：**
    - `click` - 鼠标点击
    - `mousedown` - 鼠标按下
    - `mouseup` - 鼠标松开
    - `mousemove` - 鼠标移动
    - `mouseover` - 鼠标移入
    - `mouseout` - 鼠标移出
    - `keyup` - 键盘松开
    - `keydown` - 键盘按下
    - `keypress` - 键盘按下并输入
    - `submit` - 表单提交
    - `focus` - 元素获得焦点
    - `blur` - 元素失去焦点
    - `change` - 元素值改变
    - `input` - 元素值输入
    - `contextmenu` - 右键菜单

```vue
<template>
  <div>
    <!-- 完整语法 -->
    <a v-on:click="handleClick">...</a>

    <!-- 缩写 -->
    <a @click="handleClick">...</a>

    <!-- 动态参数的缩写 (2.6.0+) -->
    <a @[event]="handleClick"> ... </a>

    <!-- 模板中访问原生事件对象 $event -->
    <button @click="warn('Form cannot be submitted yet.', $event)"></button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        event: 'click'
      }
    },
    methods: {
      handleClick() {
        // ...
      },
      warn: function (message, event) {
        // 现在我们可以访问原生事件对象
        if (event) {
          event.preventDefault()
        }
        alert(message)
      }
    }
  }
</script>
```

#### 事件修饰符
> 可以对事件进行一些特殊的处理
>

+ **语法：**`@:事件名.修饰符="函数名"`
+ **说明：** 修饰符可以使用多个，用点号隔开
+ **常用事件修饰符：**
    - `.stop` - 阻止事件冒泡
    - `.prevent` - 阻止默认行为
    - `.capture` - 捕获事件
    - `.self` - 只当事件在该元素本身（自身）触发时触发
    - `.once` - 事件只触发一次
    - `.passive`  滚动事件的默认行为立即生效，不会等待事件回调执行完毕
    - `.native` - 监听组件根元素的原生事件
+ **常用按键修饰符**
    - `.enter` - 回车键
    - `.tab` - Tab 键
    - `.delete` - 删除键
    - `.esc` - Esc 键
    - `.space` - 空格键
    - `.up` - 上方向键
    - `.down` - 下方向键
    - `.left` - 左方向键
    - `.right` - 右方向键
    - `.ctrl` - Ctrl 键
    - `.alt` - Alt 键
    - `.shift` - Shift 键

:::info
**Tips：**

+ 可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名：`Vue.config.keyCodes.f1 = 112`，然后通过 `@keyup.f1` 进行使用
+ **鼠标按键修饰符：**`.left`、`.right`、`.middle`

:::

```vue
<template>
  <form @submit.prevent="onSubmit">...</form>

  <!-- .exact 修饰符，2.5.0 新增，用于精确匹配 -->
  <!-- 有且只有 Ctrl 被按下的时候才触发 -->
  <button @click.ctrl.exact="onCtrlClick">A</button>

  <!-- 没有任何系统修饰符被按下的时候才触发 -->
  <button @click.exact="onClick">A</button>
</template>

<script>
  export default {
    methods: {
      onSubmit() {
        // ...
      }
    }
  }
</script>
```

#### 将原生事件绑定到组件
+ `v-on` 的 `.native` 修饰符可以监听一个组件**根元素**上的一个原生事件，`<base-input @focus.native="onFocus"></base-input>`
+ 有时可能达不到想要的效果，可以参考以下案例：

```vue
<template>
  <label>
    {{ label }}
    <input
        v-bind="$attrs"
        :value="value"
        v-on="inputListeners"
    >
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputListeners() {
      // this.$listeners - 表示父组件传递给子组件的事件监听器对象
      return Object.assign({}, this.$listeners,
        // 自定义事件监听器对象
        {
        // 这里确保组件配合 v-model 指令使用时，input 事件能触发自定义事件
        input: e => {
          this.$emit('input', e.target.value);
        }
      });
    }
  }
}
</script>
```

### `v-text` 和 `v-html`
> 将数据绑定到元素的文本内容或 HTML 内容
>

+ **语法：**
    - `v-text="表达式"`
    - `v-html="表达式"`
+ **区别：**`v-html`会解析`HTML`标签
+ **注意：**
    - 这两个指令都会覆盖标签中的内容
    - `v-html` 指令的内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译

```vue
<template>
  <div>
    <!-- 更新元素的 textContent -->
    <span v-text="msg"></span>
    <!-- 和下面的一样 -->
    <span>{{msg}}</span>

    <!-- 更新元素的 innerHTML -->
    <div v-html="html"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '我是一段文本',
        html: "<span>我是一个span标签</span>"
      }
    }
  }
</script>
```

### `v-show` 和 `v-if`
> 控制元素的显示和隐藏
>

+ **语法：**
    - `v-show="表达式"`
    - `v-if="表达式"`
+ **原理：**
    - `v-show` 是通过 CSS 属性 `display` 来控制元素的显示和隐藏，不管符不符合判断条件都会被渲染，有更高的初始渲染开销，频繁切换显示状态时使用
    - `v-if` 是对元素的销毁和重建，有更高的切换开销，可结合 `v-else` 使用，是真正的条件渲染，也是惰性的，如果初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。
+ **注意：**
    - `v-show` 不支持 `<template>` 元素，也不支持 `v-else`
    - 由于 Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头渲染，因此可以[用 **key** 管理可复用的元素](https://v2.cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)
    - **不推荐**同时使用 `v-if` 和 `v-for`，因为 `v-for` 比 `v-if` 的优先级高，就会导致每次渲染列表项时，都会进行条件判断，影响性能

```vue
<template>
  <div>
    <p v-show="isOk">v-show 现在你看到我了</p>
    <p v-if="seen">v-if 现在你看到我了</p>

    <div>
      <p v-if="age > 18">我成年了</p>
      <p v-else>我未成年</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isOk: true,
        seen: true,
        age: 15
      }
    }
  }
</script>
```

### `v-for`
> 循环遍历数组或对象，并对数组或对象的每一项进行渲染。
>

+ **语法：**`v-for="(item, index) in items"`
    - `item` - 当前项的值
    - `index` - 当前项的索引（可选）
    - `items` - 要循环的数组或对象
+ **可遍历结构：** 数组、对象、字符串、数字、Set、Map、可迭代对象（如：arguments、NodeList、HTMLCollection）
+ **说明：** 可以使用 `of` 替代 `in` 作为分隔符
+ **注意：**
    - 建议使用 `v-for` 指令时，绑定一个 `:key` 属性，来提高渲染性能，不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`，请用字符串或数值类型的值。
    - 由于 JavaScript 的限制，Vue 不能检测数组和对象的变化，Vue 对一些方法进行了包装，使用这些变更方法可以触发视图的更新
    - **不推荐**同时使用 `v-if` 和 `v-for`，因为 `v-for` 比 `v-if` 的优先级高，就会导致每次渲染列表项时，都会进行条件判断，影响性能
+ **变更方法：**
    - `push()` - 添加新项到数组末尾
    - `pop()` - 删除数组末尾项
    - `shift()` - 删除数组首项
    - `unshift()` - 添加新项到数组首部
    - `splice()` - 在数组中插入或删除项
    - `sort()` - 对数组进行排序
    - `reverse()` - 反转数组

```vue
<!-- 遍历数组 -->
<div v-for="(item, index) in items"></div>

<!-- 遍历对象：是按 Object.keys() 的结果进行遍历 -->
<div v-for="(val, key, index) in object"></div>

<!-- 遍历整数：值从 1 开始遍历 -->
<div v-for="(n, index) in 10"></div>
```

### `v-model`
> 双向绑定数据，将表单输入的数据绑定到数据模型上，实现数据的双向绑定。
>

+ **语法：**`v-model="Vue实例属性"`
+ **注意：**
    - `v-model` 只能用在表单元素上，如 `input`、`textarea`、`select` 等。
    - `text` 和 `textarea` 元素使用 `value` 属性绑定数据，使用 `input` 事件监听数据变化。
    - `checkbox` 和 `radio` 元素使用 `checked` 属性绑定数据，使用 `change` 事件监听数据变化
    - `select` 元素使用 `value` 属性绑定数据，使用 `change` 事件监听数据变化。

```vue
<template>
  <div>
    <!-- 文本框 -->
    <input v-model="message" placeholder="edit me">
    
    <!-- 文本域 -->
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
    
    <!-- 单个复选框，绑定到布尔值 -->
    <input type="checkbox" id="checkbox" v-model="checked">
    <!-- 多个复选框，绑定到同一个数组 -->
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">

    <!-- 单选框 -->
    <input type="radio" id="one" value="One" v-model="picked">
    <input type="radio" id="two" value="Two" v-model="picked">

    <!-- 下拉选择框（单选） -->
    <!-- 提示：如果 v-model 表达式的初始值未能匹配任何选项，iOS 将不会触发 change 事件。
      因此，推荐下面这样提供一个值为空的禁用选项 -->
    <select v-model="selected">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <!-- 下拉选择框（多选），绑定到一个数组 -->
    <select v-model="selected2" multiple style="width: 50px;">
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        checked: false,
        checkedNames: [],
        picked: '',
        selected: '',
        selected2: []
      }
    }
  }
</script>
```

#### `v-model` 修饰符
+ **语法：**`v-model.修饰符="Vue实例属性"`
+ **修饰符：**
    - `.lazy` - 仅在输入框失去焦点时更新数据
    - `.number` - 将输入字符串转为数值类型，如果输入值无法被 parseFloat() 解析，则会返回原始的值
    - `.trim` - 自动过滤输入首尾的空格

```vue
<template>
  <div>
    <div>
      <span>年龄:</span>
      <input type="text" v-model.number="age">
    </div>
    <div>
      <span>人生格言:</span>
      <input type="text" v-model.trim="motto">
    </div>
    <div>
      <span>自我介绍:</span>
      <textarea v-model.lazy="intro"></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        age: "",
        motto: "",
        intro: ""
      }
    }
  }
</script>
```

#### 在组件上使用 v-model
> v-model 其实是一种语法糖，通过绑定值和监听事件来实现双向数据绑定
>

+ **说明：**`v-model` 默认会绑定一个名为 `value` 的 prop 和一个名为 `input` 的事件，可以通过 `model` 选项进行修改

```vue
<template>
  <custom-input v-model="searchText"></custom-input>
  <!-- 等价于 -->
  <custom-input :value="searchText" @input="searchText = $event"></custom-input>
</template>

<script>
export default {
  components: {
    CustomInput: {
      // model: {
      //   prop: 'checked',
      //   event: 'change'
      // },
      props: ['value'],
      template: `
        <input
            :value="value"
            @input="$emit('input', $event.target.value)"
        >
      `
    }
  },
  data() {
    return {
      searchText: ''
    }
  }
}
</script>
```

### v-slot
> 定义一个插槽，并将其内容替换为组件模板中的相应位置。
>

#### 具名插槽
+ **语法：**`v-slot:插槽名称`
+ **缩写：**`#插槽名称`
+ **动态插槽名：**`#[dynamicSlotName]`
+ **使用动态插槽名时的注意事项：请结合** [**v-bind**](#GakWA)
+ **注意：**
    - 默认插槽会带有隐含的名字 `default`
    - `v-slot`**只能添加在 **`<template>`** 上**，只有一种例外情况：当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用

```vue
<template>
  <base-layout>
    <template #header>
      <h1>Here might be a page title</h1>
    </template>

    <template #default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </base-layout>
</template>

<script>
export default {
  components: {
    BaseLayout: {
      template: `
        <div class="container">
          <header>
            <slot name="header"></slot>
          </header>
          <main>
            <slot>默认显示内容</slot>
          </main>
          <footer>
            <slot name="footer"></slot>
          </footer>
        </div>
      `
    }
  }
}
</script>
```

#### 作用域插槽
```vue
<template>
  <div>
    <current-user>
      <!-- slotProps 为包含所有插槽 prop 的对象 -->
      <template #default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </current-user>

    <!-- 解构插槽 prop -->
    <current-user #default="{ user }">
      {{ user.lastName }}
    </current-user>
  </div>
</template>

<script>
export default {
  components: {
    CurrentUser: {
      template: `
        <div>
          <slot :user="currentUser">默认显示内容</slot>
        </div>
      `,
      data() {
        return {
          currentUser: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }
      }
    }
  }
}
</script>
```

## `Class` 绑定
+ **语法：**
    - `:class="{ '类名1': 判断条件, '类名2': 判断条件, ... }"`
    - `:class="['类名1', '类名2', { '类名3': 判断条件, ... }, ...]"`

```vue
<template>
  <div>
    <!-- 可以绑定一个返回对象的计算属性 -->
    <div :class="classObject"></div>
  
    <!-- 在数组语法中也可以使用对象语法 -->
    <div :class="[{ active: isActive }, errorClass]"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive: true,
        error: null,
        errorClass: 'text-danger',
        isActive: false
      }
    },
    computed: {
      classObject() {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal'
        }
      }
    }
  }
</script>
```

## `Style` 绑定
+ **语法：**
    - `:style="{ '样式属性1': '值1', '样式属性2': '值2', ... }"`
    - `:style="[{ '样式属性1': '值1', '样式属性2': '值2', ... }, ... ]"`

```vue
<template>
  <div>
    <!-- 对象语法 -->
    <div :style="styleObject"></div>
    
    <!-- 数组语法 -->
    <div :style="[baseStyles, overridingStyles]"></div>

    <!-- 也可以为 style 绑定的属性提供一个包含多个值的数组，常用于提供多个带前缀的值 -->
    <!-- 这样就只会渲染数组中最后一个被浏览器支持的值，如果浏览器支持不带前缀的 flexbox，那么就只会渲染 display: flex -->
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      baseStyles: {
        backgroundColor: "green",
        padding: "10px"
      },
      overridingStyles: {
        color: "blue",
        fontSize: "16px"
      }
    }
  },
  computed: {
    styleObject() {
      return {
        color: this.isActive ? "red" : "blue",
        fontSize: "20px"
      }
    }
  }
}
</script>
```

## computed - 计算属性
> 计算属性是基于数据进行的计算，依赖于其他属性，并且可以返回一个新的值。
>

+ **说明：** 计算属性是基于它们的响应式依赖进行缓存的，只有当它的依赖值发生改变时，才会重新求值

```vue
<template>
  <div>
    <span>{{ a }} + 1 = {{ aPlus }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 1
      }
    },
    computed: {
      // 仅读取
      aDouble() {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    }
  }
</script>
```

## watch - 侦听器
> 监听数据的变化，当数据变化时，自动执行相应的函数
>

```vue
<script>
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: {
          f: {
            g: 5
          }
        }
      }
    },
    watch: {
      a(val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
      },
      // 方法名
      b: 'someMethod',
      // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      c: {
        handler(val, oldVal) { /* ... */ },
        deep: true
      },
      // 该回调将会在侦听开始之后被立即调用
      d: {
        handler: 'someMethod',
        immediate: true
      },
      // 你可以传入回调数组，它们会被逐一调用
      e: [
        'handle1',
        function handle2 (val, oldVal) { /* ... */ },
        {
          handler: function handle3 (val, oldVal) { /* ... */ },
          /* ... */
        }
      ],
      // 监听一个对象中某个属性的变化
      'e.f'(val, oldVal) { /* ... */ }
    }
  }
</script>
```

## methods - 方法
> 定义一些操作数据的方法
>

```vue
<script>
  export default {
    data() {
      return {
        a: 1
      }
    },
    methods: {
      plus() {
        this.a++
      }
    }
  }
</script>
```

## component - 组件注册
> 注册组件，使其可以在其他组件中使用。
>

### 全局注册
```vue
Vue.component('my-component', {
  template: '<div>This is my component</div>'
})
```

### 局部注册
```vue
<template>
  <my-component></my-component>
</template>

<script>
export default {
  components: {
    'my-component': {
      template: '<div>This is my component</div>'
    }
  }
}
</script>
```

### 自动全局注册
```javascript
import { upperFirst, camelCase } from 'lodash'

export default {
  install(Vue) {
    const requireComponent = require.context('./', false, /\.\/(?!index\.js)(.*?)\.(vue|js)$/)

    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = upperFirst(camelCase(fileName.replace(/\.\/|\.(vue|js)/g, '')))
      Vue.component(componentName, componentConfig.default || componentConfig)
    })
  }
}
```

## filter - 过滤器
> 过滤器就是一个 **<font style="color:#DF2A3F;">函数</font>**，传入值返回处理后的值
>

### 全局注册
```javascript
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

### 局部注册
```vue
<template>
  <div>
    <!-- 在双花括号中 -->
    {{ message | capitalize }}

    <!-- 过滤器可以串联，会将每个过滤器接收到的值都传递给下一个过滤器 -->
    {{ message | filterA | filterB }}

    <!-- 可以给过滤器传递参数，在过滤器定义中，第一个参数是管道符前面的值，后面的参数依次传入 -->
    {{ message | filterA('arg1', arg2) }}

    <!-- 在 `v-bind` 中 -->
    <div :id="rawId | formatId"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello world',
      rawId: 'raw-id',
      arg2: 'arg2'
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    formatId(value) {
      return value.replace(/-/g, '_')
    },
    filterA(value, arg1, arg2) {
      return value + arg1 + arg2
    },
    filterB(value) {
      return value + 'B'
    }
  }
}
</script>
```

### 自动全局注册
```javascript
export default {
  install(Vue) {
    const requireFilter = require.context('./', false, /\.\/(?!index\.js)(.*?)\.js$/)

    requireFilter.keys().forEach(key => {
      const filterName = key.replace(/(\.\/|\.js)/g, '')
      Vue.filter(filterName, requireFilter(key).default)
    })
  }
}
```

## directive - 自定义指令
> 当需要对普通 DOM 元素进行底层操作时，可以使用 Vue 自定义指令。
>

+ **钩子函数：**
    - `bind` - 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    - `inserted` - 被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
    - `update` - 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。
+ **钩子函数参数：**
    - `el` - 指令所绑定的元素，可以用来直接操作 DOM。
    - `binding` - 一个对象，包含以下属性：
        * `name` - 指令名，不包括 `v-` 前缀。
        * `value` - 指令的绑定值，例如 `v-my-directive="1 + 1"` 中，绑定值为 2。
        * `oldValue` - 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        * `expression` - 字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
        * `arg` - 传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
        * `modifiers` - 一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
    - `vnode` - Vue 编译生成的虚拟节点。
    - `oldVnode` - 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
+ **动态指令参数：**`v-mydirective:[argument]="value"`

### 全局注册
```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el) {
    // 聚焦元素
    el.focus()
  }
})
```

### 局部注册
```vue
new Vue({
  el: '#app',
  directives: {
    // 注册一个局部自定义指令 `v-focus`
    focus: {
      // 当被绑定的元素插入到 DOM 中时……
      inserted(el) {
        // 聚焦元素
        el.focus()
      }
    }
  }
})
```

### 自动全局注册
```javascript
export default {
  install(Vue) {
    const requireDirective = require.context('./', false, /\.\/(?!index\.js)(.*?)\.js$/)

    requireDirective.keys().forEach(key => {
      const directiveName = key.replace(/(\.\/|\.js)/g, '')
      Vue.directive(directiveName, requireDirective(key).default)
    })
  }
}
```

## mixin - 混入
+ **注意：**
    1. `data`数据，`methods`方法等值为对象的选项，会被合并为同一个对象，同名则覆盖 `mixin`
    2. 生命周期钩子函数，`watch`侦听器，`mixin` 会比组件优先执行

### 全局混入
+ **注意：** 全局混入会影响到每一个组件实例，因此要谨慎使用

```javascript
const myMixin = {
  install(Vue) {
    Vue.mixin({
      created() {
        const myOption = this.$options.myOption
        if (myOption) {
          console.log(myOption) // hello!
        }
      }
    })
  }
}

Vue.use(myMixin, { myOption: 'hello!' })
```

### 局部混入
```javascript
const mixin = {
  data() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  created() {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  data() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created() {
    console.log(this.$data)
    console.log('组件钩子被调用')
  }
})

// 输出结果：
//   混入对象的钩子被调用
//   { message: 'goodbye', foo: 'abc', bar: 'def' }
//   组件钩子被调用
```

## Vue 组件通信
> vue 组件通信是 **<font style="color:#DF2A3F;">单向数据流</font>**
>

### 父向子传值 - props
+ **注意：** props 是只读的，不能直接修改 props 的值

```vue
<template>
  <!-- 传入一个对象的所有 property -->
  <blog-post v-bind="post"></blog-post>
  <!-- 等价于 -->
  <!-- <blog-post
        :id="post.id"
        :title="post.title"
    ></blog-post> -->
</template>

<script>
export default {
  components: {
    BlogPost: {
      // 数组形式的 props
      // props: ['id', 'title'],

      // 对象形式的 props
      props: {
        id: Number,
        title: String
      },
      template: '<div>This is a blog post</div>'
    }
  },
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
</script>
```

#### 定制 prop 的验证方式
+ **注意：** 这些 prop 会在一个组件实例创建之前进行验证，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。

```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  }
})
```

#### 禁用 Attribute 继承
+ **注意：**
    - 如果子组件没有定义父组件传过来的 prop，则这个属性会被当做 attribute 添加到组件的根元素上，如果恰好传入的 attribute 和一个已有的 attribute 名称相同，则会覆盖掉已有的 attribute（**`class` 和 `style` 除外**）
    - `inheritAttrs: false` 选项**不会**影响 `style` 和 **class** 的绑定

```vue
<template>
  <base-input
      label="Username:"
      v-model="username"
      required
      placeholder="Enter your username"
  ></base-input>
</template>

<script>
export default {
  components: {
    BaseInput: {
      // 组件根元素禁止继承父元素的 attribute 属性
      inheritAttrs: false,
      props: {
        label: {
          type: String,
          required: true
        },
        required: {
          type: Boolean,
          default: false
        }
      },
      // $attrs 是父组件传递给子组件的 attribute 对象
      template: `
        <label>
          {{ label }}
          <input
            v-bind="$attrs"
            :value="value"
            v-on:input="$emit('input', $event.target.value)"
          >
        </label>
      `
    }
  },
  data() {
    return {
      username: ''
    }
  }
}
</script>
```

### 子向父传值 - 事件传参
**子组件**

```vue
<template>
	<div>
  	这是子组件
    <button @click="btnFn">按钮</button>
  </div>
<template>
  
<script>
export default {
  methods: {
    btnFn() {
      this.$emit('add', 2)
    }
  }
}
</script>
```

**父组件**

```vue
<template>
	<div>
  	这是父组件
    < Son @add="addFn" />
    {{ n }}
  </div>
<template>
  
<script>
import Son from '@/components/Son'

export default {
  data() {
    return {
      n: 0
    }
  },
  methods: {
    addFn(val) {
      this.n += val
    }
  }
}
</script>
```

### EventBus - 事件总线
> 跨组件通信
>

1. **创建 EventBus**

```javascript
import Vue from 'vue'
// 导出一个 Vue 实例
export default new Vue()
```

2. **使用**

```vue
<template>
  <div>
    <h1>Hello World</h1>
    <button @click="handleClick">Click me</button>
    <SubComponent></SubComponent>
  </div>
</template>

<script>
import {EventBus} from './eventBus'

export default {
  name: 'HelloWorld',
  components: {
    SubComponent: {
      template: '<div>This is a subcomponent</div>',
      mounted() {
        // 监听事件
        EventBus.$on('my-event', (message) => {
          console.log(message)
        })
      },
      destroyed() {
        // 移除监听事件
        EventBus.$off('my-event')
      }
    }
  },
  methods: {
    handleClick() {
      // 发送带有消息的事件
      EventBus.$emit('my-event', 'Hello World')
    }
  }
}
</script>
```

### $refs - 获取子组件实例或子元素
```vue
<template>
  <base-input ref="usernameInput"></base-input>
</template>

<script>
export default {
  components: {
    BaseInput: {
      template: `<input ref="input">`,
      methods: {
        // 用来从父级组件聚焦输入框
        focus() {
          this.$refs.input.focus()
        }
      }
    }
  },
  mounted() {
    // 聚焦输入框
    this.$refs.usernameInput.focus()
  }
}
</script>
```

### $root - 根实例
```javascript
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})

// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```

### $parent - 父组件实例
```vue
<template>
  <button @click="handleClick">{{ $parent }}</button>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        console.log(this.$parent);
      }
    }
  }
</script>
```

### $children - 子组件实例（数组）
+ **注意：$children 并不保证顺序，也不是响应式的**

```vue
<template>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  mounted() {
    console.log(this.$children) // 打印出所有的子组件
  }
}
</script>
```

### `provide / inject` - 依赖注入
+ **注意：** 依赖注入这种方式提供的属性不是响应式的

`provide`

> 为后代组件提供数据或方法
>

```vue
<script>
export default {
  name: 'App',
  provide() {
    return {
      getMap: this.getMap,
      foo: 'fooValue'
    }
  }
}
</script>
```

`inject`

> 在任何后代组件中，都可以使用 `inject` 选项来接收指定的属性添加到组件实例上
>

```vue
<script>
export default {
  name: 'SonIndex',
  inject: ['getMap']

  // 可以通过设置默认值使其变成可选项
  // inject: {
  //   foo: {
  //     default: 'foo'
  //   }
  // }

  // 如果需要从一个不同名字的 property 注入，则使用 form 来表示其源 property
  // inject: {
  //   foo: {
  //     from: 'bar',
  //     default: 'foo
  //   }
  // }

  // 与 prop 的默认值类似，需要对非原始值使用一个工厂方法
  // inject: {
  //   foo: {
  //     from: 'bar',
  //     default: () => [1, 2, 3]
  //   }
  // }
}
</script>
```

## Vue 内置组件
### component - 动态组件
> 动态渲染组件
>

+ 根据 `is` 的值，来决定渲染哪个组件

```vue
<!-- 动态组件由 vm 实例的 `componentId` property 控制 -->
<component :is="componentId"></component>

<!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
<component :is="$options.components.child"></component>
```

### `keep-alive` - 缓存组件
> 缓存组件，避免频繁渲染，提高性能
>

+ **属性：**
    - `include` - 缓存的组件名，支持正则表达式
    - `exclude` - 排除缓存的组件名，支持正则表达式
    - `max` - 最大缓存数
+ **生命周期：**
    - `activated` - 组件激活时触发
    - `deactivated` - 组件失活时触发
+ **说明：**
    - `include` 和 `exclude` 匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称 (父组件 `components` 选项的键值)。匿名组件不能被匹配
    - `max` 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉
+ **注意：**`<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。

```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>

<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>

<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

### `transition` - 过渡组件
> 实现元素的进入和离开的过渡动画效果
>

#### CSS 类名
+ `v-enter` - 进入的开始状态
+ `v-enter-active` - 进入的过程状态
+ `v-enter-to` - 进入的结束状态
+ ----------------------------------
+ `v-leave` - 离开的开始状态
+ `v-leave-active` - 离开的过程状态
+ `v-leave-to` - 离开的结束状态
+ **注意：** 如果 `<transition>` 组件没有指定 `name` 属性，则 `v-` 会是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`

```vue
<template>
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
```

#### JS 钩子
+ `beforeEnter` - 进入动画开始之前的钩子函数
+ `enter` - 进入动画开始的钩子函数
+ `afterEnter` - 进入动画结束之后的钩子函数
+ `enterCancelled` - 进入动画取消的钩子函数
+ ----------------------------------------------
+ `beforeLeave` - 离开动画开始之前的钩子函数
+ `leave` - 离开动画开始的钩子函数
+ `afterLeave` - 离开动画结束之后的钩子函数
+ `leaveCancelled` - 离开动画取消的钩子函数

```vue
<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <!-- ... -->
  </transition>
</template>

<script>
export default {
  methods: {
    /* 进入中 */

    beforeEnter: function (el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
      // ...
      done()
    },
    afterEnter: function (el) {
      // ...
    },
    enterCancelled: function (el) {
      // ...
    },

    /* 离开时 */

    beforeLeave: function (el) {
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function (el, done) {
      // ...
      done()
    },
    afterLeave: function (el) {
      // ...
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
      // ...
    }
  }
}
</script>
```

## 异步组件
> 延迟加载组件，只有当组件需要被渲染时才会被加载，提高程序性能，避免首屏加载过慢
>

```vue
<!-- 全局注册 -->
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

// 局部注册
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})

// 异步组件工厂函数也可以返回一个如下格式的对象
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

## 递归组件
+ **注意：** 如果组件之间存在循环引用，在注册组件时需要使用 `webpack` 的异步 `import`，否则可能会报错，如果通过 `Vue.component` 全局注册组件时，则不需要这么做

_**TreeFolder.vue**_

```vue
<template>
  <p>
    <span>{{ folder.name }}</span>
    <tree-folder-contents :children="folder.children" />
  </p>
</template>

<script>
export default {
  name: 'TreeFolder',
  components: {
    TreeFolderContents: () => import('./TreeFolderContents.vue')
  },
  props: {
    folder: {
      type: Object,
      required: true
    }
  }
}
</script>
```

_**TreeFolderContents.vue**_

```vue
<template>
  <ul>
    <li v-for="child in children" :key="child.id">
      <tree-folder v-if="child.children" :folder="child" />
      <span v-else>{{ child.name }}</span>
    </li>
  </ul>
</template>

<script>
import TreeFolder from './TreeFolder.vue'

export default {
  name: 'TreeFolderContents',
  components: {
    TreeFolder
  },
  props: {
    children: {
      type: Array,
      required: true
    }
  }
}
</script>
```

## 渲染函数
> 渲染函数是 Vue 中的一种高级特性，它允许开发者直接操作 DOM 元素，而不是依赖于模板语法。渲染函数可以更灵活地处理复杂的渲染逻辑，并且可以与 Vue 的响应式系统更好地集成。
>

```javascript
Vue.component('my-component', {
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: {
          id: 'foo'
        }
      },
      [
        createElement('h1', 'hello world'),
        createElement('p', 'some text content')
      ]
    )
  }
})

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  render(createElement) {
    return createElement('my-component')
  }
})
```

**createElement 参数**

```javascript
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中 attribute 对应的数据对象。可选。
  {
    // 与 `v-bind:class` 的 API 相同，
    // 接受一个字符串、对象或字符串和对象组成的数组
    'class': {
      foo: true,
      bar: false
    },
    // 与 `v-bind:style` 的 API 相同，
    // 接受一个字符串、对象，或对象组成的数组
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 普通的 HTML attribute
    attrs: {
      id: 'foo'
    },
    // 组件 prop
    props: {
      myProp: 'bar'
    },
    // DOM property
    domProps: {
      innerHTML: 'baz'
    },
    // 事件监听器在 `on` 内，
    // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
    // 需要在处理函数中手动检查 keyCode。
    on: {
      click: this.clickHandler
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用
    // `vm.$emit` 触发的事件。
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已经自动为你进行了同步。
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    // 作用域插槽的格式为
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    // 其它特殊顶层 property
    key: 'myKey',
    ref: 'myRef',
    // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
    // 那么 `$refs.myRef` 会变成一个数组。
    refInFor: true
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

## JSX
+ **更多详细内容请查看：**[https://github.com/vuejs/jsx-vue2](https://github.com/vuejs/jsx-vue2)
1. **安装依赖**

```shell
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props --save
```

2. **配置 Babel**

_**.babelrc**_

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@vue/babel-preset-jsx',
      {
        'injectH': false
      }]
  ]
}
```

3. **使用**

```jsx
import AnchoredHeading from './AnchoredHeading.vue'

new Vue({
  el: '#demo',
  render: function (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})
```

## 风格指南
### 组件的 data 必须是一个函数
```vue
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}
```

### Prop 定义应该尽量详细
```vue
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

### 总是用 key 配合 v-for
```vue
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

### 永远不要把 v-if 和 v-for 同时用在同一个元素上
```vue
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

### 为组件样式设置作用域
+ `scoped` 属性的作用原理：在编译过程中，Vue 会给每个组件的样式添加一个 `data-v-哈希值` 的标识符，然后通过选择器加上这个标识符，这样就实现了只对当前组件的样式生效，防止样式冲突

```vue
<template>
  <button class="button button-close">X</button>
</template>

<!-- 使用 `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

### 私有 property 名
```javascript
var greatMixin = {
  // ...
  methods: {
    publicMethod() {
      // ...
      privateFunction()
    }
  }
}

function privateFunction() {
  // ...
}

export default greatMixin
```

## 常用 API
### [vm.$el](https://v2.cn.vuejs.org/v2/api/#vm-el)
> Vue 实例使用的根 DOM 元素
>

```vue
<template>
  <div class="home">Home组件</div>
</template>

<script>
export default {
  name: 'HomeView',
  mounted() {
    console.log(this.$el) // 打印组件的根元素
  }
}
</script>
```

### [vm.$attrs](https://v2.cn.vuejs.org/v2/api/#vm-attrs)
> 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)
>

```vue
<template>
  <CustomView color="red" />
</template>

<script>
import CustomView from './CustomView.vue'

export default {
  name: 'HomeView',
  components: {
    CustomView
  }
}
</script>
```

```vue
<template>
  <div class="custom">
    <div v-bind="$attrs">这是attribute</div>
  </div>
</template>

<script>
export default {
  name: 'CustomView',
  inheritAttrs: false, // 禁用继承父属性，通常会搭配 v-bind="$attrs" 使用
  created() {
    console.log(this.$attrs) // {color: 'red'}
  }
}
</script>

<style lang="scss" scoped></style>
```

### [vm.$listeners](https://v2.cn.vuejs.org/v2/api/#vm-listeners)
> 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器
>

```vue
<template>
  <CustomView @click="handelClick" />
</template>

<script>
import CustomView from './CustomView.vue'

export default {
  name: 'HomeView',
  components: {
    CustomView
  },
  methods: {
    handelClick() {
      console.log('clicked')
    }
  }
}
</script>
```

```vue
<template>
  <div class="custom">
    <div>我不是按钮</div>
    <div v-on="$listeners">这是个按钮</div>
  </div>
</template>

<script>
export default {
  name: 'CustomView',
  created() {
    console.log(this.$listeners) // {click: ƒ}
  }
}
</script>

<style lang="scss" scoped></style>
```

### [vm.$watch](https://v2.cn.vuejs.org/v2/api/#vm-watch)
+ **注意：** 在变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。

```javascript
// 键路径
vm.$watch('a.b.c', function (newVal, oldVal) {
  // 做点什么
})

// 函数
vm.$watch(
  function () {
    // 表达式 `this.a + this.b` 每次得出一个不同的结果时
    // 处理函数都会被调用。
    // 这就像监听一个未被定义的计算属性
    return this.a + this.b
  },
  function (newVal, oldVal) {
    // 做点什么
  }
)

// vm.$watch 返回一个取消观察函数，用来停止触发回调：
var unwatch = vm.$watch('a', cb)
// 之后取消观察
unwatch()

// - deep: true 深度监听。注意监听数组的变更不需要这么做。
vm.$watch('someObject', callback, {
  deep: true
})
vm.someObject.nestedValue = 123 // 回调被触发

// - immediate: true 立即以表达式的当前值触发回调
vm.$watch('a', callback, {
  immediate: true // 立即以 `a` 的当前值触发回调
})

// 注意在带有 immediate 选项时，你不能在第一次回调时取消侦听给定的 property
// 如果你仍然希望在回调内部调用一个取消侦听的函数，你应该先检查其函数的可用性：
var unwatch = vm.$watch(
  'value',
  function () {
    doSomething()
    if (unwatch) {
      unwatch()
    }
  },
  { immediate: true }
)
```

### [vm.$set](https://v2.cn.vuejs.org/v2/api/#vm-set)
> 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
>

+ **注意：** 对象不能是 Vue 实例，或者 Vue 实例的根数据对象

```vue
<template>
  <div>
    <h1>{{ deepData.nestedData.superNestedData.ultraNestedData }}</h1>
    <button @change="changeData">变更</button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      deepData: {
        nestedData: {
          superNestedData: {
            ultraNestedData: 'Hello World'
          }
        }
      }
    }
  },
  methods: {
    changeData() {
      this.$set(this.deepData.nestedData.superNestedData, 'ultraNestedData', 'Goodbye World')
    }
  }
}
</script>
```

### [vm.$delete](https://v2.cn.vuejs.org/v2/api/#vm-delete)
> 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。
>

```javascript
vm.$delete(vm.list, index)

vm.$delete(vm.obj, 'key')
```

### [vm.$on](https://v2.cn.vuejs.org/v2/api/#vm-on)
> 监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。
>

```javascript
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi') // => "hi"
```

### [vm.$off](https://v2.cn.vuejs.org/v2/api/#vm-off)
> 移除自定义事件监听器
>

+ 如果没有提供参数，则移除所有的事件监听器
+ 如果只提供了事件，则移除该事件所有的监听器
+ 如果同时提供了事件与回调，则只移除这个回调的监听器

```javascript
// 移除'test'事件的所有监听器
vm.$off('test')

// 移除'test'事件的指定监听器
vm.$off('test', callback)

// 移除多个事件的监听器
vm.$off(['test1', 'test2'])

// 移除所有事件的所有监听器
vm.$off()
```

### [vm.$emit](https://v2.cn.vuejs.org/v2/api/#vm-emit)
> 触发当前实例上的事件
>

```vue
<template>
  <button @click="$emit('welcome')">
    Click me to be welcomed
  </button>
</template>

<script>
export default {
  name: 'WelcomeButton'
}
</script>
```

```vue
<template>
  <div class="emit-example-simple">
    <welcome-button @welcome="sayHi"></welcome-button>
  </div>
</template>

<script>
import WelcomeButton from "./WelcomeButton.vue"
export default {
  name: "EmitExampleSimple",
  components: {
    WelcomeButton
  },
  methods: {
    sayHi() {
      console.log("Hi!")
    }
  }
}
</script>
```

### [vm.$nextTick](https://v2.cn.vuejs.org/v2/api/#vm-nextTick)
> 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
>

```javascript
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // 修改数据
      this.message = 'changed'
      // DOM 还没有更新
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }
})
```

