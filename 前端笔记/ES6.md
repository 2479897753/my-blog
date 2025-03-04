## ES6 新增语法
### `let`
> 声明变量
>

`let` **声明的变量只在所处的块级作用域有效**

```javascript
if (true) { 
  let a = 10;
}
console.log(a) // ReferenceError: a is not defined
```

**不存在变量提升**

```javascript
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 20;
```

**暂时性死区**

```javascript
var tmp = 123
if (true) {
  tmp = 'abc' // ReferenceError: Cannot access 'tmp' before initialization
  let tmp
}
```

### `const`
> 声明常量，常量就是值（内存地址）不能改变的量
>

**具有块级作用域**

```javascript
if (true) { 
  const a = 10;
}
console.log(a) // ReferenceError: a is not defined
```

**声明变量时必须赋值**

```javascript
// 常量赋值后，值不能修改
const a = 10
a = 20 // TypeError: Assignment to constant variable.
```

### `let`、`const`、`var` 的区别
+ **注意：**`var` 声明的变量会挂载到 `window` 上，`let` 和 `const` 则不会
+ 使用 `var` 声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象
+ 使用 `let` 声明的变量，其作用域为该语句所在的代码块内，不存在变量提升
+ 使用 `const` 声明的常量，在后面出现的代码中不能再修改该常量的值

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675165055285-57e00dd2-28cf-4b2d-9f21-38701f7a2b00.png)

### 解构赋值
> ES6 中允许从数组中提取值，按照对应位置，对变量赋值，对象也可以实现解构
>

**数组解构**

```javascript
let [a, b, c] = [1, 2, 3];

console.log(a) // 1
console.log(b) // 2
console.log(c) // 3
// 如果解构不成功，变量的值为 undefined
```

**对象解构**

```javascript
let person = { uname: 'zhangsan', age: 20 }
// let { uname, age } = person
// console.log(uname) // 'zhangsan'
// console.log(age) // 20

let uname = 'zs'
let { uname: myName, age: myAge } = person // myName myAge 属于别名
console.log(uname) // zs
console.log(myName) // 'zhangsan'
console.log(myAge) // 20
```

### 箭头函数
> ES6 中新增的定义函数的方式，**注意：** 箭头函数中没有 `this` 和 `arguments`
>

```javascript
() => {} // ()：代表是函数； =>：必须要的符号，指向哪一个代码块；{}：函数体
const fn = () => {} // 代表把一个函数赋值给 fn
```

+ 函数体中只有一句代码，且代码的执行结果就是返回值，可以省略大括号

```javascript
function sum(num1, num2) {
  return num1 + num2
}
// es6 写法
const sum = (num1, num2) => num1 + num2
```

+ 如果形参只有一个，可以省略小括号

```javascript
function fn(v) {
  return v
}
// es6 写法
const fn = v => v
```

+ 箭头函数不绑定 this 关键字，箭头函数中的 this，指向的是函数定义位置的上下文 this

```javascript
const obj = { name: '张三' }
function fn() {
  console.log(this) // { name: '张三' }
  return () => {
    console.log(this) // { name: '张三' }
  }
}
const resFn = fn.call(obj)
resFn()
```

### 剩余参数
```javascript
// function sum(first, ...args) {
//   console.log(first) // 10
//   console.log(args) // [20, 30]
// }
// sum(10, 20, 30)

const sum = (...args) => {
  let total = 0
  args.forEach(item => (total += item))
  return total
}
console.log(sum(10, 20)) // 30
console.log(sum(10, 20, 30)) // 60
```

### 扩展运算符
+ 扩展运算符可以应用于合并数组或对象

```javascript
let ary1 = [1, 2, 3]
let ary2 = [3, 4, 5]
let ary3 = [...ary1, ...ary2] // [1, 2, 3, 4, 5]

const obj1 = { name: 'zs', age: 23 }
const obj2 = { name: 'ls', gender: '男' }
const obj3 = { ...obj1, ...obj2 } // { name: 'ls', age: 23, gender: '男' }
```

+ 将类数组或可遍历对象转换为真正的数组

```javascript
let oDivs = document.getElementsByTagName('div')
oDivs = [...oDivs]
```

### 模板字符串
+ 模板字符串中可以解析变量

```javascript
let name = '张三'; 
let sayHello = `hello,my name is ${name}`; // hello, my name is zhangsan
```

+ 模板字符串中可以换行

```javascript
let result = {
  name: 'zhangsan',
  age: 20,
  sex: '男'
}
let html = `<div>
              <span>${result.name}</span>
              <span>${result.age}</span>
              <span>${result.sex}</span>
            </div> `
```

+ 在模板字符串中可以调用函数

```javascript
const sayHello = function () {
  return '哈哈哈哈 追不到我吧 我就是这么强大'
}
let greet = `${sayHello()} 哈哈哈哈`
console.log(greet) // 哈哈哈哈 追不到我吧 我就是这么强大 哈哈哈哈
```

## 类 Class
### 创建类
```javascript
// 步骤1：使用 class 关键字
class Name {}
// 步骤2：使用 new 关键字实例化对象
const zs = new Name()
```

### 给类添加属性和方法
```javascript
// 1.创建一个明星类
class Star {
  // 类的共有属性放到 constructor 里面，constructor 是构造器
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  // 注意，方法与方法之间不需要添加逗号，方法不需要使用 function 关键字
  sing(song) {
    console.log(this.uname + '唱' + song)
  }
}

// 2.利用类创建对象 new
const ldh = new Star('刘德华', 18)
console.log(ldh) // Star {name: "刘德华", age: 18}
ldh.sing('冰雨') // 刘德华唱冰雨
```

### 类的继承
```javascript
// 使用 extends 关键字来实现继承
class Father {
  constructor(uname) {
    this.name = uname
  }
  
  say() {
    console.log('你的名字是' + this.name)
  }
}

class Son extends Father {} // 这样子类就继承了父类的属性和方法

const son = new Son('小黑')
son.say() // 你的名字是小黑
```

`super` **关键字的使用**

```javascript
// super 关键字就代表了父类，可以调用父类的属性和方法
// 定义父类
class Father {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  
  sum() {
    console.log(this.x + this.y)
  }
}

// 子类继承父类
class Son extends Father {
  constructor(x, y) {
    super(x, y) // 使用 super 调用了父类中的构造函数
  }
}

const son = new Son(1, 2)
son.sum() // 3
```

```javascript
// 子类使用 super 关键字调用父类的方法
// 继承中，如果子类有某方法，则用子类的，如果没有，则执行父类中的方法
// 利用 super 调用父类的构造函数，super 必须在子类 this 之前调用
class Father {
  say() {
    return '我是爸爸'
  }
}

class Son extends Father {
  say() {
    console.log(super.say() + '的儿子')
  }
}

const son = new Son()
son.say() // "我是爸爸的儿子"
```

## 访问器成员
> 访问器成员是一种特殊的对象属性，它们由一对`getter`和`setter`方法组成，用于读取和设置对象的属性值。访问器成员提供了对属性的控制和保护，可以在读取和设置属性值时执行自定义的逻辑。
>

+ **语法：**

```javascript
var obj = {
  // getter
  get propertyName() {
    // 读取属性值的逻辑
    return value;
  },
  // setter
  set propertyName(value) {
    // 设置属性值的逻辑
    // 可以对属性值进行验证或转换
  }
};
```

1. **构造函数**

```javascript
function Product(name, unitPrice, chooseNumber) {
  this.name = name
  this.unitPrice = unitPrice
  this.chooseNumber = chooseNumber
}

Object.defineProperty(Product.prototype, 'totalPrice', {
  get() {
    return this.unitPrice * this.chooseNumber
  }
})

const p = new Product('iphone', 5999, 3)

console.log(p.totalPrice)
```

2. **Class**

```javascript
class Product {
  constructor(name, unitPrice, chooseNumber) {
    this.name = name
    this.unitPrice = unitPrice
    this.chooseNumber = chooseNumber
  }

  // 语法糖
  get totalPrice() {
    return this.unitPrice * this.chooseNumber
  }
}

const p = new Product('iphone', 5999, 3)

// 像调用属性一样使用
console.log(p.totalPrice)
```

3. **对象**

```javascript
const p = {
  name: 'iphone',
  unitPrice: 5999,
  chooseNumber: 3,
  get totalPrice() {
    return this.unitPrice * this.chooseNumber
  }
}
.
console.log(p.totalPrice)
```

## ES6 内置对象
### Array 新增方法
#### Array.prototype.includes()
> 判断数组是否包含某个元素
>

+ **语法：**`arr.includes(valueToFind[, fromIndex])`
+ **参数：**
    - valueToFind 需要查找的元素
    - fromIndex 可选，从哪个索引开始查找，默认为 `0`
+ **返回值：** 布尔值，`true`表示包含，`false`表示不包含

```javascript
const array1 = [1, 2, 3]

console.log(array1.includes(2)) // ture

const pets = ['cat', 'dog', 'bat']

console.log(pets.includes('cat')) // true

console.log(pets.includes('at')) // false
```

#### Array.prototype.flat()
> 用于将嵌套的数组“拉平”，变成一维数组
>

+ **语法：**`arr.flat([depth])`
+ **参数：**`depth` 是一个非负整数，表示要提取嵌套数组的结构深度，默认值是`1`
+ **返回值：** 一个包含提取出的新元素的数组

```javascript
const arr1 = [0, 1, 2, [3, 4]]

console.log(arr1.flat()) // [0, 1, 2, 3, 4]

const arr2 = [0, 1, [2, [3, [4, 5]]]]

console.log(arr2.flat()) // [0, 1, 2, [3, [4, 5]]]

console.log(arr2.flat(2)) // [0, 1, 2, 3, [4, 5]]

console.log(arr2.flat(Infinity)) // [0, 1, 2, 3, 4, 5]
```

#### Array.prototype.flatMap()
> flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
>

+ **语法：**`arr.flatMap(callback(currentValue[, index[, array]])[, thisArg])`
+ **参数：**
    - `callback` 生成新数组元素的函数，使用三个参数：
        * `currentValue` 数组中正在处理的当前元素。
        * `index` 数组中正在处理的当前元素的索引。
        * `array` 调用了 `map` 的数组。
    - `thisArg` 执行回调函数时使用的 `this` 值。
+ **返回值：** 一个新的数组，其中每个元素都是回调函数的结果，并且（由于使用了 `flat`）已被压扁。

```javascript
const arr1 = [1, 2, 1]

const result = arr1.flatMap(num => (num === 2 ? [2, 2] : 1))

console.log(result) // [1, 2, 2, 1]
```

#### Array.prototype.fill()
> 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
>

+ **语法：**`arr.fill(value[, start[, end]])`
+ **参数：**
    - `value` 填充数组元素的值
    - `start` 起始索引，默认为 `0`
    - `end` 终止索引，默认为 `arr.length`
+ **返回值：** 填充后的数组

```javascript
const array1 = [1, 2, 3, 4]

// 从位置 2 到位置 4 填充 0
console.log(array1.fill(0, 2, 4)) // [1, 2, 0, 0]

// 从位置 1 开始填充 5
console.log(array1.fill(5, 1)) // [1, 5, 5, 5]

console.log(array1.fill(6)) // [6, 6, 6, 6]
```

#### Array.prototype.entries()
> 返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对
>

+ **语法：**`arr.entries()`
+ **参数：** 无
+ **返回值：** 一个新的 Array Iterator 对象

```javascript
const array1 = ['a', 'b', 'c']

const iterator1 = array1.entries()

console.log(iterator1.next().value) // [0, 'a']

console.log(iterator1.next().value) // [1, 'b']
```

#### Array.prototype.keys()
> 返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键。
>

+ **语法：**`arr.keys()`
+ **参数：** 无
+ **返回值：** 一个新的 Array Iterator 对象

```javascript
const array1 = ['a', 'b', 'c']
const iterator = array1.keys()

for (const key of iterator) {
  console.log(key)
}

// 输出结果：
// 0
// 1
// 2
```

#### Array.prototype.values()
> 返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的值
>

+ **语法：**`arr.values()`
+ **参数：** 无
+ **返回值：** 一个新的 Array Iterator 对象

```javascript
const array1 = ['a', 'b', 'c']
const iterator = array1.values()

for (const value of iterator) {
  console.log(value)
}

// 输出结果：
// 'a'
// 'b'
// 'c'
```

#### Array.prototype.find()
> 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
>

+ **语法：** arr.find(callback[, thisArg])
+ **参数：**
    - `callback` 在数组每一项上执行的函数，接收三个参数：
        * `element` 当前元素
        * `index` 当前元素的索引
        * `array` 调用 `find` 的数组
    - `thisArg` 执行 `callback` 时使用的 `this` 值
+ **返回值：** 数组中满足测试函数的第一个元素的值，否则返回 `undefined`

```javascript
const array1 = [5, 12, 8, 130, 44]

const found = array1.find(element => element > 10)

console.log(found) // 12
```

#### Array.prototype.findIndex()
> 返回数组中满足提供的测试函数的第一个元素的索引。否则返回`-1`。
>

+ **语法：**`arr.findIndex(callback[, thisArg])`
+ **参数：**
    - `callback` 用来测试每个元素的函数，接收三个参数：
        * `element` 当前元素
        * `index` 当前元素的索引
        * `array` 调用 `findIndex` 的数组
    - `thisArg` 执行 `callback` 时的 `this` 值
+ **返回值：** 数组中满足提供的测试函数的第一个元素的索引。否则返回`-1`。

```javascript
const array1 = [5, 12, 8, 130, 44]

const isLargeNumber = element => element > 13

console.log(array1.findIndex(isLargeNumber)) // 3
```

#### Array.from()
> 从一个类似数组或可迭代对象中创建一个新的数组实例
>

+ **语法：**`Array.from(arrayLike[, mapFn[, thisArg]])`
+ **参数：**
    - `arrayLike` 类似数组或可迭代对象
    - `mapFn` 可选参数，如果指定了该参数，则最后生成的数组会经过该函数的处理
    - `thisArg` 可选参数，执行 `mapFn` 函数时 `this` 的值
+ **返回值：** 一个新的数组实例

```javascript
console.log(Array.from('foo'))  // ['f', 'o', 'o']

console.log(Array.from([1, 2, 3], x => x + x)) // [2, 4, 6]
```

#### Array.of()
> 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
>

+ **语法：**`Array.of(element0[, element1[, ...[, elementN]]])`
+ **参数：**`elementN` 任意个参数，将按顺序成为新数组中的元素。
+ **返回值：** 一个新的 Array 实例。

```javascript
console.log(Array.of('foo', 2, 'bar', true)) // ['foo', 2, 'bar', true]

console.log(Array.of()) // []
```

#### Array.prototype.copyWithin()
> 从数组的指定位置拷贝元素到数组的另一个指定位置中
>

+ **语法：**`arr.copyWithin(target, start, end)`
+ **参数：**
    - `target` 必需，从该位置开始替换数据
    - `start` 可选，从该位置开始读取数据，默认为`0`。如果为负值，表示倒数
    - `end` 可选，到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数
+ **返回值：** 修改后的数组

```javascript
const array1 = ['a', 'b', 'c', 'd', 'e']

// 将索引 3 处的元素复制到索引 0
console.log(array1.copyWithin(0, 3, 4)) // ['d', 'b', 'c', 'd', 'e']

// 将从索引 3 到末尾的所有元素复制到索引 1
console.log(array1.copyWithin(1, 3)) // ['d', 'd', 'e', 'd', 'e']
```

#### Array.prototype.some()
> 测试数组中的某些元素是否通过了指定函数的测试
>

+ **语法：**`arr.some(callback(element[, index[, array]])[, thisArg])`
+ **参数：**
    - `callback` 用来测试每个元素的函数，接受三个参数
        * `element` 数组中当前正在处理的元素
        * `index` 数组中当前正在处理的元素的索引
        * `array` 调用 `some` 方法的数组
    - `thisArg` 执行 `callback` 时使用的 `this` 值
+ **返回值：** 如果回调函数对任何数组元素返回 `true`，则返回 `true`，否则返回 `false`

```javascript
const array = [1, 2, 3, 4, 5]

// 检查元素是否为偶数
const even = element => element % 2 === 0

console.log(array.some(even)) // true
```

#### Array.prototype.every()
> 判断数组中的每一项是否满足指定条件，如果全部满足则返回 true，否则返回 false
>

+ **语法：**`arr.every(callback[, thisArg])`
+ **参数：**
    - `callback` 用来测试每个元素的函数，接受三个参数：
        *   `currentValue` 当前元素的值
        *   `index` 当前元素的索引
        *   `array` 调用 `every` 方法的数组
    - `thisArg` 执行 `callback` 时使用的 `this` 值
+ **返回值：** 如果数组中的每个元素都满足条件，则返回 `true`，否则返回 `false`

```javascript
const isBelowThreshold = currentValue => currentValue < 40

const array1 = [1, 30, 39, 29, 10, 13]

console.log(array1.every(isBelowThreshold)) // true
```

### String 新增方法
#### String.prototype.includes()
> 判断一个字符串是否包含在另一个字符串中，返回布尔值
>

+ **语法：**`str.includes(searchString[, position])`
+ **参数：**
    - `searchString` 要搜索的字符串
    - `position` 可选，从当前字符串的哪个位置开始搜索
+ **返回值：** 布尔值

```javascript
const sentence = 'The quick brown fox jumps over the lazy dog.'

const word = 'fox'

console.log(`The word "${word}" ${sentence.includes(word) ? 'is' : 'is not'} in the sentence`) // 'The word "fox" is in the sentence'
```

#### String.prototype.startsWith()
> 判断一个字符串是否以指定字符串开头
>

+ **语法：**`str.startsWith(searchString[, position])`
+ **参数：**
    - `searchString` 要搜索的字符串
    - `position` 可选，搜索的起始位置，默认为0
+ **返回值：** 布尔值

```javascript
const str1 = 'Saturday night plans'

console.log(str1.startsWith('Sat')) // true

console.log(str1.startsWith('Sat', 3)) // false
```

#### String.prototype.endsWith()
> 判断一个字符串是否以指定字符串结尾
>

+ **语法：**`str.endsWith(searchString[, length])`
+ **参数：**
    - `searchString` 要搜索的字符串
    - `length` 可选，用于指定字符串的长度
+ **返回值：** 布尔值

```javascript
const str1 = 'Cats are the best!'

console.log(str1.endsWith('best!')) // true

console.log(str1.endsWith('best', 17)) // true

const str2 = 'Is this a question?'

console.log(str2.endsWith('question')) // false
```

#### String.prototype.repeat()
> 返回一个新字符串，表示将原字符串重复count次
>

+ **语法：**`str.repeat(count)`
+ **参数：**`count` 表示重复次数
+ **返回值：** 返回一个新字符串，表示将原字符串重复`count`次

```javascript
const mood = 'Happy! '

console.log(`I feel ${mood.repeat(3)}`) // 'I feel Happy! Happy! Happy!'
```

#### String.prototype.padStart()
> 用另一个字符串填充当前字符串，以便产生的字符串达到给定的长度。填充从当前字符串的开始（左侧）应用。
>

+ **语法：**`str.padStart(targetLength [, padString])`
+ **参数：**
    - `targetLength` 当前字符串应该达到的长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
    - `padString` （可选）填充字符串。默认是空格。
+ **返回值：** 一个新的字符串，表示用另一个字符串填充后的当前字符串。

```javascript
const str1 = '5'

console.log(str1.padStart(2, '0')) // '05'

const fullNumber = '2034399002125581'
const last4Digits = fullNumber.slice(-4)
const maskedNumber = last4Digits.padStart(fullNumber.length, '*')

console.log(maskedNumber) // '************5581'
```

#### String.prototype.padEnd()
> 用另一个字符串填充当前字符串，以便产生的字符串达到给定的长度。填充从当前字符串的末尾（右侧）开始。
>

+ **语法：**`str.padEnd(targetLength [, padString])`
+ **参数：**
    - `targetLength` 当前字符串应该达到的长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
    - `padString` （可选）填充字符串。默认是空格。
+ **返回值：** 一个新的字符串，表示用另一个字符串填充后的当前字符串。

```javascript
const str1 = 'Breaded Mushrooms'

console.log(str1.padEnd(25, '.')) // 'Breaded Mushrooms........'

const str2 = '200'

console.log(str2.padEnd(5)) // '200  '
```

#### String.prototype.trimStart()
> 去除字符串开头的空格
>

+ **语法：**`str.trimStart()`
+ **参数：** 无
+ **返回值：** 返回一个新字符串

```javascript
const greeting = '   Hello world!   '

console.log(greeting) // '   Hello world!   '

console.log(greeting.trimStart()) // 'Hello world!   '
```

#### String.prototype.trimEnd()
> 去除字符串尾部的空格
>

+ **语法：**`str.trimEnd()`
+ **参数：** 无
+ **返回值：** 返回去除尾部空格后的字符串

```javascript
const greeting = '   Hello world!   '

console.log(greeting) // '   Hello world!   '

console.log(greeting.trimEnd()) // '   Hello world!'
```

#### String.prototype.replaceAll()
> 返回一个新字符串，该字符串是通过使用指定的替换字符串或函数替换与正则表达式或字符串匹配的子字符串的所有匹配项而生成的
>

+ **语法：**`str.replaceAll(regexp|substr, newSubStr|function)`
+ **参数：**
    - `regexp|substr` 一个`RegExp`对象或者一个要被替换的字符串
    - `newSubStr|function` 一个要被插入到新字符串中的字符串，或者一个要替换的函数
+ **返回值：** 一个新的字符串，是通过替换所有匹配的子字符串而生成的

```javascript
const paragraph = "I think Ruth's dog is cuter than your dog!"

console.log(paragraph.replaceAll('dog', 'monkey')) // 'I think Ruth's monkey is cuter than your monkey!'

// 当用 regex 调用 replaceAll 时需要全局标志
const regex = /Dog/gi
console.log(paragraph.replaceAll(regex, 'ferret')) // 'I think Ruth's ferret is cuter than your ferret!'
```

#### String.prototype.matchAll()
> 返回一个包含所有匹配正则表达式的结果的迭代器对象
>

+ **语法：**`str.matchAll(regexp)`
+ **参数：**`regexp` 一个正则表达式对象
+ **返回值：** 一个迭代器对象

```javascript
const regexp = /t(e)(st(\d?))/g
const str = 'test1test2'

const array = [...str.matchAll(regexp)]

console.log(array) // [ [ 'test1', 'e', 'st1', '1', index: 0, input: 'test1test2', groups: undefined ], [ 'test2', 'e', 'st2', '2', index: 5, input: 'test1test2', groups: undefined ] ]

console.log(array[0]) // ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', groups: undefined]

console.log(array[1]) // ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', groups: undefined]
```

### Object 新增方法
#### Object.is()
> 判断两个值是否相同
>

+ **语法：**`Object.is(value1, value2)`
+ **参数：**
    - `value1` - 第一个值
    - `value2` - 第二个值
+ **返回值：** 如果两个值相同，则返回 true，否则返回 false

```javascript
Object.is('1', 1) // false
Object.is(NaN, NaN) // true
Object.is(-0, 0) // false
Object.is({}, {}) // false

// Object.is() 与 === 的区别
// 1. 判断 +0 和 -0
+0 === -0 // true
Object.is(+0, -0) // false

// 2. 判断 NaN
NaN === NaN // false
Object.is(NaN, NaN) // true
```

#### Object.assign()
> 将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象
>

+ **语法：**`Object.assign(target, ...sources)`
+ **参数：**
    - `target` 目标对象
    - `sources` 源对象
+ **返回值：** 目标对象

```javascript
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }

const returnedTarget = Object.assign(target, source)

console.log(target) // { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target) // true
```

#### Object.getOwnPropertyDescriptors()
> 返回指定对象所有自身属性（非继承属性）的描述对象
>

+ **语法：**`Object.getOwnPropertyDescriptors(obj)`
+ **参数：**`obj` 要获取自身属性描述的对象
+ **返回值：** 返回一个对象，该对象的键是 obj 的自身属性名称，值是对应的属性描述对象

```javascript
const object1 = {
  property1: 42
}

const descriptors1 = Object.getOwnPropertyDescriptors(object1)

console.log(descriptors1) // { property1: { value: 42, writable: true, enumerable: true, configurable: true } }

console.log(descriptors1.property1.writable) // true

console.log(descriptors1.property1.value) // 42
```

#### Object.setPrototypeOf()
> 设置一个指定的对象的原型（即，内部[[Prototype]]属性）到另一个对象或 null。
>

+ **语法：**`Object.setPrototypeOf(obj, prototype)`
+ **参数：**
    - `obj` 要设置其原型的对象
    - `prototype` 新的原型对象（一个对象或 `null`）
+ **返回值：** 指定对象的原型（原型对象）。

```javascript
const obj = {}
const parent = { foo: 'bar' }

console.log(obj.foo) // undefined

Object.setPrototypeOf(obj, parent)

console.log(obj.foo) // bar
```

#### Object.getPrototypeOf()
> 返回指定对象的原型对象
>

+ **语法：**`Object.getPrototypeOf(obj)`
+ **参数：**`obj` 必选，要返回原型对象的对象
+ **返回值：** 返回指定对象的原型对象

```javascript
const prototype1 = {}
const object1 = Object.create(prototype1)

console.log(Object.getPrototypeOf(object1) === prototype1) // true
```

#### Object.keys()
> 返回一个数组，包含对象自身的所有可枚举属性的名称
>

+ **语法：**`Object.keys(obj)`
+ **参数：**`obj` 要返回其属性名称的对象
+ **返回值：** 一个字符串数组，包含了 `obj` 的所有可枚举属性的名称

```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
}

console.log(Object.keys(object1)) // ['a', 'b', 'c']
```

#### Object.values()
> 返回一个数组，包含对象自身的所有可枚举属性的值
>

+ **语法：**`Object.values(obj)`
+ **参数：**`obj` 要返回其可枚举属性的值的对象
+ **返回值：** 一个表示给定对象的所有可枚举属性值的数组

```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
}

console.log(Object.values(object1)) // ['somestring', 42, false]
```

#### Object.entries()
> 返回一个给定对象自身可枚举属性的键值对数组
>

+ **语法：**`Object.entries(obj)`
+ **参数：**`obj` 要返回其枚举自身属性的对象
+ **返回值：** 一个给定对象自身可枚举属性的键值对数组

```javascript
const object1 = {
  a: 'somestring',
  b: 42
}

console.log(Object.entries(object1)) // [['a', 'somestring'], ['b', 42]]

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`)
}

// 输出结果：
// a: somestring
// b: 42
```

#### Object.fromEntries()
> 将键值对列表转换为一个对象
>

+ **语法：**`Object.fromEntries(iterable)`
+ **参数：**`iterable` 键值对列表
+ **返回值：** 一个新对象

```javascript
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
])

const obj = Object.fromEntries(entries)

console.log(obj) // { foo: 'bar', baz: 42 }

// 主要应用场景：将查询字符串转为对象
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux')) // { foo: 'bar', baz: 'qux' }
```

#### Object.hasOwn()
> 判断对象是否有某个属性
>

+ **语法：**`Object.hasOwn(obj, key)`
+ **参数：**
    - `obj` 对象
    - `key` 属性名
+ **返回值：** 布尔值

```javascript
const object1 = {
  prop: 'exists'
}

console.log(Object.hasOwn(object1, 'prop')) // true

console.log(Object.hasOwn(object1, 'toString')) // false

console.log(Object.hasOwn(object1, 'undeclaredPropertyValue')) // false
```

### Symbol 数据类型
> Symbol 是一种基本类型，使用`Symbol`可以创建独一无二的值
>

```javascript
// Symbol 的应用场景
let obj = {
  name: 'zs',
  age: 23
}
const mySymbol1 = Symbol('msg')
const mySymbol2 = Symbol('msg')
obj[mySymbol1] = '一个人'
obj[mySymbol2] = '未知'
console.log(obj) // {name: 'zs', age: 23, Symbol(msg): '一个人', Symbol(msg): '未知'}
```

### Proxy 对象
> **Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）
>

#### `handler.get()`
> `handler.get()` 方法用于拦截对象的读取属性操作
>

```javascript
// target 目标对象
// property 被获取的属性名
var p = new Proxy({}, {
  get: function(target, prop) {
    console.log("called: " + prop);
    return 10;
  }
});

console.log(p.a); // "called: a"
                  // 10
```

#### `handler.set()`
> `handler.set()` 方法是设置属性值操作的捕获器
>

```javascript
// target 目标对象
// property 将被设置的属性名或 Symbol
// value 新属性值
const monster1 = { eyeCount: 4 };

const handler1 = {
  set(obj, prop, value) {
    if ((prop === 'eyeCount') && ((value % 2) !== 0)) {
      console.log('Monsters must have an even number of eyes');
    } else {
      return Reflect.set(...arguments);
    }
  }
};

const proxy1 = new Proxy(monster1, handler1);

proxy1.eyeCount = 1; // "Monsters must have an even number of eyes"
console.log(proxy1.eyeCount); // 4

proxy1.eyeCount = 2;
console.log(proxy1.eyeCount); // 2
```

#### `handler.has()`
> **handler.has()** 方法是针对 [in](https://developer.allizom.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 操作符的代理方法。
>

```javascript
// target 目标对象
// prop 需要检查是否存在的属性
const handler1 = {
  has(target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};

const monster1 = {
  _secret: 'easily scared',
  eyeCount: 4
};

const proxy1 = new Proxy(monster1, handler1);
console.log('eyeCount' in proxy1); // true

console.log('_secret' in proxy1); // false

console.log('_secret' in monster1); // true
```

#### `handler.apply()`
> `handler.apply()` 方法用于拦截函数的调用
>

```javascript
// target 目标对象（函数）
// thisArg 被调用时的上下文对象
// argumentsList 被调用时的参数数组
function sum(a, b) {
  return a + b;
}

const handler = {
  apply: function(target, thisArg, argumentsList) {
    console.log(`Calculate sum: ${argumentsList}`); // "Calculate sum: 1,2"

    return target(argumentsList[0], argumentsList[1]) * 10;
  }
};

const proxy1 = new Proxy(sum, handler);

console.log(sum(1, 2)); // 3

console.log(proxy1(1, 2)); // 30
```

### Set 对象
> ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值
>

#### `add(value)`
> 在`Set`对象尾部添加一个元素。返回该 `Set` 对象
>

```javascript
const s = new Set()
s.add(1).add(2).add(3) // Set(3) {1, 2, 3}
// size属性返回 Set 对象中的值的个数
s.size // 3
```

#### `delete(value)`
> 移除值为 `value` 的元素，并返回一个布尔值来表示是否移除成功
>

```javascript
const s = new Set([1, 2, 3])
s.delete(2) // true
s.size // 2
```

#### `has(value)`
> 返回一个布尔值，表示该值在 `Set` 中存在与否
>

```javascript
const s = new Set([1, 2, 3])
s.has(1) // true
s.size // 3
```

#### `clear()`
> 移除`Set`对象内的所有元素
>

```javascript
const s = new Set([1, 2, 3])
s.clear()
s.size // 0
```

#### 循环遍历
> Set 结构的实例与数组一样，也拥有 forEach 方法
>

```javascript
s.forEach(value => console.log(value))
```

### Set 和 WeakSet
1. **Set**

> `Set` 对象是一组不重复的值，重复的值将被忽略，值类型可以是原始类型和引用类型
>

```javascript
let mySet = new Set([1, 1, 2, 2, 3, 3]);
mySet.size; // 3
mySet.has(1); // true
mySet.add('strings');
mySet.add({ a: 1, b:2 });

// 可以通过 forEach 和 for...of 来遍历 Set 对象：
mySet.forEach((item) => {
  console.log(item);
    // 1
    // 2
    // 3
    // 'strings'
    // Object { a: 1, b: 2 }
});
 
for (let value of mySet) {
  console.log(value);
    // 1
    // 2
    // 3
    // 'strings'
    // Object { a: 1, b: 2 }
}

```

2. **WeakSet**

> 类似于 `WeakMap`，`WeakSet` 对象可以让你在一个集合中保存对象的弱引用，在 `WeakSet` 中的对象只允许出现一次：
>

```javascript
var ws = new WeakSet();
var obj = {};
var foo = {};
 
ws.add(window);
ws.add(obj);
 
ws.has(window); // true
ws.has(foo);    // false, foo 没有添加成功
 
ws.delete(window); // 从结合中删除 window 对象
ws.has(window);    // false, window 对象已经被删除
```

### Map 对象
> **Map** 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者基本类型）都可以作为一个键或一个值。
>

#### `set(key, value)`
> 在 `Map` 对象中设置与指定的键 `key` 关联的值，并返回 `Map` 对象
>

```javascript
const map = new Map()
map.set('name', 'zs').set(0, 123) // Map(2) {'name' => 'zs', 0 => 123}
// size属性返回 Map 对象中的键值对数量
map.size // 2
```

#### `get(key)`
> 返回与指定的键 `key` 关联的值，若不存在关联的值，则返回 `undefined`。
>

```javascript
const map = new Map()
map.set('bar', 'foo')
map.get('bar') // 'foo'
map.get('baz') // undefined
map.size // 1
```

#### `delete(key)`
> 移除 `Map` 对象中指定的键值对，如果键值对存在并成功被移除，返回 `true`，否则返回 `false`。
>

```javascript
const map = new Map()
map.set('bar', 'foo')
map.delete('bar') // true
map.size // 0
```

#### `has(key)`
> 返回一个布尔值，用来表明 `Map` 对象中是否存在与指定的键 `key` 关联的值。
>

```javascript
const map = new Map()
map.set('bar', 'foo')
map.has('bar') // true
map.has('baz') // false
```

#### `clear()`
> 移除 Map 对象中所有的键值对
>

```javascript
const map = new Map()
map.set('bar', 'baz')
map.set(1, 'foo')
map.size // 2
map.clear()
map.size // 0
```

### Map 和 WeakMap
1. **Map**

> 事实上每个对象都可以看作是一个 `Map`。一个对象由多个 `key-val` 对构成，在 `Map` 中，任何类型都可以作为对象的 `key`
>

```javascript
var myMap = new Map();
 
var keyString = "a string",
    keyObj = {},
    keyFunc = function () {};
 
// 设置值
myMap.set(keyString, "value 与 'a string' 关联");
myMap.set(keyObj, "value 与 keyObj 关联");
myMap.set(keyFunc, "value 与 keyFunc 关联");
 
myMap.size; // 3
 
// 获取值
myMap.get(keyString);    // "value 与 'a string' 关联"
myMap.get(keyObj);       // "value 与 keyObj 关联"
myMap.get(keyFunc);      // "value 与 keyFunc 关联"
```

2. **WeakMap**

> `WeakMap` 就是一个 `Map`，只不过它的所有 `key` 都是弱引用，意思就是 `WeakMap` 中的东西垃圾回收时不考虑，使用它不用担心内存泄漏问题。
>

+ 注意：`WeakMap` 的所有 `key` 必须是<font style="color:#DF2A3F;">对象</font>。它只有四个方法 `delete(key)`，`has(key)`，`get(key)`和`set(key, val)`

```javascript
let w = new WeakMap();
w.set('a', 'b'); 
// Uncaught TypeError: Invalid value used as weak map key
 
var o1 = {},
    o2 = function(){},
    o3 = window;
 
w.set(o1, 37);
w.set(o2, "azerty");
w.set(o3, undefined);
 
w.get(o3); // undefined
 
w.has(o1); // true
w.delete(o1);
w.has(o1); // false
```

## Web Workers API
> web worker 是运行在后台的 JavaScript，不会影响页面的性能。
>

```javascript
// demo_workers.js
var i=0;

function timedCount() {
  i=i+1;
  // postMessage() - 用于向 HTML 页面发送消息
  postMessage(i);
  setTimeout("timedCount()", 500);
}

timedCount();
```

```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
</head>
<body>
 
<p>计数： <output id="result"></output></p>
<button onclick="startWorker()">开始工作</button> 
<button onclick="stopWorker()">停止工作</button>
 
<p><strong>注意：</strong> Internet Explorer 9 及更早 IE 版本浏览器不支持 Web Workers.</p>
 
<script>
var w;
 
function startWorker() {
  // 检测浏览器是否支持 Web Worker
  if(typeof(Worker) !== "undefined") {
    // 检测是否存在 worker
    if(typeof(w) == "undefined") {
      w = new Worker("demo_workers.js");
    }
    // onmessage - 用于接收 web worker 发送过来的消息
    w.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML = "抱歉，你的浏览器不支持 Web Workers...";
  }
}
 
function stopWorker() {
  // 终止 Web Worker
  w.terminate();
  w = undefined;
}
</script>
 
</body>
</html>
```

## ||=、&&=、??=、?.、??运算符的使用
### ||= 逻辑或赋值运算符
> `||=` 运算符用于指定变量在其值为假（Falsy）时才进行赋值操作。
>

+ **语法：**`a ||= b`，意为若a为假，则将b赋值给a。

```javascript
let x = 10
let y = 0
x ||= 5 // x仍为10，因为10被视为真值
y ||= 5 // y现在为5，因为0被视为假值
```

### &&= 逻辑与赋值运算符
> `&&=` 运算符用于指定变量在其值为真（Truthy）时才进行赋值操作。
>

+ **语法：**`a &&= b`，意为若a为真，则将b赋值给a。

```javascript
let a = null
let b = 15
a &&= 10 // a仍为null
b &&= 20 // b现在为20
```

### ??= 逻辑空赋值运算符
> `??=` 运算符用于指定变量在其值为`null`或`undefined`时才进行赋值操作。
>

+ **语法：**`a ??= b`，意为若a为`null`或`undefined`，则将b赋值给a。

```javascript
javascript
let c = null
let d
c ??= 5 // c现在为5
d ??= 10 // d现在为10
```

### ?. 可选链运算符
> `?.` 运算符用于在对象链深处避免出现异常，当对象链中的某个属性为`null`或`undefined`时，避免出现错误。
>

+ **语法：**`obj?.prop`，若obj存在且有prop属性，则返回prop属性值，否则返回undefined。

```javascript
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
}

const dogName = adventurer.dog?.name
console.log(dogName) // undefined

console.log(adventurer.someNonExistentMethod?.()) // undefined
```

### ?? 空值合并运算符
> `??` 运算符用于在变量为`null`或`undefined`时提供默认值。
>

+ **语法：**`a ?? b`，若a为`null`或`undefined`，则返回b，否则返回a。

```javascript
const foo = null ?? 'default string'
console.log(foo) // 'default string'

const baz = 0 ?? 42
console.log(baz) // 0
```

## ES6 模块化
### 默认导入
+ 语法：`import 接收名称 from '模块标识符'`

```javascript
// 默认导入时的接收名称可以是任意名称，只要是合法的成员名称即可
import obj from './index.js'
```

### 默认导出
+ 语法：`export default 默认导出的成员`
+ **注意：** 每个模块中，只允许使用唯一的一次 `export default`，否则会报错！

```javascript
// index.js
let n = 20
function show() {}

export default {
  n,
  show
}
```

### 按需导入
+ 语法：`import { s1 } from '模块标识符'`
+ **注意：**
    1. 按需导入的成员名称必须和按需导出的名称保持一致
    2. 按需导入时，可以使用 `as` 关键字进行重命名
    3. 按需导入可以和默认导入一起使用

```javascript
// 如果导入成员较多时可使用：`import * as m from '模块标识符'` 
// 使用 `m.s1` 来调用按需导出的成员

import obj, { n1, show1 as show } from './index.js'
console.log(obj)
console.log(n1, show)
show()
```

### 按需导出
+ 语法：`export 按需导出的成员`

```javascript
999// index.js
export let n1 = 20
let n2 = 30
export function show1() {}
function show2() {}

export default {
  n2,
  show2
}
```

### export 转发
```javascript
// 将 index.js 文件中所有按需导出的成员，在该模块 main.js 中导出
// 统一导出，方便管理
// main.js
export * from './index.js'
```

## Promise
> 为了解决回调地狱的问题，ES6（ECMAScript 2015）中新增了 Promise 的概念
>

### Promise 的基本概念
+ Promise 是一个构造函数
    - new 出来的 Promise 实例对象，代表一个异步操作
    - `const p = new Promsie()`
+ `Promise.prototype` 上包含一个 `then` 方法
    - `then` 方法用来预先指定成功和失败的回调函数
    - 调用`then`方法时，成功的回调函数是必选的、失败的回调函数是可选的
    - `p.then(result => {}, err => {})`

### Promise 的三种状态
1. 初始态 `pending`
2. 成功态 resolved（`fulfilled`）
3. 失败态 `rejected`

**状态可转换**

> 最初创建`Promise`对象时，默认状态是`pending`，如果在函数体内部调用了第一个参数对应的函数，则状态变成了`resolved`；如果调用了第二个参数对应的函数，则状态变成了`rejected`。
>

**状态转换不可逆**

> 一旦从`pending` --> `resolved`（或者是`rejected`），就不可能再回到`pending`，也不能由`resolved`变成`rejected`。
>

### `then` 方法的特性
> 通过 `then` 方法的链式调用，就解决了回调地狱的问题
>

```javascript
const p = new Promise((resolve, reject) => {
  resolve(1)
})

p.then(value => {
  console.log(value) // 1
  return 2 // 这是一个被 Promise 包裹的值
}).then(value2 => {
  console.log(value2) // 2
})
```

### 通过 `catch` 捕获错误
> 在 Promise 的链式操作中如果发生了错误，可以使用 `Promise.prototype.catch()` 方法进行捕获和处理
>

```javascript
const p = new Promise((resolve, reject) => {
  resolve(1)
})

p.then(value => {
  console.log(value) // 1
  return 2 // 这是一个被 Promise 包裹的值
})
  .then(value2 => {
    console.log(value2) // 2
    return 3
  })
  .then(value3 => {
    console.log(value3) // 3
  })
  .catch(err => {
    // 捕获错误
    console.log(err)
  })
```

### `finally` 的用法
> 不管 Promise 最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。
>

```javascript
// loading 加载，不管是成功还是失败，都会触发finally，从而关闭loading
equipmentApi
  .adddingNode(data)
  .then(({ code, message }) => {
  if (code === 200) {
    this.$message.success("新增成功！");
    this.getTreeData();
    this.handleCheck();
    this.cancel();
  } else if (code === 40001) {
  } else {
    this.$message.error(message);
  }
})
  .finally(() => {
  this.buttonLoading = false;
});
```

### 实现 `Promise.all()`
```javascript
// 首先准备几个 promise
const p1 = new Promise((resolve,reject) => {
	setTimeout(()=>{
		resolve('1')
	},100)
})
const p2 = new Promise((resolve,reject) => {
	setTimeout(()=>{
		resolve('2')
	},1000)
})
const p3 = new Promise((resolve,reject) => {
	setTimeout(()=>{
		resolve('3')
	},10000)
})

// 判断是否为 Promise
const isPromise = function (promise) {
	return (
		!!promise &&
		(typeof promise === 'object' || typeof promise === 'function') &&
		(typeof promise.then === 'function')
	)
}

// promiseAll是一个函数，返回一个Promise实例，接受参数是一个数组。
const promiseAll = function(promises) {
	if(!Array.isArray(promises)) {
		return console.log('传入参数必须是一个数组')				
	}
	return new Promise((resolve,reject) => {
		let length = promises.length // 缓存一下有多少个promise
		let count = 0 // 用于记录resolve的数量
		let values = new Array(length) // 用于存储resolve返回的值
		for(let i = 0; i < length; i++) {
			let promise = promises[i]
			// 判断数组的每一项，如果是promise，就进入then，不是就直接放进values数组中返回
			if(isPromise(promise)) {
				promise.then(res => {
					// 记录promise完成的数量
					count++
					// values存储每一个promise的res
					values[i] = res
					// 由于异步代码在最后执行，我们需要在then里面判断promise的完成数量，全部完成就resolve
					// 在for外面判断，是防止它全部都不是promise实例
					if(count === length) {
						resolve(values)
					}
				}).catch(err =>{
					// 当有一个promise实例reject，我们就直接reject
					reject(err)
				})
			} else { // 针对不是promise实例
				count++
				values[i] = promise
			}
		}
		// 当数据的所有项都不是promise实例，我们就在这多判断一次，然后resolve
		if(count === length) {
			resolve(values)
		}
	})
}
```

### Promise 的静态方法
#### `Promise.resolve()`
> 返回 **<font style="color:#DF2A3F;">成功</font>** 的 Promise 对象
>

```javascript
Promise.resolve('abc').then(value => {
  console.log(value) // 'abc'
})
```

#### `Promise.reject()`
> 返回 **<font style="color:#DF2A3F;">失败</font>** 的 Promise 对象
>

```javascript
Promise.reject(new Error('abc')).catch(err => {
  console.log(err)
})
```

#### `Promise.all()`
> `Promise.all()`方法会发起并行的 Promise 异步操作，等 **<font style="color:#DF2A3F;">所有的异步操作全部成功</font>** 后才会执行下一步的 `then` 操作（**<font style="color:#DF2A3F;">等待机制</font>**），有一个失败，就会直接执行`reject`
>

```javascript
let p1 = new Promise((resolve, reject) => {
  resolve(1)
})
let p2 = new Promise((resolve, reject) => {
  resolve(2)
})
const arr = [p1, p2]

Promise.all(arr).then(result => {
  console.log(result) // [ 1, 2 ]
})
```

#### `Promise.race()`
> `Promise.race()`方法会发起并行的 Promise 异步操作，只要 **<font style="color:#DF2A3F;">任何一个异步操作完成</font>**，就立即执行下一步的 then 操作（**<font style="color:#DF2A3F;">赛跑机制</font>**）
>

```javascript
let p1 = new Promise((resolve, reject) => {
  resolve(1)
})
let p2 = new Promise((resolve, reject) => {
  resolve(2)
})
const arr = [p1, p2]

Promise.race(arr).then(result => {
  console.log(result) // 1
})
```

## `async/await`
> `async/await` 是 ES8（ECMAScript 2017）引入的新语法，用来简化 Promise 异步操作
>

+ **注意：**
    1. 如果在 function 中使用了 `await`，则 function 必须被 `async` 修饰
    2. 在 `async` 方法中，第一个 `await` 之前的代码会同步执行，`await` 之后的代码会异步执行

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('ok1')
})
const p2 = new Promise((resolve, reject) => {
  resolve('ok2')
})
const p3 = new Promise((resolve, reject) => {
  resolve('ok3')
})

async function fn() {
  const r3 = await p3
  console.log(r3) // 3
  const r2 = await p2
  console.log(r2) // 2
  const r1 = await p1
  console.log(r1) // 1
}

fn()
```

## EventLoop
> 主线程从任务队列中读取事件，这个过程是不断循环的，所以整个的运行机制称为 event loop
>

### JavaScript 是单线程语言
> JavaScript 是一门单线程执行的编程语言，同一时间只能做一件事
>

### 同步任务和异步任务
+ 同步任务（synchronous）
    - 又叫 **<font style="color:#DF2A3F;">非耗时任务</font>**，指在主线程上排队执行的那些任务
    - 只有前一个任务执行完毕，才能执行后一个任务
+ 异步任务（asynchronous）
    - 又叫 **<font style="color:#DF2A3F;">耗时任务</font>**，异步任务由 JavaScript 委托给宿主环境进行执行
    - 当同步任务执行完成后，会通知 JavaScript 主线程执行异步任务的回调函数

### 同步任务和异步任务的执行过程
1. 同步任务由 JavaScript 主线程次序执行
2. 异步任务委托给宿主环境执行
3. 已完成的异步任务对应的回调函数，会被加入到任务队列中等待执行
4. JavaScript 主线程的执行栈被清空后，会读取任务队列中的回调函数，次序执行
5. JavaScript 主线程不断重复上面的第 4 步

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675212889951-3a74e03a-86ca-4565-927c-d04772fc028d.png)

## 宏任务和微任务
> 微任务先于宏任务执行，所有微任务执行完执行下一个宏任务，一个宏任务执行完执行所有微任务
>

+ 宏任务（macrotask）
    - 异步 Ajax 请求
    - setTimeout、setInterval
    - 文件操作
    - 其它宏任务
+ 微任务（microtask）
    - Promise.then、.catch 和 .finally
    - process.nextTick()
    - 其它微任务

```javascript
console.log('1')

setTimeout(() => {
  console.log('2')
  Promise.resolve().then(() => console.log('3'))
}, 0)

async function asyncCall() {
  console.log('4')
  await Promise.resolve()
  console.log('5')
  setTimeout(() => console.log('6'), 0)
}

asyncCall()

new Promise(resolve => {
  console.log('7')
  resolve()
}).then(() => {
  console.log('8')
  Promise.resolve().then(() => console.log('9'))
})

console.log('10')

// Output: 1 4 7 10 5 8 9 2 3 6
```

