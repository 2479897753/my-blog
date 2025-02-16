+ **功能：** 在父组件点击按钮将对应文本内容传递给iframe，iframe接收到数据，然后将该数据插入到表单光标的所在位置，点击保存将表单数据传递给父组件使用

### 可以修改源代码
> `**window.postMessage**`事件发送消息，监听消息事件`**message**`
>

**8080项目**

```vue
<template>
  <div id="app">
    <iframe ref="iframeDom" width="600px" height="400px" src="http://localhost:8081/" frameborder="0"></iframe>
    <div>
      <div v-for="item in textData">
        <span>{{ item }}</span>
        <button @click="insert(item)">插入</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      textData: ['one', 'two', 'three'], // 文本数据
    }
  },
  mounted() {
    window.addEventListener('message', e => {
      const data = e.data
      // 判断消息类型
      if (data.type === 'save') {
        console.log(data.data)
      }
    })
  },
  methods: {
    insert(item) {
      // 获取iframe的Window对象
      const iframeWindow = this.$refs.iframeDom.contentWindow
      // 向iframe中传递数据
      iframeWindow.postMessage({ type: 'insert', data: item }, '*')
    }
  }
}
</script>

<style scoped lang="scss"></style>
```

**8081项目**

```vue
<template>
  <div id="app">
    <textarea class="textarea" v-model="text" @blur="onblur"></textarea>
    <button @click="save">保存</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      text: '', // 文本内容
      cursor: 0 // 光标所在位置
    }
  },
  mounted() {
    // 监听消息
    window.addEventListener('message', e => {
      const data = e.data
      // 判断消息类型
      if (data.type === 'insert') {
        // 将文本内容插入到光标所在位置
        this.text = this.text.slice(0, this.cursor) + data.data + this.text.slice(this.cursor)
      }
    })
  },
  methods: {
    onblur(e) {
      // 失去焦点获取光标所在位置
      this.cursor = e.target.selectionStart
    },
    save() {
      window.parent.postMessage({ type: 'save', data: this.text }, '*')
    }
  }
}
</script>

<style scoped lang="scss"></style>
```

### 不能修改源代码
> 同源状态下，获取`**iframe**`的DOM，然后操作DOM
>

**8080项目**

```vue
<template>
  <div id="app">
    <iframe ref="iframeDom" width="600px" height="400px" src="http://localhost:8081/" frameborder="0"></iframe>
    <div>
      <div v-for="item in textData">
        <span>{{ item }}</span>
        <button @click="insert(item)">插入</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      textData: ['one', 'two', 'three'], // 文本数据
    }
  },
  mounted() {
    const iframe = this.$refs.iframeDom
   
    iframe.addEventListener('load', () => {
      // 获取iframe的DOM对象
      const iframeDom = iframe.contentDocument
      // 获取textarea的DOM对象
      const textareaDom = iframeDom.querySelector('.textarea')
      textareaDom.addEventListener('blur', e => {
        textareaDom.setAttribute('data-cursor', e.target.selectionStart)
      })
    })
  },
  methods: {
    insert(item) {
      // 获取iframe的DOM对象
      const iframeDom = this.$refs.iframeDom.contentDocument
      // 获取textarea的DOM对象
      const textareaDom = iframeDom.querySelector('.textarea')
      // 获取textarea中的值
      const textareaValue = textareaDom.value
      // 获取光标位置
      const cursor = textareaDom.getAttribute('data-cursor')
      // 插入文本
      textareaDom.value = textareaValue.substring(0, cursor) + item + textareaValue.substring(cursor)
    }
  }
}
</script>

<style scoped lang="scss"></style>
```

**8081项目**

```vue
<template>
  <div id="app">
    <textarea class="textarea"></textarea>
    <button>保存</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
```

