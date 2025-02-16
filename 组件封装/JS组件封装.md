## 下拉框多选
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1705476527521-7cac8dfe-49a5-45c7-b089-ee9beed5f26d.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #select-multiple {
        position: relative;
      }

      #select-multiple * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      #select-input {
        width: 100%;
        padding: 4px 11px;
        color: #000000d9;
        font-size: 14px;
        line-height: 1.5715;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        caret-color: transparent;
        transition: all 0.3s;
      }

      #select-input:hover {
        border-color: #40a9ff;
        border-right-width: 1px !important;
      }

      #select-input:focus {
        border-color: #40a9ff;
        border-right-width: 1px !important;
        outline: 0;
        box-shadow: 0 0 0 2px #1890ff33;
      }

      #select {
        /* display: none; */
        position: absolute;
        top: 32px;
        width: 100%;
        color: #000000d9;
        line-height: 1.5715;
        z-index: 999;
        padding: 4px 0;
        font-size: 14px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px #00000026;
        transform: scaleY(0);
        transform-origin: top;
        transition: all 0.5s;
        overflow: hidden;
      }

      #select li {
        min-height: 32px;
        padding: 5px 12px;
        color: #000000d9;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
        user-select: none;
        transition: all 0.3s ease;
      }

      #select li.selected {
        color: #000000d9;
        font-weight: 600;
        background-color: #e6f7ff;
      }

      #select li.selected:hover {
        background-color: #e6f7ff;
      }

      #select li:hover {
        background-color: #f5f5f5;
      }
    </style>
  </head>

  <body>
    <div id="select-multiple">
      <input id="select-input" type="text" placeholder="请选择" />
      <ul id="select">
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>Vue</li>
      </ul>
    </div>

    <script>
      var targetArea = document.getElementById('select-multiple')
      var selectInput = document.getElementById('select-input')
      var select = document.getElementById('select')
      var lis = select.getElementsByTagName('li')

      // var value = ['HTML', 'CSS']
      var value = []

      selectInput.onclick = function () {
        // select.style.display = 'block'
        select.style.transform = 'scaleY(1)'
      }

      selectInput.oninput = function () {
        this.value = value.join(',')
      }

      select.onclick = function (e) {
        // 解决拖拽 bug
        if (/<.+>/.test(e.target.innerHTML)) return

        var findIndex = value.indexOf(e.target.innerHTML)

        if (findIndex > -1) {
          value.splice(findIndex, 1)
          e.target.className = ''
        } else {
          value.push(e.target.innerHTML)
          e.target.className = 'selected'
        }

        selectInput.value = value.join(',')
      }

      // 监听点击元素外部事件
      window.onclick = function (e) {
        if (!targetArea.contains(e.target)) {
          // select.style.display = 'none'
          select.style.transform = 'scaleY(0)'
        }
      }

      // 数据回显
      window.onload = function () {
        selectInput.value = value.join(',')

        for (var i = 0; i < lis.length; i++) {
          lis[i].className = ''
          for (var j = 0; j < value.length; j++) {
            if (lis[i].innerHTML === value[j]) {
              lis[i].className = 'selected'
            }
          }
        }
      }
    </script>
  </body>
</html>
```

## ToolTip 文字提示
### 输入框内容超出显示区域
1. **封装**

_**Tooltip.js**_

```javascript
/**
 * Tooltip 类 - 用于创建和管理文本提示框
 * 当目标元素内容溢出时显示完整内容
 */
class Tooltip {
  /**
   * 创建 Tooltip 实例
   * @param {Object} options - 配置选项
   * @param {number} options.margin - tooltip 与视口边界的最小距离，默认 8px
   * @param {number} options.showDelay - 显示延迟时间，默认 100ms
   */
  constructor(options = {}) {
    this.options = {
      margin: 8,
      showDelay: 100,
      ...options
    }
    this.init()
  }

  /**
   * 初始化 tooltip
   * 创建 DOM 元素并绑定事件处理函数
   */
  init() {
    // 创建tooltip元素
    this.tooltip = document.createElement('div')
    this.tooltip.className = 'tooltip'
    this.tooltip.innerHTML = `
      <div class="tooltip-content">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner"></div>
      </div>
    `
    document.body.appendChild(this.tooltip)
    
    this.tooltipInner = this.tooltip.querySelector('.tooltip-inner')
    
    // 绑定方法并添加防抖
    this.showTooltip = this.showTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleResize = this.debounce(this.handleResize.bind(this), 100)
    
    // 监听窗口大小变化，重新计算位置
    window.addEventListener('resize', this.handleResize)
  }

  /**
   * 将 tooltip 绑定到目标元素
   * @param {HTMLElement} element - 目标元素
   */
  attach(element) {
    if (!element) return
    
    this.target = element
    element.addEventListener('mouseover', this.showTooltip)
    element.addEventListener('mouseout', this.hideTooltip)
    element.addEventListener('input', this.handleInput)
  }

  /**
   * 解除 tooltip 与目标元素的绑定
   */
  detach() {
    if (!this.target) return
    
    this.target.removeEventListener('mouseover', this.showTooltip)
    this.target.removeEventListener('mouseout', this.hideTooltip)
    this.target.removeEventListener('input', this.handleInput)
    this.target = null
  }

  /**
   * 计算 tooltip 的最佳显示位置
   * @param {DOMRect} targetRect - 目标元素的位置信息
   * @param {DOMRect} tooltipRect - tooltip的位置信息
   * @returns {Object} position - 包含位置信息的对象
   */
  calculatePosition(targetRect, tooltipRect) {
    const { margin } = this.options
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // 默认显示在目标元素上方
    let position = {
      top: targetRect.top - 16,
      left: targetRect.left + targetRect.width / 2,
      transform: 'translate(-50%, -100%)',
      placement: 'top'
    }

    // 上方空间不足时切换到下方
    if (targetRect.top - tooltipRect.height - margin < 0) {
      position.top = targetRect.bottom + 16
      position.transform = 'translate(-50%, 0)'
      position.placement = 'bottom'
    }

    // 处理左右边界
    const tooltipLeft = position.left - tooltipRect.width / 2
    const tooltipRight = position.left + tooltipRect.width / 2

    if (tooltipLeft < margin) {
      // 左侧超出边界
      position.left = tooltipRect.width / 2 + margin
    } else if (tooltipRight > viewportWidth - margin) {
      // 右侧超出边界
      position.left = viewportWidth - tooltipRect.width / 2 - margin
    }

    return position
  }

  /**
   * 更新 tooltip 的位置和内容
   * @param {HTMLElement} target - 目标元素
   */
  updateTooltip(target) {
    const targetRect = target.getBoundingClientRect()
    this.tooltipInner.innerHTML = target.value ?? target.innerHTML
    
    // 临时显示以获取实际尺寸
    this.tooltip.style.visibility = 'hidden'
    this.tooltip.classList.add('visible')
    const tooltipRect = this.tooltip.getBoundingClientRect()
    this.tooltip.classList.remove('visible')
    this.tooltip.style.visibility = ''

    // 计算并设置位置
    const position = this.calculatePosition(targetRect, tooltipRect)
    this.tooltip.style.left = `${position.left}px`
    this.tooltip.style.top = `${position.top}px`
    this.tooltip.style.transform = position.transform
    this.tooltip.setAttribute('data-placement', position.placement)
  }

  /**
   * 显示 tooltip
   * @param {Event} e - 事件对象
   */
  showTooltip(e) {
    // 检查鼠标是否还在目标元素上
    if (!e.target.matches(':hover')) {
      return
    }
    
    const target = e.target || this.target
    if (target.scrollWidth > target.clientWidth) {
      this.updateTooltip(target)
      this.tooltip.classList.add('visible')
    }
  }

  /**
   * 隐藏 tooltip
   */
  hideTooltip() {
    this.tooltip.classList.remove('visible')
  }

  /**
   * 处理输入事件
   * @param {Event} e - 输入事件对象
   */
  handleInput(e) {
    if (this.tooltip.classList.contains('visible')) {
      this.updateTooltip(e.target)
    }
  }

  /**
   * 处理窗口大小变化
   */
  handleResize() {
    if (this.tooltip.classList.contains('visible') && this.target) {
      this.updateTooltip(this.target)
    }
  }

  /**
   * 防抖函数
   * @param {Function} fn - 需要防抖的函数
   * @param {number} delay - 延迟时间
   * @returns {Function} - 防抖后的函数
   */
  debounce(fn, delay = 100) {
    let timer = null
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }

  /**
   * 销毁实例，清理事件监听和DOM元素
   */
  destroy() {
    this.detach()
    window.removeEventListener('resize', this.handleResize)
    this.tooltip.remove()
  }
} 
```

_**Tooltip.css**_

```css
.tooltip {
  position: absolute;
  width: max-content;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5;
  z-index: 999;
  max-width: 250px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.1s ease-in-out, visibility 0.1s ease-in-out;
}

.tooltip.visible {
  opacity: 1;
  visibility: visible;
}

.tooltip .tooltip-content {
  position: relative;
  transform-origin: 50% 100%;
  transform: scale(0.75);
  transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}

.tooltip.visible .tooltip-content {
  transform: scale(1);
}

.tooltip .tooltip-arrow {
  position: absolute;
  left: 50%;
  width: 16px;
  height: 16px;
  transform: translateX(-50%) translateY(100%) rotate(180deg);
  z-index: 1;
  pointer-events: none;
}

/* 添加箭头位置的样式 */
.tooltip[data-placement='top'] .tooltip-arrow {
  bottom: 1px;
  transform: translateX(-50%) translateY(100%) rotate(180deg);
}

.tooltip[data-placement='bottom'] .tooltip-arrow {
  top: 1px;
  transform: translateX(-50%) translateY(-100%);
}

.tooltip .tooltip-arrow::before {
  content: '';
  position: absolute;
  bottom: 0;
  inset-inline-start: 0;
  width: 16px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.85);
  clip-path: path(
    'M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z'
  );
}

.tooltip .tooltip-inner {
  min-width: 32px;
  min-height: 32px;
  padding: 6px 8px;
  color: #fff;
  word-wrap: break-word;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 6px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
```

2. **使用**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./reset.min.css" />
    <link rel="stylesheet" href="./Tooltip.css" />
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* #container {
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
      } */
    </style>
  </head>
  <body>
    <!-- <div id="container">你好好好好哈哦破高不高啪啪你</div> -->
    <input id="ipt" type="text" />
    
    <script src="./Tooltip.js"></script>
    <script>
      const tooltip = new Tooltip()
      
      // tooltip.attach(document.getElementById('container'))
      tooltip.attach(document.getElementById('ipt'))

      // 页面卸载时清理
      window.addEventListener('unload', () => {
        tooltip.destroy()
      })
    </script>
  </body>
</html>
```

## Canvas 实现简易雷达图
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1705476459841-663c8028-b3f2-424e-a26f-7afd91de338a.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      html,
      body {
        height: 100%;
        background-color: #000;
      }

      .box {
        width: 600px;
        height: 400px;
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <canvas id="myCanvas"></canvas>
    </div>

    <script>
      const box = document.querySelector('.box')
      const canvas = document.getElementById('myCanvas')
      const ctx = canvas.getContext('2d')
      const w = (canvas.width = box.clientWidth)
      const h = (canvas.height = box.clientHeight)

      // 顶点坐标
      const t = [w / 2, h / 8]
      const r = [w / 2 + (h / 8) * 3, h / 2]
      const b = [w / 2, (h / 8) * 7]
      const l = [w / 2 - (h / 8) * 3, h / 2]

      // 图形顶点到中心的距离
      const d = (h / 8) * 3

      // 填充样式
      function fillStyle(ctx) {
        ctx.fillStyle = '#165dff'
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.stroke()
        ctx.closePath()
      }

      // 绘制圆角矩形
      // canvas2d对象 x坐标，y坐标，宽度，高度，圆角半径，颜色
      function drawRoundRect(ctx, x, y, w, h, r, color) {
        ctx.beginPath()
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
        ctx.lineTo(x + w - r, y)
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
        ctx.lineTo(x + w, y + h - r)
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
        ctx.lineTo(x + r, y + h)
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
        ctx.lineTo(x, y + r)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
      }

      function draw(data = [28, 47, 93, 72]) {
        // 清除画布
        ctx.clearRect(0, 0, w, h)
        // 绘制背景
        for (let i = 0; i < 6; i++) {
          ctx.beginPath()
          ctx.moveTo(t[0], t[1] + 30 * i)
          ctx.lineTo(r[0] - 30 * i, r[1])
          ctx.lineTo(b[0], b[1] - 30 * i)
          ctx.lineTo(l[0] + 30 * i, l[1])
          ctx.lineTo(t[0], t[1] + 30 * i)
          ctx.fillStyle = 'rgba(158, 220, 248, 0.2)'
          ctx.fill()
          ctx.strokeStyle = 'rgba(158, 220, 248, 0.3)'
          ctx.stroke()
          ctx.closePath()
        }
        ctx.beginPath()
        ctx.moveTo(t[0], t[1])
        ctx.lineTo(b[0], b[1])
        ctx.moveTo(l[0], l[1])
        ctx.lineTo(r[0], r[1])
        ctx.strokeStyle = '#b3e0f7'
        ctx.stroke()
        ctx.closePath()

        // 根据数据绘制范围
        const newData = data.map(item => (d / 100) * (100 - item))
        const pointTop = [t[0], t[1] + newData[0]]
        const pointRight = [r[0] - newData[1], r[1]]
        const pointBottom = [b[0], b[1] - newData[2]]
        const pointLeft = [l[0] + newData[3], l[1]]
        ctx.beginPath()
        ctx.moveTo(pointTop[0], pointTop[1])
        ctx.lineTo(pointRight[0], pointRight[1])
        ctx.lineTo(pointBottom[0], pointBottom[1])
        ctx.lineTo(pointLeft[0], pointLeft[1])
        ctx.lineTo(pointTop[0], pointTop[1])
        ctx.fillStyle = 'rgba(22, 93, 255, 0.2)'
        ctx.fill()
        ctx.strokeStyle = '#165dff'
        ctx.stroke()
        ctx.closePath()

        // 绘制小圆点
        ctx.beginPath()
        ctx.arc(pointTop[0], pointTop[1], 4, 0, Math.PI * 2)
        fillStyle(ctx)
        ctx.beginPath()
        ctx.arc(pointRight[0], pointRight[1], 4, 0, Math.PI * 2)
        fillStyle(ctx)
        ctx.beginPath()
        ctx.arc(pointBottom[0], pointBottom[1], 4, 0, Math.PI * 2)
        fillStyle(ctx)
        ctx.beginPath()
        ctx.arc(pointLeft[0], pointLeft[1], 4, 0, Math.PI * 2)
        fillStyle(ctx)

        // 标签的宽度和高度
        const labelWidth = 90
        const labelHeight = 32
        // 标签间距
        const labelGap = 18

        // 绘制标签
        drawRoundRect(
          ctx,
          pointTop[0] - labelWidth / 2,
          pointTop[1] - (labelHeight + labelGap),
          labelWidth,
          labelHeight,
          5,
          '#3bd8c1'
        )
        ctx.beginPath()
        ctx.moveTo(pointTop[0], pointTop[1] - labelGap / 2)
        ctx.lineTo(pointTop[0], pointTop[1] - (labelGap + 1))
        ctx.lineTo(pointTop[0] - (labelGap / 2 + 4), pointTop[1] - (labelGap + 1))
        ctx.lineTo(pointTop[0], pointTop[1] - labelGap / 2)
        ctx.fill()
        ctx.closePath()
        drawRoundRect(
          ctx,
          pointRight[0] + labelGap,
          pointRight[1] - labelGap,
          labelWidth,
          labelHeight,
          5,
          '#f48257'
        )
        ctx.beginPath()
        ctx.moveTo(pointRight[0] + labelGap / 2, pointRight[1])
        ctx.lineTo(pointRight[0] + (labelGap + 1), pointRight[1] - (labelGap / 2 - 4))
        ctx.lineTo(pointRight[0] + (labelGap + 1), pointRight[1] + (labelGap / 2 - 4))
        ctx.lineTo(pointRight[0] + labelGap / 2, pointRight[1])
        ctx.fill()
        ctx.closePath()
        drawRoundRect(
          ctx,
          pointBottom[0] - labelWidth / 2,
          pointBottom[1] + labelGap,
          labelWidth,
          labelHeight,
          5,
          '#fe8d33'
        )
        ctx.beginPath()
        ctx.moveTo(pointBottom[0], pointBottom[1] + labelGap / 2)
        ctx.lineTo(pointBottom[0], pointBottom[1] + (labelGap + 1))
        ctx.lineTo(pointBottom[0] + (labelGap / 2 + 4), pointBottom[1] + (labelGap + 1))
        ctx.lineTo(pointBottom[0], pointBottom[1] + labelGap / 2)
        ctx.fill()
        ctx.closePath()
        drawRoundRect(
          ctx,
          pointLeft[0] - (labelWidth + labelGap),
          pointLeft[1] - labelGap,
          labelWidth,
          labelHeight,
          5,
          '#049ceb'
        )
        ctx.beginPath()
        ctx.moveTo(pointLeft[0] - labelGap / 2, pointLeft[1])
        ctx.lineTo(pointLeft[0] - (labelGap + 1), pointLeft[1] - (labelGap / 2 - 4))
        ctx.lineTo(pointLeft[0] - (labelGap + 1), pointLeft[1] + (labelGap / 2 - 4))
        ctx.lineTo(pointLeft[0] - labelGap / 2, pointLeft[1])
        ctx.fill()
        ctx.closePath()

        // 绘制文字
        ctx.font = '14px Source Code Pro'
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.fillText(`重要性 ${data[0]}%`, pointTop[0] - 38, pointTop[1] - 28)
        ctx.fillText(`稳定性 ${data[1]}%`, pointRight[0] + 26, pointRight[1] + 3)
        ctx.fillText(`适配度 ${data[2]}%`, pointBottom[0] - 38, pointBottom[1] + 38)
        ctx.fillText(`满意度 ${data[3]}%`, pointLeft[0] - 100, pointLeft[1] + 3)
        ctx.closePath()
      }

      draw()
    </script>
  </body>
</html>
```

## 表格
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1705476356065-1cda4876-15b6-4d73-a25d-5addae72d4e1.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./index.css" />
    <script src="./index.js" defer></script>
  </head>
  <body>
    <div class="container">
      <table class="tb-sticky">
        <thead>
          <tr>
            <th rowspan="2">区域</th>
            <th rowspan="2">地区</th>
            <th rowspan="2">门店</th>
            <th colspan="2">服务顾问</th>
            <th rowspan="2">进站台次</th>
            <th colspan="2">养护（不含赠送）</th>
            <th rowspan="2">钣喷</th>
            <th rowspan="2">机修钣喷合计</th>
            <th rowspan="2">钣喷成本</th>
            <th rowspan="2">会员单数</th>
            <th rowspan="2">会员实收金额</th>
          </tr>
          <tr>
            <th>人员编码</th>
            <th>人员名称</th>
            <th>销量</th>
            <th>金额</th>
          </tr>
        </thead>
      </table>
      <table>
        <tbody class="tbody"></tbody>
      </table>
    </div>
  </body>
</html>
```

```javascript
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const getColTotal = (data, col, code, num) => {
  const arr = data.slice(num).filter(item => !code || item.code === code)
  return arr.reduce((acc, cur) => acc + cur[col], 0)
}

const getTableData = () => {
  const arr = []
  let storeIndex = 1
  let areaIndex = 1
  let regionIndex = 1

  for (let i = 1; i < 101; i++) {
    const store = `store${storeIndex}`
    const area = `area${areaIndex}`
    const region = `region${regionIndex}`

    arr.push({
      region,
      area,
      store,
      code: `code${i}`,
      name: `name${i}`,
      inTimes: getRandomNumber(100, 1000),
      sales: getRandomNumber(100, 1000),
      amount: getRandomNumber(100, 1000),
      spray: getRandomNumber(100, 1000),
      total: getRandomNumber(100, 1000),
      cost: getRandomNumber(100, 1000),
      member: getRandomNumber(100, 1000),
      memberAmount: getRandomNumber(100, 1000)
    })

    if (i % 10 === 0) {
      storeIndex++
      arr.push({
        region,
        area,
        store,
        code: '门店（小计）：',
        name: '',
        inTimes: getColTotal(arr, 'inTimes', '', -10),
        sales: getColTotal(arr, 'sales', '', -10),
        amount: getColTotal(arr, 'amount', '', -10),
        spray: getColTotal(arr, 'spray', '', -10),
        total: getColTotal(arr, 'total', '', -10),
        cost: getColTotal(arr, 'cost', '', -10),
        member: getColTotal(arr, 'member', '', -10),
        memberAmount: getColTotal(arr, 'memberAmount', '', -10)
      })
    }

    if (i % 20 === 0) {
      areaIndex++
      arr.push({
        region,
        area,
        store: '地区（小计）：',
        code: '地区（小计）：',
        name: '',
        inTimes: getColTotal(arr, 'inTimes', '门店（小计）：', -22),
        sales: getColTotal(arr, 'sales', '门店（小计）：', -22),
        amount: getColTotal(arr, 'amount', '门店（小计）：', -22),
        spray: getColTotal(arr, 'spray', '门店（小计）：', -22),
        total: getColTotal(arr, 'total', '门店（小计）：', -22),
        cost: getColTotal(arr, 'cost', '门店（小计）：', -22),
        member: getColTotal(arr, 'member', '门店（小计）：', -22),
        memberAmount: getColTotal(arr, 'memberAmount', '门店（小计）：', -22)
      })
    }

    if (i % 40 === 0) {
      regionIndex++
      arr.push({
        region,
        area: '区域（小计）：',
        store: '区域（小计）：',
        code: '区域（小计）：',
        name: '',
        inTimes: getColTotal(arr, 'inTimes', '地区（小计）：', -46),
        sales: getColTotal(arr, 'sales', '地区（小计）：', -46),
        amount: getColTotal(arr, 'amount', '地区（小计）：', -46),
        spray: getColTotal(arr, 'spray', '地区（小计）：', -46),
        total: getColTotal(arr, 'total', '地区（小计）：', -46),
        cost: getColTotal(arr, 'cost', '地区（小计）：', -46),
        member: getColTotal(arr, 'member', '地区（小计）：', -46),
        memberAmount: getColTotal(arr, 'memberAmount', '地区（小计）：', -46)
      })
    }
  }

  arr.push({
    region: 'region3',
    area: '区域（小计）：',
    store: '区域（小计）：',
    code: '区域（小计）：',
    name: '',
    inTimes: getColTotal(arr, 'inTimes', '地区（小计）：', -46),
    sales: getColTotal(arr, 'sales', '地区（小计）：', -46),
    amount: getColTotal(arr, 'amount', '地区（小计）：', -46),
    spray: getColTotal(arr, 'spray', '地区（小计）：', -46),
    total: getColTotal(arr, 'total', '地区（小计）：', -46),
    cost: getColTotal(arr, 'cost', '地区（小计）：', -46),
    member: getColTotal(arr, 'member', '地区（小计）：', -46),
    memberAmount: getColTotal(arr, 'memberAmount', '地区（小计）：', -46)
  })

  return arr
}

const tbody = document.querySelector('.tbody')

const createRow = (item, regionRowspan, areaRowspan, storeRowspan) => `
  <tr>
    ${regionRowspan > 0 ? `<td rowspan="${regionRowspan}">${item.region}</td>` : ''}
    ${areaRowspan > 0 ? `<td rowspan="${areaRowspan}">${item.area}</td>` : ''}
    ${storeRowspan > 0 ? `<td rowspan="${storeRowspan}">${item.store}</td>` : ''}
    <td>${item.code}</td>
    <td>${item.name}</td>
    <td>${item.inTimes}</td>
    <td>${item.sales}</td>
    <td>${item.amount}</td>
    <td>${item.spray}</td>
    <td>${item.total}</td>
    <td>${item.cost}</td>
    <td>${item.member}</td>
    <td>${item.memberAmount}</td>
  </tr>
`

const createTotalRow = (item, areaRowspan, storeRowspan, trClass) => `
  <tr class="${trClass}">
    ${
      areaRowspan > 0
        ? `<td rowspan="${areaRowspan}" ${trClass === 'region-subtotal' ? 'colspan="4"' : ''}>${
            item.area
          }</td>`
        : ''
    }
    ${
      storeRowspan > 0 && trClass !== 'region-subtotal'
        ? `<td rowspan="${storeRowspan}" ${trClass === 'area-subtotal' ? 'colspan="3"' : ''}>${
            item.store
          }</td>`
        : ''
    }
    ${trClass !== 'store-subtotal' ? '' : `<td colspan="2">${item.code}</td>`}
    <td>${item.inTimes}</td>
    <td>${item.sales}</td>
    <td>${item.amount}</td>
    <td>${item.spray}</td>
    <td>${item.total}</td>
    <td>${item.cost}</td>
    <td>${item.member}</td>
    <td>${item.memberAmount}</td>
  </tr>
`

const renderTb = data => {
  const arr = []
  let lastStore = null
  let lastArea = null
  let lastRegion = null
  let storeRowspan = 0
  let areaRowspan = 0
  let regionRowspan = 0

  const trClassMap = {
    '门店（小计）：': 'store-subtotal',
    '地区（小计）：': 'area-subtotal',
    '区域（小计）：': 'region-subtotal'
  }

  for (let index = 0; index < data.length; index++) {
    const item = data[index]

    if (item.store !== lastStore && item.store) {
      lastStore = item.store
      storeRowspan = 1
      while (data[index + storeRowspan] && data[index + storeRowspan].store === item.store) {
        storeRowspan++
      }
    } else {
      storeRowspan = 0
    }

    if (item.area !== lastArea && item.area) {
      lastArea = item.area
      areaRowspan = 1
      while (data[index + areaRowspan] && data[index + areaRowspan].area === item.area) {
        areaRowspan++
      }
    } else {
      areaRowspan = 0
    }

    if (item.region !== lastRegion && item.region) {
      lastRegion = item.region
      regionRowspan = 1
      while (data[index + regionRowspan] && data[index + regionRowspan].region === item.region) {
        regionRowspan++
      }
    } else {
      regionRowspan = 0
    }

    if (trClassMap[item.code]) {
      arr.push(createTotalRow(item, areaRowspan, storeRowspan, trClassMap[item.code]))
    } else {
      arr.push(createRow(item, regionRowspan, areaRowspan, storeRowspan))
    }
  }

  tbody.innerHTML = arr.join('')
}

renderTb(getTableData())

const applyStyles = (elements, bottomOffset) => {
  const reversedElements = Array.from(elements).reverse();
  reversedElements.forEach((item, index) => {
    item.style.bottom = bottomOffset + 'px';
    item.style.zIndex = index + 1;
  });
};

const storeEle = document.querySelectorAll('.store-subtotal');
const areaEle = document.querySelectorAll('.area-subtotal');
const regionEle = document.querySelectorAll('.region-subtotal');
const totleHeight = storeEle[0].offsetHeight;

applyStyles(storeEle, totleHeight * 2);
applyStyles(areaEle, totleHeight);
applyStyles(regionEle, 0);
```

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  position: relative;
  font-size: 14px;
  color: #606266;
  height: calc(100vh - 100px);
  overflow: auto;
  margin: 20px;
  border: 1px solid #000;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th {
  font-weight: 500;
  background-color: #f5f7fa;
}

th,
td {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 16px 0;
  text-align: center;
}

.tb-sticky {
  position: sticky;
  top: 0;
  z-index: 999;
}

.store-subtotal td,
.area-subtotal td,
.region-subtotal td {
  padding: 6px;
  color: #fff;
}

.store-subtotal,
.area-subtotal,
.region-subtotal {
  position: sticky;
  bottom: 0;
}

.store-subtotal {
  background-color: #ccd674;
}

.area-subtotal {
  background-color: #d9ab6b;
}

.region-subtotal {
  background-color: #d96b6b;
}
```

## 数字变化动画
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #number-container {
            font-size: 48px;
            /*font-weight: bold;*/
            text-align: center;
            margin-top: 50px;
        }
    </style>
</head>
<body>
<div id="number-container">
    <span id="animated-number">0</span>
</div>

<button id="start-button">开始变动</button>

<script>
    function animateNumber(targetId, start, end, duration) {
        const elem = document.getElementById(targetId); // 获取目标元素
        const startTime = performance.now(); // 记录动画开始时间
        const totalChange = end - start; // 计算总变化量
        const steps = Math.ceil(duration / 16); // 估算帧数（每帧约16毫秒）
        const stepValue = totalChange / steps; // 计算每步的变化量

        function update() {
            const currentTime = performance.now(); // 获取当前时间
            const elapsedTime = currentTime - startTime; // 计算已过去的时间
            const progress = Math.min(elapsedTime / duration, 1); // 计算进度（0到1）

            // 计算当前值并更新元素内容
            const currentValue = Math.floor(start + stepValue * Math.floor(progress * steps));
            elem.textContent = currentValue; // 更新显示的数字

            // 如果动画未完成，继续更新
            if (progress < 1) {
                requestAnimationFrame(update); // 请求下一个动画帧
            }
        }

        requestAnimationFrame(update); // 启动动画
    }

    // 按钮点击事件
    document.getElementById('start-button').addEventListener('click', function () {
        animateNumber('animated-number', 0, 100, 1000); // 从0变到100，持续1000毫秒
    });
</script>
</body>
</html>
```

