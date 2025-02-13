## 单标签

### `br` 强制换行标签

```html
这是第一行文字<br />这是第二行文字
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674052536297-e1bb526e-ed8a-40e8-b651-b05614c426e4.png)

### `hr` 水平线标签

```html
我是水平线上面的文字
<hr />
我是水平线下面的文字
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674052629881-3f4fdb42-1d50-46d7-b34c-e1826154aed6.png)

### `img` 图片标签

> 图片默认是等比例缩放的

- 标签属性：
  - `src` 图片的引入路径
  - `alt` 图片显示失败时所显示的替代文本
  - `title` 鼠标悬停在图片上时显示的提示性文本
  - `width` 宽度
  - `height` 高度

```html
<img alt="假装有文字" src="./images/dog.gif" title="一只小柴犬" width="100" height="100" />
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674052680040-c0d9960e-0594-4f29-8924-ae248666c25b.png)

## 双标签

### `h1~h6` 标题标签

- 特点：
  - <font style="color: #dfdfd6;">独占一行</font>
  - <font style="color: #dfdfd6;">自带间距</font>
  - <font style="color: #dfdfd6;">文字加粗</font>
  - <font style="color: #dfdfd6;">文字大小从 1~6 依次减小</font>

```html
<h1>我是h1标题标签</h1>
<!-- 显示的文字最大 -->
<h2>我是h2标题标签</h2>
<h3>我是h3标题标签</h3>
<h4>我是h4标题标签</h4>
<h5>我是h5标题标签</h5>
<h6>我是h6标题标签</h6>
<!-- 显示的文字最小 -->
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674052817140-22a3e713-31b0-4be4-bbbd-a4ecbefd31e0.png)

### `p` <font style="color: #dfdfd6;">段落标签</font>

- <font style="color: #dfdfd6;">特点：</font>
  - <font style="color: #dfdfd6;">独占一行</font>
  - <font style="color: #dfdfd6;">自带间距</font>

```html
我是一行文字
<p>我是一段内容</p>
我是一行文字
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674052938091-ed231d6f-d2de-4950-a753-37d380a64dd9.png)

### 文本格式化标签

> 下面两个在浏览器上的表现效果一样，第二个加上了语义

- 加粗
  - `b`
  - `strong`
- 倾斜
  - `i`
  - `em`
- 下划线
  - `u`
  - `ins`
- 删除线
  - `s`
  - `del`

```html
<b>文字加粗</b>
<strong>文字加粗</strong>

<u>下划线标签</u>
<ins>下划线标签</ins>

<i>倾斜标签</i>
<em>倾斜标签</em>

<s>删除线标签</s>
<del>删除线标签</del>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674052982702-d34d1dde-4d52-4897-b1f9-ba7eb41ce2f7.png)

### `audio` 音频

- 标签属性：
  - `controls` 播放控件（必须添加！）
  - `src` 音频的引入路径
  - `autoplay` 自动播放
  - `loop` 循环播放
  - `muted` 静音

```html
<audio src="./images/music.mp3" controls autoplay loop></audio>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674054206163-f3180c23-9697-4bb1-8f49-018de77075a1.png)

### `video` 视频

- 标签属性：
  - `controls` 播放控件（必须添加！）
  - `src` 视频的引入路径
  - `autoplay` 自动播放
  - `loop` 循环播放
  - `muted` 静音（可以配合 autoplay 实现静音自动播放）
  - `width` 宽度
  - `height` 高度

```html
<video src="./images/video.mp4" controls loop autoplay width="300"></video>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674054619297-05ae04de-f96a-42cb-92d2-78c3419e4f10.png)

### `a` 超链接

- 标签属性：
  - `href` 跳转的目标地址
  - `target` 控制链接以何种方式打开
    - `_self` 在当前页打开（默认）
    - `_blank` 在新的空白页打开

```html
<a href="https://www.baidu.com" target="_blank">百度一下</a>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674054905630-c4928305-7733-42b7-bafe-f7f1c4c22aec.png)

**<font style="background-color: #ad9600;">锚链接</font>**

> href 属性的属性值可以设置为当前页面某个标签的 id 值

- 效果：点击超链接会跳到指定 id 值的标签位置

```html
<p>
  发展是人类社会的永恒主题。”“只有不断发展，才能实现人民对生活安康、社会安宁的梦想。”6月24日晚，习近平主席在北京以视频方式主持全球发展高层对话会并发表重要讲话。习近平主席把握世界大势，直面时代之问，鲜明提出了共创普惠平衡、协调包容、合作共赢、共同繁荣的发展格局的4点主张，为全球发展合作举旗定向，奏响了实现共同发展繁荣的时代强音。
</p>
<p id="one">
  发展是人类社会的永恒主题。”“只有不断发展，才能实现人民对生活安康、社会安宁的梦想。”6月24日晚，习近平主席在北京以视频方式主持全球发展高层对话会并发表重要讲话。习近平主席把握世界大势，直面时代之问，鲜明提出了共创普惠平衡、协调包容、合作共赢、共同繁荣的发展格局的4点主张，为全球发展合作举旗定向，奏响了实现共同发展繁荣的时代强音。
</p>
<p>
  发展是人类社会的永恒主题。”“只有不断发展，才能实现人民对生活安康、社会安宁的梦想。”6月24日晚，习近平主席在北京以视频方式主持全球发展高层对话会并发表重要讲话。习近平主席把握世界大势，直面时代之问，鲜明提出了共创普惠平衡、协调包容、合作共赢、共同繁荣的发展格局的4点主张，为全球发展合作举旗定向，奏响了实现共同发展繁荣的时代强音。
</p>
<p>
  发展是人类社会的永恒主题。”“只有不断发展，才能实现人民对生活安康、社会安宁的梦想。”6月24日晚，习近平主席在北京以视频方式主持全球发展高层对话会并发表重要讲话。习近平主席把握世界大势，直面时代之问，鲜明提出了共创普惠平衡、协调包容、合作共赢、共同繁荣的发展格局的4点主张，为全球发展合作举旗定向，奏响了实现共同发展繁荣的时代强音。
</p>
<p>
  发展是人类社会的永恒主题。”“只有不断发展，才能实现人民对生活安康、社会安宁的梦想。”6月24日晚，习近平主席在北京以视频方式主持全球发展高层对话会并发表重要讲话。习近平主席把握世界大势，直面时代之问，鲜明提出了共创普惠平衡、协调包容、合作共赢、共同繁荣的发展格局的4点主张，为全球发展合作举旗定向，奏响了实现共同发展繁荣的时代强音。
</p>
<a href="#one">点击去往某个地方</a>
```

## 列表

### 无序列表 `ul>li`

- `ul` 代表无序列表的整体
- `li` 代表无序列表的每一项
- 特点：
  - 独占一行
  - 双标签
  - ul 自带间距
  - ul 和 li 标签之间不允许放其他的标签，但 li 标签中可以放任何的标签

```html
<h1>无序列表</h1>
<ul>
  <li>
    <h1>俄称已完全控制北顿涅茨克</h1>
  </li>
  <li>俄称已完全控制北顿涅茨克</li>
  <li>俄称已完全控制北顿涅茨克</li>
  <li>俄称已完全控制北顿涅茨克</li>
  <li>俄称已完全控制北顿涅茨克</li>
</ul>
普通文字
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674137966885-9d3256fb-30ed-4199-9f9c-589416fdb528.png)

### 有序列表 `ol>li`

- `ol` 标签属性：
  - `start` 设置有序列表的序号初始值
  - `type` 设置有序列表序号的类型
    + 1（1，2，3，4）
    + a（a，b，c，d）
    + A（A，B，C，D）
    + i（i，ii，iii，iv）
    + I（I，II，III，IV）

```html
<h1>有序列表</h1>
<ol start="5" type="A">
  <li>俄称已完全控制北顿涅茨克</li>
  <li>俄称已完全控制北顿涅茨克</li>
  <li>俄称已完全控制北顿涅茨克</li>
  <li>俄称已完全控制北顿涅茨克</li>
</ol>
普通文字
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674138330161-44fb7ae8-0578-448c-8ea1-fe680cbcca77.png)

### 自定义列表 `dl>dt/dd`

- `dl` 代表自定义列表的整体
- `dt` 代表自定义列表每一个主题
- `dd` 代表自定义列表某一个主题下面的每一项
- 特点：
  - dl 自带间距，dd 前面有缩进
  - dl 和 dt/dd 之间不能放其他的标签，但是，dd 里面可以放任意标签

```html
<h1>自定义列表</h1>
<dl>
  <dt>手机</dt>
  <dd>苹果</dd>
  <dd>华为</dd>
  <dd>小米</dd>
  <dd>oppo</dd>
  <dd>vivo</dd>
  <dd>诺基亚</dd>
  <dd>锤子</dd>
  <dd>摩托罗拉</dd>
  <dd>魅族</dd>

  <dt>电脑</dt>
  <dd>戴尔</dd>
  <dd>惠普</dd>
  <dd>华硕</dd>
  <dd>苹果</dd>
  <dd>清华同方</dd>
</dl>
普通文字
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674138720738-7d02b3dd-c897-4ec0-af9e-7d4ca29556e5.png)

## 表格

### 基本结构 `table>tr>td`

- `table`\*\* \*\*代表着是表格的整体
- `tr` 代表着是表格的每一行，一个 tr 就是一行
- `td` 代表着是每一行里面的单元格，一个 td 就是一个单元格

### 完整的结构

- `caption` 表格顶部大标题，里面可以嵌套标题标签
- `table > thead > tr > th`
  - `thead` 表格的头部
  - `th` 一般用在表格的头部区域，给表格的每一列的标题添加，用来替代头部区域的 td
- `table > tbody > tr > td`
  - `tbody` 表格的主体内容
- `table > tfoot > tr > td`
  - `tfoot` 表格的底部

### `table` 标签属性

- `border` 边框
- `align` 设置整个表格的位置（添加到 tr 标签上可以控制每一行 td 中内容的位置）
- `width` 宽度
- `height` 高度
- `cellspacing` 控制单元格与单元格之间的距离
- `cellpadding` 控制单元格边框与内容之间的距离

### 单元格合并

- `rowspan` 合并行
- `colspan` 合并列

**使用步骤：**

1. <font style="color: #dfdfd6;">确定要合并的单元格是哪几个</font>
2. <font style="color: #dfdfd6;">根据左上原则（左右合并保留左边的，上下合并保留上边的），确定保留谁删除谁</font>
3. <font style="color: #dfdfd6;">确定使用的是 rowspan 还是 colspan，给保留的单元格设置</font>

```html
<table border="1" width="600" height="400" align="center" cellspacing="0">
  <caption>
    <h1>学生信息表</h1>
  </caption>
  <thead>
    <tr>
      <th>姓名</th>
      <th>性别</th>
      <th>年龄</th>
      <th>籍贯</th>
    </tr>
  </thead>
  <tbody align="center">
    <tr>
      <td>小明</td>
      <td rowspan="2">男</td>
      <td>24</td>
      <td>德州</td>
    </tr>
    <tr>
      <td>小蓝</td>
      <td>22</td>
      <td>济南</td>
    </tr>
  </tbody>
  <tfoot align="center">
    <tr>
      <td>总结：</td>
      <td colspan="3">这俩个人的成绩很好！</td>
    </tr>
  </tfoot>
</table>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674139899341-f645b75d-4ed0-416f-bdb3-b77acf114113.png)

## 表单

### 表单域 `form`

- 标签属性：
  - `action` 后端的提交地址

```html
<form action="https://www.baidu.com"></form>
```

### 文本输入框

`<input type="text">`

- 标签属性：
  - `type` 决定了 input 的类型（必须要写）
  - `name` 给 input 起了一个名字
  - `value` 默认展示值（保存用户输入的值）
  - `placehodler` 提示性文本信息

### 密码输入框

`<input type="password">`

### 单选

`<input type="radio">`

- 标签属性：
  - `checked` 默认选中
- **注意**：
  - 必须加 `value` 属性
  - 一组单选按钮的 `name` 属性值必须一样

### 多选

`<input type="checkbox">`

- 标签属性：
  - `checked` 默认选中
- 说明：可以使用 `label` 标签将<font style="color: #dfdfd6;">文字和单选 / 多选标签包裹起来实现点击文字选中效果</font>

### 文件上传

`<input type="file">`

- 标签属性：
  - `multiple` 多文件上传

### 提交按钮

`<input type="submit">`

> 会触发表单的提交（必须在 form 表单域中才能生效）

### 重置按钮

`<input type="reset">`

> 重置表单状态（必须在 form 表单域中才能生效）

### 普通按钮

`<input type="button">`

> 不会触发表单的提交，通常配合 js 来使用

### 下拉选择框 `select>option`

- `select` 最外层的选择框
- `option` 选择框中的每一项
- 标签属性：
  - `selected` 默认选中
- 注意：
  - 需要给 select 标签添加 `name` 属性
  - 需要给 option 标签添加 `value` 属性

```html
请选择城市：
<select name="city">
  <option value="0">山东济南</option>
  <option value="1" selected>宇宙曹县</option>
</select>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674142309259-60f8d665-e42f-4fd3-b480-575fbe478485.png)

### 文本域 `textarea`

- 标签属性：
  - `cols` 设置宽度
  - `rows` 设置高度

```html
相信您的建议/意见可以一针见血：
<textarea name="yijian" cols="80" rows="10">我是一颗卷心菜</textarea>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674142505585-12a722f2-efed-4f83-bb74-2da92891f57b.png)

### `button` 标签

- 标签属性：
  - `type` 取值：
    - `submit` 提交
    - `reset` 重置
    - `button` 普通按钮

```html
<button type="submit">提交按钮</button>
<button type="reset">重置按钮</button>
<button type="button">普通按钮</button>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674142910866-c305749b-e68a-4b1e-bd14-bd8f74519e1f.png)

## 实体字符

### 空格 `&nbsp;`

### 制表符 `&emsp;`

### 左尖括号 `&lt;`

### 右尖括号 `&gt;`

### 人民币符号 `&yen;`

### 版权 `&copy;`

## `meta` 视口标签

- 标签属性：
  - `content` 取值：
    - `width=device-width` 宽度设置为设备的宽度
    - `initial-scale=1.0` 初始渲染的缩放比
    - `user-scalable=no` 是否允许用户缩放 yes（1） 允许，no（0） 不允许
    - `maximum-scale=1.0` 最大缩放比
    - `minimum-scale=1.0` 最小缩放比

```html
<!-- 移动端配置 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
/>
```

## <font style="color: #dfdfd6;">H5 语义化标签的使用（规范）</font>

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1674143340606-af8d8dc9-45f6-4bcf-a1cb-9cb110280050.png)

## 网页骨架结构

```html
<!-- 网站的标识： 通过这个可以分辨出这个网页是不是 H5 的网页 -->
<!DOCTYPE html>
<!-- lang：language，en：英语，zh-cn：中文 -->
<html lang="en">
  <head>
    <!-- charset：网页的字符集 默认使用 utf-8 -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- viewport：视口 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- seo 优化三大因素 -->
    <!-- seo：网站的排名 -->
    <!-- 排名的影响因素：竞价排名，手动(人为)优化，人工提交网站信息 -->

    <!-- description：描述 -->
    <!-- 用来展示网页的描述的，作用是给搜索引擎的爬虫看的 -->
    <meta name="description" content="" />

    <!-- 实际上，seo优化指望着这些措施是远远不够的 -->

    <!-- keywords：关键字，关键字之间使用英文的逗号隔开 -->
    <meta name="keywords" content="网上购物,家电" />

    <!-- icon图标设置 -->
    <!-- link:fav -->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <title>半截短袖</title>

    <style>
      .box {
        width: 100px;
      }
    </style>
  </head>
  <body>
    <!-- 语义化标签也可以影响 seo 优化 -->

    <!-- 爬虫喜欢 h1 里面的内容 -->
    <!-- h1 不要滥用 -->
    <!-- 爬虫也喜欢 a 标签中 href 的内容 -->
    <h1></h1>
    <!-- 友情链接 -->
    <a href=""></a>

    <!-- h5 新增的标签，语义化的标签 -->
    <header></header>
    <aside></aside>
    <nav></nav>
    <footer></footer>
    <section></section>
    <audio src=""></audio>
    <video src=""></video>

    <!-- 大部分情况下，只有在做官网的时候才会用到 H5 的标签 -->

    <!-- <div class="header"></div> -->
    <div class="nav"></div>

    <!-- H5 新增的 input 的 type 类型 -->
    <!-- input type类型 -->
    <!-- input 的标签属性 -->
    <form action="">
      <div>
        <input type="email" />
      </div>
      <p>
        <!-- https://www.tencent.com/zh-cn/ -->
        <input type="url" />
      </p>
      <p>
        <input type="search" />
      </p>
      <p>
        <input type="number" />
      </p>
      <p>
        <input type="color" />
      </p>
      <p>
        <input type="range" />
      </p>
      <p>
        <!-- required: 必须 -->
        <!-- autocomplete  自动完成 取值：on 或 off -->
        <input type="text" required autocomplete="on" />
      </p>

      <div>
        <input type="submit" />
      </div>
    </form>
  </body>
</html>
```
