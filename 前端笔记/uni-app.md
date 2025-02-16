> **官网：**[https://uniapp.dcloud.net.cn/](https://uniapp.dcloud.net.cn/)
>

## 项目初始化
### 环境安装
```shell
# 全局安装 vue-cli
npm install -g @vue/cli
```

### 项目创建
+ 建议直接选择**默认模板**

```shell
vue create -p dcloudio/uni-preset-vue my-project

# 创建 Vue3/Vite 项目，node版本需 18+、20+
npx degit dcloudio/uni-preset-vue#vite my-vue3-project

# 创建 ts 项目
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project

# 更新编译器
npx @dcloudio/uvm@latest
```

### 项目运行和发布
```shell
npm run dev:%PLATFORM%
npm run build:%PLATFORM%
```

`**%PLATFORM%**` 可取值（[更多可查看](https://uniapp.dcloud.net.cn/quickstart-cli.html#%E8%BF%90%E8%A1%8C%E3%80%81%E5%8F%91%E5%B8%83uni-app)）：

| 值 | 平台 |
| --- | --- |
| app-plus | app平台生成打包资源（支持npm run build:app-plus，可用于持续集成。不支持run，运行调试仍需在HBuilderX中操作） |
| h5 | H5 |
| mp-weixin | 微信小程序 |
| quickapp-webview | 快应用(webview) |


## 项目结构
```shell
┌─uniCloud              云空间目录，支付宝小程序云为uniCloud-alipay，阿里云为uniCloud-aliyun，腾讯云为uniCloud-tcb（详见uniCloud）
│─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─utssdk                存放uts文件
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源都应存放于此目录
├─uni_modules           存放uni_module 详见：https://uniapp.dcloud.net.cn/plugin/uni_modules.html
├─platforms             存放各平台专用页面的目录，详见：https://uniapp.dcloud.net.cn/tutorial/platform?id=%E6%95%B4%E4%BD%93%E7%9B%AE%E5%BD%95%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91
├─nativeplugins         App原生语言插件 详见：https://nativesupport.dcloud.net.cn/NativePlugin/README
├─nativeResources       App端原生资源目录
│  ├─android            Android原生资源目录 详见：https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android
|  └─ios                iOS原生资源目录 详见：https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6-bundle-resources
├─hybrid                App端存放本地html文件的目录，详见：https://uniapp.dcloud.net.cn/component/web-view
├─wxcomponents          存放小程序组件的目录，详见：https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject?id=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6%E6%94%AF%E6%8C%81
├─unpackage             非工程代码，一般存放运行或发行的编译结果
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期：https://uniapp.dcloud.net.cn/collocation/App#%E5%BA%94%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见：https://uniapp.dcloud.net.cn/collocation/pages
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见：https://uniapp.dcloud.net.cn/collocation/manifest
├─AndroidManifest.xml   Android原生应用清单文件 详见：https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android
├─Info.plist            iOS原生应用配置文件 详见：https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios
└─uni.scss              内置的常用样式变量
```

## 页面管理
+ `**uni-app**` 新建页面时，默认创建在工程目录下的 `**pages**` 目录下，并且每次新建页面，均需在 `**pages.json**`中配置 `**pages**` 列表

```json
{
	"pages": [
		{
			"path": "pages/index/index", // 名字叫不叫 index 无所谓，位置在第一个，就是首页
			"style": {
				"navigationBarTitleText": "首页" // 页面标题
			}
		},
		{
			"path": "pages/my",
			"style": {
				"navigationBarTitleText": "我的"
			}
		}
	]
}
```

## 生命周期
### [应用生命周期](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)
+ **注意：**
    - 应用生命周期仅可在 `App.vue` 中监听，在其它页面监听无效
    - 应用启动参数，可以在API `[**uni.getLaunchOptionsSync**](https://uniapp.dcloud.net.cn/api/getLaunchOptionsSync.html#getlaunchoptionssync)` 获取
    - `**App.vue**` 不能写模板

| 函数名 | 说明 |
| --- | --- |
| onLaunch | 监听小程序初始化（全局只触发一次） |
| onShow | 监听小程序显示 |
| onHide | 监听小程序隐藏 |


```vue
<script>
// 只能在App.vue里监听应用的生命周期
export default {
  onLaunch: function (options) {
    console.log('App Launch')
    console.log('应用启动路径：', options.path)
  },
  onShow: function (options) {
    console.log('App Show')
    console.log('应用启动路径：', options.path)
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>
```

### [页面生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)
| 函数名 | 说明 |
| --- | --- |
| onLoad | 监听页面加载 |
| onReady | 监听页面初次渲染完成 |
| onShow | 监听页面显示 |
| onHide | 监听页面隐藏 |
| onUnload | 监听页面卸载 |
| onPullDownRefresh | 监听用户下拉动作 |
| onReachBottom | 监听用户上拉触底 |
| onPageScroll | 监听页面滚动（nvue不支持） |
| onShareAppMessage | 用户点击右上角分享 |


**Vue2 页面及组件生成周期流程图**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1726648093588-3cc3cde3-9b6f-4ab9-bc05-04964a473a24.png)

**Vue3 页面及组件生成周期流程图**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1726648148706-23fa3c6a-bb39-4d2e-ac8b-30054654d7fd.png)

## 常用组件
### [view](https://uniapp.dcloud.net.cn/component/view.html) - 视图容器
+ **注意：**如果使用 nvue，包裹文字需使用 `**<text>**` 组件
+ **属性：**
    - `**hover-class**` - 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果，默认值为 "none"。
    - `**hover-stop-propagation**` - 指定是否阻止本节点的祖先节点出现点击态，默认值为 false

```vue
<template>
  <view>
    <view>Hello World</view>
  </view>
</template>
```

### [scroll-view](https://uniapp.dcloud.net.cn/component/scroll-view.html) - 可滚动视图区域
+ **注意：**
    - 使用竖向滚动时，需要给 `**<scroll-view>**` 一个固定高度，通过 css 设置 height
    - 使用横向滚动时，需要给 `**<scroll-view>**` 添加 `**white-space: nowrap;**` 样式
    - 在 webview 渲染时，自定义下拉刷新的性能不及 pages.json 中配置的原生下拉刷新
+ **属性：**
    - `**scroll-x**` - 允许横向滚动，默认值为 false
    - `**scroll-y**` - 允许纵向滚动，默认值为 false
    - `**scroll-top**` - 设置竖向滚动条位置
    - `**scroll-left**` - 设置横向滚动条位置
    - `**scroll-into-view**` - 值应为某子元素 id。设置哪个方向可滚动，则在哪个方向滚动到该元素
    - `**scroll-with-animation**` - 在设置滚动条位置时使用动画过渡，默认值为 false
    - `**refresher-enabled**` - 开启自定义下拉刷新，默认值为 false
    - `**refresher-default-style**` - 设置自定义下拉刷新默认样式，支持设置 black、white、none，none 表示不使用默认样式，默认值为 "black"
    - `**refresher-background**` - 设置自定义下拉刷新区域背景颜色，默认值为 "#FFF"
    - `**refresher-triggered**` - 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发，默认值为 false
    - `**@scrolltoupper**` - 滚动到顶部/左边，会触发 scrolltoupper 事件
    - `**@scrolltolower**` - 滚动到底部/右边，会触发 scrolltolower 事件
    - `**@scroll**` - 滚动时触发，`event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}`
    - `**@refresherpulling**` - 自定义下拉刷新控件被下拉
    - `**@refresherrefresh**` - 自定义下拉刷新被触发
    - `**@refresherrestore**` - 自定义下拉刷新被复位
    - `**@refresherabort**` - 自定义下拉刷新被中止

```vue
<template>
  <view>
    <scroll-view>
      <view class="item" v-for="(item, index) in items" :key="index">
        <view class="item-title">{{ item.title }}</view>
        <view class="item-desc">{{ item.desc }}</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Item 1', desc: 'This is item 1' },
        { title: 'Item 2', desc: 'This is item 2' },
        { title: 'Item 3', desc: 'This is item 3' }
      ]
    }
  }
}
</script>
```

### [swiper](https://uniapp.dcloud.net.cn/component/swiper.html) - 滑块视图容器
+ **说明：**注意滑动切换和滚动的区别，滑动切换是一屏一屏的切换。swiper 下的每个 swiper-item 是一个滑动切换区域，不能停留在2个滑动区域之间
+ **属性：**
    - `**indicator-dots**` - 是否显示面板指示点，默认值为 false
    - `**indicator-color**` - 指示点颜色，默认值为 rgba(0, 0, 0, .3)
    - `**indicator-active-color**` - 当前选中的指示点颜色，默认值为 #000000
    - `**autoplay**` - 是否自动切换，默认值为 false
    - `**current**` - 当前所在滑块的 index，默认值为 0
    - `**interval**` - 自动切换时间间隔，默认值为 5000
    - `**duration**` - 滑动动画时长，默认值为 500
    - `**circular**` - 是否采用衔接滑动，即播放到末尾后重新回到开头，默认值为 false
    - `**vertical**` - 滑动方向是否为纵向，默认值为 false
    - `**display-multiple-items**` - 同时显示的滑块数量，默认值为 1
    - `**@change**` - current 改变时会触发 change 事件，`event.detail = {current: current, source: source}`
    - `**@animationfinish**` - 动画结束时会触发 animationfinish 事件，`event.detail = {current: current, source: source}`

```vue
<template>
  <view class="uni-margin-wrap">
    <swiper
      :autoplay="autoplay"
      :duration="duration"
      :indicator-dots="indicatorDots"
      :interval="interval"
      circular
      class="swiper"
    >
      <swiper-item>
        <view class="swiper-item uni-bg-red">A</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-green">B</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-blue">C</view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      autoplay: true,
      duration: 500,
      indicatorDots: true,
      interval: 2000
    }
  }
}
</script>

<style lang="scss">
.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
}

.swiper {
  height: 300rpx;
}

.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}
</style>
```

### [text](https://uniapp.dcloud.net.cn/component/text.html) - 文本
+ **说明：**
    - 在 app-nvue 下，只有 `**<text>**` 才能包裹文本内容。无法在 `**<view>**` 组件包裹文本。
    - 支持 `**\n**` 方式换行。
    - decode 可以解析的有 `**&nbsp;**` `**&lt;**` `**&gt;**` `**&amp;**` `**&apos;**` `**&ensp;**` `**&emsp;**`。
+ **属性：**
    - `**selectable**` - 文本是否可选，默认值为 false
    - `**decode**` - 是否解码，默认值为 false

```vue
<template>
  <view>
    <text>Hello World</text>
  </view>
</template>
```

### [rich-text](https://uniapp.dcloud.net.cn/component/rich-text.html) - 富文本
+ **属性：**
    - `**nodes**` - 节点列表 / HTML String，默认值为 []
    - `**selectable**` - 富文本是否可以长按选中，可用于复制，粘贴等场景，默认值为 true
    - `**image-menu-prevent**` - 阻止长按图片时弹起默认菜单，只在初始化时有效，不能动态变更，默认值为 false
    - `**preview**` - 富文本中的图片是否可点击预览。在不设置的情况下，若 rich-text 未监听点击事件，则默认开启。
    - `**@itemclick**` - 拦截点击事件（只支持 a、img 标签），返回当前 node 信息 `event.detail={node}`

```vue
<template>
  <view>
    <rich-text :nodes="nodes"></rich-text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      nodes: [
        {
          name: 'div',
          attrs: {
            class: 'div-class',
            style: 'line-height: 60px; color: red; text-align:center;'
          },
          children: [
            {
              type: 'text',
              text: 'Hello&nbsp;uni-app!'
            }
          ]
        }
      ]
    }
  }
}
</script>
```

### [progress](https://uniapp.dcloud.net.cn/component/progress.html) - 进度条
+ **属性：**
    - `**percent**` - 百分比0~100，无默认值
    - `**show-info**` - 在进度条右侧显示百分比，默认值为 false
    - `**border-radius**` - 圆角大小，默认值为 0
    - `**font-size**` - 右侧百分比字体大小，默认值为 16
    - `**stroke-width**` - 进度条线的宽度，单位 px，默认值为 6
    - `**activeColor**` - 已选择的进度条颜色，默认值为 #09BB07
    - `**backgroundColor**` - 未选择的进度条的颜色，默认值为 #EBEBEB
    - `**active**` - 进度条从左往右的动画，默认值为 false
    - `**active-mode**` - backwards: 动画从头播；forwards：动画从上次结束点接着播，默认值为 backwards
    - `**@activeend**` - 动画完成事件

```vue
<template>
  <view>
    <progress :value="progress" />
    <button @click="progress++">Increase</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      progress: 0
    }
  }
}
</script>
```

### [button](https://uniapp.dcloud.net.cn/component/button.html) - 按钮
+ **属性：**
    - `**size**` - 按钮的大小，可选值 default（默认大小），mini（小尺寸）
    - `**type**` - 按钮的样式类型，可选值，primary，default（白色），warn（红色）
    - `**plain**` - 按钮是否镂空，背景色透明，默认值为 false
    - `**disabled**` - 是否禁用，默认值为 false
    - `**loading**` - 名称前是否带 loading 图标，默认值为 false
    - `**form-type**` - 用于 `<form>` 组件，点击分别会触发 `<form>` 组件的 submit/reset 事件
    - `[**open-type**](https://uniapp.dcloud.net.cn/component/button.html#open-type-%E6%9C%89%E6%95%88%E5%80%BC)` - 开放能力
    - `**hover-class**` - 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果，默认值为 button-hover

```vue
<template>
  <view>
    <button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">
      获取手机号
    </button>
  </view>
</template>

<script>
export default {
  methods: {
    decryptPhoneNumber(e) {
      console.log(e.detail.encryptedData)
    }
  }
}
</script>
```

### [radio](https://uniapp.dcloud.net.cn/component/radio.html) - 单选项
+ **属性：**
    - `**value**` - `<radio>` 标识。当该 `**<radio>**` 选中时，`**<radio-group>**` 的 change 事件会携带 `**<radio>**` 的 value
    - `**checked**` - 当前是否选中，默认值为 false
    - `**disabled**` - 是否禁用，默认值为 false
    - `**color**` - radio 的颜色，同 css 的 color
    - `**backgroundColor**` - radio默认的背景颜色，默认值为 #ffffff
    - `**borderColor**` - radio默认的边框颜色，默认值为 #d1d1d1
    - `**activeBackgroundColor**` - radio选中时的背景颜色，优先级大于color属性，默认值为 #007AFF
    - `**activeBorderColor**` - radio选中时的边框颜色
    - `**iconColor**` - radio的图标颜色，默认值为 #ffffff

```vue
<template>
  <view>
    <view class="uni-padding-wrap">
      <view class="uni-title">默认样式</view>
      <view>
        <label class="radio"><radio value="r1" checked="true" />选中</label>
        <label class="radio"><radio value="r2" />未选中</label>
      </view>
    </view>
    <view class="uni-title uni-common-mt uni-common-pl">推荐展示样式</view>
    <view class="uni-list">
      <radio-group @change="radioChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="(item, index) in items"
          :key="item.value"
        >
          <view>
            <radio :value="item.value" :checked="index === current" />
          </view>
          <view>{{ item.name }}</view>
        </label>
      </radio-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          value: 'USA',
          name: '美国',
          checked: 'true'
        },
        {
          value: 'CHN',
          name: '中国'
        },
        {
          value: 'BRA',
          name: '巴西'
        },
        {
          value: 'JPN',
          name: '日本'
        },
        {
          value: 'ENG',
          name: '英国'
        },
        {
          value: 'FRA',
          name: '法国'
        }
      ],
      current: 0
    }
  },
  methods: {
    radioChange(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i
          break
        }
      }
    }
  }
}
</script>
```

### [checkbox](https://uniapp.dcloud.net.cn/component/checkbox.html) - 多选项
+ **属性：**
    - `**value**`** **- `**<checkbox>**` 标识，选中时触发 `**<checkbox-group>**` 的 change 事件，并携带 `**<checkbox>**` 的 value
    - `**disabled**` - 是否禁用，默认值为 false
    - `**checked**` - 当前是否选中，可用来设置默认选中，默认值为 false
    - `**color**` - checkbox 的颜色，同 css 的 color
    - `**backgroundColor**` - checkbox默认的背景颜色，默认值为 #ffffff
    - `**borderColor**` - checkbox 默认的边框颜色，默认值为 #d1d1d1
    - `**activeBackgroundColor**` - checkbox 选中时的背景颜色，优先级大于 color 属性，默认值为 #ffffff
    - `**activeBorderColor**` - checkbox 选中时的边框颜色，默认值为 #d1d1d1
    - `**iconColor**` - checkbox 的图标颜色，默认值为 #007aff

```vue
<template>
  <view class="uni-list">
    <checkbox-group @change="checkboxChange">
      <label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
        <view>
          <checkbox :value="item.value" :checked="item.checked" />
        </view>
        <view>{{ item.name }}</view>
      </label>
    </checkbox-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          value: 'CHN',
          name: '中国',
          checked: 'true'
        },
        {
          value: 'USA',
          name: '美国'
        },
        {
          value: 'JPN',
          name: '日本'
        }
      ]
    }
  },
  methods: {
    checkboxChange(e) {
      const items = this.items
      const values = e.detail.value
      items.forEach(item => {
        this.$set(item, 'checked', values.includes(item.value))
      })
    }
  }
}
</script>

<style lang="scss">
.uni-list-cell {
  justify-content: flex-start;
}
</style>
```

### [editor](https://uniapp.dcloud.net.cn/component/editor.html) - 富文本编辑器
+ `**read-only**` - read-only，默认值为 false
+ `**placeholder**` - 提示信息
+ `**show-img-size**` - 点击图片时显示图片大小控件，默认值为 false
+ `**show-img-toolbar**` - 点击图片时显示工具栏控件，默认值为 false
+ `**show-img-resize**` - 点击图片时显示修改尺寸控件，默认值为 false
+ `**@ready**` - 编辑器初始化完成时触发
+ `**@focus**` - 编辑器聚焦时触发，`event.detail = {html, text, delta}`
+ `**@blur**` - 编辑器失去焦点时触发，`detail = {html, text, delta}`
+ `**@input**` - 编辑器内容改变时触发，`detail = {html, text, delta}`

```vue
<!-- uni-app 中 button 组件示例 -->
<template>
  <view class="container">
    <view class="page-body">
      <view class="wrapper">
        <view class="toolbar" @tap="format" style="height: 120px; overflow-y: auto">
          <view
            :class="formats.bold ? 'ql-active' : ''"
            class="iconfont icon-zitijiacu"
            data-name="bold"
          >
          </view>
          <view
            :class="formats.italic ? 'ql-active' : ''"
            class="iconfont icon-zitixieti"
            data-name="italic"
          >
          </view>
          <view
            :class="formats.underline ? 'ql-active' : ''"
            class="iconfont icon-zitixiahuaxian"
            data-name="underline"
          ></view>
          <view
            :class="formats.strike ? 'ql-active' : ''"
            class="iconfont icon-zitishanchuxian"
            data-name="strike"
          ></view>
          <!-- #ifndef MP-BAIDU -->
          <view
            :class="formats.align === 'left' ? 'ql-active' : ''"
            class="iconfont icon-zuoduiqi"
            data-name="align"
            data-value="left"
          ></view>
          <!-- #endif -->
          <view
            :class="formats.align === 'center' ? 'ql-active' : ''"
            class="iconfont icon-juzhongduiqi"
            data-name="align"
            data-value="center"
          ></view>
          <view
            :class="formats.align === 'right' ? 'ql-active' : ''"
            class="iconfont icon-youduiqi"
            data-name="align"
            data-value="right"
          ></view>
          <view
            :class="formats.align === 'justify' ? 'ql-active' : ''"
            class="iconfont icon-zuoyouduiqi"
            data-name="align"
            data-value="justify"
          ></view>
          <!-- #ifndef MP-BAIDU -->
          <view
            :class="formats.lineHeight ? 'ql-active' : ''"
            class="iconfont icon-line-height"
            data-name="lineHeight"
            data-value="2"
          ></view>
          <view
            :class="formats.letterSpacing ? 'ql-active' : ''"
            class="iconfont icon-Character-Spacing"
            data-name="letterSpacing"
            data-value="2em"
          ></view>
          <view
            :class="formats.marginTop ? 'ql-active' : ''"
            class="iconfont icon-722bianjiqi_duanqianju"
            data-name="marginTop"
            data-value="20px"
          ></view>
          <view
            :class="formats.marginBottom ? 'ql-active' : ''"
            class="iconfont icon-723bianjiqi_duanhouju"
            data-name="marginBottom"
            data-value="20px"
          ></view>
          <!-- #endif -->

          <view class="iconfont icon-clearedformat" @tap="removeFormat"></view>

          <!-- #ifndef MP-BAIDU -->
          <view
            :class="formats.fontFamily ? 'ql-active' : ''"
            class="iconfont icon-font"
            data-name="fontFamily"
            data-value="Pacifico"
          ></view>
          <view
            :class="formats.fontSize === '24px' ? 'ql-active' : ''"
            class="iconfont icon-fontsize"
            data-name="fontSize"
            data-value="24px"
          ></view>
          <!-- #endif -->
          <view
            :class="formats.color === '#0000ff' ? 'ql-active' : ''"
            class="iconfont icon-text_color"
            data-name="color"
            data-value="#0000ff"
          ></view>
          <view
            :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
            class="iconfont icon-fontbgcolor"
            data-name="backgroundColor"
            data-value="#00ff00"
          ></view>
          <view class="iconfont icon-date" @tap="insertDate"></view>
          <view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
          <view
            :class="formats.list === 'ordered' ? 'ql-active' : ''"
            class="iconfont icon-youxupailie"
            data-name="list"
            data-value="ordered"
          ></view>
          <view
            :class="formats.list === 'bullet' ? 'ql-active' : ''"
            class="iconfont icon-wuxupailie"
            data-name="list"
            data-value="bullet"
          ></view>

          <view class="iconfont icon-undo" @tap="undo"></view>
          <view class="iconfont icon-redo" @tap="redo"></view>

          <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
          <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
          <view class="iconfont icon-fengexian" @tap="insertDivider"></view>
          <view class="iconfont icon-charutupian" @tap="insertImage"></view>
          <view
            :class="formats.header === 1 ? 'ql-active' : ''"
            class="iconfont icon-format-header-1"
            data-name="header"
            :data-value="1"
          ></view>
          <view
            :class="formats.script === 'sub' ? 'ql-active' : ''"
            class="iconfont icon-zitixiabiao"
            data-name="script"
            data-value="sub"
          ></view>
          <view
            :class="formats.script === 'super' ? 'ql-active' : ''"
            class="iconfont icon-zitishangbiao"
            data-name="script"
            data-value="super"
          ></view>

          <view class="iconfont icon-shanchu" @tap="clear"></view>

          <view
            :class="formats.direction === 'rtl' ? 'ql-active' : ''"
            class="iconfont icon-direction-rtl"
            data-name="direction"
            data-value="rtl"
          ></view>
        </view>

        <view class="editor-wrapper">
          <editor
            id="editor"
            class="ql-container"
            placeholder="开始输入..."
            show-img-size
            show-img-toolbar
            show-img-resize
            @statuschange="onStatusChange"
            :read-only="readOnly"
            @ready="onEditorReady"
          >
          </editor>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      readOnly: false,
      formats: {}
    }
  },
  onLoad() {
    // #ifndef MP-BAIDU
    uni.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")'
    })
    // #endif
  },
  methods: {
    readOnlyChange() {
      this.readOnly = !this.readOnly
    },
    onEditorReady() {
      // #ifdef MP-BAIDU
      this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor')
      // #endif

      // #ifdef APP-PLUS || MP-WEIXIN || H5
      uni
        .createSelectorQuery()
        .select('#editor')
        .context(res => {
          this.editorCtx = res.context
        })
        .exec()
      // #endif
    },
    undo() {
      this.editorCtx.undo()
    },
    redo() {
      this.editorCtx.redo()
    },
    format(e) {
      let { name, value } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      this.editorCtx.format(name, value)
    },
    onStatusChange(e) {
      const formats = e.detail
      this.formats = formats
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        }
      })
    },
    clear() {
      uni.showModal({
        title: '清空编辑器',
        content: '确定清空编辑器全部内容？',
        success: res => {
          if (res.confirm) {
            this.editorCtx.clear({
              success: function (res) {
                console.log('clear success')
              }
            })
          }
        }
      })
    },
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate
      })
    },
    insertImage() {
      uni.chooseImage({
        count: 1,
        success: res => {
          this.editorCtx.insertImage({
            src: res.tempFilePaths[0],
            alt: '图像',
            success: function () {
              console.log('insert image success')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import './editor-icon.css';

.page-body {
  height: calc(100vh - var(--window-top) - var(--status-bar-height));
}

.wrapper {
  height: 100%;
}

.editor-wrapper {
  height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
  background: #fff;
}

.iconfont {
  display: inline-block;
  padding: 8px 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 20px;
}

.toolbar {
  box-sizing: border-box;
  border-bottom: 0;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.ql-container {
  box-sizing: border-box;
  padding: 12px 15px;
  width: 100%;
  min-height: 30vh;
  height: 100%;
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
}

.ql-active {
  color: #06c;
}
</style>
```

### [form](https://uniapp.dcloud.net.cn/component/form.html) - 表单
```vue
<template>
  <view>
    <form>
      <view>
        <text>用户名：</text>
        <input type="text" placeholder="请输入用户名" v-model="username" />
      </view>
      <view>
        <text>密码：</text>
        <input type="password" placeholder="请输入密码" v-model="password" />
      </view>
      <view>
        <button type="primary" @click="login">登录</button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log('username:', this.username)
      console.log('password:', this.password)
    }
  }
}
</script>
```

### [input](https://uniapp.dcloud.net.cn/component/input.html) - 单行输入框
+ **属性：**
    - `**value**` - 输入框的初始内容
    - `**type**` - input 的类型，默认值为 text
        * `**text**` - 文本输入键盘
        * `**number**` - 数字输入键盘
        * `**idcard**` - 身份证输入键盘
        * `**digit**` - 带小数点的数字键盘
        * `**tel**` - 电话输入键盘
    - `**password**` - 是否是密码类型，默认值为 false
    - `**placeholder**` - 输入框为空时占位符
    - `**placeholder-class**` - 指定 placeholder 的样式类，注意页面或组件的style中写了scoped时，需要在类名前写`**/deep/**`，默认值为 "input-placeholder"
    - `**disabled**` - 是否禁用，默认值为 false
    - `**maxlength**` - 最大输入长度，设置为 -1 的时候不限制最大长度，默认值为 140
    - `**cursor-spacing**` - 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离，默认值为 0
    - `**focus**` - 获取焦点
    - `**confirm-type**` - 设置键盘右下角按钮的文字，仅在 type="text" 时生效。默认值为 done
        * `**send**` - 右下角按钮为“发送”
        * `**search**` - 右下角按钮为“搜索”
        * `**next**` - 右下角按钮为“下一个”
        * `**go**` - 右下角按钮为“前往”
        * `**done**` - 右下角按钮为“完成”
    - `**confirm-hold**` - 点击键盘右下角按钮时是否保持键盘不收起，默认值为 false
    - `**cursor-color**` - 光标颜色
    - `**selection-start**` - 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用，默认值为 -1
    - `**selection-end**` - 光标结束位置，自动聚集时有效，需与selection-start搭配使用，默认值为 -1
    - `**@input**` - 当键盘输入时，触发 input 事件，`event.detail = {value}`
    - `**@focus**` - 输入框聚焦时触发，`event.detail = { value, height }`，height 为键盘高度
    - `**@blur**` - 输入框失去焦点时触发，`event.detail = {value: value}`
    - `**@confirm**` - 点击完成按钮时触发，`event.detail = {value: value}`

```vue
<template>
  <view class="uni-common-mt">
    <view class="uni-form-item uni-column">
      <view class="title">实时获取输入值：{{ inputValue }}</view>
      <input class="uni-input" @input="onKeyInput" placeholder="输入同步到view中" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    onKeyInput(event) {
      this.inputValue = event.target.value
    }
  }
}
</script>
```

### [textarea](https://uniapp.dcloud.net.cn/component/textarea.html) - 多行输入框
+ **属性：**
    - `**value**` - 输入框的内容
    - `**placeholder**` - 输入框为空时占位符
    - `**placeholder-class**` - 指定 placeholder 的样式类，注意页面或组件的style中写了scoped时，需要在类名前写 `**/deep/**`，默认值为 textarea-placeholder
    - `**disabled**` - 是否禁用，默认值为 false
    - `**maxlength**` - 最大输入长度，设置为 -1 的时候不限制最大长度，默认值为 140
    - `**focus**` - 获取焦点，默认值为 false
    - `**auto-height**` - 是否自动增高，设置auto-height时，style.height不生效，默认值为 false
    - `**fixed**` - 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，默认值为 false
    - `**cursor-spacing**` - 指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离，默认值为 0
    - `**cursor**` - 指定 focus 时的光标位置
    - `**confirm-type**` - 设置键盘右下角按钮的文字，默认值为 done
        * `**send**` - 右下角按钮为“发送”
        * `**search**` - 右下角按钮为“搜索”
        * `**next**` - 右下角按钮为“下一个”
        * `**go**` - 右下角按钮为“前往”
        * `**done**` - 右下角按钮为“完成”
    - `**confirm-hold**` - 点击键盘右下角按钮时是否保持键盘不收起，默认值为 false
    - `**show-confirm-bar**` - 是否显示键盘上方带有”完成“按钮那一栏，默认值为 true
    - `**selection-start**` - 光标起始位置，自动聚焦时有效，需与selection-end搭配使用，默认值为 -1
    - `**selection-end**` - 光标结束位置，自动聚焦时有效，需与selection-start搭配使用，默认值为 -1
    - `**inputmode**` - 是一个枚举属性，它提供了用户在编辑元素或其内容时可能输入的数据类型的提示，默认值为 "text"
        * `**none**` - 无虚拟键盘
        * `**text**` - 使用用户本地区域设置的标准文本输入键盘
        * `**decimal**` - 小数输入键盘
        * `**numeric**` - 数字输入键盘
        * `**tel**` - 电话输入键盘
        * `**search**` - 为搜索输入优化的虚拟键盘
        * `**email**` - 为邮件地址输入优化的虚拟键盘
        * `**url**` - 为网址输入优化的虚拟键盘
    - `**@focus**` - 输入框聚焦时触发，`event.detail = { value, height }`，height 为键盘高度
    - `**@blur**` - 输入框失去焦点时触发，`event.detail = {value, cursor}`
    - `**@input**` - 当键盘输入时，触发 input 事件，`event.detail = {value, cursor}`， @input 处理函数的返回值并不会反映到 textarea 上
    - `**@confirm**` - 点击完成时， 触发 confirm 事件，`event.detail = {value: value}`

```vue
<template>
  <view>
    <view class="uni-title uni-common-pl">输入区域高度自适应，不会出现滚动条</view>
    <view class="uni-textarea">
      <textarea @blur="bindTextAreaBlur" auto-height />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    bindTextAreaBlur(e) {
      console.log(e.detail.value)
    }
  }
}
</script>
```

### [label](https://uniapp.dcloud.net.cn/component/label.html) - 表单关联
> 用来改进表单组件的可用性，使用for属性找到对应的id，或者将控件放在该标签下，当点击时，就会触发对应的控件
>

+ **说明：**
    - for 优先级高于内部控件，内部有多个控件的时候默认触发第一个控件
    - 目前可以绑定的控件有：`**<button>**`, `**<checkbox>**`, `**<radio>**`, `**<switch>**`

```vue
<template>
  <view class="uni-common-mt">
    <view class="uni-form-item uni-column">
      <view class="title">表单组件在label内</view>
      <checkbox-group class="uni-list" @change="checkboxChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="item in checkboxItems"
          :key="item.name"
        >
          <view>
            <checkbox :value="item.name" :checked="item.checked"></checkbox>
          </view>
          <view>{{ item.value }}</view>
        </label>
      </checkbox-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      checkboxItems: [
        {
          name: 'CHN',
          value: '中国',
          checked: 'true'
        },
        {
          name: 'USA',
          value: '美国'
        }
      ]
    }
  },
  methods: {
    checkboxChange(e) {
      console.log(e)
      const checked = e.target.value
      const changed = {}
      for (let i = 0; i < this.checkboxItems.length; i++) {
        if (checked.indexOf(this.checkboxItems[i].name) !== -1) {
          changed['checkboxItems[' + i + '].checked'] = true
        } else {
          changed['checkboxItems[' + i + '].checked'] = false
        }
      }
    }
  }
}
</script>
```

### [picker](https://uniapp.dcloud.net.cn/component/picker.html) - 滚动选择器
> 从底部弹起的滚动选择器
>

#### 普通选择器
> `**mode = selector**`
>

+ **属性：**
    - `**range**` - mode为 selector 或 multiSelector 时，range 有效，默认值为 []
    - `**range-key**` - 
    - `**value**` - value 的值表示选择了 range 中的第几个（下标从 0 开始），默认值为 0
    - `**disabled**` - 是否禁用，默认值为 false
    - `**@change**` - value 改变时触发 change 事件，`event.detail = {value: value}`
    - `**@cancel**` - 取消选择或点遮罩层收起 picker 时触发

```vue
<template>
  <view>
    <view class="uni-title uni-common-pl">地区选择器</view>
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 当前选择 </view>
        <view class="uni-list-cell-db">
          <picker @change="bindPickerChange" :value="index" :range="array">
            <view class="uni-input">{{ array[index] }}</view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      array: ['中国', '美国', '巴西', '日本'],
      index: 0
    }
  },
  methods: {
    bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.index = e.detail.value
    }
  }
}
</script>
```

#### 多列选择器
> `**mode = multiSelector**`
>

+ **属性：**
    - `**range**` - mode为 selector 或 multiSelector 时，range 有效。二维数组，长度表示多少列，数组的每项表示每列的数据，如[["a","b"], ["c","d"]]，默认值为 []
    - `**range-key**` - 当 range 是一个二维 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
    - `**value**` - value 每一项的值表示选择了 range 对应项中的第几个（下标从 0 开始），默认值为 []
    - `**disabled**` - 是否禁用，默认值为 false
    - `**@change**` - value 改变时触发 change 事件，event.detail = {value: value}
    - `**@columnchange**` - 某一列的值改变时触发 columnchange 事件，event.detail = {column: column, value: value}，column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标
    - `**@cancel**` - 取消选择时触发

```vue
<template>
  <view>
    <picker
      mode="multiSelector"
      @columnchange="columnChange"
      :value="multiIndex"
      :range="multiArray"
    >
      <view class="picker">
        当前选择：{{ multiArray[0][multiIndex[0]] }} - {{ multiArray[1][multiIndex[1]] }}
      </view>
    </picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      multiArray: [
        ['周一', '周二', '周三', '周四', '周五'],
        ['上午', '下午', '晚上']
      ],
      multiIndex: [0, 0]
    }
  },
  methods: {
    columnChange(e) {
      // 更新选择器的索引
      this.multiIndex[e.detail.column] = e.detail.value
    }
  }
}
</script>

<style>
.picker {
  padding: 20px;
  font-size: 16px;
}
</style>
```

#### 时间选择器
> `**mode = time**`
>

+ **属性：**
    - `**value**` - 表示选中的时间，格式为"hh:mm"
    - `**start**` - 表示有效时间范围的开始，字符串格式为"hh:mm"
    - `**end**` - 表示有效时间范围的结束，字符串格式为"hh:mm"
    - `**disabled**` - 是否禁用，默认值为 false
    - `**@change**` - value 改变时触发 change 事件，`event.detail = {value: value}`
    - `**@cancel**` - 取消选择时触发

```vue
<template>
  <view>
    <view class="uni-title uni-common-pl">时间选择器</view>
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 当前选择 </view>
        <view class="uni-list-cell-db">
          <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
            <view class="uni-input">{{ time }}</view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      time: '12:01'
    }
  },
  methods: {
    bindTimeChange: function (e) {
      this.time = e.detail.value
    }
  }
}
</script>
```

#### 日期选择器
> `**mode = date**`
>

+ **属性：**
    - `**value**` - 表示选中的日期，格式为"YYYY-MM-DD"，默认值为 0
    - `**start**` - 表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"
    - `**end**` - 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"
    - `**fields**` - 有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI
    - `**disabled**` - 是否禁用，默认值为 false
    - `**@change**` - value 改变时触发 change 事件，`event.detail = {value: value}`
    - `**@cancel**` - 取消选择时触发

```vue
<template>
  <view>
    <view class="uni-title uni-common-pl">日期选择器</view>
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 当前选择 </view>
        <view class="uni-list-cell-db">
          <picker
            mode="date"
            :value="date"
            :start="startDate"
            :end="endDate"
            @change="bindDateChange"
          >
            <view class="uni-input">{{ date }}</view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    const currentDate = this.getDate({
      format: true
    })

    return {
      date: currentDate
    }
  },
  computed: {
    startDate() {
      return this.getDate('start')
    },
    endDate() {
      return this.getDate('end')
    }
  },
  methods: {
    bindDateChange: function (e) {
      this.date = e.detail.value
    },
    getDate(type) {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      if (type === 'start') {
        year = year - 60
      } else if (type === 'end') {
        year = year + 2
      }
      month = month > 9 ? month : '0' + month
      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    }
  }
}
</script>
```

#### 省市区选择器
> `**mode = region**`
>

+ **属性：**
    - `**value**` - 表示选中的省市区，默认选中每一列的第一个值，默认值为 []
    - `**custom-item**` - 可为每一列的顶部添加一个自定义的项
    - `**disabled**` - 是否禁用，默认值为 false
    - `**@change**` - value 改变时触发 change 事件，`event.detail = {value: value}`
    - `**@cancel**` - 取消选择时触发

```vue
<template>
  <view>
    <picker mode="region" @change="regionChange">
      <view class="picker"> 当前选择：{{ regionText || '请选择地区' }} </view>
    </picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      regionText: '' // 当前选择的省市区文本
    }
  },
  methods: {
    regionChange(e) {
      // 获取选择的省市区数据
      const { code, value } = e.detail
      this.regionText = value.join(' ')
      console.log('选择的省市区:', this.regionText)
      console.log('对应的代码:', code)
    }
  }
}
</script>

<style>
.picker {
  padding: 20px;
  font-size: 16px;
}
</style>
```

### [picker-view](https://uniapp.dcloud.net.cn/component/picker-view.html) - 滚动选择器
> 嵌入页面的滚动选择器
>

+ **属性：**
    - `**value**` - 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。
    - `**indicator-class**` - 设置选择器中间选中框的类名，注意页面或组件的 style 中写了 scoped 时，需要在类名前写 `**/deep/**`
    - `**mask-class**` - 设置蒙层的类名
    - `**@change**` - 当滚动选择，value 改变时触发 change 事件，`event.detail = {value: value}`；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）

```vue
<template>
  <view>
    <view class="uni-padding-wrap">
      <view class="uni-title">日期：{{ year }}年{{ month }}月{{ day }}日</view>
    </view>
    <picker-view
      v-if="visible"
      :indicator-style="indicatorStyle"
      :value="value"
      @change="bindChange"
      class="picker-view"
    >
      <picker-view-column>
        <view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
      </picker-view-column>
      <picker-view-column>
        <view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
      </picker-view-column>
      <picker-view-column>
        <view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script>
export default {
  data() {
    const date = new Date()
    const years = []
    const year = date.getFullYear()
    const months = []
    const month = date.getMonth() + 1
    const days = []
    const day = date.getDate()

    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i)
    }

    for (let i = 1; i <= 12; i++) {
      months.push(i)
    }

    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }

    return {
      title: 'picker-view',
      years,
      year,
      months,
      month,
      days,
      day,
      value: [9999, month - 1, day - 1],
      visible: true,
      indicatorStyle: `height: 50px;`
    }
  },
  methods: {
    bindChange(e) {
      const val = e.detail.value
      this.year = this.years[val[0]]
      this.month = this.months[val[1]]
      this.day = this.days[val[2]]
    }
  }
}
</script>

<style>
.picker-view {
  width: 750rpx;
  height: 600rpx;
  margin-top: 20rpx;
}

.item {
  line-height: 100rpx;
  text-align: center;
}
</style>
```

### [slider](https://uniapp.dcloud.net.cn/component/slider.html) - 滑动选择器
> 滑动选择器
>

+ `**min**` - 最小值，默认值为 0
+ `**max**` - 最大值，默认值为 100
+ `**step**` - 步长，取值必须大于 0，并且可被(max - min)整除，默认值为 1
+ `**disabled**` - 是否禁用，默认值为 false
+ `**value**` - 当前取值，默认值为 0
+ `**activeColor**` - 滑块左侧已选择部分的线条颜色
+ `**backgroundColor**` - 滑块右侧背景条的颜色，默认值为 #e9e9e9
+ `**block-size**` - 滑块的大小，取值范围为 12 - 28，默认值为 28
+ `**block-color**` - 滑块的颜色，默认值为 #ffffff
+ `**show-value**` - 是否显示当前 value，默认值为 false
+ `**@change**` - 完成一次拖动后触发的事件，`event.detail = {value: value}`
+ `**@changing**` - 拖动过程中触发的事件，`event.detail = {value: value}`

```vue
<template>
  <view>
    <view class="uni-title">设置最小/最大值</view>
    <view>
      <slider value="100" @change="sliderChange" min="50" max="200" show-value />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    sliderChange(e) {
      console.log('value 发生变化：' + e.detail.value)
    }
  }
}
</script>
```

### [switch](https://uniapp.dcloud.net.cn/component/switch.html) - 开关选择器
> 开关选择器
>

+ **属性：**
    - `**checked**` - 是否选中，默认值为 false
    - `**disabled**` - 是否禁用，默认值为 false
    - `**type**` - 样式，有效值：switch, checkbox，默认值为 switch
    - `**color**` - switch 的颜色，同 css 的 color
    - `**@change**` - checked 改变时触发 change 事件，`event.detail={ value:checked}`

```vue
<template>
  <view class="uni-padding-wrap uni-common-mt">
    <view class="uni-title">默认样式</view>
    <view>
      <switch checked @change="switch1Change" />
      <switch @change="switch2Change" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    switch1Change(e) {
      console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    },
    switch2Change(e) {
      console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    }
  }
}
</script>
```

### [image](https://uniapp.dcloud.net.cn/component/image.html) - 图片
+ **注意：**
    - `**<image>**` 组件未设置宽高时，默认宽度 320px、高度 240px。尤其注意当图片加载失败时，widthFix 模式指定宽度的图片，虽然图片空白，但其高度会变成 240px；
    - 页面结构复杂，css样式太多的情况，使用 image 可能导致样式生效较慢，出现 “闪一下” 的情况，此时设置 `**image{will-change: transform}**`，可优化此问题
+ **属性：**
    - `**src**` - 图片资源地址
    - `**mode**` - 图片裁剪、缩放的模式，默认值为 'scaleToFill'
        * `**scaleToFill**` - 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
        * `**aspectFit**` - 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来
        * `**aspectFill**` - 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
    - `**lazy-load**` - 图片懒加载。只针对 page 与 scroll-view 下的 image 有效
    - `**@error**` - 当错误发生时，发布到 AppService 的事件名，事件对象`event.detail = {errMsg: 'something wrong'}`
    - `**@load**` - 当图片载入完毕时，发布到 AppService 的事件名，事件对象`event.detail = {height:'图片高度px', width:'图片宽度px'}`

```vue
<template>
  <view class="page">
    <view class="image-list">
      <view class="image-item" v-for="(item, index) in array" :key="index">
        <view class="image-content">
          <image
            style="width: 200px; height: 200px; background-color: #eeeeee"
            :mode="item.mode"
            :src="src"
            @error="imageError"
          ></image>
        </view>
        <view class="image-title">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      array: [
        {
          mode: 'scaleToFill',
          text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
        },
        {
          mode: 'aspectFit',
          text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
        },
        {
          mode: 'aspectFill',
          text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
        }
      ],
      src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg'
    }
  },
  methods: {
    imageError(e) {
      console.error('image发生error事件，携带值为' + e.detail.errMsg)
    }
  }
}
</script>
```

### [map](https://uniapp.dcloud.net.cn/component/map.html) - 地图
+ **属性：**
    - `**longitude**` - 中心经度
    - `**latitude**` - 中心纬度
    - `**scale**` - 缩放级别，取值范围为3-20，默认值为 16
    - `**markers**` - 标记点，类型为 Array
        * `**id**` - 标记点id。marker 点击事件回调会返回此 id。建议为每个 marker 设置上 Number 类型 id，保证更新 marker 时有更好的性能。最大限制 9 位数，必填项
        * `**latitude**` - 纬度。浮点数，范围 -90 ~ 90，必填项
        * `**longitude**` - 经度。浮点数，范围 -180 ~ 180，必填项
        * `**title**` - 标注点名。点击时显示，callout 存在时将被忽略
        * `**iconPath**` - 显示的图标。项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径，必填项
        * `**rotate**` - 旋转角度。顺时针旋转的角度，范围 0 ~ 360，默认为 0
        * `**alpha**` - 标注的透明度。默认 1，无透明，范围 0 ~ 1
        * `**width**` - 标注图标宽度。默认为图片实际宽度
        * `**height**` - 标注图标高度。默认为图片实际高度
        * `**callout**` - 自定义标记点上方的气泡窗口。可识别换行符
            + `**content**` - 文本
            + `**color**` - 文本颜色
            + `**fontSize**` - 文字大小
            + `**borderRadius**` - callout 边框圆角
            + `**borderWidth**` - 边框宽度，只支持微信小程序、京东小程序、百度小程序
            + `**borderColor**` - 边框颜色，只支持微信小程序、京东小程序、百度小程序
            + `**bgColor**` - 背景色
            + `**padding**` - 文本边缘留白
            + `**display**` - 'BYCLICK': 点击显示; 'ALWAYS': 常显
            + `**textAlign**` - 文本对齐方式。有效值: left, right, center
        * `**label**` - 为标记点旁边增加标签。可识别换行符
            + `**content**` - 文本
            + `**color**` - 文本颜色
            + `**fontSize**` - 文字大小
            + `**x**` - label的坐标，原点是 marker 对应的经纬度，只支持 H5、百度小程序
            + `**y**` - label的坐标，原点是 marker 对应的经纬度，只支持 H5、百度小程序
            + `**anchorX**` - label 的坐标，原点是 marker 对应的经纬度，只支持 App-nvue 2.1.5+、微信小程序
            + `**anchorY**` - label的坐标，原点是 marker 对应的经纬度，只支持 App-nvue 2.1.5+、微信小程序
            + `**borderWidth**` - 边框宽度
            + `**borderColor**` - 边框颜色
            + `**borderRadius**` - 边框圆角
            + `**bgColor**` - 背景色
            + `**padding **`- 文本边缘留白
            + `**textAlign**` - 文本对齐方式。有效值: left, right, center，只支持 App-nvue 2.1.5+、微信小程序、百度小程序
        * `**anchor**` - 经纬度在标注图标的锚点，默认底边中点。{x, y}，x 表示横向(0-1)，y 表示竖向 (0-1)。{x: .5, y: 1} 表示底边中点
    - `**polyline**` - 路线。指定一系列坐标点，从数组第一项连线至最后一项
        * `**points**` - 经纬度数组。[{latitude: 0, longitude: 0}]，必填项
        * `**color**` - 线的颜色。8位十六进制表示，后两位表示 alpha 值，如：#0000AA
        * `**width**` - 线的宽度
        * `**dottedLine**` - 是否虚线。默认 false
        * `**arrowLine**` - 带箭头的线。默认 false
        * `**arrowIconPath**` - 更换箭头图标。在 arrowLine 为 true 时生效
        * `**borderColor**` - 线的边框颜色
        * `**borderWidth**` - 线的厚度
    - `**circles**` - 圆。在地图上显示圆
        * `**latitude**` - 纬度。浮点数，范围 -90 ~ 90，必填项
        * `**longitude**` - 经度。浮点数，范围 -180 ~ 180，必填项
        * `**color**` - 描边的颜色。8位十六进制表示，后两位表示alpha值，如：#000000AA；#00000为十六进制
        * `**fillColor**` - 填充颜色。8位十六进制表示，后两位表示alpha值，如：#000000AA；#00000为十六进制
        * `**radius**` - 半径。必填项
        * `**strokeWidth**` - 描边的宽度
    - `**controls**` - 控件。在地图上显示控件，控件不随着地图移动
        * `**id**` - 控件id。在控件点击事件回调会返回此id
        * `**position**` - 控件在地图的位置。控件相对地图位置，必填项
            + `**left**` - 距离地图的左边界多远。默认为 0
            + `**top**` - 距离地图的上边界多远。默认为 0
            + `**width**` - 控件宽度。默认为图片宽度
            + `**height**` - 控件高度。默认为图片高度
        * `**iconPath**` - 显示的图标。项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对项目根目录；也支持临时路径，必填项
        * `**clickable**` - 是否可点击。默认不可点击
    - `**include-points**` - 缩放视野以包含所有给定的坐标点
    - `**show-location**` - 显示带有方向的当前定位点
    - `**polygons**` - 多边形（支付宝为: `**polygon**`）。指定一系列坐标点，根据 points 坐标数据生成闭合多边形
        * `**points**` - 经纬度数组。[{latitude: 0, longitude: 0}]，必填项
        * `**strokeWidth**` - 描边的宽度。
        * `**strokeColor**` - 描边的颜色。十六进制
        * `**fillColor**` - 填充颜色。十六进制
        * `**zIndex**` - 设置多边形 Z 轴数值
    - `**@markertap**` - 点击标记点时触发，`e.detail = {markerId}`
    - `**@callouttap**` - 点击标记点对应的气泡时触发，`e.detail = {markerId}`
    - `**@controltap**` - 点击控件时触发，`e.detail = {controlId}`
    - `**@regionchange**` - 视野发生变化时触发
    - `**@tap**` - 点击地图时触发
    - `**@updated**` - 在地图渲染更新完成时触发

```vue
<template>
  <view>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          style="width: 100%; height: 300px"
          :latitude="latitude"
          :longitude="longitude"
          :markers="covers"
        >
        </map>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: 0, // 使用 marker点击事件 需要填写id
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: '../../../static/location.png'
        },
        {
          latitude: 39.9,
          longitude: 116.39,
          iconPath: '../../../static/location.png'
        }
      ]
    }
  },
  methods: {}
}
</script>
```

### [canvas](https://uniapp.dcloud.net.cn/component/canvas.html) - 画布
+ **注意：**canvas 标签默认宽度 300px、高度 225px，动态修改 canvas 大小后需要重新绘制。
+ **属性：**
    - `**type**` - 指定 canvas 类型，支持 2d (2.9.0) 和 webgl，只支持 微信小程序 2.7.0+、抖音小程序1.78.0+
    - `**canvas-id**` - canvas 组件的唯一标识符
    - `**disable-scroll**` - 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新，默认值为 false
    - `**@longtap**` - 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动
    - `**@error**` - 当发生错误时触发 error 事件，`detail = {errMsg: 'something wrong'}`

```vue
<template>
  <view>
    <canvas style="width: 300px; height: 200px" canvas-id="firstCanvas" id="firstCanvas"></canvas>
    <canvas style="width: 400px; height: 500px" canvas-id="secondCanvas" id="secondCanvas"></canvas>
    <canvas
      style="width: 400px; height: 500px"
      canvas-id="secondCanvas"
      id="secondCanvas"
      @error="canvasIdErrorCallback"
    ></canvas>
  </view>
</template>

<script>
export default {
  onReady: function (e) {
    var context = uni.createCanvasContext('firstCanvas')
    context.setStrokeStyle('#00ff00')
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle('#ff0000')
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
  },
  methods: {
    canvasIdErrorCallback: function (e) {
      console.error(e.detail.errMsg)
    }
  }
}
</script>
```

### [web-view](https://uniapp.dcloud.net.cn/component/web-view.html) - web 容器
> web-view 是一个 web 浏览器组件，可以用来承载网页的容器，会自动铺满整个页面（nvue 使用需要手动指定宽高）。
>

+ **注意：**
    - 各小程序平台，web-view 加载的 url 需要在后台配置域名白名单，包括内部再次 iframe 内嵌的其他 url 。
    - 小程序仅支持加载网络网页，不支持本地 html
    - App 平台同时支持网络网页和本地网页，但本地网页及相关资源（js、css等文件）必须放在 `**<font style="color:rgba(233,105,0,1);">uni-app 项目根目录->hybrid->html</font>**` 文件夹下或者 `**<font style="color:rgba(233,105,0,1);">static</font>**` 目录下，如下为一个加载本地网页的uni-app项目文件目录示例：
+ **属性：**
    - `**src**` - webview 指向网页的链接
    - `**webview-styles**` - webview 的样式
        * `**progress**` - 进度条样式。仅加载网络 HTML 时生效，设置为 false 时禁用进度条
            + `**color**` - 进度条颜色，默认值为 #00FF00
        * `**width**` - web-view 组件的宽度。
        * `**height**` - web-view 组件的高度

```vue
<template>
  <view>
    <web-view
      :webview-styles="webviewStyles"
      src="https://uniapp.dcloud.io/static/web-view.html"
    ></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: '#FF3333'
        }
      }
    }
  }
}
</script>
```

## 常用 API
### [uni.base64ToArrayBuffer()](https://uniapp.dcloud.net.cn/api/base64ToArrayBuffer.html)
> 将 Base64 字符串转成 ArrayBuffer 对象
>

+ **语法：**`**uni.base64ToArrayBuffer(base64)**`
+ **参数：**`**base64**` - 要转化成 ArrayBuffer 对象的 Base64 字符串

```javascript
const base64 = 'test'
const arrayBuffer = uni.base64ToArrayBuffer(base64)
```

### [uni.arrayBufferToBase64()](https://uniapp.dcloud.net.cn/api/arrayBufferToBase64.html)
> 将 ArrayBuffer 对象转成 Base64 字符串
>

+ **语法：**`**uni.arrayBufferToBase64(arrayBuffer)**`
+ **参数：**`**arrayBuffer**` - 要转换成 Base64 字符串的 ArrayBuffer 对象

```javascript
const arrayBuffer = new Uint8Array([55, 55, 55])
const base64 = uni.arrayBufferToBase64(arrayBuffer)
```

### 拦截器
#### [uni.addInterceptor()](https://uniapp.dcloud.net.cn/api/interceptor.html#addinterceptor)
> 添加拦截器
>

+ **语法：**`**uni.addInterceptor(STRING, OBJECT)**`
+ **参数：**
    - `**STRING**` - 需要拦截的 `**<font style="color:rgba(233,105,0,1);">api</font>**` 名称，如：`**<font style="color:rgba(233,105,0,1);">uni.addInterceptor('request', OBJECT) </font>**`，将拦截 `**<font style="color:rgba(233,105,0,1);">uni.request()</font>**`，**仅支持异步接口**
    - `**OBJECT**`
        * `**invoke**` - 拦截前触发
        * `**returnValue**` - 方法调用后触发，处理返回值
        * `**success**` - 成功回调拦截
        * `**fail**` - 失败回调拦截
        * `**complete**` - 完成回调拦截

```javascript
uni.request({
  url: 'request/login', // 仅为示例，并非真实接口地址。
  success: res => {
    console.log(res.data)
    // 打印： {code:1,...}
  }
})

uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url
    args.url = 'https://www.example.com/' + args.url
  },
  success(args) {
    // 请求成功后，修改code值为1
    args.data.code = 1
  },
  fail(err) {
    console.log('interceptor-fail', err)
  },
  complete(res) {
    console.log('interceptor-complete', res)
  }
})

uni.addInterceptor({
  returnValue(args) {
    // 只返回 data 字段
    return args.data
  }
})
```

#### [uni.removeInterceptor()](https://uniapp.dcloud.net.cn/api/interceptor.html#removeinterceptor)
> 删除拦截器
>

+ **语法：**`**uni.removeInterceptor(STRING)**`
+ **参数：**`**STRING**` - 需要删除拦截器的 `**<font style="color:rgba(233,105,0,1);">api</font>**` 名称

```javascript
uni.removeInterceptor('request')
```

### [uni.canIUse()](https://uniapp.dcloud.net.cn/api/caniuse.html)
> 判断应用的 API，回调，参数，组件等是否在当前版本可用
>

+ **语法：**`**uni.canIUse(String)**`
+ **参数：**
+ 使用 `**<font style="color:rgba(233,105,0,1);">${API}.${method}.${param}.${options}</font>**` 或者 `**<font style="color:rgba(233,105,0,1);">${component}.${attribute}.${option}</font>**` 方式来调用
    - `**${API}**` - 代表 API 名字
    - `**${method}**` - 代表调用方式，有效值为 return, success, object, callback
    - `**${param}**` - 代表参数或者返回值
    - `**${options}**` - 代表参数的可选值
    - `**${component}**` - 代表组件名字
    - `**${attribute}**` - 代表组件属性
    - `**${option}**` - 代表组件属性的可选值
+ **提示：**App、web 端暂不支持 `**<font style="color:rgba(233,105,0,1);">${API}.${method}.${param}.${options}</font>**` 方式调用，只支持 `**<font style="color:rgba(233,105,0,1);">${API}</font>**`

```javascript
uni.canIUse('getSystemInfoSync.return.screenWidth')
uni.canIUse('getSystemInfo.success.screenWidth')
uni.canIUse('showToast.object.image')
uni.canIUse('request.object.method.GET')

uni.canIUse('live-player')
uni.canIUse('text.selectable')
uni.canIUse('button.open-type.contact')
```

### 上传、下载
#### [uni.uploadFile()](https://uniapp.dcloud.net.cn/api/request/network-file.html#uploadfile)
> 将本地资源上传到开发者服务器，客户端发起一个 `**<font style="color:rgba(233,105,0,1);">POST</font>**` 请求，其中 `**<font style="color:rgba(233,105,0,1);">content-type</font>**` 为 `**<font style="color:rgba(233,105,0,1);">multipart/form-data</font>**`。
>

+ **语法：**`**uni.uploadFile(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**url**` - 开发者服务器 url，必填项
        * `**filePath**` - 要上传文件资源的路径，必填项
        * `**name**` - 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容，必填项
        * `**header**` - HTTP 请求 Header, header 中不能设置 Referer
        * `**timeout**` - 超时时间，单位 ms
        * `**formData**` - HTTP 请求中其他额外的 form data
        * `**success**` - 接口调用成功的回调函数，返回参数如下：
            + `**data**` - 开发者服务器返回的数据
            + `**statusCode**` - 开发者服务器返回的 HTTP 状态码
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**uploadTask**` 对象的方法列表
    - `**abort**` - 中断上传任务
    - `**onProgressUpdate**` - 监听上传进度变化，返回参数如下：
        * `**progress**` - 上传进度百分比
        * `**totalBytesSent**` - 已经上传的数据长度，单位 Bytes
        * `**totalBytesExpectedToSend**` - 预期需要上传的数据总长度，单位 Bytes
+ **注意：**
    - 网络请求的 `<font style="color:rgba(233,105,0,1);">超时时间</font>` 可以统一在 `**manifest.json**` 中配置 [networkTimeout](https://uniapp.dcloud.net.cn/collocation/manifest#networktimeout)
    - 如果希望返回一个 `**<font style="color:rgba(233,105,0,1);">uploadTask</font>**` 对象，需要至少传入 success / fail / complete 参数中的一个

```javascript
uni.chooseImage({
  success: chooseImageRes => {
    const tempFilePaths = chooseImageRes.tempFilePaths
    const uploadTask = uni.uploadFile({
      url: 'https://www.example.com/upload', // 仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        user: 'test'
      },
      success: uploadFileRes => {
        console.log(uploadFileRes.data)
      }
    })

    uploadTask.onProgressUpdate(res => {
      console.log('上传进度' + res.progress)
      console.log('已经上传的数据长度' + res.totalBytesSent)
      console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend)

      // 测试条件，取消上传任务。
      if (res.progress > 50) {
        uploadTask.abort()
      }
    })
  }
})

var uploadTask = uni.uploadFile({
  url: 'https://www.example.com/upload', // 仅为示例，并非真实接口地址。
  complete: () => {}
})
uploadTask.abort()
```

#### [uni.downloadFile()](https://uniapp.dcloud.net.cn/api/request/network-file.html#downloadfile)
> 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
>

+ **语法：**`**uni.downloadFile(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**url**` - 下载资源的 url，必填项
        * `**header**` - HTTP 请求 Header, header 中不能设置 Referer
        * `**timeout**` - 超时时间，单位 ms
        * `**filePath**` - 指定文件下载后存储的路径 (本地路径)，仅支持小程序端
        * `**success**` - 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}，返回参数如下：
            + `**tempFilePath**` - 临时文件路径，下载后的文件会存储到一个临时文件
            + `**statusCode**` - 开发者服务器返回的 HTTP 状态码
            + `**filePath**` - 用户文件路径 (本地路径)。传入 filePath 时会返回，跟传入的 filePath 一致
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**downloadTask**` 对象的方法列表
    - `**abort**` - 中断下载任务
    - `**onProgressUpdate**` - 监听下载进度变化，返回参数如下：
        * `**progress**` - 下载进度百分比
        * `**totalBytesWritten**` - 已经下载的数据长度，单位 Bytes
        * `**totalBytesExpectedToWrite**` - 预期需要下载的数据总长度，单位 Bytes
+ **注意：**
    - 网络请求的 `<font style="color:rgba(233,105,0,1);">超时时间</font>` 可以统一在 `**manifest.json**` 中配置 [networkTimeout](https://uniapp.dcloud.net.cn/collocation/manifest#networktimeout)
    - 如果希望返回一个 `**<font style="color:rgba(233,105,0,1);">downloadTask</font>**` 对象，需要至少传入 success / fail / complete 参数中的一个

```javascript
const downloadTask = uni.downloadFile({
  url: 'http://www.example.com/file/test', // 仅为示例，并非真实的资源
  success: res => {
    if (res.statusCode === 200) {
      console.log('下载成功')
    }
  }
})

downloadTask.onProgressUpdate(res => {
  console.log('下载进度' + res.progress)
  console.log('已经下载的数据长度' + res.totalBytesWritten)
  console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite)

  // 满足测试条件，取消下载任务。
  if (res.progress > 50) {
    downloadTask.abort()
  }
})

const downloadTask2 = uni.downloadFile({
  url: 'https://www.example.com/file/test', // 仅为示例，并非真实接口地址。
  complete: () => {}
})
downloadTask2.abort()
```

### WebSocket
#### [uni.connectSocket()](https://uniapp.dcloud.net.cn/api/request/websocket.html#connectsocket)
> 创建一个 WebSocket 连接
>

+ **语法：**`**uni.connectSocket(OBJECT)**`
+ **属性：**
    - `**OBJECT**`
        * `**url**` - 服务器接口地址，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**SocketTask**` 的方法
    - `**send**` - 通过 WebSocket 连接发送数据
    - `**close**` - 关闭 WebSocket 连接
    - `**onOpen**` - 监听 WebSocket 连接打开事件
    - `**onClose**` - 监听 WebSocket 连接关闭事件
    - `**onError**` - 监听 WebSocket 错误
    - `**onMessage**` - 监听 WebSocket 接受到服务器的消息事件
+ **注意：**
    - 网络请求的 `<font style="color:rgba(233,105,0,1);">超时时间</font>` 可以统一在 `**manifest.json**` 中配置 [networkTimeout](https://uniapp.dcloud.net.cn/collocation/manifest#networktimeout)
    - 如果希望返回一个 `**<font style="color:rgba(233,105,0,1);">socketTask</font>**` 对象，需要至少传入 success / fail / complete 参数中的一个

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket',
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol1'],
  method: 'GET'
})

var socketTask = uni.connectSocket({
  url: 'wss://www.example.com/socket', // 仅为示例，并非真实接口地址。
  complete: () => {}
})
```

#### [uni.sendSocketMessage()](https://uniapp.dcloud.net.cn/api/request/websocket.html#sendsocketmessage)
> 通过 WebSocket 连接发送数据，需要先 uni.connectSocket，并在 uni.onSocketOpen 回调之后才能发送
>

+ **语法：**`**uni.sendSocketMessage(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**data**` - 需要发送的内容，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ **注意：**出于性能的权衡，在 Android 端底层实现上发送队列占用的内存不能超过 16M，一旦超过将导致连接被关闭。

```javascript
var socketOpen = false
var socketMsgQueue = []

uni.connectSocket({
  url: 'wss://www.example.com/socket'
})

uni.onSocketOpen(function (res) {
  socketOpen = true
  for (var i = 0; i < socketMsgQueue.length; i++) {
    sendSocketMessage(socketMsgQueue[i])
  }
  socketMsgQueue = []
})

function sendSocketMessage(msg) {
  if (socketOpen) {
    uni.sendSocketMessage({
      data: msg
    })
  } else {
    socketMsgQueue.push(msg)
  }
}
```

#### [uni.closeSocket()](https://uniapp.dcloud.net.cn/api/request/websocket.html#closesocket)
> 关闭 WebSocket 连接
>

+ **语法：**`**uni.closeSocket(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**code**` - 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
        * `**reason**` - 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于 123 字节的 UTF-8 文本（不是字符）
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
})

// 注意这里有时序问题，
// 如果 uni.connectSocket 还没回调 uni.onSocketOpen，而先调用 uni.closeSocket，那么就做不到关闭 WebSocket 的目的。
// 必须在 WebSocket 打开期间调用 uni.closeSocket 才能关闭。
uni.onSocketOpen(function () {
  uni.closeSocket()
})
```

#### [uni.onSocketOpen()](https://uniapp.dcloud.net.cn/api/request/websocket.html#onsocketopen)
> 监听 WebSocket 连接打开事件
>

+ **语法：**`**uni.onSocketOpen(CALLBACK)**`
+ **参数：**
    - `**CALLBACK**`
        * `**header**` - 连接成功的 HTTP 响应 Header

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
})
uni.onSocketOpen(function (res) {
  console.log('WebSocket连接已打开！')
})
```

#### [uni.onSocketError()](https://uniapp.dcloud.net.cn/api/request/websocket.html#onsocketerror)
> 监听 WebSocket 错误
>

+ **语法：**`**uni.onSocketError(CALLBACK)**`

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
})
uni.onSocketOpen(function (res) {
  console.log('WebSocket连接已打开！')
})
uni.onSocketError(function (res) {
  console.log('WebSocket连接打开失败，请检查！')
})
```

#### [uni.onSocketMessage()](https://uniapp.dcloud.net.cn/api/request/websocket.html#onsocketmessage)
> 监听 WebSocket 接受到服务器的消息事件
>

+ **语法：**`**uni.onSocketMessage(CALLBACK)**`
+ **参数：**
    - `**CALLBACK**`
        * `**data**` - 服务器返回的消息

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
})

uni.onSocketMessage(function (res) {
  console.log('收到服务器内容：' + res.data)
})
```

#### [uni.onSocketClose()](https://uniapp.dcloud.net.cn/api/request/websocket.html#onsocketclose)
> 监听 WebSocket 关闭
>

+ **语法：**`**uni.onSocketClose(CALLBACK)**`

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
})

// 注意这里有时序问题，
// 如果 uni.connectSocket 还没回调 uni.onSocketOpen，而先调用 uni.closeSocket，那么就做不到关闭 WebSocket 的目的。
// 必须在 WebSocket 打开期间调用 uni.closeSocket 才能关闭。
uni.onSocketOpen(function () {
  uni.closeSocket()
})

uni.onSocketClose(function (res) {
  console.log('WebSocket 已关闭！')
})
```

### [uni.preloadPage()](https://uniapp.dcloud.net.cn/api/preload-page.html#preloadpage)
> 预加载页面，是一种性能优化技术。被预载的页面，在打开时速度更快
>

+ **语法：**`**uni.preloadPage(OBJECT)**`
+ **属性：**
    - `**OBJECT**`
        * `**url**` - 预加载页面 url，必填项
        * `**success**` - 预加载成功完成回调
        * `**fail**` - 预加载失败回调
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ **注意：**
    - App 平台仅支持预加载 nvue 页面，执行页面预渲染，预载时触发生命周期 onLoad，onReady，不触发 onShow
    - 打开新页面时，url 完全相同（包含参数）时，优先使用预加载页面，触发生命周期 onShow
    - 当同一个预载页面已被打开(在路由栈)，再次打开相同 url 时，不再使用该预加载页面，而是打开新的非预载页面
    - `**<font style="color:rgba(233,105,0,1);">uni.reLanuch</font>**`, `**<font style="color:rgba(233,105,0,1);">uni.switchTab</font>**`, `**<font style="color:rgba(233,105,0,1);">uni.navigateBack</font>**`(含Android返回键) 切换页面时，预加载页面不会被销毁，仅触发生命周期 onHide

```javascript
uni.preloadPage({ url: '/pages/test/test' }) // 预加载 /pages/test/test 页面（仅触发onLoad，onReady)
uni.navigateTo({ url: '/pages/test/test' }) // url匹配，跳转预加载页面（仅触发onShow)
uni.navigateTo({ url: '/pages/test/test?a=b' }) // url不匹配，正常打开新页面
```

### 发起请求
#### [uni.request()](https://uniapp.dcloud.net.cn/api/request/request.html)
> 发起网络请求
>

+ **语法：**`**uni.request(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**url**` - 开发者服务器接口地址，必填项
        * `**data**` - 请求的参数
        * `**header**` - 设置请求的 header，header 中不能设置 Referer
        * `**method**` - 有效值详见下方说明，默认值为 GET
        * `**timeout**` - 超时时间，单位 ms，默认值为 60000
        * `**dataType**` - 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse，默认值为 json
        * `**responseType**` - 设置响应的数据类型。合法值：text、arraybuffer，默认值为 text
        * `**success**` - 收到开发者服务器成功返回的回调函数，返回参数如下：
            + `**data**` - 开发者服务器返回的数据
            + `**statusCode**` - 开发者服务器返回的 HTTP 状态码
            + `**header**` - 开发者服务器返回的 HTTP Response Header
            + `**cookies**` - 开发者服务器返回的 cookies，格式为字符串数组
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**RequestTask**` 的方法
    - `**abort**` - 中断网络请求
+ **注意：**如果希望返回一个 `**requestTask**` 对象，需要至少传入 success / fail / complete 参数中的一个

```javascript
uni.request({
  url: 'https://www.example.com/request', // 仅为示例，并非真实接口地址。
  data: {
    text: 'uni.request'
  },
  header: {
    'custom-header': 'hello' // 自定义请求头信息
  },
  success: res => {
    console.log(res.data)
    this.text = 'request success'
  }
})

var requestTask = uni.request({
  url: 'https://www.example.com/request', // 仅为示例，并非真实接口地址。
  complete: () => {}
})
requestTask.abort()
```

### 页面调用接口
#### [getApp()](https://uniapp.dcloud.net.cn/tutorial/page.html#getapp)
> 获取小程序实例
>

+ **注意：**
    - 不要在定义于 `**<font style="color:rgba(233,105,0,1);">App()</font>**` 内的函数中，或调用 `**<font style="color:rgba(233,105,0,1);">App</font>**` 前调用 `**<font style="color:rgba(233,105,0,1);">getApp()</font>**`，可以通过 `**<font style="color:rgba(233,105,0,1);">this.$scope</font>**` 获取对应的 app 实例
    - 当在首页 `**<font style="color:rgba(233,105,0,1);">nvue</font>**` 中使用 `**<font style="color:rgba(233,105,0,1);">getApp()</font>**` 不一定可以获取真正的 `**<font style="color:rgba(233,105,0,1);">App</font>**` 对象。对此提供了 `**<font style="color:rgba(233,105,0,1);">const app = getApp({allowDefault: true})</font>**` 用来获取原始的 `**<font style="color:rgba(233,105,0,1);">App</font>**` 对象，可以用来在首页对 `**<font style="color:rgba(233,105,0,1);">globalData</font>**` 等初始化

```javascript
const app = getApp()
console.log(app.globalData)
app.doSomething() // 调用 App.vue methods 中的 doSomething 方法
```

#### [getCurrentPages()](https://uniapp.dcloud.net.cn/api/window/window.html#getcurrentpages)
> 获取当前页面栈
>

+ **注意：**`**<font style="color:rgba(233,105,0,1);">getCurrentPages()</font>**` 仅用于展示页面栈的情况，请勿修改页面栈，以免造成页面状态错误。

```javascript
const pages = getCurrentPages()
const page = pages[pages.length - 1] // 当前页面

page.$getAppWebview() // 获取当前页面的 webview 对象实例
page.$vm // 当前页面的 Vue 实例
page.route // 获取当前页面的路由
```

#### [$getAppWebview()](https://uniapp.dcloud.net.cn/api/window/window.html#getappwebview)
> 获取当前页面 webview 的对象实例
>

+ **注意：此方法仅 App 支持**

```javascript
export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  onLoad() {
    // 获取当前页面 webview 的对象实例
    // #ifdef APP-PLUS
    const currentWebview = this.$scope.$getAppWebview() // 此对象相当于html5plus里的 plus.webview.currentWebview()。在uni-app里vue页面直接使用 plus.webview.currentWebview() 无效
    currentWebview.setBounce({ position: { top: '100px' }, changeoffset: { top: '0px' } }) // 动态重设bounce效果
    // #endif

    // 获取指定页面 webview 的对象实例
    // #ifdef APP-PLUS
    const pages = getCurrentPages()
    const targetPage = pages[pages.length - 2] // 获取上一级页面
    const targetWebview = targetPage.$getAppWebview() // 获取上一级页面的webview对象
    console.log(targetWebview.id) // 获取目标webview的id
    console.log(targetWebview.isVisible()) // 查询目标webview是否可见
    // #endif
  }
}
```

#### [$vm](https://uniapp.dcloud.net.cn/api/window/window.html#vm)
> 获取当前页面的 Vue 实例
>

```javascript
const page = getCurrentPages()[0]
const vm = page.$vm
// 监听生命周期，小程序端部分其他生命周期需在页面选项中配置过才可生效
vm.$on('hook:onHide', () => {
  console.log('onHide')
})
// 获取页面数据
console.log(vm.$data.title)
// 调用页面方法
vm.test()
```

### 路由跳转
:::info
**Tips：**

+ `**navigateTo**`, `**redirectTo**` 只能打开非 `**tabBar**` 页面。
+ `**switchTab**` 只能打开 `**tabBar**` 页面。
+ `**reLaunch**` 可以打开任意页面。
+ 不能在首页 `**onReady**` 之前进行页面跳转。
+ H5端页面刷新之后页面栈会消失，此时 `**navigateBack**` 不能返回，如果一定要返回可以使用 `**history.back()**` 导航到浏览器的其他历史记录

:::

#### [navigator](https://uniapp.dcloud.net.cn/component/navigator.html)
> 页面跳转
>

+ **注意：**跳转 tabbar 页面，必须设置 open-type="switchTab"
+ **属性：**
    - `**url**` - 应用内的跳转链接，值为相对路径或绝对路径，如："../first/first"，"/pages/first/first"，注意不能加 `**.vue**` 后缀
    - `**open-type**` - 跳转方式，默认值为 navigate
        * `**navigate**` - 对应 uni.navigateTo 的功能
        * `**redirect**` - 对应 uni.redirectTo 的功能
        * `**switchTab**` - 对应 uni.switchTab 的功能
        * `**reLaunch**` - 对应 uni.reLaunch 的功能
        * `**navigateBack**` - 对应 uni.navigateBack 的功能
    - `**hover-class**` - 指定点击时的样式类，当hover-class="none"时，没有点击态效果，默认值为 navigator-hover

```vue
<template>
	<view>
		<view class="page-body">
			<view class="btn-area">
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<button type="default">跳转到新页面</button>
				</navigator>
				<navigator url="redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">
					<button type="default">在当前页打开</button>
				</navigator>
				<navigator url="/pages/tabBar/extUI/extUI" open-type="switchTab" hover-class="other-navigator-hover">
					<button type="default">跳转tab页面</button>
				</navigator>
        
        <!-- url 有长度限制，太长的字符串会传递失败，可以使用 encodeURIComponent 等多种方式解决 -->
        <navigator :url="'/pages/navigate/navigate?item='+ encodeURIComponent(JSON.stringify(item))"></navigator>
			</view>
		</view>
	</view>
</template>
<script>
// navigate.vue页面接受参数
export default {
	onLoad(option) { // option为object类型，会序列化上个页面传递的参数
		console.log(option.id); // 打印出上个页面传递的参数。
		console.log(option.name); // 打印出上个页面传递的参数。
    
    const item = JSON.parse(decodeURIComponent(option.item));
	}
}
</script>
```

#### [uni.navigateTo()](https://uniapp.dcloud.net.cn/api/router.html#navigateto)
> 保留当前页面，跳转到应用内的某个页面，使用 `**<font style="color:rgba(233,105,0,1);">uni.navigateBack()</font>**` 可以返回到原页面
>

+ **语法：**`**uni.navigateTo(OBJECT)**`
+ **属性：**
    - `**OBJECT**`
        * `**url**` - 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数，必填项
        * `**events**` - 页面间通信接口，用于监听被打开页面发送到当前页面的数据
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ **注意：**路由 API 的目标页面必须是在 pages.json 里注册的 vue 页面。如果想打开 web url，在 App 平台可以使用 [plus.runtime.openURL](http://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.openURL) 或 web-view 组件；H5 平台使用 window.open；小程序平台使用 web-view 组件（url 需在小程序的联网白名单中）。在 hello uni-app 中有个组件 ulink.vue 已对多端进行封装，可参考。

```javascript
// 在起始页面跳转到test.vue页面并传递参数
uni.navigateTo({
  url: 'test?id=1&name=uniapp'
})

// 在test.vue页面接受参数
export default {
  // option为object类型，会序列化上个页面传递的参数
  onLoad(option) {
    console.log(option.id) // 打印出上个页面传递的参数。
    console.log(option.name) // 打印出上个页面传递的参数。
  }
}

// 在起始页面跳转到test.vue页面，并监听test.vue发送过来的事件数据
uni.navigateTo({
  url: '/pages/test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage(data) {
      console.log(data)
    },
    someEvent(data) {
      console.log(data)
    }
    // ...
  },
  success(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'data from starter page' })
  }
})

// 在test.vue页面，向起始页通过事件传递数据
export default {
  onLoad(option) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'data from test page' })
    eventChannel.emit('someEvent', { data: 'data from test page for someEvent' })
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
    })
  }
}
```

#### [uni.redirectTo()](https://uniapp.dcloud.net.cn/api/router.html#redirectto)
> 关闭当前页面，跳转到应用内的某个页面
>

+ **语法：**`**uni.redirectTo(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**url**` - 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.redirectTo({
  url: 'test?id=1'
})
```

#### [uni.reLaunch()](https://uniapp.dcloud.net.cn/api/router.html#relaunch)
> 关闭所有页面，打开到应用内的某个页面
>

+ **语法：**`**uni.reLaunch(OBJECT)**`
+ **参数：**
    - **OBJECT**
        * `**url**` - 需要跳转的应用内页面路径 , 路径后可以带参数
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ **注意：**H5端调用 `**uni.reLaunch**` 之后之前页面栈会销毁，但是无法清空浏览器之前的历史记录，此时 `**navigateBack**` 不能返回，如果存在历史记录的话点击浏览器的返回按钮或者调用 `**history.back()**` 仍然可以导航到浏览器的其他历史记录

```javascript
uni.reLaunch({
  url: 'test?id=1'
})
```

```javascript
// test 页面
export default {
  onLoad(option) {
    console.log(option.id)
  }
}
```

#### [uni.switchTab()](https://uniapp.dcloud.net.cn/api/router.html#switchtab)
> 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
>

+ **语法：**`**uni.switchTab(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**url**` - 需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

_**pages.json**_

```json
{
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/other/other",
        "text": "其他"
      }
    ]
  }
}
```

_**other.vue**_

```javascript
uni.switchTab({
  url: '/pages/index/index'
})
```

#### [uni.navigateBack()](https://uniapp.dcloud.net.cn/api/router.html#navigateback)
> 关闭当前页面，返回上一页面或多级页面。可通过 `**getCurrentPages()**` 获取当前的页面栈，决定需要返回几层
>

+ **语法：**`**uni.navigateBack(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**delta**` - 默认值为 1，返回的页面数，如果 delta 大于现有页面数，则返回到首页
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ **注意：**调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。

```javascript
// 此处是A页面
uni.navigateTo({
  url: 'B?id=1'
})

// 此处是B页面
uni.navigateTo({
  url: 'C?id=1'
})

// 在C页面内 navigateBack，将返回A页面
uni.navigateBack({
  delta: 2
})
```

### 页面通讯
#### [uni.$emit()](https://uniapp.dcloud.net.cn/api/window/communication.html#emit)
> 触发全局的自定义事件，附加参数都会传给监听器回调函数
>

+ **语法：**`**uni.$emit(eventName,OBJECT)**`
+ **参数：**
    - `**eventName**` - 事件名
    - `**OBJECT**` - 触发事件携带的附加参数

```javascript
uni.$emit('update', { msg:'页面更新' })
```

#### [uni.on()](https://uniapp.dcloud.net.cn/api/window/communication.html#on)
> 监听全局的自定义事件，事件由 `**<font style="color:rgba(233,105,0,1);">uni.$emit</font>**` 触发，回调函数会接收事件触发函数的传入参数
>

+ **语法：**`**uni.$on(eventName,callback)**`
+ **参数：**
    - `**eventName**` - 事件名
    - `**callback**` - 事件的回调函数

```javascript
uni.$on('update', function (data) {
  console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg)
})
```

#### [uni.$once()](https://uniapp.dcloud.net.cn/api/window/communication.html#once)
> 监听全局的自定义事件。事件可以由 `**<font style="color:rgba(233,105,0,1);">uni.$emit</font>**` 触发，但是只触发一次，在第一次触发之后移除该监听器
>

+ **语法：**`**uni.$once(eventName,callback)**`
+ **参数：**
    - `**eventName**` - 事件名
    - `**callback**` - 事件的回调函数

```javascript
uni.$once('update', function (data) {
  console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg)
})
```

#### [uni.$off()](https://uniapp.dcloud.net.cn/api/window/communication.html#off)
> 移除全局自定义事件监听器
>

+ **语法：**`**uni.$off(eventName, callback)**`
+ **参数：**
    - `**eventName**` - 事件名
    - `**callback**` - 事件的回调函数
+ **提示：**
    - 如果没有提供参数，则移除所有的事件监听器
    - 如果只提供了事件，则移除该事件所有的监听器
    - 如果同时提供了事件与回调，则只移除这个回调的监听器，需要跟 $on 的回调为同一个
+ **注意：**
    - uni.$emit、 uni.$on 、 uni.$once 、uni.$off 触发的事件都是 App 全局级别的，跨任意组件，页面，nvue，vue 等
    - 使用时，注意及时销毁事件监听，比如，页面 onLoad 里边 uni.$on 注册监听，onUnload 里边 uni.$off 移除，或者一次性的事件，直接使用 uni.$once 监听

```vue
<template>
  <view class="content">
    <view class="data">
      <text>{{ val }}</text>
    </view>
    <button type="primary" @click="comunicationOff">结束监听</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      val: 0
    }
  },
  onLoad() {
    setInterval(() => {
      uni.$emit('add', {
        data: 2
      })
    }, 1000)
    uni.$on('add', this.add)
  },
  methods: {
    comunicationOff() {
      uni.$off('add', this.add)
    },
    add(e) {
      this.val += e.data
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.data {
  text-align: center;
  line-height: 40px;
  margin-top: 40px;
}

button {
  width: 200px;
  margin: 20px 0;
}
</style>
```

#### [EventChannel](https://uniapp.dcloud.net.cn/api/router.html#event-channel)
> 页面间事件通信通道
>

+ **方法：**
    - `**EventChannel.emit()**` - 触发一个事件
    - `**EventChannel.off()**` - 取消监听一个事件。给出第二个参数时，只取消给出的监听函数，否则取消所有监听函数
    - `**EventChannel.on()**` - 持续监听一个事件
    - `**EventChannel.once()**` - 监听一个事件一次，触发后失效

_**pages/pageA/pageA.vue**_

```vue
<template>
  <view>
    <button @click="navigateToPageB">跳转到 Page B</button>
  </view>
</template>

<script>
export default {
  methods: {
    navigateToPageB() {
      // 使用 navigateTo 跳转到 pageB，并传递 EventChannel
      uni.navigateTo({
        url: '/pages/pageB/pageB',
        success: res => {
          const eventChannel = res.eventChannel // 获取 EventChannel 实例
          // 向 pageB 发送数据
          eventChannel.emit('acceptDataFromOpenerPage', { data: '来自 Page A 的数据' })
        }
      })
    }
  }
}
</script>
```

_**pages/pageB/pageB.vue**_

```vue
<template>
  <view>
    <text>{{ receivedData }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      receivedData: ''
    }
  },
  onLoad(options, eventChannel) {
    // 通过 eventChannel 接收数据
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data => {
      this.receivedData = data.data // 获取 Page A 发送的数据
    })
  }
}
</script>
```

### 数据缓存
#### [uni.setStorage()](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstorage)
> 将数据存储在本地缓存指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
>

+ **语法：**`**uni.setStorage(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**key**` - 本地缓存中的指定的 key，必填项
        * `**data**` - 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ **注意：**`**<font style="color:rgba(233,105,0,1);">uni-</font>**`、`**<font style="color:rgba(233,105,0,1);">uni_</font>**`、`**<font style="color:rgba(233,105,0,1);">dcloud-</font>**`、`**<font style="color:rgba(233,105,0,1);">dcloud_</font>**`为前缀的key，为系统保留关键前缀。如 `**<font style="color:rgba(233,105,0,1);">uni_deviceId</font>**`、`**<font style="color:rgba(233,105,0,1);">uni_id_token</font>**`，请开发者为key命名时避开这些前缀

```javascript
uni.setStorage({
  key: 'storage_key',
  data: 'hello',
  success: function () {
    console.log('success')
  }
})
```

##### [uni.setStorageSync()](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstoragesync)
> 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
>

+ **语法：**`**uni.setStorageSync(KEY,DATA)**`
+ **参数：**
    - `**key**` - 本地缓存中的指定的 key，必填项
    - `**data**` - 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象，必填项

```javascript
try {
  uni.setStorageSync('storage_key', 'hello')
} catch (e) {
  // error
}
```

#### [uni.getStorage()](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorage)
> 从本地缓存中异步获取指定 key 对应的内容
>

+ **语法：**`**uni.getStorage(OBJECT)**`
+ **属性：**
    - `**OBJECT**`
        * `**key**` - 本地缓存中的指定的 key，必填项
        * `**success**` - 接口调用的回调函数，`res = {data: key对应的内容}`，必填项
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getStorage({
  key: 'storage_key',
  success: function (res) {
    console.log(res.data)
  }
})
```

##### [uni.getStorageSync()](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstoragesync)
> 从本地缓存中同步获取指定 key 对应的内容
>

+ **语法：**`**uni.getStorageSync(KEY)**`
+ **参数：**`**key**` - 本地缓存中的指定的 key，必填项

```javascript
try {
  const value = uni.getStorageSync('storage_key')
  if (value) {
    console.log(value)
  }
} catch (e) {
  // error
}
```

#### [uni.getStorageInfo()](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorageinfo)
> 异步获取当前 storage 的相关信息
>

+ **语法：**`**uni.getStorageInfo(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用的回调函数，详见返回参数说明，必填项，返回参数如下：
            + `**keys**` - 当前 storage 中所有的 key
            + `**currentSize**` - 当前占用的空间大小, 单位：kb
            + `**limitSize**` - 限制的空间大小, 单位：kb
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getStorageInfo({
  success: function (res) {
    console.log(res.keys)
    console.log(res.currentSize)
    console.log(res.limitSize)
  }
})
```

##### [uni.getStorageInfoSync()](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorageinfosync)
> 同步获取当前 storage 的相关信息
>

```javascript
try {
  const res = uni.getStorageInfoSync()
  console.log(res.keys)
  console.log(res.currentSize)
  console.log(res.limitSize)
} catch (e) {
  // error
}
```

#### [uni.removeStorage()](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestorage)
> 从本地缓存中异步移除指定 key
>

+ **语法：**`**uni.removeStorage(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**key**` - 本地缓存中的指定的 key，必填项
        * `**success**` - 接口调用的回调函数，必填项
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.removeStorage({
  key: 'storage_key',
  success: function (res) {
    console.log('success')
  }
})
```

##### [uni.removeStorageSync()](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestoragesync)
> 从本地缓存中同步移除指定 key
>

+ **语法：**`**uni.removeStorageSync(KEY)**`
+ **参数：**`**key**` - 本地缓存中的指定的 key，必填项

```javascript
try {
  uni.removeStorageSync('storage_key')
} catch (e) {
  // error
}
```

#### [uni.clearStorage()](https://uniapp.dcloud.net.cn/api/storage/storage.html#clearstorage)
> 清理本地数据缓存
>

```javascript
uni.clearStorage()
```

##### [uni.clearStorageSync()](https://uniapp.dcloud.net.cn/api/storage/storage.html#clearstoragesync)
> 同步清理本地数据缓存
>

```javascript
try {
  uni.clearStorageSync()
} catch (e) {
  // error
}
```

### 位置
#### [uni.getLocation()](https://uniapp.dcloud.net.cn/api/location/location.html#getlocation)
> 获取当前的地理位置、速度
>

+ **语法：**`**uni.getLocation(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**type**` - 默认为 wgs84 返回 gps 坐标，gcj02 返回国测局坐标，可用于 `**<font style="color:rgba(233,105,0,1);">uni.openLocation</font>**` 和 map 组件坐标，App 和 H5 需配置定位 SDK 信息才可支持 gcj02。
        * `**altitude**` - 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
        * `**highAccuracyExpireTime**` - 高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果
        * `**isHighAccuracy**` - 开启高精度定位
        * `**success**` - 接口调用成功的回调函数，返回内容详见返回参数说明，必填项，返回参数如下
            + `**latitude**` - 纬度，浮点数，范围为-90~90，负数表示南纬
            + `**longitude**` - 经度，浮点数，范围为-180~180，负数表示西经
            + `**speed**` - 速度，浮点数，单位 m/s
            + `**accuracy**` - 位置的精确度
            + `**altitude**` - 高度，单位 m
            + `**verticalAccuracy**` - 垂直精度，单位 m（Android 无法获取，返回 0）
            + `**horizontalAccuracy**` - 水平精度，单位 m
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getLocation({
  type: 'wgs84',
  success: function (res) {
    console.log('当前位置的经度：' + res.longitude)
    console.log('当前位置的纬度：' + res.latitude)
  }
})
```

#### [uni.openLocation()](https://uniapp.dcloud.net.cn/api/location/open-location.html#openlocation)
> 使用应用内置地图查看位置
>

+ **语法：**`**uni.openLocation(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**latitude**` - 纬度，范围为-90~90，负数表示南纬，使用 gcj02 国测局坐标系，必填项
        * `**longitude**` - 经度，范围为-180~180，负数表示西经，使用 gcj02 国测局坐标系，必填项
        * `**name**` - 位置名
        * `**address**` - 地址的详细说明
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getLocation({
  type: 'gcj02', // 返回可以用于uni.openLocation的经纬度
  success: function (res) {
    const latitude = res.latitude
    const longitude = res.longitude
    uni.openLocation({
      latitude: latitude,
      longitude: longitude,
      success: function () {
        console.log('success')
      }
    })
  }
})
```

#### [uni.onLocationChange()](https://uniapp.dcloud.net.cn/api/location/location-change.html#onlocationchange)
> 监听实时地理位置变化事件，需结合 `**<font style="color:rgba(233,105,0,1);">uni.startLocationUpdate</font>**` 或 `**<font style="color:rgba(233,105,0,1);">uni.startLocationUpdateBackground</font>**` 使用
>

+ **语法：**`**uni.onLocationChange(FUNCTION CALLBACK)**`
+ **参数：**
    - `**FUNCTION CALLBACK**`
        * `**latitude**` - 纬度，范围为 -90~90，负数表示南纬
        * `**longitude**` - 经度，范围为 -180~180，负数表示西经
        * `**accuracy**` - 位置的精确度
        * `**street**` - 街道名称
+ **注意：**该方法会持续监听地理位置信息的变化，建议在不需要监听地理位置信息变化后，直接调用 `**<font style="color:rgba(233,105,0,1);">uni.stopLocationUpdate</font>**` 方法取消监听

```javascript
uni.onLocationChange(function (res) {
  console.log('纬度：' + res.latitude)
  console.log('经度：' + res.longitude)
})
```

#### [uni.startLocationUpdate()](https://uniapp.dcloud.net.cn/api/location/location-change.html#startlocationupdate)
> 开启应用进入前台时接收位置消息
>

+ **语法：**`**uni.startLocationUpdate(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.startLocationUpdate({
  success: res => console.log('开启应用接收位置消息成功'),
  fail: err => console.error('开启应用接收位置消息失败：', err),
  complete: msg => console.log('调用开启应用接收位置消息 API 完成')
})
```

#### [uni.stopLocationUpdate()](https://uniapp.dcloud.net.cn/api/location/location-change.html#stoplocationupdate)
> 关闭监听实时位置变化，前后台都停止消息接收
>

+ **语法：**`**uni.stopLocationUpdate(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.stopLocationUpdate({
  success: res => console.log('关闭应用接收位置消息成功'),
  fail: err => console.error('关闭应用接收位置消息失败：', err),
  complete: msg => console.log('调用关闭应用接收位置消息 API 完成')
})
```

#### [uni.startLocationUpdateBackground()](https://uniapp.dcloud.net.cn/api/location/location-change.html#startlocationupdatebackground)
> 开始监听实时地理位置信息变化事件，应用进入前后台时均接收实时地理位置信息
>

+ **语法：**`**uni.startLocationUpdateBackground(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.startLocationUpdateBackground({
  success: res => console.log('开启后台定位成功'),
  fail: err => console.error('开启后台定位失败：', err),
  complete: msg => console.log('调用开启后台定位 API 完成')
})
```

#### 地图组件控制
##### [uni.createMapContext()](https://uniapp.dcloud.net.cn/api/location/map.html#createmapcontext)
> 创建并返回 map 上下文 `**<font style="color:rgba(233,105,0,1);">mapContext</font>**` 对象。
>

+ **语法：**`**uni.createMapContext(mapId, componentInstance?)**`
+ **参数：**
    - `**mapId**` - 组件属性 id
    - `**componentInstance**` - 组件实例 this

##### [mapContext](https://uniapp.dcloud.net.cn/api/location/map.html#mapcontext)
> `**<font style="color:rgba(233,105,0,1);">mapContext</font>**` 通过 mapId 跟一个 `**<font style="color:rgba(233,105,0,1);"><map></font>**` 组件绑定，通过它可以操作对应的 `**<font style="color:rgba(233,105,0,1);"><map></font>**` 组件
>

`**mapContext**`** 对象的方法列表：**

+ `**getCenterLocation**` - 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 uni.openLocation，参数 OBJECT 结构如下：
    - `**success**` - 接口调用成功的回调函数 ，`res = { longitude: "经度", latitude: "纬度"}`
    - `**fail**` - 接口调用失败的回调函数
    - `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**moveToLocation**` - 将地图中心移动到当前定位点，需要配合 map 组件的 show-location 使用，参数 OBJECT 结构如下：
    - `**longitude**` - 经度
    - `**latitude**` - 纬度
    - `**success**` - 接口调用成功的回调函数 ，`res = { longitude: "经度", latitude: "纬度"}`
    - fail - 接口调用失败的回调函数
    - `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**translateMarker**` - 平移 marker，带动画，参数 OBJECT 结构如下：
    - `**markerId**` - 指定 marker，必填项
    - `**destination**` - 指定 marker 移动到的目标点，必填项
    - `**autoRotate**` - 移动过程中是否自动旋转 marker
    - `**rotate**` - marker 的旋转角度
    - `**duration**` - 动画持续时长，默认值1000ms，平移与旋转分别计算
    - `**animationEnd**` - 动画结束回调函数
    - `**success**` - 接口调用成功的回调函数
    - `**fail**` - 接口调用失败的回调函数
    - `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**getRegion**` - 获取当前地图的视野范围，参数 OBJECT 结构如下：
    - `**success**` - 接口调用成功的回调函数，`res = {southwest, northeast}`，西南角与东北角的经纬度
    - `**fail**` - 接口调用失败的回调函数（支付宝小程序不支持）
    - `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）（支付宝小程序不支持）
+ `**getScale**` - 获取当前地图的缩放级别，参数 OBJECT 结构如下：
    - `**success**` - 接口调用成功的回调函数，`res = {scale}`，缩放值
    - `**fail**` - 接口调用失败的回调函数（支付宝小程序不支持）
    - `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）（支付宝小程序不支持）
+ `**addMarkers**` - 添加 marker，参数 OBJECT 结构如下：
    - `**markers**` - 同传入 map 组件的 marker 属性，必填项
    - `**clear**` - 是否先清空地图上所有 marker，默认值为 false
    - `**success**` - 接口调用成功的回调函数
    - `**fail**` - 接口调用失败的回调函数
    - `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**initMarkerCluster**` - 初始化点聚合的配置，未调用时采用默认配置，参数 OBJECT 结构如下：
    - `**enableDefaultStyle**` - 启用默认的聚合样式，默认值为 true
    - `**zoomOnClick**` - 点击已经聚合的标记点时是否实现聚合分离，默认值为 true
    - `**gridSize**` - 聚合算法的可聚合距离，即距离小于该值的点会聚合至一起，以像素为单位，默认值为 60
    - `**success**` - 接口调用成功的回调函数
    - `**fail**` - 接口调用失败的回调函数
    - `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ `**on**` - 监听地图事件

```javascript
<template>
  <view class="content">
    <map
      id="map"
      class="map"
      :show-location="true"
      :latitude="latitude"
      :longitude="longitude"
    ></map>
  </view>
</template>

<script>
const img = '/static/logo.png'

export default {
  data() {
    return {
      latitude: 23.099994,
      longitude: 113.32452
    }
  },
  onReady() {
    this._mapContext = uni.createMapContext('map', this)

    // 仅调用初始化，才会触发 on.("markerClusterCreate", (e) => {})
    this._mapContext.initMarkerCluster({
      enableDefaultStyle: false,
      zoomOnClick: true,
      gridSize: 60,
      complete(res) {
        console.log('initMarkerCluster', res)
      }
    })

    this._mapContext.on('markerClusterCreate', e => {
      console.log('markerClusterCreate', e)
    })

    this.addMarkers()
  },
  methods: {
    addMarkers() {
      const positions = [
        {
          latitude: 23.099994,
          longitude: 113.32452
        },
        {
          latitude: 23.099994,
          longitude: 113.32252
        },
        {
          latitude: 23.099994,
          longitude: 113.32652
        },
        {
          latitude: 23.096994,
          longitude: 113.32952
        }
      ]

      const markers = []

      positions.forEach((p, i) => {
        console.log(i)
        markers.push(
          Object.assign(
            {},
            {
              id: i + 1,
              iconPath: img,
              width: 50,
              height: 50,
              joinCluster: true, // 指定了该参数才会参与聚合
              label: {
                width: 50,
                height: 30,
                borderWidth: 1,
                borderRadius: 10,
                bgColor: '#ffffff',
                content: `label ${i + 1}`
              }
            },
            p
          )
        )
      })
      this._mapContext.addMarkers({
        markers,
        clear: false,
        complete(res) {
          console.log('addMarkers', res)
        }
      })
    }
  }
}
</script>

<style>
.content {
  flex: 1;
}

.map {
  flex: 1;
}
</style>
```

### 图片
#### [uni.chooseMedia()](https://uniapp.dcloud.net.cn/api/media/video.html#choosemedia)
> 拍摄或从手机相册中选择图片或视频
>

+ **语法：**`**uni.chooseMedia(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**count**` - 最多可以选择的文件个数，默认值为 9（注意：ios不可大于9）
        * `**mediaType**` - 文件类型，默认值为 ['image', 'video']
            + `**image**` - 只能拍摄图片或从相册选择图片
            + `**video**` - 只能拍摄视频或从相册选择视频
            + `**mix**` - 可同时选择图片和视频
        * `**sourceType**` - 图片和视频选择的来源，默认值为 ['album', 'camera']
            + `**album**` - 从相册选择
            + `**camera**` - 使用相机拍摄
        * `**maxDuration**` - 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间，默认值为 10
        * `**sizeType**` - 仅对 mediaType 为 image 时有效，是否压缩所选文件，默认值为 ['original', 'compressed']
        * `**camera**` - 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头，默认值为 'back'
            + `**back**` - 使用后置摄像头
            + `**front**` - 使用前置摄像头
        * `**success**` - 接口调用成功的回调函数，返回参数如下：
            + `**tempFiles**` - 本地临时文件列表
                - `**tempFilePath**` - 本地临时文件路径 (本地路径)
                - `**size**` - 本地临时文件大小，单位 B
                - `**duration**` - 视频的时间长度
                - `**height**` - 视频的高度
                - `**width**` - 视频的宽度
                - `**thumbTempFilePath**` - 视频缩略图临时文件路径
                - `**fileType**` - 文件类型，合法值如下：
                    * `**image**` - 图片
                    * `**video**` - 视频
            + `**type**` - 文件类型，有效值有 image 、video、mix
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.chooseMedia({
  count: 9,
  mediaType: ['image', 'video'],
  sourceType: ['album', 'camera'],
  maxDuration: 30,
  camera: 'back',
  success(res) {
    console.log(res.tempFiles)
  }
})
```

#### [uni.previewImage()](https://uniapp.dcloud.net.cn/api/media/image.html#unipreviewimageobject)
> 预览图片
>

+ **语法：**`**uni.previewImage(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**current**` - 当前显示图片的链接/索引值
        * `**urls**` - 需要预览的图片链接列表，必填项
        * `**success**` - 接口调用成功的回调函数，返回参数如下：
            + `**index**` - 用户长按图片的索引值
            + `**tapIndex**` - 用户点击按钮列表的索引值
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
// 从相册选择6张图
uni.chooseImage({
  count: 6,
  sizeType: ['original', 'compressed'],
  sourceType: ['album'],
  success: function (res) {
    // 预览图片
    uni.previewImage({
      urls: res.tempFilePaths,
      longPressActions: {
        itemList: ['发送给朋友', '保存图片', '收藏'],
        success: function (data) {
          console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片')
        },
        fail: function (err) {
          console.log(err.errMsg)
        }
      }
    })
  }
})
```

#### [uni.saveImageToPhotosAlbum()](https://uniapp.dcloud.net.cn/api/media/image.html#saveimagetophotosalbum)
> 保存图片到系统相册
>

+ **语法：**`**uni.saveImageToPhotosAlbum(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**filePath**` - 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
        * `**success**` - 接口调用成功的回调函数，返回参数如下：
            + `**errMsg**` - 调用结果
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.chooseImage({
  count: 1,
  sourceType: ['camera'],
  success: function (res) {
    uni.saveImageToPhotosAlbum({
      filePath: res.tempFilePaths[0],
      success: function () {
        console.log('save success')
      }
    })
  }
})
```

### 音频
#### [uni.getRecorderManager()](https://uniapp.dcloud.net.cn/api/media/record-manager.html)
> 获取**全局唯一**的录音管理器 `**<font style="color:rgba(233,105,0,1);">recorderManager</font>**`
>

**recorderManager 对象的方法列表：**

+ `**start**` - 开始录音，参数 options 对象结构如下：
    - `**duration**` - 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
    - `**sampleRate**` - 采样率，有效值 8000/16000/44100
    - `**format**` - 音频格式，有效值 aac/mp3/wav/PCM。App默认值为 mp3，小程序默认值 aac
    - `**frameSize **`- 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式
+ `**pause**` - 暂停录音
+ `**resume**` - 继续录音
+ `**stop**` - 停止录音
+ `**onStart**` - 录音开始事件
+ `**onPause**` - 录音暂停事件
+ `**onStop**` - 录音停止事件，会回调文件地址，参数 callback 对象结构如下：
    - `**tempFilePath**` - 录音文件的临时路径
+ `**onResume**` - 监听录音继续事件
+ `**onFrameRecorded**` - 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件，参数 callback 对象结构如下：
    - `**frameBuffer**` - 录音分片结果数据
    - `**isLastFrame**` - 当前帧是否正常录音结束前的最后一帧
+ `**onError**` - 录音错误事件, 会回调错误信息，参数 callback 对象结构如下：
    - `**errMsg**` - 错误信息

```vue
<template>
  <view>
    <button @tap="startRecord">开始录音</button>
    <button @tap="endRecord">停止录音</button>
    <button @tap="playVoice">播放录音</button>
  </view>
</template>

<script>
const recorderManager = uni.getRecorderManager()
const innerAudioContext = uni.createInnerAudioContext()

innerAudioContext.autoplay = true

export default {
  data() {
    return {
      text: 'uni-app',
      voicePath: ''
    }
  },
  onLoad() {
    let self = this
    recorderManager.onStop(function (res) {
      console.log('recorder stop' + JSON.stringify(res))
      self.voicePath = res.tempFilePath
    })
  },
  methods: {
    startRecord() {
      console.log('开始录音')

      recorderManager.start()
    },
    endRecord() {
      console.log('录音结束')
      recorderManager.stop()
    },
    playVoice() {
      console.log('播放录音')

      if (this.voicePath) {
        innerAudioContext.src = this.voicePath
        innerAudioContext.play()
      }
    }
  }
}
</script>
```

#### [uni.getBackgroundAudioManager()](https://uniapp.dcloud.net.cn/api/media/background-audio-manager.html)
> 获取**全局唯一**的背景音频管理器 `**<font style="color:rgba(233,105,0,1);">backgroundAudioManager</font>**`
>

**backgroundAudioManager 对象的属性列表：**

+ `**duration**` - 当前音频的长度（单位：s），只有在当前有合法的 src 时返回，只读
+ `**currentTime**` - 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，只读
+ `**paused**` - 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放，只读
+ `**src**` - 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放，目前支持的格式有 m4a, aac, mp3, wav
+ `**startTime**` - 音频开始播放的位置（单位：s）
+ `**title**` - 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值
+ `**epname**` - 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
+ `**singer**` - 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
+ `**coverImgUrl**` - 封面图 url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图
+ `**webUrl**` - 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值

**backgroundAudioManager 对象的方法列表：**

+ `**play**` - 播放
+ `**pause**` - 暂停
+ `**stop**` - 停止
+ `**seek**` - 跳转到指定位置，单位 s
+ `**onCanplay**` - 背景音频进入可以播放状态，但不保证后面可以流畅播放
+ `**onPlay**` - 背景音频播放事件
+ `**onPause**` - 背景音频暂停事件
+ `**onStop**` - 背景音频停止事件
+ `**onEnded**` - 背景音频自然播放结束事件
+ `**onTimeUpdate**` - 背景音频播放进度更新事件
+ `**onError**` - 背景音频播放错误事件
+ `**onWaiting**` - 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发

```javascript
const bgAudioManager = uni.getBackgroundAudioManager()
bgAudioManager.title = '致爱丽丝'
bgAudioManager.singer = '暂无'
bgAudioManager.coverImgUrl = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png'
bgAudioManager.src = 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3'
```

#### 音频组件控制
##### [uni.createInnerAudioContext()](https://uniapp.dcloud.net.cn/api/media/audio-context.html)
> 创建并返回内部 audio 上下文 `**<font style="color:rgba(233,105,0,1);">innerAudioContext</font>**` 对象
>

**innerAudioContext 对象的属性列表：**

+ `**src**` - 音频的数据链接，用于直接播放
+ `**startTime**` - 开始播放的位置（单位：s），默认 0
+ `**autoplay**` - 是否自动开始播放，默认 false
+ `**loop**` - 是否循环播放，默认 false
+ `**duration**` - 当前音频的长度（单位：s），只有在当前有合法的 src 时返回，需要在 onCanplay 中获取，只读
+ `**currentTime**` - 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位，只读
+ `**paused**` - 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放，只读
+ `**buffered**` - 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲，只读
+ `**volume**` - 音量。范围 0~1

**innerAudioContext 对象的方法列表：**

+ `**play**` - 播放
+ `pause` - 暂停
+ `**stop**` - 停止
+ `**seek**` - 跳转到指定位置，单位 s
+ `**destroy**` - 销毁当前实例
+ `**onCanplay**` - 音频进入可以播放状态，但不保证后面可以流畅播放
+ `**onPlay**` - 音频播放事件
+ `**onPause**` - 音频暂停事件
+ `**onStop**` - 音频停止事件
+ `**onEnded**` - 音频自然播放结束事件
+ `**onTimeUpdate**` - 音频播放进度更新事件
+ `**onError**` - 音频播放错误事件
+ `**onWaiting**` - 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
+ `**onSeeking**` - 音频进行 seek 操作事件
+ `**onSeeked**` - 音频完成 seek 操作事件

```javascript
const innerAudioContext = uni.createInnerAudioContext()
innerAudioContext.autoplay = true
innerAudioContext.src = 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3'
innerAudioContext.onPlay(() => {
  console.log('开始播放')
})
innerAudioContext.onError(res => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

// **当出现-99错误时** 可以按照下面思路进行排查：

// ```javascript
// // 多次会调用播放新的文件时，提前销毁实例，可避免-99错误
// if (innerAudioContext) {
//   try {
//     innerAudioContext.pause();
//     innerAudioContext.destroy()
//     innerAudioContext = null
//   } catch (e) {
//     //TODO handle the exception
//   }
// }
```

### 视频
#### [uni.chooseVideo()](https://uniapp.dcloud.net.cn/api/media/video.html#choosevideo)
> 拍摄视频或从手机相册中选视频，返回视频的临时文件路径
>

+ **语法：**`**uni.chooseVideo(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**sourceType**` - album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
        * `**success**` - 接口调用成功，返回视频文件的临时文件路径，返回参数如下：
            + `**tempFilePath**` - 选定视频的临时文件路径
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```vue
<template>
  <view>
    <text>hello</text>
    <button @tap="test">click me</button>
    <video :src="src"></video>
  </view>
</template>

<script>
export default {
  data() {
    return { src: '' }
  },
  methods: {
    test: function () {
      var self = this
      uni.chooseVideo({
        sourceType: ['camera', 'album'],
        success: function (res) {
          self.src = res.tempFilePath
        }
      })
    }
  }
}
</script>
```

#### [uni.saveVideoToPhotosAlbum()](https://uniapp.dcloud.net.cn/api/media/video.html#savevideotophotosalbum)
> 保存视频到系统相册
>

+ **语法：**`**uni.saveVideoToPhotosAlbum(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**filePath**` - 视频文件路径，可以是临时文件路径也可以是永久文件路径，必填项
        * `**success**` - 接口调用成功的回调函数，返回参数如下：
            + `**errMsg**` - 调用结果
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```vue
<template>
  <view>
    <text>hello</text>
    <button @tap="test">click me</button>
    <video :src="src"></video>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  methods: {
    test: function () {
      var self = this
      uni.chooseVideo({
        sourceType: ['camera'],
        success: function (res) {
          self.src = res.tempFilePath

          uni.saveVideoToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              console.log('save success')
            }
          })
        }
      })
    }
  }
}
</script>
```

#### 视频组件控制
##### [uni.createVideoContext()](https://uniapp.dcloud.net.cn/api/media/video-context.html)
> 创建并返回 video 上下文 videoContext 对象
>

+ **语法：**`**uni.createVideoContext(videoId, componentInstance)**`
+ **参数：**
    - `**videoId**` - 组件 id
    - `**componentInstance**` - 组件实例 this

**videoContext 对象的方法列表：**

+ `**play**` - 播放
+ `**pause**` - 暂停
+ `**seek**` - 跳转到指定位置，单位 s
+ `**sendDanmu**` - 发送弹幕，参数 danmu 包含两个属性 text, color
+ `**exitFullScreen**` - 退出全屏

```vue
<template>
  <view>
    <view class="page-body">
      <view class="page-section">
        <video
          id="myVideo"
          src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/wap2appvsnative.mp4"
          @error="videoErrorCallback"
          :danmu-list="danmuList"
          enable-danmu
          danmu-btn
          controls
        ></video>

        <view class="uni-list">
          <view class="uni-list-cell">
            <view>
              <view class="uni-label">弹幕内容</view>
            </view>
            <view class="uni-list-cell-db">
              <input
                @blur="bindInputBlur"
                class="uni-input"
                type="text"
                placeholder="在此处输入弹幕内容"
              />
            </view>
          </view>
        </view>
        <view class="btn-area">
          <button @tap="bindSendDanmu" class="page-body-button" formType="submit">发送弹幕</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'video',
      src: '',
      inputValue: '',
      danmuList: [
        {
          text: '第 1s 出现的弹幕',
          color: '#ff0000',
          time: 1
        },
        {
          text: '第 3s 出现的弹幕',
          color: '#ff00ff',
          time: 3
        }
      ]
    }
  },
  onReady: function (res) {
    this.videoContext = uni.createVideoContext('myVideo')
  },
  methods: {
    bindInputBlur: function (e) {
      this.inputValue = e.target.value
    },
    bindButtonTap: function () {
      var that = this
      uni.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: ['front', 'back'],
        success: function (res) {
          this.src = res.tempFilePath
        }
      })
    },
    bindSendDanmu: function () {
      this.videoContext.sendDanmu({
        text: this.inputValue,
        color: this.getRandomColor()
      })
    },
    videoErrorCallback: function (e) {
      console.log('视频错误信息:')
      console.log(e.target.errMsg)
    },
    getRandomColor: function () {
      const rgb = []
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
      }
      return '#' + rgb.join('')
    }
  }
}
</script>
```

### 系统
#### [uni.getSystemInfo()](https://uniapp.dcloud.net.cn/api/system/info.html#getsysteminfo)
> 异步获取系统信息
>

+ **语法：**`**uni.getSystemInfo(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调，必填项，返回参数如下：
            + --------------------------- device ---------------------------
            + `**deviceId**` - 设备 id 。由 uni-app 框架生成并存储，清空 Storage 会导致改变
            + `**deviceType**` - 设备类型。如 phone、pad、pc、unknow
            + `**deviceBrand**` - 设备品牌。如：apple、huawei
            + `**deviceModel**` - 设备型号
            + `**deviceOrientation**` - 设备方向
            + `**devicePixelRatio**` - 设备像素比
            + ------------------------------ os ------------------------------
            + `**osName**` - 系统名称
            + `**osVersion**` - 操作系统版本。如 ios 版本，android 版本
            + `**osLanguage**` - 操作系统语言
            + --------------------------- browser ---------------------------
            + `**browserName**` - 浏览器名称或 App 的 webview 名称
            + `**browserVersion**` - 浏览器版本、webview 版本	
            + ----------------------------- host -----------------------------
            + `**hostName**` - 小程序宿主或 uniMPSDK 的集成宿主名称，如：WeChat、FeiShu
            + `**hostVersion**` - 宿主版本。如：微信版本号
            + `**hostLanguage**` - 宿主语言
            + `**hostTheme**` - 宿主主题
            + `**hostSDKVersion**` - uni 小程序 SDK 版本、小程序客户端基础库版本
            + ------------------------- uni-app 框架 -------------------------
            + `**uniPlatform**` - uni-app 运行平台，与条件编译平台相同
            + `**uniCompileVersion**` - uni 编译器版本号
            + `**uniCompilerVersion**` - uni 编译器版本号
            + `**uniRuntimeVersion**` - uni 运行时版本
            + ------------------------------ app ------------------------------
            + `**appId**` - manifest 中应用 appid，即 DCloud appid
            + `**appName**` - manifest 中应用名称
            + `**appVersion**` - manifest 中应用版本名称
            + `**appVersionCode**` - manifest 中应用版本名号
            + `**appWgtVersion**` - 应用资源（wgt）的版本名称
            + `**appLanguage**` - 应用设置的语言
            + ------------------------------ 其他 ------------------------------
            + `**ua**` - userAgent标识
            + `**screenWidth**` - 屏幕宽度
            + `**screenHeight**` - 屏幕高度
            + `**windowWidth**` - 可使用窗口宽度
            + `**windowHeight**` - 可使用窗口高度
            + `**windowTop**` - 可使用窗口的顶部位置
            + `**windowBottom**` - 可使用窗口的底部位置
            + `**statusBarHeight**` - 手机状态栏的高度
            + `**safeAreaInsets**` - 在竖屏正方向下的安全区域插入位置
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getSystemInfo({
  success: function (res) {
    console.log(res.appName)
  }
})
```

##### uni.getSystemInfoSync()
> 获取系统信息的同步接口。`<font style="color:rgba(233,105,0,1);">调用参数和返回值同上 </font>[**<font style="color:rgba(233,105,0,1);">getSystemInfo</font>**](#bhECU)`
>

#### [uni.getAppAuthorizeSetting()](https://uniapp.dcloud.net.cn/api/system/getappauthorizesetting.html)
> 获取 APP 授权设置
>

+ **返回参数：**
    - `**cameraAuthorized**` - 允许使用摄像头的开关
    - `**locationAuthorized**`	 - 允许使用定位的开关
    - `**microphoneAuthorized**` - 允许使用麦克风的开关
    - `**notificationAuthorized**` - 允许通知的开关

```javascript
const appAuthorizeSetting = uni.getAppAuthorizeSetting()

console.log(appAuthorizeSetting.cameraAuthorized)
console.log(appAuthorizeSetting.locationAuthorized)
console.log(appAuthorizeSetting.microphoneAuthorized)
console.log(appAuthorizeSetting.notificationAuthorized)
```

#### [uni.getSystemSetting()](https://uniapp.dcloud.net.cn/api/system/getsystemsetting.html)
> 获取设备设置
>

+ **返回参数：**
    - `**bluetoothEnabled**` - 蓝牙的系统开关
    - `**bluetoothError**` - App端：Android平台没有权限或者iOS平台模块配置错误时返回字符串，否则不返回此属性
    - `**locationEnabled**` - 地理位置的系统开关
    - `**locationError**` - App端：Android平台不返回此属性；iOS平台模块配置错误时返回字符串，否则不返回此属性
    - `**wifiEnabled**` - Wi-Fi 的系统开关
    - `**wifiError**` - App端：Android平台没有权限时返回此属性；iOS平台不返回此属性
    - `**deviceOrientation**` - 设备方向。`**<font style="color:rgba(233,105,0,1);">竖屏：portrait</font>**`，`**<font style="color:rgba(233,105,0,1);">横屏：landscape</font>**`

```javascript
const systemSetting = uni.getSystemSetting()

console.log(systemSetting.bluetoothEnabled)
console.log(systemSetting.deviceOrientation)
console.log(systemSetting.locationEnabled)
console.log(systemSetting.wifiEnabled)
```

#### [uni.openAppAuthorizeSetting()](https://uniapp.dcloud.net.cn/api/system/openappauthorizesetting.html)
> 跳转系统授权管理页
>

+ **语法：**`**uni.openAppAuthorizeSetting(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.openAppAuthorizeSetting({
  success(res) {
    console.log(res)
  }
})
```

### [uni.createRequestPermissionListener()](https://uniapp.dcloud.net.cn/api/system/create-request-permission-listener.html#createrequestpermissionlistener)
> 创建一个监听权限申请的 `**<font style="color:rgba(233,105,0,1);">RequestPermissionListener</font>**` 对象
>

**RequestPermissionListener 对象的方法列表：**

+ `**onRequest**` - 监听申请系统权限
+ `**onConfirm**` - 监听弹出系统权限授权框
+ `**onComplete**` - 监听权限申请完成
+ `**stop**` - 取消所有监听

```vue
<template>
  <view>
    <view
      class="permission-alert"
      id="permission-alert"
      :style="{ transform: isPermissionAlertShow ? 'translateY(0)' : 'translateY(-250rpx)' }"
    >
      <text style="font-size: 20px; margin-bottom: 10px; margin-top: 5px; display: block"
        >手机状态权限申请说明：</text
      >
      <text style="color: darkgray"
        >uni-app正在申请手机状态权限，允许或拒绝均不会获取任何隐私信息。</text
      >
    </view>
    <button @click="requestPermission">点击申请日历权限</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isPermissionAlertShow: false
      //permissionListener: null
    }
  },
  onReady() {
    this.watchPermission()
  },
  onUnload() {
    if (this.permissionListener) {
      this.permissionListener.stop()
    }
  },
  methods: {
    watchPermission() {
      this.permissionListener = uni.createRequestPermissionListener()
      this.permissionListener.onConfirm(e => {
        this.isPermissionAlertShow = true
      })
      this.permissionListener.onComplete(e => {
        this.isPermissionAlertShow = false
      })
    },
    requestPermission() {
      plus.android.requestPermissions(
        ['android.permission.READ_CALENDAR'],
        e => {},
        e => {}
      )
    }
  }
}
</script>

<style>
.permission-alert {
  width: 650rpx;
  height: 200rpx;
  margin: 20rpx 40rpx;
  position: absolute;
  top: 0px;
  z-index: 3;
  border-radius: 5px;
  transition-property: transform;
  transition-duration: 200ms;
  background-color: white;
  padding: 10rpx;
}
</style>
```

### 网络状态
#### [uni.getNetworkType()](https://uniapp.dcloud.net.cn/api/system/network.html#getnetworktype)
> 获取网络类型
>

+ **语法：**`**uni.getNetworkType(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功，返回网络类型 networkType，返回参数如下：
            + `**networkType**` - 网络类型，有效值如下：
                - `**wifi**` - wifi 网络
                - `**2g**` - 2g 网络
                - `**3g**` - 3g 网络
                - `**4g**` - 4g 网络
                - `**5g**` - 5g 网络
                - `**unknown**` - Android 下不常见的网络类型
                - `**none**` - 无网络
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getNetworkType({
  success: function (res) {
    console.log(res.networkType)
  }
})
```

#### [uni.onNetworkStatusChange()](https://uniapp.dcloud.net.cn/api/system/network.html#onnetworkstatuschange)
> 监听网络状态变化
>

+ **语法：**`**uni.onNetworkStatusChange(CALLBACK)**`
+ `**CALLBACK**`** 返回参数：**
    - `**isConnected**` - 当前是否有网络连接
    - `**networkType**` - 网络类型

```javascript
uni.onNetworkStatusChange(function (res) {
  console.log(res.isConnected)
  console.log(res.networkType)
})
```

#### [uni.offNetworkStatusChange()](https://uniapp.dcloud.net.cn/api/system/network.html#offnetworkstatuschange)
> 取消监听网络状态变化
>

+ **语法：**`**uni.offNetworkStatusChange(CALLBACK)**`
+ **注意：**`**<font style="color:rgba(233,105,0,1);">CALLBACK</font>**` 必须为调用 `**<font style="color:rgba(233,105,0,1);">uni.onNetworkStatusChange</font>**` 时传入的 `**<font style="color:rgba(233,105,0,1);">CALLBACK</font>**`

```javascript
var CALLBACK = function (res) {
  // ...这里写你的业务逻辑
}
uni.offNetworkStatusChange(CALLBACK)
uni.onNetworkStatusChange(CALLBACK)
```

### 系统主题
#### [uni.onThemeChange()](https://uniapp.dcloud.net.cn/api/system/theme.html#onthemechange)
> 监听系统主题状态变化
>

+ **语法：**`**uni.onThemeChange(CALLBACK)**`
+ `**CALLBACK**`** 返回参数：**
    - `**theme**` - 主题名称(`**<font style="color:rgba(233,105,0,1);">dark</font>**`, `**<font style="color:rgba(233,105,0,1);">light</font>**`)

```javascript
uni.onThemeChange(function (res) {
  console.log(res.theme)
})
```

#### [uni.offThemeChange()](https://uniapp.dcloud.net.cn/api/system/theme.html#offthemechange)
> 取消监听系统主题状态变化
>

+ **语法：**`**uni.offThemeChange(CALLBACK)**`
+ **参数：**`**CALLBACK**` - onThemeChange 传入的监听函数

```javascript
const callback = function (res) {
  console.log(res.theme)
}
uni.onThemeChange(callback)
uni.offThemeChange(callback) // 此时不再触发 callback 方法
```

### 扫码
#### [uni.scanCode()](https://uniapp.dcloud.net.cn/api/system/barcode.html)
> 调起客户端扫码界面，扫码成功后返回对应的结果
>

+ **语法：**`**uni.scanCode(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**onlyFromCamera**` - 是否只能从相机扫码，不允许从相册选择图片
        * `**scanType**` - 扫码类型，合法值如下：
            + `**barCode**` - 一维码
            + `**qrCode**` - 二维码
            + `**datamatrix**` - Data Matrix 码
            + `**pdf417**` - PDF417 条码
        * `**success**` - 接口调用成功的回调，返回参数如下：
            + `**result**` - 所扫码的内容
            + `**scanType**` - 所扫码的类型
        * `**fail**` - 接口调用失败的回调函数（识别失败、用户取消等情况下触发）
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
// 允许从相机和相册扫码
uni.scanCode({
  success: function (res) {
    console.log('条码类型：' + res.scanType)
    console.log('条码内容：' + res.result)
  }
})

// 只允许通过相机扫码
uni.scanCode({
  onlyFromCamera: true,
  success: function (res) {
    console.log('条码类型：' + res.scanType)
    console.log('条码内容：' + res.result)
  }
})

// 调起条码扫描
uni.scanCode({
  scanType: ['barCode'],
  success: function (res) {
    console.log('条码类型：' + res.scanType)
    console.log('条码内容：' + res.result)
  }
})
```

### 剪贴板
#### [uni.setClipboardData()](https://uniapp.dcloud.net.cn/api/system/clipboard.html#setclipboarddata)
> 设置系统剪贴板的内容
>

+ **语法：**`**uni.setClipboardData(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**data**` - 需要设置的内容
        * `**showToast**` - 配置是否弹出提示，默认弹出提示
        * `**success**` - 接口调用成功的回调
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.setClipboardData({
  data: 'hello',
  success: function () {
    console.log('success')
  }
})
```

#### [uni.getClipboardData()](https://uniapp.dcloud.net.cn/api/system/clipboard.html#getclipboarddata)
> 获取系统剪贴板内容
>

+ **语法：**`**uni.getClipboardData(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调，返回参数如下：
            + `**data**` - 剪贴板的内容
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getClipboardData({
  success: function (res) {
    console.log(res.data)
  }
})
```

### 手机联系人
#### [uni.addPhoneContact()](https://uniapp.dcloud.net.cn/api/system/contact.html)
> 写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加
>

+ **语法：**`**uni.addPhoneContact(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**nickName**` - 昵称
        * `**lastName**` - 姓氏
        * `**firstName**` - 名字，必填项
        * `**remark**` - 备注
        * `**mobilePhoneNumber**` - 手机号
        * `**weChatNumber**` - 微信号
        * `**success**` - 接口调用成功的回调
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.addPhoneContact({
  nickName: '昵称',
  lastName: '姓',
  firstName: '名',
  remark: '备注',
  mobilePhoneNumber: '114',
  weChatNumber: 'wx123',
  success: function () {
    console.log('success')
  },
  fail: function () {
    console.log('fail')
  }
})
```

### 键盘
#### [uni.hideKeyboard()](https://uniapp.dcloud.net.cn/api/key.html#hidekeyboard)
> 隐藏软键盘
>

```javascript
uni.hideKeyboard()
```

#### [uni.onKeyboardHeightChange()](https://uniapp.dcloud.net.cn/api/key.html#onkeyboardheightchange)
> 监听键盘高度变化
>

+ **语法：**`**uni.onKeyboardHeightChange(CALLBACK)**`
+ **参数：**
    - `**CALLBACK**` - 键盘高度变化事件的监听函数，返回 res 对象参数如下：
        * `**height**` - 键盘高度

```javascript
uni.onKeyboardHeightChange(res => {
  console.log(res.height)
})
```

#### [uni.offKeyboardHeightChange()](https://uniapp.dcloud.net.cn/api/key.html#offkeyboardheightchange)
> 取消监听键盘高度变化事件
>

+ **语法：**`**uni.offKeyboardHeightChange(CALLBACK)**`
+ **参数：**`**CALLBACK**` - onKeyboardHeightChange 传入的监听函数。不传此参数则移除所有监听函数

```javascript
const listener = function (res) {
  console.log(res)
}

uni.onKeyboardHeightChange(listener)
uni.offKeyboardHeightChange(listener) // 需传入与监听时同一个的函数对象
```

#### [uni.getSelectedTextRange()](https://uniapp.dcloud.net.cn/api/key.html#getselectedtextrange)
> 在input、textarea等focus之后，获取输入框的光标位置
>

+ **语法：**`**uni.getSelectedTextRange(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数，返回参数如下：
            + `**start**` - 输入框光标起始位置
            + `**end**` - 输入框光标结束位置
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getSelectedTextRange({
  success: res => {
    console.log('getSelectedTextRange res', res.start, res.end)
  }
})
```

### 交互反馈
#### [uni.showToast()](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showtoast)
> 显示消息提示框
>

+ **语法：**`**uni.showToast(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**title**` - 提示的内容，长度与 icon 取值有关，必填项
        * `**icon**` - 图标，默认：success，有效值如下：
            + `**success**` - 显示成功图标，此时 title 文本在 `**<font style="color:rgba(233,105,0,1);">小程序</font>**` 平台最多显示 7 个汉字长度，`**<font style="color:rgba(233,105,0,1);">App</font>**` 仅支持单行显示
            + `**error**` - 显示错误图标，此时 title 文本在 `**<font style="color:rgba(233,105,0,1);">小程序</font>**` 平台最多显示 7 个汉字长度，`**<font style="color:rgba(233,105,0,1);">App</font>**` 仅支持单行显示。
            + `**loading**` - 显示加载图标，此时 title 文本在 `**<font style="color:rgba(233,105,0,1);">小程序</font>**` 平台最多显示 7 个汉字长度。
            + `**none**` - 不显示图标，此时 title 文本在 `**<font style="color:rgba(233,105,0,1);">小程序</font>**` 最多可显示两行
        * `**image**` - 自定义图标的本地路径（app端暂不支持gif）
        * `**mask**` - 是否显示透明蒙层，防止触摸穿透，默认：false
        * `**duration**` - 提示的延迟时间，单位毫秒，默认：1500
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.showToast({
  title: '标题',
  duration: 2000
})
```

#### [uni.hideToast()](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hidetoast)
> 隐藏消息提示框
>

```javascript
uni.hideToast()
```

#### [uni.showLoading()](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading)
+ **语法：**`**uni.showLoading(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**title**` - 提示的文字内容，显示在 loading 的下方，必填项
        * `**mask**` - 是否显示透明蒙层，防止触摸穿透，默认：false
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.showLoading({
  title: '加载中'
})
```

#### [uni.hideLoading()](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hideloading)
> 隐藏 loading 提示框
>

```javascript
uni.showLoading({
  title: '加载中'
})

setTimeout(function () {
  uni.hideLoading()
}, 2000)
```

#### [uni.showModal()](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showmodal)
> 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮
>

+ **语法：**`**uni.showModal(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**title**` - 提示的标题
        * `**content**` - 提示的内容
        * `**showCancel**` - 是否显示取消按钮，默认为 true
        * `**cancelText**` - 取消按钮的文字，默认为 "取消"
        * `**cancelColor**` - 取消按钮的文字颜色，默认为 "#000000"
        * `**confirmText**` - 确定按钮的文字，默认为 "确定"
        * `**confirmColor**` - 确定按钮的文字颜色
        * `**editable**` - 是否显示输入框
        * `**placeholderText**` - 显示输入框时的提示文本
        * `**success**` - 接口调用成功的回调函数，返回参数如下：
            + confirm - 为 true 时，表示用户点击了确定按钮
            + cancel - 为 true 时，表示用户点击了取消
            + content - `**editable**` 为 true 时，用户输入的文本
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success: function (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```

### 设置导航条
#### [uni.setNavigationBarTitle()](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#setnavigationbartitle)
> 动态设置当前页面的标题
>

+ **语法：**`**uni.setNavigationBarTitle(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**title**` - 页面标题，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.setNavigationBarTitle({
  title: '新的标题'
})
```

#### [uni.setNavigationBarColor()](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#setnavigationbarcolor)
> 设置页面导航条颜色
>

+ **语法：**`**uni.setNavigationBarColor(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**frontColor**` - 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000，必填项
        * `**backgroundColor**` - 背景颜色值，有效值为十六进制颜色，必填项
        * `**success**` - 接口调用成功的回调函数，返回参数如下：
            + `**errMsg**` - 调用结果
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）
+ **注意：**如果需要在页面进入时设置标题，可以在 `**<font style="color:rgba(233,105,0,1);">onReady</font>**` 内执行，以避免被框架内的修改所覆盖。如果必须在 `**<font style="color:rgba(233,105,0,1);">onShow</font>**` 内执行需要延迟一小段时间

```javascript
uni.setNavigationBarColor({
  frontColor: '#ffffff',
  backgroundColor: '#ff0000',
  animation: {
    duration: 400,
    timingFunc: 'easeIn'
  }
})
```

#### [uni.showNavigationBarLoading()](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#shownavigationbarloading)
> 在当前页面显示导航条加载动画
>

+ **语法：**`**uni.showNavigationBarLoading(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.showNavigationBarLoading()
```

#### [uni.hideNavigationBarLoading()](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#hidenavigationbarloading)
> 在当前页面隐藏导航条加载动画
>

+ **语法：**`**uni.hideNavigationBarLoading(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.hideNavigationBarLoading()
```

### 设置 TabBar
#### [uni.setTabBarItem()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#settabbaritem)
> 动态设置 tabBar 某一项的内容
>

+ **语法：**`**uni.setTabBarItem(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**index**` - tabBar 的哪一项，从左边算起，必填项
        * `**text**` - tab 上的按钮文字
        * `**iconPath**` - 图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，当 position 为 top 时，此参数无效。
        * `**selectedIconPath**` - 选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效
        * `**pagePath**` - 页面绝对路径，必须在 pages 中先定义，被替换掉的 pagePath 不会变成普通页面（仍然需要使用 uni.switchTab 跳转）
        * `**visible**` - 该项是否显示，默认值为 true
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.setTabBarItem({
  index: 0,
  text: 'text',
  iconPath: '/path/to/iconPath',
  selectedIconPath: '/path/to/selectedIconPath'
})
```

#### [uni.setTabBarStyle()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#settabbarstyle)
> 动态设置 tabBar 的整体样式
>

+ **语法：**`**uni.setTabBarStyle(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**color**` - tab 上的文字默认颜色，HexColor
        * `**selectedColor**` - tab 上的文字选中时的颜色，HexColor
        * `**backgroundColor**` - tab 的背景色，HexColor
        * `**borderStyle**` - tabBar上边框的颜色， 仅支持 black/white，black 对应颜色 rgba(0,0,0,0.33)，white 对应颜色 rgba(255,255,255,0.33)
        * `**midButton**` - 中间按钮，仅在 list 项为偶数时有效 详情
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.setTabBarStyle({
  color: '#FF0000',
  selectedColor: '#00FF00',
  backgroundColor: '#0000FF',
  borderStyle: 'white'
})
```

#### [uni.hideTabBar()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#hidetabbar)
> 隐藏 tabBar
>

+ **语法：**`**uni.hideTabBar(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.hideTabBar({
  success: function () {
    console.log('hideTabBar success')
  }
})
```

#### [uni.showTabBar()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#showtabbar)
> 显示 tabBarr
>

+ **语法：**`**uni.showTabBar(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.showTabBar({
  success: function (res) {
    console.log(res)
  }
})
```

#### [uni.setTabBarBadge()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#settabbarbadge)
> 为 tabBar 某一项的右上角添加文本
>

+ **语法：**`**uni.setTabBarBadge(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**index**` - tabBar 的哪一项，从左边算起，必填项
        * `**text**` - 显示的文本，不超过 3 个半角字符，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.setTabBarBadge({
  index: 0,
  text: '1'
})
```

#### [uni.removeTabBarBadge()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#removetabbarbadge)
> 移除 tabBar 某一项右上角的文本
>

+ **语法：**`**uni.removeTabBarBadge(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**index**` - tabBar 的哪一项，从左边算起，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.removeTabBarBadge({
  index: 0
})
```

#### [uni.showTabBarRedDot()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#showtabbarreddot)
> 显示 tabBar 某一项的右上角的红点
>

+ **语法：**`**uni.showTabBarRedDot(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**index**` - tabBar 的哪一项，从左边算起，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.showTabBarRedDot({
  index: 0 // tabBar的索引值
})
```

#### [uni.hideTabBarRedDot()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#hidetabbarreddot)
> 隐藏 tabBar 某一项的右上角的红点
>

+ **语法：**`**uni.hideTabBarRedDot(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**index**` - tabBar 的哪一项，从左边算起，必填项
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.hideTabBarRedDot({
  index: 0 // tabBar的索引值
})
```

#### [uni.onTabBarMidButtonTap()](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#ontabbarmidbuttontap)
> 监听中间按钮的点击事件
>

+ **语法：**`**uni.onTabBarMidButtonTap(CALLBACK)**`
+ **参数：**`**CALLBACK**` - 点击中间按钮时的回调函数

```javascript
uni.onTabBarMidButtonTap(function(res) {
  console.log('onTabBarMidButtonTap', res)
})
```

### 滚动
#### [uni.pageScrollTo()](https://uniapp.dcloud.net.cn/api/ui/scroll.html)
> 将页面滚动到目标位置。可以指定滚动到具体的scrollTop数值，也可以指定滚动到某个元素的位置
>

+ **语法：**`**uni.pageScrollTo(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**scrollTop**` - 滚动到页面的目标位置（单位px）
        * `**selector**` - 元素选择器，用于指定要滚动到的元素位置
        * `**duration**` - 滚动动画的时长，默认 300ms，单位 ms
        * `**success**` - 接口调用成功的回调函数
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.pageScrollTo({
  scrollTop: 0,
  duration: 300
})
```

### 窗口
#### [uni.onWindowResize()](https://uniapp.dcloud.net.cn/api/ui/window.html#onwindowresize)
> 监听窗口尺寸变化事件
>

+ **语法：**`**uni.onWindowResize(CALLBACK)**`
+ **参数：**
    - `**CALLBACK**` 返回参数
        * `**size**` - 变化后的窗口的大小，单位为 px ，`{windowWidth,windowHeight}`
+ **说明：**
    - 如 App 端设置软键盘弹出方式为 adjustResize ，则在键盘弹出时，会触发此事件
    - 横竖屏切换时，会触发此事件

```javascript
const windowResizeCallback = res => {
  console.log('变化后的窗口宽度=' + res.size.windowWidth)
  console.log('变化后的窗口高度=' + res.size.windowHeight)
}
uni.onWindowResize(windowResizeCallback)
```

#### [uni.offWindowResize()](https://uniapp.dcloud.net.cn/api/ui/window.html#offwindowresize)
> 取消监听窗口尺寸变化事件
>

+ **语法：**`**uni.offWindowResize(CALLBACK)**`
+ **参数：**`**CALLBACK**` - 调用 `**<font style="color:rgba(233,105,0,1);">uni.onWindowResize</font>**` 时传入的 `**<font style="color:rgba(233,105,0,1);">CALLBACK</font>**`

```javascript
uni.offWindowResize(windowResizeCallback)
```

### 下拉刷新
#### [uni.startPullDownRefresh()](https://uniapp.dcloud.net.cn/api/ui/pulldown.html#startpulldownrefresh)
> 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
>

+ **语法：**`**uni.startPullDownRefresh(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用成功的回调，返回参数如下：
            + `**errMsg**` - 接口调用结果
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.startPullDownRefresh()
```

#### [uni.stopPullDownRefresh()](https://uniapp.dcloud.net.cn/api/ui/pulldown.html#stoppulldownrefresh)
> 停止当前页面下拉刷新
>

_**pages.json**_

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "uni-app",
        "enablePullDownRefresh": true
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#0faeff",
    "backgroundColor": "#fbf9fe"
  }
}
```

_**index.vue**_

```javascript
export default {
  data() {
    return {
      text: 'uni-app'
    }
  },
  onLoad: function (options) {
    setTimeout(function () {
      console.log('start pulldown')
    }, 1000)
    uni.startPullDownRefresh()
  },
  onPullDownRefresh() {
    console.log('refresh')
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  }
}
```

### 语言
#### [uni.getLocale()](https://uniapp.dcloud.net.cn/api/ui/locale.html#getlocale)
> 获取当前设置的语言
>

```javascript
uni.getLocale({
  success: function (res) {
    console.log(res.locale) // 输出当前设备的语言
  }
})
```

#### [uni.setLocale()](https://uniapp.dcloud.net.cn/api/ui/locale.html#setlocale)
> 设置当前语言
>

```javascript
uni.setLocale({
  language: 'zh-Hans' // 设置语言为中文简体
})
```

### 创建 web-view 组件上下文对象
#### [uni.createWebviewContext()](https://uniapp.dcloud.net.cn/api/create-webview-context.html)
> 创建 web-view 组件的上下文对象，用于操作 web-view 的行为
>

```vue
<template>
  <view>
    <web-view id="myWebView" src="https://example.com"></web-view>
    <button @click="sendMessageToWebView">Send Message</button>
  </view>
</template>

<script>
export default {
  methods: {
    sendMessageToWebView() {
      // 创建 WebView 上下文
      const webViewContext = uni.createWebviewContext('myWebView')

      // 发送消息到 WebView
      webViewContext.postMessage({ data: 'Hello from UniApp!' })
    }
  }
}
</script>0
```

### 获取服务提供商
#### uni.getProvider()
> 获取服务供应商
>

+ **语法：**`**uni.getProvider(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**service**` - 服务类型，可取值见下面说明，必填项，有效值如下：
            + `**oauth**` - 授权登录
            + `**share**` - 分享
            + `**payment**` - 支付
            + `**push**` - 推送
        * `**success**` - 接口调用成功的回调，返回参数如下：
            + `**service**` - 服务类型
            + `**provider**` - 得到的服务供应商
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getProvider({
  service: 'oauth',
  success: function (res) {
    console.log(res.provider)
    if (~res.provider.indexOf('qq')) {
      uni.login({
        provider: 'qq',
        success: function (loginRes) {
          console.log(JSON.stringify(loginRes))
        }
      })
    }
  }
})
```

### 登录
#### [uni.login()](https://uniapp.dcloud.net.cn/api/plugins/login.html#login)
> 登录
>

+ **语法：**`**uni.login(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**provider**` - 登录服务提供商，通过 [uni.getProvider](#XHysp) 获取，如果不设置则弹出登录列表选择界面
        * `**onlyAuthorize**` - `**<font style="color:rgba(233,105,0,1);">微信登录</font>**` 仅请求授权认证
        * `**success**` - 接口调用成功的回调，返回参数如下：
            + `**authResult**` - 登录服务商提供的登录信息，服务商不同返回的结果不完全相同
            + `**code**` - 用户登录凭证。开发者需要在开发者服务器后台，使用 code 换取 openid 和 session_key 等信息
            + `**errMsg**` - 描述信息
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.login({
  provider: 'weixin', // 使用微信登录
  success: function (loginRes) {
    console.log(loginRes.authResult)
  }
})
```

#### [uni.getUserInfo()](https://uniapp.dcloud.net.cn/api/plugins/login.html#getuserinfo)
> 获取用户信息
>

+ **语法：**`**uni.getUserInfo(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**provider**` - 登录服务提供商，通过 [uni.getProvider](#XHysp) 获取
        * `**success**` - 接口调用成功的回调，返回参数如下：
            + `**userInfo**` - 用户对象，参数如下：
                - `**nickName**` - 用户昵称
                - `**avatarUrl**` - 用户头像
            + `**errMsg**` - 描述信息
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.login({
  provider: 'weixin',
  success: function (loginRes) {
    console.log(loginRes.authResult)
    // 获取用户信息
    uni.getUserInfo({
      provider: 'weixin',
      success: function (infoRes) {
        console.log('用户昵称为：' + infoRes.userInfo.nickName)
      }
    })
  }
})
```

### 分享
#### [uni.share()](https://uniapp.dcloud.net.cn/api/plugins/share.html#share)
> 分享
>

+ **语法：**`**uni.share(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**provider**` - 分享服务提供商（即weixin|qq|sinaweibo），通过 uni.getProvider 获取可用的分享服务商，必填项
        * `**type**` - 分享形式，可取值如下：
            + `**0**` - 图文
            + `**1**` - 纯文字
            + `**2**` - 纯图片
            + `**3**` - 音乐
            + `**4**` - 视频
            + `**5**` - 小程序
        * `**title**` - 分享内容的标题
        * `**scene**` - 场景。provider 为 weixin 时必选，可取值如下：
            + `**WXSceneSession**` - 分享到聊天界面
            + `**WXSceneTimeline**` - 分享到朋友圈
            + `**WXSceneFavorite**` - 分享到微信收藏
        * `**summary**` - 分享内容的摘要。type 为 1 时必选
        * `**href**` - 跳转链接。type 为 0 时必选
        * `**imageUrl**` - 图片地址。type 为 0 时，推荐使用小于 20Kb 的图片，type 为 0、2、5 时必选
        * `**mediaUrl**` - 音视频地址。type 为 3、4 时必选
        * `**miniProgram**` - 分享小程序必要参数。type 为 5 时必选
            + `**id**` - 微信小程序原始 id
            + `**path**` - 点击链接进入的页面
            + `**type**` - 微信小程序版本类型，可取值如下：
                - `**0**` - 正式版（默认）
                - `**1**` - 测试版
                - `**2**` - 体验版
            + `**webUrl**` - 兼容低版本的网页链接
        * `**openCustomerServiceChat**` - 是否启用拉起客服功能
        * `**corpid**` - 客服 ID。`**<font style="color:rgba(233,105,0,1);">openCustomerServiceChat = true</font>**` 时必填
        * `**customerUrl**` - 客服的页面路径。`**<font style="color:rgba(233,105,0,1);">openCustomerServiceChat = true</font>**` 时必填
        * `**success**` - 接口调用成功的回调
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

##### 分享到微信聊天界面
```javascript
// 分享文字
uni.share({
  provider: 'weixin',
  scene: 'WXSceneSession',
  type: 1,
  summary: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
  success: function (res) {
    console.log('success:' + JSON.stringify(res))
  },
  fail: function (err) {
    console.log('fail:' + JSON.stringify(err))
  }
})

// 分享图片
uni.share({
  provider: 'weixin',
  scene: 'WXSceneSession',
  type: 2,
  imageUrl: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png',
  success: function (res) {
    console.log('success:' + JSON.stringify(res))
  },
  fail: function (err) {
    console.log('fail:' + JSON.stringify(err))
  }
})

// 分享图文
// href、imageUrl 为必选参数，title/summary 二选一，最好将这四个参数都选上
uni.share({
  provider: 'weixin',
  scene: 'WXSceneSession',
  type: 0,
  href: 'http://uniapp.dcloud.io/',
  title: 'uni-app分享',
  summary: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
  imageUrl: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png',
  success: function (res) {
    console.log('success:' + JSON.stringify(res))
  },
  fail: function (err) {
    console.log('fail:' + JSON.stringify(err))
  }
})
```

##### 分享到微信朋友圈
```javascript
// 分享文字
uni.share({
  provider: 'weixin',
  scene: 'WXSceneTimeline',
  type: 1,
  summary: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
  success: function (res) {
    console.log('success:' + JSON.stringify(res))
  },
  fail: function (err) {
    console.log('fail:' + JSON.stringify(err))
  }
})

// 分享图片
uni.share({
  provider: 'weixin',
  scene: 'WXSceneTimeline',
  type: 2,
  imageUrl: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png',
  success: function (res) {
    console.log('success:' + JSON.stringify(res))
  },
  fail: function (err) {
    console.log('fail:' + JSON.stringify(err))
  }
})

// 分享图文
// href、imageUrl 为必选参数，title、summary 至少有一项
uni.share({
  provider: 'weixin',
  scene: 'WXSceneTimeline',
  type: 0,
  href: 'http://uniapp.dcloud.io/',
  title: 'uni-app分享',
  summary: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
  imageUrl: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png',
  success: function (res) {
    console.log('success:' + JSON.stringify(res))
  },
  fail: function (err) {
    console.log('fail:' + JSON.stringify(err))
  }
})
```

##### App分享为微信小程序
> App 中分享一个内容到微信好友，对方微信中呈现的是一个小程序卡片
>

```javascript
uni.share({
  provider: 'weixin',
  scene: 'WXSceneSession',
  type: 5,
  imageUrl: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/share-logo@3.png',
  title: '欢迎体验uniapp',
  miniProgram: {
    id: 'gh_abcdefg',
    path: 'pages/index/index',
    type: 0,
    webUrl: 'http://uniapp.dcloud.io'
  },
  success: ret => {
    console.log(JSON.stringify(ret))
  }
})
```

##### 分享配置
1. 打开 manifest.json -> App模块配置，勾选 Share(分享)
2. 在 manifest.json 的 App SDK 配置里，勾选微信消息及朋友圈，并填写 appid，如需在iOS平台使用还需要配置通用链接
    - 微信 appid 申请步骤：[https://ask.dcloud.net.cn/article/208](https://ask.dcloud.net.cn/article/208)
    - iOS 平台微信 SDK 配置通用链接：[https://ask.dcloud.net.cn/article/36445](https://ask.dcloud.net.cn/article/36445)

#### [uni.shareWithSystem()](https://uniapp.dcloud.net.cn/api/plugins/share.html#sharewithsystem)
> 调用系统分享组件发送分享消息，不需要配置分享 SDK
>

+ **语法：**`**uni.shareWithSystem(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**type**` - 分享类型，只支持 text，image，默认为 text
        * `**summary**` - 分享的文字内容
        * `**href**` - 分享链接，ios 端分享到微信时必填此字段
        * `**imageUrl**` - 分享图片，仅支持本地路径
        * `**success**` - 接口调用成功的回调
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.shareWithSystem({
  summary: '',
  href: 'https://uniapp.dcloud.io',
  success() {
    // 分享完成，请注意此时不一定是成功分享
  },
  fail() {
    // 分享失败
  }
})
```

#### [onShareAppMessage()](https://uniapp.dcloud.net.cn/api/plugins/share.html#onshareappmessage)
> 小程序中用户点击分享后，在 js 中定义 onShareAppMessage 处理函数（和 onLoad 等生命周期函数同级），设置该页面的分享信息
>

+ **语法：**`**onShareAppMessage(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**from**` - 分享事件来源
            + `**button**` - 页面内分享按钮
            + `**menu**` - 右上角分享按钮
        * `**target**` - 如果 from 值是 button，则 target 是触发这次分享事件的 button，否则为 undefined
        * `**webViewUrl**` - 页面中包含 `**<font style="color:rgba(233,105,0,1);"><web-view></font>**` 组件时，返回当前 `**<font style="color:rgba(233,105,0,1);"><web-view></font>**` 的url
+ **此事件需要 return 一个 Object**，用于自定义分享内容，其内容如下：
    - `**title**` - 分享标题，必填项
    - `**path**` - 页面 path ，必须是以 / 开头的完整路径。注意：京东小程序，开头不要加 '/'，必填项
    - `**imageUrl**` - 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。支持 PNG 及 JPG。显示图片长宽比是 5:4
+ **注意：**微信、头条平台：只有定义了此事件处理函数，小程序右上角菜单才会显示“转发”按钮

```javascript
export default {
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: '自定义分享标题',
      path: '/pages/test/test?id=123'
    }
  }
}
```

### 支付
#### [uni.requestPayment()](https://uniapp.dcloud.net.cn/api/plugins/payment.html)
> 支付
>

+ **语法：**`**uni.requestPayment(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**provider**` - 服务提供商，通过 [uni.getProvider](#XHysp) 获取，必填项
        * `**orderInfo**` - 订单数据，必填项
        * `**timeStamp**` - 时间戳从 1970年1月1日 至今的秒数，即当前的时间，微信小程序必填
        * `**nonceStr**` - 随机字符串，长度为 32 个字符以下，微信小程序必填
        * `**package**` - 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx，微信小程序必填
        * `**signType**` - 签名算法，应与后台下单时的值一致，微信小程序必填，合法值如下：
            + `**MD5**` - 仅在 v2 版本接口适用
            + `**HMAC-SHA256**` - 仅在 v2 版本接口适用
            + `**RSA**` - 仅在 v3 版本接口适用
        * `**paySign**` - 签名，具体签名方案参见：[微信小程序支付文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3)，微信小程序必填
        * `**success**` - 接口调用成功的回调
        * `**fail**` - 接口调用失败的回调函数
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

##### App 支付
1. 在 `**<font style="color:rgba(233,105,0,1);">manifest.json - App模块配置</font>**` 中勾选 Payment(支付)
2. 然后勾选需要的支付平台，其中微信支付需要填写从微信开放平台获取的 AppID

```javascript
uni.requestPayment({
  provider: 'alipay',
  orderInfo: 'orderInfo', // 微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
  success: function (res) {
    console.log('success:' + JSON.stringify(res))
  },
  fail: function (err) {
    console.log('fail:' + JSON.stringify(err))
  }
})
```

##### 微信 App 支付
1. 到 [微信开放平台](https://open.weixin.qq.com/) 申请移动应用并开通支付功能，申请应用后可以获取 AppID 和 AppSecret 值
2. 应用接入 [微信商户平台](https://pay.weixin.qq.com/)，选择 App 支付
3. 需要将从微信开放平台申请的 appid，填回到 manifest - App模块配置 - Payment(支付) - 微信支付中

```javascript
uni.requestPayment({
  provider: 'wxpay',
  orderInfo: {
    appid: 'wx499********7c70e', // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
    noncestr: 'c5sEwbaNPiXAF3iv', // 随机字符串
    package: 'Sign=WXPay', // 固定值
    partnerid: '148*****52', // 微信支付商户号
    prepayid: 'wx202254********************fbe90000', // 统一下单订单号
    timestamp: 1597935292, // 时间戳（单位：秒）
    sign: 'A842B45937F6EFF60DEC7A2EAA52D5A0' // 签名，这里用的 MD5/RSA 签名
  },
  success(res) {},
  fail(e) {}
})
```

##### 微信小程序支付
```javascript
uni.requestPayment({
  provider: 'wxpay',
  timeStamp: String(Date.now()),
  nonceStr: 'A1B2C3D4E5',
  package: 'prepay_id=wx20180101abcdefg',
  signType: 'MD5',
  paySign: '',
  success: function (res) {
    console.log('success:' + JSON.stringify(res))
  },
  fail: function (err) {
    console.log('fail:' + JSON.stringify(err))
  }
})
```

### 推送
#### [uni.getPushClientId()](https://uniapp.dcloud.net.cn/api/plugins/push.html#getpushclientid)
> 获取客户端唯一的推送标识
>

+ **语法：**`**uni.getPushClientId(OBJECT)**`
+ **参数：**
    - `**OBJECT**`
        * `**success**` - 接口调用的回调函数，详见返回参数说明，必填项，返回参数如下：
            + `**cid**` - 个推客户端推送 id，对应 uni-id-device 表的 push_clientid
            + `**errMsg**` - 错误描述
        * `**fail**` - 接口调用失败的回调函数，返回参数如下：
            + `**errMsg**` - 错误描述
        * `**complete**` - 接口调用结束的回调函数（调用成功、失败都会执行）

```javascript
uni.getPushClientId({
  success: res => {
    console.log(res.cid)
  },
  fail(err) {
    console.log(err)
  }
})
```

#### [uni.onPushMessage()](https://uniapp.dcloud.net.cn/api/plugins/push.html#onpushmessage)
> 启动监听推送消息事件
>

+ **语法：**`**uni.onPushMessage(callback)**`
+ **参数：**
    - `**callback**` - 回调函数，回调参数如下：
        * `**type**` - 事件类型，可取值如下：
            + `**click**` - 从系统推送服务点击消息启动应用事件
            + `**receive**` - 应用从推送服务器接收到推送消息事件
        * `**data**` - 消息内容

```javascript
uni.onPushMessage(res => {
  console.log(res)
})
```

#### [uni.offPushMessage()](https://uniapp.dcloud.net.cn/api/plugins/push.html#offpushmessage)
> 关闭推送消息监听事件
>

+ **注意：**如果 `**uni.offPushMessage**` 没有传入参数，则移除 App级别 的所有事件监听器

```javascript
let callback = res => {
  console.log(res)
}
// 启动推送事件监听
uni.onPushMessage(callback)
// 关闭推送事件监听
uni.offPushMessage(callback)
```

## 内置 CSS 变量
| CSS 变量 | 描述 | App | 小程序 | H5 |
| --- | --- | --- | --- | --- |
| --status-bar-height | 系统状态栏高度 | [系统状态栏高度](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.getStatusbarHeight) | 25px | 0 |
| --window-top | 内容区域距离顶部的距离 | 0 | 0 | NavigationBar 的高度 |
| --window-bottom | 内容区域距离底部的距离 | 0 | 0 | TabBar 的高度 |


1. **普通页面使用 css 变量**

```vue
<template>
  <!-- HBuilderX 2.6.3+ 新增 page-meta, 详情：https://uniapp.dcloud.io/component/page-meta -->
  <page-meta>
    <navigation-bar />
  </page-meta>
  <view>
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view>状态栏下的文字</view>
  </view>
</template>

<style>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
```

```vue
<template>
  <view>
    <view class="toTop">
      <!-- 这里可以放一个向上箭头，它距离底部tabbar上浮10px-->
    </view>
  </view>
</template>

<style>
.toTop {
  bottom: calc(var(--window-bottom) + 10px);
}
</style>
```

2. **nvue 页面获取状态栏高度**
+ 目前 nvue 在 App 端，还不支持 --status-bar-height变量，可以使用替代方案：`**uni.getSystemInfoSync().statusBarHeight**`

```vue
<template>
  <view class="content">
    <view :style="{ height: iStatusBarHeight + 'px' }"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      iStatusBarHeight: 0
    }
  },
  onLoad() {
    this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
  }
}
</script>
```

## 静态资源引入
> 引入非 `**static**` 目录中的静态资源，需要在** **`**js/uts**` 文件中使用 `**import**` 来引入
>

```vue
<template>
  <view class="content">
    <image :src="src" />
  </view>
</template>

<script>
// 使用 import 引入静态资源，并在 data 中赋值引用
import icon_src from './icon.png'

export default {
  data() {
    return {
      src: icon_src
    }
  }
}
</script>
```

## 背景图片和字体图标使用
> 小程序不支持在 css 中使用本地文件，包括本地的背景图和字体文件。需以 base64 方式方可使用
>

1. 背景图或字体文件小于 40 kb 时，`**uni-app**` 会自动将其转化为 base64 格式
2. 背景图或字体文件大于等于 40 kb，会有性能问题，建议放到服务器上， 直接引用网络地址，网络路径必须加协议头 `**https**`
3. 本地背景图片或字体文件的引用路径推荐使用以 ~@ 开头的绝对路径

```css
.test2 {
  background-image: url('~@/static/logo.png');
}

@font-face {
	font-family: test1-icon;
	src: url('~@/static/iconfont.ttf');
}
```

+ `**nvue**` 中不可直接使用 css 的方式引入字体文件，需要使用以下方式在 js 内引入。nvue 内不支持本地路径引入字体，请使用网络链接或者 `**base64**` 形式。

```javascript
var domModule = weex.requireModule('dom')
domModule.addRule('fontFace', {
  fontFamily: 'fontFamilyName',
  // 注意：src字段的url的括号内一定要使用单引号
  src: "url('https://...')"
})
```

**示例：**

```vue
<template>
  <view>
    <view>
      <text class="test">&#xe600;</text>
      <text class="test">&#xe687;</text>
      <text class="test">&#xe60b;</text>
    </view>
  </view>
</template>

<style>
@font-face {
  font-family: 'iconfont';
  /* 
    format - 用于定义字体格式
      - truetype: 表示字体文件是 TrueType 字体格式（.ttf），这种格式常见且广泛支持，适用于多种操作系统和浏览器
      - woff: 表示字体文件是 Web Open Font Format 字体格式（.woff）
      - woff2: 表示字体文件是 Web Open Font Format 2 字体格式（.woff2），这种格式是 woff 的升级版，支持更高的压缩率，适用于现代浏览器
      - opentype: 表示字体文件是 OpenType 字体格式（.otf）
  */
  src: url('https://at.alicdn.com/t/font_865816_17gjspmmrkti.ttf') format('truetype');
}
.test {
  font-family: iconfont;
  margin-left: 20rpx;
}
</style>
```

## 手机端事件映射表
> `**uni-app**` 运行在手机端，没有键盘事件，所以不支持按键修饰符
>

```javascript
// 事件映射表，左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件
{
  click: 'tap',
  touchstart: 'touchstart',
  touchmove: 'touchmove',
  touchcancel: 'touchcancel',
  touchend: 'touchend',
  tap: 'tap',
  longtap: 'longtap', //推荐使用longpress代替
  input: 'input',
  change: 'change',
  submit: 'submit',
  blur: 'blur',
  focus: 'focus',
  reset: 'reset',
  confirm: 'confirm',
  columnchange: 'columnchange',
  linechange: 'linechange',
  error: 'error',
  scrolltoupper: 'scrolltoupper',
  scrolltolower: 'scrolltolower',
  scroll: 'scroll'
}
```

## Vue 语法在 uni-app 中使用差异
1. `**<block/>**` 在不同的平台表现存在一定差异，推荐统一使用 `**<template/>**`

```vue
<template>
	<view>
		<template v-if="test">
			<view>test 为 true 时显示</view>
		</template>
		<template v-else>
			<view>test 为 false 时显示</view>
		</template>
	</view>
</template>
```

2. 建议将 `**<div>**` 标签替换为 `**<view>**`** **组件，将 `**<span>**` 标签替换为 `**<text>**` 组件

```vue
<template>
	<view>
		<text>这是一段文本</text>
	</view>
</template>
```

3. 通过 uni-app 的 easycom，只要组件安装在项目的 `**components**` 目录下，并符合 `**components/组件名称/组件名称.vue**` 目录结构。就可以不用引用、注册，直接在页面中使用。

```vue
<template>
  <view>
    <!-- 使用组件 -->
    <uni-badge text="1"></uni-badge>
  </view>
</template>
<script>
// 这里不用import引入，也不需要在components内注册uni-badge组件。template里就可以直接用
export default {
  data() {
    return {}
  }
}
</script>
```

4. 小程序端不支持 `**classObject**` 和 `**styleObject**` 语法

```vue
<!-- 小程序端不支持这种语法 -->
<template>
  <view>
    <view :class="{ active: true, 'text-danger': false }">hello uni-app</view>
    <view :style="{ color: 'red', fontSize: '20px' }">hello uni-app</view>
  </view>
</template>
```

## 条件编译处理多端差异
> 条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。
>

+ **使用方法：**以 `**#ifdef**` 或 `**#ifndef**` 加 `**%PLATFORM%**` 开头，以 `**#endif**` 结尾。
    - `**#ifdef**`：if defined 仅在某平台存在
    - `**#ifndef**`：if not defined 除了某平台均存在
    - `**%PLATFORM%**`：平台名称，[可取值](https://uniapp.dcloud.net.cn/tutorial/platform.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)

| 条件编译写法 | 说明 |
| --- | --- |
| #ifdef APP_PLUS<br/>需条件编译的代码<br/>#endif | 仅出现在 APP 平台下的代码 |
| #ifndef H5<br/>需条件编译的代码<br/>#endif | 除了 H5 平台，其他平台均存在的代码（注意 if 后面有个 n） |
| #ifdef H5 || MP-WEIXIN<br/>需条件编译的代码<br/>#endif | 在 H5 平台或微信小程序平台存在的代码（这里只有 ||，不可能出现 &&，因为没有交集） |


+ **注意：**使用条件编译请保证**编译前**和**编译后**文件语法的正确性，比如：json文件中不能有多余的逗号，js中不能重复导入

```json
{
  "key": "a"
  // #ifdef MP-WEIXIN
  ,"key": "b"
  // #endif
}
```

```javascript
// #ifdef MP-WEIXIN
import a as aWx from 'a/wx'
// #endif

// #ifndef MP-WEIXIN
import a as aIndex from 'a/index'
// #endif

var a
// #ifdef MP-WEIXIN
a = aWx
// #endif

// #ifndef MP-WEIXIN
a = aIndex
// #endif
```

### API 的条件编译
> 平台特有 API 实现
>

```javascript
// 如下代码仅在 APP 下出现
// #ifdef APP-PLUS
plus.push.addEventListener('click', function (msg) {
  let payload = null
  let action = ''
  if (msg.payload) {
    if (typeof msg.payload === 'string') {
      payload = JSON.parse(msg.payload)
    }
    action = payload.action
    if (action === 'open') {
      plus.webview.open(payload.url)
    }
  }
})
// #endif

// 如下代码不会在 H5 平台上出现
// #ifndef H5
uni.scanCode({
  success: res => {
    console.log(res.result)
  }
})
// #endif

// 如下代码会在 App 和 H5 平台上出现
// #ifdef APP-PLUS || H5
uni.chooseVideo({
  success: res => {
    console.log(res.result)
  }
})
// #endif
```

### 组件的条件编译
> 平台特有组件
>

```html
<view>
  <view>微信公众号关注组件</view>
  <view>
    <!-- uni-app未封装，但可直接使用微信原生的official-account组件 -->
    <!-- #ifdef MP-WEIXIN -->
    <official-account></official-account>
    <!-- #endif -->
  </view>
</view>
```

### 样式的条件编译
> 平台特有样式
>

```css
/* #ifdef MP-WEIXIN */
.wx-color {
  color: #fff000;
}
/* #endif */
```

### pages.json 的条件编译
```json
// #ifdef APP-PLUS
{
  "path": "pages/speech/speech",
  "style": {
    "navigationBarTitleText": "语音识别"
  }
}
// #endif
```

### static 目录的条件编译
> 在 `**static**` 目录下新建不同平台的专有目录，目录名称均为 **小写**，专有目录下的静态资源只有在特定平台才会编译进去。
>

**更多目录名称：**[请查看](https://uniapp.dcloud.net.cn/tutorial/platform.html#static)

| 目录名称 | 说明 |
| :---: | :---: |
| app-plus | app（推荐使用 `**app**`） |
| app | app |
| h5 | H5（推荐使用 `**web**`） |
| web | web |
| mp-weixin | 微信小程序 |


+ 如以下目录结构，`**a.png**` 只有在微信小程序平台才会编译进去，`**b.png**` 在所有平台都会被编译。

```shell
┌─static
│  ├─mp-weixin
│  │  └─a.png
│  └─b.png
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

## web 专题
### 跨域
+ **注意：**这两种方法不能同时使用，第一种会覆盖第第二种方案
1. **在 manifest.json 去配置**

```json
// manifest.json
{
    "h5": {
        "devServer": {
            "proxy": {
                "/prefix/api/user/list": {
                    "target": "https://api-remote.xxxx.com",
                    "pathRewrite": {
                        "^/prefix": ""
                    }
                }
            }
        }
    }
}
```

2. **在 vue.config.js 中配置 devServer**

```javascript
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/prefix/api/user/list': {
        target: 'https://api-remote.xxxx.com',
        pathRewrite: {
          '^/prefix': ''
        }
      }
    },
  }
}
```

### 宽屏适配
**rpx 转 px**

+ 项目根目录新增文件 `**postcss.config.js**`，内容如下。则在编译时，编译器会自动转换 rpx 单位为 px
+ 注意：将 `**rpx**` 作为百分比的用法需要手动处理

```javascript
// postcss.config.js

const path = require('path')
module.exports = {
  parser: 'postcss-comment',
  plugins: {
    'postcss-import': {
      resolve(id, basedir, importOptions) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
        } else if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
        }
        return id
      }
    },
    'autoprefixer': {
      overrideBrowserslist: ["Android >= 4", "ios >= 8"],
      remove: process.env.UNI_PLATFORM !== 'h5'
    },
    // 借助postcss-px-to-viewport插件，实现rpx转px，文档：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
    // 以下配置，可以将rpx转换为1/2的px，如20rpx=10px，如果要调整比例，可以调整 viewportWidth 来实现
    'postcss-px-to-viewport': {
      unitToConvert: 'rpx',
      viewportWidth: 200,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'px',
      fontViewportUnit: 'px',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false
    },
    '@dcloudio/vue-cli-plugin-uni/packages/postcss': {}
  }
}
```

## 小程序专题
### 小程序自定义组件
**小程序组件存放目录：**[**更多请查看**](https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject.html)

+ **注意：**HBuilderX 建立的工程 `**wxcomponents**` 文件夹在 项目根目录下。vue-cli 建立的工程 `**wxcomponents**` 文件夹在 `**src**` 目录下。

**目录结构**

```shell
┌─wxcomponents                  微信小程序自定义组件存放目录
│   └──custom                   微信小程序自定义组件
│		├─index.js
│		├─index.wxml
│		├─index.json
│		└─index.wxss
├─mycomponents                  支付宝小程序自定义组件存放目录
│   └──custom                   支付宝小程序自定义组件
│		├─index.js
│		├─index.axml
│		├─index.json
│		└─index.acss
├─swancomponents                百度小程序自定义组件存放目录
│   └──custom                   百度小程序自定义组件
│		├─index.js
│		├─index.swan
│		├─index.json
│		└─index.css
├─pages
│  └─index
│		└─index.vue
│
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

**使用方式**

+ 在 `**pages.json**` 对应页面的 style -> usingComponents 引入组件：

```javascript
{
	"pages": [{
		"path": "index/index",
		"style": {
			// #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
			"usingComponents": {
				"custom": "/wxcomponents/custom/index"
			},
			// #endif
			// #ifdef MP-BAIDU
			"usingComponents": {
				"custom": "/swancomponents/custom/index"
			},
			// #endif
			// #ifdef MP-ALIPAY
			"usingComponents": {
				"custom": "/mycomponents/custom/index"
			},
			// #endif
			"navigationBarTitleText": "uni-app"
		}
	}]
}
```

+ 在页面中使用

```html
<!-- 页面模板 (index.vue) -->
<view>
    <!-- 在页面中对自定义组件进行引用 -->
    <custom name="uni-app"></custom>
</view>
```

### WXS
+ 完整 WXS 语法，请参考 [WXS 语法参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)
+ **注意：**
    -  编写wxs、sjs、filter.js 内容时必须遵循相应语法规范
    - `**module**` 所指定的模块名不可与 `**data**`、`**methods**`、`**computed**` 内的属性重名
    - **更多注意事项请查看：**[**WXS**](https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject.html#wxs)

```vue
<template>
	<view>
		<view class="area">
			<view @touchstart="test.touchstart" @touchmove="test.touchmove" class="movable">{{test.msg}}</view>
		</view>
	</view>
</template>

<script module="test" lang="wxs">
	var startX = 0
	var startY = 0
	var lastLeft = 50; var lastTop = 50
	function touchstart(event, ins) {
		console.log("touchstart")
	  var touch = event.touches[0] || event.changedTouches[0]
	  startX = touch.pageX
	  startY = touch.pageY
	}
	function touchmove(event, ins) {
	  var touch = event.touches[0] || event.changedTouches[0]
	  var pageX = touch.pageX
	  var pageY = touch.pageY
	  var left = pageX - startX + lastLeft
	  var top = pageY - startY + lastTop
	  startX = pageX
	  startY = pageY
	  lastLeft = left
	  lastTop = top
	  ins.selectComponent('.movable').setStyle({
	    left: left + 'px',
	    top: top + 'px'
	  })
		return false
	}
	module.exports = {
		msg: 'Hello',
	  touchstart: touchstart,
	  touchmove: touchmove
	}
</script>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style>
.area{
	position: absolute;
	width: 100%;
	height: 100%;
}
.movable{
	position: absolute;
	width: 100px;
	height: 100px;
	left: 50px;
	top: 50px;
	color: white;
	text-align: center;
	line-height: 100px;
	background-color: red;
}
</style>
```

## App 专题
### nvue 原生渲染
> 在 App 端，如果使用 vue 页面，则使用 webview 渲染；如果使用 nvue 页面(native vue 的缩写)，则使用原生渲染
>

#### nvue 开发与 vue 开发的常见区别（[详细](https://uniapp.dcloud.net.cn/tutorial/nvue-outline.html#nvue%E5%BC%80%E5%8F%91%E4%B8%8Evue%E5%BC%80%E5%8F%91%E7%9A%84%E5%B8%B8%E8%A7%81%E5%8C%BA%E5%88%AB)）
1. nvue 页面控制显隐只可以使用 `**v-if**` 不可以使用 `**v-show**`
2. nvue 页面只能使用 `**flex**` 布局，不支持其他布局方式。
3. nvue 页面的布局排列方向默认为竖排（`**column**`）
4. 文字内容，必须、只能在 `**<text>**` 组件下，只有 `**text**` 标签可以设置字体大小，字体颜色。
5. 不支持背景图。但可以使用 `**image**` 组件和层级来实现类似 web 中的背景效果。
6. 不能在 style 中引入字体文件
7. 使用 `**image**` 标签，支持使用 base64，不支持 svg 格式图片

#### 常用 API
**DOM.addRule**

> 加载自定义字体
>

+ **语法：**`**addRule(type, contentObject)**`
+ **参数：**
    - `**type**` - fontFace 协议名称，不可修改
    - `**contentObject**`
        * `**fontFamily**` - `**font-family**` 的名称
        * `**src**` - 字体地址

```vue
<template>
  <view>
    <text class="my-iconfont">&#xe85c;</text>	
  </view>
</template>

<script>
export default{
  beforeCreate() {
    const domModule = uni.requireNativePlugin('dom')
    domModule.addRule('fontFace', {
      'fontFamily': "myIconfont",
      'src': "url('http://at.alicdn.com/t/font_2234252_v3hj1klw6k9.ttf')"
    });
  }
}
</script>

<style>
.my-iconfont {
  font-family:myIconfont;
  font-size:60rpx;
  color: #00AAFF;
}
</style>
```

**DOM.scrollToElement**

> 让页面滚动到 ref 对应的组件，这个 API 只能用于可滚动组件的子节点，例如 `**<scroller>**`，`**<list>**`, `**<waterfall>**` 等可滚动组件中。
>

+ **语法：**`**scrollToElement(ref, options)**`
+ **参数：**
    - `**ref**` - 要滚动的节点
    - `**options**`
        * `**offset**` - 到其可见位置的偏移距离，默认是 0
        * `**animated**` - 是否需要附带滚动动画，默认是 true

```vue
<template>
  <view class="wrapper">
    <scroller class="scroller">
      <view class="row" v-for="(name, index) in rows" :ref="'item'+index">
        <text class="text" :ref="'text'+index">{{name}}</text>
      </view>
    </scroller>
    <view class="group">
      <text @click="goto10" class="button">Go to 10</text>
      <text @click="goto20" class="button">Go to 20</text>
    </view>
  </view>
</template>

<script>
const dom = uni.requireNativePlugin('dom')
export default {
  data() {
    return {
      rows: []
    }
  },
  created() {
    for (let i = 0; i < 30; i++) {
      this.rows.push('row ' + i)
    }
  },
  methods: {
    goto10(count) {
      const el = this.$refs.item10[0]
      dom.scrollToElement(el, {})
    },
    goto20(count) {
      const el = this.$refs.item20[0]
      dom.scrollToElement(el, {
        offset: 0
      })
    }
  }
}
</script>

<style scoped>
.scroller {
  width:700rpx;
  height:500px;
  border-width: 3px;
  border-style: solid;
  border-color: rgb(162, 217, 192);
  margin:0 25rpx;
}
.row {
  height: 100rpx;
  flex-direction: column;
  justify-content: center;
  padding-left: 30rpx;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #DDDDDD;
}
.text {
  font-size: 45rpx;
  color: #666666;
}
.group {
  flex-direction: row;
  justify-content: center;
  margin-top: 60rpx;
}
.button {
  width: 200rpx;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  font-size: 40rpx;
  margin-left: 30rpx;
  margin-right: 30rpx;
  text-align: center;
  color: #41B883;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(162, 217, 192);
  background-color: rgba(162, 217, 192, 0.2);
}
</style>
```

**DOM.getComponentRect**

> 获取某个元素 View 的外框
>

+ **语法：**`**getComponentRect(ref, callback)**`
+ **参数：**
    - `**ref**` - 要获取外框的节点
    - `**callback**` - 异步方法，通过回调返回信息

```javascript
// 回调返回的数据样例：
{
  result: true,
  size: {
      bottom: 60,
      height: 15,
      left: 0,
      right: 353,
      top: 45,
      width: 353
  }
}
```

### HTML5+
+ 在 uni-app 调用 [**H5+**](https://www.html5plus.org/doc/h5p.html) 的扩展规范时，需要注意使用条件编译

```javascript
// #ifdef APP-PLUS
var appid = plus.runtime.appid;
console.log('应用的 appid 为：' + appid);
// #endif
```

+ uni-app 中，没有 document，可以使用 `**plus.globalEvent.addEventListener**` 来实现

```javascript
// #ifdef APP-PLUS
// 监听新意图事件
plus.globalEvent.addEventListener('newintent', function(){});
// #endif
```

### App 使用高斯模糊
#### tabBar 使用高斯模糊效果
1. 高度适配，解决部分机型出现页面被遮挡问题

```json
// manifest.json
"app-plus": {
	...
	"safearea" : {
		 "bottom" : {
		      "offset" : "none"
		 }
	}
	...
}
```

2. 设置高斯模糊，`**pages.json**` 中的 `**tabBar**` 中配置 `**blurEffect**` 属性
+ `**blurEffect**` 可取值：
    - `**dark**` - 暗风格模糊
    - `**extralight**` - 高亮风格模糊
    - `**light**` - 亮风格模糊
    - `**none**` - 无模糊效果

```json
{
	...
	...
	
	"tabBar": {
		"blurEffect":"extralight",
		"color": "#999999",
		"borderStyle": "#000000",
		// 注意：启用高斯模糊效果后不建议设置backgroundColor，如果需要设置的需要使用 rgba 设置透明度，不然看不到模糊效果
		// "backgroundColor": "rgba(0,255,51,0.3)",
		"spacing": "5px",
		"height": "50px",
		"selectedColor": "#0062cc",
		"list": [
		{
		    "text" : "HELLO",
		    "iconPath" : "static/ic_tabbar_home_nor.png",
		    "selectedIconPath" : "static/ic_tabbar_home_sel.png",
			"pagePath": "pages/index/index"
		},
		{
		    "text" : "WORLD",
		    "iconPath" : "static/ic_tabbar_group_nor.png",
		    "selectedIconPath" : "static/ic_tabbar_group_sel.png",
			"pagePath": "pages/index/page"
		}]
	}
}
```

3. 页面适配

```javascript
// vue中直接在 css 中使用
.fixed1{
	position: fixed;
	left: 0;
	bottom: var(--window-bottom);
}

// nvue 不支持css的写法，请使用 js 方法 获取
uni.getSystemInfoSync().windowBottom
```

#### navigation-bar 使用高斯模糊效果
+ 页面 style --> app-plus --> titleNView 中添加 `**blurEffect**`** **属性
+ `**blurEffect**` 可取值：
    - `**dark**` - 暗风格模糊
    - `**extralight**` - 高亮风格模糊
    - `**light**` - 亮风格模糊
    - `**none**` - 无模糊效果

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "vue",
				"app-plus":{
					"bounce":"vertical",
					"titleNView": {
						"blurEffect":"extralight",
						"backgroundColor": "#00ffffff",
						"type" : "float"
					}
				}
			}
		}
}
```

## page.json
### [globalStyle](https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle)
> 用于设置应用的状态栏、导航条、标题、窗口背景色等。
>

```json
{
  "globalStyle": {
    "navigationBarTextStyle": "black", // 导航栏标题颜色及状态栏前景颜色，仅支持 black/white
    "navigationBarTitleText": "演示", // 导航栏标题文字内容
    "navigationBarBackgroundColor": "#F8F8F8", // 导航栏背景颜色（同状态栏背景色）
    "backgroundColor": "#F8F8F8", // 下拉显示出来的窗口的背景色
    // 引用小程序组件
    "usingComponents": {
      "collapse-tree-item": "/components/collapse-tree-item"
    },
    "renderingMode": "seperated", // 同层渲染，仅微信小程序，webrtc 无法正常时尝试配置 seperated 强制关掉同层
    "pageOrientation": "portrait", // 横屏配置，全局屏幕旋转设置(仅 APP/微信/QQ小程序)，支持 auto / portrait / landscape
    "rpxCalcMaxDeviceWidth": 960, // rpx 计算所支持的最大设备宽度，单位 px
    "rpxCalcBaseDeviceWidth": 375, // rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px
    "rpxCalcIncludeWidth": 750 // rpx 计算特殊处理的值，始终按实际的设备宽度计算，单位 rpx
  }
}
```

### [pages](https://uniapp.dcloud.net.cn/collocation/pages.html#pages)
> `**uni-app**` 通过 pages 节点配置应用由哪些页面组成，pages 节点接收一个数组，数组每个项都是一个对象
>

+ **注意：**
    - pages 节点的第一项为应用入口页（即首页）
    - **应用中新增/减少页面**，都需要对 pages 数组进行修改
    - 文件名**不需要写后缀**，框架会自动寻找路径下的页面资源

```json
{
  "pages": [
    {
      "path": "pages/index/index", // 配置页面路径
      "style": { ... } // 配置页面窗口表现
    },
    {
      "path": "pages/login/login",
      "style": { ... }
    }
  ]
}
```

#### [style](https://uniapp.dcloud.net.cn/collocation/pages.html#style)
> 用于设置每个页面的状态栏、导航条、标题、窗口背景色等。
>

+ **注意：**
    - 页面中配置项会覆盖 globalStyle 中相同的配置项
    - 使用 `**maxWidth**` 时，页面内fixed元素需要使用 --window-left，--window-right 来保证布局位置正确

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页", // 设置页面标题文字
        "enablePullDownRefresh": true // 开启下拉刷新
      }
    },
    // ...
  ]
}
```

##### navigationStyle
> 自定义导航栏：`**navigationStyle: custom**`，原生导航栏将不显示
>

**注意事项：**

+ 非 H5 端，手机顶部状态栏区域会被页面内容覆盖，uni-app 提供了状态栏高度的 css 变量 `**--status-bar-height**`

```vue
<template>
  <view>
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view> 状态栏下的文字 </view>
  </view>
</template>

<style>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
</style>
```

##### [app-plus](https://uniapp.dcloud.net.cn/collocation/pages.html#app-plus)
+ **注意：**`**.nvue**` 页面仅支持 `**titleNView**`、`**pullToRefresh**`、`**scrollIndicator**` 配置，其它配置项暂不支持

```json
{
  "pages": [
    {
      "path": "pages/index/index", // 首页
      "style": {
        "app-plus": {
          "titleNView": false, // 禁用原生导航栏
          // 原生子窗体
          "subNVues": [
            // 侧滑菜单
            {
              "id": "drawer", // subNVue 的 id，可通过 uni.getSubNVueById('drawer') 获取
              "path": "pages/index/drawer.nvue", // nvue 路径
              // webview style 子集，文档可暂时开放出来位置，大小相关配置
              "style": {
                "position": "popup", // 除 popup 外，其他值域参考 5+ webview position 文档
                "width": "50%"
              }
            },
            // 弹出层
            {
              "id": "popup",
              "path": "pages/index/popup",
              "style": {
                "position": "popup",
                "margin": "auto",
                "width": "150px",
                "height": "150px"
              }
            },
            // 自定义头
            {
              "id": "nav",
              "path": "pages/index/nav",
              "style": {
                "position": "dock",
                "height": "44px"
              }
            }
          ],
          // 下拉刷新
          "pullToRefresh": {
            "support": true, // 开启窗口的下拉刷新功能
            "color": "#ff3333", // 颜色值格式为"#RRGGBB"，仅"circle"样式下拉刷新支持此属性
            "style": "default", // 下拉刷新样式 default/circle
            "contentdown": {
              "caption": "下拉可刷新自定义文本"
            },
            "contentover": {
              "caption": "释放可刷新自定义文本"
            },
            "contentrefresh": {
              "caption": "正在刷新自定义文本"
            }
          }
        }
      }
    },
    {
      "path": "pages/log/log", // 日志页面
      "style": {
        "app-plus": {
          "bounce": "none", // 关闭窗口回弹效果
          "titleNView": {
            // 原生标题栏按钮配置
            "buttons": [
              {
                "text": "分享" // 原生标题栏增加分享按钮，点击事件可通过页面的 onNavigationBarButtonTap 函数进行监听
              }
            ],
            // 自定义 backButton
            "backButton": {
              "background": "#00FF00" // 返回按钮背景颜色
            }
          }
        }
      }
    },
    {
      "path": "pages/detail/detail", // 详情页面
      "style": {
        "navigationBarTitleText": "详情",
        "app-plus": {
          "titleNView": {
            "type": "transparent" // 透明渐变导航栏 App-nvue 2.4.4+ 支持
          }
        }
      }
    },
    {
      "path": "pages/search/search", // 搜索页面
      "style": {
        "app-plus": {
          "titleNView": {
            "type": "transparent", // 透明渐变导航栏 App-nvue 2.4.4+ 支持
            // 原生导航栏上的搜索框配置
            "searchInput": {
              "backgroundColor": "#fff", // 背景颜色
              "borderRadius": "6px", // 输入框圆角
              "placeholder": "请输入搜索内容", // 提示文本
              "disabled": true // disable时点击输入框不置焦，可以跳到新页面搜索
            }
          }
        }
      }
    }
    // ...
  ]
}
```

### [easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)
+ **注意：**
    - easycom 是自动开启的，不需要手动开启，如果你的组件，不符合 `**components/组件名称/组件名称.vue**` 的目录结构，可以自定义路径规范
+ **说明：**
    - `**easycom**` 方式引入的组件无需在页面内 `**import**`，也不需要在 `**components**` 内声明，即可在任意页面使用。
    - `**easycom**` 方式引入组件不是全局引入，而是局部引入

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^uni-(.*)": "@/components/uni-$1.vue", // 匹配components目录内的vue文件
      "^vue-file-(.*)": "packageName/path/to/vue-file-$1.vue" // 匹配node_modules内的vue文件
    }
  }
}
```

```vue
<template>
  <view class="container">
    <comp-a></comp-a>
    <uni-list> </uni-list>
  </view>
</template>
<script>
// 这里不用import引入，也不需要在components内注册uni-list组件。template里就可以直接用
export default {
  data() {
    return {}
  }
}
</script>
```

### [tabBar](https://uniapp.dcloud.net.cn/collocation/pages.html#tabbar)
+ **注意：**tabBar 只能配置最少 2 个、最多 5 个 tab

```json
{
  "tabBar": {
    "color": "#7A7E83", // tab 上的文字默认颜色
    "selectedColor": "#3cc51f", // tab 上的文字选中时的颜色
    "borderStyle": "black", // tabbar 上边框的颜色，可选值 black/white
    "backgroundColor": "#ffffff", // tab 的背景色
    // tab 的列表，最少2个、最多5个 tab
    "list": [
      {
        "pagePath": "pages/component/index", // 页面路径，必须在 pages 中先定义
        "iconPath": "static/image/icon_component.png", // 图片路径
        "selectedIconPath": "static/image/icon_component_HL.png", // 选中时的图片路径
        "text": "组件" // tab 上按钮文字
      },
      {
        "pagePath": "pages/API/index",
        "iconPath": "static/image/icon_API.png",
        "selectedIconPath": "static/image/icon_API_HL.png",
        "text": "接口"
      }
    ]
  }
}
```

### [subPackages](https://uniapp.dcloud.net.cn/collocation/pages.html#subpackages)
> 在小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，会把对应分包自动下载下来，下载完成后再进行展示
>

+ **注意：**
    - `**subPackages**` 里的 pages 的路径是 `**root**` 下的相对路径，不是全路径。
    - 微信小程序每个分包的大小是 2M，总体积一共不能超过 20M。
    - 分包下支持独立的 `**static**` 目录，用来对静态资源进行分包。

```shell
┌─pages
│  ├─index
│  │  └─index.vue
│  └─login
│     └─login.vue
├─pagesA
│  ├─static
│  └─list
│     └─list.vue
├─pagesB
│  ├─static
│  └─detail
│     └─detail.vue
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        // ...
      }
    },
    {
      "path": "pages/login/login",
      "style": {
        // ...
      }
    }
  ],
  "subPackages": [
    {
      "root": "pagesA", // 子包的根目录
      // 子包由哪些页面组成，参数同 pages
      "pages": [
        {
          "path": "list/list",
          "style": {
            // ...
          }
        }
      ]
    },
    {
      "root": "pagesB",
      "pages": [
        {
          "path": "detail/detail",
          "style": {
            // ...
          }
        }
      ]
    }
  ],
  // 在进入小程序某个页面时，由框架自动预下载可能需要的分包，提升进入后续分包页面时的启动速度
  "preloadRule": {
    // key 是页面路径，value 是进入此页面的预下载配置
    "pagesA/list/list": {
      "network": "all", // 在指定网络下预下载，all 不限网络、wifi 仅wifi下预下载
      "packages": ["__APP__"] // 进入页面后预下载分包的 `root` 或 `name`，__APP__ 表示主包
    },
    "pagesB/detail/detail": {
      "network": "all",
      "packages": ["pagesA"]
    }
  }
}
```

## manifest.json
> `**manifest.json**` 文件是应用的配置文件，用于指定应用的名称、图标、权限等。
>

[**配置项列表**](https://uniapp.dcloud.net.cn/collocation/manifest.html#%E9%85%8D%E7%BD%AE%E9%A1%B9%E5%88%97%E8%A1%A8)

+ **注意：**uni-app 的 `**appid**` 由 DCloud 云端分配，主要用于 DCloud 相关的云服务，请勿自行修改

```json
{
  "appid": "__UNI__XXXXXX", // 应用标识，创建应用时云端分配的，不要修改，登录申请：https://dev.dcloud.net.cn/pages/app/list
  "name": "uni-app", // 应用名称
  "description": "应用描述", // 应用描述
  "versionName": "1.0.0", // 版本名称
  "versionCode": 36, // 版本号
  // uni 统计配置项
  "uniStatistics": {
    "enable": false // 是否开启 uni 统计，默认为 true
  },
  // 微信小程序配置
  "mp-weixin": {
    "appid": "wx开头的微信小程序appid", // 登录申请：https://mp.weixin.qq.com
    // uni 统计配置项
    "uniStatistics": {
      "enable": false // 是否开启 uni 统计
    }
  },
  // H5 配置
  "h5": {
    "title": "演示", // 页面标题，默认使用 manifest.json 的 name
    "template": "index.html", // index.html 模板路径，相对于应用根目录，可定制生成的 html 代码。Vue2 支持，Vue3 暂不支持
    "router": {
      "mode": "history", // 路由跳转模式，支持 hash、history
      "base": "/hello/" // 应用基础路径，支持设置为相对路径 "./"
    },
    "async": {
      "loading": "AsyncLoading", // 页面 js 加载时使用的组件（需注册为全局组件），默认值为 AsyncLoading
      "error": "AsyncError", // 页面 js 加载失败时使用的组件（需注册为全局组件），默认值为 AsyncError
      "delay": 200, // 展示 loading 加载组件的延时时间，默认值为 200
      "timeout": 3000 // 页面 js 加载超时时间，默认值为 60000
    }
  },
  // App 配置
  "app-plus": {
    "allowsInlineMediaPlayback": true, // 可选，Boolean类型, 是否允许 h5 中视频非全屏播放，3.8.5版本开始默认值为 true （仅iOS生效）
    "mediaPlaybackRequiresUserAction": false, // 可选，Boolean类型,可通过此属性配置 h5中的音视频是否可通过API自动播放，注意当设置为 false 时允许API控制自动播放，3.8.5版本开始默认值为 false（仅iOS生效 3.0.1 + 版本支持）
    "nvueCompiler": "weex", // 可选，字符串类型，nvue页面编译模式，可取值uni-app、weex，参考：https://ask.dcloud.net.cn/article/36074
    "nvueStyleCompiler": "weex", // 可选，字符串类型，nvue页面样式编译模式，可取值uni-app、weex，参考：https://ask.dcloud.net.cn/article/38751
    "renderer": "native", // 可选，字符串类型，可不加载基于 webview 的运行框架，可取值native
    "compilerVersion": 2, // 可选，数字类型，编译器版本，可取值2、3，参考：https://ask.dcloud.net.cn/article/36599
    "nvueLaunchMode": "normal", // 可选，字符串类型，nvue首页启动模式，compilerVersion值为3时生效，可取值normal、fast，参考：https://ask.dcloud.net.cn/article/36749
    // 可选，JSON对象，nvue页面相关配置
    "nvue": {
      "flex-direction": "row" // 可选，字符串类型，nvue页面的flex-direction默认值，可取值row、row-reverse、column、column-reverse
    },
    // 可选，JSON对象，分包配置
    "optimization": {
      "subPackages": true // 可选，Boolean类型，是否开启分包优化，参考：https://uniapp.dcloud.io/collocation/pages.html#subpackages
    },
    // 可选，JSON对象，uni统计配置
    "uniStatistics": {
      "enable": true // 可选，Boolean类型，是否开启uni统计
    },
    // 可选，字符串数组类型，应用支持的横竖屏
    "screenOrientation": [
      "portrait-primary", // 可选，字符串类型，支持竖屏
      "portrait-secondary", // 可选，字符串类型，支持反向竖屏
      "landscape-primary", // 可选，字符串类型，支持横屏
      "landscape-secondary" // 可选，字符串类型，支持反向横屏
    ],
    // 可选，JSON对象，splash界面配置
    "splashscreen": {
      "alwaysShowBeforeRender": true, // 可选，Boolean类型，是否等待首页渲染完毕后再关闭启动界面
      "autoclose": true, // 可选，Boolean类型，是否自动关闭启动界面
      "waiting": true, // 可选，Boolean类型，是否在程序启动界面显示等待雪花
      "event": "loaded", // 可选，字符串类型，可取值titleUpdate、rendering、loaded，uni-app项目已废弃
      "target": "defalt", // 可选，字符串类型，可取值default、second，uni-app项目已废弃
      "dealy": 0, // 可选，数字类型，延迟自动关闭启动时间，单位为毫秒，uni-app项目已废弃
      // 可选，JSON对象，开屏广告配置
      "ads": {
        "backaground": "#RRGGBB", // 可选，字符串类型，格式为#RRGGBB，开屏广告背景颜色
        "image": "" // 可选，字符串类型，底部图片地址，相对应用资源目录路径
      },
      "androidTranslucent": false // 可选，Boolean类型，使用“自定义启动图”启动界面时是否显示透明过渡界面，可解决点击桌面图标延时启动应用的效果
    },
    // 可选，JSON对象，使用的模块
    "modules": {
      // 可选，JSON对象，Bluetooth(低功耗蓝牙)
      "Bluetooth": {
        "description": "低功耗蓝牙"
      },
      // 可选，JSON对象，Contact(通讯录)
      "Contacts": {
        "description": "通讯录"
      },
      // 可选，JSON对象，FaceID(人脸识别)，仅iOS支持
      "FaceID": {
        "description": "人脸识别"
      },
      // 可选，JSON对象，Fingerprint(指纹识别)
      "Fingerprint": {
        "description": "指纹识别"
      },
      // 可选，JSON对象，Geolocation(定位)
      "Geolocation": {
        "description": "定位"
      },
      // 可选，JSON对象，iBeacon
      "iBeacon": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，LivePusher(直播推流)
      "LivePusher": {
        "description": "直播推流"
      },
      // 可选，JSON对象，Maps(地图)
      "Maps": {
        "description": "地图"
      },
      // 可选，JSON对象，Messaging(短彩邮件消息)
      "Messaging": {
        "description": "短彩邮件消息"
      },
      // 可选，JSON对象，OAuth(登录鉴权)
      "OAuth": {
        "description": "登录鉴权"
      },
      // 可选，JSON对象，Payment(支付)
      "Payment": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，Push(消息推送)
      "Push": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，Share(分享)
      "Share": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，Speech(语音输入)
      "Speech": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，Statistic(统计)
      "Statistic": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，SQLite(统计)
      "SQLite": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，VideoPlayer(视频播放)
      "VideoPlayer": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，Android X5 Webview(腾讯TBS)，仅Android支持
      "Webview-x5": {
        "description": "iBeacon"
      },
      // 可选，JSON对象，UIWebview，仅iOS支持
      "UIWebview": {
        "description": "iBeacon"
      }
    },
    // 3.5.0 + 当系统webview低于指定版本时，会弹出提示。或者下载x5内核后继续启动，仅Android支持
    "webView": {
      "minUserAgentVersion": "95.0.4638.75", // 最小webview版本
      // 此属性需要勾选 Android X5 Webview 模块，详细参见下面的说明
      "x5": {
        "timeOut": 3000, // 超时时间
        "showTipsWithoutWifi": true, // 是否在非WiFi网络环境时，显示用户确认下载x5内核的弹窗。
        "allowDownloadWithoutWiFi": false // 是否允许用户在非WiFi网络时进行x5内核的下载。（如果为true，就不会显示用户确认的弹窗。）
      }
    },
    "checkPermissionDenied": false, // 是否校验已拒绝权限 如果拒绝则不会再申请 默认false 不校验已拒绝权限
    // 必选，JSON对象，云端打包配置
    "distribute": {
      // 可选，JSON对象，Android平台云端打包配置
      "android": {
        "packagename": "", // 必填，字符串类型，Android包名
        "keystore": "", // 必填，字符串类型，Android签名证书文件路径
        "password": "", // 必填，字符串类型，Android签名证书文件的密码
        "aliasname": "", // 必填，字符串类型，Android签名证书别名
        "schemes": "", // 可选，字符串类型，参考：https://uniapp.dcloud.io/tutorial/app-android-schemes
        // 可选，字符串数组类型，参考：https://uniapp.dcloud.io/tutorial/app-android-abifilters
        "abiFilters": ["armeabi-v7a", "arm64-v8a", "x86", "x86_64"],
        "permissions": [
          //可选，字符串数组类型，Android权限配置
          "<uses-feature android:name=\"android.hardware.camera\"/>"
        ],
        "custompermissions": false, //可选，Boolean类型，是否自定义Android权限配置
        "permissionExternalStorage": {
          //可选，JSON对象，Android平台应用启动时申请读写手机存储权限策略
          "request": "always", //必填，字符串类型，申请读写手机存储权限策略，可取值none、once、always
          "prompt": "" //可选，字符串类型，当request设置为always值用户拒绝时弹出提示框上的内容
        },
        "permissionPhoneState": {
          //可选，JSON对象，Android平台应用启动时申请读取设备信息权限配置
          "request": "always", //必填，字符串类型，申请读取设备信息权限策略，可取值none、once、always
          "prompt": "" //可选，字符串类型，当request设置为always值用户拒绝时弹出提示框上的内容
        },
        "minSdkVersion": 21, //可选，数字类型，Android平台最低支持版本，参考：https://uniapp.dcloud.io/tutorial/app-android-minsdkversion
        "targetSdkVersion": 30, //可选，数字类型，Android平台目标版本，参考：https://uniapp.dcloud.io/tutorial/app-android-targetsdkversion
        "aaptOptions": [
          //可选，字符串数组类型，Android平台云端打包时build.gradle的packagingOptions配置项
          "noCompress 'png', 'jpg', 'jpeg'"
        ],
        "buildFeatures": {
          //（HBuilderX3.5.0+版本支持）可选，JSON对象，Android平台云端打包时build.gradle的buildFeatures配置项
          "dataBinding": false, //可选，Boolean类型，是否设置dataBinding
          "viewBinding": false //可选，Boolean类型，是否设置viewBinding
        },
        "packagingOptions": [
          //可选，字符串数组类型，Android平台云端打包时build.gradle的packagingOptions配置项
          "doNotStrip '*/armeabi-v7a/*.so'",
          "merge '**/LICENSE.txt'"
        ],
        "jsEngine": "v8", //可选，字符串类型，uni-app使用的JS引擎，可取值v8、jsc
        "debuggable": false, //可选，Boolean类型，是否开启Android调试开关
        "locale": "default", //可选，应用的语言
        "forceDarkAllowed": false, //可选，Boolean类型，是否强制允许暗黑模式
        "resizeableActivity": false, //可选，Boolean类型，是否支持分屏调整窗口大小
        "hasTaskAffinity": false //可选，Boolean类型，是否设置android：taskAffinity
      },
      "ios": {
        // 可选，JSON对象，iOS平台云端打包配置
        "appid": "", // 必填，字符串类型，iOS平台Bundle ID
        "mobileprovision": "", // 必填，字符串类型，iOS打包使用的profile文件路径
        "p12": "", // 必填，字符串类型，iOS打包使用的证书文件路径
        "password": "", // 必填，字符串类型，iOS打包使用的证书密码
        "devices": "iphone", // 必填，字符串类型，iOS支持的设备类型，可取值iphone、ipad、universal
        "urlschemewhitelist": "baidumap", // 可选，字符串类型，应用访问白名单列表，参考：https://uniapp.dcloud.io/tutorial/app-ios-schemewhitelist
        "urltypes": "", // 可选，字符串类型，参考：https://uniapp.dcloud.io/tutorial/app-ios-schemes
        "UIBackgroundModes": "audio", // 可选，字符串类型，应用后台运行模式，参考：https://uniapp.dcloud.io/tutorial/app-ios-uibackgroundmodes
        // 可选，字符串数组类型，依赖的系统库，已废弃，推荐使用uni原生插件扩展使用系统依赖库
        "frameworks": ["CoreLocation.framework"],
        "deploymentTarget": "10.0", // 可选，字符串类型，iOS支持的最低版本
        // 可选，JSON对象，iOS隐私信息访问的许可描述
        "privacyDescription": {
          "NSPhotoLibraryUsageDescription": "", // 可选，字符串类型，系统相册读取权限描述
          "NSPhotoLibraryAddUsageDescription": "", // 可选，字符串类型，系统相册写入权限描述
          "NSCameraUsageDescription": "", // 可选，字符串类型，摄像头使用权限描述
          "NSMicrophoneUsageDescription": "", // 可选，字符串类型，麦克风使用权限描述
          "NSLocationWhenInUseUsageDescription": "", // 可选，字符串类型，运行期访问位置权限描述
          "NSLocationAlwaysUsageDescription": "", // 可选，字符串类型，后台运行访问位置权限描述
          "NSLocationAlwaysAndWhenInUseUsageDescription": "", // 可选，字符串类型，运行期后后台访问位置权限描述
          "NSCalendarsUsageDescription": "", // 可选，字符串类型，使用日历权限描述
          "NSContactsUsageDescription": "", // 可选，字符串类型，使用通讯录权限描述
          "NSBluetoothPeripheralUsageDescription": "", // 可选，字符串类型，使用蓝牙权限描述
          "NSBluetoothAlwaysUsageDescription": "", // 可选，字符串类型，后台使用蓝牙权限描述
          "NSSpeechRecognitionUsageDescription": "", // 可选，字符串类型，系统语音识别权限描述
          "NSRemindersUsageDescription": "", // 可选，字符串类型，系统提醒事项权限描述
          "NSMotionUsageDescription": "", // 可选，字符串类型，使用运动与健康权限描述
          "NSHealthUpdateUsageDescription": "", // 可选，字符串类型，使用健康更新权限描述
          "NSHealthShareUsageDescription": "", // 可选，字符串类型，使用健康分享权限描述
          "NSAppleMusicUsageDescription": "", // 可选，字符串类型，使用媒体资料库权限描述
          "NFCReaderUsageDescription": "", // 可选，字符串类型，使用NFC权限描述
          "NSHealthClinicalHealthRecordsShareUsageDescription": "", // 可选，字符串类型，访问临床记录权限描述
          "NSHomeKitUsageDescription": "", // 可选，字符串类型，访问HomeKit权限描述
          "NSSiriUsageDescription": "", // 可选，字符串类型，访问Siri权限描述
          "NSFaceIDUsageDescription": "", // 可选，字符串类型，使用FaceID权限描述
          "NSLocalNetworkUsageDescription": "", // 可选，字符串类型，访问本地网络权限描述
          "NSUserTrackingUsageDescription": "" // 可选，字符串类型，跟踪用户活动权限描述
        },
        "idfa": true, // 可选，Boolean类型，是否使用广告标识
        // 可选，JSON对象，配置应用的capabilities数据（根据XCode规范分别配置到entitlements和plist文件中）
        "capabilities": {
          // 合并到工程entitlements文件的数据（json格式）
          "entitlements": {},
          // 合并到工程Info.plist文件的数据（json格式）
          "plists": {}
        },
        "CFBundleName": "HBuilder", // 可选，字符串类型，CFBundleName名称
        // 可选，字符串数组类型，编译时支持的CPU指令，可取值arm64、arm64e、armv7、armv7s、x86_64
        "validArchitectures": ["arm64"],
        "pushRegisterMode": "manual", // 可选，使用“Push(消息推送)”模块时申请系统推送权限模式，manual表示调用push相关API时申请，其它值表示应用启动时自动申请
        "privacyRegisterMode": "manual" // 可选，仅iOS有效，设置为manual表示用户同意隐私政策后才获取idfv，设置为其它值表示应用启动时自动获取
      },
      // 可选，JSON对象，三方SDK相关配置
      "sdkConfigs": {
        // 可选，JSON对象，Geolocation(定位)模块三方SDK配置
        "geolocation": {
          // 可选，JSON对象，使用系统定位
          "system": {
            "__platform__": ["ios", "android"] // 可选，字符串数组类型，支持的平台
          },
          // 可选，JSON对象，使用高德定位SDK配置
          "amap": {
            "__platform__": ["ios", "android"], // 可选，字符串数组类型，支持的平台
            "appkey_ios": "", // 必填，字符串类型，iOS平台高德定位appkey
            "appkey_android": "" // 必填，字符串类型，Android平台高德定位appkey
          },
          // 可选，JSON对象，使用百度定位SDK配置
          "baidu": {
            "__platform__": ["ios", "android"], // 可选，字符串数组类型，支持的平台
            "appkey_ios": "", // 必填，字符串类型，iOS平台百度定位appkey
            "appkey_android": "" // 必填，字符串类型，Android平台百度定位appkey
          }
        },
        // 可选，JSON对象，Maps(地图)模块三方SDK配置
        "maps": {
          // 可选，JSON对象，使用高德地图SDK配置
          "amap": {
            "appkey_ios": "", // 必填，字符串类型，iOS平台高德地图appkey
            "appkey_android": "" // 必填，字符串类型，Android平台高德地图appkey
          },
          // 可选，JSON对象，使用百度地图SDK配置
          "baidu": {
            "appkey_ios": "", // 必填，字符串类型，iOS平台百度地图appkey
            "appkey_android": "" // 必填，字符串类型，Android平台百度地图appkey
          },
          // 可选，JSON对象，使用Google地图SDK配置
          "google": {
            "APIKey_ios": "", // 必填，字符串类型，iOS平台Google地图APIKey
            "APIKey_android": "" // 必填，字符串类型，Android平台Google地图APIKey
          }
        },
        // 可选，JSON对象，OAuth(登录鉴权)模块三方SDK配置
        "oauth": {
          // 可选，JSON对象，使用一键登录(univerify)SDK配置，无需手动配置参数，云端打包自动获取配置参数
          "univerify": {},
          // 可选，JSON对象，使用苹果登录(Sign in with Apple)SDK配置，无配置参数，仅iOS平台支持
          "apple": {},
          // 可选，JSON对象，使用微信登录SDK配置
          "weixin": {
            "appid": "", // 必填，字符串类型，微信开放平台申请的appid
            "appsecret": "", // 必填，字符串类型，微信开放平台申请的appsecret
            "UniversalLinks": "" // 可选，字符串类型，微信开放平台配置的iOS平台通用链接
          },
          // 可选，JSON对象，使用QQ登录SDK配置
          "qq": {
            "appid": "", // 必填，字符串类型，QQ开放平台申请的appid
            "UniversalLinks": "" // 可选，字符串类型，QQ开放平台配置的iOS平台通用链接
          },
          // 可选，JSON对象，使用新浪微博登录SDK配置
          "sina": {
            "appkey": "", // 必填，字符串类型，新浪微博开放平台申请的appid
            "redirect_uri": "", // 必填，字符串类型，新浪微博开放平台配置的redirect_uri
            "UniversalLinks": "" // 可选，字符串类型，新浪微博开放平台配置的iOS平台通用链接
          },
          // 可选，JSON对象，使用Google登录SDK配置
          "google": {
            "clientid": "" // 必填，字符串类型，Google开发者后台申请的clientid
          },
          // 可选，JSON对象，使用Facebook登录SDK配置
          "facebook": {
            "appid": "" // 必填，字符串类型，Facebook开发者后台申请的appid
          }
        },
        // 可选，JSON对象，Payment(支付)模块三方SDK配置
        "payment": {
          // 可选，JSON对象，使用Apple应用内支付配置，无配置参数，仅iOS平台支持
          "appleiap": {},
          // 可选，JSON对象，使用支付宝支付SDK配置
          "alipay": {
            "__platform__": ["ios", "android"] // 可选，字符串数组类型，支持的平台
          },
          // 可选，JSON对象，使用微信支付SDK配置
          "weixin": {
            "__platform__": ["ios", "android"], // 可选，字符串数组类型，支持的平台
            "appid": "", // 必填，字符串类型，微信开放平台申请的appid
            "UniversalLinks": "" // 可选，字符串类型，微信开放平台配置的iOS平台通用链接
          },
          // 可选，JSON对象，使用paypal支付SDK配置
          "paypal": {
            "__platform__": ["ios", "android"], // 可选，字符串数组类型，支持的平台
            "returnURL_ios": "", // 必填，字符串类型，paypa开发者者后台配置的iOS平台returnURL
            "returnURL_android": "" // 必填，字符串类型，paypa开发者者后台配置的Android平台returnURL
          },
          // 可选，JSON对象，使用stripe支付SDK配置
          "stripe": {
            "__platform__": ["ios", "android"], // 可选，字符串数组类型，支持的平台
            "returnURL_ios": "" // 必填，字符串类型，stripe开发者者后台配置的iOS平台returnURL
          },
          // 可选，JSON对象，使用google支付SDK配置，无配置参数，仅Android平台支持
          "google": {}
        },
        // 可选，JSON对象，Push(消息推送)模块三方SDK配置
        "push": {
          // 可选，JSON对象，使用UniPush SDK配置，无需手动配置参数，云端打包自动获取配置参数
          "unipush": {
            // 可选，JSON对象，推送图标配置
            "icons": {
              // 可选，JSON对象，Push图标配置
              "push": {
                "ldpi": "", // 可选，字符串类型，普通屏设备推送图标路径，分辨率要求48x48
                "mdpi": "", // 可选，字符串类型，大屏设备设备推送图标路径，分辨率要求48x48
                "hdpi": "", // 可选，字符串类型，高分屏设备推送图标路径，分辨率要求72x72
                "xdpi": "", // 可选，字符串类型，720P高分屏设备推送图标路径，分辨率要求96x96
                "xxdpi": "", // 可选，字符串类型，1080P高密度屏幕推送图标路径，分辨率要求144x144
                "xxxdpi": "" // 可选，字符串类型，4K屏设备推送图标路径，分辨率要求192x192
              },
              // 可选，JSON对象，Push小图标配置
              "small": {
                "ldpi": "", // 可选，字符串类型，普通屏设备推送小图标路径，分辨率要求18x18
                "mdpi": "", // 可选，字符串类型，大屏设备设备推送小图标路径，分辨率要求24x24
                "hdpi": "", // 可选，字符串类型，高分屏设备推送小图标路径，分辨率要求36x36
                "xdpi": "", // 可选，字符串类型，720P高分屏设备推送小图标路径，分辨率要求48x48
                "xxdpi": "", // 可选，字符串类型，1080P高密度屏幕推送小图标路径，分辨率要求72x72
                "xxxdpi": "" // 可选，字符串类型，4K屏设备推送小图标路径，分辨率要求96x96
              }
            }
          },
          // 可选，JSON对象，使用个推推送SDK配置，**已废弃，推荐使用UniPush，UniPush是个推推送VIP版，功能更强大**
          "igexin": {
            "appid": "", // 必填，字符串类型，个推开放平台申请的appid
            "appkey": "", // 必填，字符串类型，个推开放平台申请的appkey
            "appsecret": "", // 必填，字符串类型，个推开放平台申请的appsecret
            // 可选，JSON对象，推送图标配置
            "icons": {
              // 可选，JSON对象，Push图标配置
              "push": {
                "ldpi": "", // 可选，字符串类型，普通屏设备推送图标路径，分辨率要求48x48
                "mdpi": "", // 可选，字符串类型，大屏设备设备推送图标路径，分辨率要求48x48
                "hdpi": "", // 可选，字符串类型，高分屏设备推送图标路径，分辨率要求72x72
                "xdpi": "", // 可选，字符串类型，720P高分屏设备推送图标路径，分辨率要求96x96
                "xxdpi": "", // 可选，字符串类型，1080P高密度屏幕推送图标路径，分辨率要求144x144
                "xxxdpi": "" // 可选，字符串类型，4K屏设备推送图标路径，分辨率要求192x192
              },
              // 可选，JSON对象，Push小图标配置
              "small": {
                "ldpi": "", // 可选，字符串类型，普通屏设备推送小图标路径，分辨率要求18x18
                "mdpi": "", // 可选，字符串类型，大屏设备设备推送小图标路径，分辨率要求24x24
                "hdpi": "", // 可选，字符串类型，高分屏设备推送小图标路径，分辨率要求36x36
                "xdpi": "", // 可选，字符串类型，720P高分屏设备推送小图标路径，分辨率要求48x48
                "xxdpi": "", // 可选，字符串类型，1080P高密度屏幕推送小图标路径，分辨率要求72x72
                "xxxdpi": "" // 可选，字符串类型，4K屏设备推送小图标路径，分辨率要求96x96
              }
            }
          }
        },
        // 可选，JSON对象，Share(分享)模块三方SDK配置
        "share": {
          // 可选，JSON对象，使用微信分享SDK配置
          "weixin": {
            "appid": "", // 必填，字符串类型，微信开放平台申请的appid
            "UniversalLinks": "" // 可选，字符串类型，微信开放平台配置的iOS平台通用链接
          },
          // 可选，JSON对象，使用QQ分享SDK配置
          "qq": {
            "appid": "", // 必填，字符串类型，QQ开放平台申请的appid
            "UniversalLinks": "" // 可选，字符串类型，QQ开放平台配置的iOS平台通用链接
          },
          // 可选，JSON对象，使用新浪微博分享SDK配置
          "sina": {
            "appkey": "", // 必填，字符串类型，新浪微博开放平台申请的appid
            "redirect_uri": "", // 必填，字符串类型，新浪微博开放平台配置的redirect_uri
            "UniversalLinks": "" // 可选，字符串类型，新浪微博开放平台配置的iOS平台通用链接
          }
        },
        // 可选，JSON对象，Speech(语音识别)模块三方SDK配置
        "speech": {
          // 可选，JSON对象，使用百度语音识别SDK配置
          "baidu": {
            "appid": "", // 必填，字符串类型，百度开放平台申请的appid
            "apikey": "", // 必填，字符串类型，百度开放平台申请的apikey
            "secretkey": "" // 必填，字符串类型，百度开放平台申请的secretkey
          }
        },
        // 可选，JSON对象，Statistic(统计)模块三方SDK配置
        "statics": {
          // 可选，JSON对象，使用友盟统计SDK配置
          "umeng": {
            "appkey_ios": "", // 必填，字符串类型，友盟统计开放平台申请的iOS平台appkey
            "channelid_ios": "", // 可选，字符串类型，友盟统计iOS平台的渠道标识
            "appkey_android": "", // 必填，字符串类型，友盟统计开放平台申请的Android平台appkey
            "channelid_android": "" // 可选，字符串类型，友盟统计Android平台的渠道标识
          },
          // 可选，JSON对象，使用Google Analytics for Firebase配置
          "google": {
            "config_ios": "", // 必填，字符串类型，Google Firebase统计开发者后台获取的iOS平台配置文件路径
            "config_android": "" // 必填，字符串类型，Google Firebase统计开发者后台获取的Android平台配置文件路径
          }
        },
        // 可选，JSON对象，uni-AD配置
        "ad": {
          // 可选，JSON对象，使用360广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "360": {},
          // 可选，JSON对象，使用今日头条穿山甲广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "csj": {},
          // 可选，JSON对象，使用腾讯优量汇广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "gdt": {},
          // 可选，JSON对象，使用快手广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "ks": {},
          // 可选，JSON对象，使用快手内容联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "ks-content": {},
          // 可选，JSON对象，使用Sigmob广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "sigmob": {},
          // 可选，JSON对象，使用华为广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "hw": {},
          // 可选，JSON对象，使用百度百青藤广告联盟SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "bd": {},
          // 可选，JSON对象，使用互动游戏(变现猫)SDK，无需手动配置，在uni-AD后台申请开通后自动获取配置参数
          "BXM-AD": {}
        }
      },
      // 可选，JSON对象，应用图标相关配置
      "icons": {
        // 可选，JSON对象，iOS平台图标配置
        "ios": {
          "appstore": "", // 必填，字符串类型，分辨率1024x1024, 提交app sotre使用的图标路径
          // 可选，JSON对象，iPhone设备图标配置
          "iphone": {
            "app@2x": "", // 可选，字符串类型，分辨率120x120，程序图标路径
            "app@3x": "", // 可选，字符串类型，分辨率180x180，程序图标路径
            "spotlight@2x": "", // 可选，字符串类型，分辨率80x80，Spotlight搜索图标路径
            "spotlight@3x": "", // 可选，字符串类型，分辨率120x120，Spotlight搜索图标路径
            "settings@2x": "", // 可选，字符串类型，分辨率58x58，Settings设置图标路径
            "settings@3x": "", // 可选，字符串类型，分辨率87x87，Settings设置图标路径
            "notification@2x": "", // 可选，字符串类型，分辨率40x40，通知栏图标路径
            "notification@3x": "" // 可选，字符串类型，分辨率60x60，通知栏图标路径
          },
          // 可选，JSON对象，iPad设备图标配置
          "ipad": {
            "app": "", // 可选，字符串类型，分辨率76x76，程序图标图标路径
            "app@2x": "", // 可选，字符串类型，分辨率152x152，程序图标图标路径
            "proapp@2x": "", // 可选，字符串类型，分辨率167x167，程序图标图标路径
            "spotlight": "", // 可选，字符串类型，分辨率40x40，Spotlight搜索图标路径
            "spotlight@2x": "", // 可选，字符串类型，分辨率80x80，Spotlight搜索图标路径
            "settings": "", // 可选，字符串类型，分辨率29x29，Settings设置图标路径
            "settings@2x": "", // 可选，字符串类型，分辨率58x58，Settings设置图标路径
            "notification": "", // 可选，字符串类型，分辨率20x20，通知栏图标路径
            "notification@2x": "" // 可选，字符串类型，分辨率740x40，通知栏图标路径
          }
        },
        // 可选，JSON对象，Android平台图标配置
        "android": {
          "ldpi": "", // 可选，字符串类型，普通屏设备程序图标，分辨率要求48x48，已废弃
          "mdpi": "", // 可选，字符串类型，大屏设备程序图标，分辨率要求48x48，已废弃
          "hdpi": "", // 可选，字符串类型，高分屏设备程序图标，分辨率要求72x72
          "xhdpi": "", // 可选，字符串类型，720P高分屏设备程序图标，分辨率要求96x96
          "xxhdpi": "", // 可选，字符串类型，1080P高分屏设备程序图标，分辨率要求144x144
          "xxxhdpi": "" // 可选，字符串类型，2K屏设备程序图标，分辨率要求192x192
        }
      },
      // 可选，JSON对象，启动界面配置
      "splashscreen": {
        "iosStyle": "common", // 可选，字符串类型，iOS平台启动界面样式，可取值common、default、storyboard
        // 可选，JSON对象，iOS平台启动界面配置
        "ios": {
          "storyboard": "", // 可选，字符串类型，自定义storyboard启动界面文件路径，iosStyle值为storyboard时生效
          // 可选，JSON对象，iPhone设备启动图配置，iosStyle值为default时生效
          "iphone": {
            "default": "", // 可选，字符串类型，分辨率320x480，iPhone3（G/GS）启动图片路径，已废弃
            "retina35": "", // 可选，字符串类型，分辨率640x960，3.5英寸设备(iPhone4/4S)启动图片路径，已废弃
            "retina40": "", // 可选，字符串类型，分辨率640x1136，4.0英寸设备(iPhone5/5S)启动图片路径
            "retina40l": "", // 可选，字符串类型，分辨率1136x640，4.0英寸设备(iPhone5/5S)横屏启动图片路径
            "retina47": "", // 可选，字符串类型，分辨率750x1334，4.7英寸设备（iPhone6/7/8）启动图片路径
            "retina47l": "", // 可选，字符串类型，分辨率1334x750，4.7英寸设备（iPhone6/7/8）横屏启动图片路径
            "retina55": "", // 可选，字符串类型，分辨率1242x2208，5.5英寸设备（iPhone6/7/8Plus）启动图片路径
            "retina55l": "", // 可选，字符串类型，分辨率2208x1242，5.5英寸设备（iPhone6/7/8Plus）横屏启动图片路径
            "iphonex": "", // 可选，字符串类型，分辨率1125x2436，5.8英寸设备（iPhoneX/XS）启动图片路径
            "iphonexl": "", // 可选，字符串类型，分辨率2436x1125，5.8英寸设备（iPhoneX/XS）横屏启动图片路径
            "portrait-896h@2x": "", // 可选，字符串类型，分辨率828x1792，6.1英寸设备（iPhoneXR）启动图片路径
            "landscape-896h@2x": "", // 可选，字符串类型，分辨率1792x828，6.1英寸设备（iPhoneXR）iPhoneXR横屏启动图片路径
            "portrait-896h@3x": "", // 可选，字符串类型，分辨率1242x2688，6.5英寸设备（iPhoneXS Max）启动图片路径
            "landscape-896h@3x": "" // 可选，字符串类型，分辨率2688x1242，6.5英寸设备（iPhoneXS Max）横屏启动图片路径
          },
          // 可选，JSON对象，iPad设备启动图配置，iosStyle值为default时生效
          "ipad": {
            "portrait": "", // 可选，字符串类型，分辨率768x1004，iPad竖屏启动图片路径，已废弃
            "portrait-retina": "", // 可选，字符串类型，分辨率1536x2008，iPad高分屏竖屏启动图片路径，已废弃
            "landscape": "", // 可选，字符串类型，分辨率1024x748，iPad横屏启动图片路径，已废弃
            "landscape-retina": "", // 可选，字符串类型，分辨率2048x1496，iPad高分屏横屏启动图片路径，已废弃
            "portrait7": "", // 可选，字符串类型，分辨率768x1024，9.7/7.9英寸iPad/mini竖屏启动图片路径
            "landscape7": "", // 可选，字符串类型，分辨率1024x768，9.7/7.9英寸iPad/mini横屏启动图片路径
            "portrait-retina7": "", // 可选，字符串类型，分辨率1536x2048，9.7/7.9英寸iPad/mini高分屏竖屏图片路径
            "landscape-retina7": "", // 可选，字符串类型，分辨率2048x1536，9.7/7.9英寸iPad/mini高分屏横屏启动图片路径
            "portrait-1112h@2x": "", // 可选，字符串类型，分辨率1668x2224，10.5英寸iPad Pro竖屏启动图片路径
            "landscape-1112h@2x": "", // 可选，字符串类型，分辨率2224x1668，10.5英寸iPad Pro横屏启动图片路径
            "portrait-1194h@2x": "", // 可选，字符串类型，分辨率1668x2388，11英寸iPad Pro竖屏启动图片路径
            "landscape-1194h@2x": "", // 可选，字符串类型，分辨率2388x1668，11英寸iPad Pro横屏启动图片路径
            "portrait-1366h@2x": "", // 可选，字符串类型，分辨率2048x2732，12.9英寸iPad Pro竖屏启动图片路径
            "landscape-1366h@2x": "" // 可选，字符串类型，分辨率2732x2048，12.9英寸iPad Pro横屏启动图片路径
          }
        },
        "androidStyle": "common", // 可选，字符串类型，Android平台启动界面样式，可取值common、default
        // 可选，JSON对象，Android平台启动图片配置， androidStyle值为default时生效
        "android": {
          "ldpi": "", // 可选，字符串类型，分辨率320x442，低密度屏幕启动图片路径，已废弃
          "mdpi": "", // 可选，字符串类型，分辨率240x282，中密度屏幕启动图片路径，已废弃
          "hdpi": "", // 可选，字符串类型，分辨率480x762，高密度屏幕启动图片路径
          "xhdpi": "", // 可选，字符串类型，分辨率720x1242，720P高密度屏幕启动图片路径
          "xxhdpi": "" // 可选，字符串类型，分辨率1080x1882，1080P高密度屏幕启动图片路径
        }
      },
      // 可选，字符串数组类型，应用支持的横竖屏，**已废弃，使用screenOrientation配置**
      "orientation": [
        "portrait-primary",
        "portrait-secondary",
        "landscape-primary",
        "landscape-secondary"
      ]
    },
    // 可选，JSON对象，uni-app兼容模式
    "compatible": {
      "ignoreVersion": false, // 可选，Boolean类型，是否忽略版本兼容检查提示
      "runtimeVersion": "", // 可选，字符串类型，兼容的uni-app运行环境版本号，多个版本使用,分割
      "compilerVersion": "" // 可选，字符串类型，兼容的编译器版本号
    },
    // 可选，JSON对象，原生混淆加密配置，参考：https://uniapp.dcloud.io/tutorial/app-sec-confusion
    "confusion": {
      "description": "", // 可选，字符串类型，原生混淆描述
      // 必填，JSON对象，原生混淆文件配置
      "resources": {
        // 可选，JSON对象，键名为需要原生混淆的文件路径
        "js/common.js": {}
      }
    },
    "channel": "", // 可选，字符串类型，渠道标识
    // 可选，JSON对象，应用的异常崩溃与错误报告系统配置
    "cers": {
      "crash": true // 可选，Boolean类型，是否提交应用异常崩溃信息
    },
    // 可选，JSON对象，Webview窗口默认使用的缓存模式，uni-app项目已废弃
    "cache": {
      "mode": "default" // 可选，字符串类型，可取值default、cacheElseNetwork、noCache、cacheOnly
    },
    // 可选，JSON对象，页面加载错误配置，uni-app项目仅对webview组件有效，参考：https://uniapp.dcloud.io/tutorial/app-webview-error
    "error": {
      "url": "" // 必填，字符串类型，webview页面错误是跳转的页面地址
    },
    // 可选，JSON对象，webview内核配置
    "kernel": {
      "ios": "WKWebview", // 可选，iOS平台使用的webview类型，可取值WKWebview、UIWebview
      "recovery": "reload" // 可选，iOS平台使用WKWebview时，内核崩溃后的处理逻辑，可取值restart、reload、none
    },
    // 可选，JSON对象，应用首页相关配置，uni-app项目不建议手动修改
    "launchwebview": {
      "plusrequire": "normal", // 可选，字符串类型，加载plus API时机，可取值ahead、normal、later、none
      "injection": false, // 可选，Boolean类型，是否提前注入plus API
      // 可选，JSON对象数组，应用首页的拦截资源相关配置
      "overrideresource": [
        {
          "match": "", // 可选，字符串类型，匹配拦截的资源url地址的正则表达式
          "redirect": "", // 可选，字符串类型，拦截资源的重定向地址
          "mime": "", // 可选，字符串类型，拦截资源的数据类型mime
          "encoding": "", // 可选，字符串类型，拦截资源的数据编码
          // 可选，JSON对象，拦截资源的http头数据
          "header": {}
        }
      ],
      // 可选，JSON对象，应用首页的拦截链接请求处理逻辑
      "overrideurl": {
        "mode": "reject", // 可选，字符串类型，拦截模式，可取值allow、reject
        "match": "", // 可选，字符串类型，匹配拦截规则，支持正则表达式
        "exclude": "none" // 可选，字符串类型，排除拦截理规则，可取值none、redirect
      },
      // 可选，JSON对象，是否重写Web API实现相关配置
      "replacewebapi": {
        "geolocation": "none" // 可选，字符串类型，重写标准定位API，可取值none、alldevice、auto
      },
      // 可选，JSON对象数组，首页原生View相关配置，已废弃
      "subNViews": [
        {
          "id": "", // 可选，字符串类型，原生View标识
          // 可选，JSON对象，原生View样式
          "styles": {},
          //可选，JSON对象数组，原生View中包含的tag标签列表
          "tags": [{}]
        }
      ],
      // 可选，JSON对象，标题栏相关配置
      "titleNView": {
        "backgroundColor": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，标题栏背景颜色
        "titleText": "", // 可选，字符串类型，标题栏标题文字内容
        "titleColor": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，标题栏标题文字颜色
        "titleSize": "17px", // 可选，字符串类型，标题字体大小，默认大小为17px
        "autoBackButton": true, // 可选，Boolean类型，是否显示标题栏上返回键
        // 可选，JSON对象，返回键样式
        "backButton": {
          "backgournd": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，返回按钮背景颜色
          "color": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，返回图标颜色
          "colorPressed": "#RRGGBB" // 可选，字符串类型，#RRGGBB，返回图标按下时的颜色
        },
        // 可选，JSON对象数组，标题栏按钮配置
        "buttons": [
          {
            "color": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，按钮上的文字颜色
            "colorPressed": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，按钮按下状态的文字颜色
            "float": "right", // 可选，字符串类型，按钮显示位置，可取值left、right
            "fontWeight": "normal", // 可选，字符串类型，按钮上文字的粗细，可取值normal、bold
            "fontSize": "22px", // 可选，字符串类型，按钮上文字的大小
            "fontSrc": "", // 可选，字符串类型，按钮上文字使用的字体文件路径
            "text": "" // 可选，字符串类型，按钮上显示的文字
          }
        ],
        // 可选，JSON对象，标题栏分割线样式
        "splitLine": {
          "color": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，分割线颜色
          "height": "1px" // 可选，字符串类型，分割线高度
        }
      },
      // 可选，JSON对象，状态栏配置
      "statusbar": {
        "background": "#RRGGBB" // 可选，字符串类型，#RRGGBB格式，沉浸式状态栏样式下系统状态栏背景颜色
      },
      "top": "0px", // 可选，字符串类型，Webview的顶部偏移量，支持px、%单位
      "height": "100%", // 可选，字符串类型，Webview窗口高度，支持px、%单位
      "bottom": "0px", // 可选，字符串类型，Webview的底部偏移量，仅在未同时设置top和height属性时生效
      "backButtonAutoControl": "none", // 可选，字符串类型，运行环境自动处理返回键的控制逻辑，可取值none、hide、close
      // 可选，JSON对象，额外添加HTTP请求头数据
      "additionalHttpHeaders": {}
    },
    // 可选，JSON数组对象，uni原生插件配置，参考：https://nativesupport.dcloud.net.cn/NativePlugin/use/use_local_plugin
    "nativePlugins": {
      // 可选，JSON对象，键名为插件标识，值为插件配置参数
      "%UniPlugin-ID%": {}
    },
    "popGesture": "none", // 可选，字符串类型，窗口侧滑返回默认效果，可取值none、close、hide
    "runmode": "liberate", // 可选，字符串类型，应用资源运行模式，可取值normal、liberate
    // 可选，JSON对象，安全区域配置
    "safearea": {
      "background": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，安全区域背景颜色
      "backgroundDark": "#RRGGBB", // 可选，字符串类型，#RRGGBB格式，暗黑模式安全区域背景颜色
      // 可选，JSON对象，底部安全区域配置
      "bottom": {
        "offset": "none" // 可选，字符串类型，安全区域偏移值，可取值auto、none
      },
      // 可选，JSON对象，左侧安全区域配置
      "left": {
        "offset": "none" // 可选，字符串类型，安全区域偏移值，可取值auto、none
      },
      // 可选，JSON对象，左侧安全区域配置
      "right": {
        "offset": "none" // 可选，字符串类型，安全区域偏移值，可取值auto、none
      }
    },
    // 可选，JSON对象，软键盘相关配置
    "softinput": {
      "navBar": "auto", // 可选，字符串类型，iOS平台软键盘上导航条的显示模式，可取值auto、none
      "auxiliary": false, // 可选，Boolean类型，是否开启辅助输入功能
      "mode": "adjustResize" // 可选，字符串类型，弹出系统软键盘模式，可取值adjustResize、adjustPan
    },
    // 可选，JSON对象，ssl相关设置
    "ssl": {
      "untrustedca": "accept" // 可选，字符串类型，https请求时服务器非受信证书的处理逻辑，可取值accept、refuse、warning
    },
    // 可选，JSON对象，应用启动后的系统状态栏相关配置
    "statusbar": {
      "immersed": "none", // 可选，字符串类型，沉浸式状态栏样式，可取值none、suggestedDevice、supportedDevice
      "style": "light", // 可选，字符串类型，系统状态栏样式（前景颜色），可取值dark、light
      "background": "#RRGGBB" // 可选，字符串类型，#RRGGBB格式，系统状态栏背景颜色
    },
    // 可选，JSON对象，应用UserAgent相关配置，默认值为系统UserAgent，并添加 uni-app Html5Plus/1.0
    "useragent": {
      "value": "", // 可选，字符串类型，设置的默认userAgent值
      "concatenate": false // 可选，Boolean类型，是否将value值作为追加值连接到系统默认userAgent值之后
    },
    // 可选，JSON对象，Android平台应用UserAgent相关配置，优先级高于useragent配置
    "useragent_android": {
      "value": "", // 可选，字符串类型，设置的默认userAgent值
      "concatenate": false // 可选，Boolean类型，是否将value值作为追加值连接到系统默认userAgent值之后
    },
    // 可选，JSON对象，iOS平台应用UserAgent相关配置，优先级高于useragent配置
    "useragent_ios": {
      "value": "", // 可选，字符串类型，设置的默认userAgent值
      "concatenate": false // 可选，Boolean类型，是否将value值作为追加值连接到系统默认userAgent值之后
    }
  }
}
```

## App.vue
> App.vue/uvue 是 uni-app 的主组件
>

### [应用生命周期](#b06l0)
### globalData
> 一种简单的全局变量机制
>

+ **提示：**js 中操作 globalData 的方式如下：`**getApp().globalData.text = 'test'**`

```vue
<script>
export default {
  globalData: {
    text: 'text'
  }
}
</script>
```

### 全局样式
> 全局通用样式
>

+ **注意：**如果工程下同时有 vue 和 nvue 文件，全局样式的所有 css 会应用于所有文件，而 nvue 支持的 css 有限，编译器会在控制台报警，提示某些 css 无法在 nvue 中支持。此时需要把 nvue 不支持的 css 写在单独的条件编译里

```vue
<style>
/* #ifndef APP-PLUS-NVUE */
@import './common/uni.css';
/* #endif*/
</style>
```

## main.js
> main.js/uts 是 uni-app 的入口文件
>

**Vue2**

```javascript
import Vue from 'vue'
import App from './App'
import PageHead from './components/page-head.vue' // 全局引用 page-head 组件

Vue.config.productionTip = false
Vue.component('page-head', PageHead) // 全局注册 page-head 组件，每个页面将可以直接使用该组件
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount() // 挂载 Vue 实例
```

**Vue3**

```javascript
import App from './App'
import { createSSRApp } from 'vue'
import PageHead from './components/page-head.vue' // 全局引用 page-head 组件

export function createApp() {
  const app = createSSRApp(App)
  app.component('page-head', PageHead) // 全局注册 page-head 组件，每个页面将可以直接使用该组件

  return {
    app
  }
}
```

## uni.scss
> uni.scss 文件里预置了一批 scss 变量预置，全局可用
>

+ **注意：**
    - 如要使用这些常用变量，需要在 HBuilderX 里面安装 scss 插件
    - 使用时需要在 style 节点上加上 `**lang="scss"**`

```sass
/* 颜色变量 */

/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;

/* 文字基本颜色 */
$uni-text-color: #333; //基本色
$uni-text-color-inverse: #fff; //反色
$uni-text-color-grey: #999; //辅助灰色，如加载更多的提示信息
$uni-text-color-placeholder: #808080;
$uni-text-color-disable: #c0c0c0;

/* 背景颜色 */
$uni-bg-color: #ffffff;
$uni-bg-color-grey: #f8f8f8;
$uni-bg-color-hover: #f1f1f1; //点击状态颜色
$uni-bg-color-mask: rgba(0, 0, 0, 0.4); //遮罩颜色

/* 边框颜色 */
$uni-border-color: #c8c7cc;

/* 尺寸变量 */

/* 文字尺寸 */
$uni-font-size-sm: 24rpx;
$uni-font-size-base: 28rpx;
$uni-font-size-lg: 32rpx;

/* 图片尺寸 */
$uni-img-size-sm: 40rpx;
$uni-img-size-base: 52rpx;
$uni-img-size-lg: 80rpx;

/* Border Radius */
$uni-border-radius-sm: 4rpx;
$uni-border-radius-base: 6rpx;
$uni-border-radius-lg: 12rpx;
$uni-border-radius-circle: 50%;

/* 水平间距 */
$uni-spacing-row-sm: 10px;
$uni-spacing-row-base: 20rpx;
$uni-spacing-row-lg: 30rpx;

/* 垂直间距 */
$uni-spacing-col-sm: 8rpx;
$uni-spacing-col-base: 16rpx;
$uni-spacing-col-lg: 24rpx;

/* 透明度 */
$uni-opacity-disabled: 0.3; // 组件禁用态的透明度

/* 文章场景相关 */
$uni-color-title: #2c405a; // 文章标题颜色
$uni-font-size-title: 40rpx;
$uni-color-subtitle: #555555; // 二级标题颜色
$uni-font-size-subtitle: 36rpx;
$uni-color-paragraph: #3f536e; // 文章段落颜色
$uni-font-size-paragraph: 30rpx;
```

## vue.config.js
+ **注意：**仅 vue 页面生效

### 自定义静态资源目录
```javascript
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 最新版本copy-webpack-plugin插件暂不兼容，推荐v5.0.0

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'src/images'),
          to: path.join(
            __dirname,
            'dist',
            process.env.NODE_ENV === 'production' ? 'build' : 'dev',
            process.env.UNI_PLATFORM,
            'images'
          )
        }
      ])
    ]
  }
}
```

### 注入全局依赖
```javascript
// 示例从插件市场下载 mp-storage
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        localStorage: ['mp-storage', 'localStorage'],
        'window.localStorage': ['mp-storage', 'localStorage']
      })
    ]
  }
}
```

### 配置环境变量
```javascript
const webpack = require('webpack')

module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].VUE_APP_TEST = '"test"'
      return args
    })
  }
}
```

### 发布时删除 console
```javascript
module.exports = {
  chainWebpack: config => {
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap(args => {
      const compress = args[0].terserOptions.compress
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true
      compress.pure_funcs = [
        '__f__' // App 平台 vue 移除日志代码
        // 'console.debug' // 可移除指定的 console 方法
      ]
      return args
    })
  }
}
```

## vite.config.js
+ **注意：**仅 vue 3 项目生效

> 必须引用 '@dcloudio/vite-plugin-uni' 并且添加到 plugins 中
>

```javascript
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()]
})
```

### 自定义静态资源目录
```javascript
import path from 'path'
import fs from 'fs-extra'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

function copyFile() {
  return {
    enforce: 'post',
    async writeBundle() {
      await fs.copy(
        path.resolve(__dirname, 'images'),
        path.join(
          __dirname,
          'unpackage/dist',
          process.env.NODE_ENV === 'production' ? 'build' : 'dev',
          process.env.UNI_PLATFORM,
          'images'
        )
      )
    }
  }
}

export default defineConfig({
  plugins: [uni(), copyFile()]
})
```

### 注入全局依赖
```javascript
// 示例从插件市场下载 mp-storage
import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import inject from '@rollup/plugin-inject'

const mpStoragePath = path.resolve(__dirname, './js_sdk/mp-storage/mp-storage')

export default defineConfig({
  plugins: [
    uni(),
    inject({
      localStorage: [mpStoragePath, 'localStorage'],
      'window.localStorage': [mpStoragePath, 'localStorage']
    })
  ],
  define: {
    'process.env.VUE_APP_TEST': JSON.stringify('test')
  }
})
```

### 配置环境变量
```javascript
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  define: {
    'process.env.VUE_APP_TEST': JSON.stringify('test')
  }
})
```

### 发布时删除 console
```javascript
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
})
```

