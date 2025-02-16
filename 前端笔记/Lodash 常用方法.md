## 安装
```shell
npm install lodash

# 或 安装 lodash-es，使用（按需引入） import { cloneDeep } from 'lodash-es'
npm install lodash-es
```

## 常用方法
### 数组
#### compact()
> 去除数组中的假值元素（`**false**`, `**null**`, `**0**`, `**""**`, `**undefined**`, 和 `**NaN**`）。
>

+ **语法：**`**_.compact(array)**`
+ **参数：**`**array**` 要处理的数组
+ **返回值：**一个新数组，其中包含所有真值元素。
+ **说明：**该方法不会改变原数组。

```javascript
import compact from 'lodash/compact';

const arr = [0, 1, false, 2, '', 3];
const result = _.compact(arr);
console.log(result); // [1, 2, 3]
```

### 集合
#### sample()
> 从数组中随机选择一个元素。
>

+ **语法：**`**_.sample(collection)**`
+ **参数：**`**collection**` 要从中选择元素的集合。可以是数组或对象。如果是对象，则返回其键值对中的一个。
+ **返回值：**集合中的随机元素。如果集合为空，则返回 `**undefined**`。

```javascript
import sample from 'lodash/sample';

const arr = [1, 2, 3, 4, 5];
const randomElement = _.sample(arr);
console.log(randomElement); // 输出 3 或 4 或 2 或 1 或 5
```

#### sampleSize()
> 从数组或集合中随机选择指定数量的元素。
>

+ **语法：**`**_.sampleSize(collection, [n=1])**`
+ **参数：**
    - `**collection**` 要从中选择元素的数组或集合。
    - `**n**`（可选）要选择的元素数量。默认为1。
+ **返回值：**一个包含随机选择的元素的新数组。如果n大于collection的长度，则返回整个collection。
+ **说明：**该方法不会改变原数组。

```javascript
import sampleSize from 'lodash/sampleSize';

const arr = [1, 2, 3, 4, 5];
const result = _.sampleSize(arr, 3);
console.log(result); // 输出可能是 [3, 1, 5]
```

#### shuffle()
> 将数组或集合中的元素随机打乱顺序。
>

+ **语法：**`**_.shuffle(collection)**`
+ **参数：**`**collection**` 要打乱的数组或集合。可以是数组、集合或类数组对象。
+ **返回值：**一个新的打乱顺序的数组。
+ **说明：**该方法不会改变原数组。

```javascript
import shuffle from 'lodash/shuffle';

const array = [1, 2, 3, 4, 5];
const shuffledArray = _.shuffle(array);
console.log(shuffledArray); // 输出：一个随机打乱顺序的新数组
```

#### orderBy()
> 根据提供的键对数组或对象进行排序。
>

+ **语法：**`**_.orderBy(collection, [iteratees=[_.identity]], [orders])**`
+ **参数：**
    - `**collection**` 要排序的数组或对象。
    - `**iteratees**` 要排序的键或排序函数。默认情况下，使用 identity 函数。
    - `**orders**` 排序顺序。可以是 'asc' 或 'desc' 的字符串或字符串数组。默认情况下，使用 'asc'。
+ **返回值：**排序后的数组或对象。
+ **说明：**该方法不会改变原数组。****

```javascript
import orderBy from 'lodash/orderBy'

const people = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 20 },
  { name: 'David', age: 35 }
];

const sortedByAge = _.orderBy(people, ['age'], ['asc']); // 按年龄升序排序
console.log(sortedByAge); // [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 20 }, { name: 'John', age: 30 }, { name: 'David', age: 35 }]
```

#### groupBy()
> 根据指定条件将数组分组，并返回一个以组名作为键，以组内元素作为值的对象。
>

+ **语法：**`**_.groupBy(collection, [iteratee=_.identity])**`
+ **参数：**
    - `**collection**`: 要分组的数组或对象。
    - `**iteratee**`: 每个元素上执行的函数，以生成用于分组的键。默认是`**_.identity。**`
+ **返回值：**一个以组名作为键，以组内元素作为值的对象。

```javascript
import groupBy from 'lodash/groupBy'

const array = [
  { name: 'John', age: 30, group: 'A' },
  { name: 'Jane', age: 25, group: 'B' },
  { name: 'Bob', age: 35, group: 'A' },
  { name: 'Alice', age: 28, group: 'B' }
];
const grouped = _.groupBy(array, (item) => item.group); // 根据 'group' 属性分组
console.log(grouped); // {A: [{ name: 'John', age: 30, group: 'A' }, { name: 'Bob', age: 35, group: 'A' }], B: [{ name: 'Jane', age: 25, group: 'B' }, { name: 'Alice', age: 28, group: 'B' }]
```

### 对象
#### pickBy()
> 从对象中选择满足条件的键值对，并返回一个新的对象。
>

+ **语法：**`**_.pickBy(object, [predicate=_.identity])**`
+ **参数：**
    - `**object**` 需要进行操作的对象。
    - `**predicate**` 用于过滤键值对的函数。默认情况下，它选择所有`**true**`值。
+ **返回值：**返回一个新的对象，该对象仅包含满足条件的键值对。

```javascript
import pickBy from 'lodash/pickBy';

const obj = { a: 1, b: 2, c: 3, d: 4 };
const result = pickBy(obj, (value, key) => key !== 'a'); // 过滤掉键为'a'的键值对
console.log(result); // { b: 2, c: 3, d: 4 }
```

### 函数
#### debounce
> 在函数被频繁调用时，限制函数的调用频率。在指定的时间间隔内，只允许函数执行一次。
>

+ **语法：**`**_.debounce(func, [wait=0], [options=])**`
+ **参数：**
    - `**func**` 要限制调用频率的函数。
    - `**wait**` 函数被允许再次调用之前需要等待的时间，默认为0。
    - `**options**` 可选参数，用于配置debounce的行为。
+ **返回值：**一个新的函数，在指定的时间间隔内只执行一次原始函数。

```javascript
import debounce from 'lodash/debounce';

const debouncedFunction = debounce(function () {
  console.log('Debounced function called')
}, 250) // 限制函数在250毫秒内只执行一次
debouncedFunction() // 第一次调用，函数被立即执行
```

#### throttle()
> 节流函数，在指定的时间间隔内只执行一次回调函数。
>

+ **语法：**`**_.throttle(func, [wait=0], [options=])**`
+ **参数：**
    - `**func**` 要节流的函数。
    - `**wait**` 节流时间间隔，默认是 0。
    - `**options**` 可选项，对象类型，包含 `**leading**` 和 `**trailing**` 两个属性。`**leading**` 表示是否在开始时立即执行，默认是 `**true**`；`**trailing**` 表示是否在结束时执行，默认是 `**true**`。
+ **返回值：**返回节流的函数

```javascript
import throttle from 'lodash/throttle';

const throttledFunction = throttle(function () {
  console.log('Throttled function called')
}, 1000) // 每秒执行一次throttledFunction(); // 第一次调用会立即执行，之后每秒执行一次
throttledFunction(); // 1秒后执行
```

### 语言
#### cloneDeep()
> 创建一个深拷贝的克隆，包括嵌套对象和数组。
>

+ **语法：**`**_.cloneDeep(value)**`
+ **参数：**`**value**` 要深拷贝的值
+ **返回值：**返回拷贝后的值

```javascript
import cloneDeep from 'lodash/cloneDeep';

const obj = { a: { b: { c: 1 } } };
const clonedObj = cloneDeep(obj); // 创建一个深拷贝的克隆对象
console.log(clonedObj); // { a: { b: { c: 1 } } }
```

#### isEmpty()
> 检查一个对象是否为空。
>

+ **语法：**`**_.isEmpty(value)**`
+ **参数：**`**value**` 要检查的对象。可以是任何类型的值。
+ **返回值：**如果对象为空，返回 true，否则返回 false。

```javascript
import isEmpty from 'lodash/isEmpty';

console.log(isEmpty({})); // true，空对象是空的。
console.log(isEmpty('')); // true，空字符串是空的。
console.log(isEmpty(0)); // true，空数值是空的。
console.log(isEmpty(null)); // true，null是空的。
console.log(isEmpty(undefined)); // true，undefined是空的。
console.log(isEmpty([])); // true，空数组是空的。
console.log(isEmpty(new Map())); // true，空Map是空的。
console.log(isEmpty(new Set())); // true，空Set是空的。
```

