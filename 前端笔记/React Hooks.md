> useHooks 一系列现代的、服务器安全的 React 钩子
>

## 安装
```shell
npm i @uidotdev/usehooks

# React 实验性 Hook 依赖
npm i @uidotdev/usehooks@experimental react@experimental react-dom@experimental
```

## Hooks
### [useDebounce](https://usehooks.com/usedebounce) 防抖
> 延迟执行函数或状态更新
>

+ **语法：**`**const debouncedValue = useDebounce(value, delay)**`
+ **参数：**
    - `**value**` - 要进行防抖的值。可以是任何类型
    - `**delay**` - 以毫秒为单位的延迟时间。超过此时间后，将使用最新值
+ **返回值：**一个新的值，该值在 `**delay**` 时间内保持不变，但在此之后将使用最新值

```jsx
import { useState, useEffect } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import searchHackerNews from './searchHackerNews'
import SearchResults from './SearchResults'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('js')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const handleChange = e => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    setSearchTerm(formData.get('search'))
    e.target.reset()
    e.target.focus()
  }

  useEffect(() => {
    const searchHN = async () => {
      let results = []
      setIsSearching(true)
      if (debouncedSearchTerm) {
        const data = await searchHackerNews(debouncedSearchTerm)
        results = data?.hits || []
      }

      setIsSearching(false)
      setResults(results)
    }

    searchHN()
  }, [debouncedSearchTerm])

  return (
    <section>
      <header>
        <h1>useDebounce</h1>
        <form onSubmit={handleSubmit}>
          <input
            name='search'
            placeholder='Search HN'
            style={{ background: 'var(--charcoal)' }}
            onChange={handleChange}
          />
          <button className='primary' disabled={isSearching} type='submit'>
            {isSearching ? '...' : 'Search'}
          </button>
        </form>
      </header>
      <SearchResults results={results} />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733800122111-d2554c22-5a22-4ac6-bdd4-dcf6b0b0161d.png)

### [useThrottle](https://usehooks.com/usethrottle) 节流
> 限制函数的执行频率，在规定的时间内只执行一次
>

+ **语法：**`**const throttledValue = useThrottle(value, interval?)**`
+ **参数：**
    - `**value**` - 要节流的值
    - `**interval**` - （可选）节流的时间间隔，单位为毫秒，默认值为 500ms
+ **返回值：**每个间隔最多更新一次的节流值

```jsx
import { useState } from 'react'
import { useThrottle } from '@uidotdev/usehooks'

export default function App() {
  const [val, setVal] = useState('')
  const throttledValue = useThrottle(val)

  return (
    <section>
      <h1>useThrottle</h1>
      <input
        placeholder='Type some text'
        style={{ background: 'var(--charcoal)' }}
        type='text'
        value={val}
        onChange={e => {
          setVal(e.target.value)
        }}
      />
      <p>Val: {val}</p>
      <p>Throttled: {throttledValue}</p>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734317054889-de37f3f2-e98a-484e-92a9-7f60fcc97005.png)

### [useLocalStorage](https://usehooks.com/uselocalstorage) 本地存储
> 存储、检索和同步浏览器本地存储中的数据
>

+ **语法：**`**const [localState, handleSetState] = useLocalStorage(key, initialValue)**`
+ **参数：**
    - `**key**` - 用于访问本地存储值的键
    - `**initialValue**` - 初始值。如果本地存储中不存在该键，则使用初始值
+ **返回值：**
    - `**localState**` - 本地存储中存储值的当前状态
    - `**handleSetState**` - 一个用于设置本地存储中值状态的函数。该函数接受一个新的值或返回新值的函数。该值还保存在提供的键值对中

```jsx
import { useRef, useEffect } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'
import createDrawing from './createDrawing'

export default function App() {
  const [drawing, saveDrawing] = useLocalStorage('drawing', null)
  const ref = useRef(null)
  useEffect(() => {
    createDrawing(ref.current, drawing, saveDrawing)
  }, [drawing, saveDrawing])

  return (
    <section>
      <header>
        <h1>useLocalStorage</h1>

        <button className='link' onClick={() => window.location.reload()}>
          Reload Window
        </button>
        <button
          className='link'
          onClick={() => {
            window.localStorage.clear()
            window.location.reload()
          }}
        >
          Clear Local Storage
        </button>
      </header>
      <figure>
        <canvas ref={ref} width={800} height={800} />
        <figcaption>(draw something)</figcaption>
      </figure>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733800887585-a4903c11-8720-4204-b80a-ad41497f7bc3.png)

### [useSessionStorage](https://usehooks.com/usesessionstorage) 会话存储
> 存储、检索和同步浏览器会话存储中的数据
>

+ **语法：**`**const [localState, handleSetState] = useSessionStorage(key, initialValue)**`
+ **参数：**
    - `**key**` - 用于访问会话存储值的键
    - `**initialValue**` - 初始值，如果会话存储中不存在该键，则使用该值初始化
+ **返回值：**
    - `**localState**` - 会话存储中存储值的当前状态
    - `**handleSetState**` - 用于设置会话存储中存储值的函数。此函数接受一个新值或返回新值的函数。该值还保存在提供的键值对中

```jsx
import { useSessionStorage } from '@uidotdev/usehooks'
import { cart } from './icons'

export default function App() {
  const [count, setCount] = useSessionStorage('woot', 0)

  return (
    <section>
      <h1>useSessionStorage</h1>
      <div>
        <button className='link' onClick={() => setCount(0)}>
          Clear Cart
        </button>
        <button
          className='link'
          onClick={() => {
            window.location.reload()
          }}
        >
          Reload Window
        </button>
        <button
          className='link'
          onClick={() => {
            window.sessionStorage.clear()
            window.location.reload()
          }}
        >
          Clear Session
        </button>
      </div>
      <button className='primary' onClick={() => setCount(count + 1)}>
        <span>{cart}</span> Add To Cart
      </button>
      <button className='cart'>
        <span>{cart}</span>{' '}
        <span key={count} className={`cart-count ${count > 0 ? 'animate' : ''}`}>
          {count}
        </span>
      </button>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733825077277-f5192c81-ae6a-446e-a7e5-b02edd14074d.png)

### [useWindowSize](https://usehooks.com/usewindowsize) 监听窗口尺寸
> 监听浏览器窗口的尺寸
>

+ **语法：**`**const size = useWindowSize()**`
+ **参数：**无
+ **返回值：**一个包含 `**width**` 和 `**height**` 的对象，分别表示浏览器窗口的宽度和高度

```jsx
import { useWindowSize } from '@uidotdev/usehooks'

function Browser({ size }) {
  return (
    <div
      data-testid='browser'
      className='browser'
      style={{ width: size.width / 4, height: size.height / 4 }}
    />
  )
}

export default function App() {
  const size = useWindowSize()

  return (
    <section>
      <h1>useWindowSize</h1>
      <p>Resize the window</p>
      <table>
        <tbody>
          <tr>
            <th>width</th>
            <td>{size.width}</td>
          </tr>
          <tr>
            <th>height</th>
            <td>{size.height}</td>
          </tr>
        </tbody>
      </table>
      <Browser size={size} />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733801615143-fc5cff1d-9a4a-4af5-ad4d-df2ad4ed701c.png)

### [usePrevious](https://usehooks.com/useprevious) 监听上一个值
> 监听变量的前一个值
>

+ **语法：**`**const previousValue = usePrevious(newValue)**`
+ **参数：**`**newValue**` - 要监听并返回前一个的新值
+ **返回值：**提供 `**newValue**` 的上一个值

```jsx
import { useState } from 'react'
import { usePrevious } from '@uidotdev/usehooks'

function getRandomColor() {
  const colors = ['green', 'blue', 'purple', 'red', 'pink']
  return colors[Math.floor(Math.random() * colors.length)]
}

export default function App() {
  const [color, setColor] = useState(getRandomColor())
  const previousColor = usePrevious(color)

  const handleClick = () => {
    function getNewColor() {
      const newColor = getRandomColor()
      if (color === newColor) {
        getNewColor()
      } else {
        setColor(newColor)
      }
    }
    getNewColor()
  }

  return (
    <section>
      <h1>usePrevious</h1>
      <button className='link' onClick={handleClick}>
        Next
      </button>
      <article>
        <figure>
          <p style={{ background: `var(--${previousColor})` }} />
          <figcaption>Previous: {previousColor}</figcaption>
        </figure>
        <figure>
          <p style={{ background: `var(--${color})` }} />
          <figcaption>Current: {color}</figcaption>
        </figure>
      </article>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733811251777-7269dd9a-db8e-4a39-9fa5-1cd2122523e8.png)

### [useIntersectionObserver](https://usehooks.com/useintersectionobserver) 监听视口元素可见性
> 监听和管理视口中 DOM 元素的可见性
>

+ **语法：**`**const [ref, entry] = useIntersectionObserver({ threshold: 1, root: null, rootMargin: '0%' })**`
+ **参数：**
    - `**threshold**` - 单个数字或介于 0 和 1 之间的数字数组，指定了触发 IntersectionObserver 回调的阈值。表示可见区域占目标元素的比例。默认值为 1
    - `**root**` - 用于检查目标可见性的视口元素。如果未指定或为 null，则默认为浏览器视区。默认值为 null
    - `**rootMargin**` - 根节点周围的边距。其值类似于 CSS margin 属性。数值可以是百分比。这组值用于在计算交集之前增大或缩小根元素边框的每一侧。默认为全零
+ **返回值：**
    - `**ref**` - 可附加到 DOM 元素的 React 引用，用于观察
    - `**entry**` - 包含交集相关信息的对象。此对象类似于 `**IntersectionObserverEntry**`

```jsx
import { useIntersectionObserver } from '@uidotdev/usehooks'
import demoData from './demoData'

const Section = ({ imgUrl, caption, href }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px'
  })

  return (
    <section>
      <figure ref={ref}>
        {entry?.isIntersecting && (
          <>
            <img src={imgUrl} alt={caption} />
            <figcaption>
              <a href={href} alt={caption} target='_blank' rel='noreferrer'>
                {caption}
              </a>
            </figcaption>
          </>
        )}
      </figure>
    </section>
  )
}

export default function App() {
  return (
    <main>
      <header>
        <h1>useIntersectionObserver</h1>
        <h6>
          (Memes from <a href='https://bytes.dev'>bytes.dev</a>)
        </h6>
      </header>

      {demoData.map(({ imgUrl, href, caption }, index) => {
        return <Section key={index} imgUrl={imgUrl} href={href} caption={caption} />
      })}
    </main>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733816366880-04ab06d3-8f36-4a46-af3f-183f4da2cffb.png)

### [useNetworkState](https://usehooks.com/usenetworkstate) 网络监控
> 无缝监控和适应网络状况
>

+ **语法：**`**const network = useNetworkState()**`
+ **参数：**无
+ **返回值：**
    - `**network**` - 表示当前网络状态的对象
        * `**online**` - 表示浏览器是在线还是离线
        * `**downlink**` - 有效带宽估计值，单位为 MB/秒，四舍五入到最接近的 25KB/秒 的倍数
        * `**downlinkMax**` - 底层连接技术的最大下行链路速度，单位为兆位/秒 (Mbps)
        * `**effectiveType**` - 用于一般网页浏览的有效连接类型（"slow-2g"、"2g"、"3g "或 "4g"）
        * `**rtt**` - 估计的连接往返延迟（毫秒）
        * `**saveData**` - 用户是否已从 User Agent 请求减少数据使用模式
        * `**type**` - 设备用于与网络通信的连接类型。（`**bluetooth**`，`**cellular**`，`**ethernet**`，`**none**`，`**wifi**`, `**wimax**`, `**other**`, `**unknown**`）

```jsx
import { useNetworkState } from '@uidotdev/usehooks'

export default function App() {
  const network = useNetworkState()

  return (
    <section>
      <h1>useNetworkState</h1>
      <table>
        <tbody>
          {Object.keys(network).map(key => {
            return (
              <tr key={key} className={key}>
                <th>{key}</th>
                <td>{`${network[key]}`}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733818628243-2452fac8-413e-4534-82cc-2ccf1fd87dbc.png)

### [useMediaQuery](https://usehooks.com/usemediaquery) 媒体查询
> 订阅和响应媒体查询变化
>

+ **语法：**`**const device = useMediaQuery(query)**`
+ **参数：**`**query**` - 监听变化的媒体查询
+ **返回值：**返回一个布尔值，表示媒体查询是否与设备的当前状态相匹配

```jsx
import { useMediaQuery } from '@uidotdev/usehooks'
import { phone, tablet, laptop, desktop } from './icons'

export default function App() {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  const isMediumDevice = useMediaQuery(
    'only screen and (min-width : 769px) and (max-width : 992px)'
  )
  const isLargeDevice = useMediaQuery(
    'only screen and (min-width : 993px) and (max-width : 1200px)'
  )
  const isExtraLargeDevice = useMediaQuery('only screen and (min-width : 1201px)')

  return (
    <section>
      <h1>useMediaQuery</h1>
      Resize your browser windows to see changes.
      <article>
        <figure className={isSmallDevice ? 'active' : ''}>
          {phone}
          <figcaption>Small</figcaption>
        </figure>
        <figure className={isMediumDevice ? 'active' : ''}>
          {tablet}
          <figcaption>Medium</figcaption>
        </figure>
        <figure className={isLargeDevice ? 'active' : ''}>
          {laptop}
          <figcaption>Large</figcaption>
        </figure>
        <figure className={isExtraLargeDevice ? 'active' : ''}>
          {desktop}
          <figcaption>Extra Large</figcaption>
        </figure>
      </article>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733819466760-9635c44e-e4bb-414f-b06f-246f605b44aa.png)

### [useOrientation](https://usehooks.com/useorientation) 设备方向
> 管理和响应设备方向的变化
>

+ **语法：**`**const orientation = useOrientation()**`
+ **参数：**无
+ **返回值：**
    - `**orientation**` - 设备方向信息对象
        * `**angle**` - 设备当前的方向角（以度为单位）
        * `**type**` - 设备当前的方向类型（例如：`**portrait-primary**`，`**landscape-primary**`，`**portrait-secondary**`，`**landscape-secondary**`)

```jsx
import { useOrientation } from '@uidotdev/usehooks'

export default function App() {
  const orientation = useOrientation()

  return (
    <section>
      <h1>useOrientation</h1>

      <article
        style={{ '--angle': `${orientation.angle}deg` }}
        className={orientation.type.toLocaleLowerCase()}
      />
      <table>
        <tbody>
          {Object.keys(orientation).map(key => {
            return (
              <tr key={key}>
                <th>{key}</th>
                <td>{orientation[key]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733820499213-8a55dd74-d205-4b10-b3e9-2362d81bcde9.png)

### [usePreferredLanguage](https://usehooks.com/usepreferredlanguage) 首选语言
> 动态适应用户语言首选项
>

+ **语法：**`**const language = usePreferredLanguage()**`
+ **参数：**无
+ **返回值：**钩子返回一个字符串，表示浏览器设置中设置的用户首选语言

```jsx
import { usePreferredLanguage } from '@uidotdev/usehooks'

export default function App() {
  const language = usePreferredLanguage()

  return (
    <section>
      <h1>usePreferredLanguage</h1>
      <p>Change language here - chrome://settings/languages</p>
      <h2>
        The correct date format for <pre>{language}</pre> is{' '}
        <time>{new Date(Date.now()).toLocaleDateString(language)}</time>
      </h2>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733885575996-9dda8795-965a-450d-952a-46da32306fa2.png)

### [useFetch](https://usehooks.com/usefetch) 数据获取
> 获取具有准确状态、缓存且没有过时响应的数据
>

+ **语法：**`**const { error, data } = useFetch(url, options?)**`
+ **参数：**
    - `**url**` - 获取数据的 URL
    - `**options**` - （可选）fetch 请求的其他选项，例如标头或请求方法
+ **返回值：**
    - `**error**` - 请求失败时返回的错误信息，否则为 undefined
    - `**data**` - 请求成功后返回的数据，否则为 undefined
+ **注意：**该钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { useFetch } from '@uidotdev/usehooks'
import Card from './Card'

export default function App() {
  const [count, setCount] = useState(1)

  const { error, data } = useFetch(`https://pokeapi.co/api/v2/pokemon/${count}`)

  return (
    <section>
      <h1>useFetch</h1>
      <button disabled={count < 2} className='link' onClick={() => setCount(c => c - 1)}>
        Prev
      </button>
      <button className='link' onClick={() => setCount(c => c + 1)}>
        Next
      </button>
      <Card loading={!data} error={error} data={data} />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733887760057-2a741410-342c-4bf6-baca-d792c031e594.png)

### [useContinuousRetry](https://usehooks.com/usecontinuousretry) 自动重试
> 自动重试回调函数，直到成功为止
>

+ **语法：**`**const hasResolved = useContinuousRetry(callback, interval?, options?)**`
+ **参数：**
    - `**callback**` - 重复执行的回调函数，直到返回真值
    - `**interval**` - （可选）执行回调函数的时间间隔（毫秒）。默认值为 100 毫秒
    - `**options**` - （可选）一个包含 `**maxRetries**` 属性的对象，用于设置最大重试次数
+ **返回值：**一个布尔值，表示是否成功执行了回调函数
+ **注意：**该钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { useContinuousRetry } from '@uidotdev/usehooks'

export default function App() {
  const [count, setCount] = useState(0)
  const hasResolved = useContinuousRetry(() => {
    console.log('retrying')
    return count > 10
  }, 1000)

  return (
    <section>
      <h1>useContinuousRetry</h1>
      <button className='primary' onClick={() => setCount(count + 1)}>
        {count}
      </button>
      <pre>{JSON.stringify({ hasResolved, count }, null, 2)}</pre>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733897828370-d972f8aa-c36a-40a8-8969-76f598431e4c.png)

### [useVisibilityChange](https://usehooks.com/usevisibilitychange) 监听文档可见性
> 监听当前文档是否可见
>

+ **语法：**`**const documentVisible = useVisibilityChange()**`
+ **参数：**无
+ **返回值：**一个布尔值，表示当前文档是否可见

```jsx
import { useState, useEffect } from 'react'
import { useVisibilityChange } from '@uidotdev/usehooks'

export default function App() {
  const documentVisible = useVisibilityChange()
  const [tabAwayCount, setTabAwayCount] = useState(0)

  useEffect(() => {
    if (documentVisible === false) {
      setTabAwayCount(c => c + 1)
    }
  }, [documentVisible])

  return (
    <section>
      <h1>useVisibilityChange</h1>
      <div>Tab Away Count: {tabAwayCount}</div>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733898586331-84ac6674-1ae8-411c-854a-f1b409685afc.png)

### [useScript](https://usehooks.com/usescript) 加载脚本
> 加载和管理外部 JavaScript 脚本
>

+ **语法：**`**const status = useScript(src, options?)**`
+ **参数：**
    - `**src**` - 外部 JS 脚本的 URL
    - `**options**` - （可选）一个包含 `**removeOnUnmount**` 属性的对象，当设置为 true 时，将在组件卸载时移除脚本
+ **返回值：**脚本加载的状态：`**loading**`、`**ready**`、`**error**` 或 `**unknown**`。`**unknown**` 是指文档中先前存在的脚本，但未通过 useScript 添加

```jsx
import { useEffect } from 'react'
import { useScript } from '@uidotdev/usehooks'
import ScriptMeta from './ScriptMeta'

export default function App() {
  const status = useScript(
    `https://cdnjs.cloudflare.com/ajax/libs/mootools/1.6.0/mootools-core.js`,
    {
      removeOnUnmount: false
    }
  )

  useEffect(() => {
    if (typeof window.$$ !== 'undefined') {
      const id = document.id('moo')
      id.setStyle('background-color', 'var(--green)')
    }
  }, [status])

  const isReady = status === 'ready'

  return (
    <section>
      <h1>useScript</h1>
      <p>
        <span id='moo' className={isReady ? 'ready' : ''} />
        <label>Status: {status}</label>
      </p>
      {status === 'ready' && <ScriptMeta title='MooTools' status={status} meta={window.MooTools} />}
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733900241756-f8a88270-e0db-40c4-aa5e-a03e4025eec2.png)

### [useRenderInfo](https://usehooks.com/userenderinfo) 渲染调试
> 调试渲染并提高性能
>

+ **语法：**`**const info = useRenderInfo(componentName)**`
+ **参数：**`**componentName**` - 组件名称，用于区分不同组件的渲染信息
+ **返回值：**
    - `**info**` - 包含组件渲染信息的对象
        * `**name**` - 组件名称
        * `**renders**` - 组件渲染次数
        * `**sinceLastRender**` - 上一次渲染到本次渲染的时间间隔（单位：ms）
        * `**timestamp**` - 当前渲染的时间戳

```jsx
import { useState } from 'react'
import { useRenderInfo } from '@uidotdev/usehooks'

export default function App() {
  const info = useRenderInfo('App')

  const [count, setCount] = useState(0)

  return (
    <section>
      <h1>useRenderInfo</h1>
      <button className='primary' onClick={() => setCount(count + 1)}>
        Re-Render
      </button>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Render Info</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(info).map(key => {
            return (
              <tr key={key}>
                <th>{key}</th>
                <td>{info[key]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733903998336-5a0e5f88-a044-43d0-944b-a41b68e8348a.png)

### [useRenderCount](https://usehooks.com/userendercount) 渲染次数监控
> 识别不必要的重新渲染并监控更新频率
>

+ **语法：**`**const renderCount = useRenderCount()**`
+ **参数：**无
+ **返回值：**组件渲染次数

```jsx
import { useState } from 'react'
import { useRenderCount } from '@uidotdev/usehooks'

export default function App() {
  const renderCount = useRenderCount()
  const [count, setCount] = useState(0)

  return (
    <section>
      <header>
        <h1>useRenderCount</h1>
        <h6>(strict mode on)</h6>
      </header>
      <button className='primary' onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
      <p>Count: {count}</p>
      <p>Render Count: {renderCount}</p>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733904501709-42753d64-4f03-42cd-bb0a-ab5055686212.png)

### [useRandomInterval](https://usehooks.com/userandominterval) 随机间隔执行
> 以随机间隔执行回调函数
>

+ **语法：**`**const clear = useRandomInterval(cb, options)**`
+ **参数：**
    - `**cb**` - 以随机间隔执行的回调函数
    - `**options**` - 包含以下选项的对象
        * `**minDelay**` - 最小延迟时间（单位：毫秒）
        * `**maxDelay**` - 最大延迟时间（单位：毫秒）
+ **返回值：**清除定时器并停止随机间隔执行的函数
+ **注意：**该钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useRef, useEffect } from 'react'
import { useRandomInterval } from '@uidotdev/usehooks'
import HeartsDemo from './Heart'

export default function App() {
  const demo = useRef(new HeartsDemo())
  const clear = useRandomInterval(
    () => {
      demo.current.addHeart()
    },
    { minDelay: 50, maxDelay: 3000 }
  )

  useEffect(() => {
    demo.current.loop()
  }, [])

  return (
    <section>
      <h1>useRandomInterval</h1>
      <button className='link' onClick={clear}>
        Stop
      </button>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733905720571-76ea5fa8-2176-420c-9acf-1dbcd4ec90b1.png)

### [useIntervalWhen](https://usehooks.com/useintervalwhen) 可控计时器
> 创建可启动、暂停或恢复的动态计时器
>

+ **语法：**`**useIntervalWhen(cb, options)**`
+ **参数：**
    - `**cb**` - 在指定时间间隔执行的回调函数
    - `**options**` - 包含以下选项的对象
        * `**ms**` - 计时器的间隔时间，单位为毫秒
        * `**when**` - 决定时间间隔是激活（true）还是暂停（false）的条件
        * `**startImmediately**` - （可选）是否立即开始时间间隔。默认为 false
+ **返回值：**清除定时器并暂停执行的函数
+ **注意：**该钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { useIntervalWhen } from '@uidotdev/usehooks'

export default function App() {
  const [count, setCount] = useState(0)
  const [when, setWhen] = useState(false)

  useIntervalWhen(
    () => {
      setCount(c => c + 0.1)
    },
    { ms: 100, when, startImmediately: true }
  )

  return (
    <section>
      <h1>useIntervalWhen</h1>
      <button title='Click to toggle the timer' onClick={() => setWhen(!when)}>
        {count.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}
        <span className='btn link'>{when ? 'stop' : 'start'}</span>
      </button>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733906459096-b7633111-0d89-4b61-9224-ae38fddf56b5.png)

### [useInterval](https://usehooks.com/useinterval) 定时器
> 安排数据轮询或动画等周期性操作
>

+ **语法：**`**const clearInterval  = useInterval(cb, ms)**`
+ **参数：**
    - `**cb**` - 回调函数，每隔 ms 毫秒执行一次
    - `**ms**` - 轮询间隔，单位为毫秒
+ **返回值：**清除定时器并停止执行的函数
+ **注意：**该钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { useInterval } from '@uidotdev/usehooks'

const colors = ['green', 'blue', 'purple', 'red', 'pink', 'beige', 'yellow']

export default function App() {
  const [running, setIsRunning] = useState(true)
  const [index, setIndex] = useState(0)

  const clear = useInterval(() => {
    setIndex(index + 1)
  }, 1000)

  const handleStop = () => {
    clear()
    setIsRunning(false)
  }

  const color = colors[index % colors.length]
  return (
    <section>
      <h1>useInterval</h1>
      <button disabled={!running} className='link' onClick={handleStop}>
        {running ? 'Stop' : 'Stopped'}
      </button>
      <div style={{ backgroundColor: `var(--${color})` }} />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733908540784-98590005-a0ab-44f9-bf2f-71f6deb79b4e.png)

### [useTimeout](https://usehooks.com/usetimeout) 延迟执行
> 创建延迟操作或定时事件
>

+ **语法：**`**const clearTimeout = useTimeout(cb, ms)**`
+ **参数：**
    - `**cb**` - 回调函数，延迟执行的函数
    - `**ms**` - 延迟时间，单位为毫秒
+ **返回值：**清除定时器并取消回调执行的函数
+ **注意：** 这个钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { useTimeout } from '@uidotdev/usehooks'

function Bomb({ hasExploded, hasDefused, handleClick }) {
  if (hasExploded) {
    return (
      <figure>
        <span role='img' aria-label='Explosion Emoji'>
          💥
        </span>
        <figcaption>You lose</figcaption>
      </figure>
    )
  }

  if (hasDefused) {
    return (
      <figure>
        <span role='img' aria-label='Explosion Emoji'>
          🎉
        </span>
        <figcaption>You Win</figcaption>
      </figure>
    )
  }

  return (
    <button className='bomb' onClick={handleClick}>
      <span role='img' aria-label='Dynamite Emoji'>
        🧨
      </span>
    </button>
  )
}

export default function App() {
  const [hasDefused, setHasDefused] = useState(false)
  const [hasExploded, setHasExploded] = useState(false)

  const clear = useTimeout(() => {
    setHasExploded(!hasExploded)
  }, 1000)

  const handleClick = () => {
    clear()
    setHasDefused(true)
  }

  return (
    <section>
      <h1>useTimeout</h1>
      <p>You have 1s to defuse (click) the bomb or it will explode </p>
      <button
        className='link'
        onClick={() => {
          window.location.reload()
        }}
      >
        Reload
      </button>
      <Bomb hasDefused={hasDefused} hasExploded={hasExploded} handleClick={handleClick} />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733964385004-478707c6-508d-49c7-b62b-35fd28e9e51c.png)

### [useCountdown](https://usehooks.com/usecountdown) 倒计时
> 创建倒计时
>

+ **语法：**`**const count = useCountdown(endTime, options)**`
+ **参数：**
    - `**endTime**` - 结束时间，单位为 ms
    - `**options**` - 包含以下选项的对象
        * `**interval**` - 倒计时时间间隔，单位为 ms
        * `**onComplete**` - 倒计时归零时的回调函数
        * `**onTick**` - 倒计时每一秒的回调函数
+ **返回值：**倒计时的当前计数
+ **注意：**该钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { useCountdown } from '@uidotdev/usehooks'

export default function App() {
  const [endTime, setEndTime] = useState(new Date(Date.now() + 10000))
  const [complete, setComplete] = useState(false)

  const count = useCountdown(endTime, {
    interval: 1000,
    onTick: () => console.log('tick'),
    onComplete: time => setComplete(true)
  })

  const handleClick = time => {
    if (complete === true) return
    const nextTime = endTime.getTime() + time
    setEndTime(new Date(nextTime))
  }

  return (
    <section>
      <header>
        <h1>useCountdown</h1>
      </header>
      <span className='countdown'>{count}</span>
      {complete === false && (
        <div className='button-row'>
          <button onClick={() => handleClick(5000)}>+5s</button>
          <button onClick={() => handleClick(10000)}>+10s</button>
          <button onClick={() => handleClick(15000)}>+15s</button>
        </div>
      )}
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733909904401-a2712af0-d028-4a5f-a3ed-4c87b380f047.png)

### [useLockBodyScroll](https://usehooks.com/uselockbodyscroll) 禁用文档滚动
> 暂时禁用文档正文的滚动功能
>

+ **语法：**`**useLockBodyScroll()**`
+ **参数：**无
+ **返回值：**无

```jsx
import { useState } from 'react'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import { closeIcon } from './icons'
import DemoContent from './DemoContent'

function Modal({ handleClose }) {
  useLockBodyScroll()

  return (
    <div>
      <dialog>
        <header>
          <button onClick={handleClose}>{closeIcon}</button>
          <h2>Modal</h2>
        </header>
        <section>
          <DemoContent />
        </section>
      </dialog>
    </div>
  )
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {isOpen && <Modal handleClose={() => setIsOpen(false)} />}
      <main>
        <header>
          <h1>useLockBodyScroll</h1>
        </header>
        {['red', 'blue', 'green', 'pink', 'purple', 'yellow'].map(color => {
          return (
            <section
              style={{
                backgroundColor: `var(--${color})`,
                width: '100%',
                height: '50vh'
              }}
            />
          )
        })}
        <button className='primary' onClick={() => setIsOpen(true)}>
          openModal
        </button>
      </main>
    </>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733909055609-972a7f0a-82fa-4fcc-97c0-2046cad40e8f.png)

### [useQueue](https://usehooks.com/usequeue) 队列管理
> 添加、删除和清除队列数据结构中的元素
>

+ **语法：**`**const { add, remove, clear, first, last, size, queue } = useQueue(initialValue?)**`
+ **参数：**`**initialValue**` - （可选）队列的初始值。默认为空数组
+ **返回值：**
    - `**add**` - 添加元素到队列尾部
    - `**remove**` - 删除并返回队列中的第一个元素
    - `**clear**` - 清空队列
    - `**first**` - 队列中的第一个元素
    - `**last**` - 队列中的最后一个元素
    - `**size**` - 队列的长度
    - `**queue**` - 表示队列的当前数组

```jsx
import { useQueue } from '@uidotdev/usehooks'

function QueueDemo({ first, last, size, queue }) {
  return (
    <figure>
      <article>
        <p>Front</p>
        <ul>
          {queue.map((item, i) => {
            const isFirst = first === item
            const isLast = last === item
            if (isFirst) {
              return <li key={i}>First: {item}</li>
            }
            if (isLast) {
              return <li key={i}>Last: {item}</li>
            }
            return <li key={i}>Item: {item}</li>
          })}
        </ul>
        <p>Back</p>
      </article>
      <figcaption>{size} items in the queue</figcaption>
    </figure>
  )
}

export default function App() {
  const { add, remove, clear, first, last, size, queue } = useQueue([1, 2, 3])

  return (
    <div>
      <header>
        <h1>UseQueue</h1>
        <button className='link' onClick={() => add((last || 0) + 1)}>
          Add
        </button>
        <button disabled={size === 0} className='link' onClick={() => remove()}>
          Remove
        </button>
        <button disabled={size === 0} className='link' onClick={() => clear()}>
          Clear
        </button>
      </header>
      <QueueDemo queue={queue} size={size} first={first} last={last} />
    </div>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733910906570-d73600aa-2c08-4968-bfba-7b7ed9ee55b3.png)

### [useHover](https://usehooks.com/usehover) 监听元素悬停
> 监听元素是否被悬停
>

+ **语法：**`**const [ref, hovering] = useHover()**`
+ **参数：**无
+ **返回值：**
    - `**ref**` - 可附加到要悬停的元素上的 ref 对象
    - `**hovering**` - 布尔值，表示当前元素是否被悬停

```jsx
import { useHover } from '@uidotdev/usehooks'

function getRandomColor() {
  const colors = ['green', 'blue', 'purple', 'red', 'pink']
  return colors[Math.floor(Math.random() * colors.length)]
}

export default function App() {
  const [ref, hovering] = useHover()

  const backgroundColor = hovering ? `var(--${getRandomColor()})` : 'var(--charcoal)'

  return (
    <section>
      <h1>useHover</h1>
      <article ref={ref} style={{ backgroundColor }}>
        Hovering? {hovering ? 'Yes' : 'No'}
      </article>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1733963381298-8a0117f2-8551-4363-83a5-6aa8963b8df2.png)

### [useEventListener](https://usehooks.com/useeventlistener) 监听元素事件
> 监听目标元素上的事件
>

+ **语法：**`**useEventListener(target, eventName, handler, options?)**`
+ **参数：**
    - `**target**` - 目标元素。可以是元素对象，也可以是元素的 ref 对象（`**ref.current**`）
    - `**eventName**` - 事件名称
    - `**handler**` - 事件处理函数
    - `**options**` - （可选）事件侦听器的其他选项
        * `**capture**` - 是否在捕获阶段触发事件。默认为 `**false**`
        * `**passive**` - 指定事件监听器是否不调用 `**preventDefault()**`。默认为 `**false**`
        * `**once**` - 指定事件监听器是否只调用一次。默认为 `**false**`
+ **注意： **这个钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useRef, useState } from 'react'
import { useEventListener } from '@uidotdev/usehooks'
import { closeIcon } from './icons'

export default function App() {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = e => {
    const element = ref.current
    if (element && !element.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEventListener(document, 'mousedown', handleClick)

  return (
    <section>
      <h1>useEventListener</h1>
      <div style={{ minHeight: '200vh' }}>
        <button className='link' onClick={() => setIsOpen(true)}>
          Click me
        </button>
      </div>
      {isOpen && (
        <dialog ref={ref}>
          <button onClick={() => setIsOpen(false)}>{closeIcon}</button>
          <h2>Modal</h2>
          <p>Click outside the modal to close (or use the button) whatever you prefer.</p>
        </dialog>
      )}
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734313318018-bfc333b5-1c38-4e67-8571-a1dade094bdd.png)

### [useKeyPress](https://usehooks.com/usekeypress) 监听按键事件
> 监听按键事件
>

+ **语法：**`**useKeyPress(key, cb, options?)**`
+ **参数：**
    - `**key**` - 要监听的按键
    - `**cb**` - 按下按键时要执行的回调函数
    - `**options**` - （可选）按键事件的其他选项
        * `**event**` - 要监听的事件类型，默认值为 `**keydown**`
        * `**target**` - 要监听的目标元素或 window 对象，默认值为 `**window**`
        * `**eventOptions**` - 事件监听器的其他选项
+ **注意： **这个钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { useKeyPress } from '@uidotdev/usehooks'

export default function App() {
  const [activeKey, setActiveKey] = useState('')

  useKeyPress('ArrowRight', onKeyPress)
  useKeyPress('ArrowLeft', onKeyPress)
  useKeyPress('ArrowUp', onKeyPress)
  useKeyPress('ArrowDown', onKeyPress)

  function onKeyPress(e) {
    e.preventDefault()
    setActiveKey(e.key)
    setTimeout(() => {
      setActiveKey('')
    }, 600)
  }

  return (
    <section>
      <h1>useKeyPress</h1>
      <p>Press one of the arrow keys on your keyboard</p>
      <article>
        <button className={activeKey === 'ArrowUp' ? 'pressed' : ''}>
          <span>&uarr;</span>
        </button>
        <button className={activeKey === 'ArrowLeft' ? 'pressed' : ''}>
          <span>&larr;</span>
        </button>
        <button className={activeKey === 'ArrowDown' ? 'pressed' : ''}>
          <span>&darr;</span>
        </button>
        <button className={activeKey === 'ArrowRight' ? 'pressed' : ''}>
          <span>&rarr;</span>
        </button>
      </article>
      {Boolean(activeKey) && <label>{activeKey} was pressed</label>}
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734315413542-86c7a8b0-638e-4dd8-9360-d2ae9d462ee2.png)

### [useMap](https://usehooks.com/usemap) Map状态管理
> 根据 Map 数据结构同步和更新 state
>

+ **语法：**`**const map = useMap([[key, value], [key, value]])**`
+ **返回值：**具有增强方法的 Map 对象的实例

```jsx
import { useMap } from '@uidotdev/usehooks'

export default function App() {
  const map = useMap([
    ['Jazz', 32],
    ['Suns', 50]
  ])

  return (
    <section>
      <h1>useMap</h1>
      <table>
        <thead>
          <tr>
            <th colSpan={4}>Jazz vs Suns</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(map.keys()).map(team => {
            const score = map.get(team)
            return (
              <tr key={team}>
                <th style={{ width: '25%' }}>{team}</th>
                <td style={{ width: '50%' }}>{score}</td>
                <td style={{ width: '12.5%' }}>
                  <button
                    className='link'
                    onClick={() => {
                      map.set(team, score + 2)
                    }}
                  >
                    + 2
                  </button>
                </td>
                <td style={{ width: '12.5%' }}>
                  <button
                    className='link'
                    onClick={() => {
                      map.set(team, score + 3)
                    }}
                  >
                    + 3
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734316282180-64786974-72e4-47f4-8ad3-d0b7437e91c1.png)

### [useSet](https://usehooks.com/useset) Set状态管理
> 根据 Set 数据结构同步和更新 state
>

+ **语法：**`**const set = useSet(values?)**`
+ **参数：**`**values**` - （可选）集合的初始值
+ **返回值：**具有增强方法的 Set 对象的实例

```jsx
import { useState } from 'react'
import { useSet } from '@uidotdev/usehooks'

function format(val) {
  return val.toLocaleLowerCase().replace(/\s/g, '')
}

export default function App() {
  const [value, setValue] = useState('')
  const set = useSet([
    'benadam11',
    'tylermcginnis',
    'lynnandtonic',
    'alexbrown40',
    'uidotdev',
    'bytesdotdev',
    'reactnewsletter'
  ])

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('username')
    set.add(format(username))
    setValue('')
    e.target.reset()
    e.target.focus()
  }

  const hasError = set.has(value)

  return (
    <section>
      <h1>useSet</h1>
      <p>Check if your username is available</p>
      <article>
        <form className={hasError ? 'error' : ''} onSubmit={handleSubmit}>
          <span>@</span>
          <input
            type='text'
            name='username'
            placeholder='Enter a username'
            onChange={e => {
              setValue(format(e.target.value))
            }}
          />
        </form>
        {hasError && <label>Woops that user is taken</label>}
      </article>

      <table>
        <tbody>
          {Array.from(set.values()).map(username => {
            const match = username === value
            return (
              <tr key={username}>
                <th>username</th>
                <td
                  style={{
                    borderColor: match ? 'var(--red)' : 'var(--charcoal)'
                  }}
                >
                  {username}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734317375323-0dde734a-1630-4229-a91c-82ce8ec308c0.png)

### [useCopyToClipboard](https://usehooks.com/usecopytoclipboard) 文本复制
> 将文本复制到剪贴板
>

+ **语法：**`**const [copiedText, copyToClipboard] = useCopyToClipboard()**`
+ **参数：**无
+ **返回值：**
    - `**copiedText**` - 上次复制到剪贴板的值
    - `**copyToClipboard**` - 复制文本到剪贴板的函数

```jsx
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { copyIcon, checkIcon } from './icons'

const randomHash = crypto.randomUUID()

export default function App() {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const hasCopiedText = Boolean(copiedText)
  return (
    <section>
      <h1>useCopyToClipboard</h1>
      <article>
        <label>Fake API Key</label>
        <pre>
          <code>{randomHash}</code>
          <button
            disabled={hasCopiedText}
            className='link'
            onClick={() => copyToClipboard(randomHash)}
          >
            {hasCopiedText ? checkIcon : copyIcon}
          </button>
        </pre>
      </article>
      {hasCopiedText && (
        <dialog open={hasCopiedText}>
          <h4>
            Copied{' '}
            <span role='img' aria-label='Celebrate Emoji'>
              🎉
            </span>
          </h4>
          <textarea placeholder='Paste your copied text' />
        </dialog>
      )}
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734319752223-010e38c1-1c35-4eef-a574-d2c295ca7846.png)

### [useBattery](https://usehooks.com/usebattery) 监听电池状态
> 监听用户设备的电池状态
>

+ **语法：**`**const { supported, loading, level, charging, chargingTime, dischargingTime } = useBattery()**`
+ **参数：**无
+ **返回值：**
    - `**supported**` - 表示用户浏览器是否支持电池状态 API
    - `**loading**` - 表示电池状态是否正在加载
    - `**level**` - 表示电池的剩余电量，范围 0.0 到 1.0，1.0 表示满电状态
    - `**charging**` - 表示系统电池是否正在充电。true 表示电池正在充电，false 表示电池没有充电
    - `**chargingTime**` - 表示系统电池充满电之前的剩余时间（以秒为单位）
    - `**dischargingTime**` - 表示系统电池完全放电且系统即将暂停之前的剩余时间（以秒为单位）

```jsx
import { useBattery } from '@uidotdev/usehooks'
import Battery from './Battery'

export default function App() {
  const { loading, level, charging, chargingTime, dischargingTime } = useBattery()
  return (
    <>
      <div className='wrapper'>
        <h1>useBattery</h1>
        {!loading ? (
          <Battery
            level={level * 100}
            charging={charging}
            chargingTime={chargingTime}
            dischargingTime={dischargingTime}
          />
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734330331869-7082e8cf-901f-4c8b-bec1-d937442344d8.png)

### [useIdle](https://usehooks.com/useidle) 空闲状态监控
> 检测用户空闲状态
>

+ **语法：**`**const idle = useIdle(ms)**`
+ **参数：**`**ms**` - 空闲时间的持续时间（以毫秒为单位），空闲状态将在该时间后被设置为 true。默认值为 20 * 1000（20 秒）
+ **返回值：**一个布尔值，true 表示空闲状态，false 表示用户正在使用

```jsx
import { useIdle } from '@uidotdev/usehooks'

export default function App() {
  const idle = useIdle(5000)
  return (
    <section>
      <h1>useIdle</h1>
      <div>
        <span className={idle ? 'idle' : ''} />
        <label>Status: {idle ? 'Idle' : 'Active'}</label>
      </div>
      {idle ? <p>Time to move your mouse</p> : <p>Hold still and wait</p>}
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734331144300-537896ee-455a-4c21-b0da-7fcdbbcea323.png)

### [useToggle](https://usehooks.com/usetoggle) 切换布尔值
> 切换布尔值
>

+ **语法：**`**const [on, toggle] = useToggle(initialValue?)**`
+ **参数：**`**initialValue**` - （可选）切换状态的初始值
+ **返回值：**
    - `**on**` - 当前的切换状态
    - `**toggle**` - 切换状态的函数，调用时会将当前状态取反

```jsx
import { useToggle } from '@uidotdev/usehooks'

function ToggleDemo({ on, toggle }) {
  return (
    <div>
      <label className='toggle'>
        <input onChange={toggle} className='toggle-checkbox' type='checkbox' checked={on} />
        <div className='toggle-switch'></div>
        <span className='toggle-label'>{on ? 'On' : 'Off'}</span>
      </label>
    </div>
  )
}

export default function App() {
  const [on, toggle] = useToggle(true)

  return (
    <section>
      <h1>UseToggle</h1>
      <button disabled={on} className='link' onClick={() => toggle(true)}>
        Turn On
      </button>
      <button disabled={!on} className='link' onClick={() => toggle(false)}>
        Turn Off
      </button>
      <button className='link' onClick={toggle}>
        Toggle
      </button>
      <button className='link' onClick={() => toggle('nope')}>
        (Also toggles)
      </button>
      <ToggleDemo toggle={toggle} on={on} />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734332478995-d107d491-b218-48e7-9d68-fbe35002bc11.png)

### useHistoryState 撤销重做
> 添加撤消/重做功能
>

+ **语法：**`**const { state, set, undo, redo, clear, canUndo, canRedo } = useHistoryState(initialPresent?)**`
+ **参数：**`**initialPresent**` - （可选）初始状态值。默认值为 `**{}**`
+ **返回值：**
    - `**state**` - 当前状态值
    - `**set**` - 用于设置状态值的函数
    - `**undo**` - 用于撤消先前状态的函数
    - `**redo**` - 用于重做下一个状态的函数
    - `**clear**` - 用于清除状态历史记录并重置状态的函数
    - `**canUndo**` - 布尔值，表示是否可以撤消
    - `**canRedo**` - 布尔值，表示是否可以重做

```jsx
import Form from './Form'
import { useHistoryState } from '@uidotdev/usehooks'

export default function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistoryState({
    items: []
  })

  const addTodo = val => {
    set({
      ...state,
      items: state.items.concat({ id: crypto.randomUUID(), name: val })
    })
  }

  const removeTodo = id => {
    set({
      ...state,
      items: state.items.filter(item => item.id !== id)
    })
  }

  return (
    <section>
      <header>
        <h1>useHistoryState</h1>
        <div>
          <button disabled={!canUndo} className='link' onClick={undo}>
            Undo
          </button>
          <button disabled={!canRedo} className='link' onClick={redo}>
            Redo
          </button>

          <button disabled={!state.items.length} className='link' onClick={clear}>
            Clear
          </button>
        </div>
        <Form addItem={addTodo} />
      </header>

      <ul>
        {state.items.map((item, index) => {
          return (
            <li key={index}>
              <span>{item.name}</span>
              <button className='link' onClick={() => removeTodo(item.id)}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734333341912-85f9ca68-e234-4afd-a75b-13fd4a27a437.png)

### [useGeolocation](https://usehooks.com/usegeolocation) 地理位置监控
> 访问和监控用户的地理位置（在用户授权后）
>

+ **语法：**`**const state = useGeolocation(options)**`
+ **参数：**`**options**` - 可选参数，用于配置地理位置的选项，包括：`**enableHighAccuracy**`、`**timeout**`、`**maximumAge**`
+ **返回值：**
    - `**state**` - 一个包含以下属性的对象：
        * `**loading**` - 一个布尔值，表示当前是否正在获取地理位置数据
        * `**accuracy**` - 一个数值，表示当前的精度，单位为米
        * `**altitude**` - 一个数值，表示平均海拔高度，单位为米
        * `**altitudeAccuracy**` - 一个数值，表示海拔高度的精度，单位为米
        * `**heading**` - 一个数值，表示设备的方位角，单位为度
        * `**latitude**` - 一个数值，表示纬度，单位为度
        * `**longitude**` - 一个数值，表示经度，单位为度
        * `**speed**` - 一个数值，表示设备的速度，单位为米/秒
        * `**timestamp**` - 检索地理位置数据的时间戳
        * `**error**` - error 对象（如果在检索地理位置数据时发生错误）

```jsx
import { useGeolocation } from '@uidotdev/usehooks'
import Demo from './Demo'

export default function App() {
  return (
    <section>
      <h1>useGeolocation</h1>
      <Location />
    </section>
  )
}

function Location() {
  const state = useGeolocation()

  if (state.loading) {
    return <p>loading... (you may need to enable permissions)</p>
  }

  if (state.error) {
    return <p>Enable permissions to access your location data</p>
  }

  return <Demo state={state} />
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734337160187-83c867ce-3607-40d4-bc33-a547be121c97.png)

### [usePageLeave](https://usehooks.com/usepageleave) 监听页面离开
> 监听用户何时离开网页
>

+ **语法：**`**usePageLeave(cb)**`
+ **参数：**`**cb**` - 回调函数，当用户离开网页时执行
+ **注意：** 这个钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { usePageLeave } from '@uidotdev/usehooks'

export default function App() {
  const [distractions, setDistractions] = useState(0)

  usePageLeave(() => {
    setDistractions(d => d + 1)
  })

  return (
    <section>
      <h1>usePageLeave</h1>
      <p>(Mouse out of the page)</p>
      <h3>
        You've been distracted {distractions} {distractions === 1 ? 'time' : 'times'}.
      </h3>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734337731805-2032af8c-84b1-477c-b16a-831e9e43d071.png)

### [useObjectState](https://usehooks.com/useobjectstate) 对象状态管理
> 管理复杂的状态对象
>

+ **语法：**`**const [stats, setStats] = useObjectState(initialValue?)**`
+ **参数：**`**initialValue**` - （可选）初始状态值
+ **返回值：**
    - `**stats**` - 当前状态对象
    - `**setStats**` - 更新状态对象的方法

```jsx
import { useObjectState } from '@uidotdev/usehooks'

const initialState = {
  team: 'Utah Jazz',
  wins: 2138,
  losses: 1789,
  championships: 0
}

export default function App() {
  const [stats, setStats] = useObjectState(initialState)

  const addWin = () => {
    setStats(s => ({
      wins: s.wins + 1
    }))
  }

  const addLoss = () => {
    setStats(s => ({
      losses: s.losses + 1
    }))
  }

  const reset = () => {
    setStats(initialState)
  }

  return (
    <section>
      <h1>useObjectState</h1>

      <button className='link' onClick={addWin}>
        Add Win
      </button>
      <button className='link' onClick={addLoss}>
        Add Loss
      </button>

      <button className='link' onClick={() => alert('lol')}>
        Add Championship
      </button>
      <button className='link' onClick={reset}>
        Reset
      </button>

      <table>
        <thead>
          <tr>
            {Object.keys(stats).map(key => {
              return <th>{key}</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(stats).map(key => {
              return <td>{`${stats[key]}`}</td>
            })}
          </tr>
        </tbody>
      </table>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734338198991-c6624fd2-7391-4f96-bbcf-c805bbdfd49b.png)

### [useLogger](https://usehooks.com/uselogger) 调试生命周期
> 调试生命周期事件
>

+ **语法：**`**useLogger(name, …rest)**`
+ **参数：**
    - `**name**` - 记录器的名称或标识符
    - `**…rest**` - 要记录的其他参数
+ **注意：**这个钩子依赖于 React 的实验性 `**useEffectEvent**`

```jsx
import { useState } from 'react'
import { useLogger } from '@uidotdev/usehooks'

function FirstChild(props) {
  useLogger(props.name, props)
  return (
    <li className={props.isActive ? 'active' : ''}>
      <h5>{props.name}</h5>
      <p>{props.count}</p>
    </li>
  )
}

export default function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => setCount(count + 1)

  return (
    <section>
      <h1>useLogger</h1>
      <h6>(Check the console)</h6>
      <button className='primary' onClick={handleClick}>
        Increment Count
      </button>
      <ul>
        {['First', 'Second', 'Third'].map((item, index) => {
          const isActive = count % 3 === index
          return <FirstChild key={index} name={item} isActive={isActive} count={count} />
        })}
      </ul>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734338774645-4357d42e-8ff2-46c8-82e5-36252e2e950c.png)

### [useDocumentTitle](https://usehooks.com/usedocumenttitle) 更新网页标题
> 动态更新网页标题
>

+ **语法：**`**useDocumentTitle(title)**`
+ **参数：**`**title**` - 字符串，网页标题
+ **返回值：**无

```jsx
import { useState } from 'react'
import { useDocumentTitle } from '@uidotdev/usehooks'

export default function App() {
  const [count, setCount] = useState(0)

  useDocumentTitle(`Clicked ${count} times.`)
  return (
    <section>
      <h1>useDocumentTitle</h1>
      <h6>
        <a className='link' href='https://6vmc1n.csb.app/' target='_blank' rel='noreferrer'>
          Try in a new tab
        </a>
      </h6>
      <button className='primary' onClick={() => setCount(count + 1)}>
        Increment Count: {count}
      </button>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734339391957-99bcfcb1-a1a0-4163-9c87-17b16926bf28.png)

### [useFavicon](https://usehooks.com/usefavicon) 更新网页图标
> 动态更新网页图标
>

+ **语法：**`**useFavicon(url)**`
+ **参数：**`**url**` - 字符串，代表网站的 favicon 地址
+ **返回值：**无

```jsx
import { useState } from 'react'
import { useFavicon } from '@uidotdev/usehooks'

export default function App() {
  const [favicon, setFavicon] = useState('https://ui.dev/favicon/favicon-32x32.png')

  useFavicon(favicon)

  return (
    <section>
      <h1>useFavicon</h1>

      <button
        title="Set the favicon to Bytes' logo"
        className='link'
        onClick={() => setFavicon('https://bytes.dev/favicon/favicon-32x32.png')}
      >
        Bytes
      </button>
      <button
        title="Set the favicon to React Newsletter's logo"
        className='link'
        onClick={() => setFavicon('https://reactnewsletter.com/favicon/favicon-32x32.png')}
      >
        React Newsletter
      </button>

      <button
        title="Set the favicon to uidotdev's logo"
        className='link'
        onClick={() => setFavicon('https://ui.dev/favicon/favicon-32x32.png')}
      >
        ui.dev
      </button>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734341527962-01f8d852-0f66-40bd-999d-1376cf376cf9.png)

### [useIsFirstRender](https://usehooks.com/useisfirstrender) 首次渲染判断
> 区分首次渲染和后续渲染
>

+ **语法：**`**const isFirstRender = useIsFirstRender()**`
+ **参数：**无
+ **返回值：**布尔值，true 表示首次渲染，false 表示后续渲染

```jsx
import { useReducer } from 'react'
import { useIsFirstRender } from '@uidotdev/usehooks'

export default function App() {
  const isFirstRender = useIsFirstRender()
  const [count, rerender] = useReducer(x => x + 1, 1)

  return (
    <section>
      <h1>useIsFirstRender</h1>
      <h2>First Render? {isFirstRender ? 'Yes' : 'No'}</h2>
      <button className='primary' onClick={rerender}>
        re-render
      </button>
      <p>Render Count: {count}</p>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734339773270-579897fa-8890-407f-b981-5ce2b1552235.png)

### [useLongPress](https://usehooks.com/uselongpress) 长按交互控制
> 精确控制触摸和鼠标事件的长按交互
>

+ **语法：**`**const attrs = useLongPress(callback, options?)**`
+ **参数：**
    - `**callback**` - 当检测到长按事件时执行的回调函数
    - `**options**` - （可选）配置对象，包含以下属性：
        * `**threshold**` - 长按时间阈值（以毫秒为单位），默认为 400
        * `**onStart**` - 当用户开始按下时，将调用此函数
        * `**onFinish**` - 当长按事件成功完成时（用户在阈值后释放）将调用此函数
        * `**onCancel**` - 当长按事件被取消时（用户在阈值之前释放），将调用此函数
+ **返回值：**
    - `**attrs**` - 包含以下属性的对象：
        * `**onMouseDown**` - 鼠标按下的事件处理函数
        * `**onMouseUp**` - 鼠标松开的事件处理函数
        * `**onMouseLeave**` - 鼠标离开的事件处理函数
        * `**onTouchStart**` - 触摸开始的事件处理函数
        * `**onTouchEnd**` - 触摸结束的事件处理函数

```jsx
import { useState } from 'react'
import { useLongPress } from '@uidotdev/usehooks'
import { closeIcon } from './icons'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const attrs = useLongPress(
    () => {
      setIsOpen(true)
    },
    {
      onStart: event => console.log('Press started'),
      onFinish: event => console.log('Press Finished'),
      onCancel: event => console.log('Press cancelled'),
      threshold: 500
    }
  )

  return (
    <section>
      <h1>useLongPress</h1>
      <button {...attrs} className='primary'>
        Press Me
      </button>
      {isOpen && (
        <dialog>
          <button onClick={() => setIsOpen(false)}>{closeIcon}</button>
          <h2>Modal</h2>
          <p>This is a modal triggered by a long press.</p>
        </dialog>
      )}
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734341031251-80a7ddb1-ee9e-4fd4-847f-66803b8f9599.png)

### [useDefault](https://usehooks.com/usedefault) 默认值状态管理
> 管理默认值状态
>

+ **语法：**`**const [state, setState] = useDefault(initialValue, defaultValue)**`
+ **参数：**
    - `**initialValue**` - 初始值
    - `**defaultValue**` - 默认值，当 state 值为 `**undefined**` 或 `**null**` 时，要使用的默认值
+ **返回值：**
    - `**state**` - 当前状态值
    - `**setState**` - 更新状态值的方法

```jsx
import { useDefault } from '@uidotdev/usehooks'

export default function App() {
  const initialState = { name: 'Tyler' }
  const defaultState = { name: 'Ben' }

  const [user, setUser] = useDefault(initialState, defaultState)

  return (
    <section>
      <h1>useDefault</h1>

      <button
        title='Sets the value to Lynn'
        className='link'
        onClick={() => setUser({ name: 'Lynn' })}
      >
        Lynn
      </button>
      <button
        title='Sets the value to Tyler'
        className='link'
        onClick={() => setUser({ name: 'Tyler' })}
      >
        Tyler
      </button>
      <button
        title='Sets the value to null causing it to use the default value'
        className='link'
        onClick={() => setUser(null)}
      >
        Null
      </button>
      <pre>
        <code>{JSON.stringify(user)}</code>
      </pre>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734342202283-b5c340c4-5b66-4ad5-b524-f7971d333d32.png)

### [useWindowScroll](https://usehooks.com/usewindowscroll) 监听窗口滚动
> 监听和操作网页的滚动位置
>

+ **语法：**`**const [state, scrollTo] = useWindowScroll()**`
+ **参数：**无
+ **返回值：**
    - `**state**` - 当前窗口滚动位置，包含 x 和 y 轴的滚动距离
    - `**scrollTo**` - 一个函数，用于滚动到指定位置

```jsx
import { useWindowScroll } from '@uidotdev/usehooks'

export default function App() {
  const [{ x, y }, scrollTo] = useWindowScroll()
  return (
    <section>
      <header>
        <h1>useWindowScroll</h1>
        <button className='link' onClick={() => scrollTo(0, 1000)}>
          Scroll To (0, 1000)
        </button>
        <button
          className='link'
          onClick={() => scrollTo({ left: 0, top: 2000, behavior: 'smooth' })}
        >
          Scroll To (0, 2000) (Smoothly)
        </button>
        <button className='link' onClick={() => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}>
          Back To The Top
        </button>
      </header>

      {new Array(50).fill().map((_, index) => {
        return <p key={index}>{index}</p>
      })}
      <aside style={{ position: 'fixed', bottom: 0, right: 0 }}>
        Coordinates <span className='x'>x: {x}</span> <span className='y'>y: {y}</span>{' '}
      </aside>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734345844462-9516965e-52e3-4512-8232-2184fd220447.png)

### [useMeasure](https://usehooks.com/usemeasure) 监听组件尺寸
> 轻松测量和监听组件尺寸
>

+ **语法：**`**const [ref, rect] = useMeasure()**`
+ **参数：**无
+ **返回值：**
    - `**ref**` - 用于获取组件的 ref
    - `**rect**` - 包含被观察元素的宽度和高度的对象
        * `**width**` -  组件的宽度
        * `**height**` - 组件的高度

```jsx
import { useMeasure } from '@uidotdev/usehooks'

function Measure({ type = 'horizontal' }) {
  const [ref, { width, height }] = useMeasure()

  return (
    <figure>
      <figcaption>
        <span>{type}</span>
      </figcaption>
      <article
        ref={ref}
        className={type}
        style={{
          resize: type
        }}
      >
        {type === 'horizontal' ? (
          <label>width: {Math.floor(width)}</label>
        ) : (
          <label>height: {Math.floor(height)}</label>
        )}
      </article>
    </figure>
  )
}

export default function App() {
  return (
    <section>
      <h1>useMeasure</h1>
      <p>(Resize the rulers)</p>
      <Measure />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734396209134-eff78e41-9e59-45f7-8572-0baf4664c2dc.png)

### [useClickAway](https://usehooks.com/useclickaway) 监听组件外部点击
> 监听特定组件之外的点击
>

+ **语法：**`**const ref = useClickAway(callback)**`
+ **参数：**`**callback**` - 回调函数，当引用组件之外的点击发生时，该函数将被调用
+ **返回值：**返回一个 ref 对象，它应附加到 React 元素上，以监控点击事件

```jsx
import { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'
import { closeIcon } from './icons'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickAway(() => {
    setIsOpen(false)
  })

  const handleOpenModal = () => {
    if (isOpen === false) {
      setIsOpen(true)
    }
  }

  return (
    <>
      <section>
        <h1>useClickAway</h1>
        <button className='link' onClick={handleOpenModal}>
          Open Modal
        </button>
      </section>
      {isOpen && (
        <dialog ref={ref}>
          <button onClick={() => setIsOpen(false)}>{closeIcon}</button>
          <h2>Modal</h2>
          <p>Click outside the modal to close (or use the button) whatever you prefer.</p>
        </dialog>
      )}
    </>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734397521079-5eaa84d1-a4d0-4a5c-a7cf-2bc7aadc2879.png)

### [useList](https://usehooks.com/uselist) 列表管理
> 管理和操作列表
>

+ **语法：**`**const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList(defaultList)**`
+ **参数：**`**defaultList**` - 初始列表，默认值为空数组
+ **返回值：**
    - `**list**` - 当前列表
    - `**set**` - 用新数组替换整个列表
    - `**push**` - 在列表末尾添加一个元素
    - `**removeAt**` - 从列表中删除指定位置的元素
    - `**insertAt**` - 在指定位置插入一个元素
    - `**updateAt**` - 更新指定位置的元素
    - `**clear**` - 清空列表

```jsx
import { useList } from '@uidotdev/usehooks'
import ListDemo from './ListDemo'

export default function App() {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([
    'First',
    'Second',
    'Third'
  ])

  return (
    <section>
      <header>
        <h1>UseList</h1>
        <button disabled={list.length < 1} className='link' onClick={() => insertAt(1, 'woo')}>
          Insert After First
        </button>
        <button disabled={list.length < 2} className='link' onClick={() => removeAt(1)}>
          Remove Second Item
        </button>
        <button className='link' onClick={() => set([1, 2, 3])}>
          Reset
        </button>
        <button className='link' onClick={() => clear()}>
          Clear
        </button>
      </header>
      <ListDemo list={list} updateAt={updateAt} push={push} removeAt={removeAt} />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734398162469-4928c015-6e71-45e0-819e-f1ddf2204c6e.png)

### [useCounter](https://usehooks.com/usecounter) 范围计数器
> 管理具有最小和最大限制的计数器值
>

+ **语法：**`**const [count, { increment, decrement, set, reset }] = useCounter(startingValue, options)**`
+ **参数：**
    - `**startingValue**` - 初始值，默认值为 0
    - `**options**` - 计数器的其他选项：
        * `**min**` - 计数器允许的最小值
        * `**max**` - 计数器允许的最大值
+ **返回值：**
    - `**count**` - 当前值
    - `**increment**` - 将计数器递增 1
    - `**decrement**` - 将计数器递减 1
    - `**set**` - 将计数器设置为指定的 `**nextCount**` 值
    - `**reset**` - 将计数器重置为初始 `**startingValue**`

```jsx
import { useCounter } from '@uidotdev/usehooks'

export default function App() {
  const [count, { increment, decrement, set, reset }] = useCounter(5, {
    min: 5,
    max: 10
  })

  return (
    <section>
      <h1>UseCounter</h1>
      <h6>with optional min / max</h6>
      <button disabled={count >= 10} className='link' onClick={increment}>
        Increment
      </button>
      <button disabled={count <= 5} className='link' onClick={decrement}>
        Decrement
      </button>
      <button className='link' onClick={() => set(6)}>
        Set to 6
      </button>
      <button className='link' onClick={reset}>
        Reset
      </button>
      <p>{count}</p>
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734398731439-f840a7c2-2e63-44d1-adb3-b82bb8f897e1.png)

### [useMouse](https://usehooks.com/usemouse) 监听鼠标位置
> 监听鼠标光标的位置
>

+ **语法：**`**const [mouse, ref] = useMouse()**`
+ **参数：**无
+ **返回值：**
    - `**mouse**` - 表示当前鼠标位置和元素信息的对象
        * `**x**` - 鼠标相对于页面的当前水平位置
        * `**y**` - 鼠标相对于页面的当前垂直位置
        * `**elementX**` - 鼠标相对于元素左上角的当前水平位置
        * `**elementY**` - 鼠标相对于元素左上角的当前垂直位置
        * `**elementPositionX**` - 元素相对于页面的当前水平位置
        * `**elementPositionY**` - 元素相对于页面的当前垂直位置
    - `**ref**` - 可用于监听特定元素上的鼠标位置

```jsx
import { useMouse } from '@uidotdev/usehooks'
import Demo from './Demo'

export default function App() {
  const [mouse, ref] = useMouse()

  const xIntersecting = mouse.elementX > 0 && mouse.elementX < 300
  const yIntersecting = mouse.elementY > 0 && mouse.elementY < 300
  const isIntersecting = xIntersecting && yIntersecting

  return (
    <section>
      <h1>useMouse</h1>
      <article
        ref={ref}
        style={{ width: '300px', height: '300px' }}
        className={isIntersecting ? 'active' : ''}
      >
        Use a ref to add coords relative to the element
      </article>
      <Demo {...mouse} />
    </section>
  )
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1734399476642-37166372-fa0d-4fcc-899d-52360f103c8d.png)

