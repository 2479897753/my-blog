## 按需加载
```javascript
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'

// 引入柱状图 + 折线图 + 饼图，图表后缀都为 Chart，一般常用的就这三个，如果还需要其他的，就自行添加
import { BarChart, LineChart, PieChart, MapChart, GaugeChart, PictorialBarChart } from 'echarts/charts'

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  LegendComponent,
  VisualMapComponent
} from 'echarts/components'

// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// import chalk from '@/theme/chalk.json'
import china from '@/data/china.json'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  LegendComponent,
  VisualMapComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  GaugeChart,
  PictorialBarChart
])

// 注册主题
// echarts.registerTheme('chalk', chalk)
// 注册地图
echarts.registerMap('china', china)

// 导出
export default echarts
```

## 常用图表类型
### 柱状图
### 折线图
```javascript
// 1. 引入 Echarts
import * as echarts from 'echarts'
// 2. 获取 DOM 节点
let myChart = echarts.init(document.getElementById('main'))

// 显示加载动画
// myChart.showLoading()
// 隐藏加载动画
// myChart.hideLoading()

// 3. 配置项
let option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
// 4. 使用配置项
myChart.setOption(option)

// 改变图表尺寸
window.addEventListener('resize', () => {
  myChart.resize()
})
```

### 饼图
### 散点图
## 常用工具函数
```javascript
/**
 * 合并两个对象，根据提供的合并规则
 * @param {Object} target - 目标对象，最终结果会更新此对象
 * @param {Object} source - 源对象，需要合并的对象
 * @returns {Object} 合并后的对象
 */
export const mergeOptions = (target, source) => {
  const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj)
  const isArray = arr => Array.isArray(arr)

  Object.entries(source).forEach(([key, sourceValue]) => {
    const targetValue = target[key]

    if (isObject(sourceValue)) {
      // 如果目标值是对象，递归合并
      if (isObject(targetValue)) {
        mergeOptions(targetValue, sourceValue)
      } else {
        target[key] = sourceValue // 非对象直接赋值
      }
    } else if (isArray(sourceValue)) {
      // 处理数组，检查是否有非对象元素
      const hasNonObject = sourceValue.some(item => !isObject(item))
      if (hasNonObject) {
        target[key] = sourceValue // 直接替换为数组
      } else {
        // 如果目标值是数组，逐一合并
        if (isArray(targetValue)) {
          // 合并数组，确保目标数组保留原有元素
          const mergedArray = [...targetValue]

          sourceValue.forEach((sourceItem, index) => {
            if (index < mergedArray.length) {
              // 递归合并已有的对象
              mergedArray[index] = mergeOptions(mergedArray[index], sourceItem)
            } else {
              // 添加新的对象到目标数组
              mergedArray.push(sourceItem)
            }
          })

          target[key] = mergedArray
        } else {
          target[key] = [...sourceValue] // 目标对象不是数组，直接赋值新的数组
        }
      }
    } else {
      target[key] = sourceValue // 直接覆盖
    }
  })

  return target
}

/**
 * 创建一个自动tooltip显示功能，用于图表。
 * tooltip将按照指定的时间间隔在数据点之间循环显示。
 *
 * @param {Object} chartInstance - 要应用tooltip功能的图表实例。
 * @param {number} dataPointCount - 图表中数据点的总数量。
 * @param {number} displayInterval - tooltip切换的时间间隔（以毫秒为单位）。
 *
 * @returns {Object} 一个包含启动和停止自动tooltip的方法的对象。
 * @property {Function} startAutoTooltip - 重新启动自动tooltip显示的方法。
 * @property {Function} stopAutoTooltip - 停止自动tooltip显示的方法。
 *
 * @example
 * const autoTooltip = createAutoTooltip(myChart, data.length, 3000);
 * // 手动停止tooltip
 * autoTooltip.stopAutoTooltip();
 */
export const createAutoTooltip = (chartInstance, dataPointCount, displayInterval = 3000) => {
  let currentIndex = -1
  let tooltipInterval

  const showNextTooltip = () => {
    // 取消之前高亮的图形
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: currentIndex
    })

    currentIndex = (currentIndex + 1) % dataPointCount

    // 高亮当前图形
    chartInstance.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    })

    // 显示 tooltip
    chartInstance.dispatchAction({
      type: 'showTip', // 显示 tooltip
      seriesIndex: 0, // 系列索引
      dataIndex: currentIndex // 数据索引（地图区域）
    })
  }

  const startAutoTooltip = () => {
    // showNextTooltip()

    if (!tooltipInterval) {
      tooltipInterval = setInterval(showNextTooltip, displayInterval)
    }
  }

  const stopAutoTooltip = () => {
    // 先取消高亮
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    if (tooltipInterval) {
      clearInterval(tooltipInterval)
      tooltipInterval = null
    }
  }

  chartInstance.on('mouseover', stopAutoTooltip)
  chartInstance.on('mouseout', startAutoTooltip)

  startAutoTooltip()

  return {
    startAutoTooltip,
    stopAutoTooltip
  }
}

/**
 * 格式化tooltip内容 - 只适用于 bar、line、pie 图表
 * @param {Object} params - tooltip参数
 * @param {Array} rules - 格式化规则数组
 * @returns {string} 格式化后的tooltip内容
 */
export const tooltipFormatter = (params, rules) => {
  const resArr = []
  const temParams = Array.isArray(params) ? params[0] : params
  const { data, name, dimensionNames, seriesType } = temParams

  if (seriesType === 'pie') {
    const { percent, seriesName, color } = temParams
    resArr.push(`<div>${seriesName}</div>`)
    resArr.push(`
      <div style="display: flex; align-items: center; margin-top: 4px">
        <span style="width: 18px; height: 18px; background-color: ${getColor(
          color
        )}; margin-right: 10px; border-radius: 3px;"></span>
        ${name}: ${getValue(data)} &nbsp; ${percent}%
      </div>
    `)
  } else {
    dimensionNames
      .filter(item => item)
      .forEach((item, i) => {
        if (i === 0) {
          resArr.push(`<div style="margin-bottom: -2px">${name}</div>`)
        } else if (data[item] !== null && data[item] !== '-') {
          resArr.push(`
          <div style="display: flex; align-items: center; margin-top: 4px">
            <span style="width: 18px; height: 18px; background-color: ${getColor(
              params[i - 1]?.color
            )}; margin-right: 10px; border-radius: 3px;"></span>
            ${item}: ${getValue(data[item], i - 1)}
          </div>
        `)
        }
      })
  }

  function getValue(value, index) {
    let temValue = value
    if (typeof value === 'object') {
      temValue = Object.values(value).find(item => Number.isNaN(+item) === false)
    }

    let rule = rules ? rules[index] : undefined

    if (seriesType === 'pie') {
      rule = rules
    }

    if (typeof rule === 'function') {
      return rule(temValue)
    }

    return formatNum(Math.round(temValue)) + (rule || '')
  }

  function getColor(color) {
    if (typeof color === 'string') {
      return color
    } else {
      return color?.colorStops[0].color
    }
  }

  return resArr.join('')
}
```

