## CSS 书写位置
### 内嵌式
> css 样式写在 style 标签中，style 标签放在 head 标签里
>

```html
<head>
  <!-- ... 省略一部分代码 -->

  <style>
    div {
      font-size: 50px;
      background-color: lime;
    }
  </style>
</head>
<body>
  <div>半截九分裤丶</div>
</body>
```

### 外链式
> 通过 link 标签引入一个单独的 css 文件
>

```html
<link rel="stylesheet" href="./index.css">
```

### 行内样式
> 在标签的身上加一个 style 属性，在 style 属性中写 css 样式
>

```html
<div style="color: yellowgreen;">半截短袖丶</div>
```

## font 字体
### 文字大小 `font-size`
> 谷歌浏览器默认字体大小是 16px
>

+ 取值：数字 + px

```css
/* 设定段落文字大小为非常大 */
p { font-size: xx-large }

/* 设定一级标题的文字大小为 2.5 倍大小 */
h1 { font-size: 250% }

/* 设定 span 里的文字大小为 16px */
span { font-size: 16px; }
```

### 文字粗细 `font-weight`
+ 取值：
    - 关键字
        * `bold` 加粗
        * `normal` 正常的（默认）
    - 100 ~ 900 之间的整百数
        * 400（不加粗）
        * 700（加粗）

```css
/* 将段落文本设置为粗体 */
p {
  font-weight: bold;
}

/* 将 div 文本设置比正常深两步，但小于标准粗体 */
div {
 font-weight: 600;
}

/* 设置 span 标记中包含的文本比从父元素继承来的值更细 */
span {
  font-weight: lighter;
}
```

### 文字是否倾斜 `font-style`
+ `italic` 倾斜
+ `normal` 正常的（默认）

```css
.normal {
  font-style: normal;
}

.italic {
  font-style: italic;
}
```

### 字体系列 `font-family`
> 可以允许使用多个字体系列，多个字体系列之间使用英文逗号隔开
>

```css
.serif {
  font-family: Times, "Times New Roman", Georgia, serif;
}

.cursive {
  font-family: cursive;
}
```

### 属性的连写 `font: style weight size family`
+ 前两个因为有默认值，所以可以省略不写

```css
/* 设置字体大小为12px，行高为14px。
   将字体族设置为sans-serif */
p { font: 12px/14px sans-serif }

/* 设置字体大小为父元素的80%
   或默认值(如果没有父元素)
   将字体族设置为sans-serif */
p { font: 80% sans-serif }

/* 设置字体粗体，
   字体改为斜体，
   将字体大小调大，
   和字体族到衬线。 */
p { font: bold italic large serif }

/* 使用与窗口状态栏相同的字体 */
p { font: status-bar }
```

## 选择器
### 标签选择器 `div {}`
> 会选中当前页面中所有的指定标签
>

### class 选择器 `.类名 {}`
> 一个标签可以同时拥有多个类名，多个类名之间使用空格隔开
>
> 同一个类名，可以供多个标签同时使用
>

+ class 类名的命名规则：可以包含数字、字母、下划线，不能以数字开头

### id 选择器 `#id名 {}`
> id 是唯一的，不可重复的
>
> 一个标签只能拥有一个 id
>

### 通配符选择器 `* {}`
> 会选中当前页面的所有标签
>
> 多用于样式的初始化
>

### 后代选择器 `选择器1 选择器2 {}`
> 表示 `选择器1` 标签下的所有的 `选择器2` 标签
>

+ 特点：
    - 后代选择器至少由两个选择器构成
    - 多个选择器之间使用空格隔开

### 子代选择器 `选择器1 > 选择器2 {}`
> 子代选择器只包含儿子辈，又叫做亲儿子选择器
>

### 兄弟选择器 `选择器1 + 选择器2 {}`
> 兄弟选择器只会选择紧接在指定元素后面的第一个兄弟元素。如果想选择所有后续的兄弟元素，可以使用通用兄弟选择器 `"~"`。
>

### 并集选择器 `选择器1, 选择器2, 选择器3 {}`
> 每个选择器之间使用英文的逗号隔开
>
> 一般使用并集选择器用来写公共的样式
>

### 交集选择器 `选择器1选择器2 {}`
> `选择器1` 和 `选择器2` 之间没有任何的空格和其他符号
>
> 当交集选择器中有标签选择器的话，那么标签选择器一定要放在最前面
>

### 属性选择器
> 根据 html 的标签属性进行选中
>
> 一般情况下，我们写 css 样式时不会单独使用属性选择器去设置样式
>
> 属性选择器一般是配合 js 来使用，一般是在处理表单数据的时候才会使用
>

**标签属性分类：**

1. 自带属性、原有属性
2. 自定义属性
+ 语法：
    1. `E[attr]` 选中具有 `attr` 属性的 `E` 元素
    2. `E[attr="val"]` 选中具有 `attr` 属性并且属性值等于 `val` 的 `E` 元素
        * `**$=**`** 以...结尾
        * `*=` 包含...
        * `^=` 以...开头

**属性选择器也支持自定义属性，自定义属性，一般是以 data- 开头：**

```css
div[data-id="1"] {
  font-size: 60px;
}

li [class^="local-nav-icon"] {
  width: 32px;
  height: 32px;
}
```

### <font style="background-color:rgb(169, 147, 0);">伪类选择器</font>
#### hover `选择器:hover {}`
> 鼠标移入指定元素时产生的样式变化
>

+ 注意：
    - 一般情况下，`:hover` 最终改变的是 `:hover` 前面的这个选择器的样式
    - 但是，如果使用了后代选择器，那么最终改变的是最后一个选择器的样式，不管 `hover` 给谁加的

#### 链接伪类选择器
1. `:link` 未访问过的状态（默认颜色为蓝色）
2. `:visited` 已访问过的状态（默认颜色为紫色）
3. `:hover` 鼠标移入的状态
4. `:active` 鼠标按下的状态（默认颜色为红色）
+ 注意：如果同时实现这四种效果，需要按照 L V H A 的顺序来写

#### 焦点伪类选择器 `选择器:focus {}`
### <font style="background-color:rgb(193, 168, 0);">结构伪类选择器</font>
#### 选中第一个子元素 `:first-child`
#### 选中最后一个子元素 `:last-child`
#### 选择第一个子元素 `:nth-child(n)`
+ n 的取值：
    - 数字
    - 关键字
        * `even` 偶数
        * `odd` 奇数
    - 简单的数学表达式
        * `n + 5` 选择从第五个开始往后
        * `-n + 5` 选择从第一个开始到第五个
        * `4n` 选择 4 的倍数

#### 选择父元素的同类型子元素 `:nth-of-type(n)`
## 颜色的取值
### 关键字
> `red` `blue` `yellow` `pink` `black`
>

### rgb()
> `rgb(255, 255, 255)` 每个颜色取值范围 0~255
>

### rgba() 
> `rgba(0, 0, 0, .6)` 最后一个值表示透明度，取值范围是 0~1
>

### 十六进制表示法
> `#fff` `#000` `#ccc`
>

## 文本相关属性
### 文本首行缩进 `text-indent`
> 定义一个块元素首行文本内容之前的缩进量
>

+ 取值：
    - 数字 + px
    - 数字 + em（推荐）
        * 1em 等于当前标签的 font-size 大小，`1em = 16px`（默认）

```css
/* 首行缩进两个字体大小 */
p {
  text-indent: 2em;
}
```

### 文本的水平居中 `text-align`
> 定义行内内容（例如文字）如何相对它的块父元素对齐。
>
> `text-align` 并不控制块元素自己的对齐，只控制它的行内内容的对齐。
>

+ 特点：
    - `text-align` 只能给独占一行的标签设置
    - 给 `span` 和 `a` 标签本身设置 `text-align` 是无效的
    - `text-align` 不能让独占一行的盒子本身居中
    - 给独占一行的大盒子设置 `text-align`，不仅可以让盒子内的文字居中，还可以让盒子内的 `span` `a` `img` `input` 居中，即让行内元素居中

```css
/* 让文本内容居中 */
p {
  text-align: center;
}
```

### 文本修饰线 `text-decoration`
+ 取值：
    - `underline` 下划线
    - `line-through` 中间线
    - `overline` 顶部的线
    - `none` 没有线（默认的）

```css
.under {
  text-decoration: underline red;
}
```

### 行高 `line-height`
+ 取值：
    - 数字 + px
    - 倍数 `line-height: 1;`
+ 运用场景：当行高的值等于父盒子高度值的时候，文字会垂直居中显示（**<font style="color:#DF2A3F;">实现文本垂直居中</font>**）

```css
/* 理论上，以下所有规则拥有相同的行高 */

div { line-height: 1.2;   font-size: 10pt; }   /* 无单位数值 number/unitless */
div { line-height: 1.2em; font-size: 10pt; }   /* 长度 length */
div { line-height: 120%;  font-size: 10pt; }   /* 百分比 percentage */
div { font: 10pt/1.2  Georgia,"Bitstream Charter",serif; } /* font 简写属性 font shorthand */
```

## 背景相关属性
### 背景颜色 `background-color`
> 设置元素的背景色
>

+ 取值：`transparent` 透明（默认）

```css
/* 设置背景颜色为红色 */
p {
  background-color: #ff0000;
}
```

### 背景图片 `background-image`
> 为一个元素设置一个或者多个背景图像
>

+ 取值：
    - `url(图片的地址)`
+ 特点：
    - 背景图片不会撑大盒子
    - 背景图默认是平铺的

```css
.catsandstars {
  background-image:
      url("startransparent.gif"),
      url("catfront.png");
}
```

### 背景平铺 `background-repeat`
> 定义背景图像的重复方式
>

+ 取值：
    - `repeat` 平铺（默认）
    - `no-repeat` 不平铺
    - `repeat-x` 在 x 轴上平铺（水平方向）
    - `repeat-y` 在 y 轴上平铺（垂直方向）

```css
.one {
    background-repeat: no-repeat;
}
```

### 背景定位 `background-position`
> 为每一个背景图片设置初始位置
>

```css
/* 多背景图片：每个图片依次和相应的 `background-position` 匹配 */
.examplethree {
  background-image: url("startransparent.gif"), url("catfront.png");
  background-position: 0px 0px, right 3em bottom 2em;
}
```

### 背景大小 `background-size`
> 设置背景图片大小
>

+ 取值：
    - 数字 + px
    - 百分比（常用），**注意：** 是相对于父盒子的大小
    - contain（保持长宽比，尽可能填满盒子，可能会留有空白）
    - cover（保持长宽比，填满整个盒子为止，如有超出部分，则会进行裁剪）

```css
.bar {
  /* background-size: 图片的宽度 图片的高度; */
  background-size: 25px 50px;
  background-size: 50% 50%;
}
```

### 背景模糊 `backdrop-filter`
**<font style="color:rgb(51, 51, 51);background-color: #FBDE28;">backgrop-filter 和 filter 的区别</font>**

+ `filter` 模糊内容
+ `backdrop-filter` 透过该层的底部元素模糊化

```css
backdrop-filter: saturate(150%) blur(8px); /* saturate(150%)：饱和度，blur(8px)：模糊度 */
-webkit-backdrop-filter: saturate(150%) blur(8px);
background-color: rgba(0,0,0,.3);
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674472668651-aeccbc59-888b-4e38-8e96-020f46378622.png)

```css
backdrop-filter: saturate(150%) contrast(50%) blur(8px); /* contrast(50%)：对比度 */
-webkit-backdrop-filter: saturate(150%) contrast(50%) blur(8px);
background-color: rgba(0,0,0,.3);
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674472737032-56a7d72c-2bd9-4b08-bd0d-266d695122d7.png)

### 属性的连写 `background: image color repeat position;`
```css
.topbanner {
  background: url("starsolid.gif") #99f repeat-y fixed;
}
```

## 元素的显示模式 `display`
### 块级元素 `display: block;`
+ 特点：
    - 独占一行
    - 宽度默认是父元素的宽度，高度默认由内容撑开
    - 可以设置宽高
+ 举例：`div` `h1~h6` `p` `ul` `li` `ol` `dl` `dt` `dd` `form` `table`

### 行内元素 `display: inline;`
+ 特点：
    - 一行可以显示多个
    - 宽度和高度默认的由内容撑开，内容多宽多高，标签就有多宽多高
    - 可以设置宽高，但是宽高不生效（即在效果上不可以设置宽高）
+ 举例：`span` `a` `img` `文本格式化标签`

### 行内块元素 `display: inline-block;`
+ 特点：
    - 一行可以显示多个
    - 可以设置宽高且生效
+ 举例：`input` `textarea` `button`

## CSS 三大特性
### 层叠性
> 相同优先级选择器中的 CSS 样式，下面的会将上面的层叠掉
>

### 继承性
> 子元素可以继承父元素的某一些 css 属性（子承父业）
>

+ 可以继承的属性：
    - **以 **`**font-**`** 开头的都可以继承**
    - **行高**
    - `**color**`**（****<font style="color:#DF2A3F;">a 标签比较特殊</font>****）**
    - `**text-align**`
    - `**text-indent**`

### 优先级
+ 从低到高
    - 继承 < 通配符选择器 < 标签选择器 < 类选择器 < id选择器 < 行内样式 < !important
+ 约分思想
    - 复合型选择器的优先级比较
    - 约掉相同类型的选择器

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674479871408-5e569d8e-8693-4419-8041-5231f51b4572.png)

## 盒子模型
### 组成部分
+ `content` 内容
+ `border` 边框
+ `padding` 内边距
+ `margin` 外边距

### 标准盒模型 `box-sizing: content-box;`
+ `width = content`

### 怪异盒模型 `box-sizing: border-box;`
+ `width = content + border + padding`

## 浮动 `float`
> 让块级元素在一行上显示
>

### 使用
```css
/* 左浮动 */
.left {
  float: left;
  background: pink;
}

/* 右浮动 */
.right {
  float: right;
  background: cyan;
}
```

### 浮动产生的影响
+ 脱标，会导致盒子不占位置，下面正常标准流的盒子会往上跑

### 清除浮动
1. 双标签清除法

```css
.clearfix::before,
.clearfix::after {
    content: '';
    display: table;
}
.clearfix::after {
    clear: both;
}
```

2. 给浮动元素的父元素设置 `overflow: hidden;`
3. 给浮动元素的父元素设置高度
4. 额外标签法
    - 给浮动元素的父元素内容的最后面，设置一个空的块级标签，并给该标签设置 `clear: both;`

## 定位 `position`
### 静态定位 `position: static;`
> 该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 `top`, `right`, `bottom`, `left `和 `z-index` 属性无效。
>

### 相对定位 `position: relative;`
> 元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）
>

### 绝对定位 `position: absolute;`
> 元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
>

+ 应用场景：一般是配合相对定位来进行使用
+ 子绝父相：子元素设置绝对定位，父元素设置相对定位

### 固定定位 `position: fixed;`
> 元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。
>

### 粘性定位 `position: sticky;`
> 元素根据正常文档流进行定位，然后相对它的_最近滚动祖先_（nearest scrolling ancestor）和_最近块级祖先_（nearest block-level ancestor），包括 table-related 元素，基于 top、right、bottom 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置
>

### 层级关系
+ 标准流、浮动元素、定位元素之间的层级关系是：**<font style="color:#DF2A3F;">标准流 < 浮动 < 定位</font>**
+ 定位元素与定位元素之间的层次关系使用 `z-index` 属性进行控制
    - `z-index` 属性只能给定位的元素使用
    - 取值：整数数字
    - 谁的数值大谁的层级就高
    - 举例：`z-index: 999;`

## 垂直对齐方式 `vertical-align: middle;`
+ 取值：
    - top
    - middle（中线）
    - baseline（默认）
    - bottom

## 光标的类型 `cursor`
+ 取值：
    - `default` 箭头形式（默认）
    - `pointer` 链接类型（小手）
    - `move` 拖拽类型（十字形）
    - `text` 文本型（工字型）

## 边框圆角 `border-radius`
> 支持四个值，默认从左上角开始，顺时针旋转
>
> 给正方形设置 `border-radius: 50%;` 就是一个圆形
>

+ 取值：
    - 数字 + px
    - 百分比

**<font style="color:rgb(51, 51, 51);background-color:#FBDE28;">胶囊图</font>：** 必须是长方形，圆角值是高度的一半

## 溢出 `overflow`
+ 取值：
    - `visible` 溢出可见（默认）
    - `hidden` 隐藏
    - `scroll` 无论是否溢出，都会显示滚动条
    - `auto` 根据是否溢出，自动显示滚动条
+ 可以设置单方向的溢出表现形式：
    - `overflow-x`
    - `overflow-y`

## 三种隐藏元素的方式
### 元素的显示模式 `display`
> 元素隐藏之后不占位置
>

+ `display: none;` 隐藏
+ `display: block;` 显示

### 透明度 `opacity`
> 改变元素整体的透明度
>

+ 取值：范围 0~1，0 表示完全透明，1 表示完全不透明

### `visibility` 
> 显示或隐藏元素而不更改文档的布局
>

+ 取值：
    - `visible` 元素正常显示
    - `hidden` 隐藏元素，但是其他元素的布局不改变，相当于此元素变成透明
+ 注意：要注意若将其子元素设为 `visibility: visible;`，则该子元素依然可见。

## CSS 书写顺序（规范）
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674569402262-4eb8f203-db2a-4312-b244-9e3a18352f72.png)

## 表格边框的合并
```css
table {
  border-collapse: collapse;
}
```

## `img` 或 `video` 标签的填充模式 `object-fit`
+ 可选值：
    - `fill` 内容拉伸填满整个 content box，不保证保持原有的比例（默认）
    - `contain` 保持原有尺寸比例。尽可能占满容器，可能会有留白
    - `cover` 保持原有尺寸比例。占满整个容器，超出部分将会被裁剪，可能会有部分区域不可见
    - `none` 保持原有尺寸比例。同时保持替换内容原始尺寸大小
    - `scale-down` 保持原有尺寸比例，如果容器尺寸大于图片内容尺寸，保持图片的原有尺寸，不会放大失真；容器尺寸小于图片内容尺寸，用法跟 contain 一样

## 阴影
+ **注意：** 在实际开发中，用到盒子阴影和文字阴影的地方很少，因为阴影的渲染会影响 css 的渲染性能

### 文字阴影 `text-shadow`
+ 取值：
    - 水平方向上的偏移量（移动的距离）-- 必须
    - 垂直方向上的偏移量（移动的距离）-- 必须
    - 模糊度，值越大，字越模糊
    - 模糊颜色

```css
/* 文字阴影支持多组，多组之间使用英文的逗号隔开 */
.box {
  text-shadow: 20px 2px 9px lightgreen, 
    -20px 20px 8px lightpink,
    -20px -20px 6px lightskyblue;
}
```

### 盒子阴影 `box-shadow`
+ 取值：
    - 水平偏移量 -- 必须
    - 垂直偏移量 -- 必须
    - 模糊度
    - 阴影的扩大范围
    - 颜色
    - inset（设置阴影为内部阴影）

```css
/* 盒子阴影也支持多组，多组之间使用英文逗号隔开 */
.box {
  box-shadow: 20px 20px 10px lightgreen,
    -20px -20px 8px lightcoral,
    20px -20px 6px lightseagreen,
    -20px 20px 6px lightskyblue;
}
```

## 过渡效果 `transition`
> 一个元素从一个 css 状态变化到另外一个状态，中间的变化过程是可见的，这个过程叫做过渡、
>

+ 语法：、`transition: 变化的 css 属性名 变化的时间（单位：s）;`

```css
.box {
  /* transition: width 3s, height 3s, background-color 3s ; */
  /* transition: height 3s; */
  transition: all 3s;
}
```

+ **注意：**`transition` 过渡属性对下面两个元素属性的隐藏和显示是没有任何效果的、

```css
display: none;  
visibility: hidden;
```

## 外边距问题
### 外边距塌陷
> 父子两个盒子，子盒子设置 `margin-top`，父盒子会跟着一块掉下来
>

+ 解决办法：
    1. 给父盒子设置 `padding-top` 来替代子盒子的 `margin-top` （推荐）
    2. 给父盒子设置顶部的边框
    3. 给父盒子设置 `overflow: hidden;`
    4. 给大盒子或者小盒子转为行内块
    5. 给子盒子设置浮动

### 外边距折叠
> 上下两个块级盒子，上盒子设置下外边距，下盒子设置上外边距，两个盒子之间的间距为：谁的 `margin` 值大以谁为准
>

### 外边距和内边距无效的情况
> 给行内元素设置上下的内外边距是无效的
>

## 居中问题
### 文字、行内、行内块元素水平垂直居中
1. 方法一

```css
.box {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
```

2. 方法二

```css
.box {
  height: 30px;
  padding: 0 20px;
  line-height: 30px;
}
```

3. 方法三
+ **注意：** 只给父元素设置行高，是不能让父元素中的 **<font style="color:#DF2A3F;">行内块</font>** 垂直居中的

```css
.box {
  width: 300px;
  height: 300px;
  text-align: center;
  line-height: 300px;
}

.box .son {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
```

### 块元素水平垂直居中
+ **注意：** 给块级元素本身设置了 `margin: 0 auto;`，就必须给该元素设置固定宽度
1. 方法一

```css
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

2. 方法二

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

3. 方法三

```css
.box {
  position: absolute;
  left: calc(50% - 小盒子宽度 / 2);
  top: calc(50% - 小盒子高度 / 2);
}
```

4. 方法四

```css
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -盒子宽度的一半;
  margin-top: -盒子高度的一半;
}
```

## 计算函数 calc()
+ 取值：支持简单的数学表达式
+ 应用场景：左右两个盒子固定宽度，中间盒子自适应大小
+ **注意：**
    1. 运算符的前后一定要有空格
    2. 如果表达式中有距离的运算，一定要加单位（px）

```css
.son {
  /* 不管父元素宽度为多少，子元素始终比父元素短 50px     */
  /* 注意：+ - * / 符号前后一定要敲一个空格 */
  width: calc(100% - 50px);
  height: 100px;
  background-color: pink;
}
```

## 三角形的实现
+ 思想：将盒子的宽高设置成 0，然后设置一个带有宽度颜色为透明的边框，然后再将一条边设置为指定颜色即可

### 方法一
```css
.box {
  width: 0;
  border: 10px solid transparent;
  border-top: 10px solid #000;
}
```

### 方法二
```css
.box::after {
  content: '';
  display: block;
  width: 0;
  border: 10px solid transparent;
  border-top: 10px solid #000;
}
```

### 方法三
> 角度不同的三角形
>

```css
.box {
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
  border-width: 0 0 50px 100px;
  border-bottom-color: skyblue;
}
```

**展示结果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674624518869-e8e9d95d-b2d1-4af7-9949-e818910e4272.png)

## 梯形的实现
```css
.expand {
  width: 200px;
  height: 32px;
  /* 切片 */
  background: linear-gradient(225deg, #fff 50%, transparent 0) left bottom,
  linear-gradient(135deg, #fff 50%, transparent 0) right bottom;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  /* 阴影 */
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.1));
}
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1716369156257-e787d5de-70f9-484c-a148-02acdf665804.png)

## 长虚线的实现
```css
.custom-dashed {
  width: 2px;
  height: 80px;
  /* 重复的线性渐变 */
  background: repeating-linear-gradient(
    to bottom, /* 渐变方向从顶部到底部 */
    #b7b4a4, /* 渐变的开始部分 */
    #b7b4a4 15px, /* 颜色延续至15像素的位置 */
    transparent 15px, /* 表示从15像素开始，颜色将变为透明 */
    transparent 20px /* 透明色将继续到20像素 */
  );
}
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723446684719-032bc96a-e988-4cd6-875d-d536cb8fc654.png)

## 图片边框的实现
```css
.bg-border {
  width: 600px;
  height: 400px;
  border-style: solid;
  border-width: 10px;
  border-image-source: url('./border.png');
  border-image-slice: 10 fill;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724824220865-b77a1a0a-8dde-47ec-a033-a4f27b536b94.png)

## 文本溢出显示省略号
> 如果文字超出父元素指定宽度，文字会自动换行，而连续不间断数字和英文字母（中间没有其他字符）不会自动换行
>

### 单行超出显示省略号
```css
.text-ellipsis{
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 文本溢出显示省略号 */
  white-space: nowrap; /* 不换行 */
  -o-text-overflow: ellipsis;
}
```

### 多行超出显示省略号
```css
.text-ellipsis{
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 文本溢出显示省略号 */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 设置显示文本行数 */
  -webkit-box-orient: vertical; /* 设置弹性盒子的子元素的排列方式为垂直排列 */
}
```

## 滚动条样式
```css
div {
  /* 修改滚动条的宽度和高度 */
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  /* 修改滚动条的形状 */
  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 2px;
  }
  /* 修改滚动条轨道的形状 */
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 2px;
  }
}
```

## 平面转换 `transform`
> `transform` 一般配合 `transition` 来使用
>

### `translate` 位移（重要）
+ 取值：
    - 数字 + px
    - %（百分比）
+ **注意：**
    1. 位移参考自己原来的位置进行移动
    2. 如果单位是百分比，参考的是自身的宽/高
    3. 位移不会影响其他的兄弟盒子
    4. 位移对行内元素无效
+ 举例：`transform: translate(120px, 50%);`

### `rotate` 旋转
+ 取值：数字 + deg（角度）
+ **注意：** 正值为顺时针旋转，负值为逆时针旋转
+ 举例：`transform: rotate(360deg);`

**<font style="background-color:rgb(172, 149, 0);">转换原点</font>** `transform-origin`

> Z 轴取值只能设置固定长度值
>

+ 取值：
    - `left`
    - `center`
    - `right`
    - `top`
    - `bottom`
    - %（百分比）
+ 举例：`transform-origin: 50% 50% 0;`

### `scale` 缩放
+ 取值：
    - 数字（0~1）
    - %（百分比）
+ **注意：**
    1. 缩放的参考对象是缩放之前的宽高进行缩放
    2. 大于 1 表示放大
    3. 小于 1 表示缩小
    4. 当宽高的缩放比相等时，可以设置一个值
+ 举例：`transform: scale(宽的缩放比, 高的缩放比);`

### `transform` 书写多个属性的注意事项
1. 如果 **<font style="color:#DF2A3F;">旋转</font>** 和其他属性同时存在时，尽量 **<font style="color:#DF2A3F;">将其放置在后面</font>**，因为 **<font style="color:#DF2A3F;">旋转会改变盒子的坐标轴向</font>**
2. 多个属性之间用 **<font style="color:#DF2A3F;">空格</font>** 隔开 `transform: translate(50px) scale(2) rotate(360deg);`

## 3D 转换
+ 在平面转换的基础上，增加了 Z 轴
+ 子元素搭配定位来完成
+ 给想转换成立体图形的盒子添加：`transform-style: preserve-3d;`
+ 给转换成立体图形的 **<font style="color:#DF2A3F;">父盒子</font>** 添加：`perspective: 1000;`，产生 **<font style="color:#DF2A3F;">近大远小</font>** 的视觉效果

## 渐变
> 由于受浏览器**兼容**的影响，最好给 css3 渐变加上**浏览器私有前缀**
>

+ 私有前缀：
    - `-webkit-` 代表谷歌 chrome 和 safari 私有属性
    - `-moz-` 代表火狐浏览器私有属性
    - `-o-` 代表 Opera 私有属性
    - `-ms-` 代表 ie 的浏览器私有属性

### 线性渐变
> 方向不写，默认从上往下渐变
>

```css
/* background: linear-gradient(方向, 颜色1, 颜色2, ...); */
background-image: linear-gradient(to right, red, yellow, skyblue);
background-image: linear-gradient(to bottom right, red, skyblue);
```

## 动画 `animation`
### 定义动画
```css
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}

/* 或 */
@keyframes example {
  0%   {background-color: red;}
  25%  {background-color: yellow;}
  50%  {background-color: blue;}
  100% {background-color: green;}
}
```

### 使用动画
+ **注意：**
    1. 使用动画时必须要有动画的 **<font style="color:#DF2A3F;">名称</font>** 和 **<font style="color:#DF2A3F;">时长</font>**
    2. 如果有两个时间，则表示第一个是 **<font style="color:#DF2A3F;">动画时长</font>**，第二个是 **<font style="color:#DF2A3F;">延迟时间</font>**
    3. 可以使用多个动画，有多个动画时，每个动画用 **<font style="color:#DF2A3F;">逗号</font>** 隔开

```css
div {
  /* 这是动画的简写 */
  animation: example 5s linear 2s infinite alternate;
}
```

## 伪元素
+ **注意：**
    - 伪元素一定要添加 **<font style="color:#DF2A3F;">content</font>**<font style="color:#DF2A3F;">属性</font>
    - 伪元素是 **<font style="color:#DF2A3F;">行内元素</font>**
+ 拓展：
    - `::first-letter` 操作段落的第一个字
    - `::first-line` 操作第一行文本样式
    - `::selection` 操作被鼠标选中的文本样式

```css
/* 向内容的前面添加元素 */
.div::before {
  content: '';
  display: block;
  width: 100px;
  height: 100px;
}

/* 向内容的后面添加元素 */
.div::after {
  content: '';
  display: block;
  width: 100px;
  height: 100px;
}
```

## 媒体查询
```css
/* 表示屏幕尺寸小于 540px 时 body 的背景颜色变为蓝色 */
@media screen and (max-width:539px) {
  body {
    background-color: blue;
  }
}

/* 表示屏幕尺寸大于等于 540px 时 body 的背景颜色变为天蓝色 */
@media screen and (min-width:540px) {
  body {
    background-color: skyblue;
  }
}
```

```html
<!-- 也可以通过标签引入的方式来使用媒体查询，符合要求，则样式生效 -->
<link rel="stylesheet" href="./style540.css" media="screen and (min-width:540px)">
```

## Flex 布局 `display: flex;`
+ **<font style="color:#DF2A3F;">主轴方向</font>**：

```css
/* 横向（默认） */
flex-direction: row;

/* 将主轴的方向设置为 Y 轴 */
flex-direction: column;
```

+ 子元素的 **<font style="color:#DF2A3F;">主轴排列方式</font>**：

```css
/* 从开始位置排列（默认） */
justify-content: flex-start;

justify-content: flex-end;
justify-content: center;
justify-content: space-around;
justify-content: space-between;
justify-content: space-evenly;
```

+ **<font style="color:#DF2A3F;">单行</font>**子元素的**<font style="color:#DF2A3F;">侧轴排列方式</font>**：

```css
/* 拉伸（默认） */
align-items: stretch;

align-items: flex-start;
align-items: flex-end;
align-items: center;
```

+ **<font style="color:#DF2A3F;">多行</font>**子元素的**<font style="color:#DF2A3F;">侧轴排列方式</font>**：

```css
/* 拉伸（默认） */
align-content: stretch;

align-content: flex-start;
align-content: flex-end;
align-content: center;
align-content: space-around;
align-content: space-between;
```

+ 子元素 **<font style="color:#DF2A3F;">是否换行</font>**：

```css
/* 不换行（默认） */
flex-wrap: nowrap;

/* 超出父盒子范围，子元素换行 */
flex-wrap: wrap;
```

+ `flex-flow` 复合属性

```css
flex-direction: row;
flex-wrap: wrap;

/* 可以写成复合形式 */
flex-flow: row wrap;
```

+ 子元素在父元素中 **<font style="color:#DF2A3F;">所占的份数</font>**

```css
/* 该属性设置给子元素 */
flex: 1;

/* 取值也可以设置为 %（百分比） */
flex: 25%;
```

+ **<font style="color:#DF2A3F;">单个</font>**子元素的**<font style="color:#DF2A3F;">侧轴排列方式</font>**：

```css
/* 该属性设置给子元素 */
/* 前提伸缩项不设置高度（默认） */
align-self: stretch;

align-self: flex-start;
align-self: flex-end;
align-self: center;

/* 基线对齐 */
align-self: baseline;
```

+ `order` 子元素的 **<font style="color:#DF2A3F;">排列顺序</font>**：

```css
/* 该属性设置给子元素 */
/* 默认值 0，数值越小越靠前 */
order: 0;
```

## Grid 布局 `display: grid;`
+ **<font style="color:#DF2A3F;">每列宽度</font>**：

```css
/* 可以是固定宽度 */
grid-template-columns: 100px 100px 100px;
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674821056541-3a2d07d1-1756-4310-b114-febcb73d8f26.png)

```css
/* 也可以是浮动宽度，指定所占空间份数 */
grid-template-columns: 1fr 2fr 1fr;
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674821257156-d9eea317-149c-493c-8f9a-080df0d15753.png)

+ **<font style="color:#DF2A3F;">列间距</font>**<font style="color:rgb(51, 51, 51);">：</font>

```css
column-gap: 24px;
```

+ **<font style="color:#DF2A3F;">行间距</font>**：

```css
row-gap: 24px;
```

+ **<font style="color:#DF2A3F;">子元素的间距</font>**<font style="color:rgb(51, 51, 51);">：</font>

```css
/* 统一设置行和列间距 */
gap: 24px;
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674821650240-e718dc39-af7f-4836-ae92-db4dfb4856ef.png)

+ **<font style="color:#DF2A3F;">区域排列</font>**：

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674821905374-8bd30107-7dba-4b17-aca3-952d683db949.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674821971912-41575dd8-814d-4459-b703-cfac7d1a0d4a.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674822008844-682f610c-5847-47cb-8528-c75fc707eee7.png)

+ 也可以和 `flex` 一样使用，控制子元素的排列方式

```css
/* 水平方向 */
/* 居中对齐 */
justify-items: center;
/* 靠右对齐 */
justify-end: end;
/* 两端对齐 */
justify-end: space-between;

/* 垂直方向 */
/* 居中对齐 */
align-items: center;
/* 靠下对齐 */
align-items: end;
```

+ 行轨道和列轨道小于 `grid` 容器，可以对整体进行对齐

```css
/* 水平方向 */
justify-content: center;
justify-content: end;
justify-content: space-between;

/* 垂直方向 */
align-content: center;
align-content: end;
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674822474242-907bd9ce-f9d8-428e-a9db-3b9e530302b1.png)

## CSS 变量
1. 变量的定义
    - `--` 使用两个短横线加上变量名
    - **注意：** 在定义变量时，必须指定所在元素
2. 变量的使用
+ `var(--变量名)`

```css
/* :root 是css伪类，匹配文档树的根元素
对于html来说，:root 表示元素，优先级更高，它与 html 选择器相同 */
:root {
  --dpr: 2;
  --baseFont: 50px;
  --bgc: hotpink;
  --base: 50px;
  --my-marginop: 100px;
}

/* css变量可以相互传递，在css变量定义的时候，可以被其他变量引用 */
body {
  --hot: hotpink;
  --bgc: var(--hot);
  --background: var(--bgc);
  --color: var(--background);
}

body {
  /* var() 方法第一个参数是变量名字，函数第二个参数是回退值
  如果第一个参数无效（变量没有或者写错了），则函数将使用第二个参数替代 */
  background-color: var(--bgcsss, yellow);
  /* background-color: var(--bgc, yellow); */
}
```

## CSS 重置样式表
[lib-flexible-2.0.js](https://www.yuque.com/attachments/yuque/0/2024/js/33977556/1725417755959-34cf236d-40dd-4e2b-bb8e-35f82f5d5539.js)

[lib-flexible-2.0.min.js](https://www.yuque.com/attachments/yuque/0/2024/js/33977556/1725417779778-eeceea22-e294-4e65-a633-17b4af079c8e.js)

[lib-flexible-2.0.min.js](https://www.yuque.com/attachments/yuque/0/2024/js/33977556/1725417788323-81ac5acb-093a-4a28-91e9-eab80ddab39b.js)

[normalize.min.css](https://www.yuque.com/attachments/yuque/0/2024/css/33977556/1725417792458-d49d0932-d8c8-43cd-ad55-a8f3324ae694.css)

[reset.css](https://www.yuque.com/attachments/yuque/0/2024/css/33977556/1725417796386-320d86d5-7c1d-4d35-ba9d-ef9605c01ceb.css)

[reset.min.css](https://www.yuque.com/attachments/yuque/0/2024/css/33977556/1725417800963-c2b6a7f9-0176-42c5-a768-b58f2af293bd.css)

