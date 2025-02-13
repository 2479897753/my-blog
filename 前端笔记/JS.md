## JS 输入输出语句
+ `alert()` 弹出框
+ `prompt()` 输入框，**注意：** 该方法获取的数据是字符串类型的
+ `console.log()` 控制台打印

## 变量
> 一块用于存放数据的空间
>

+ 变量的声明 `var a`
+ 变量的初始化 `a = 1`
+ 变量声明的同时初始化 `var a = 1`

## 数据类型
### 简单数据类型（值类型）
+ `Number`
+ `String`
+ `Boolean`
+ `undefined`
+ `null`

### 复杂数据类型（引用类型）
+ `Object`
+ `Array`
+ `Function`

### <font style="background-color:rgb(191, 166, 0);">存储方式</font>
+ **<font style="color:#DF2A3F;">简单</font>** 数据类型存储在 **<font style="color:#DF2A3F;">栈</font>** 中

> 栈中直接存放的是 **<font style="color:#DF2A3F;">数据</font>** ，例如：1，2，3，true
>

+ **<font style="color:#DF2A3F;">复杂</font>** 数据类型存储在 **<font style="color:#DF2A3F;">堆</font>** 中

> 复杂数据类型的栈存储的是当前数据堆中的 **<font style="color:#DF2A3F;">地址</font>**
>

## 判断数据类型的方法
### typeof
> 获取变量的数据类型
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674910164360-b8204e2b-6451-4f91-8905-3ae453f6ba39.png)

+ **注意：** 用 `typeof `验证 `null `和 `array` 类型数据时，返回的是 `'object'`
+ typeof 关键字 **<font style="color:#DF2A3F;">可以判断</font>**：undefined / 数值 / 字符串 / 布尔值 / function
+ typeof 关键字 **<font style="color:#DF2A3F;">不能判断</font>**：null，object，array

### instanceof
> 用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上
>

```javascript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);
console.log(auto instanceof Car); // true
console.log(auto instanceof Object); // true
```

## 数据类型转换
### 转换成 `Number`
+ `parseInt()` 转换为整数，举例：`parseInt('123.2abc')` --> 123
+ `parseFloat()` 转换为浮点数，举例：`parseFloat('123.2abc')` --> 123.2
+ `Number()` 转换为数字，`Number('123.2abc')` --> NaN
+ **<font style="color:#DF2A3F;">隐式转换</font>**：
    - `'12' - 0` --> 12
    - `+'12'` --> 12

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674911732631-fefcccdd-c2a6-4383-a380-17aad647b48a.png)

### 转换成字符串
+ `toString()` 方法，举例：`var num = 1; num.toString()` --> '1'
+ `String()` 函数，举例：`var num = 1; String(num)` --> '1'
+ **<font style="color:#DF2A3F;">隐式转换</font>**：`1 + '1'` --> '11'

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674912281922-5e208eb0-5a40-4627-a58b-76e21ad97d6b.png)

### 转换成布尔值
+ `Boolean()` 函数，举例：`Boolean(1)` --> true
+ **注意：**`''`、`0`、`NaN`、`null`、`undefined` 转换为布尔值为 **<font style="color:#DF2A3F;">false</font>**，除了这些以外的所有值，都会转换为 **<font style="color:#DF2A3F;">true</font>**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674912840962-62fa56d8-5a4d-4524-b6fc-21fe1770c2d5.png)

## 运算符
**<font style="background-color:rgb(201, 174, 0);">运算符的优先级</font>**

+ 一元运算符里面的逻辑非 `!` 优先级最高
+ 逻辑与 `&&` 比逻辑或 `||` 优先级高

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674916355045-ea60502c-e2a9-426e-821c-5643c318be37.png)

### 算数运算符
> `+` `-` `*` `/` `%`
>

**<font style="background-color:rgb(182, 158, 0);">浮点数精度问题：</font>**

+ **注意：** 不要直接判断两个浮点数是否相等！

```javascript
var result = 0.1 + 0.2;    // 结果不是 0.3，而是：0.30000000000000004
console.log(0.07 * 100);   // 结果不是 7，  而是：7.000000000000001
```

### 递增递减运算符
+ 递增：
    - 前置递增 `++a`：`a` 先进行 `+1` 运算，然后将计算结果返回给 `++a`
    - 后置递增 `a++`：先将 `a` 的值返回给 `a++`，然后 `a` 再进行 `+1` 计算
+ 递减：
    - 前置递减 `--a`：`a` 先进行 `-1` 运算，然后将计算结果返回给 `--a`
    - 后置递减 `a--`：先将 `a` 的值返回给 `a--`，然后 `a` 再进行 `-1` 计算

### 比较运算符
+ `==` 值相等
+ `===` 全等（判断值是否相等的基础上，再判断数据类型是否相等）
+ `!=` 值不相等
+ `!==` 全不等

### 逻辑运算符
+ `&&` 逻辑与 **<font style="color:#DF2A3F;">一假则为假</font>**
    - 两者都满足，才返回 `true`
    - `123 && 456` --> 456，第一个值为 `false` 则返回第一个值，否则返回第二个值
+ `||`逻辑或 **<font style="color:#DF2A3F;">一真则为真</font>**
    - 两者满足一个，就返回 `true`
    - `0 || 123` --> 123，第一个值为 `true` 则返回第一个值，否则返回第二个值
+ `!` 取反

### 赋值运算符
> `=` `+=` `-=` `*=` `/=` `%=`，举例：`a += 1` 等价于 `a = a + 1`
>

## 分支语句
### `if` 语句
**<font style="color:rgb(51, 51, 51);background-color:#FBDE28;">三元表达式：</font>**  `a ? b : c` 判断 `a` 是否为 `true`，为 `true` 则返回第一个值，即 `b`，否则返回第二个值，即 `c`

```javascript
// 单分支
if (判断条件) { 语句 }

// 双分支
if (判断条件) {
  // 满足条件
	语句1
} else {
  // 不满足条件
  语句2
}

// 多分支
if (判断条件1) {
  // 满足条件1
	语句1
} else if (判断条件2) {
  // 不满足条件1，但满足条件2
  语句2
} else if (判断条件3) {
  // 不满足条件1和2，但满足条件3
  语句3
} else {
  // 条件都不满足
  语句4
}
```

### `switch` 语句
+ **注意：** switch 是匹配 **<font style="color:#DF2A3F;">全等</font>** 的值，相等，则执行对应语句，`break` 的意思是跳出 `switch` 语句

```javascript
switch (表达式) {
  case value1:
    语句1;
    break;
  case value2:
    语句2；
    break;
  ...
  default:
  	默认语句
}
```

## 循环语句
### `for` 循环
```javascript
for (var i = 0; i < 10; i++) {
  // 循环体
}

// 双重 for 循环，外层 for 循环一次，里层 for 循环要全部执行
for (var i = 1; i <= 10; i++) {
  // 外层循环
  for (var j = 1; j<=10; j++) {
    // 内层循环
  }
}
```

### `while` 循环
```javascript
while (num < 100) {
  // 循环体
}
```

### `do-while` 循环
```javascript
do {
  // 循环体
} while (判断条件)
```

### 阻止循环
+ `continue` 跳出本次循环，继续下次循环
+ `break` 终止循环

## 作用域
### 作用域的分类
+ 全局作用域（作用于所有代码的执行环境）
+ 局部作用域（函数作用域）（这里没有考虑块作用域）

### 作用域中的变量
+ 全局变量
    1. 在函数外部通过 `var` 关键字声明的变量
    2. 在局部或全局作用域中没有声明 **<font style="color:#DF2A3F;">直接赋值</font>** 的变量
+ 局部变量
    - 在局部作用域下声明的变量

## 预解析
> 变量提升和函数提升
>

+ **注意：** 函数提升优先级高于变量提升

```javascript
// 变量提升
console.log(a) // undefined
var a = 10
// 等价于
var a
console.log(a)
a = 10

// 函数提升
fn() // undefined
function fn() {
  console.log(b)
  var b = 5
}

var a = b = c = 15
// 等价于
var a
a = b = c = 15
```

## 数组
```javascript
// 返回包含 1~100 数字的数组
var arr1 = Array(100).fill(1).map((v, k) => k + 1)
var arr2 = Array.from(Array(100), (v, k) => k + 1)
```

### 数组的定义
> 一组 **<font style="color:#DF2A3F;">有序</font>** 数据的集合
>

+ 创建数组：
    - `var arr = new Array()`
    - `var arr = []`
+ 获取数组的最后一位：`arr[arr.length - 1]`

### 遍历数组
> 利用 `for` 循环把数组的每个元素都访问一遍
>

+ 通过 `for of` 遍历

```javascript
var arr = [2, 1, 3, 5, 4]
for (var item of arr) {
  console.log(item)
}
// 输出结果：
// 2
// 1
// 3
// 5
// 4
```

### 数组去重的常用方法
#### `new Set(数组)`（推荐）
> Set 是一系列无序、没有重复值的数据集合，传入一个需要去重的数组，Set 会自动删除重复的元素
>

+ 此方法效率高，代码清晰，缺点是存在兼容性问题

```javascript
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]

const newArr = [...new Set(arr)]
// 或const newArr = Array.from(new set(arr))
console.log(newArr) // [1, '1', 17, true, false, 'true', 'a', {}, {}]
```

#### `indexOf`
> **<font style="color:#DF2A3F;">遍历数组</font>**，每次判断新数组中是否存在该属性，**<font style="color:#DF2A3F;">不存在就存储</font>** 在新数组中
>

+ 这个方法的优点是效率高，缺点是使用了额外空间

```javascript
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]

const newArr = []
arr.forEach(item => {
  if (newArr.indexOf(item) === -1) {
    newArr.push(item)
  }
})
console.log(newArr); // [1, '1', 17, true, false, 'true', 'a', {}, {}]
```

#### `new Map()`
> 利用 Map 的键值对同名覆盖，再将 Map 转数组
>

```javascript
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]

const m = new Map()
arr.forEach(item => {
  m.set(item, item)
})

const newArr = []
m.forEach((item, i) => {
  newArr.push(item)
})
console.log(newArr) // [1, '1', 17, true, false, 'true', 'a', {}, {}]
```

#### `filter() + indexof`
> filter 把接收的函数依次作用于每一个数组项，然后根据返回值 true or false 决定是否保留该值
>

+ 优点在于可在去重时插入对元素的操作，可拓展性强

```javascript
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]

const newArr = arr.filter((item, i, self) => {
  return self.indexOf(item) === i
})
console.log(newArr) // [1, '1', 17, true, false, 'true', 'a', {}, {}]
```

#### `reduce() + includes`
> reduce() 把返回结果继续和序列的下一个元素做相应计算
>

+ 缺点在于时间消耗多，内存空间也额外占用

```javascript
const newArray = arr.reduce((newArr, item) => {
  if (!newArr.includes(item)) {
    newArr.push(item)
  }
  return newArr
}, [])

console.log(newArray) // [1, '1', 17, true, false, 'true', 'a', {}, {}]
```

### 扁平化数组和树结构相互转换
#### 扁平化数组转树结构
```javascript
// 准备数据
let arr = [
  {
    id: 1,
    name: '1',
    pId: 0
  },
  {
    id: 2,
    name: '1-1',
    pId: 1
  },
  {
    id: 3,
    name: '1-1-1',
    pId: 2
  },
  {
    id: 4,
    name: '1-1-2',
    pId: 2
  },
  {
    id: 5,
    name: '2',
    pId: 0
  }
]

function toTree(arr) {
  //先检测是不是数组类型
  if (!Array.isArray(arr)) {
    return []
  }
  // JS的对象就是hash表
  const obj = {}
  arr.forEach(item => {
    obj[item.id] = item
  })
  const targetArr = []
  arr.forEach(item => {
    const parent = obj[item.pId] // 有pId就说明他有父亲，找到他的父亲parent
    if (parent) {
      // 如果他有父亲，就给他添加children属性
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      // 他没有父亲，就把当前项push进去（顶层）
      targetArr.push(item)
    }
  })
  return targetArr
}

console.log(toTree(arr))
```

#### 树结构扁平化
```javascript
// 准备数据
let arr = [
  {
    id: 1,
    name: '1',
    pId: 0,
    children: [
      {
        id: 2,
        name: '1-1',
        pId: 1,
        children: [
          {
            id: 3,
            name: '1-1-1',
            pId: 2
          },
          {
            id: 4,
            name: '1-1-2',
            pId: 2
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: '2',
    pId: 0
  }
]

function treeToArray(tree) {
  let res = []
  for (const item of tree) {
    const { children, ...i } = item
    if (children && children.length) {
      res = res.concat(treeToArray(children))
    }
    res.push(i)
  }
  return res
}

console.log(treeToArray(arr))
```

### 封装数组方法
#### 数组反转
```javascript
// 返回反转后的新数组
function reverse(arr) {
  var newArr = []
  for (var i = arr.length - 1; i >= 0; i--) {
    newArr[newArr.length] = arr[i]
  }
  return newArr
}
```

#### 冒泡排序
```javascript
// 升序排序 改变原数组
function sort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
```

#### 其他
```javascript
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this)
  }
}

Array.prototype.myFilter = function (callback) {
  let newArr = []
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this) && newArr.push(this[i])
  }
  return newArr
}

Array.prototype.myMap = function (callback) {
  let newArr = []
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this) && newArr.push(callback(this[i], i, this))
  }
  return newArr
}

Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true
    }
  }
  return false
}

Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false
    }
  }
  return true
}

Array.prototype.myReduce = function (fn, initValue) {
  let hasInitValue = initValue !== undefined
  let value = hasInitValue ? initValue : this[0]
  for (let i = hasInitValue ? 0 : 1; i < this.length; i++) {
    value = fn(value, this[i], i, this)
  }
  return value
}

Array.prototype.myFind = function (fn) {
  for (let i = 0; i < this.length; i++) {
    const f = fn(this[i])
    if (f) {
      return this[i]
    }
  }
}

const arr = [1, 2, 3, 4]

// let result = arr.myForEach((item, i, self) => {
//   console.log(item, i, self)
// })

// let result = arr.myFilter((item, i, self) => {
//   // console.log(item, i, self)
//   return item > 2
// })
// console.log(result) // [ 3, 4 ]

// let result = arr.myMap((item, i, self) => {
//   // console.log(item, i, self)
//   return item + 1
// })
// console.log(result) // [ 2, 3, 4, 5 ]

// let result = arr.mySome((item, i, self) => {
//   // console.log(item, i, self)
//   return item > 1
// })
// console.log(result) // true

// let result = arr.myEvery((item, i, self) => {
//   // console.log(item, i, self)
//   return item > 0
// })
// console.log(result) // true

// let result = arr.myReduce((sum, item) => {
//   return sum + item
// })
// console.log(result) // 10

const result = arr.myFind(item => {
  return item > 2
})
console.log(result) // 3
```

### 数组常用方法
#### Array.isArray()
> 判断一个对象是否为数组
>

+ **语法：**`Array.isArray(obj)`
+ **参数：**`obj` 要检测的对象
+ **返回值：** 如果对象是数组，返回 `true`；否则返回 `false`

```javascript
console.log(Array.isArray([1, 3, 5])) // true

console.log(Array.isArray('[]')) // false

console.log(Array.isArray(new Array(5))) // true

console.log(Array.isArray(new Int16Array([15, 33]))) // false
```

#### Array.prototype.push()
> 将一个或多个元素添加到数组的末尾，并返回数组的新长度
>

+ **语法：**`arr.push(element1, ..., elementN)`
+ **参数：**`element1, ..., elementN` 要添加到数组末尾的元素
+ **返回值：** 新数组的长度
+ **<font style="color:#DF2A3F;">注意：</font>**该方法会**<font style="color:#DF2A3F;">改变原数组</font>**

```javascript
const animals = ['pigs', 'goats', 'sheep']

const count = animals.push('cows')
console.log(count) // 4
console.log(animals) // ['pigs', 'goats', 'sheep', 'cows']

animals.push('chickens', 'cats', 'dogs')
console.log(animals) // ['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']
```

#### Array.prototype.unshift()
> 将一个或多个元素添加到数组的开头，并返回数组的新长度
>

+ **语法：**`arr.unshift(element1, ..., elementN)`
+ **参数：**`element1, ..., elementN` 要添加到数组开头的元素
+ **返回值：** 数组的新长度
+ **<font style="color:#DF2A3F;">注意：</font>**该方法会**<font style="color:#DF2A3F;">改变原数组</font>**

```javascript
const array1 = [1, 2, 3]

console.log(array1.unshift(4, 5)) // 5

console.log(array1) // [4, 5, 1, 2, 3]
```

#### Array.prototype.pop()
> 删除数组的最后一个元素，并返回该元素的值
>

+ **语法：**`arr.pop()`
+ **参数：** 无
+ **返回值：** 被删除的元素的值
+ **<font style="color:#DF2A3F;">注意：</font>**该方法会**<font style="color:#DF2A3F;">改变原数组</font>**

```javascript
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']

console.log(plants.pop()) // 'tomato'

console.log(plants) // ['broccoli', 'cauliflower', 'cabbage', 'kale']

plants.pop()

console.log(plants) // ['broccoli', 'cauliflower', 'cabbage']
```

#### Array.prototype.shift()
> 删除数组的第一个元素，并返回该元素的值
>

+ **语法：**`arr.shift()`
+ **参数：** 无
+ **返回值：** 被删除的元素的值
+ **<font style="color:#DF2A3F;">注意：</font>**该方法会**<font style="color:#DF2A3F;">改变原数组</font>**

```javascript
const array1 = [1, 2, 3]

const firstElement = array1.shift()

console.log(array1) // [2, 3]

console.log(firstElement) // 1
```

#### Array.prototype.filter()
> 创建一个新数组，其包含通过所提供函数实现的测试的所有元素
>

+ **语法：**`arr.filter(callback(element[, index[, array]])[, thisArg])`
+ **参数：**
    - `callback` 用来测试每个元素的函数，返回 `true` 表示保留，`false` 表示删除
        * `element` 当前处理的元素
        * `index` 当前处理的元素的索引
        * `array` 调用 `filter` 的数组
    - `thisArg` 执行 `callback` 时的 `this` 对象
+ **返回值：** 一个新的、由通过测试的元素组成的数组，如果没有任何元素通过测试，则返回空数组
+ **说明：** 该方法不会改变原数组

```javascript
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

const result = words.filter(word => word.length > 6)

console.log(result) // ['exuberant', 'destruction', 'present']
```

#### Array.prototype.reverse()
> 颠倒数组中元素的顺序
>

+ **语法：**`array.reverse()`
+ **参数：** 无
+ **返回值：** 颠倒后的数组
+ **<font style="color:#DF2A3F;">注意：</font>**该方法会**<font style="color:#DF2A3F;">改变原数组</font>**

```javascript
const array1 = ['one', 'two', 'three']
console.log('array1:', array1) // 'array1:' ['one', 'two', 'three']

const reversed = array1.reverse()
console.log('reversed:', reversed) // 'reversed:' ['three', 'two', 'one']

// 注意: 反向是破坏性的 —— 它会改变原始数组。
console.log('array1:', array1) // 'array1:' ['three', 'two', 'one']
```

#### Array.prototype.sort()
> 对数组元素进行排序，并返回排序后的数组
>

+ **语法：**`array.sort([compareFunction])`
+ **参数：**`compareFunction` 可选。用于指定排序顺序的函数。如果省略，元素按照转换为的字符串的各个字符的 Unicode 位点进行排序
+ **返回值：** 排序后的数组
+ **<font style="color:#DF2A3F;">注意：</font>**该方法会**<font style="color:#DF2A3F;">改变原数组</font>**

```javascript
const months = ['March', 'Jan', 'Feb', 'Dec']
months.sort()
console.log(months) // ['Dec', 'Feb', 'Jan', 'March']

const array1 = [1, 30, 4, 21, 100000]
array1.sort()
console.log(array1) // [1, 100000, 21, 30, 4]

// 数组升序排列
var numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 4, 5]
```

#### Array.prototype.indexOf()
> 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 `**-1**`
>

+ **语法：**`arr.indexOf(searchElement[, fromIndex])`
+ **参数：**
    - `searchElement` 要查找的元素
    - `fromIndex` 从该索引处开始查找
+ **返回值：** 数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 `-1`

```javascript
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison']

console.log(beasts.indexOf('bison')) // 1

// 从索引 2 开始
console.log(beasts.indexOf('bison', 2)) // 4

console.log(beasts.indexOf('giraffe')) // -1
```

#### Array.prototype.lastIndexOf()
> 返回数组中最后一个与指定值相等的元素的索引，如果不存在则返回 `-1`
>

+ **语法：**`arr.lastIndexOf(searchElement[, fromIndex])`
+ **参数：**
    - `searchElement` 要查找的元素
    - `fromIndex` 从该索引开始向前查找，默认为数组的长度减 `1`
+ **返回值：** 数组中该元素最后一次出现的索引，如未找到返回 `-1`

```javascript
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo']

console.log(animals.lastIndexOf('Dodo')) // 3

console.log(animals.lastIndexOf('Tiger')) // 1
```

#### Array.prototype.toString()
> 将数组转换为字符串，并返回结果
>

+ **语法：**`array.toString()`
+ **参数：** 无
+ **返回值：** 返回一个字符串，该字符串包含数组中的每个元素的字符串表示形式，用逗号分隔

```javascript
const array1 = [1, 2, 'a', '1a']

console.log(array1.toString()) // '1,2,a,1a'
```

#### Array.prototype.join()
> 将数组（或类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只包含一个元素，那么该元素将直接返回而不需要使用分隔符。
>

+ **语法：**`arr.join([separator])`
+ **参数：**`separator` 可选。指定一个字符串来分隔数组的每个元素。如果省略该参数，则使用逗号作为分隔符。
+ **返回值：** 一个字符串，由数组的所有元素连接而成。

```javascript
const elements = ['Fire', 'Air', 'Water']

console.log(elements.join()) // 'Fire,Air,Water'

console.log(elements.join('')) // 'FireAirWater'

console.log(elements.join('-')) // 'Fire-Air-Water'
```

#### Array.prototype.concat()
> 用于连接两个或多个数组，不会改变现有数组，而是返回一个新数组
>

+ **语法：**`arr.concat(value1, value2, ..., valueN)`
+ **参数：**`value1, value2, ..., valueN` 数组或值，将被连接到一个新的数组中
+ **返回值：** 一个新的数组
+ **说明：** 该方法不会改变原数组

```javascript
const array1 = ['a', 'b', 'c']
const array2 = ['d', 'e', 'f']
const array3 = array1.concat(array2)

console.log(array3) // ['a', 'b', 'c', 'd', 'e', 'f']
```

#### Array.prototype.slice()
> 返回一个新的数组对象，这一对象是一个由 `begin` 和 `end`（不包括 `end`）决定的原数组的浅拷贝。原始数组不会被改变。
>

+ **语法：**`array.slice([begin[, end]])`
+ **参数：**
    - `begin` 可选。从该索引处开始提取原数组元素。如果该参数为负数，则它表示从原数组中的倒数第几个元素开始提取。如果省略 `begin`，则 `slice` 从索引 `0` 开始。
    - `end` 可选。在该索引处结束提取原数组元素。`slice` 会提取原数组中索引从 `begin` 到 `end` 的所有元素。如果该参数为负数，它表示在原数组中的倒数第几个元素结束抽取。如果省略 `end`，`slice` 会一直提取到原数组末尾。
+ **返回值：** 一个含有提取元素的新数组。
+ **说明：** 该方法不会改变原数组

```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

console.log(animals.slice(2)) // ['camel', 'duck', 'elephant']

console.log(animals.slice(2, 4)) // ['camel', 'duck']

console.log(animals.slice(1, 5)) // ['bison', 'camel', 'duck', 'elephant']

console.log(animals.slice(-2)) // ['duck', 'elephant']

console.log(animals.slice(2, -1)) // ['camel', 'duck']

console.log(animals.slice()) // ['ant', 'bison', 'camel', 'duck', 'elephant']
```

#### Array.prototype.splice()
> 从数组中添加/删除项目，然后返回被删除的项目
>

+ **语法：**`array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`
+ **参数：**
    - `start` 必需，整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置
    - `deleteCount` 可选，整数，要删除的项目数量，如果设置为 `0`，则不会删除项目
    - `item1, item2, ...` 可选，要添加到数组的新项目
+ **返回值：** 被删除的项目
+ **<font style="color:#DF2A3F;">注意：</font>**该方法会**<font style="color:#DF2A3F;">改变原数组</font>**

```javascript
const months = ['Jan', 'March', 'April', 'June']
// 插入索引 1
months.splice(1, 0, 'Feb')
console.log(months) // ['Jan', 'Feb', 'March', 'April', 'June']

// 替换索引 4 处的 1 个元素
months.splice(4, 1, 'May')
console.log(months) // ['Jan', 'Feb', 'March', 'April', 'May']
```

#### forEach()
> 对数组的每个元素执行一次提供的函数
>

+ **语法：**`arr.forEach(callback(currentValue [, index [, array]])[, thisArg])`
+ **参数：**
    - `callback` 为数组中每个元素执行的函数，接收三个参数：
        * `currentValue` 数组中正在处理的当前元素
        * `index` 数组中正在处理的当前元素的索引
        * `array` `forEach()`方法正在操作的数组
    - `thisArg` 可选参数，当执行回调函数时用作 `this` 的值
+ **返回值：**`undefined`
+ **注意**：除了抛出异常以外，没有办法中止或跳出`forEach()`循环
+ **说明：** 该方法不会改变原数组

```javascript
const array1 = ['a', 'b', 'c']

array1.forEach(element => console.log(element))

// 输出结果：
// 'a'
// 'b'
// 'c'
```

#### Array.prototype.map()
> 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
>

+ **语法：**`array.map(callback(currentValue[, index[, array]])[, thisArg])`
+ **参数：**
    - `callback` 生成新数组元素的函数，使用三个参数：
        * `currentValue` 当前正在处理的元素
        * `index` 当前正在处理的元素的索引
        * `array` 调用 `map` 方法的数组
    - `thisArg` 执行 `callback` 函数时使用的 `this` 值
+ **返回值：** 一个新数组，每个元素都是回调函数的结果
+ **说明：** 该方法不会改变原数组

```javascript
const array1 = [1, 4, 9, 16]

// 向 map 传递一个函数
const map1 = array1.map(x => x * 2)

console.log(map1) // [2, 8, 18, 32]
```

#### Array.prototype.reduce()
> 对数组中的每个元素执行一个由您提供的`reducer`函数（升序执行），将其结果汇总为单个返回值
>

+ **语法：**`arr.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)`
+ **参数：**
    - `callback` 执行数组中每个值的函数，包含四个参数：
        * `accumulator` 累计器累计回调的返回值；它是上一次调用回调时返回的累积值，或 `initialValue`
        * `currentValue` 数组中正在处理的元素
        * `currentIndex` 数组中正在处理的当前元素的索引，可选
        * `array` 调用 `reduce` 的数组
    - `initialValue` 作为第一次调用 `callback` 的第一个参数的值，可选
+ **返回值：** 函数累计处理的结果
+ **说明：** 该方法不会改变原数组

```javascript
const array1 = [1, 2, 3, 4]

// 0 + 1 + 2 + 3 + 4
const initialValue = 0
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
)

console.log(sumWithInitial) // 10
```

## 函数
### 函数的定义
> 封装了一段可重复调用的代码
>

+ 声明函数：
    - `function fn() { }`
    - `var fn = function() { }` 匿名函数
    - new 关键字

```javascript
var f = new Function('a', 'b', 'console.log(a + b)');
f(1, 2);

var fn = new Function('参数1','参数2'..., '函数体')
// 注意：Function 里面参数都必须是字符串格式
// 这种方式的执行效率低，不方便书写，因此较少使用
```

+ 调用函数：
    - `fn()`
+ 函数参数：
    - **形参** -- 声明函数时参数的占位符
        * 形参的默认值是 `undefined`，如果没有传递实参，就是 `undefined`
    - **实参** -- 调用函数时传递的参数
        * 按照当前形参的个数接收，多余的实参将不再接收
+ 函数返回值：
    - 在函数体内，通过`return`关键字返回数据
    - 一个函数中，如果没有 `return` 关键字返回数据，函数将返回一个 `undefined`

### `arguments` 的使用
> arguments 是函数的内置对象，展示形式是一个伪数组
>

+ 特点：
    - 具有 `length `属性
    - 按索引方式存储数据
    - 不具有数组的 `push`，`pop` 等方法
+ 作用：获取函数被调用时传递的实参

```javascript
function fn() {
  for (let item of arguments) {
    console.log(item)
  }
  console.log(arguments)
}
fn('a', 2, 'H')
// 输出结果：
'a'
2
'H'
Arguments(3) ['a', 2, 'H', callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

## 对象
### 对象的定义
> 一组 **<font style="color:#DF2A3F;">无序</font>** 属性和方法的集合
>

+ 创建对象
    - `var obj = { }` 通过字面量的方式创建对象
    - `var obj = new Object()` 通过对象实例化的方式创建对象
    - 构造函数的方式：

```javascript
// 一般构造函数首字母大写
function Fn(name, age) {
  this.name = name
  this.age = age
  this.say = function() {
    console.log('hello ~')
  }
}
var obj = new Fn('小黑', 23)
console.log(obj.name) // '小黑'
console.log(obj.age) // 23
obj.say() // 'hello ~'
```

### 遍历对象
+ 通过 `for in` 遍历
+ **注意：** 想得到每一个值时，不能使用点 `.` 的方式，因为这里的 `key` 是一个变量，`.` 访问的只能是字符串，例如：`obj.key` 相当于 `obj.'key'`，所以只能写成 `obj[key]`

```javascript
var obj = {
  name: '小黑',
  age: 23
}
for (var key in obj) {
  console.log(key)
  console.log(obj[key])
}
// 输出结果：
// 'name'
// '小黑'
// 'age'
// 23
```

### Object 常用方法
#### Object.defineProperty()
> 定义一个新属性或修改一个已有属性
>

+ **语法：**`Object.defineProperty(obj, prop, descriptor)`
+ **参数：**
    - `obj` 要在其上定义属性的对象
    - `prop` 要定义或修改的属性的名称
    - `descriptor` 将被定义或修改的属性的描述符
+ **返回值：** 被传递给函数的对象

```javascript
const object1 = {}

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false, // 默认为 false，即不可修改
  enumerable: false, // 默认为 false，即不可枚举
  configurable: false // 默认为 false，即不可删除
})

// 在严格模式下，下面一行会抛出一个错误
object1.property1 = 77

console.log(object1.property1) // 42
```

#### Object.create()
> 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
>

+ **语法：**`Object.create(proto[, propertiesObject])`
+ **参数：**
    - `proto` 新创建对象的原型对象。
    - `propertiesObject` 可选。如果没有指定为 `undefined`，则是要添加到新创建对象的可枚举属性名称和属性描述符对象。这些属性对应 `Object.defineProperties()` 的第二个参数。
+ **返回值：** 一个新对象，带着指定的原型对象及其属性

```javascript
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
  }
}

const me = Object.create(person)

me.name = 'Matthew' // 'name' 是设置在 'me' 上的属性，而不是 'person' 上的属性
me.isHuman = true // 继承的属性可以被覆盖

me.printIntroduction() // My name is Matthew. Am I human? true
```

**<font style="background-color:rgb(174, 151, 0);">实现原理</font>**

```javascript
// Object.create() 实现原理
Object.create = function (proto, propertiesObject) {
  function F() {}
  F.prototype = proto
  if (propertiesObject) {
    Object.defineProperties(F, propertiesObject)
  }
  return new F()
}
```

**<font style="background-color:rgb(174, 151, 0);">应用场景</font>**

```javascript
// Object.create() 应用
// 使用 Object.create() 来实现类式继承
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

function Rectangle() {
  Shape.call(this);
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

const rect = new Rectangle();

console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Shape); // true
rect.move(1, 1); // 'Shape moved.'
```

## String
> `String` 全局对象是一个用于字符串或一个字符序列的构造函数。
>

### 字符串常用方法
#### String.prototype.indexOf()
> 返回调用  String 对象中第一次出现的指定值的索引，从 fromindex 处开始搜索。如果未找到该值，则返回 -1。
>

+ **语法：**`stringObject.indexOf(searchvalue[, fromindex])`
+ **参数：**
    - `searchvalue` 必需。规定需检索的字符串值。
    - `fromindex` 可选。规定开始检索的位置。如果省略该参数，则将从字符串的首字符开始检索。
+ **返回值：** 返回调用  String 对象中第一次出现的指定值的索引，从 `fromindex` 处开始搜索。如果未找到该值，则返回 `-1`。

```javascript
const paragraph = "I think Ruth's dog is cuter than your dog!"

const searchTerm = 'dog'
const indexOfFirst = paragraph.indexOf(searchTerm)

console.log(`The index of the first "${searchTerm}" is ${indexOfFirst}`) // 'The index of the first "dog" is 15'

console.log(
  `The index of the second "${searchTerm}" is ${paragraph.indexOf(searchTerm, indexOfFirst + 1)}` // 'The index of the second "dog" is 38'
)
```

#### String.prototype.lastIndexOf()
> 从后向前搜索字符串，并返回指定值最后出现的位置
>

+ **语法：**`stringObject.lastIndexOf(searchvalue[, fromindex])`
+ **参数：**
    - `searchvalue` 必需，规定需检索的字符串值
    - `fromindex` 可选，规定字符串中开始检索的位置，如果省略，则检索整个字符串
+ **返回值：** 返回指定值最后出现的位置，如果没有找到则返回 `-1`

```javascript
const paragraph = "I think Ruth's dog is cuter than your dog!"

const searchTerm = 'dog'

console.log(`Index of the last ${searchTerm} is ${paragraph.lastIndexOf(searchTerm)}`) // 'Index of the last dog is 38'
```

#### String.prototype.charAt()
> 返回指定索引位置的字符
>

+ **语法：**`string.charAt(index)`
+ **参数：**`index` 必需，表示字符串中某个位置的整数，范围从 `0` 到 `string.length-1`
+ **返回值：** 返回指定索引位置的字符，如果 `index` 超出了字符串的长度，则返回空字符串

```javascript
const sentence = 'The quick brown fox jumps over the lazy dog.'

const index = 4

console.log(`The character at index ${index} is ${sentence.charAt(index)}`) // 'The character at index 4 is q'
```

#### String.prototype.charCodeAt()
> 返回指定位置字符的 Unicode 编码
>

+ **语法：**`string.charCodeAt(index)`
+ **参数：**`index` 必需，字符的位置
+ **返回值：** 返回指定位置字符的 `Unicode` 编码

```javascript
const sentence = 'The quick brown fox jumps over the lazy dog.'

const index = 4

console.log(`Character code ${sentence.charCodeAt(index)} is equal to ${sentence.charAt(index)}`) // 'Character code 113 is equal to q'
```

#### String.prototype.concat()
> 连接两个或多个字符串，并返回一个新的字符串
>

+ **语法：**`str.concat(string1, string2, ..., stringX)`
+ **参数：**`string1, string2, ..., stringX` 将要连接的字符串
+ **返回值：** 返回一个新的字符串

```javascript
const str1 = 'Hello'
const str2 = 'World'

console.log(str1.concat(' ', str2)) // 'Hello World'

console.log(str2.concat(', ', str1)) // 'World, Hello'
```

#### String.prototype.substring()
> 返回一个新的字符串，包含从 start 到 stop（不包括 stop）之间的字符，其中 start 和 stop 是字符串的索引。
>

+ **语法：**`stringObject.substring(start[, stop])`
+ **参数：**
    - `start` 必需。一个非负的整数，规定要提取的子串的第一个字符在 `stringObject` 中的位置。
    - `stop` 可选。一个非负的整数，比要提取的子串的最后一个字符在 `stringObject` 中的位置多 `1`。如果省略该参数，那么返回的子串会一直到字符串的结尾。
+ **返回值：** 一个新的字符串，包含从 `start` 到 `stop`（不包括 `stop`）之间的字符。

```javascript
const str = 'Mozilla'

console.log(str.substring(1, 3)) // 'oz'

console.log(str.substring(2)) // 'zilla'
```

#### String.prototype.slice()
> 提取字符串的一部分，并返回一个新的字符串
>

+ **语法：**`stringObject.slice(start[, end])`
+ **参数：**
    - `start` 必需，规定从何处开始选取。如果是负数，那么它规定从字符串的尾部开始算起的位置。也就是说，`-1` 指字符串中最后一个字符，`-2` 指倒数第二个字符，以此类推。
    - `end` 可选，规定从何处结束选取。该参数是字符串的下标。如果没有指定该参数，那么返回的子串会一直到字符串的结尾。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。也就是说，`-1` 指字符串中最后一个字符，`-2` 指倒数第二个字符，以此类推。
+ **返回值：** 一个新的字符串

```javascript
const str = 'The quick brown fox jumps over the lazy dog.'

console.log(str.slice(31)) // 'the lazy dog.'

console.log(str.slice(4, 19)) // 'quick brown fox'

console.log(str.slice(-4)) // 'dog.'

console.log(str.slice(-9, -5)) // 'lazy'

// substring() 和 slice() 方法的区别
const str = 'Hello, World!'

// 1. 使用 substring 方法提取子字符串
console.log(str.substring(1, 5)) // 'ello'
console.log(str.substring(7, 12)) // 'World'
console.log(str.substring(12, 7)) // 'World'，会自动交换参数

// 2. 使用 slice 方法提取子字符串
console.log(str.slice(1, 5)) // 'ello'
console.log(str.slice(7, 12)) // 'World'
console.log(str.slice(-6, -1)) // 'World'，负数参数表示从末尾开始计算位置
```

#### String.prototype.split()
> split() 方法用于把一个字符串分割成字符串数组。
>

+ **语法：**`stringObject.split(separator[, howmany])`
+ **参数：**
    - `separator` 字符串或正则表达式，从该参数指定的地方分割 `stringObject`。
    - `howmany` 可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
+ 返回值：一个字符串数组。该数组是通过在 `separator` 指定的边界处将字符串 `stringObject` 分割成子串创建的。返回的数组中的字串不包括 `separator` 自身。

```javascript
const str = 'The quick brown fox jumps over the lazy dog.'

const words = str.split(' ')
console.log(words) // ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.']
console.log(words[3]) // 'fox'

const chars = str.split('')
console.log(chars) // ['T', 'h', 'e', ' ', 'q', 'u', 'i', 'c', 'k', ' ', 'b', 'r', 'o', 'w', 'n', ' ', 'f', 'o', 'x', ' ', 'j', 'u', 'm', 'p', 's', ' ', 'o', 'v', 'e', 'r', ' ', 't', 'h', 'e', ' ', 'l', 'a', 'z', 'y', ' ', 'd', 'o', 'g', '.']
console.log(chars[8]) // 'k'

const strCopy = str.split()
console.log(strCopy) // ['The quick brown fox jumps over the lazy dog.']
```

#### String.prototype.replace()
> 返回一个由替换值替换一些或所有匹配的模式后的新字符串
>

+ **语法：**`string.replace(regexp|substr, newSubStr|function)`
+ **参数：**
    - `regexp|substr` 一个 RegExp 对象或者要被替换的字符串
    - `newSubStr|function` 一个含有替换文本或者生成替换文本的函数
+ **返回值：** 一个新的字符串

```javascript
const paragraph = "I think Ruth's dog is cuter than your dog!"

console.log(paragraph.replace("Ruth's", 'my')) // 'I think my dog is cuter than your dog!'

const regex = /Dog/i
console.log(paragraph.replace(regex, 'ferret')) // 'I think Ruth's ferret is cuter than your dog!'
```

#### String.prototype.match()
> 使用正则表达式匹配字符串
>

+ **语法：**`string.match(regexp)`
+ **参数：**`regexp` 正则表达式
+ **返回值：** 匹配结果数组

```javascript
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.'
const regex = /[A-Z]/g
const found = paragraph.match(regex)

console.log(found) // ['T', 'I']
```

#### String.prototype.toUpperCase()
> 把字符串转换为大写
>

+ **语法：**`stringObject.toUpperCase()`
+ **参数：** 无
+ **返回值：** 返回调用该方法的字符串值转换为大写的值

```javascript
const sentence = 'The quick brown fox jumps over the lazy dog.'

console.log(sentence.toUpperCase()) // 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.'
```

#### String.prototype.toLowerCase()
> 把字符串转换为小写
>

+ **语法：**`stringObject.toLowerCase()`
+ **参数：** 无
+ **返回值：** 返回调用该方法的字符串值转换为小写的值

```javascript
const sentence = 'The quick brown fox jumps over the lazy dog.'

console.log(sentence.toLowerCase()) // 'the quick brown fox jumps over the lazy dog.'
```

#### `str.trim()`
> 去掉字符串两端的空白字符
>

+ 语法：stringObject.trim()
+ 参数：无
+ 返回值：返回一个新的字符串，表示去掉两端空白字符的原字符串

```javascript
const greeting = '   Hello world!   '

console.log(greeting) // '   Hello world!   '

console.log(greeting.trim()) // 'Hello world!'
```

## 内置对象 Math
> Math不是构造函数，Math 的所有属性与方法都是静态的
>

### `Math` 常用属性和方法
#### `Math.PI`
> 一个圆的周长与直径的比例，约为 3.14159（圆周率）
>

```javascript
Math.PI = π ≈ 3.14159
```

#### `Math.max()`
> 返回一组数中的 **<font style="color:#DF2A3F;">最大值</font>**
>

+ 参数：`value1, value2, ...` 一组数值
+ 返回值：给定一组数字中的最大值，如果有一个参数不能转换为数字，则返回 `NaN`

```javascript
Math.max(10, 20);   //  20
Math.max(-10, -20); // -10
Math.max(-10, 20);  //  20

// 不传参则返回 -Infinity
Math.max() // -Infinity 
```

#### `Math.min()`
> 返回零个或更多个数值的 **<font style="color:#DF2A3F;">最小值</font>**
>

+ 参数：`value1, value2, ...`  一组数值
+ 返回值：给定一组数字中的最小值，如果有一个参数不能转换为数字，则返回 `NaN`

```javascript
Math.min(10, -20) // -20
```

#### `Math.abs()`
> 返回指定数字的 **<font style="color:#DF2A3F;">绝对值</font>**
>

+ 参数：`x` 一个数值

```javascript
Math.abs('-1');     // 1
Math.abs(-2);       // 2
Math.abs(null);     // 0
Math.abs('');       // 0
Math.abs([]);       // 0
Math.abs([2]);      // 2
Math.abs([1,2]);    // NaN
Math.abs({});       // NaN
Math.abs('string'); // NaN
Math.abs();         // NaN
```

#### `Math.floor()`
> **<font style="color:#DF2A3F;">向下取整</font>**
>

+ 参数：`x` 一个数字
+ 返回值：小于或等于给定数字的最大整数

```javascript
Math.floor(45.95) // 45
Math.floor(45.05) // 45
Math.floor(4) // 4
Math.floor(-45.05) // -46
Math.floor(-45.95) // -46
```

#### `Math.ceil()`
> **<font style="color:#DF2A3F;">向上取整</font>**
>

+ 参数：`x` 一个数字
+ 返回值：大于或等于给定数字的最小整数

```javascript
Math.ceil(.95) // 1
Math.ceil(4) // 4
Math.ceil(7.004) // 8
Math.ceil(-7.004) // -7
```

#### `Math.round()`
> **<font style="color:#DF2A3F;">四舍五入</font>**
>

+ 参数：`x` 一个数值
+ 返回值：给定数字四舍五入到最接近的整数

```javascript
x = Math.round(20.49);   //20
x = Math.round(20.5);    //21
x = Math.round(-20.5);   //-20
x = Math.round(-20.51);  //-21
```

#### `Math.random()`
> 生成 `[0, 1)` 之间的 **<font style="color:#DF2A3F;">随机数</font>**
>

+ 参数：无
+ 返回值：一个浮点型伪随机数字，在 `0`（包括 0）和 `1`（不包括）之间

```javascript
// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值
}
```

## 内置对象 Date
### 创建 `Date` 实例
> 创建一个 JavaScript `Date` 实例，该实例呈现时间中的某个时刻
>

```javascript
var today = new Date();
var birthday = new Date('December 17, 1995 03:24:00');
var birthday = new Date('1995-12-17T03:24:00');
var birthday = new Date(1995, 11, 17);
var birthday = new Date(1995, 11, 17, 3, 24, 0);
```

### 格式化时间戳
```javascript
// datetime是拿到的时间戳
var date = new Date(datetime);
var year = date.getFullYear(),
		month = ("0" + (date.getMonth() + 1)).slice(-2),
		sdate = ("0" + date.getDate()).slice(-2),
		hour = ("0" + date.getHours()).slice(-2),
		minute = ("0" + date.getMinutes()).slice(-2),
  	second = ("0" + date.getSeconds()).slice(-2);
// 拼接
var result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second;
// 返回
return result; // 返回格式 YYYY-MM-DD hh:mm:ss
```

### Date 常见方法
#### `dateObj.getFullYear()`
> 根据本地时间返回指定日期的 **<font style="color:#DF2A3F;">年份</font>**
>

+ 参数：无
+ 返回值：根据当地时间，返回一个对应于给定日期的年份数字

```javascript
var today = new Date();
var year = today.getFullYear(); // 2022
```

#### `dateObj.getMonth()`
> 根据本地时间返回指定日期的 **<font style="color:#DF2A3F;">月份</font>**（0 表示一年中的第一月）
>

+ 参数：无
+ 返回值：返回一个 0 到 11 的整数值，0 代表一月份，1 代表二月份， 2 代表三月份，依次类推
+ 注意：在实际开发中得到的月份要加一 `dateObj.getMonth() + 1`

```javascript
var Xmas95 = new Date('December 25, 1995 23:15:30');
var month = Xmas95.getMonth(); // 11
```

#### `dateObj.getDate()`
> 根据本地时间返回指定日期对象为一个月中的 **<font style="color:#DF2A3F;">哪一天</font>**（从 1--31）
>

+ 参数：无
+ 返回值：一个指定的日期对象为一个月中的哪一日（从 1--31）

```javascript
var Xmas95 = new Date("December 25, 1995 23:15:00");
var day = Xmas95.getDate(); // 25
```

#### `dateObj.getDay()`
> 根据本地时间，返回一个具体日期中一周的第几天（**<font style="color:#DF2A3F;">星期几</font>**），0 表示星期天
>

+ 参数：无
+ 返回值：根据本地时间，返回一个 0 到 6 之间的整数值，代表星期几： 0 代表星期日， 1 代表星期一，2 代表星期二， 依次类推

```javascript
var Xmas95 = new Date("December 25, 1995 23:15:30");
var weekday = Xmas95.getDay(); // 1
```

#### `dateObj.getHours()`
> 根据本地时间，返回一个指定的日期对象的 **<font style="color:#DF2A3F;">小时数</font>**
>

+ 参数：无
+ 返回值：返回一个 0 到 23 之间的整数值

```javascript
var Xmas95 = new Date("December 25, 1995 23:15:00");
var hours = Xmas95.getHours(); // 23
```

#### `dateObj.getMinutes()`
> 根据本地时间，返回一个指定的日期对象的 **<font style="color:#DF2A3F;">分钟数</font>**
>

+ 参数：无
+ 返回值：返回一个 0 到 59 的整数值

```javascript
var Xmas95 = new Date("December 25, 1995 23:15:00");
var minutes = Xmas95.getMinutes(); // 15
```

#### `dateObj.getSeconds()`
> 根据本地时间，返回一个指定的日期对象的 **<font style="color:#DF2A3F;">秒数</font>**
>

+ 参数：无
+ 返回值：返回一个 0 到 59 的整数值

```javascript
var Xmas95 = new Date("December 25, 1995 23:15:30");
var secs = Xmas95.getSeconds(); // 30
```

#### `+new Date()`
> 获取当前 **<font style="color:#DF2A3F;">时间戳</font>** -- 自 1970 年 1 月 1 日（UTC）起经过的毫秒数
>

+ 参数：日期数字或日期字符串，若没有提供参数则表示当前时间戳
+ 返回值：自 1970 年 1 月 1 日 00:00:00 UTC（the Unix epoch）以来的毫秒数

```javascript
+new Date('2020-8-15') // 1597420800000

// 另外三种获取时间戳的方式
// dateObj.valueOf()
var x = new Date(56, 6, 17)
x.valueOf() // -424771200000

// dateObj.getTime()
var birthday = new Date(1991, 9, 17)
birthday.getTime() // 687628800000

// Date.now() 这个方法是 H5 新增的
Date.now() // 1660570303649
```

## 构造函数、实例对象、`prototype` 三者的关系
+ 每个**构造函数**中都有一个 `prototype` 原型对象，原型对象中都有一个 `constructor` 属性，指回**构造函数**
+ 每个**实例对象**中都有一个 `__proto__` 对象原型，指向**构造函数**的 `prototype` 原型对象
+ `constructor` 主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675151298042-98fc064d-39f8-4fe2-ae8b-e18cfd6c0dd8.png)

## 原型链
> 每一个实例对象都有一个 `__proto__` 属性，指向构造函数的原型对象，构造函数的原型对象也是一个对象，也有 `__proto__` 属性，这样一层一层往上找就形成了原型链
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675151430800-d6b87591-a380-4af1-ab0a-3eb441cbc4a3.png)

```javascript
function Star(uname, age) {
  this.uname = uname;
  this.age = age;
}
Star.prototype.sing = function() {
  console.log('我会唱歌');

}
Star.prototype.sex = '女';
// Object.prototype.sex = '男';
var ldh = new Star('刘德华', 18);
ldh.sex = '男';
console.log(ldh.sex);
```

## 继承
### `call()`
> `call()` 用于调用函数，改变 this 指向，参数：第一个参数为 this 指向的对象，其他参数为调用函数时的传参
>

```javascript
function fn(x, y) {
  console.log(this);
  console.log(x + y);
}

var obj = {
  name: 'andy'
};

fn.call(obj, 1, 2); // 调用了函数此时的 this 指向了对象 obj
```

### 子类构造函数继承父类构造函数的属性和方法
```javascript
function Father(name, age) {
  this.name = name
  this.age = age
}

Father.prototype.sum = (a, b) => {
  return a + b
}

function Son(name, age, gender) {
  // 通过 call 方法调用父类构造函数，并改变父类的 this 指向，来继承父类的属性
  Father.call(this, name, age)

  this.gender = gender
}

// 子类通过父类的实例化对象，赋值给子类的原型对象，然后改变原型对象中 constructor 的指向，来继承父类中的方法
Son.prototype = new Father()
Son.prototype.constructor = Son
Son.prototype.say = () => {
  console.log('hello~')
}

const son = new Son('黑色小白', 23, '男')
console.log(son)
```

## `new` 关键字的作用
> 实例化对象 -- 对象的实例化
>

1. 创建一个空对象
2. 改变隐式原型的指向
3. 改变构造函数 this 的指向
4. 判断这个构造函数是否有返回对象

**<font style="background-color:rgb(176, 153, 0);">模拟实现 new 关键字的操作</font>**

```javascript
function Fun(name, age) {
  this.name = name
  this.age = age
}

function create(fn, ...args) {
  // 1.创建了一个空的对象
  let obj = {}
  // 2.将空对象的原型，指向于构造函数的原型
  Object.setPrototypeOf(obj, fn.prototype)
  // 3.将空对象作为构造函数的上下文（改变 this 指向）
  let result = fn.apply(obj, args)
  // 4.对构造函数有返回值的处理判断
  return result instanceof Object ? result : obj
}

console.log(create(Fun, '张三', 23))
```

## `call`、`apply`、`bind` 三者的异同
+ **共同点：** 都可以改变 this 指向
+ **不同点：**
    - `call` 和 `apply` 会调用函数，并且改变函数内部 `this` 指向
    - `call` 和 `apply` 传递的参数不一样，`call` 使用 **<font style="color:#DF2A3F;">参数列表</font>** 的形式传递参数，`apply` 使用 **<font style="color:#DF2A3F;">数组</font>** 的形式传递参数
    - `bind` 不会调用函数，可以改变函数内部 `this` 指向
+ **应用场景：**
    - `call` 经常做继承
    - `apply` 经常跟数组有关系，比如借助于数学对象实现数组最大值，最小值
    - `bind` 不调用函数，但是改变 `this` 指向，比如改变定时器内部的 `this` 指向

```javascript
// 手动实现 call 函数
Function.prototype.myCall = function (context) {
  var args = [...arguments].slice(1)
  context = context || window
  context.fn = this
  return context.fn(args)
}

function Add(num1, num2) {
  return num1 + num2
}
function Sub(num1, num2) {
  return num1 - num2
}
console.log(Add.myCall(Sub, 2, 5)) // 7
```

```javascript
// 手动实现 apply 函数
Function.prototype.myApply = function (context) {
  context = context || window
  context.fn = this
  if (arguments[1]) {
    return context.fn(...arguments[1])
  } else {
    return context.fn()
  }
}

function Add(num1, num2) {
  return num1 + num2
}
function Sub(num1, num2) {
  return num1 - num2
}
console.log(Add.myApply(Sub, [2, 5])) // 7
```

```javascript
// 手动实现 bind 函数
Function.prototype.myBind = function (context) {
  var args = [...arguments].slice(1)
  var fn = this
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return fn.apply(context, args.concat(bindArgs))
  }
}

function Add(num1, num2) {
  return num1 + num2
}
function Sub(num1, num2) {
  return num1 - num2
}
console.log(Add.myBind(Sub, 2)(5)) // 7
```

## 严格模式
### 单文件严格模式
> <font style="color:rgb(77, 77, 77);">在js文件中开启严格模式，仅仅对这个JavaScript文件生效</font>
>

```javascript
//在JavaScript文件的首行加入 "use strict"

'use strict'
num = 10 
console.log(num) // 严格模式不能使用未声明的变量
--------------------------------------------------------------------------------
var num2 = 1;
delete num2; // 严格模式不允许删除变量
--------------------------------------------------------------------------------
function fn() {
  console.log(this); // 严格模式下全局作用域中函数中的 this 是 undefined
}
fn();  
---------------------------------------------------------------------------------
function Star() {
  this.sex = '男';
}
// Star();严格模式下，如果构造函数不加 new 调用, this 指向的是 undefined 如果给他赋值则会报错
var ldh = new Star();
console.log(ldh.sex);
----------------------------------------------------------------------------------
setTimeout(function() {
  console.log(this); // 严格模式下，定时器 this 还是指向 window
}, 2000);  
----------------------------------------------------------------------------------
a = 1;
a = 2;
function fn(a, a) {  // 严格模式下函数里面的参数不允许有重名
  console.log(a + a);
};
fn(1, 2);
```

### 特定函数严格模式
> 在函数的作用域内部单独开启严格模式，仅仅对这个函数的内部生效
>

```javascript
function foo() {
  "use strict";
  true.foo = "abc"//开启严格模式后，这里会报错
}
foo()
```

## 高阶函数
> 如果函数的参数或者返回值为一个函数的话，那么这个函数被称为高阶函数
>

```javascript
function fn(a, b, callback) {
  console.log(a + b);
  callback && callback();
}

fn(1, 2, function() {
  console.log('我是最后调用的');
});
```

## 闭包
> 闭包（closure）指有权访问另一个函数作用域中变量的函数。简单理解就是 ，一个作用域可以访问另外一个函数内部的局部变量。
>

+ **闭包的作用：** 延伸了变量的作用范围

```javascript
function fn() {
  var num = 10;
  function fun() {
    console.log(num);
  }
  return fun;
}
var f = fn(); 
f();
```

### 闭包的应用场景
#### 利用闭包模拟进栈出栈
```javascript
// 闭包的典型应用（模拟进栈出栈）
var stack = (function () {
  var arr = []
  return {
    push: function (value) {
      arr.push(value)
    },
    pop: function () {
      return arr.pop()
    },
    size: function () {
      return arr.length
    }
  }
})()
stack.push('abc')
stack.push('def')
console.log(stack.size()) // 2
console.log(stack.pop()) // 'def'
console.log(stack.size()) // 1
```

#### 利用闭包得到当前 li 的索引号
```javascript
// 利用闭包的方式得到当前 li 的索引号
var lis = document.querySelector('.nav').querySelectorAll('li');
for (var i = 0; i < lis.length; i++) {
  // 利用for循环创建了4个立即执行函数
  // 立即执行函数也成为小闭包因为立即执行函数里面的任何一个函数都可以使用它的i这变量
  ( function(i) {
    // console.log(i);
    lis[i].onclick = function() {
      console.log(i);
    }
  })(i);
}
```

#### 3 秒钟之后,打印所有 li 元素的内容
```javascript
// 闭包应用 3 秒钟之后,打印所有 li 元素的内容
lis = [{}, {}, {}]
for (var i = 0; i < lis.length; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(lis[i].innerHTML);
    }, 3000)
  })(i);
}
```

## 递归
> 如果一个函数在内部调用其本身，那么这个函数就是递归函数，简单理解：函数内部自己调用自己, 这个函数就是递归函数
>

```javascript
var num = 1;
function fn() {
  console.log('我要打印6句话');
  if (num == 6) {
    return; // 递归里面必须加退出条件
  }
  num++;
  fn();
}
fn();
```

### 递归的应用场景
#### 利用递归求 1~n 的阶乘
```javascript
//利用递归函数求1~n的阶乘 1 * 2 * 3 * 4 * ..n
function fn(n) {
  if (n == 1) { //结束条件
    return 1;
  }
  return n * fn(n - 1);
}
console.log(fn(3));

// fn(3)
// return  3 * fn(2)
// return  3 * (2 * fn(1))
// return  3 * (2 * 1)
// return  3 * (2)
// return  6
```

#### 利用递归求斐波那契数列
```javascript
// 利用递归函数求斐波那契数列(兔子序列)  1、1、2、3、5、8、13、21...
// 用户输入一个数字 n 就可以求出 这个数字对应的兔子序列值
// 我们只需要知道用户输入的 n 的前面两项(n-1 n-2)就可以计算出 n 对应的序列值
function fb(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fb(n - 1) + fb(n - 2);
}
console.log(fb(3));
```

#### 浅拷贝
```javascript
var obj = {
  id: 1,
  name: 'andy',
  arr: [2, 3],
  msg: {
    age: 18
  }
}

// 浅拷贝函数
function shallowCopy(obj) {
  var newObj = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 利用 ES6 的展开运算符实现浅拷贝
const shallowObj = { ...obj }

const shallowObj = shallowCopy(obj)

obj.msg.age = 20
obj.arr[0] = 4
obj.name = 'zhangsan'
shallowObj.name = 'lisi'

console.log(obj) // {id: 1, name: 'zhangsan', arr: [4, 3], msg: { age: 20 }}
console.log(shallowObj) // {id: 1, name: 'lisi', arr: [4, 3], msg: { age: 20 }}
```

#### 深拷贝
```javascript
function deepClone(obj) {
  if (typeof obj != 'object') return obj;
  var temp = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] == 'object') { // 如果obj[key]还是对象则执行递归
              temp[key] = deepClone(obj[key]); // 递归
          } else {
              temp[key] = obj[key];
          }
      }
  }
  return temp;
}

var obj = {
  age: 13,
  name: {
      addr: '天边'
  },
  arr: [1, 2, {gender: '男'}]
}

var obj2 = deepClone(obj);
obj2.age = 14
obj2.name.addr = '地心'
obj2.arr[2].gender = '女'
console.log(obj.age) // 13
console.log(obj.name.addr) // 天边
console.log(obj.arr[2].gender) // 男
```

## 正则表达式 RegExp
### 正则表达式的创建
1. 通过调用 `RegExp` 对象的构造函数创建

```javascript
var regexp = new RegExp(/123/);
console.log(regexp);
```

2. 利用字面量创建正则表达式

```javascript
 var rg = /123/;
```

### 正则表达式的常用方法
#### `regexObj.test(str)`
> 执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 `true` 或 `false`
>

+ 参数：`str` 用来与正则表达式匹配的字符串
+ 返回值：如果正则表达式与指定的字符串匹配 ，返回 `true`；否则 `false`

```javascript
// 主要用来检测当前文本内容是否符合 正则模板，符合返回 true，不符合返回 false
let str = 'hello world!';
let result = /^hello/.test(str);
console.log(result); // true
```

#### `regexObj.exec(str)`
> 在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 `null`
>

+ 参数：`str` 要匹配正则表达式的字符串
+ 返回值：如果匹配失败，`exec()` 方法返回 `null`。如果匹配成功，`exec()` 方法返回一个数组

```javascript
// exec 匹配当前符合正则的内容
// exec 主要的作用就是提取符合正则模板的数据
// 用小括号 () 包裹起来的就是要提取的内容

// 正则匹配模式外面包裹一个小括号 () 表示分组提取的内容
// 在小括号内 (?<分组的名称>)
// 通过 exec 方法获取到的数据中有一个叫做 groups 他里面存放着 匹配到的分组内容

var str = `<div>Hello World!</div>`

var reg = /<div>(?<value>[\s\S]*)<\/div>/
console.log(reg.exec(str).groups.value) // Hello World!
```

### 边界符
> 正则表达式中的边界符（位置符）用来提示字符所处的位置，主要有两个字符
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675160164266-e5f50dcd-52f2-4e97-8b62-637ac6922adf.png)

```javascript
var rg = /abc/; // 正则表达式里面不需要加引号 不管是数字型还是字符串型
// /abc/ 只要包含有abc这个字符串返回的都是true
console.log(rg.test('abc'));
console.log(rg.test('abcd'));
console.log(rg.test('aabcd'));
console.log('---------------------------');
var reg = /^abc/;
console.log(reg.test('abc')); // true
console.log(reg.test('abcd')); // true
console.log(reg.test('aabcd')); // false
console.log('---------------------------');
var reg1 = /^abc$/; // 精确匹配 要求必须是 abc字符串才符合规范
console.log(reg1.test('abc')); // true
console.log(reg1.test('abcd')); // false
console.log(reg1.test('aabcd')); // false
console.log(reg1.test('abcabc')); // false
```

### 字符类
#### `[]` 方括号
> 表示有一系列字符可供选择，只要匹配其中一个就可以了
>

```javascript
var rg = /[abc]/; // 只要包含有a 或者 包含有b 或者包含有c 都返回为true
console.log(rg.test('andy')); //true
console.log(rg.test('baby')); //true
console.log(rg.test('color')); //true
console.log(rg.test('red')); //false
var rg1 = /^[abc]$/; // 三选一 只有是a 或者是 b  或者是c 这三个字母才返回 true
console.log(rg1.test('aa')); //false
console.log(rg1.test('a')); //true
console.log(rg1.test('b')); //true
console.log(rg1.test('c')); //true
console.log(rg1.test('abc')); //false
----------------------------------------------------------------------------------
var reg = /^[a-z]$/ //26个英文字母任何一个字母返回 true  - 表示的是a 到z 的范围  
console.log(reg.test('a')); //true
console.log(reg.test('z')); //true
console.log(reg.test('A')); //false
-----------------------------------------------------------------------------------
//字符组合
var reg1 = /^[a-zA-Z0-9]$/; // 26个英文字母(大写和小写都可以)任何一个字母返回 true  
------------------------------------------------------------------------------------
//取反 方括号内部加上 ^ 表示取反，只要包含方括号内的字符，都返回 false 。
var reg2 = /^[^a-zA-Z0-9]$/;
console.log(reg2.test('a')); //false
console.log(reg2.test('B')); //false
console.log(reg2.test(8)); //false
console.log(reg2.test('!')); //true
```

#### 量词符
> <font style="color:rgb(77, 77, 77);">量词符用来设定某个模式出现的次数</font>
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675162121961-a871004d-7706-4aa8-b3ff-d015c2b3de19.png)

```javascript
// 1. * 相当于 >= 0 可以出现0次或者很多次 
// var reg = /^a*$/;
// console.log(reg.test('')); // true
// console.log(reg.test('a')); // true
// console.log(reg.test('aa')); // true
// console.log(reg.test('aaaaaa')); // true

// 2. + 相当于 >= 1 可以出现1次或者很多次
// var reg = /^a+$/;
// console.log(reg.test('')); // false
// console.log(reg.test('a')); // true
// console.log(reg.test('aa')); // true
// console.log(reg.test('aaaaaa')); // true

// 3. ?  相当于 1 || 0
// var reg = /^a?$/;
// console.log(reg.test('')); // true
// console.log(reg.test('a')); // true
// console.log(reg.test('aa')); // false
// console.log(reg.test('aaaaaa')); // false

// 4. {3} 就是重复3次
// var reg = /^a{3}$/;
// console.log(reg.test('')); // false
// console.log(reg.test('a')); // false
// console.log(reg.test('aa')); // false
// console.log(reg.test('aaaaaa')); // false
// console.log(reg.test('aaa')); // true

// 5. {3, }  大于等于3
var reg = /^a{3,}$/;
console.log(reg.test('')); // false
console.log(reg.test('a')); // false
console.log(reg.test('aa')); // false
console.log(reg.test('aaaaaa')); // true
console.log(reg.test('aaa')); // true

// 6. {3, 16}  大于等于3 并且 小于等于16
var reg = /^a{3,16}$/;
console.log(reg.test('')); // false
console.log(reg.test('a')); // false
console.log(reg.test('aa')); // false
console.log(reg.test('aaaaaa')); // true
console.log(reg.test('aaa')); // true
console.log(reg.test('aaaaaaaaaaaaaaaaaaaaa')); // false
```

### 预定义类
> 预定义类指的是某些常见模式的简写方式
>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675162708118-48bbf2b9-9232-4e97-81a1-981bb4f4c4fd.png)

### 正则表达式的应用场景
**<font style="color:rgb(77, 77, 77);background-color:#FBDE28;">贪婪模式</font>**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675164271458-6abc25c0-014c-4e16-9401-0c681ed97b92.png)

**<font style="color:rgb(77, 77, 77);background-color:#FBDE28;">懒惰模式</font>**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675164035619-b9fe4dce-2b23-4255-b87e-f25dafe57538.png)

## JS 文档注释
### 可选参数
```javascript
/**
 * 欢迎用户
 * @param {string} name - 用户的姓名
 * @param {number} [age] - 用户的年龄（可选参数）
 */
function greetUser(name, age) {
  if (age) {
    console.log(`你好，${name}，你今年${age}岁了。`)
  } else {
    console.log(`你好，${name}。`)
  }
}
```

### 任意参数类型
```javascript
/**
 * 打印任意类型的参数
 * @param {*} value - 任意类型的参数
 */
function printValue(value) {
  console.log(value)
}
```

### 多种参数类型
```javascript
/**
 * 根据参数类型返回相应值
 * @param {string|number} input - 可以是字符串或者数字
 * @return {string|number} - 返回与输入类型相同的值
 */
function processInput(input) {
  if (typeof input === 'string') {
    return `您输入的是字符串：${input}`
  } else if (typeof input === 'number') {
    return `您输入的是数字：${input}`
  }
}
```

### 返回值
```javascript
/**
 * 计算两个数的和
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} - 两个数的和
 */
function add(a, b) {
  return a + b
}
```

### 对象属性
```javascript
/**
 * 网络请求
 * @param {object} options 配置对象
 * @param {string} options.url 请求地址
 * @param {'GET'|'POST'} options.method 请求方法
 * @param {object} options.body
 * @param {object} options.headers
 */
async function request(options) {}
```

```javascript
/**
 * 表示一个人的信息
 * @typedef {Object} Person
 * @property {string} name - 姓名
 * @property {number} age - 年龄
 * @property {string} gender - 性别
 */

/**
 * 输出人的信息
 * @param {Person} person - 一个人的信息
 */
function printPersonInfo(person) {
  console.log(`姓名：${person.name}，年龄：${person.age}，性别：${person.gender}`)
}
```

### 示例
```javascript
/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 * @example
 * add(2, 3); // 返回 5
 */
function add(a, b) {
  return a + b
}
```

### 异常
```javascript
/**
 * 除法运算
 * @param {number} dividend - 被除数
 * @param {number} divisor - 除数
 * @return {number} - 返回商
 * @throws {Error} 如果除数为0，则抛出异常
 */
function divide(dividend, divisor) {
  if (divisor === 0) {
    throw new Error('除数不能为0')
  }
  return dividend / divisor
}
```

### 类及其成员
```javascript
/**
 * 表示一个汽车类
 * @class
 */
class Car {
  /**
   * 创建一个汽车对象
   * @param {string} brand - 汽车品牌
   * @param {number} year - 出厂年份
   */
  constructor(brand, year) {
    this.brand = brand
    this.year = year
  }

  /**
   * 获取汽车的品牌
   * @returns {string} - 汽车品牌
   */
  getBrand() {
    return this.brand
  }

  /**
   * 获取汽车的年份
   * @returns {number} - 汽车年份
   */
  getYear() {
    return this.year
  }
}
```

### 命名空间
```javascript
/**
 * @namespace
 */
var MyNamespace = {}

/**
 * 计算两个数的和
 * @memberof MyNamespace
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} - 两个数的和
 */
MyNamespace.add = function (a, b) {
  return a + b
}

/**
 * 计算两个数的差
 * @memberof MyNamespace
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} - 两个数的差
 */
MyNamespace.subtract = function (a, b) {
  return a - b
}
```

### 回调函数
```javascript
/**
 * 执行一个操作并在完成时调用回调函数
 * @param {function} callback - 完成时的回调函数
 * @callback
 * @param {string} result - 操作的结果
 */

function performOperation(callback) {
  // 执行操作
  let result = '操作成功'
  // 调用回调函数并传入结果
  callback(result)
}

/**
 * 处理操作完成时的回调
 * @param {string} result - 操作的结果
 */
function handleCallback(result) {
  console.log('操作完成，结果为：', result)
}

// 调用performOperation并传入回调函数
performOperation(handleCallback)
```

### 作者
```javascript
/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 * @author 张三
 */
function add(a, b) {
  return a + b
}
```

### 日期
```javascript
/**
 * 计算两个数字的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 * @date 2023-11-19
 */
function add(a, b) {
  return a + b
}
```

## 动画函数封装
