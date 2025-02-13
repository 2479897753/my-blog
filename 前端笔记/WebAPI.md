## DOM
+ **文档对象模型（Document Object Model，简称DOM）** 是 **W3C** 组织推荐的处理 **可扩展标记语言**（html或者xhtml）的标准编程接口
+ **DOM 树**
    - 文档：一个页面就是一个文档，在 DOM 中使用 **<font style="color:#DF2A3F;">document</font>**<font style="color:#DF2A3F;">表示</font>
    - 节点： 网页中的所有内容，在文档树中都是节点（标签，属性，文本等），使用 **<font style="color:#DF2A3F;">node</font>** 表示
    - 元素：网页中的标签，即元素节点，简称为元素，使用 **<font style="color:#DF2A3F;">element</font>** 表示

## 获取元素
### 获取 `body` 和 `html`
```javascript
var bodyObj = document.body
var htmlObj = document.documentElement
```

### 根据 ID 获取元素
+ 语法：`var element = document.getElementById(id);`
+ 参数：
    - `element` 是一个 Element 对象。如果当前文档中拥有特定 ID 的元素不存在则返回 `null`
    - `id` 是大小写敏感的字符串，代表了所要查找的元素的唯一 ID

```javascript
// 获取文档中 id 名为 box 的元素对象
var element = document.getElementById("box");
```

### 根据 标签名 获取元素
+ 语法：`var elements = document.getElementsByTagName(name);`
+ 参数：
    - `elements`是一个由发现的元素出现在树中的顺序构成的动态的 HTML <font style="color:#DF2A3F;">集合</font>`HTMLCollection`
    - `name`是一个代表元素的名称的字符串。特殊字符 `*` 代表了所有元素

```javascript
// 获取文档中所有的 div 元素对象集合
var element = document.getElementsByTagName("div");
```

### H5 新增的获取元素方式
#### `element = document.querySelector(selectors);`
+ 参数：
    - `element`表示文档中与指定的一组 CSS 选择器匹配的第一个元素，一个 Element 对象。如果没有匹配到，则返回 `null`
    - `selectors`包含一个或多个要匹配的选择器的 DOM 字符串

```javascript
// 这个例子中，会返回当前文档中第一个类名为 "myclass" 的元素：
var el = document.querySelector(".myclass");
```

#### `elementList = parentNode.querySelectorAll(selectors);`
+ 参数：
    - `elementList`一个静态 `NodeList`，包含一个与至少一个指定选择器匹配的元素的`Element`对象，或者在没有匹配的情况下为空`NodeList`
    - `selectors`一个`DOMString`包含一个或多个匹配的选择器

```javascript
// 要获取文档中所有 <p> 元素的 NodeList
var matches = document.querySelectorAll("p");

// 此示例返回文档中所有 <div> 元素的列表，其中 class 包含 "note" 或 "alert"
var matches = document.querySelectorAll("div.note, div.alert");
```

## 事件
### 事件三要素
+ **事件源：** 触发事件的元素
+ **事件类型：** 例如 `click` 点击事件
+ **事件处理程序：** 事件触发后要执行的代码(函数形式)，事件处理函数

```javascript
var btn = document.getElementById('btn');
btn.onclick = function() {
  alert('点我干嘛');
}
```

### 注册事件（2种方式）
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675222592898-f9d2956f-bcce-4948-959e-d2df91e8e2b9.png)

### 事件监听（注册事件）
+ 语法：`eventTarget.addEventListener(type, listener[, useCapture])`
+ 参数：
    - `type`事件类型字符串，比如 `click`、`mouseover`
    - `listener`事件处理函数，事件发生时，会调用该监听函数
    - `useCapture`可选参数，是一个布尔值，默认是 `false`。`false`表示事件处在 **<font style="color:#DF2A3F;">冒泡</font>** 阶段，`true`表示事件处在 **<font style="color:#DF2A3F;">捕获</font>** 阶段

```html
<button>传统注册事件</button>
<button>方法监听注册事件</button>
<button>ie9 attachEvent</button>
<script>
  var btns = document.querySelectorAll('button');
  // 1. 传统方式注册事件
  btns[0].onclick = function() {
    alert('hi');
  }
  btns[0].onclick = function() {
    alert('hao a u');
  }
  // 2. 事件侦听注册事件 addEventListener 
  // 同一个元素，同一个事件可以添加多个侦听器（事件处理程序）
  btns[1].addEventListener('click', function() {
    alert(22);
  })
  btns[1].addEventListener('click', function() {
    alert(33);
  })
</script>
```

### 删除事件（解绑事件）
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675224992817-b8cc37ff-723c-4dd8-beeb-20e58aef64d2.png)

```html
<div>1</div>
<div>2</div>
<div>3</div>
<script>
  var divs = document.querySelectorAll('div');
  divs[0].onclick = function() {
    alert(11);
    // 1. 传统方式删除事件
    // 将绑定的事件处理程序 置空 null
    divs[0].onclick = null;
  }
  // 2. removeEventListener 删除事件
  // 移除的处理函数 是一个 具名函数
  divs[1].addEventListener('click', fn) // 里面的 fn 不需要调用加小括号
  function fn() {
    alert(22);
    divs[1].removeEventListener('click', fn);
  }
</script>
```

### DOM 事件流
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675225184112-5653b521-6856-49b8-aa3e-de6c3c4ceb85.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675225229822-996c4198-8c02-42a6-821c-41f37a550121.png)

### 事件对象
> 事件触发发生时就会产生事件对象 `event`，并且系统会以实参的形式传给事件处理函数
>

**<font style="background-color:rgb(199, 172, 0);">事件对象的属性和方法</font>**

+ **重点掌握：**
    - 触发事件对象：`e.target`
    - 阻止事件默认行为：`e.preventDefault()`
    - 阻止冒泡：`e.stopPropagation()`

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675225376122-c830f9a2-5749-4339-a8dc-1949306281de.png)

### 事件委托
+ 原理：
    - 不是给每个子节点单独设置监听器，而是事件监听设置在其父节点上, 然后利用 **<font style="color:#DF2A3F;">冒泡原理</font>** 影响每个子节点
    - 给父元素注册事件，利用事件冒泡，当子元素的事件触发，会冒泡到父元素，然后去控制相应的子元素

```html
<ul>
  <li>知否知否，点我应有弹框在手！</li>
  <li>知否知否，点我应有弹框在手！</li>
  <li>知否知否，点我应有弹框在手！</li>
  <li>知否知否，点我应有弹框在手！</li>
  <li>知否知否，点我应有弹框在手！</li>
</ul>
<script>
  // 事件委托的核心原理：给父节点添加侦听器，利用事件冒泡影响每一个子节点
  var ul = document.querySelector('ul');
  ul.addEventListener('click', function(e) {
    // e.target 这个可以得到我们点击的对象
    e.target.style.backgroundColor = 'pink';
  })
</script>
```

### 常用鼠标事件
**<font style="background-color:rgb(190, 164, 0);">鼠标移入和离开事件</font>**

+ **触发冒泡**
    - `mouseover`鼠标移入事件、`mouseout`鼠标离开事件
+ **不会触发冒泡**
    - `mouseenter`鼠标移入事件、`mouseleave`鼠标离开事件

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675222257678-7a99351c-4c0e-440f-ab10-3e177e20b1c5.png)

### 鼠标事件对象
+ **重点掌握：**
    - `e.pageX` 获取鼠标相对于文档页面的 X 坐标
    - `e.pageY` 获取鼠标相对于文档页面的 Y 坐标

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675225887230-2766fd61-a710-4367-9f5e-ad58ca8134fd.png)

### 常用键盘事件
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675226028872-0fb1c7f8-f792-4336-bd25-0255feefe305.png)

### 键盘事件对象
+ `e.key` 以字符串的形式返回按下的键名，可以区分大小写

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675226178323-ca4bc8b8-ff25-4849-a815-cf7e37a39cbb.png)

### 常见触屏事件
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675238196618-e794b561-4de4-454a-8cc1-95bfab795026.png)

### 触屏事件对象
+ **重点掌握：**`targetTouches`

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675238366969-c3b6c1b6-19ae-4e24-a98a-d89110882e13.png)

```html
<div></div>
<script>
  // （1） 触摸元素 touchstart：  获取手指初始坐标，同时获得盒子原来的位置
  // （2） 移动手指 touchmove：  计算手指的滑动距离，并且移动盒子
  // （3） 离开手指 touchend:
  var div = document.querySelector('div');
  var startX = 0; //获取手指初始坐标
  var startY = 0;
  var x = 0; //获得盒子原来的位置
  var y = 0;

  div.addEventListener('touchstart', function(e) {
    //  获取手指初始坐标
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;
    x = this.offsetLeft;
    y = this.offsetTop;
  });

  div.addEventListener('touchmove', function(e) {
    e.preventDefault(); // 阻止屏幕滚动的默认行为
    //  计算手指的移动距离： 手指移动之后的坐标减去手指初始的坐标
    var moveX = e.targetTouches[0].pageX - startX;
    var moveY = e.targetTouches[0].pageY - startY;
    // 移动我们的盒子 盒子原来的位置 + 手指移动的距离
    this.style.left = x + moveX + 'px';
    this.style.top = y + moveY + 'px';
  });
</script>
```

## 操作元素内容
### `HTMLElement.innerText`
```javascript
var p = document.querySelector('p');
p.innerText = 'hello world!'
```

### `element.innerHTML`
```javascript
var p = document.querySelector('p');
p.innerText = '<strong>hello world!</strong>'
```

### `innerText` 和 `innerHTML` 的区别
+ **获取内容时：**`innerText` 会去除空格和换行，而 `innerHTML` 会保留空格和换行
+ **设置内容时：**`innerText` 不会识别 `html` 标签，而 `innerHTML` 会识别 `html` 标签

### `innerHTML` 和 `outerHTML` 的区别
+ `innerHTML` 设置或获取 HTML 语法表示的 **<font style="color:#DF2A3F;">元素后代</font>**
+ `outerHTML` 获取描述 **<font style="color:#DF2A3F;">元素（包括其后代）</font>** 的序列化 HTML 片段。它也可以设置为从给定字符串解析的节点 **<font style="color:#DF2A3F;">替换元素</font>**

```javascript
// <div class="box">
//   <span style="color: red;">text1</span>test2
// </div>

const box = document.querySelector('.box')

console.log(box.innerHTML)
//
//     <span style="color: red;">text1</span>test2
//  

console.log(box.outerHTML)
// <div class="box">
//     <span style="color: red;">text1</span>test2
//   </div>
```

## 操作样式
### 通过操作 `style`
+ **注意：**
    - JS 里面的样式采取 **<font style="color:#DF2A3F;">驼峰命名法</font>**，比如 `fontSize`、`backgroundColor`等
    - JS 修改 `style` 样式，产生的是 **<font style="color:#DF2A3F;">行内样式</font>**，**<font style="color:#DF2A3F;">CSS权重较高</font>**

```html
<body>
  <div></div>
  <script>
    // 1. 获取元素
    var div = document.querySelector('div');
    // 2. 注册事件 处理程序
    div.onclick = function() {
      // div.style 里面的属性 采取驼峰命名法 
      this.style.backgroundColor = 'purple';
      this.style.width = '250px';
    }
  </script>
</body>
```

### 通过操作 `className`
+ **注意：**
    - 如果样式修改较多，可以采取 **<font style="color:#DF2A3F;">操作类名</font>** 方式更改元素样式。
    - `class` 因为是个关键字，因此使用 `className` 来操作元素类名属性
    - `className` 会直接更改元素的类名，会覆盖原先的类名。

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: pink;
  }
  .change {
    background-color: purple;
    color: #fff;
    font-size: 25px;
    margin-top: 100px;
  }
</style>
<body>
  <div class="first">文本</div>
  <script>
    // 1. 使用 element.style 获得修改元素样式  如果样式比较少 或者 功能简单的情况下使用
    var test = document.querySelector('div');
    test.onclick = function() {
      // this.style.backgroundColor = 'purple';
      // this.style.color = '#fff';
      // this.style.fontSize = '25px';
      // this.style.marginTop = '100px';

      // 2. 我们可以通过 修改元素的className更改元素的样式 适合于样式较多或者功能复杂的情况
      // 3. 如果想要保留原先的类名，我们可以这么做 多类名选择器
      // this.className = 'change';
      this.className = 'first change';
    }
  </script>
</body>
```

### `classList` 属性（H5新增）
#### 添加类 `element.classList.add('类名')`
```javascript
var div = document.querySelector('div');
// 向 div 元素上追加一个名为 box 的类名
div.classList.add('box')
```

#### 移除类 `element.classList.remove('类名')`
```javascript
var div = document.querySelector('div');
// 删除 div 元素的class为 box 的类名
div.classList.add('box')
```

#### 切换类 `element.classList.toggle('类名')`
```javascript
div.addEventListener('click', function () {
  // 有就删除，没有就添加
    div.classList.toggle('box')
})
```

## 属性操作
### 获取属性值
+ `element.属性` 获取内置属性值
+ `element.getAttribute('属性')` 主要获得自定义属性（标准）

```javascript
var div = document.querySelector('div');
console.log(div.id);
console.log(div.getAttribute('data-index'));
```

### 设置属性值
+ `element.属性 = '值'` 设置内置属性值
+ `element.setAttribute('属性','值')` 主要设置自定义属性（标准）

```javascript
var div = document.querySelector('div');
div.className = 'box';
div.setAttribute('data-index', 2); // 标准 自定义属性一般都写前缀 data
```

**<font style="color:rgb(51, 51, 51);background-color:#FBDE28;">H5 获取自定义属性</font>**

+ `element.dataset.index` 或 `element.dataset['index']` (有兼容性问题)

```javascript
var div = document.querySelector('div');
console.log(div.getAttribute('data-index'));
console.log(div.dataset.index); // 如果不考虑兼容性问题，可以使用
console.log(div.dataset['index']);
```

### 移除属性
+ `element.removeAttribute('属性')`

```javascript
var div = document.querySelector('div');
div.removeAttribute('class');
div.removeAttribute('data-index')
```

## 节点操作
> 网页中的所有内容都是节点（标签、属性、文本、注释等）
>

+ 一般地，节点至少拥有 `nodeType`（节点类型）、`nodeName`（节点名称）和 `nodeValue`（节点值）这三个基本属性
    - 元素节点：nodeType -- 1
    - 属性节点：nodeType -- 2
    - 文本节点：nodeType -- 3（文本节点包含文字、空格、换行等）

### 父级节点 `node.parentNode`
+ `parentNode` 属性返回某个节点的父节点，注意是 **<font style="color:#DF2A3F;">最近的一个父节点</font>**
+ 如果指定节点没有父节点则返回 `null`

```html
<div class="demo">
  <div class="box">
    <span class="erweima">×</span>
  </div>
</div>
<script>
  var erweima = document.querySelector('.erweima');
  console.log(erweima.parentNode); // 得到的是类名为 box 的这个元素节点
</script>
```

### 子节点 `parentNode.children`
+ `parentNode.childNodes`（标准）**注意：**返回值包含所有子节点，包括元素节点，文本节点等。（**<font style="color:#DF2A3F;">不提倡使用</font>**）
+ `parentNode.children`（非标准）只读属性，返回 **<font style="color:#DF2A3F;">所有子元素节点</font>**

```html
<ul>
  <li>我是li</li>
  <li>我是li</li>
  <li>我是li</li>
  <li>我是li</li>
</ul>
<script>
  var ul = document.querySelector('ul');
  console.log(ul.children);
</script>
```

#### 获取第一个子节点 `parentNode.children[0]`
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675230343484-cfc86e75-e178-4c22-8c17-cc83e51f25b1.png)

+ 一般使用 `parentNode.children[0]` 获取第一个子节点

```html
<ol>
  <li>我是li1</li>
  <li>我是li2</li>
  <li>我是li3</li>
  <li>我是li4</li>
  <li>我是li5</li>
</ol>
<script>
  var ol = document.querySelector('ol');
  console.log(ol.children[0]);
</script>
```

#### 获取最后一个子节点 `parentNode.children[parentNode.children.length - 1]`
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675230277172-44d9375f-ef2f-4f7b-87f1-e9737ddd5c42.png)

+ 一般使用 `parentNode.children[parentNode.children.length - 1]` 获取最后一个子节点

```html
<ol>
  <li>我是li1</li>
  <li>我是li2</li>
  <li>我是li3</li>
  <li>我是li4</li>
  <li>我是li5</li>
</ol>
<script>
  var ol = document.querySelector('ol');
  console.log(ol.children[0]);
  console.log(ol.children[ol.children.length - 1]);
</script>
```

### 兄弟节点
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675230623392-9911ca39-79cc-470a-ab1b-f2ccf5bde0dc.png)

```html
<div>我是div</div>
<span>我是span</span>
<script>
  var div = document.querySelector('div');
  // 1.nextSibling 下一个兄弟节点 包含元素节点或者 文本节点等等
  console.log(div.nextSibling);
  console.log(div.previousSibling);
  // 2.nextElementSibling 得到下一个兄弟元素节点
  console.log(div.nextElementSibling);
  console.log(div.previousElementSibling);
</script>
```

### 创建节点 `document.createElement('tagName')`
```javascript
var li = document.createElement('li');
```

### 添加节点
#### `node.appendChild(child)`
> 将一个节点添加到指定节点的子节点列表 **<font style="color:#DF2A3F;">末尾</font>**。类似于 css 里面的 after 伪元素。
>

```html
<ul>
  <li>123</li>
</ul>
<script>
  // 1.创建元素节点
  var li = document.createElement('li');
  // 2.添加节点 node.appendChild(child)  node 父级  child 是子级 后面追加元素
  var ul = document.querySelector('ul');
  ul.appendChild(li);
</script>
```

#### `node.insertBefore(child, 指定元素)`
> 将一个节点添加到指定节点的指定子节点 **<font style="color:#DF2A3F;">前面</font>**。类似于 css 里面的 before 伪元素。
>

```html
<ul>
  <li>123</li>
</ul>
<script>
  var ul = document.querySelector('ul');
  // 添加节点 node.insertBefore(child, 指定元素);
  var li = document.createElement('li');
  ul.insertBefore(li, ul.children[0]);
</script>
```

#### 以字符串的形式为元素添加节点（新方法）
> 将指定的文本解析为 `Element` 元素，并将结果节点插入到 DOM 树中的指定位置
>

+ 语法：`element.insertAdjacentHTML(position, text);`
+ 参数：
    - `position`一个`DOMString`，表示插入内容相对于元素的位置，并且必须是以下字符串之一
        * `beforebegin` 元素自身的前面
        * `afterbegin` 插入元素内部的第一个子节点之前
        * `beforeend` 插入元素内部的最后一个子节点之后
        * `afterend` 元素自身的后面
    - `<font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">text</font>` 是要被解析为 HTML 或 XML 元素，并插入到 DOM 树中的`DOMString`

**<font style="color:rgb(51, 51, 51);background-color:#FBDE28;">位置名称的可视化</font>**

```html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

### 删除节点 Element.remove()
> `Element.remove()` 方法，把对象从它所属的 DOM 树中删除。
>

### 删除子节点 `node.removeChild(child)`
> `node.removeChild()` 方法从 `node` 节点中删除一个子节点，返回删除的节点
>

### 克隆节点
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675232006063-f7d33806-d1f0-486e-946c-b7b248f964d5.png)

```html
<ul>
  <li>1111</li>
  <li>2</li>
  <li>3</li>
</ul>
<script>
  var ul = document.querySelector('ul');
  var lili = ul.children[0].cloneNode(true);
  // 通过克隆的节点不会自动追加到页面，需要手动追加
  ul.appendChild(lili);
</script>
```

## 创建元素的三种方式
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675232204511-04e64707-ea12-4d3d-afda-05d5b25cbe22.png)

## `innerHTML` 和 `createElement` 效率对比
`innerHTML`**字符串拼接方式（效率低）**

```html
<script>
  function fn() {
    var d1 = +new Date();
    var str = '';
    for (var i = 0; i < 1000; i++) {
      document.body.innerHTML += '<div style="width:100px; height:2px; border:1px solid blue;"></div>';
    }
    var d2 = +new Date();
    console.log(d2 - d1);
  }
  fn();
</script>
```

`createElement`**方式（效率一般）**

```html
<script>
  function fn() {
    var d1 = +new Date();

    for (var i = 0; i < 1000; i++) {
      var div = document.createElement('div');
      div.style.width = '100px';
      div.style.height = '2px';
      div.style.border = '1px solid red';
      document.body.appendChild(div);
    }
    var d2 = +new Date();
    console.log(d2 - d1);
  }
  fn();
</script>
```

`innerHTML`**数组方式（效率高）**

```html
<script>
  function fn() {
    var d1 = +new Date();
    var array = [];
    for (var i = 0; i < 1000; i++) {
      array.push('<div style="width:100px; height:2px; border:1px solid blue;"></div>');
    }
    document.body.innerHTML = array.join('');
    var d2 = +new Date();
    console.log(d2 - d1);
  }
  fn();
</script>
```

## BOM
> BOM（Browser Object Model）**即浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 ****<font style="color:#DF2A3F;">window</font>****。**
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675232703847-b9d7a46e-3b9d-475f-8754-c7de93c8599d.png)

**<font style="color:rgb(51, 51, 51);background-color:#FBDE28;">BOM 的构成</font>**

**注意：**`window` 下有一个特殊属性 `window.name = ''`

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675232775100-1b55ce7b-bd50-4d8d-86d7-5fd9971a18df.png)

## window 对象的常见事件
### 页面加载事件
#### `load` 事件
```javascript
window.addEventListener('load', function() {})
```

#### `DOMContentLoaded` 事件
> `DOMContentLoaded` 事件触发时，**<font style="color:#DF2A3F;">仅当DOM加载完成，不包括样式表，图片，flash等等</font>**
>

```javascript
document.addEventListener('DOMContentLoaded', function() {})
```

### 调整浏览器窗口大小事件
#### `resize` 事件
```javascript
window.addEventListener('resize', function() {})
```

## 定时器
### `setTimeout()`
```javascript
window.setTimeout(调用函数, [延迟的毫秒数])
```

**关闭定时器**

> 开启定时器后会返回一个定时器的 ID，可以根据这个 ID，来关闭定时器
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675233405013-b2a2e5d2-661c-4f7a-bc04-56499ad667dc.png)

### `setInterval()`
```javascript
window.setInterval(调用函数, [间隔的毫秒数])
```

**关闭定时器**

> 开启定时器后会返回一个定时器的 ID，可以根据这个 ID，来关闭定时器
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675233634331-bb81463c-93d4-423c-afbf-cf4b0aaef718.png)

## location 对象
> `window` 对象给我们提供了一个 **location 属性**用于 **<font style="color:#DF2A3F;">获取或设置窗体的 URL</font>**，并且可以用于**解析 URL**。
>

### URL
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675236212172-08a6a033-5c23-4551-9436-0ac3c0f30e8c.png)

### location 对象的属性
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675236325850-79620390-125e-45c3-8941-e8c0834e3121.png)

### location 对象的常见方法
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675236380843-d6bd85ee-2328-4167-862a-404c018d01d0.png)

```html
<button>点击</button>
<script>
  var btn = document.querySelector('button');
  btn.addEventListener('click', function() {
    // 记录浏览历史，所以可以实现后退功能
    // location.assign('http://www.itcast.cn');
    // 不记录浏览历史，所以不可以实现后退功能
    // location.replace('http://www.itcast.cn');
    location.reload(true);
  })
</script>
```

## history 对象
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675236502719-e97f5262-dfec-4e8f-a8f7-0a201ac36c5b.png)

```html
// index.html
<body>
  <a href="list.html">点击我去往列表页</a>
  <button>前进</button>
  <script>
    var btn = document.querySelector('button');
    btn.addEventListener('click', function() {
      // history.forward();
      history.go(1);
    })
  </script>
</body>
```

```html
// list.html
<body>
  <a href="index.html">点击我去往首页</a>
  <button>后退</button>
  <script>
    var btn = document.querySelector('button');
    btn.addEventListener('click', function() {
      // history.back();
      history.go(-1);
    })
  </script>
</body>
```

## navigator 对象
> **navigator 对象包含有关** **<font style="color:#DF2A3F;">浏览器的信息</font>**，它有很多属性，我们最常用的是 **<font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">userAgent</font>**，该属性可以返回由客户机发送服务器的 `user-agent` 头部的值。
>

```javascript
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  window.location.href = "";     //手机
} else {
  window.location.href = "";     //电脑
}
```

## 元素偏移量 `offset`
+ **注意：**
    - 返回的数值都 **<font style="color:#DF2A3F;">不带单位</font>**
    - `**offsetWidth**` 是只读属性，只能获取不能赋值

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675237916677-ffcd13ce-315d-46b1-b559-d06e37b9d152.png)

## 元素可视区 `client`
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675237994752-3009f430-d76d-4642-86cd-12f01403084c.png)

## 元素滚动 `scroll`
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675238037728-27fa3a8d-c6f0-4560-9141-2915aa9b6e04.png)

## getBoundingClientRect()
> `getBoundingClientRect()` 方法返回元素的大小及其相对于视口的位置。
>

+ 语法：`element.getBoundingClientRect()`
+ 返回值：返回值是一个 DOMRect 对象，包含了元素的位置和大小信息。
+ DOMRect 对象包括以下属性：
    - `top`：元素上边缘距离视口顶部的距离
    - `right`：元素右边缘距离视口左边的距离
    - `bottom`：元素下边缘距离视口顶部的距离
    - `left`：元素左边缘距离视口左边的距离
    - `width`：元素的宽度
    - `height`：元素的高度

```javascript
var element = document.getElementById("myElement");
var rect = element.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left, rect.width, rect.height);
```

## 本地存储
> 只能存储字符串，如果存储对象形式的数据，则需要转换为 JSON 格式字符串
>

**<font style="background-color:rgb(186, 162, 0);">什么是 JSON</font>**

> JSON（JavaScript Object Notation，JS 对象标记）是一种轻量级的数据交换格式，目前使用特别广泛。
>

```javascript
// 将 JS 对象转换为 JSON 字符串
var json = JSON.stringify({a: 'Hello', b: 'World'}); // 结果是 '{"a": "Hello", "b": "World"}'

// 将 JSON 字符串转换为 JS 对象
var obj = JSON.parse('{"a": "Hello", "b": "World"}'); // 结果是 {a: 'Hello', b: 'World'}
```

### 会话存储 `window.sessionStorage`
1. 生命周期为关闭浏览器窗口
2. 在同一个窗口(页面)下数据可以共享
3. 以键值对的形式存储使用

```javascript
// 存储数据
sessionStorage.setItem(key, value)

// 获取数据
sessionStorage.getItem(key)

// 删除数据
sessionStorage.removeItem(key)

// 清空数据
sessionStorage.clear()
```

### 本地存储 `window.localStorage`
1. 生命周期永久生效，除非手动删除，否则关闭页面也会存在
2. 可以多窗口(页面)共享（同一浏览器可以共享）
3. 以键值对的形式存储使用

```javascript
// 存储数据
localStorage.setItem(key, value)

// 获取数据
localStorage.getItem(key)

// 删除数据
localStorage.removeItem(key)

// 清空数据
localStorage.clear()
```

## 页面被卷去的头部兼容性解决方案
1. 声明了 DTD（文档类定义），使用 `document.documentElement.scrollTop`
2. 未声明 DTD（文档类定义），使用  `document.body.scrollTop`
3. 新方法 `window.pageYOffset` 和 `window.pageXOffset`，IE9 开始支持

## 禁止选中文字
### JS - 禁止选中文字
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>禁止选中文字</title>
  </head>
  <body>
    我是一段不想被选中的文字
    <script>
      // 1.禁止出现右键菜单
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      });

      // 2.禁止选中文字
      document.addEventListener('selectstart', function(e) {
        e.preventDefault();
      });
    </script>
  </body>
</html>
```

### CSS - 禁止选中文字
+ 属性：`user-select: auto|none|text|all;`
    - `auto` 默认。如果浏览器允许，则可以选择文本
    - `none` 防止文本选取
    - `text` 文本可被用户选取
    - `all` 单击选取文本，而不是双击

## 给伪元素添加点击事件
> 无法直接给伪元素绑定点击事件，只能给父元素添加点击事件，然后作用到伪元素上
>

+ 原理：禁用父元素的点击事件，开启伪元素的点击事件

```css
父元素添加：pointer-events: none;
伪元素添加：pointer-events: auto;
```

