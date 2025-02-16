## 基本类型
### boolean 布尔值
```typescript
let isDone: boolean = false
```

### number 数字
> 所有数字都是浮点数，没有整型。除了支持十进制和十六进制字面量，TS 还支持 ECMAScript 2015 中引入的二进制和八进制字面量
>

```typescript
let decLiteral: number = 6 // 十进制
let hexLiteral: number = 0xf00d // 十六进制
let binaryLiteral: number = 0b1010 // 二进制
let octalLiteral: number = 0o744 // 八进制
```

### string 字符串
```typescript
let name: string = 'bob'
name = 'smith'
```

### [] 数组
```typescript
let list: number[] = [1, 2, 3]

// 数组泛型 - Array<元素类型>
let list: Array<number> = [1, 2, 3]
```

### Tuple 元组
> 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
>

```typescript
// 声明一个元组类型
let x: [string, number]
// 初始化它
x = ['hello', 10] // OK
// 初始化错误，类型不匹配
x = [10, 'hello'] // Error

// 访问元组元素
console.log(x[0].substr(1)) // OK
console.log(x[1].substr(1)) // Error, number 类型没有 substr 方法

// 访问越界元素，越界元素的类型是元组中每个类型的联合类型
x[3] = 'world' // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()) // OK, 'string' 和 'number' 都有 toString
x[6] = true // Error, 布尔不是(string | number)类型
```

### enum 枚举
> 枚举类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等
>

```typescript
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green
console.log(c) // 1

// 默认情况下，从 0 开始为元素编号，你也可以手动的指定成员的数值
enum Color {
  Red = 1,
  Green,
  Blue
}
let c: Color = Color.Green

// 或者全部手动赋值
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4
}
let c: Color = Color.Green
```

### Any
> 任意类型
>

```typescript
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false

// 在任意值上访问任何属性都是允许的
let notSure: any = 4
notSure.ifItExists() // okay, ifItExists 可能在运行时存在
notSure.toFixed() // okay, toFixed 存在（但编译时不检查）

// Object 类型，只允许你给它赋任意值，但不能调用任意方法
let prettySure: Object = 4
prettySure.toFixed() // Error: 属性 'toFixed' 在 'Object' 上不存在

// 当你只知道一部分数据的类型时，any 类型也是有用的
let list: any[] = [1, true, 'free']
list[1] = 100
```

### Void
> 表示没有任何类型，一般用于定义方法的返回值
>

```typescript
function warnUser(): void {
  console.log('This is my warning message')
}

// 声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null
let unusable: void = undefined
```

### Null/Undefined
> null 和 undefined 是所有类型的子类型
>

```typescript
// 严格模式下，null 和 undefined 只能赋值给 void 和它们自己
let u: undefined = undefined
let n: null = null
```

### Never
> never 类型表示的是那些永不存在的值的类型
>

+ **注意：**
    - never 类型是任何类型的子类型，也可以赋值给任何类型
    - 没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）

```typescript
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为 never
function fail() {
  return error('Something failed')
}

// 返回 never 的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```

### Object
> object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型
>

```typescript
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

create(42) // Error
create('string') // Error
create(false) // Error
create(undefined) // Error
```

### 类型断言
> 告诉编译器，我比你更了解这个变量的类型，不要帮我做类型推断了，我已经明确知道这个变量的类型是什么了
>

```typescript
// 1. 尖括号语法
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length

// 2. as 语法
let someValue: any = 'this is a string'
let strLength: number = (someValue as string).length
```

## 变量声明
### let 声明
> 声明一个变量，可以是任意类型的数据
>

#### 块作用域
```typescript
// 块作用域：在块级作用域内声明的变量，只能在该块级作用域内访问
function f(input: boolean) {
  let a = 100

  if (input) {
    // 仍然可以访问 'a'
    let b = a + 1
    return b
  }

  // Error: 'b' 在此处未定义
  return b
}

// 暂时性死区：在块级作用域内，使用 let 声明的变量，不允许在声明之前使用
a++ // 在声明之前使用变量 a，会报错
let a
```

#### 重定义及屏蔽
```typescript
// 重定义：使用 let 声明的变量，不能重复声明
let x = 10
let x = 20 // 错误，不能在1个作用域里多次声明`x`

function f(x) {
  let x = 100 // error: 干扰参数声明
}

// 屏蔽：在一个嵌套作用域里，使用 let 声明的变量，会屏蔽外部作用域的同名变量
// 以下代码会得到正确的结果，因为内层循环的 i 会屏蔽外层循环的 i
function sumMatrix(matrix: number[][]) {
  let sum = 0
  for (let i = 0; i < matrix.length; i++) {
    const currentRow = matrix[i]
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }

  return sum
}
```

#### 块级作用域变量的获取
```typescript
function theCityThatAlwaysSleeps() {
  let getCity

  if (true) {
    let city = 'Seattle'
    getCity = function () {
      return city
    }
  }

  return getCity()
}
```

### const 声明
> 声明一个只读的常量。一旦声明，常量的值就不能被改变
>

```typescript
const numLivesForCat = 9
const kitty = {
  name: 'Aurora',
  numLives: numLivesForCat
}

// Error
kitty = {
  name: 'Danielle',
  numLives: numLivesForCat
}

// all "okay"
kitty.name = 'Rory'
kitty.name = 'Kitty'
kitty.name = 'Cat'
kitty.numLives--
```

### 解构
> 将数组或对象中的元素或属性提取出来，赋值给变量
>

#### 解构数组
```typescript
let input = [1, 2]
let [first, second] = input
console.log(first) // 1
console.log(second) // 2

// 相当于
let first = input[0]
let second = input[1]

// 使用数组来交换两个变量的值
[first, second] = [second, first]

// ...语法创建剩余变量
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [2, 3, 4]
```

#### 对象解构
```typescript
let o = {
  a: 'foo',
  b: 12,
  c: 'bar'
}
let { a, b } = o

// ...语法创建剩余变量
let { a, ...passthrough } = o
let total = passthrough.b + passthrough.c.length

// 属性重命名
let { a: newName1, b: newName2 } = o

// 指定类型
let { a, b }: { a: string; b: number } = o

// 默认值 - 当属性不存在时使用默认值
function keepWholeObject(wholeObject: { a: string; b?: number }) {
  let { a, b = 1001 } = wholeObject
}
```

### 函数声明
```typescript
// 解构也可以用在函数声明中
type C = { a: string; b?: number }
function f({ a, b }: C): void {
  // ...
}

// 可选参数和默认参数
function f({ a, b = 0 } = { a: '' }): void {
  // ...
}
f({ a: 'yes' }) // ok, 默认 b = 0
f() // ok, 默认 { a: '' }, b = 0
f({}) // error, 如果你提供一个参数，那么必须包含 a
```

### 展开
> 将数组或对象展开为另一个数组或对象
>

```typescript
// 数组展开
let first = [1, 2]
let second = [3, 4]
let bothPlus = [0, ...first, ...second, 5] // [0, 1, 2, 3, 4, 5]

// 对象展开
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' }
let search = { ...defaults, food: 'rich' } // { food: 'rich', price: '$$', ambiance: 'noisy' }

// 对象展开会覆盖相同属性
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' }
let search = { food: 'rich', ...defaults } // { food: 'spicy', price: '$$', ambiance: 'noisy' }

// 对象展开只包含对象自身的可枚举属性
class C {
  p = 12
  m() {}
}
let c = new C()
let clone = { ...c }
clone.p // ok
clone.m() // error!
```

## interface 接口
> 接口是一种规范的定义，定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用
>

```typescript
interface FullName {
  firstName: string
  secondName: string
}

function printName(name: FullName) {
  console.log(name.firstName + name.secondName)
}

printName({ firstName: '张', secondName: '三' })
```

### 可选属性


## 类型推断
> 在 TS 中如果变量的声明和初始化是在同一行，可以省略变量类型的声明
>

```typescript
let num = 23
// 相当于
let num: number = 23
```

## `|` `&` 联合类型
> 表示取值可以为多种类型中的一种
>

```typescript
// prompt() ==> 确定返回输入的字符串，取消返回null
let name: string | null = prompt('请输入开机密码：')

let c: boolean | string
c = true
c = 'hello'

// & 表示同时满足条件
let j: { name: string } & { age: number }
j = { name: '孙悟空', age = 23 }
```

## ? 和 !
+ 问号（`**?**`）通常用于可选属性的类型声明

```typescript
interface Person {
  name: string;
  age?: number; // age是可选属性
}
```

+ 感叹号（`**!**`）通常用于非空断言操作符，用于告诉编译器一个变量一定不会是`**null**`或`**undefined**`

```typescript
let name: string | null = "John";
let upperCaseName: string = name!; // 告诉编译器name一定不会是null
```

## `as` 类型断言
> 操作 DOM 经常使用
>

```typescript
let num = 23
let s: string

// 显式的告诉解析器变量的实际类型
s = num as string
// 或 s = <string>num

// 该方法返回值的类型为 HTMLElement，该类型只包含所有标签公共的属性和方法，不包含 a 标签特有的 href 等属性
const aLink = document.getElementById('link')

// TS 推断的类型太广泛，使用类型断言指定更加具体的类型
const aLink = document.getElementById('link') as HTMLAnchorElement
// 另一种语法，实现类型断言
// 但是，该语法，在 react 的 jsx 中使用会报错
const aLink = <HTMLAnchorElement>document.getElementById('link')
```

## `type` 类型别名
```typescript
type myType = 1 | 2 | 3 | 4 | 5
let k: myType
k = 5
// k = 6 // 报错

// 描述一个对象的类型
type myType = {
  name: string,
  age: number
}

let my: myType = {
  name: 'zs',
  age: 23
}
```

## `interface` 接口
```typescript
// 接口用来定义一个类结构，用来定义一个类中应该包含哪些属性和方法
// 同时接口也可以当成类型声明去使用
interface myInterface {
  name: string,
  age: number
}

// 可以定义多个同名接口，并且合并成一个
interface myInterface {
  gender: string
}

const obj: myInterface = {
  name: 'sss',
  age: 111,
  gender: '男'
}

// 接口可以在定义类的时候去限制类的结构
// 接口中的所有的属性都不能有实际的值
// 在接口中所有的方法都是抽象方法
interface myInter {
  name: string,
  sayHello(): void
}

// 定义类时，可以使类去实现一个接口
// 实现接口就是使类满足接口的要求
class Myclass implements myInter {
  name: string
  
  constructor(name: string) {
    this.name = name
  }
  
  sayHello() {
    console.log('大家好~')
  }
}

// 如果两个接口有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用
interface Point2D {
  x: number
  y: number
}
interface Point3D {
  x: number
  y: number
  z: number
}
// 可以使用接口继承来简化上述操作
interface Point2D {
  x: number
  y: number
}
// 使用 extends 关键字实现对象类型的继承
interface Point3D extends Point2D {
  z: number
}
```

## 泛型
```typescript
// 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
function fn<T>(a: T): T {
  return a
}
// 可以直接调用具有泛型的函数
let result = fn(10) // 不指定泛型，TS 可以自动对类型进行推断
let result = fn<string>('hello') // 指定泛型

// 泛型可以同时指定多个
function fn2<T, K>(a: T, b: K): T {
  console.log(b)
  return a
}
fn2<number, string>(123, 'hello')

interface Inter {
  length: number
}
// T extends Inter 表示泛型 T 必须使用 Inter 实现类（子类）
function fn3<T extends Inter>(a: T): nubmer {
  return a.length
}

class MyClass {
  name: T
  constructor(name: T) {
    this.name = name
  }
}
const mc = new MyClass<string>('孙悟空')

// 泛型的类型变量指定为两个
// keyof 关键字用来接收一个对象类型，生成其键名称的联合类型
// 此示例 Key 的类型为 'name' | 'age'
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
let person = { name: 'jack', age: 18 }
getProp(person, 'name')

// 泛型接口
interface IdFunc<Type> {
  id: (value: Type) => Type
  ids: () => Type[]
}
let obj: IdFunc<number> = {
  id(value) { return value },
  ids() { return [1, 3, 5] }
}
```

### 泛型工具类型
#### `Partial`
> `**Partial<Type>**` 用来构造(创建)一个类型，将 Type 的所有属性设置为**<font style="color:#DF2A3F;">可选</font>**。
>

```typescript
type Props =  {
  id: string
  children: number[]
}
// 构造出来的新类型 PartialProps 结构和 Props 相同，但所有属性都变为可选的
type PartialProps = Partial<Props>
```

#### `Required`
> `**Required<Type>**` 用来构造(创建)一个类型，将 Type 的所有属性设置为**<font style="color:#DF2A3F;">必选</font>**
>

```typescript
type Props = {
  id?: string
  children?: number[]
}
// 构造出来的新类型 Required 构造和 Props 相同，但所有属性都变为必选的
type RequirdProps = Required<Props>
```

#### `Readonly`
> `**Readonly<Type>**` 用来构造一个类型，将 Type 的所有属性都设置为 readonly(**<font style="color:#DF2A3F;">只读</font>**)
>

```typescript
type Props =  {
  id: string
  children: number[]
}
// 构造出来的新类型 ReadonlyProps 结构和 Props 相同，但所有属性都变为只读的
type ReadonlyProps = Readonly<Props>

let props: ReadonlyProps = { id: '1', children: [] }
// props.id = '2' // 编译出错
```

#### `Pick`
> `**Pick<Type, Keys>**` 从 Type 中**<font style="color:#DF2A3F;">选择一组属性</font>**来**<font style="color:#DF2A3F;">构造新类型</font>**
>

+ `**Type**` 是对象类型名称
+ `**Keys**` 是要选择 Type 类型中的属性名

```typescript
interface Props {
  id: string
  title: string
  children: number[]
}
// 构造出来的新类型 PickProps，只有 id 和 title 两个属性类型
type PickProps = Pick<Props, 'id' | 'title'>
```

#### `Omit`
> `**Omit<T, K>**` 类型让我们可以从另一个对象类型中**<font style="color:#DF2A3F;">剔除某些属性</font>**，并**<font style="color:#DF2A3F;">创建一个新的对象类型</font>**
>

+ `**T**` 是对象类型名称
+ `**K**` 是剔除 T 类型中的属性名

```typescript
type UserProps = {
  name?: string,
  age?: number,
  sex?: string
}
// 将 sex 从 UserProps 类型中剔除
type NewUserProps = Omit(UserProps, 'sex')
// 等价于
type NewUserProps = {
  name?: string,
  age?: number
}
```

## `typeof`
> 用来根据已有变量的值，获取该值的类型，来简化类型的书写
>

```typescript
let p = { x: 1, y: 2 }
function formatPoint(point: { x: number; y: number }) {}

// 可以使用 typeof 关键字获取 p 变量的类型，来简化代码
function formatPoint(point: typeof p) {}

formatPoint(p)
```

## `keyof`
> 用来获取指定类型中**<font style="color:#DF2A3F;">所有键名组合的类型</font>**
>

```typescript
// [key in keyof Props] 即为 [key in ('a' | 'b' | 'c')]
type Props = { a: number; b: string; c: boolean }
type Type3 = { [key in keyof Props]: number }

// Props[keyof Props] 即为 Props['a' | 'b' | 'c']
type TypeA = Props[keyof Props] // string | number | boolean
```

## 索引签名类型
> 当无法确定对象中有哪些属性时，就使用索引签名类型
>

```typescript
interface AnyObject {
  // key 只是一个占位符，可以设置为任意合法的变量名
  [key: string]: number
}

let obj: AnyObject = {
  a: 1,
  b: 2
}
```

## 映射类型
+ **注意：**映射类型**<font style="color:#DF2A3F;">只能在类型别名中使用</font>**，不能在接口中使用

```typescript
type PropKeys = 'x' | 'y' | 'z'
type Type1 = { x: number; y: number; z: number }
// 可以简化为
type Type2 = { [Key in PropKeys]: number }

// [key in keyof Props] 即为 [key in ('a' | 'b' | 'c')]
type Props = { a: number; b: string; c: boolean }
type Type3 = { [key in keyof Props]: number }
```

### 索引访问类型
> 用来查询属性的类型
>

+ **注意：**`**[]**` 中的属性必须存在于被查询类型中

```typescript
type Props = { a: number; b: string; c: boolean }
type TypeA = Props['a'] // number

// 同时查询多个索引的类型
type TypeA = Props['a' | 'b'] // string | number

// Props[keyof Props] 即为 Props['a' | 'b' | 'c']
type TypeA = Props[keyof Props] // string | number | boolean
```

## 获取函数参数和返回值类型
```typescript
const fn = (s: object, n: number): string => typeof s[n] === 'string' ? s[n] : ''

// 获取函数的参数类型 Parameters<typeof fn> ==> [s: object, n: number]
const options: Parameters<typeof fn>[0] = {}

// 获取函数的返回值类型 ReturnType<typeof fn> ==> string
const res: ReturnType<typeof fn> = '123'
```

## class 类
### `class` 的基本使用
```typescript
class Person {
  // 成员变量
  name: string
  age: number
  
  // 构造函数
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  // 成员方法
  print() {
    console.log(`姓名：${this.name}，年龄：${this.age}`)
  }
}

const p = new Person('zs', 23)
p.print() // 姓名：zs，年龄：23
console.log(p.name, p.age) // zs 23
```

### 抽象类
> 以 `**abstract**` 关键字声明的类是抽象类
>

+ 特点：
    - 抽象类不能用来创建对象
    - 抽象类是专门用来被继承的类
    - 抽象类中可以添加抽象方法

```typescript
abstract class Animal {
  name: string
  
  constructor(name: string) {
    this.name = name
  }
  
  // 定义一个抽象方法
  // 抽象方法使用 abstract 开头，没有方法体
  // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
  abstract sayHello(): void
}

class Dog extends Animal {
  sayHello() {
    console.log('汪汪汪！')
  }
}

const dog = new Dog('旺财')
dog.sayHello() // '汪汪汪'
```

### get 和 set 
```typescript
class Person {
  // 通过在类中添加方法使得私有属性可以被外部访问
  private _name: string
  private _age: number
  
  constructor(name: string, age: number) {
    this._name = name
    this._age = age
  }
  
  // getter 方法用来读取属性
  // setter 方法用来设置属性
  
  get name() {
    return this._name
  }

  set name(value) {
    this._name = value
  }

  get age() {
    return this._age
  }

  set age(value) {
    if (value >=0 ) {
      this._age = value 
    }
  }
}

const per = new Person('孙悟空', 23)
per.name('猪八戒')
per.age(-33)
console.log(per) // Person {_name: "猪八戒", _age: 23}

class C {
  // 可以直接将属性定义在构造函数中
  constructor(public name: string, public age: number) {}
}
// 等价于
class C {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
const c = new C('张三', 23)
console.log(c) // C {name: "张三", age: 23}
```

### `public`、`private`、`protected` 的区别
+ `**public**` 公共属性，在**该类**和**实例化对象**及其**子类**中都可以访问
+ `**private**` 私有属性，只能在**该类**中访问
+ `**protected**` 受保护的属性，只能在**该类**及其**子类**中访问

```typescript
class Person {
  // 公共变量
  public name: string
  // 私有变量
  private age: number
  // 受保护的变量
  protected gender = '男'
  
  // 构造函数
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  // 公共方法
  public print() {
    console.log(`姓名：${this.name}，年龄：${this.age}`)
    this.hi()
  }
  // 私有方法
  private hi() {
    console.log('hello ~~~')
  }
}

// 子类通过 extends 关键字继承父类的公共属性和方法
class SubPerson extends Person {
  public subPrint() {
    console.log(this.gender)
  }

  constructor(name: string, age: number) {
    // 如果在子类中写了构造函数，在子类构造函数中必须对父类构造函数进行调用
    super(name) // super 关键字用来 调用父类的构造函数，也可调用父类的方法
    this.age = age
  }
}

const p = new Person('zs', 23)
console.log(p.name) // zs
p.print() // 姓名：zs，年龄：23
          // hello ~~~

const subP = new SubPerson('ls', 28)
subP.subPrint() // 男

// 属性 gender 是受保护的，只能在 Person 类及其 子类 中访问
// console.log(subP.gender) // TS编译错误：Property 'gender' is protected and only accessible within class 'Person' and its subclasses.

// 属性 gender 是受保护的，只能在 Person 类及其 子类 中访问
// console.log(p.gender) // TS编译错误：Property 'gender' is protected and only accessible within class 'Person' and its subclasses.

// 属性 age 是私有的，只能在 Person 类中访问
// console.log(p.age) // TS编译错误：Property 'age' is private and only accessible within class 'Person'.

// 属性 hi 是私有的，只能在 Person 类中访问
// p.hi() // TS编译错误：Property 'hi' is private and only accessible within class 'Person'.

```

## TS 在 React 中的应用
1. **安装和配置TS**

首先，需要安装`**TypeScript**`和`**ts-loader**`，可以使用`**npm**`或`**yarn**`进行安装：

```shell
npm install typescript ts-loader --save-dev
```

然后，在`**webpack**`配置文件中添加对`**.ts**`和`**.tsx**`文件的支持：

```typescript
module.exports = {
  // ...
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
```

2. **在React组件中使用TS**

在React组件中，可以使用TS来定义`**Props**`和`**State**`的类型，以及函数的参数和返回值的类型。例如：

```tsx
interface Props {
  name: string;
  age: number;
}

interface State {
  count: number;
}

class MyComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    const { name, age } = this.props;
    const { count } = this.state;

    return (
      <div>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Count: {count}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

3. **使用TS定义接口或类型别名**

在React组件中，我们可以使用TS定义接口或类型别名，来更好地描述组件内部的数据结构。例如：

```tsx
interface User {
  name: string;
  age: number;
}

type UserList = User[];

const userList: UserList = [
  { name: 'John', age: 25 },
  { name: 'Mary', age: 30 }
];

const MyComponent: React.FC = () => {
  return (
    <ul>
      {userList.map(user => (
        <li key={user.name}>
          Name: {user.name}, Age: {user.age}
        </li>
      ))}
    </ul>
  );
}
```

## TS 配置选项
> `**tsconfig.json**` 是 TS 编译器的配置文件
>

### `include`
> 用来指定哪些 ts 文件需要被编译
>

+ `******` 表示任意目录
+ `*****` 表示任意文件

```json
"include": [
  "./src/**/*"
]
```

### `exclude`
> 不需要被编译的文件目录
>

+ 默认值：`**["node_modules", "bower_components", "jspm_packages"]**`

```json
"exclude": [
  "./src/hello/**/*"
]
```

### `compilerOptions`
> 编译器选项
>

#### `target`
> 用来指定 ts 被编译为 ES 的版本
>

```json
"compilerOptions": {
  "target": "ES2015"
}
```

#### `module`
> 用来指定要使用的模块化规范
>

```json
"compilerOptions": {
  "module": "es2015"
}
```

#### `lib`
> 用来指定项目中要使用的库
>

```json
"compilerOptions": {
  "lib": ["es6", "dom"]
}
```

#### `outDir`
> 用来指定编译后文件所在的目录
>

```json
"compilerOptions": {
  "outDir": "./dist"
}
```

#### `outFile`
> 用来将代码合并为一个文件
>

+ 设置了 outFile 后，所有的全局作用域中的代码会合并到同一个文件中

```json
"compilerOptions": {
  "outFile": "./dist/app.js"
}
```

#### `allowJs`
> 是否对 js 文件进行编译，默认为 `**false**`
>

```json
"compilerOptions": {
  "allowJs": true
}
```

#### `checkJs`
> 是否检查 js 代码是否符合语法规范，默认为 `**false**`
>

```json
"compilerOptions": {
  "checkJs": true
}
```

#### `removeComments`
> 是否移除注释，默认为 `**false**`
>

```json
"compilerOptions": {
  "removeCommens": true
}
```

#### `noEmit`
> 是否生成编译后的文件，默认为 `**false**`
>

```json
"compilerOptions": {
  "noEmit": false
}
```

#### `noEmitOnError`
> 当有错误时是否生成编译后的文件，默认为 `**false**`
>

```json
"compilerOptions": {
  "noEmitOnError": true
}
```

#### `alwaysStrict`
> 用来设置编译后的文件是否使用严格模式，默认为 `**false**`
>

```json
"compilerOptions": {
  "alwaysStrict": true
}
```

#### `noImplicitAny`
> 是否允许隐式的 `**any**` 类型，默认为 `**false**`
>

```json
"compilerOptions": {
  "noImplicitAny": true
}
```

#### `noImplicitThis`
> 是否允许不明确类型的 `**this**`，默认为 `**false**`
>

```json
"compilerOptions": {
  "noImplicitThis": true
}
```

#### `strictNullChecks`
> 严格检查空值，默认为 `**false**`
>

```json
"compilerOptions": {
  "strictNullChecks": true
}
```

#### `strict`
> 所有严格检查的总开关
>

```json
"compilerOptions": {
  "strict": true
}
```

