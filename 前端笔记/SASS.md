## 变量
```less
$primary-color: #ff0000;
$primary-border: 1px solid $primary-color;

h1 {
  color: $primary-color;
}

.btn {
  border: $primary-border;
}
```

## 嵌套属性
```less
body {
  font: {
    family: Helvetica, Arial, sans-serif;
  	size: 15px;
  	weight: normal;
  }
}

.nav {
  border: 1px solid #000 {
    left: 0;
  	right: 0;
  }
}

/* 编译后 */
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
  font-weight: normal;
}

.nav {
  border: 1px solid #000;
  border-left: 0;
  border-right: 0;
}
```

## 混合 - @mixin
```less
@mixin center-contents {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin text-styles($color, $size) {
  color: $color;
  font-size: $size;
}

.btn {
  @include center-contents;
  // 其他样式
}

.title {
  @include text-styles(#333, 18px);
}
```

## 继承 - @extend
### 基本继承
```less
.parent {
  font-size: 18px;
  color: #333;
}

.child {
  @extend .parent;
  font-weight: bold;
}

/* 编译后 */
.parent, .child {
  font-size: 18px;
  color: #333;
}

.child {
  font-weight: bold;
}
```

### 多重继承
```less
.text {
  font-size: 16px;
  color: #555;
}

.emphasis {
  @extend .text;
  font-weight: bold;
}

.title {
  @extend .emphasis;
  font-size: 24px;
}

/* 编译后 */
.text, .emphasis, .title {
  font-size: 16px;
  color: #555;
}

.emphasis, .title {
  font-weight: bold;
}

.title {
  font-size: 24px;
}
```

### 继承占位符选择器
> `%button`被定义为占位符选择器，它只在被继承时才会生成相应的CSS规则。
>

```less
%button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
}

.primary {
  @extend %button;
  background-color: #f00;
}

.secondary {
  @extend %button;
  border: 1px solid #333;
}

/* 编译后 */
.primary, .secondary {
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
}

.primary {
  background-color: #f00;
}

.secondary {
  border: 1px solid #333;
}
```

## 颜色函数
### lighten() 和 darken()
+ lighten() 增加颜色亮度
+ darken() 减少颜色亮度

```less
$my-color: #ff0000;
$lightened-color: lighten($my-color, 10%);
$darkened-color: darken($my-color, 20%);

.my-element {
  color: $lightened-color;
  background-color: $darkened-color;
}
```

## 插值
> 插值(interpolation)允许您将变量或表达式嵌入到选择器、属性或值中。您可以使用`#{}`语法来执行插值。插值将在编译时进行求值并替换为相应的变量或表达式的值。
>

### 在选择器中使用
```less
$color: red;

.#{ $color }-text {
  font-size: 14px;
}

/* 编译后 */
.red-text {
  font-size: 14px;
}
```

### 在属性中使用
```less
$border-property: border;
$direction: bottom;

.box {
  #{ $border-property }-#{ $direction }: 1px solid black;
}

/* 编译后 */
.box {
  border-bottom: 1px solid black;
}
```

### 在值中使用
```less
$width: 200px;

.box {
  width: #{ $width + 20 }px;
}

/* 编译后 */
.box {
  width: 220px;
}
```

## 控制指令
### @if
**基本语法**

+ `<condition>` 是一个要测试的条件表达式

```less
@if <condition> {
  // 样式规则
} @else if <condition> {
  // 样式规则
} @else {
  // 样式规则
}
```

**示例**

```less
$color: red;
$width: 200px;

.box {
  @if $color == red {
    background-color: $color;
  } @else if $width > 300px {
    background-color: blue;
  } @else {
    background-color: green;
  }
}

/* 编译后 */
.box {
  background-color: red;
}
```

### @for
**基本语法**

+ `$var` 是循环变量，您可以在循环中使用它。
+ `<start>` 是循环的起始值。
+ `<end>` 是循环的结束值。

```less
@for $var from <start> through <end> {
  // 循环代码
}
```

**示例**

```less
/* 基本语法 */

- $var 是循环变量，您可以在循环中使用它。
- <start> 是循环的起始值。
- <end> 是循环的结束值。

@for $i from 1 through 3 {
  .item-#{$i} {
    width: 100px * $i;
  }
}

/* 编译后 */
.item-1 {
  width: 100px;
}

.item-2 {
  width: 200px;
}

.item-3 {
  width: 300px;
}
```

### @while
**基本语法**

+ `<condition>` 是一个要测试的条件表达式

```less
@while <condition> {
  // 循环代码
}
```

**示例**

```less
$counter: 1;

@while $counter <= 5 {
  .item-#{$counter} {
    width: 50px * $counter;
  }
  
  $counter: $counter + 1;
}

/* 编译后 */
.item-1 {
  width: 50px;
}

.item-2 {
  width: 100px;
}

.item-3 {
  width: 150px;
}

.item-4 {
  width: 200px;
}

.item-5 {
  width: 250px;
}
```

### @each
**基本语法**

+ `$var` 是要遍历的变量，在每次迭代中，它将设置为列表中的当前元素。
+ `<list>` 是要遍历的列表、映射或包含所有元素的列表。

```less
@each $var in <list> {
  // 操作
}
```

#### 遍历列表
```less
$colors: red, green, blue;

@each $color in $colors {
  .color-#{$color} {
    background-color: $color;
  }
}

/* 编译后 */
.color-red {
  background-color: red;
}

.color-green {
  background-color: green;
}

.color-blue {
  background-color: blue;
}
```

#### 遍历映射
```less
$sizes: (
  small: 10px,
  medium: 20px,
  large: 30px
);

@each $size, $value in $sizes {
  .size-#{$size} {
    font-size: $value;
  }
}

/* 编译后 */
.size-small {
  font-size: 10px;
}

.size-medium {
  font-size: 20px;
}

.size-large {
  font-size: 30px;
}
```

### @function
**基本语法**

+ `<function-name>` 是函数的名称
+ `<argument1>, <argument2>, ...` 是函数的参数列表
+ `<value>` 是要返回的值

```less
@function <function-name>(<argument1>, <argument2>, ...) {
  // 函数体
  @return <value>;
}
```

**示例**

```less
@function calculate-area($width, $height) {
  @return $width * $height;
}

.container {
  width: 100px;
  height: 200px;
  area: calculate-area(100px, 200px);
}

/* 编译后 */
.container {
  width: 100px;
  height: 200px;
  area: 20000px;
}
```

## Sass加css变量 - 前端换肤
1. 定义主题色

```less
/* theme.scss */
$themes: (
  blue: (
    theme-color: #409eff,
    button-primary: #409eff
  ),
  green: (
    theme-color: #67c23a,
    button-primary: #67c23a
  )
);
```

2. 定义生成css属性的方法

```less
/* mixin.scss */
@mixin get-theme($color) {
  @each $item, $value in $themes {
    [data-theme='#{$item}'] & {
      background-color: map-get($value, $color);
    }
  }
}
```

3. 使用定义的主题色

```less
@import './theme.scss';
@import './mixin.scss';

.bg {
  @include get-theme('theme-color');
}

.btn {
  @include get-theme('button-primary');
}
```

4. 点击按钮切换主题

```javascript
onswitch() {
  if (document.documentElement.getAttribute('data-theme') === 'blue') {
    document.documentElement.setAttribute('data-theme', 'green')
  } else {
    document.documentElement.setAttribute('data-theme', 'blue')
  }
}
```

