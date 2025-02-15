## 安装
```shell
npm install vue-router
```

## 使用示例
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from '../views/Foo.vue'
import Bar from '../views/Bar.vue'

// 1. 安装 VueRouter
Vue.use(VueRouter)

// 2. 定义路由
const routes = [
  {
    path: '/foo',
    name: 'foo',
    component: Foo
  },
  {
    path: '/bar',
    name: 'bar',
    component: Bar
  }
]

// 3. 创建 router 实例
const router = new VueRouter({
  routes
})

// 4. 创建和挂载根实例
const app = new Vue({
  router
}).$mount('#app')
```

## 动态路由
+ 一个“路径参数”使用冒号 `**:**` 标记。当匹配到一个路由时，参数值会被设置到 `**this.$route.params**`，可以在每个组件内使用。

```javascript
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const UserName = {
  template: '<div>User {{ $route.params.username }} - Post {{ $route.params.post_id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    {
      path: '/user/:id',
      name: 'user',
      component: User
    },
    // 可以设置多个“路径参数”，对应的值都会设置到 $route.params 上
    {
      path: '/user/:username/post/:post_id',
      name: 'username-post',
      component: UserName
    }
  ]
})
```

+ 通配符（`*****`）可以匹配任意路径
+ **注意：**为了确保路由正确匹配，含有_通配符_的路由应该放在最后

```javascript
{
  // 会匹配所有路径，通常用于客户端 404 错误
  path: '*',
  component: NotFoundComponent
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

+ 当使用一个_通配符_时，`**$route.params**` 内会自动添加一个名为 `**pathMatch**` 参数。它表示被通配符匹配的部分

```javascript
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

## 嵌套路由
+ **注意：**以 `**/**` 开头的嵌套路径会被当作根路径

```vue
<div id="app">
  <!-- 顶层出口，渲染最高级路由匹配到的组件 -->
  <router-view></router-view>
</div>
```

```javascript
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        {
          path: '',
          name: 'user-home',
          component: UserHome
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          name: 'user-profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          name: 'user-posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

## 声明式导航
+ 当点击 `**<router-link>**`** **时，其方法内部会调用 `**router.push**`，`**replace**` prop为 `**true**` 时，则会调用 `**router.replace**`

```vue
<router-link :to="...">User</router-link>
<!-- 等价于 router.push(...) -->

<router-link :to="..." replace>
<!-- 等价于 router.replace(...) -->
```

## 编程式导航
### router.push()
+ `**router.push**` 方法会向 history 栈添加一个新的记录

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

+ **注意：如果提供了 **`**path**`**，**`**params**`** 会被忽略**

```javascript
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123

// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

### router.replace()
> 用法与 router.push 基本相同，唯一不同是，它不会向 history 添加新记录，而是替换掉当前的 history 记录
>

### router.go()
```javascript
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

## 命名视图
> 同时（同级）展示多个视图，就需要给 `**router-view**`** **设置名字，没有设置名字的默认为 `**default**`
>

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      // 注意：这里需要带上 s
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

## 路由重定向
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/a',
      redirect: '/b'
    }
  ]
})

const router = new VueRouter({
  routes: [
    {
      path: '/a',
      redirect: { name: 'foo' }
    }
  ]
})

const router = new VueRouter({
  routes: [
    {
      path: '/a',
      redirect: to => {
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
      }
    }
  ]
})
```

## 路由别名
+ `**/a**` 的别名是 `**/b**`，意味着，当用户访问 `**/b**` 时，URL 会保持为 `**/b**`，但是路由匹配则为 `**/a**`，就像用户访问 `**/a**` 一样。

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/a',
      component: A,
      alias: '/b'
    }
  ]
})
```

## 路由元信息
> $route.matched 是一个数组，包含当前路由的所有匹配记录。
>

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // meta 字段
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

```javascript
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 此路由需要授权，检查是否已登录
    // 如果没有，则重定向到登录页面。
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## 路由懒加载
```javascript
const Foo = () => import('./Foo.vue')

const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }]
})

// 将某个路由下的所有组件都打包在同个异步块 (chunk) 中
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

## 路由组件传参
+ **使用 props 将组件和路由解耦：**

```javascript
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [{ path: '/user/:id', component: User }]
})

// 通过 props 解耦
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

### 布尔模式
```javascript
const User = {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  router: [
    {
      path: '/user/:id',
      component: User,
      props: true // 开启 props 功能
    }
  ]
})
```

### 对象模式
```javascript
const Promotion = {
  props: {
    newsletterPopup: {
      type: Boolean,
      default: true
    }
  },
  template: '<div>Promotion {{ newsletterPopup }}</div>'
}
const router = new VueRouter({
  routes: [
    {
      path: '/promotion/from-newsletter',
      component: Promotion,
      props: { newsletterPopup: false }
    }
  ]
})
```

### 函数模式
```javascript
const SearchUser = {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  template: '<div>Search User {{ query }}</div>'
}
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: SearchUser,
      props: route => ({ query: route.query.q })
    }
  ]
})
```

## 路由模式
> vue-router 默认是 hash 模式，可以设置路由为 history 模式，该模式是利用 `**history.pushState**` API 来完成 URL 跳转而无须重新加载页面
>

+ **注意：**history 模式，使用时需要后台配置支持

```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

## 导航守卫
### 全局前置守卫 - beforeEach
+ **注意：确保 **`**next**`** 函数在任何给定的导航守卫中都被严格调用一次。**
+ **参数：**
    - `**to**` - 即将要进入的目标路由对象
    - `**fro**`** **-** **当前导航正要离开的路由对象
    - `**next**` - 一个函数，一定要调用该函数来 resolve 这个钩子。执行效果依赖 `**next**` 函数的调用参数。
        * `**next()**` - 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就被确认，浏览器地址栏才会发生跳转。
        * `**next(false)**` - 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么导航会停止。
        * `**next(path)**` - 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
        * `**next(error)**` - 如果传入了一个错误对象，则导航会停止且错误会被传递给 router.onError() 注册过的回调。

```javascript
// 错误
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

// 正确
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

### 全局后置钩子 - afterEach
> 在每次路由切换后执行
>

```javascript
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享守卫 - beforeEnter
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内守卫
```javascript
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    // 可以通过传一个回调给 next来访问组件实例，该回调在导航被确认时调用
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`

    // 该守卫通常用来禁止用户在还未保存修改前突然离开
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
```

### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 导航故障
+ `**NavigationFailureType**` 有四种不同的类型：
    - `**redirected**` - 在导航守卫中调用了 `**next(newLocation)**` 重定向到了其他地方
    - `**aborted**` - 在导航守卫中调用了 `**next(false)**` 中断了本次导航
    - `**cancelled**` - 在当前导航还没有完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 `**router.push**`
    - `**duplicated**` - 导航被阻止，因为我们已经在目标位置了

```javascript
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter

// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
    
    // 向用户显示一个小通知
    showToast('Login in order to access the admin panel')
  }
})
```

## 常用 API
### `<router-link>`
```html
<!-- 点击时，内部会调用 router.push() -->
<!-- 字符串 -->
<router-link to="home">Home</router-link>
<!-- 渲染结果 -->
<a href="home">Home</a>

<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'home'">Home</router-link>

<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

<!-- 点击时，内部会调用 router.replace() -->
<router-link :to="{ path: '/abc'}" replace></router-link>
```

### `<router-view>`
> `**<router-view>**` 组件是一个 functional 组件，渲染路径匹配到的视图组件
>

+ 具体用法可查看：[命名视图](#ymoRp)

### router.currentRoute
> 当前路由对应的路由信息对象
>

```vue
created() {
  // { name: 'home', meta: {}, path: '/', hash: '', query: {}, params: {}, fullPath: '/', matched: [{...}] }
  console.log(this.$router.currentRoute)
}
```

### router.back
> 导航到前一个历史记录页面
>

```javascript
this.$router.back()
```

### router.forward
> 导航到后一个历史记录页面
>

```javascript
this.$router.forward()
```

### router.addRoute
> 如果该路由规则有 name，并且已经存在一个与之相同的名字，则会覆盖它
>

1. 添加一条新路由

```javascript
addRoute(route: RouteConfig): () => void

// 示例：
router.addRoute({
  path: '/system/user',
  name: 'user',
  meta: { title: '用户管理' },
  component: () => import('@/views/User.vue') // 路由按需加载
})
```

2. 为现有路由添加一条子路由

```javascript
addRoute(parentName: string, route: RouteConfig): () => void

// 示例：
router.addRoute('home', {
  path: '/system/menu',
  name: 'menu',
  meta: { title: '菜单管理' },
  component: () => import('@/views/Menu.vue') // 路由按需加载
})
```

### router.getRoutes
> 获取所有已注册的路由
>

```javascript
created() {
  console.log(this.$router.getRoutes())
}
```

