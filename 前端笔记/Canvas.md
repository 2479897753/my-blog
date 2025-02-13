## 填充 `fill()`
```html
<body>
  <canvas id="c1" width="600" height="400">
    <!-- 浏览器不支持 canvas 时，会显示这句话 -->
    当前浏览器不支持canvas，请下载最新的浏览器
    <a href="https://www.google.cn/chrome/">立即下载</a>
  </canvas>

  <script>
    // 1. 获取画布
    var c1 = document.getElementById('c1')
    // 2. 获取画笔（上下文对象）
    var ctx = c1.getContext('2d')
    // 3. 绘制图形
    // 填充绘制矩形 fillRect(x, y, width, height)
    // ctx.fillRect(100, 100, 200, 100)

    // 拆开写法
    ctx.rect(100, 100, 200, 100)
    ctx.fill()
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681278019939-5ea5578c-3694-41c7-848f-eae3d8ee8528.png)

## 路径 `stroke()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    // 1. 获取画布
    var c1 = document.getElementById('c1')
    // 2. 获取画笔（上下文对象）
    var ctx = c1.getContext('2d')
    // 3. 绘制图形
    // 路径绘制矩形 strokeRect(x, y, width, height)
    // ctx.strokeRect(100, 100, 200, 100)

    // 拆开写法
    ctx.rect(100, 100, 200, 100)
    ctx.stroke()
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681278614177-8cf87463-ac7d-4744-9cdb-9bedd00f6b30.png)

## 清除 `clearRect()`
> 这个方法通过把像素设置为透明以达到擦除一个矩形区域的目的
>

```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    // 1. 获取画布
    var c1 = document.getElementById('c1')
    // 2. 获取画笔（上下文对象）
    var ctx = c1.getContext('2d')
    // 3. 绘制图形
    // 路径绘制矩形 strokeRect(x, y, width, height)
    ctx.strokeRect(100, 100, 200, 100)
    // 填充绘制矩形 fillRect(x, y, width, height)
    ctx.fillRect(200, 150, 200, 100)
    // 清除图形
    // 将整个画布清除
    ctx.clearRect(0, 0, c1.offsetWidth, c1.offsetHeight)
  </script>
</body>
```

## 分段 `beginPath()`、`closePath()`
> `ctx.closePath()`会将当前路径的**起点**和**终点**连接起来，形成一个 **<font style="color:#DF2A3F;">闭合</font>** 的线段
>

```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    // 1. 获取画布
    var c1 = document.getElementById('c1')
    // 2. 获取画笔（上下文对象）
    var ctx = c1.getContext('2d')
    // 3. 绘制图形
    // beginPath 和 closePath 可以完成路径的分段
    ctx.beginPath()
    ctx.rect(100, 100, 200, 100)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.rect(200, 150, 200, 100)
    ctx.fill()
    ctx.closePath()
  </script>
</body>
```

## 圆弧 `arc()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    // 1. 获取画布
    var c1 = document.getElementById('c1')
    // 2. 获取画笔（上下文对象）
    var ctx = c1.getContext('2d')
    // 3. 绘制图形
    // 绘制圆弧 arc(圆心x, 圆心y, 半径r, 开始角度, 结束角度, 顺时针/逆时针)
    ctx.arc(300, 200, 50, 0, Math.PI, true)
    ctx.stroke()
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681281464196-ccc01c02-58eb-4c48-9891-a99d3e20bd0b.png)

### 使用圆弧绘制笑脸
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    // 1. 获取画布
    var c1 = document.getElementById('c1')
    // 2. 获取画笔（上下文对象）
    var ctx = c1.getContext('2d')
    // 3. 绘制图形
    ctx.beginPath()
    
    // 绘制一张脸
    ctx.arc(75, 75, 50, 0, Math.PI * 2)
    
    // 使用 moveTo 可以绘制一条不连续的路径（移动画笔到起始点）
    ctx.moveTo(110, 75)
    // 绘制嘴巴
    ctx.arc(75, 75, 35, 0, Math.PI)
    
    ctx.moveTo(65, 65)
    // 绘制左眼
    ctx.arc(60,65, 5, 0, Math.PI * 2)
    
    ctx.moveTo(95, 65)
    // 绘制右眼
    ctx.arc(90, 65, 5, 0, Math.PI * 2)
    
    ctx.stroke()

    ctx.closePath()
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681283515861-e12106fb-d6d3-432c-b35c-11e6a7b54949.png)

## 画线 `lineTo()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    // 1. 获取画布
    var c1 = document.getElementById('c1')
    // 2. 获取画笔（上下文对象）
    var ctx = c1.getContext('2d')
    // 3. 绘制图形
    // beginPath 和 closePath可以完成路径的分段
    ctx.beginPath()

    ctx.moveTo(300, 200)
    ctx.lineTo(400, 200)
    ctx.lineTo(300, 300)
    ctx.lineTo(300, 200)

    ctx.stroke()
    
    ctx.closePath()
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681292748053-fb7e7518-befd-4c6a-9776-deed6d754ee9.png)

## Path2D
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    // 1. 获取画布
    var c1 = document.getElementById('c1')
    // 2. 获取画笔（上下文对象）
    var ctx = c1.getContext('2d')
    // 3. 绘制图形

    var chartPath = new Path2D()

    // 绘制一张脸
    chartPath.arc(75, 75, 50, 0, Math.PI * 2)

    // 使用 moveTo 可以绘制一条不连续的路径（移动画笔到起始点）
    chartPath.moveTo(110, 75)
    // 绘制嘴巴
    chartPath.arc(75, 75, 35, 0, Math.PI)

    chartPath.moveTo(65, 65)
    // 绘制左眼
    chartPath.arc(60, 65, 5, 0, Math.PI * 2)

    chartPath.moveTo(95, 65)
    // 绘制右眼
    chartPath.arc(90, 65, 5, 0, Math.PI * 2)

    ctx.stroke(chartPath)
  </script>
</body>
```

### 创建和拷贝路径
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    let path1 = new Path2D();
    path1.rect(10, 10, 100, 100);

    let path2 = new Path2D(path1);
    path2.moveTo(220, 60);
    path2.arc(170, 60, 50, 0, 2 * Math.PI);

    ctx.stroke(path2);
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681348725958-44b38fa6-2d14-4b68-80ec-36541885ad35.png)

### 使用 SVG 路径
> 路径将会移动到点 (`M10 10`) ，然后向右侧水平移动 80 个点 (`h 80`)，然后向下 80 个点 (`v 80`)，然后向左 80 个点 (`h -80`)，最后回到起始点 (`z`)
>

```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    let p = new Path2D('M10 10 h 80 v 80 h -80 Z');
    ctx.fill(p);
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681354355744-549e1609-c889-4a66-bb38-e86da40cf6b8.png)

## 设置颜色 `fillStyle()`、`strokeStyle()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    let path1 = new Path2D();
    path1.rect(10, 10, 100, 100);
    ctx.fillStyle = 'skyblue'
    ctx.fill(path1)

    let path2 = new Path2D();
    path2.arc(170, 60, 50, 0, 2 * Math.PI);

    ctx.strokeStyle = '#0f0'
    ctx.stroke(path2);
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681355705700-34408da6-e725-4d14-8831-0ed2c96a8c9f.png)

## 设置样式
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    let index = 0
    
    function render() {
      // 清除上一次绘制
      ctx.clearRect(0, 0, 600, 400)

      if (index >= 60) {
        index = 0
      }

      index++

      ctx.moveTo(150, 100)
      ctx.lineTo(300, 200)
      ctx.lineTo(450, 100)

      // 设置线条宽度（默认为1px）
      ctx.lineWidth = 2
      // 设置线条端点样式，butt对接（默认），round圆的，square正方形
      // ctx.lineCap = 'round'
      // 设置线条连接处的样式，mitter（默认），round圆的，bevel倒角
      // ctx.lineJoin = 'round'
      // 设置虚线
      ctx.setLineDash([40, 20])
      // 虚线偏移
      ctx.lineDashOffset = index

      ctx.stroke()
      requestAnimationFrame(render)
    }
    render()
  </script>
</body>
```

![](https://cdn.nlark.com/yuque/0/2023/gif/33977556/1681369785177-36b5476f-5ecf-4532-9ca7-e8dd3c3435f1.gif)

## 渐变
### 线性渐变 `createLinearGradient()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    // 创建线性渐变 createLinearGradient(x1, y1, x2, y2)
    const linearGradient = ctx.createLinearGradient(100, 100, 300, 300)
    linearGradient.addColorStop(0, 'red')
    linearGradient.addColorStop(0.3, '#fff')
    linearGradient.addColorStop(1, 'blue')
    ctx.fillStyle = linearGradient
    
    ctx.fillRect(100, 100, 200, 200)
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681357929033-75ea72f6-6fc8-4898-bfa1-c3d574a0061d.png)

### 径向渐变 `createRadialGradient()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    // 创建径向渐变 createRadialGradient(x1, y1, r1, x2, y2, r2)
    const radialGradient = ctx.createRadialGradient(300, 200, 0, 300, 200, 200)
    radialGradient.addColorStop(0, 'red')
    radialGradient.addColorStop(0.3, '#fff')
    radialGradient.addColorStop(1, 'blue')
    ctx.fillStyle = radialGradient
    
    ctx.fillRect(0, 0, 600, 400)
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681361292681-4104d3b7-0f6a-4341-81ca-a34742bd441d.png)

#### 模拟球形
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    // 创建径向渐变 createRadialGradient(x1, y1, r1, x2, y2, r2)
    const radialGradient = ctx.createRadialGradient(250, 150, 0, 300, 200, 100)
    radialGradient.addColorStop(0, '#fff')
    radialGradient.addColorStop(1, 'red')
    ctx.fillStyle = radialGradient

    ctx.arc(300, 200, 100, 0, Math.PI * 2)
    ctx.fill()
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681361787594-e0921f97-7c3d-4376-a2f2-10c16200f2d6.png)

## 图案填充 `createPattern()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    // 创建图案样式 pattern
    const img = new Image()
    img.src = './pattern.png'

    img.onload = function () {
      // 创建图案对象 createPattern(图片对象image或canvas, 重复方式repeat、no-repeat、repeat-x、repeat-y)
      const pattern = ctx.createPattern(img, 'repeat')
      ctx.fillStyle = pattern

      ctx.fillRect(0, 0, 600, 400)
    }
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681365625866-77a46431-243b-4272-a740-54216788dc77.png)

## 设置阴影
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    let path1 = new Path2D();
    path1.rect(10, 10, 100, 100);

    // 设置阴影
    ctx.shadowOffsetX = 5
    ctx.shadowOffsetY = 5
    ctx.shadowBlur = 5
    ctx.shadowColor = 'skyblue'
    
    ctx.fill(path1)

    let path2 = new Path2D();
    path2.arc(170, 60, 50, 0, 2 * Math.PI);

    ctx.stroke(path2);
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681370390713-2cd19f04-5baa-4352-8691-4ffe9ad86c8c.png)

## 绘制图片 `drawImage()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    const img = new Image()
    img.src = './img.png'
    img.onload = function () {
      // drawImage(图片实例对象, x, y, 图片width, 图片height)
      // ctx.drawImage(img, 0, 0, 600, 400)

      // drawImage(图片实例对象, 图片x1, 图片y1, 图片x2, 图片y2, x, y, 图片width, 图片height)
      ctx.drawImage(img, 440, 0, 800, 400, 0, 0, 600, 400)
    }
  </script>
</body>
```

## 绘制视频并添加水印
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>
  <video src="flower.webm" controls hidden></video>
  <button id="btn">播放</button>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    const video = document.querySelector('video')
    const btn = document.querySelector('#btn')
    btn.onclick = function () {
      if (video.paused) {
        video.play()
        render()
      } else {
        video.pause()
      }
    }

    const img = new Image()
    img.src = './img.png'

    function render() {
      ctx.drawImage(video, 0, 0, 600, 400)
      ctx.drawImage(img, 400, 350, 200, 50)
      requestAnimationFrame(render)
    }
  </script>
</body>
```

## 绘制文字 `strokeText()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    ctx.strokeStyle = '#ff0000'
    ctx.font = '100px Microsoft YaHei'
    // 文本水平对齐方式
    ctx.textAlign = 'center'
    // 文本垂直对齐方式
    ctx.textBaseline = 'middle'

    // ctx.fillText('Hello', 300, 200)
    
    const text = ctx.measureText('Hello!')
    console.log(text)
    
    // 绘制文字 strokeText(文本内容, x, y)
    ctx.strokeText('Hello', 300, 200)

    ctx.arc(300, 200, 5, 0, Math.PI * 2)
    ctx.fill()
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681379052972-fde05abe-b460-4d7c-a19d-df25034a9ed0.png)

## 转换
### 位移 `translate()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    // 位移 translate(水平位移, 竖直位移)
    // 注意：这里位移的是canvas坐标系
    ctx.translate(100, 100)
    ctx.fillRect(0, 0, 50, 50)
    ctx.translate(100, 100)
    ctx.fillRect(0, 0, 50, 50)
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681436739356-369ac33d-f9e7-461b-a080-bee1aa8241c5.png)

### 缩放 `scale()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    // 缩放 scale(水平缩放, 竖直缩放)
    // 注意：这里缩放的是canvas坐标系
    ctx.scale(5, 2)
    ctx.fillRect(0, 0, 50, 50)
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681437190481-aa188ee0-2a87-4064-a8b8-3387dfff0687.png)

### 旋转 `rotate()`
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    // 旋转 rotate(旋转角度)
    // 注意：这里旋转的是canvas坐标系
    ctx.rotate(Math.PI / 4)
    ctx.fillRect(0, 0, 400, 50)
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681437624558-2929f988-26f0-4ec1-acfb-06ddd0afdea9.png)

## 图像合成实现刮刮卡
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    #ggk {
      position: relative;
      width: 600px;
      height: 400px;
      font-size: 30px;
      text-align: center;
      line-height: 400px;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
</head>

<body>
  <div id="ggk">
    <span></span>
    <canvas id="c1" width="600" height="400"></canvas>
  </div>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    const img = new Image()
    img.src = './img.png'
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 600, 400)
      if (Math.random() < 0.1) {
        document.querySelector('#ggk span').innerText = '恭喜中奖100万！'
      } else {
        document.querySelector('#ggk span').innerText = '谢谢惠顾！'
      }
    }

    c1.onmousedown = function () {
      c1.onmousemove = function (e) {
        var x = e.pageX
        var y = e.pageY

        ctx.globalCompositeOperation = 'destination-out'

        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }
    }
    c1.onmouseup = function () {
      c1.onmousemove = null
    }
  </script>
</body>

</html>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681448260921-ae402854-c6d7-4053-b2aa-4db2ed26cc91.png)

## 裁剪
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    const img = new Image()
    img.src = './img.png'
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 600, 400)
    }

    let path1 = new Path2D();
    path1.rect(10, 10, 300, 300);

    // 根据路径对canvas进行裁剪
    ctx.clip(path1)
    
    ctx.fill(path1)
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681449088437-d769acdb-1e79-4481-8092-4f37de4f87a9.png)

## 绘制状态的保存与恢复
```html
<body>
  <canvas id="c1" width="600" height="500"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 100, 100)
    // 保存当前绘制状态
    ctx.save()

    ctx.fillStyle = 'green'
    ctx.fillRect(100, 100, 100, 100)
    ctx.save()

    ctx.fillStyle = 'blue'
    ctx.fillRect(200, 200, 100, 100)

    // 恢复上一个绘制状态
    ctx.restore()
    ctx.fillRect(300, 300, 100, 100)
    
    ctx.restore()
    ctx.fillRect(400, 400, 100, 100)
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681451724518-ded892d3-f795-4c41-9257-dadfb871ee2b.png)

## 操作像素使图片置灰
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    const img = new Image()
    img.src = './img.png'
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 600, 400)

      // 获取像素数据
      const imageData = ctx.getImageData(0, 0, 600, 400)
      console.log(imageData)

      // 循环修改数据
      for (let i = 0; i < imageData.data.length; i += 4) {
        // 计算出当前像素的平局值
        const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3

        imageData.data[i] = avg
        imageData.data[i + 1] = avg
        imageData.data[i + 2] = avg
        imageData.data[i + 3] = 255
      }

      // 将修改后的数据重新渲染到画布上
      // ctx.putImageData(imageData, 0, 0)
      ctx.putImageData(imageData, 0, 0, 300, 200, 300, 200)
    }
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1681452630921-bd9ebedd-92c1-4f09-b1b3-6e2390191e16.png)

## 实现元素交互
```html
<body>
  <canvas id="c1" width="600" height="400"></canvas>

  <script>
    const c1 = document.getElementById('c1');
    const ctx = c1.getContext('2d');

    class Circle {
      color = 'skyblue'
      isIn = false
      eventMapList = {
        hover: [],
        leave: []
      }

      constructor(x, y) {
        this.x = x
        this.y = y

        // 为画布注册鼠标移动事件
        c1.onmousemove = (e) => {
          const x = e.offsetX
          const y = e.offsetY
          this.isIn = ctx.isPointInPath(this.path, x, y)
          if (this.isIn) {
            this.eventMapList.hover.forEach(item => {
              item()
            })
          } else {
            this.eventMapList.leave.forEach(item => {
              item()
            })
          }
        }
      }

      onHover(fn) {
        this.eventMapList.hover.push(fn)
      }

      onLeave(fn) {
        this.eventMapList.leave.push(fn)
      }

      setPosition(x, y) {
        this.x = x
        this.y = y
      }

      draw() {
        this.path = new Path2D()
        this.path.arc(this.x, this.y, 50, 0, 2 * Math.PI);

        ctx.save()
        ctx.fillStyle = this.color
        ctx.fill(this.path)
        ctx.restore()
      }
    }

    const circle = new Circle(100, 100)
    circle.onHover(() => {
      circle.color = 'pink'
      c1.style.cursor = 'pointer'
    })
    circle.onLeave(() => {
      circle.color = 'skyblue'
      c1.style.cursor = 'default'
    })

    function render() {
      ctx.clearRect(0, 0, c1.width, c1.height)
      circle.draw()
      requestAnimationFrame(render)
    }
    render()
  </script>
</body>
```

**展示效果：**

![](https://cdn.nlark.com/yuque/0/2023/gif/33977556/1681457649938-23c54e4d-923d-454b-a9dd-0ce6916fd6b6.gif)

## 使用Canvas动态渲染连线
1. 创建Canvas元素

```html
<!-- 在HTML中创建一个Canvas元素，并设置宽度和高度。 -->
<canvas id="myCanvas" width="500" height="500"></canvas>
```

2. 获取Canvas上下文

```javascript
// 使用JavaScript获取Canvas的上下文。
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```

3. 绘制连线的函数

```javascript
// 创建一个函数，该函数将接收点位数组作为参数，并根据点位数组绘制连线。
function drawLines(points) {
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 设置线的样式
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  
  // 逐个绘制连线
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  
  ctx.stroke();
}
```

4. 调用连线函数进行渲染

```javascript
// 可多次调用绘制出不连续的多条线段
drawLines(points)
```

## PixiJS
### 安装
```shell
yarn add pixi.js
```

### 使用
```vue
<script setup>
  // 导入pixi.js
  import * as PIXI from 'pixi.js'
  
  // 创建应用
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true // 抗锯齿
  })
  
  // 将应用画布添加到DOM中
  document.body.appendChild(app.view)

  // 创建一个矩形
  const rectangle = new PIXI.Graphics()
  // lineStyle(线宽, 线颜色, 透明度)
  rectangle.lineStyle(4, 0xff0000, 1) // 设置边框样式
  // beginFill(颜色, 透明度)
  rectangle.beginFill(0x66ccff, 0.9) // 填充颜色
  // drawRect(x, y, width, height)
  rectangle.drawRect(0, 0, 164, 64) // 绘制矩形
  rectangle.endFill() // 结束填充

  // 图形的缩放
  // rectangle.scale.set(2, 2)
  // 图形的位移
  // rectangle.position.set(100, 100)
  // 图形的旋转
  // rectangle.rotation = 0.5
  // 图形的锚点
  // rectangle.pivot.set(82, 32)

  // 将矩形添加到舞台
  app.stage.addChild(rectangle)

  // 创建一个圆形
  const circle = new PIXI.Graphics()
  circle.beginFill(0x66ccff, 0.9)
  circle.drawCircle(0, 0, 32)
  circle.endFill()
  circle.position.set(300, 300)
  app.stage.addChild(circle)
</script>
```

### 绘制常见图形
```vue
<script setup>
  // 导入pixi.js
  import * as PIXI from 'pixi.js'
  
  // 创建应用
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true // 抗锯齿
  })
  
  // 将应用画布添加到DOM中
  document.body.appendChild(app.view)

  // 绘制圆角矩形
  const roundeRectangle = new PIXI.Graphics()
  roundeRectangle.beginFill(0x66ccff, 0.9)
  // drawRoundedRect(x, y, width, height, 半径r)
  roundeRectangle.drawRoundedRect(0, 0, 164, 64, 10) // 绘制圆角矩形

  // 绘制椭圆
  const ellipse = new PIXI.Graphics()
  ellipse.beginFill(0x66ccff, 0.9)
  // drawEllipse(x, y, width, height)
  ellipse.drawEllipse(0, 0, 164, 64) // 绘制椭圆
  ellipse.endFill()
  ellipse.position.set(700, 700)
  app.stage.addChild(ellipse)

  // 绘制多边形
  const polygon = new PIXI.Graphics()
  polygon.beginFill(0x660000, 0.9)
  // drawPolygon([x1, y1, x2, y2, x3, y3, x4, y4])
  polygon.drawPolygon([0, 0, 100, 0, 100, 100, 0, 100]) // 绘制多边形
  polygon.endFill()
  polygon.position.set(50, 300)
  app.stage.addChild(polygon)

  // 绘制圆弧
  const arc = new PIXI.Graphics()
  arc.beginFill(0x660000, 0.9)
  // arc(x, y, 半径r, 起始角度, 结束角度, 是否逆时针)
  arc.arc(0, 0, 32, 0, Math.PI, false)
  arc.endFill()
  arc.position.set(300, 50)
  app.stage.addChild(arc)

  // 绘制线段
  const line = new PIXI.Graphics()
  line.lineStyle(4, 0xff0000, 1)
  line.moveTo(0, 0) // 设置线段的起始点
  line.lineTo(100, 100)
  line.lineTo(200, 0)
  line.position.set(500, 50)
  app.stage.addChild(line)
</script>
```

### 纹理、动画、交互
```vue
<script setup>
  // 导入pixi.js
  import * as PIXI from 'pixi.js'
  
  // 创建应用
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true // 抗锯齿
  })
  
  // 将应用画布添加到DOM中
  document.body.appendChild(app.view)

  // 创建一个纹理
  const texture = PIXI.Texture.from('./textures/mujian.png')

  // 创建一个精灵
  const sprite = new PIXI.Sprite(texture)

  // 设置精灵的位置
  sprite.x = app.screen.width / 2
  sprite.y = app.screen.height / 2

  // 设置精灵的缩放
  sprite.scale.set(2, 2)

  // 设置精灵透明度
  sprite.alpha = 0.5

  app.stage.addChild(sprite)

  // ticker 实现动画
  app.ticker.add(delta => {
    console.log(delta)
    sprite.rotation += 0.01 * delta
  })

  // 为精灵添加交互事件
  sprite.interactive = true
  sprite.on('click', () => {
    console.log('click')
  })

  // 鼠标移入
  sprite.on('pointerenter', () => {
    sprite.alpha = 1
  })
  // 鼠标离开
  sprite.on('pointerout', () => {
    sprite.alpha = 0.5
  })

  // 绘制一个矩形
  const rect = new PIXI.Grahics()
  rect.beginFill(0xff0000)
  rect.drawRect(0, 0, 100, 100)
  rect.endFill()
  rect.x = 100
  rect.y = 100
  app.stage.addChild(rect)

  // 给矩形添加交互事件
  rect.interactive = true
  rect.on('click', () => {
    consol.log('rect click')
  })
</script>
```

### 资源管理
```vue
<script setup>
  // 导入pixi.js
  import * as PIXI from 'pixi.js'
  
  // 创建应用
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true // 抗锯齿
  })
  
  // 将应用画布添加到DOM中
  document.body.appendChild(app.view)

  // 添加资源
  PIXI.Assets.add('jian', './textures/jian.png')
  PIXI.Assets.add('man', './textures/man.png')
  PIXI.Assets.add('mujian', './textures/mujian.png')

  // 异步加载资源
  const texturesPromise = PIXI.Assets.load(['jian', 'man', 'mujian'])

  // 加载完成后创建精灵
  texturesPromise.then(textures => {
    // 创建容器
    const container = new PIXI.Container()
    
    // 创建精灵
    const sprite = new PIXI.Sprite(textures.jian)
    // 设置精灵的位置
    sprite.x = app.screen.width / 2
    sprite.y = app.screen.height / 2
    // 设置精灵锚点
    sprite.anchor.set(0.5)
    // 设置精灵缩放
    sprite.scale.Set(0.5)
    // 设置精灵透明度
    sprite.alpha = 0.5
    // 设置精灵旋转
    sprite.rotation = 0.5
    // 设置精灵混合模式
    sprite.blendMode = PIXI.BLEND_MODES.ADD
    // 设置精灵交互
    sprite.interactive = true
    // 设置精灵鼠标样式
    sprite.buttonMode = true
    // 设置精灵鼠标事件
    sprite.on('pointerdown', () => {
      console.log('pointerdown')
    })
    container.addChild(sprite)

    // 创建精灵
    const sprite2 = new PIXI.Sprite(textures.man)
    sprite2.scale.set(0.1)
    container.appChild(sprite2)

    app.stage.addChild(container)
  })
</script>
```

#### 一次性添加多个资源
```vue
<script setup>
  // 导入pixi.js
  import * as PIXI from 'pixi.js'
  
  // 创建应用
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true // 抗锯齿
  })
  
  // 将应用画布添加到DOM中
  document.body.appendChild(app.view)

  // 添加场景1的资源
  PIXI.Assets.addBundle('scene1', {
    jian: './textures/jian.png',
    man: './textures/man.png',
    mujian: './textures/mujian.png'
  })

  const texturesPromise = PIXI.Assets.loadBundle('scene1', (progress) => {
    console.log('加载完成：', progress)
  })

  // 加载完成后创建精灵
  texturesPromise.then(textures => {
    // 创建容器
    const container = new PIXI.Container()
    
    // 创建精灵
    const sprite = new PIXI.Sprite(textures.jian)
    // 设置精灵的位置
    sprite.x = app.screen.width / 2
    sprite.y = app.screen.height / 2
    // 设置精灵锚点
    sprite.anchor.set(0.5)
    // 设置精灵缩放
    sprite.scale.Set(0.5)
    // 设置精灵透明度
    sprite.alpha = 0.5
    // 设置精灵旋转
    sprite.rotation = 0.5
    // 设置精灵混合模式
    sprite.blendMode = PIXI.BLEND_MODES.ADD
    // 设置精灵交互
    sprite.interactive = true
    // 设置精灵鼠标样式
    sprite.buttonMode = true
    // 设置精灵鼠标事件
    sprite.on('pointerdown', () => {
      console.log('pointerdown')
    })
    container.addChild(sprite)

    // 创建精灵
    const sprite2 = new PIXI.Sprite(textures.man)
    sprite2.scale.set(0.1)
    container.appChild(sprite2)

    app.stage.addChild(container)
  })
</script>
```

### 文字与遮罩
```vue
<script setup>
  // 导入pixi.js
  import * as PIXI from 'pixi.js'
  
  // 创建应用
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true // 抗锯齿
  })
  
  // 将应用画布添加到DOM中
  document.body.appendChild(app.view)

  // 显示 hello world 文字
  const text = new PIXI.Text('Hello World', {
    fontFamily: 'Arial',
    fontSize: 180,
    fill: 0xff0000,
    align: 'center'
  })

  // 设置文字位置
  text.x = app.screen.width / 2
  text.y = app.screen.height / 2

  // 设置文字锚点
  text.anchor.set(0.5)
  // app.stage.addChild(text)

  // 创建一个精灵
  const bunny = PIXI.Sprite.from('./textures/bg.png')
  // 用精灵铺满整个屏幕
  bunny.width = app.screen.width
  bunny.height = app.screen.height
  // 使用文字作为精灵的遮罩
  bunny.mask = text
  app.stage.addChild(bunny)
</script>
```

### 滤镜特效
```vue
<script setup>
  // 导入pixi.js
  import * as PIXI from 'pixi.js'
  
  // 创建应用
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true // 抗锯齿
  })
  
  // 将应用画布添加到DOM中
  document.body.appendChild(app.view)

  // 创建一个纹理
  const texture = PIXI.Texture.from("./textures/mujian.png");
  // 创建一个精灵
  const sprite = new PIXI.Sprite(texture);
  // 设置精灵的位置
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;
  
  // 设置精灵的锚点
  sprite.anchor.set(0.5);
  
  // 将精灵添加到舞台
  app.stage.addChild(sprite);
  
  // 创建模糊滤镜
  const blurFilter = new PIXI.BlurFilter();
  // 设置模糊滤镜的模糊程度
  blurFilter.blur = 20;
  // 将模糊滤镜添加到精灵上
  sprite.filters = [blurFilter];

	// 监听鼠标是否进入精灵
  sprite.interactive = true;
  sprite.on('pointerover', () => {
    // 设置模糊滤镜的模糊程度
    blurFilter.blur = 0
  })
  sprite.on('pointerout', () => {
    // 设置模糊滤镜的模糊程度
    blurFilter.blur = 20
  })
</script>
```

#### 滤镜库
```vue
<script setup>
  // 导入pixi.js
  import * as PIXI from 'pixi.js'
  import { OutlineFilter, GlowFilter } from 'pixi-filters'
  
  // 创建应用
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    antialias: true // 抗锯齿
  })
  
  // 将应用画布添加到DOM中
  document.body.appendChild(app.view)

  // 创建一个纹理
  const texture = PIXI.Texture.from("./textures/mujian.png");
  // 创建一个精灵
  const sprite = new PIXI.Sprite(texture);
  // 设置精灵的位置
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;
  
  // 设置精灵的锚点
  sprite.anchor.set(0.5);
  
  // 将精灵添加到舞台
  app.stage.addChild(sprite);

  // 创建轮廓滤镜
	const outlineFilter = new OutlineFilter(5，0xffff00); // 为轮廓宽度，0x000000为轮廓颜色
  // 创建发光滤镜
  const glowFilter = newGlowFilter({
    distance: 50,
    outerStrength: 2,
    innerStrength: 0,
    color: 0xff0000,
    quality: 0.5
  })
  // 将轮廓滤镜添加到精灵上
	sprite.filters = [outlineFilter, glowFilter];
</script>
```

