## SVG 引入方式
1. 直接在 HTML 中嵌入 SVG 代码

```html
<svg>
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

2. 使用 `<img>` 标签引入 SVG 文件

```html
<img src="image.svg" alt="SVG Image">
```

3. 使用 `<object>` 标签引入 SVG 文件

```html
<object type="image/svg+xml" data="image.svg"></object>
```

4. 使用 `<embed>` 标签引入 SVG 文件

```html
<embed src="image.svg" type="image/svg+xml" />
```

5. 使用 CSS 的 `background-image` 属性来引入 SVG 文件

```css
div {
  background-image: url(image.svg);
}
```

## SVG 元素
```html
<svg width="100%" height="100%">
  <!--  cx 表示圆心的 X 轴坐标 -->
  <!--  cy 表示圆心的 Y 轴坐标 -->
  <!--  r 表示圆的半径 -->
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>

<!-- viewBox 属性值为四个数字，分别表示左上角的横坐标和纵坐标、视口的宽度和高度 -->
<svg width="100" height="100" viewBox="50 50 50 50">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678173577318-84e8a1c0-3444-42d0-92d1-43d6bc11fa2f.png)

## SVG 图形元素
### `<rect>` 矩形
> `<rect>` 标签用于绘制矩形
>

```html
<head>
	<style>
    .rect {
      fill: pink;
      stroke: #9370DB;
      stroke-width: 10px;
    }
  </style>
</head>

<body>
  <svg width="400" height="400">
    <!--  x 表示矩形左上角的 X 轴坐标 -->
    <!--  y 表示矩形左上角的 Y 轴坐标 -->
    <rect x="50" y="50" width="250" height="150" class="rect"></rect>
  </svg>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678175412984-8b651661-6025-43b1-b4b5-96d9fe74d83d.png)

### `<circle>` 圆形
> `<circle>` 标签用于绘制圆形
>

```html
<head>
  <style type="text/css">
    .bgred {
      fill: red;
      /* stroke 表示描边颜色 */
      stroke: 'black';
      stroke-width: '3pt';
    }
  </style>
</head>

<body>
  <svg width="200" height="200">
  	<!--  fill 表示填充颜色 -->
    <circle cx="100" cy="100" r="25" fill="yellow"></circle>
    <circle cx="170" cy="170" r="5" class="bgred"></circle>
  </svg>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678173666461-a5827215-f933-4d21-beb5-a5636894dea9.png)

### `<ellipse>` 椭圆
> `<ellipse>` 标签用于绘制椭圆
>

```html
<head>
  <style>
    ellipse {
      fill: #00BFFF;
      stroke: #FFFF00;
      stroke-width: 5px;
    }
  </style>
</head>

<body>
  <svg width="400" height="400">
    <ellipse cx="60" cy="60" rx="40" ry="50"></ellipse>
  </svg>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678175896853-dfe8c113-52d9-437c-a850-532723dde6e9.png)

### `<line>` 直线
> `<line>`标签用于绘制直线
>

```html
<head>
  <style type="text/css">
    .line {
      stroke: #00BFFF;
      stroke-width: 5px;
    }
  </style>
</head>

<body>
  <svg width="400" height="400">
  	<!--  x1 表示第一个点的横坐标 -->
  	<!--  y1 表示第一个点的纵坐标 -->
    <!--  x2 表示第二个点的横坐标 -->
  	<!--  y2 表示第二个点的纵坐标 -->
    <line x1="50" y1="50" X2="350" y2="350" class="line"></line>
  </svg>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678180681525-7f2bac39-ee97-41b1-87ab-50b6e80344c8.png)

### `<polyline>` 折线
> `<polyline>` 标签用于绘制折线
>

```html
<head>
  <style type="text/css">
    .polyline {
      stroke: deeppink;
      stroke-width: 5px;
      fill: none;
    }
  </style>
</head>

<body>
  <svg width="400" height="400">
  	<!--  polyline 表示多段线 -->
    <polyline points="50,100 50,300 350,300" class="polyline"></polyline>
  </svg>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678180733191-98b5e40b-99a5-4aaf-ba70-5a0e5ae78308.png)

### `<polygon>` 多边形
> `<polygon>` 标签用于绘制多边形
>

```html
<head>
  <style>
    .polygon {
      fill: #00BFFF;
      stroke: #FF1493;
      stroke-width: 10px;
    }
  </style>
</head>

<body>
  <svg width="400" height="400">
    <polygon points="50,50 350,350 50,350" class="polygon"></polygon>
  </svg>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678176534016-8dc97258-5382-4aa6-885c-d889cb98fe32.png)

### `<path>` 路径
> `<path>` 标签用于绘制路径
>

```html
<head>
  <style>
    path {
      stroke: #9370DB;
      stroke-width: 10px;
      fill: none;
    }
  </style>
</head>

<body>
  <svg width="600" height="600">
    <!-- M 表示移动到（moveto） -->
    <!-- L 表示画直线到（lineto） -->
    <!-- Z 表示闭合路径 -->
    <path d="M 50,50 L 100,60 L 200,160 L 250,300 L 450,450 Z"></path>
  </svg>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678177601212-f859bd4d-24df-40e6-adf9-a74c690365ab.png)

### `<text>` 文本
> `<text>` 标签用于绘制文本
>

```html
<head>
  <style>
    text {
      fill: none;
      font-size: 50px;
      font-weight: 900;
      stroke: #FF0000;
      stroke-width: 2px;
      text-shadow: 0 0 10px #333;
    }
  </style>
</head>

<body>
  <svg width="400" height="200">
    <!-- x 表示文本区块基线（baseline）起点的 X 轴坐标 -->
    <!-- y 表示文本区块基线（baseline）起点的 Y 轴坐标 -->
    <text x="100" y="100">绘制文本</text>
  </svg>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678178413162-dd15b436-5319-41b8-9e37-1517ff6a8109.png)

### `<image>` 图像
> `<image>` 标签允许将外部图像文件嵌入到 SVG 文件中并显示
>

```html
<svg width="400" height="400">
  <image xlink:href="example.jpg" x="0" y="0" width="400" height="400" />
</svg>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678195304940-ea38db52-3b12-4e97-9591-fd42deaa73bc.png)

### `<use>` 使用已有元素
> `<use>` 标签用于使用已有元素
>

```html
<svg width="600" height="600" style="border: 1px solid #ccc;">
  <circle id="circle1" cx="200" cy="200" r="50" fill="pink" stroke="skyblue" stroke-width="10"></circle>
  <!-- x 表示相对于复制元素位置的 X 轴偏移量 -->
  <!-- y 表示相对于复制元素位置的 Y 轴偏移量 -->
  <use href="#circle1" x="200" y="200"></use>
</svg>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678179409283-931fd090-be20-49ba-a4f1-901e29bf1596.png)

### `<g>` 分组
> `<g>` 标签用于将多个形状组成一个组（group），方便复用
>

```html
<svg width="600" height="500">
  <g id="xiaoxiong">
    <circle cx="50" cy="50" r="25"></circle>
    <circle cx="250" cy="50" r="25"></circle>
    <circle cx="150" cy="150" r="100"></circle>
  </g>

  <use href="#xiaoxiong" x="260" y="0"></use>
</svg>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678180595718-b8b62271-3e0a-4d49-8ee2-81c70c6cdf9f.png)

### `<clipPath>` 剪切图形元素
> `<clipPath>` 标签用来裁剪其他元素，只显示指定区域内的部分内容
>

```html
<svg width="400" height="400">
  <clipPath id="clip">
    <circle cx="100" cy="100" r="50"></circle>
  </clipPath>

  <rect x="10" y="10" width="200" height="200" fill="skyblue" clip-path="url(#clip)" />
</svg>
```

### `<defs>` 定义元素
> `<defs>` 标签用于自定义形状，它内部的代码不会显示，仅供引用
>

```html
<svg width="600" height="500">
  <defs>
    <g id="xiaoxiong">
      <circle cx="50" cy="50" r="25"></circle>
      <circle cx="250" cy="50" r="25"></circle>
      <circle cx="150" cy="150" r="100"></circle>
    </g>
  </defs>

  <use href="#xiaoxiong" x="260" y="0"></use>
</svg>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678181013277-c1e361c6-9ad0-4a3f-a73c-7ba52ff185ef.png)

### `<pattern>` 创建复用图案
> `<pattern>` 元素用于创建可重复使用的图案，可以被用来平铺一个区域
>

```html
<svg width="300" height="300">
  <defs>
		<!--  patternUnits="userSpaceOnUse" 表示保持 <pattern> 元素的宽度和高度实际的像素值 -->
    <pattern id="checkerboard" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="10" height="10" fill="#ffffff"></rect>
      <rect x="10" y="10" width="10" height="10" fill="#ffffff"></rect>
      <rect x="0" y="10" width="10" height="10" fill="#000000"></rect>
      <rect x="10" y="0" width="10" height="10" fill="#000000"></rect>
    </pattern>
  </defs>
  <rect x="0" y="0" width="300" height="300" fill="url(#checkerboard)"></rect>
</svg>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1678193558583-7ed68907-c5c7-4fdc-95fe-bd116f0493be.png)

### `<animate>` 动画
> `<animate>` 元素用于在 SVG 图形中创建动画效果，通常作为其他 SVG 元素的子元素
>

```html
<svg width="200" height="200">
  <rect x="10" y="10" width="100" height="50" fill="blue">
		<!--  attributeName 指定要动画化的属性名 -->
		<!--  from 动画开始值 -->
		<!--  to 动画结束值 -->
		<!--  dur 表示动画持续时间 -->
		<!--  repeatCount 表示动画持续次数 -->
    <animate attributeName="width" from="100" to="200" dur="2s" repeatCount="3" />
  </rect>
</svg>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/gif/33977556/1678197661254-b98a3bc6-0e57-4389-839c-aa8d6c7945ab.gif)

### `<animateTransform>` 转换动画
> `<animateTransform>` 元素用于在其目标元素上设置转换属性的动画
>

```html
<svg width="120" height="120">
    <polygon points="60,30 90,90 30,90">
			<!--  type 定义转换类型 -->
			<!--  from, to 中第一个值表示旋转角度，后两个值表示旋转中心坐标 -->
      <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 60 70" to="360 60 70"
        dur="10s" repeatCount="indefinite" />
    </polygon>
  </svg>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/gif/33977556/1678201069788-5606ef05-0b2f-415b-b56c-7e50260de982.gif)

## 使用 JavaScript 操作 SVG
+ **注意：** SVG 元素的属性和方法与 HTML 元素有所不同，需要使用 `setAttribute` 和 `createElementNS` 方法来操作。
1. 获取 SVG 元素

```javascript
const svg = document.getElementById('svg');
```

2. 获取 SVG 元素中的图形元素

```javascript
const circle = svg.querySelector('circle');
const rect = svg.querySelector('rect');
```

3. 修改 SVG 元素属性

```javascript
circle.setAttribute('cx', '50');
rect.setAttribute('fill', 'red');
```

4. 创建 SVG 元素

```javascript
const newElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
newElement.setAttribute('x', '50');
newElement.setAttribute('y', '50');
newElement.setAttribute('width', '100');
newElement.setAttribute('height', '100');
svg.appendChild(newElement);
```

5. 添加 SVG 元素

```javascript
svg.appendChild(newElement);
```

6. 删除 SVG 元素

```javascript
svg.removeChild(circle);
```

