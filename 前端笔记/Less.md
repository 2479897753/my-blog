## 变量
### 定义变量
```less
@primary-color: #007bff;
```

### 使用变量
```less
.button {
  color: @primary-color;
}
```

### 变量计算
```less
@base-font-size: 16px;
.header {
  font-size: (@base-font-size * 1.2);
}

/* 编译后 */
.header {
  font-size: 19.2px;
}
```

### 变量差值
```less
@sprite-url: "../images/sprites.png";
.icon {
  background-image: url("@{sprite-url}");
}

/* 编译后 */
.icon {
  background-image: url("../images/sprites.png");
}
```

### 变量作用域
```less
.container {
  @inner-color: #ff0000;
  .inner {
    background-color: @inner-color;
  }
}

/* 编译后 */
.container .inner {
  background-color: #ff0000;
}
```

### 变量导入
```less
@import "variables.less";
```

## 混合 - mixins
### 基本混合
```less
.border-radius(@radius) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}
.my-element {
  .border-radius(5px);
}

/* 编译后 */
.my-element {
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
}
```

### 带有默认值的混合
```less
.box-shadow(@x: 0, @y: 0, @blur: 5px, @color: #000) {
  box-shadow: @x @y @blur @color;
}
.my-element {
  .box-shadow(2px, 2px);
}

/* 编译后 */
.my-element {
  box-shadow: 2px 2px 5px #000;
}
```

### 混合的导入
```less
#mixin {
  .border {
    border: 1px solid black;
  }
  .background {
    background-color: #f1f1f1;
  }
}
.my-element {
  #mixin > .border;
}

/* 编译后 */
.my-element {
  border: 1px solid black;
}
```

## 继承 - extend
```less
.panel {
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 10px;
}

.panel-success {
  &:extend(.panel);  // 使用extend关键字继承.panel的属性
  border-color: #00ff00;
}

.panel-warning {
  &:extend(.panel);  // 使用extend关键字继承.panel的属性
  border-color: #ff0000;
}

/* 编译后 */
.panel {
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 10px;
}

.panel-success,
.panel-warning {
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 10px;
}

.panel-success {
  border-color: #00ff00;
}

.panel-warning {
  border-color: #ff0000;
}
```

## 条件表达式
### `@when`语句
```less
@color: blue;

.my-class {
  @when (@color = blue) {
    color: @color;
  }
}

/* 编译后 */
.my-class {
  color: blue;
}
```

### `@if`语句
```less
@width: 100px;

.my-class {
  @if (@width > 200px) {
    width: @width;
  } @else {
    width: 200px;
  }
}

/* 编译后 */
.my-class {
  width: 200px;
}
```

### `@for`语句
```less
@max-columns: 4;

@media (min-width: 500px) {
  .row {
    @for @i from 1 through @max-columns {
      .col-@{i} {
        width: calc(100% / @max-columns * @i);
      }
    }
  }
}

/* 编译后 */
@media (min-width: 500px) {
  .row .col-1 {
    width: calc(100% / 4 * 1);
  }
  .row .col-2 {
    width: calc(100% / 4 * 2);
  }
  .row .col-3 {
    width: calc(100% / 4 * 3);
  }
  .row .col-4 {
    width: calc(100% / 4 * 4);
  }
}
```

