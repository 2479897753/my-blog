## Ant Design Vue 组件封装
### Upload 上传
```vue
<template>
  <div class="upload-file">
    <a-form :form="form">
      <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }" label="上传需求文档">
        <div style="display: flex; justify-content: space-between;  align-items: center;">
          <a-upload
            v-decorator="[
              'uploadFile',
              {
                rules: [{ required: true, message: '请上传需求文档' }]
              }
            ]"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :customRequest="upload"
          >
            <a-button type="primary"> <a-icon type="upload" />上传文件</a-button>
          </a-upload>
          <a-button type="primary" ghost> <a-icon type="download" />下载模板</a-button>
        </div>

        <div style="line-height: 20px; margin-bottom: 16px;">
          支持扩展名: .rar .zip .doc .docx .pdf
        </div>

        <a-table
          style="margin-bottom: 10px;"
          :columns="columns"
          :data-source="data"
          :pagination="false"
        >
          <span style="color: #4484f6;" slot="attachmentName" slot-scope="text">
            {{ text }}
          </span>
          <span slot="operation" slot-scope="text, record">
            <a style="color: #f64444;" href="javascript:;" @click="del(record)">删除</a>
          </span>
        </a-table>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 10, offset: 2 }">
        <a-button type="primary" @click="submit">提交</a-button>
        <a-button style="margin-left: 14px;" @click="cancel">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'form' }),
      columns: [
        {
          dataIndex: 'serialNumber',
          title: '序号',
          width: '12%',
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          dataIndex: 'attachmentName',
          title: '附件名称',
          scopedSlots: { customRender: 'attachmentName' }
        },
        {
          dataIndex: 'operation',
          title: '操作',
          width: '22%',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      // data: [{ id: 1, attachmentName: 'xxxxxxxxx.pdf' }, ...],
      data: [
        {
          id: 1,
          attachmentName: '附件名称1'
        },
        {
          id: 2,
          attachmentName: '附件名称2'
        },
        {
          id: 3,
          attachmentName: '附件名称3'
        }
      ],
      fileList: []
    }
  },
  methods: {
    beforeUpload(file) {
      const fileTypes = ['rar', 'zip', 'doc', 'docx', 'pdf']
      const fileType = file.name.split('.')[1]
      if (!fileTypes.includes(fileType)) {
        this.$message.error('只支持上传扩展名为: .rar、.zip、.doc、.docx、.pdf 的文件!')
        return false
      }
      const fileSize = file.size / 1024 / 1024 < 20
      if (!fileSize) {
        this.$message.error('文件大小不能超过20MB!')
        return false
      }
    },
    async upload(data) {
      const file = {}
      file.fileName = data.file.name
      file.fileUid = data.file.uid
      const formData = new FormData()
      formData.append('file', data.file)

      // 这里调用接口将 formData 对象传递给后端，后端将返回一个 url 字符串，前端进行缓存，用于表单提交

      // 这里的 res.fileUrl 是后端返回的文件 url 地址
      file.fileUrl = res.fileUrl
      this.fileList.push(file)
      this.form.setFieldsValue({
        uploadFile: this.fileList
      })
    },
    // 获取所有值
    getValues() {
      return new Promise(resolve => {
        this.form.validateFields(err => {
          if (!err) {
            let data = this.form.getFieldsValue()
            resolve(data)
          }
        })
      })
    },
    // 重置所有值
    resetValues() {
      this.form.resetFields()
      this.fileList = []
    },
    async submit() {
      const data = await this.getValues()

      // 这里调用接口将表单数据提交给后端
    },
    cancel() {
      this.resetValues()
      // 接下来关闭弹窗或者返回页面
    },
    del(row) {
      console.log('row', row)
    }
  }
}
</script>

<style scoped lang="less"></style>
```

### Pagination 分页
```vue
<template>
  <div class="pagination">
    <a
      @click="prev()"
      href="javascript:;"
      class="iconfont icon-left"
      :class="{ disabled: index === 1 }"
    ></a>
    <a
      @click="clickPageNum(1)"
      href="javascript:;"
      :class="{ active: index === 1 }"
    >1</a>
    <a href="javascript:;" v-if="index > 3" @click="prevJump">...</a>
    <a
      @click="clickPageNum(item)"
      href="javascript:;"
      :class="{ active: index === item }"
      v-for="item in pagers"
      :key="item"
    >{{ item }}</a>
    <a href="javascript:;" v-if="(index < pages - 2) || pagers.join(',') === '2,3,4'" @click="nextJump">...</a>
    <a
      v-if="pages !== 1"
      @click="clickPageNum(pages)"
      href="javascript:;"
      :class="{ active: index === pages }"
    >{{ pages }}</a>
    <a
      @click="next()"
      href="javascript:;"
      class="iconfont icon-right"
      :class="{ disabled: index === pages }"
    ></a>
  </div>
</template>

<script>
import '../font/iconfont.css'

export default {
  name: 'NumPagination',
  props: {
    // 当前页码
    pageIndex: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 8
    },
    // 总数
    total: {
      type: Number,
      default: 56
    }
  },
  data() {
    return {
      index: this.pageIndex, // 当前页码
    }
  },
  computed: {
    // 总页数
    pages() {
      return Math.ceil(this.total / this.pageSize) || 1
    },
    // 页码数组
    pagers() {
      const result = []
      // 总页码小于等于5；大于5
      if (this.pages <= 5) {
        // 总页码小于等于5的情况
        for (let i = 2; i < this.pages; i++) {
          result.push(i)
        }
      } else {
        // 总页码大于5
        if (this.index < 4) {
          // 左侧临界值
          for (let i = 2; i < 5; i++) {
            result.push(i)
          }
        } else if (this.index >= this.pages - 2) {
          // 右侧临界值
          for (let i = this.pages - 3; i < this.pages; i++) {
            result.push(i)
          }
        } else {
          // 中间的状态
          for (let i = this.index - 1; i <= this.index + 1; i++) {
            result.push(i)
          }
        }
      }
      return result
    }
  },
  methods: {
    prev() {
      if (this.index > 1) {
        this.clickPageNum(this.index - 1)
      } else {
        this.$message.warning({ message: '已是首页' })
      }
    },
    next() {
      if (this.index < this.pages) {
        this.clickPageNum(this.index + 1)
      } else {
        this.$message.warning({ message: '已是最后一页' })
      }
    },
    prevJump () {
      this.clickPageNum(this.index - 3)
    },
    nextJump() {
      this.clickPageNum(this.index + 3)
    },
    clickPageNum(page) {
      if (this.index != page) {
        this.index = page
        // 父组件通过change方法获取当前页码
        this.$emit('change', this.index)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 8px;
    color: #c1cbd7;

    &:hover {
      color: #5c9cf3;
    }

    &.active {
      background: #5c9cf3;
      color: #fff;
      border-color: aliceblue;
    }

    &.disabled {
      cursor: not-allowed;
      color: #c1cbd7;
    }
  }
}
</style>
```

### Modal 对话框
1. **封装组件**

_**Modal.vue**_

```vue
<script setup>
defineOptions({
  name: 'ModalIndex',
  inheritAttrs: false
})

defineProps({
  open: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '提示'
  },
  cancelText: {
    type: String,
    default: '取 消'
  },
  okText: {
    type: String,
    default: '确 定'
  },
  width: {
    type: String,
    default: '520px'
  }
})

const emit = defineEmits(['update:open', 'ok', 'cancel'])

const onCancel = () => {
  emit('update:open', false)
  emit('cancel')
}

const onOk = (e) => {
  emit('ok', e)
}
</script>

<template>
  <div class="modal-root" :style="{ display: open ? 'block' : 'none' }">
    <div class="modal-mask"></div>
    <div class="modal-wrap">
      <div class="modal" :style="{ width }">
        <div class="modal-content">
          <button class="modal-close" @click="onCancel">
            <span class="modal-close-x">
              <span class="modal-close-icon">
                <svg
                  focusable="false"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  fill-rule="evenodd"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
                  ></path>
                </svg>
              </span>
            </span>
          </button>
          <div class="modal-header">
            <div class="modal-title">{{ title }}</div>
          </div>
          <div class="modal-body">
            <slot>{{ content }}</slot>
          </div>
          <div class="modal-footer">
            <button class="btn btn-default" @click="onCancel">
              <span>{{ cancelText }}</span>
            </button>
            <button class="btn btn-primary" @click="onOk">
              <span>{{ okText }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';

  .modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    inset-inline-start: 0;
    inset-inline-end: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 1000;
  }

  .modal-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    inset-inline-start: 0;
    inset-inline-end: 0;
    overflow: auto;
    outline: 0;
    inset: 0;
    z-index: 1000;
  }
}

.modal {
  margin: 0 auto;
  padding: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1.5714;
  list-style: none;
  pointer-events: none;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-width: calc(100vw - 32px);

  .modal-content {
    position: relative;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 0;
    border-radius: 8px;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    pointer-events: auto;
    padding: 20px 24px;
  }

  .modal-close {
    position: absolute;
    top: 17px;
    inset-inline-end: 17px;
    z-index: 1010;
    padding: 0;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    background: transparent;
    width: 22px;
    height: 22px;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;
  }

  .modal-close-x {
    display: block;
    font-size: 16px;
    font-style: normal;
    line-height: 22px;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
    border-radius: 4px;

    &:hover {
      color: rgba(0, 0, 0, 0.88);
      background-color: rgba(0, 0, 0, 0.06);
      text-decoration: none;
    }
  }

  .modal-header {
    color: rgba(0, 0, 0, 0.88);
    background: #ffffff;
    border-radius: 8px 8px 0 0;
    margin-bottom: 8px;
  }

  .modal-title {
    margin: 0;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .modal-body {
    font-size: 14px;
    line-height: 1.5714;
    word-wrap: break-word;
  }

  .modal-footer {
    text-align: end;
    background: transparent;
    margin-top: 12px;

    .btn + .btn {
      margin-bottom: 0;
      margin-inline-start: 8px;
    }
  }
}

.modal-close-icon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btn {
  font-size: 14px;
  height: 32px;
  padding: 4px 15px;
  outline: none;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  line-height: 1.5714;
  color: rgba(0, 0, 0, 0.88);
}

.btn-default {
  background-color: #ffffff;
  border-color: #d9d9d9;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);

  &:hover {
    color: #4096ff;
    border-color: #4096ff;
  }

  &:active {
    color: #0958d9;
    border-color: #0958d9;
  }
}

.btn-primary {
  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);

  &:hover {
    color: #fff;
    background-color: #4096ff;
  }

  &:active {
    color: #fff;
    background-color: #0958d9;
  }
}
</style>
```

_**modal.js**_

```javascript
import ModalVue from '@/components/Modal.vue'
import { createApp } from 'vue'

function useModal() {
  const modal = {
    confirm(config) {
      const div = document.createElement('div')
      document.body.appendChild(div)
      
      const { title, content, cancelText, okText, width, onOk, onCancel } = config
      const app = createApp(ModalVue, {
        open: true,
        content,
        title,
        cancelText,
        okText,
        width,
        onOk: () => {
          onOk && onOk()
          app.unmount(div)
          div.remove()
        },
        onCancel: () => {
          onCancel && onCancel()
          app.unmount(div)
          div.remove()
        }
      })
      app.mount(div)
    }
  }

  return [modal]
}

export const Modal = { useModal }
```

2. **使用组件**

```vue
<script setup>
import { Modal } from '@/hooks'

const [modal] = Modal.useModal()

const showModal = () => {
  modal.confirm({
    title: '自定义',
    content: '内容',
    onOk: () => {
      console.log('ok')
    },
    onCancel: () => {
      console.log('cancel')
    }
  })
}
</script>

<template>
  <div>
    <button @click="showModal">弹 窗</button>
  </div>
</template>

<style scoped></style>
```

## Element 组件封装
### DatePicker 日期选择器 - <font style="color:#DF2A3F;">待完成</font>
```vue
<template>
  <div class="date-picker">
    <div class="date-picker__input" @click.stop="handleClick">
      <input v-model="date" type="text" readonly />
      <i class="el-icon-date"></i>
    </div>
    <div v-show="panelVisible" ref="panel" class="date-picker-panel">
      <div class="date-picker-panel__header">我是头部</div>
      <div class="date-picker-panel__body">我是身体</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data() {
    return {
      date: '',
      panelVisible: false
    }
  },
  watch: {
    panelVisible(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.panel.style.height = '200px'
        }, 0)
      } else {
        this.$refs.panel.style.height = 0
      }
    }
  },
  created() {
    this.date = this.formatDate(new Date())
  },
  methods: {
    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return `${year}-${month < 10 ? '0' + month : month}`
    },
    // 获取元素在页面中的位置
    getElementPosition(el) {
      const rect = el.getBoundingClientRect()
      const top = rect.top + document.documentElement.scrollTop
      const left = rect.left + document.documentElement.scrollLeft
      const width = rect.width
      const height = rect.height
      return { top, left, width, height }
    },
    // 显示 panel
    handleClick() {
      // 获取 date-picker 元素在页面中的位置
      const { top, left, height } = this.getElementPosition(this.$el)
      // 将 panel 元素插入到 body 中
      const panel = this.$refs.panel
      document.body.appendChild(panel)
      // 设置 panel 元素的位置
      const panelPosition = {
        top: top + height,
        left: left
      }
      panel.style.top = `${panelPosition.top}px`
      panel.style.left = `${panelPosition.left}px`
      this.panelVisible = true

      // 设置监听事件
      document.addEventListener('click', this.handleClickOut)
    },
    // 隐藏 panel
    handleClose() {
      this.panelVisible = false
      // 移除 panel 元素
      // const panel = this.$refs.panel
      // document.body.removeChild(panel)

      // 移除监听事件
      document.removeEventListener('click', this.handleClickOut)
    },
    // 点击 panel 外面隐藏 panel
    handleClickOut(event) {
      this.$refs.panel.contains(event.target) || this.handleClose()
    }
  }
}
</script>

<style scoped lang="scss">
.date-picker {
  width: 130px;
  height: 32px;

  &__input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #e4e4e4;
    border: 1px solid #2e6fb6;
    border-radius: 2px;
    overflow: hidden;

    input {
      width: 100%;
      height: 100%;
      color: #e4e4e4;
      padding-left: 10px;
      border: none;
      background-color: transparent;

      &:focus {
        outline: none;
      }
    }

    i {
      padding: 10px;
      cursor: pointer;
    }
  }
}

.date-picker-panel {
  position: absolute;
  background-color: aqua;
  z-index: 999;
  width: 500px;
  height: 0;
  overflow: hidden;
  transition: all 0.12s;
}
</style>
```

## 其他
### 树形复选框 Demo
_**Tree.vue**_

```vue
<script setup lang="ts">
defineOptions({
  name: 'TreeIndex',
  inheritAttrs: false
})

defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['changeSelect'])
const changeSel = (item) => {
  emit('changeSelect', item)
}
const changeSelect = (item) => {
  changeSel(item)
}
</script>

<template>
  <div class="tree">
    <label>
      <input type="checkbox" v-model="item.selected" @change="changeSel(item)" />{{
        item.name
      }}</label
    ><br />
    <div class="children">
      <template v-if="item.children?.length > 0">
        <template v-for="it in item.children" :key="it.id">
          <Tree :item="it" @changeSelect="changeSelect" />
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.children {
  margin-left: 10px;
}
</style>
```

```vue
<script setup lang="ts">
import Tree from './components/Tree.vue'
import { ref } from 'vue'

defineOptions({
  name: 'App',
  inheritAttrs: false
})

// 模拟数据
const treeData = ref([
  {
    id: 1,
    pid: null,
    name: '选项一',
    selected: false,
    children: [
      {
        id: 2,
        pid: 1,
        name: '选项二',
        selected: false,
        children: [
          {
            id: 3,
            pid: 2,
            name: '选项三',
            selected: false
          },
          {
            id: 4,
            pid: 2,
            name: '选项四',
            selected: false
          }
        ]
      },
      {
        id: 5,
        pid: 1,
        name: '选项五',
        selected: false,
        children: [
          {
            id: 6,
            pid: 5,
            name: '选项六',
            selected: false
          }
        ]
      }
    ]
  }
])

// 查找父级
const findItemById = (treeData, pid) => {
  for (let item of treeData) {
    if (item.id === pid) {
      return item
    }
    if (item.children?.length > 0) {
      let foundItem = findItemById(item.children, pid)
      if (foundItem) {
        return foundItem
      }
    }
  }
  return null // 如果找不到对应id的项，返回null
}

// 递归更新父级状态
const updateParentSelected = (pid) => {
  const node = findItemById(treeData.value, pid)
  if (node?.children?.length > 0) {
    node.selected = node.children.every((child) => child.selected)
    if (node.pid) {
      updateParentSelected(node.pid)
    }
  }
}

// 递归更新子级状态
const TreeSelect = (item) => {
  if (item.children?.length > 0) {
    item.children.forEach((item2) => {
      item2.selected = item.selected
      TreeSelect(item2)
    })
  }
}

const changeSelect = (item) => {
  // 更新子级的状态
  TreeSelect(item)

  // 更新父级的状态
  updateParentSelected(item.pid)
}
</script>

<template>
  <div class="app">
    <Tree :item="treeData[0]" @changeSelect="changeSelect" />
  </div>
</template>

<style scoped lang="scss"></style>
```



