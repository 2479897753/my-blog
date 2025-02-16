## 安装
```shell
npx create-react-app my-app

# 创建 TypeScript 应用
npx create-react-app my-app --template typescript
```

## 项目结构
```shell
my-app
├── README.md
├── node_modules
├── package.json
├── package-lock.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js
```

## 自动格式化代码配置
1. 安装依赖

```shell
npm install --save husky lint-staged prettier
```

2. 在 package.json 根节点配置以下内容

```json
{
  "dependencies": {
    // ...
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
      "prettier --write"
    ]
  },
  "scripts": {
    // ...
  }
}
```

## 分析打包大小配置
1. 安装依赖

```shell
npm install --save source-map-explorer
```

2. 在 package.json 增加以下命令

```json
{
  // ...
  "scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js'",
    // ...
  },
  // ...
}
```

3. 打包运行分析脚本

```shell
npm run build
npm run analyze
```

## 添加 CSS 重置样式表
+ 添加在 index.css 第一行

```css
/* index.css */
@import-normalize;

/* ... */
```

## 样式的书写方式
### 内联样式
> 使用JavaScript对象定义CSS
>

```jsx
const style = {
  color: 'blue',
  fontSize: '20px'
}

const MyComponent = () => <div style={style}>Hello World!</div>
```

### CSS 模块
> 将CSS文件与组件文件放在一起，并导入CSS类
>

```css
/* MyComponent.module.css */
.text-blue {
  color: blue;
}
```

```jsx
import React from 'react'
import styles from './MyComponent.module.css'

const MyComponent = () => <div className={styles.text_blue}>Hello World!</div>
```

### CSS-in-JS 库
> 定义响应式组件级别的样式
>

```jsx
import styled from 'styled-components'

const StyledDiv = styled.div`
  color: blue;
  font-size: 20px;
`

const MyComponent = () => <StyledDiv>Hello World!</StyledDiv>
```

### 全局 CSS 文件
> 在组件中直接引用全局的CSS类
>

```css
/* global.css */
.global-text-blue {
  color: blue;
}
```

```jsx
import React from 'react'
// 确保在入口文件 index.js 或其他被引用的文件中引入全局CSS
import './global.css'

const MyComponent = () => <div className='global-text-blue'>Hello World!</div>
```

## 动态 import()
> `**import()**` 类函数形式将模块名称作为参数并返回一个 `**Promise**`
>

```javascript
const moduleA = 'Hello'

export { moduleA }
```

```javascript
import React, { Component } from 'react'

class App extends Component {
  handleClick = async () => {
    try {
      const { moduleA } = await import('./moduleA')
      // Use moduleA
    } catch (error) {
      // Handle failure
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    )
  }
}

export default App
```

## 绝对导入
1. 配置 `**jsconfig.json**` 文件，如果文件不存在，需手动创建

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

2. 如果导入位于 `**src/components/Button.js**` 的模块，可以这样导入模块

```javascript
import Button from 'components/Button'
```

## 环境变量
> 创建自定义环境变量必须以 `**REACT_APP_**`** **开头，除了 `**NODE_ENV**` 之外的任何其他变量都被忽略
>

+ `**.env**` - 在所有的环境中被载入
+ `**.env.local**` - 在所有的环境中被载入，但会被 git 忽略
+ `**.env.development**`、`**.env.test**`、`**.env.production**` - 只在特定环境中被载入
+ `**.env.development.local**`、`**.env.test.local**`、`**.env.production.local**` - 只在特定环境中被载入，但会被 git 忽略

```shell
REACT_APP_NOT_SECRET_CODE=abcdef
```

+ 扩展当前 .env 文件的局部变量

```shell
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
```

## 手动配置代理
1. 安装 `**http-proxy-middleware**`

```shell
npm install http-proxy-middleware --save
```

2. 创建 `**src/setupProxy.js**`

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  )
}
```

## 创建组件
> React 组件是返回标签的 JavaScript 函数
>

+ **注意：**
    - React 组件的名称必须以大写字母开头
    - 如果标签和 `**return**` 关键字不在同一行，必须使用一对括号将其包裹
    - 不要在组件内部定义组件

```jsx
function MyButton() {
  return <button>I'm a button</button>
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  )
}
```

## 使用 JSX 编写标签
+ **注意：**
    - 只能返回一个根元素
    - 标签必须闭合
    - 使用驼峰式命名法给大部分属性命名

```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  )
}
```

## 添加样式
> 使用 `**className**` 来指定一个 CSS 的 class
>

```jsx
<img className="avatar" />
```

**使用 classnames 包优化类名处理：**

> 在React中使用 classnames 包可以方便地根据不同的条件动态地添加或移除CSS类名。
>

1. **安装**

```shell
npm install classnames
```

2. **使用**

> `**classnames**`函数接受任意数量的参数，可以是字符串、对象或数组。
>

+ 字符串参数将被简单地添加到最终的类名中
+ 对象参数的键是类名，值是一个布尔值，如果为真则添加该类名
+ 数组参数可以嵌套其他字符串、对象或数组。

```jsx
import classNames from 'classnames'

function Button({ primary, danger, disabled }) {
  const buttonClasses = classNames('button', {
    'button-primary': primary,
    'button-danger': danger,
    'button-disabled': disabled
  })

  return (
    <button className={buttonClasses} disabled={disabled}>
      Click me
    </button>
  )
}
```

## 显示数据
+ **注意：**`**style={{}}**` 并不是一个特殊的语法，而是 `**style={ }**` JSX 大括号内的一个普通 `**{}**` 对象

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90
}

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className='avatar'
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  )
}
```

## 条件渲染
+ **说明：**如果不想渲染任何东西，可以直接返回 `**null**`
1. **if 语句**

```jsx
let content
if (isLoggedIn) {
  content = <AdminPanel />
} else {
  content = <LoginForm />
}
return <div>{content}</div>
```

2. **三目运算符（**`?``:`**）**

```jsx
return <div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
```

3. **逻辑与运算符（&&）**

```jsx
return (
  <div>
    {/* 当不需要 else 分支时，可以简化成逻辑 && 语法 */}
    {isLoggedIn && <AdminPanel />}
  </div>
)
```

## 渲染列表
+ **注意：**对于列表中的每一个元素，都应该设置一个唯一标识 `**key**`

```jsx
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 }
]

export default function ShoppingList() {
  const listItems = products.map(product => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  ))

  return <ul>{listItems}</ul>
}
```

:::info
**Tips**

+ 如果想为每个列表项显示多个 DOM 节点，可使用 `**Fragment**` 语法，Fragment 语法不会被渲染为真实DOM，其简写形式 `**<> </>**` 无法接受 key 值，所以要写完整写法

:::

```jsx
import { Fragment } from 'react'

// ...

const listItems = people.map(person => (
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
))
```

## 响应事件
+ **注意：**`**onClick={handleClick}**` 的结尾没有小括号！不要 **调用** 事件处理函数：只需 **把函数传递给事件** 即可

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!')
  }

  return <button onClick={handleClick}>Click me</button>
}
```

:::info
**捕获阶段事件**

+ 极少数情况下，可能需要捕获子元素上的所有事件，**即便它们阻止了传播**，通过在事件名称末尾添加 `**Capture**` 来实现

:::

```jsx
<div onClickCapture={() => { /* 这会首先执行 */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

## children prop
> 在 JSX 中，当一个组件被其他元素包裹时，这些元素会被传递给父组件的 `**children**` prop。
>

```jsx
import Avatar from './Avatar.js'

function Card({ children }) {
  return <div className='card'>{children}</div>
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  )
}
```

## key 保持组件状态
> 当用户在两个组件间切换时，设置不同的 key 确保每次都渲染新的组件实例
>

+ **key 的作用：**
    1. **唯一性：**每个列表中的 `**key**` 值应当是唯一的，确保 React 能准确区分每个元素。通常推荐使用数据的唯一标识符（如 ID）作为 `**key**`
    2. **性能优化：**`**key**` 使 React 能够更有效地比较和更新 DOM。当列表中的元素发生变化时，React 可以利用 `**key**` 快速识别哪些元素需要被重新渲染，这样可以减少不必要的 DOM 操作，提高性能
    3. **保持组件状态：**在列表中，`**key**` 确保每个组件实例的状态是独立的。当用户在两个组件间切换时，设置不同的 key 确保每次都渲染新的组件实例

```jsx
import React, { useState } from 'react'

const ComponentA = () => <div>Component A</div>
const ComponentB = () => <div>Component B</div>

const App = () => {
  const [view, setView] = useState('A')

  return (
    <div>
      <button onClick={() => setView('A')}>Show Component A</button>
      <button onClick={() => setView('B')}>Show Component B</button>
      {view === 'A' && <ComponentA key='componentA' />}
      {view === 'B' && <ComponentB key='componentB' />}
    </div>
  )
}

export default App
```

## 组件通讯
### 父向子传值 - props
> 父组件通过 `**props**` 向子组件传递数据，子组件以只读方式接收并使用这些数据，从而实现单向数据流。
>

```jsx
// 父组件
export default function Profile() {
  return <Avatar person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />
}

// 子组件
// 在没有指定值的情况下给 prop 一个默认值
// 注意：默认值仅在缺少 prop 或值为 undefined 时生效
function Avatar({ person, size = 100 }) {
  return (
    <img
      className='avatar'
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}
```

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className='card'>
      <Avatar person={person} size={size} isSepia={isSepia} thickBorder={thickBorder} />
    </div>
  )
}

// 上面代码可以使用展开语法简化
function Profile(props) {
  return (
    <div className='card'>
      <Avatar {...props} />
    </div>
  )
}
```

### 子向父传值 - 回调函数
> 父组件将回调函数作为 props 传递给子组件，子组件通过调用该函数向父组件传递数据。
>

```jsx
// 父组件
const ParentComponent = () => {
  const item = {
    id: 1,
    text: '写作业',
    done: true
  }
  const onToggle = id => {}
  return <Todo {...item} onToggle={onToggle} />
}

// 子组件
const Todo = ({ id, onToggle }) => {
  return <li onClick={() => onToggle(id)}></li>
}
```

### Refs - useRef
> 用于保存对函数组件中某个 DOM 元素的引用
>

+ **语法：**`**const ref = useRef(initialValue)**`
+ **参数：**`**initialValue**` - ref 对象的 current 属性的初始值
+ **返回值：**一个可变的 ref 对象，其 `**.current**` 属性被初始化为 initialValue
+ **注意：**
    - 改变 `**ref.current**` 属性时，React 不会重新渲染组件
    - 不要在渲染期间写入或者读取 `**ref.current**`

```jsx
import { useRef } from 'react'

export default function Form() {
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>聚焦输入框</button>
    </>
  )
}
```

#### 使用 ref 回调管理 ref 列表
+ **ref 回调：**将函数传递给 ref 属性。当需要设置 ref 时，React 将传入 DOM 节点来调用你的 ref 回调，并在需要清除它时传入 null。

```jsx
import { useRef, useState } from 'react'

export default function CatFriends() {
  const [catList, setCatList] = useState(setupCatList)
  const itemsRef = useRef(null)

  function scrollToCat(cat) {
    const map = getMap()
    const node = map.get(cat)
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }

  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[9])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map(cat => (
            <li
              key={cat}
              ref={node => {
                const map = getMap()
                if (node) {
                  map.set(cat, node)
                } else {
                  map.delete(cat)
                }
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function setupCatList() {
  const catList = []
  for (let i = 0; i < 10; i++) {
    catList.push('https://loremflickr.com/320/240/cat?lock=' + i)
  }

  return catList
}
```

#### 访问另一个组件的 DOM 节点
+ **注意：**React 不允许组件访问其他组件的 DOM 节点，可以通过 `**forwardRef**` API 向外暴露

```jsx
import { forwardRef, useRef } from 'react'

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />
})

export default function Form() {
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>聚焦输入框</button>
    </>
  )
}
```

#### 使用命令句柄暴露一部分 API
+ 通过 `**useImperativeHandle**` API 可以限制需要暴露的功能，在这种情况下，ref “句柄”不是 DOM 节点，而是你在 `**useImperativeHandle**` 调用中创建的自定义对象

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react'

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null)
  useImperativeHandle(ref, () => ({
    // 只暴露 focus，没有别的
    focus() {
      realInputRef.current.focus()
    }
  }))
  return <input {...props} ref={realInputRef} />
})

export default function Form() {
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>聚焦输入框</button>
    </>
  )
}
```

### Context API - useContext/createContext
> 从组件树中离得最近的那个匹配的 SomeContext.Provider 的 value 属性获取上下文数据
>

+ **语法：**`**const value = useContext(SomeContext)**`
+ **参数：**`**SomeContext**` - 一个 React.createContext 的返回值，即上下文对象
+ **返回值：**当前组件最近的 SomeContext.Provider 的 value 属性
1. **创建 Context**

> 通过 `**export const MyContext = createContext(defaultValue)**` 创建并导出 context
>

```jsx
// ThemeContext.js
import { createContext } from 'react'

export const ThemeContext = createContext(null)
```

2. **提供 Context**

> 在父组件中把 children 包在 `**<MyContext.Provider value={...}>**` 中来提供 context
>

```jsx
// App.js
import { ThemeToggle } from './ThemeToggle'
import { ThemeContext } from './ThemeContext'

function App() {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeToggle />
      <div>
        <h1>Hello, world!</h1>
      </div>
    </ThemeContext.Provider>
  )
}
export default App
```

3. **使用 Context**

> 在无论层级多深的任何子组件中，把 context 传递给 `**useContext(MyContext)**` Hook 来读取它
>

```jsx
// ThemeToggle.js
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div>Current theme: {theme}</div>
    </div>
  )
}
```

### EventBus
> EventBus 是一种更松散的组件通信方式，它可以在不直接相互引用的情况下让组件相互通信。
>

```jsx
import React, { useEffect } from 'react'
import { EventEmitter } from 'events'

const eventBus = new EventEmitter()

// 子组件1：发布事件
const Publisher = () => {
  const publish = () => {
    eventBus.emit('message', 'Hello from Publisher!')
  }

  return <button onClick={publish}>Publish Message</button>
}

// 子组件2：订阅事件
const Subscriber = () => {
  useEffect(() => {
    const handleMessage = message => {
      alert(message)
    }

    eventBus.on('message', handleMessage)

    // 清理订阅
    return () => {
      eventBus.off('message', handleMessage)
    }
  }, [])

  return <div>Subscriber waiting for messages...</div>
}

// 主应用
const App = () => {
  return (
    <div>
      <h1>EventBus Example</h1>
      <Publisher />
      <Subscriber />
    </div>
  )
}

export default App
```

## 常用组件
### [`<Fragment>(<>)`](https://zh-hans.react.dev/reference/react/Fragment)
> `**<Fragment>**` 可以简写为 `**<>...</>**`，它可以将多个 JSX 元素组合成一个片段，而不渲染任何额外的 DOM 元素
>

+ **注意：**`**key**` 可以传递给 `**<Fragment>**`，但不能传递给 `**<>...</>**`

```jsx
// 返回多个元素
function Post() {
  return (
    <>
      <PostTitle />
      <PostBody />
    </>
  )
}

// 渲染 Fragment 列表
function Blog() {
  return posts.map(post => (
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  ))
}
```

### [`<StrictMode>`](https://zh-hans.react.dev/reference/react/StrictMode)
> 启用严格模式，检查代码中潜在的错误和问题，并提供提示信息
>

+ **严格模式启用了以下****<font style="color:#DF2A3F;">仅在开发环境</font>****下有效的行为：**
    - 组件将 **额外重新渲染一次** 以查找由于非纯渲染而引起的错误
    - 组件将 **额外重新运行一次 Effect** 以查找由于缺少 Effect 清理而引起的错误
    - 组件将 **额外重新运行一次 refs 回调** 以查找由于缺少 ref 清理函数而引起的错误
    - 组件将被 **检查是否使用了已弃用的 API**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### [`<Suspense>`](https://zh-hans.react.dev/reference/react/Suspense)
> 在组件渲染过程中，可以显示一个 loading 组件，直到组件真正渲染完成
>

+ **参数：**
    - `**children**` - 真正的 UI 渲染内容
    - `**fallback**` - 真正的 UI 未渲染完成时显示的组件
+ **注意：**
    - 只有启用了 Suspense 的数据源才会激活 Suspense 组件，它们包括：
        * 支持 Suspense 的框架如 Relay 和 Next.js
        * 使用 [lazy](#t9gWE) 懒加载组件代码
        * 使用 [use](#NS4ps) 读取缓存的 Promise 值
    - Suspense 无法 监测在 Effect 或时间处理程序中获取数据的情况

```jsx
// 当内容正在加载时显示后备方案
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>

  // 逐步加载内容
<Suspense fallback={<BigSpinner />}>
  <Biography />
  <Suspense fallback={<AlbumsGlimmer />}>
    <Panel>
      <Albums />
    </Panel>
  </Suspense>
</Suspense>

// 如何阻止 UI 在更新期间被后备方案替换？
// 可以使用 startTransition 将更新标记为非紧急的
function handleNextPageClick() {
  // 如果此更新被挂起，不会隐藏已经展示的内容
  startTransition(() => {
    setCurrentPage(currentPage + 1)
  })
}
```

## 常用 Hook
> Hook 是一种特殊的函数，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
>

+ **注意事项：**
    - 只能在函数组件的顶层调用 Hook，不要在循环、条件判断或者嵌套函数中调用
    - 只能在 React 函数组件中或者自定义 Hook 中调用 Hook

### [useState](https://zh-hans.react.dev/reference/react/useState)
> 用于在函数组件中保存状态，并在组件重新渲染时保留状态
>

+ **语法：**`**const [state, setState] = useState(initialState)**`
+ **参数：**`**initialState**` - 初始状态，可以是任何类型
+ **返回值：**
    - `**state**` - 当前状态
    - `**setState**` - 更新状态的函数，调用 `**setState(newState)**` 时，会触发重新渲染，并更新 state 的值
+ **注意：**
    - `**setState**` 会在组件下一次渲染时更新 `**state**`，所以在一个处理函数中多次调用 `**setCount(count + 1)**`，效果和一次调用一样。使用批处理 `**setCount(count => count + 1)**`** **可解决这一问题
    - 设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

**批处理**

```jsx
import { useState } from 'react'

export default function Counter() {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          // 加入队列依次执行
          setNumber(n => n + 1) // setNumber(0 => 1)
          setNumber(n => n + 1) // setNumber(1 => 2)
          setNumber(n => n + 1) // setNumber(2 => 3)
        }}
      >
        +3
      </button>
    </>
  )
}
```

:::info
**Tips：**

+ `**setState(x)**` 实际上会像 `**setState(n => x)**` 一样运行，只是没有使用 `**n**`

:::

**命名惯例**

通常可以通过相应 state 变量的第一个字母来命名更新函数的参数:

```jsx
setEnabled(e => !e)
setLastName(ln => ln.reverse())
setFriendCount(fc => fc * 2)
```

#### 更新 state 中的对象（数组同理）
+ **注意：**避免产生 mutation，需要将 React state 中的对象视为只读的

```jsx
import { useState } from 'react'

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  })

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <label>
        First name:
        <input name='firstName' value={person.firstName} onChange={handleChange} />
      </label>
      <label>
        Last name:
        <input name='lastName' value={person.lastName} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input name='email' value={person.email} onChange={handleChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
  )
}
```

**使用 Immer 库简化代码**

1. 安装 Immer 依赖：`**npm install use-immer**`
2. 将 `**import { useState } from 'react'**` 替换为 `**import { useImmer } from 'use-immer'**`

```jsx
import { useImmer } from 'use-immer'

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg'
    }
  })

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value
    })
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value
    })
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value
    })
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value
    })
  }

  return (
    <>
      <label>
        Name:
        <input value={person.name} onChange={handleNameChange} />
      </label>
      <label>
        Title:
        <input value={person.artwork.title} onChange={handleTitleChange} />
      </label>
      <label>
        City:
        <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <label>
        Image:
        <input value={person.artwork.image} onChange={handleImageChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  )
}
```

### [useReducer](https://zh-hans.react.dev/reference/react/useReducer)
> 它接收一个 reducer 函数和初始状态，返回一个 state 和一个 dispatch 函数。
>

+ **语法：**`**const [state, dispatch] = useReducer(reducer, initialArg, init?)**`
+ **参数：**
    - `**reducer**` - 一个函数，接收两个参数，第一个参数是当前的 state，第二个参数是 action，返回新的 state
    - `**initialArg**` - 初始参数，在第一次调用 useReducer 时传入，之后的 state 都是由 reducer 计算得出
    - `**init**` - 一个函数，接收 initialArg 作为参数，返回初始的 state
+ **返回值：**
    - `**state**` - 当前的 state
    - `**dispatch**` - 一个函数，用于触发 reducer，接收 action 作为参数，调用 reducer 函数计算新的 state，并更新 state
+ **注意：**reducer 必须是一个纯函数，它应该只计算下一个状态，不应该“做”其它事情

```jsx
import { useReducer } from 'react'
import AddTask from './AddTask.js'
import TaskList from './TaskList.js'

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ]
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task
        } else {
          return t
        }
      })
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id)
    }
    default: {
      throw Error('未知 action: ' + action.type)
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text
    })
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    })
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    })
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
    </>
  )
}

let nextId = 3
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false }
]
```

**使用 Immer 简化 reducer**

```jsx
import { useImmerReducer } from 'use-immer'
import AddTask from './AddTask.js'
import TaskList from './TaskList.js'

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false
      })
      break
    }
    case 'changed': {
      const index = draft.findIndex(t => t.id === action.task.id)
      draft[index] = action.task
      break
    }
    case 'deleted': {
      return draft.filter(t => t.id !== action.id)
    }
    default: {
      throw Error('未知 action：' + action.type)
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks)

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text
    })
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    })
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    })
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
    </>
  )
}

let nextId = 3
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false }
]
```

#### 实现 useReducer
```jsx
import { useState } from 'react'

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState)

  const dispatch = action => {
    setState(prevState => reducer(prevState, action))
  }

  return [state, dispatch]
}
```

### [useEffect](https://zh-hans.react.dev/reference/react/useEffect)
> 它可以让你在函数组件中执行副作用操作，比如获取数据、设置订阅和清除订阅等
>

+ **语法：**`**useEffect(setup, dependencies?)**`
+ **参数：**
    - `**setup**` - useEffect 所要执行的函数，该函数会在组件渲染后执行，并且会在组件卸载时或受依赖项变化时执行清理函数（如果定义了的话）
    - `**dependencies**` - useEffect 所依赖的变量，如果该变量发生变化，则 useEffect 所要执行的函数会重新执行
+ **返回值：**无
+ **注意：**
    - useEffect 所依赖的变量必须是组件的 props 或 state，不能是组件内部的变量
    - React 总是在执行下一轮渲染的 Effect 之前清理上一轮渲染的 Effect
    - 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试

```jsx
import { useEffect } from 'react'

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection()
    connection.connect()

    return () => connection.disconnect() // 按需添加清理（cleanup）函数
  }, []) // useEffect 第二个参数是依赖项数组，只有当数组中的值发生变化时才会重新执行 useEffect 内部的函数。

  return <h1>欢迎来到聊天室！</h1>
}

function createConnection() {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log('✅ 连接中……')
    },
    disconnect() {
      console.log('❌ 连接断开。')
    }
  }
}
```

**依赖项的注意事项：**

```jsx
useEffect(() => {
  // 这里的代码会在每次渲染后运行
})

useEffect(() => {
  // 这里的代码只会在组件挂载（首次出现）时运行
}, [])

useEffect(() => {
  // 这里的代码不但会在组件挂载时运行，而且当 a 或 b 的值自上次渲染后发生变化后也会运行
}, [a, b])
```

### useEffectEvent ![](https://cdn.nlark.com/yuque/0/2024/svg/33977556/1733186490659-f6e4c0bc-e2df-4832-b403-a36e8c226f28.svg)
> 从 Effect 中提取非响应式逻辑
>

+ **注意：**
    - 只在 Effect 内部调用他们
    - 永远不要把他们传给其他组件和 Hook

```jsx
import { useEffect, useEffectEvent } from 'react'
import { createConnection } from './chat.js'
import { showNotification } from './notifications.js'

const serverUrl = 'https://localhost:1234'

function ChatRoom({ roomId, theme }) {
  // onConnected 被称为 Effect Event。它是 Effect 逻辑的一部分，但是其行为更像事件处理函数
  // Effect Event 是 Effect 代码的非响应式 “片段”，其内部的逻辑不是响应式的，但却总能取到最新的 props 和 state
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme)
  })

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.on('connected', () => {
      onConnected()
    })
    connection.connect()
    return () => connection.disconnect()
  }, [roomId])

  return <h1>Welcome to the {roomId} room!</h1>
}
```

### [useLayoutEffect](https://zh-hans.react.dev/reference/react/useLayoutEffect)
> `**useLayoutEffect**` 是 `**useEffect**` 的一个版本，在浏览器重新绘制屏幕之前触发
>

+ **用法同 **[**useEffect**](#PBT6m)
+ **注意：**`**useLayoutEffect**` 会阻塞浏览器重新绘制

```jsx
function Tooltip() {
  const ref = useRef(null)
  const [tooltipHeight, setTooltipHeight] = useState(0) // 你还不知道真正的高度

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect()
    setTooltipHeight(height) // 现在重新渲染，你知道了真实的高度
  }, [])

  // 在下方的渲染逻辑中使用 tooltipHeight
  // ...
}
```

### [useInsertionEffect](https://zh-hans.react.dev/reference/react/useInsertionEffect)
> 在布局副作用触发之前将元素插入到 DOM 中
>

+ **用法同 **[**useEffect**](#PBT6m)
+ **说明：**`**useInsertionEffect**` 是为 CSS-in-JS 库的作者特意打造的
+ **注意：**与其他类型的 Effect 不同，`**useInsertionEffect**` 会同时触发 cleanup 函数和 setup 函数

```jsx
import { useInsertionEffect } from 'react'

function getStyleForRule(rule) {
  const style = document.createElement('style')
  style.textContent = rule
  return style
}

let isInserted = new Set()
function useCSS(rule) {
  useInsertionEffect(() => {
    // 同前所述，我们不建议在运行时注入 <style> 标签。
    // 如果你必须这样做，那么应当在 useInsertionEffect 中进行。
    if (!isInserted.has(rule)) {
      isInserted.add(rule)
      document.head.appendChild(getStyleForRule(rule))
    }
  })
  return rule
}

export default function Button() {
  const className = useCSS(`
    .button {
      background-color: blue;
      color: white;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
  `)
  // 这里的 className 就是 "button"
  return <div className={className} />
}
```

### [useMemo](https://zh-hans.react.dev/reference/react/useMemo)
> 缓存函数的返回值，避免重复计算
>

+ **语法：**`**const cachedValue = useMemo(calculateValue, dependencies)**`
+ **参数：**
    - `**calculateValue**` - 一个函数，该函数的返回值将会被缓存并返回
    - `**dependencies**` - 一个数组，数组中的元素会作为参数传递给 calculateValue 函数，当数组中的元素发生变化时，calculateValue 函数会重新执行
+ **返回值：**一个 memoized 值，该值是 calculateValue 函数的返回值，并且只有当 dependencies 中的元素发生变化时才会重新计算
+ **注意：**
    - useMemo 仅仅是缓存函数的返回值，并不保证函数内部的副作用（如修改 state、触发异步请求等）不会重新执行
    - useMemo 仅仅是优化性能，并不保证代码的正确性

```jsx
import { useMemo, useState } from 'react'

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')
  // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行 getFilteredTodos()
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter])
  // ...
}
```

### [useCallback](https://zh-hans.react.dev/reference/react/useCallback)
> 缓存函数，避免重新渲染
>

+ **语法：**`**const cachedFn = useCallback(fn, dependencies)**`
+ **参数：**
    - `**fn**` - 要缓存的函数
    - `**dependencies**` - 依赖项数组，当依赖项发生变化时，才会重新渲染
+ **返回值：**一个新的函数，该函数会缓存之前的函数，并在缓存的函数的依赖项发生变化时才会重新渲染
+ **注意：**`**useCallback**`** 只应作用于性能优化**
+ **useCallback 和 useMemo 的区别：**
    - useMomo 缓存调用的结果，避免重复计算
    - useCallback 缓存函数本身，避免重复创建函数

```jsx
function ProductPage({ productId, referrer, theme }) {
  // 在多次渲染中缓存函数
  const handleSubmit = useCallback(
    orderDetails => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails
      })
    },
    [productId, referrer]
  ) // 只要这些依赖没有改变

  return (
    <div className={theme}>
      {/* ShippingForm 就会收到同样的 props 并且跳过重新渲染 */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  )
}
```

### [useImperativeHandle](https://zh-hans.react.dev/reference/react/useImperativeHandle)
> 用于在父组件中获取子组件实例的某些方法，并在子组件中暴露给父组件使用
>

+ **语法：**`**useImperativeHandle(ref, createHandle, dependencies?)**`
+ **参数：**
    - `**ref**` - 一个函数组件的 ref 对象，用于获取组件实例
    - `**createHandle**` - 一个函数，返回一个对象，包含组件实例的方法
    - `**dependencies**` - 可选，一个数组，用于指定 createHandle 函数的依赖项
+ **返回值：**无

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react'

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null)

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current.focus()
        },
        scrollIntoView() {
          inputRef.current.scrollIntoView()
        }
      }
    },
    []
  )

  return <input {...props} ref={inputRef} />
})
```

### [useDeferredValue](https://zh-hans.react.dev/reference/react/useDeferredValue)
> 延迟渲染一个值，直到下一次渲染时才渲染
>

+ **语法：**`**const deferredValue = useDeferredValue(value, initialValue?)**`
+ **参数：**
    - `**value**` - 想要延迟的值
    - `**initialValue**` - 组件初始渲染时使用的值。如果没有提供，useDeferredValue 在初始渲染期间不会延迟，因为没有以前的版本可以渲染
+ **返回值：**一个包含当前延迟值的 state 变量

```jsx
import { useState, useDeferredValue } from 'react'

function SearchComponent() {
  const [inputValue, setInputValue] = useState('')
  const deferredValue = useDeferredValue(inputValue)

  return (
    <div>
      <input type='text' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <p>Input: {inputValue}</p>
      <p>Deferred Input: {deferredValue}</p>
    </div>
  )
}
```

### [useId](https://zh-hans.react.dev/reference/react/useId)
> 生成一个唯一的 ID 字符串
>

+ **语法：**`**const id = useId()**`
+ **参数：**无
+ **返回值：**一个唯一的字符串，每次调用都会返回一个新的字符串
+ **注意：**不要使用 `**useId**` 来生成列表中的 key。key 应该由你的数据生成

```jsx
import { useId } from 'react'

export default function Form() {
  const id = useId()

  return (
    <form>
      <label htmlFor={id + '-firstName'}>名字：</label>
      <input id={id + '-firstName'} type='text' />
      <hr />
      <label htmlFor={id + '-lastName'}>姓氏：</label>
      <input id={id + '-lastName'} type='text' />
    </form>
  )
}
```

### [useTransition](https://zh-hans.react.dev/reference/react/useTransition)
> 用于在后台渲染 UI，实现非阻塞的状态更新，从而提升用户体验
>

+ **语法：**`**const [isPending, startTransition] = useTransition()**`
+ **参数：**无
+ **返回值：**
    - `**isPending**` - 一个布尔值，表示当前是否是否有待处理的 transition
    - `**startTransition**` - 一个函数，用于将状态更新标记为 transition。调用此函数时，React 会将其内部的状态更新视为非阻塞的过渡更新

```jsx
import { useState, useTransition } from 'react'
import { updateQuantity } from './api'
import Item from './Item'
import Total from './Total'

export default function App({}) {
  const [quantity, setQuantity] = useState(1)
  const [isPending, startTransition] = useTransition()

  const updateQuantityAction = async newQuantity => {
    // 要访问转换的待处理状态,
    // 再次调用 startTransition
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity)
      startTransition(() => {
        setQuantity(savedQuantity)
      })
    })
  }

  return (
    <div>
      <h1>Checkout</h1>
      <Item action={updateQuantityAction} />
      <hr />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  )
}
```

### [useOptimistic](https://zh-hans.react.dev/reference/react/useOptimistic)
> 用于实现乐观更新。它允许在进行异步操作时，立即更新 UI，以提供更流畅的用户体验
>

+ **语法：**`**const [optimisticState, addOptimistic] = useOptimistic(state, updateFn)**`
+ **参数：**
    - `**state**` - 初始状态，通常是一个数组或对象
    - `**updateFn**` - 一个函数，接收当前 `**state**` 和传递给 `**addOptimistic**` 的乐观值，返回更新后的乐观状态
+ **返回值：**
    - `**optimisticState**` - 当前的乐观状态（例如，更新后的消息列表）
    - `**addOptimistic**` - 触发乐观更新 `**updateFn**` 时调用的 dispatch 函数

```jsx
import { useOptimistic, useState, useRef } from 'react'
import { deliverMessage } from './actions.js'

function Thread({ messages, sendMessage }) {
  const formRef = useRef()
  async function formAction(formData) {
    addOptimisticMessage(formData.get('message'))
    formRef.current.reset()
    await sendMessage(formData)
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  )

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small>（发送中……）</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type='text' name='message' placeholder='你好！' />
        <button type='submit'>发送</button>
      </form>
    </>
  )
}

export default function App() {
  const [messages, setMessages] = useState([{ text: '你好，在这儿！', sending: false, key: 1 }])
  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get('message'))
    setMessages(messages => [...messages, { text: sentMessage }])
  }
  return <Thread messages={messages} sendMessage={sendMessage} />
}
```

### 自定义 Hook
+ **注意：**
    - Hook 的名称必须永远以 use 开头
    - 自定义 Hook 共享的是状态逻辑，而不是状态本身

```jsx
function useData(url) {
  const [data, setData] = useState(null)
  useEffect(() => {
    if (url) {
      let ignore = false
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json)
          }
        })
      return () => {
        ignore = true
      }
    }
  }, [url])
  return data
}
```

## 常用 API
### [use](https://zh-hans.react.dev/reference/react/use)
> 用于读取类似于 Promise 或 context 资源的值
>

+ **语法：**`**const value = use(resource)**`
+ **参数：**`**resource**` - 想要从中读取值的数据源
+ **返回值：**读取到的值
+ **注意：**
    - `**use**` API 必须在组件或 Hook 内部调用，与 React Hook 不同的是，可以在循环和条件语句（如 `**if**`）中调用 `**use**`
    - 不能在 `**try-catch**` 块中调用 `**use**`

```jsx
import { createContext, use } from 'react'

const ThemeContext = createContext(null)

export default function MyApp() {
  return (
    <ThemeContext.Provider value='dark'>
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title='Welcome'>
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  )
}

function Panel({ title, children }) {
  const theme = use(ThemeContext)
  const className = 'panel-' + theme
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ show, children }) {
  if (show) {
    const theme = use(ThemeContext)
    const className = 'button-' + theme
    return <button className={className}>{children}</button>
  }
  return false
}
```

#### 处理 rejected Promise
1. **使用错误边界将错误展示给用户**

> 如果希望在 Promise 被拒绝（rejected）时向用户显示错误信息，可以使用 错误边界
>

```jsx
'use client' // 该语句用于启用客户端渲染

import { use, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function MessageContainer({ messagePromise }) {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    </ErrorBoundary>
  )
}

function Message({ messagePromise }) {
  const content = use(messagePromise)
  return <p>Here is the message: {content}</p>
}
```

2. **使用 Promise.catch 提供替代值**

> 如果希望在传递给 use 的 Promise 被拒绝（rejected）时提供替代值，可以使用 Promise 的 catch 方法
>

```jsx
import { Message } from './message.js'

export default function App() {
  const messagePromise = new Promise((resolve, reject) => {
    reject()
  }).catch(() => {
    return 'no new message found.'
  })

  return (
    <Suspense fallback={<p>waiting for message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  )
}
```

### [lazy](https://zh-hans.react.dev/reference/react/lazy)
> 延迟加载组件，只有在组件真正渲染的时候才会加载组件代码
>

+ **语法：**`**const SomeComponent = lazy(load)**`
+ **参数：**`**load**` - 一个函数，返回一个 Promise，该 Promise 应该返回一个默认导出组件
+ **返回值：**一个函数组件，该组件会在第一次渲染时加载组件代码，并渲染组件

```jsx
import { lazy } from 'react'

// ✅ Good: 将 lazy 组件声明在组件外部
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'))

function Editor() {
  // ...
}
```

### [memo](https://zh-hans.react.dev/reference/react/memo)
> 允许组件在 props 没有改变的情况下跳过重新渲染
>

+ **语法：**`**const MemoizedComponent = memo(SomeComponent, arePropsEqual?)**`
+ **参数：**
    - `**SomeComponent**` - 要进行记忆化的组件，可以是函数组件或 `**forwardRef**` 组件
    - `**arePropsEqual**` - 可选参数，用于判断 props 是否相同的函数，默认情况下会使用 `**Object.is**` 来进行比较
+ **返回值：**一个新的组件，该组件会在 props 相同的情况下跳过重新渲染
+ **注意：**`**memo**` 只能用来做性能优化，不能保证组件的正确性

```jsx
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
})

export default Greeting
```

## react-dom@19
### 常用组件


### 常用 Hook
#### [useFormStatus](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus)
> 获取表单状态
>

+ **语法：**`**const { pending, data, method, action } = useFormStatus()**`
+ **参数：**无
+ **返回值：**
    - `**pending**` - 布尔值，表单是否正在提交
    - `**data**` - 对象，表单提交的数据
    - `**method**` - 字符串，表单提交的方法，可以是 get 或 post
    - `**action**` - 字符串，表单提交的地址
+ **注意：**`**useFormStatus**` 仅返回父级 form 元素的状态，如果没有 form 元素，则返回 undefined

```jsx
import { useFormStatus } from 'react-dom'
import action from './actions'

function Submit() {
  const status = useFormStatus()
  return <button disabled={status.pending}>提交</button>
}

export default function App() {
  return (
    <form action={action}>
      <Submit />
    </form>
  )
}
```

### 常用 API


