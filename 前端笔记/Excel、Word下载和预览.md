## Excel
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681103587173-8ca736a4-1a1d-4830-a82c-f2c25645d6c6.png)

**xlsx工作流**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681103700149-ad7f5588-32c4-47d4-8978-0903bac7f3d7.png)

### 预览
#### 本地选择
```vue
<template>
  <div>
    <input type="file" @chang="change" />
    <div v-html="excelHTML"></div>
  </div>
</template>

<script>
  import { read, utils } from 'xlsx'
  
  export default {
    name: 'Excel',
    data() {
      return {
        excelHTML: ''
      }
    },
    methods: {
      change(e) {
        const _file = e.target.files[0]
        _file.arrayBuffer().then(res => {
          console.log(res) // ArrayBuffer(8854)
          const wb = read(res)
          const sheet1 = wb.Sheets.Sheet1
          // 将 sheet1 这个表转成 JSON 格式
          // const _data = utils.sheet_to_json(sheet1)
          
          // 将 sheet1 这个表转成 html 格式
          const _html = utils.sheet_to_html(sheet1)
          this.excelHTML = _html
        })
      }
    }
  }
</script>
```

#### 请求接口
```vue
<template>
  <div>
    <button @click="loadExcel">加载</button>
    <div v-html="excelHTML"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { read, utils } from 'xlsx'
  
  export default {
    name: 'Excel',
    data() {
      return {
        excelHTML: ''
      }
    },
    methods: {
      loadExcel() {
        axios.get('http://localhost:8000/download', { responseType: 'blob' }).then(res => {
          res.data.arrayBuffer().then(res => {
            const wb = read(res)
            const sheet1 = wb.Sheets.Sheet1
            // 将 sheet1 这个表转成 JSON 格式
            // const _data = utils.sheet_to_json(sheet1)
            
            // 将 sheet1 这个表转成 html 格式
            const _html = utils.sheet_to_html(sheet1)
            this.excelHTML = _html
          })
        })
      }
    }
  }
</script>
```

#### Vue项目 Excel 预览
```vue
<template>
  <button @click="loadExcel">加载</button>
  <vueofficeExcel v-if="excelSrc" :src="excelSrc" style="height: 500px" />
</template>

<script>
  import vueofficeExcel from '@/vue-office/excel'
  import '@/vue-office/excel/lib/index.css'

  export default {
    name: 'Excel',
    components: {
      vueofficeExcel
    },
    data() {
      return {
        excelSrc: ''
      }
    },
    methods: {
      loadExcel() {
        axios.get('http://localhost:8000/download', { responseType: 'blob' }).then(res => {
          const fr = new FileReader()
          fr.readAsDataURL(res.data)
          fr.onload = e => {
            this.excelSrc = e.target.result
          }
        })
      }
    }
  }
</script>
```

### 下载
#### 将 table DOM 转化为 excel
```vue
<template>
  <div>
    <button @click="createExcel">创建</button>
    <table ref="excelTable">
      <tr>
        <th>科目</th>
        <th>人数</th>
        <th>平均分</th>
      </tr>
      <tr>
        <td rowspan="3">数学</td>
        <td>90</td>
        <td>86</td>
      </tr>
      <tr>
        <td>85</td>
        <td>82</td>
      </tr>
      <tr>
        <td>78</td>
        <td>32</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { read, writeFile, utils } from 'xlsx'
  
  export default {
    name: 'Excel',
    data() {
      return {}
    },
    methods: {
      createExcel() {
        const tableDom = this.$refs.excelTable
        // 可以直接将 table dom 转成 book
        // const wb = utils.table_to_book(tableDom)

        // 将 table dom 转成 sheet 表
        const tableWs = utils.table_to_sheet(tableDom)
        // 创建一个 工作簿（workbook）
        const wb = utils.book_new()
        // 将 sheet 添加到 workbook 中，并命名为 sheet1
        utils.book_append_sheet(wb, tableWs, 'sheet1')
        
        // 写出文件，命名为 test1.xlsx
        writeFile(wb, 'tableTest.xlsx')
      }
    }
  }
</script>
```

#### 将 js 对象转化为 excel
```vue
<template>
  <div>
    <button @click="createExcel">创建</button>
  </div>
</template>

<script>
import { read, writeFile, utils } from 'xlsx'
  
export default {
  name: 'Excel',
  data() {
    return {
      columns: [
        { label: '姓名', key: 'name' },
        { label: '年龄', key: 'age' },
        { label: '分数', key: 'score' }
      ]
    }
  },
  methods: {
    createExcel() {
      const data = [
        { name: '张三', age: 17, score: 99 },
        { name: '李四', age: 16, score: 98 },
        { name: '王五', age: 15, score: 97 }
      ]
      const ws = utils.json_to_sheet([]) // 创建一个新的工作表
      // 设置列宽，根据实际情况调整
      ws['!cols'] = [
        { wch: 12 },
        { wch: 18 },
        { wch: 15 }
      ]
      utils.sheet_add_aoa(ws, [this.columns.map(item => item.label)], { origin: 'A1' }) // 添加表头，origin 表示从 A1 开始插入表头
      utils.sheet_add_aoa(
        ws,
        data.map(item => this.columns.map(col => item[col.key])),
        { origin: 'A2' }
      ) // 添加数据，origin 表示从 A2 开始插入数据
      const wb = utils.book_new()  // 创建一个 工作簿（workbook）
      utils.book_append_sheet(wb, ws, 'Sheet1') // 将 sheet 添加到 workbook 中，并命名为 Sheet1
      // 写出文件，命名为 test1.xlsx
      writeFile(wb, 'test1.xlsx')
    }
  }
}
</script>
```

## word
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681112430653-31c0e46b-c409-4411-98b7-937112a3a145.png)

### 预览
#### Vue 项目 Word 预览
```vue
<template>
  <div>
    <button @click="loadExcel">加载</button>
    <vueofficedocx v-if="wordPath" :src="wordPath" />
  </div>
</template>

<script>
  import vueofficedocx from '@vue-office/docx'

  export default {
    name: 'Word',
    data() {
      wordPath: ''
    },
    components: {
      vueofficedocx
    },
    methods: {
      loadExcel() {
        axios.get('http://localhost:8000/download', { responseType: 'blob' }).then(res => {
          const fr = new FileReader()
          fr.readAsDataURL(res.data)
          fr.onload = e => {
            this.wordPath = e.target.result
          }
        })
      }
    }
  }
</script>
```

#### 通用方式
```vue
<template>
  <div>
    <button @click="loadExcel">加载</button>
    <div ref="docxPreview"></div>
  </div>
</template>

<script>
  import { renderAsync } from 'docx-preview'
    
  export default {
    name: 'Word',
    data() {},
    methods: {
      loadExcel() {
        axios.get('http://localhost:8000/download', { responseType: 'blob' }).then(res => {
          renderAsync(res.data, this.$refs.docxPreview)
        })
      }
    }
  }
</script>
```

### 下载
#### 用数据替换模板（一般后端做）
**word 模板**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681114035864-b8a5ef53-47c1-4157-a0ae-bfc04b280b5e.png)

```vue
<template>
  <div>
    <input type="file" @change="change" />
    <div ref="docxPreview"></div>
  </div>
</template>

<script>
  import PizZip from 'pizzip'
  import Docxtemplater from 'docxtemplater'
  import { saveAs } from 'file-saver'
  
  export default {
    name: 'Word',
    data() {
      return {}
    },
    methods: {
      change(e) {
        const data = {
          student: [
            { name: '张三', id: 100, score: 99 },
            { name: '李四', id: 200, score: 99 },
            { name: '王五', id: 300, score: 99 }
          ]
        }
        const _file = e.target.files([0])
        _file.arrayBuffer().then(res => {
          const zip = new PizZip(res)
          const doc = new Docxtemplater(zip)
          doc.setData(data)
          doc.render()
          // 二进制流
          const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          })
          saveAs(out, 'test1.docx')
        })
      }
    }
  }
</script>
```

