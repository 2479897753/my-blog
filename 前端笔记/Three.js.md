> three.js，一个WebGL引擎，基于JavaScript，可直接运行GPU驱动游戏与图形驱动应用于浏览器。其库提供大量特性与API以绘制3D场景于浏览器。
>

## three.js 三要素
1. **场景（scene）：**防止物体的容器
2. **相机（camera）：**类似人眼，可调位置，角度等信息，展示不同画面
3. **渲染器（renderer）：**接收场景和摄像机，计算在浏览器上渲染的最终 2D画面

```javascript
// main.js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();
```

## 透视相机（[PerspectiveCamera](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/cameras/PerspectiveCamera)）
+ **属性：**
    - `**.aspect**` - 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高。默认值是1（正方形画布）。
+ **方法：**
    - `**.updateProjectionMatrix ()**` - 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。

```javascript
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
scene.add( camera );
```

## 渲染器（[WebGLRenderer](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer)）
+ **构造器：**`**WebGLRenderer( parameters : Object )**`
    - **参数：**
        * `**parameters**` - (可选) 该对象的属性定义了渲染器的行为。也可以完全不传参数。在所有情况下，当缺少参数时，它将采用合理的默认值。 
            + `**antialias**` - 是否执行抗锯齿。默认为`**false**`.
    - **方法：**
        * `**.setSize ( width : Integer, height : Integer, updateStyle : Boolean ) : undefined**`** **- 将输出`**canvas**`的大小调整为`**(width, height)**`并考虑设备像素比，且将视口从`**(0, 0)**`开始调整到适合大小 将`**updateStyle**`设置为`**false**`以阻止对`**canvas**`的样式做任何改变。

```javascript
import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.render(scene, camera)
```

## 轨道控制器（[OrbitControls](https://threejs.org/docs/index.html#examples/zh/controls/OrbitControls)）
> Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。
>

+ **构造函数：**`**OrbitControls( object : Camera, domElement : HTMLDOMElement )**`
+ **参数：**
    - `**object**` - （必须）将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。
    - `**domElement**` - 用于事件监听的HTML元素。
+ **属性：**
    - `**.enableDamping**` 将其设置为`**true**`以启用阻尼（惯性），这将给控制器带来重量感。默认值为`**false**`。
    - `**.autoRotate**` 将其设为`**true**`，以自动围绕目标旋转。
    - `**.minPolarAngle**` 你能够垂直旋转的角度的下限，范围是`**0**`到`**Math.PI**`，其默认值为`**0**`。	
    - `**.maxPolarAngle**` 你能够垂直旋转的角度的上限，范围是`**0**`到`**Math.PI**`，其默认值为`**Math.PI**`。
    - `**.minAzimuthAngle**` 你能够水平旋转的角度下限。如果设置，其有效值范围为`**[-2 * Math.PI，2 * Math.PI]**`，且旋转角度的上限和下限差值小于`**2 * Math.PI**`。默认值为无穷大。
    - `**.maxAzimuthAngle**` 你能够水平旋转的角度上限。如果设置，其有效值范围为`**[-2 * Math.PI，2 * Math.PI]**`，且旋转角度的上限和下限差值小于`**2 * Math.PI**`。默认值为无穷大。
    - `**.minDistance**` 你能够将相机向内移动多少（仅适用于[PerspectiveCamera](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera)），其默认值为`**0**`。
    - `**.maxDistance**` 你能够将相机向外移动多少（仅适用于[PerspectiveCamera](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera)），其默认值为`**Infinity**`。
+ **方法：**
    - `**.reset () : undefined**` - 将控制器重置为上次调用`**.saveState**`时的状态，或者初始状态。

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

// controls.update() 必须在对相机的变换进行任何手动更改后调用
camera.position.set( 0, 20, 100 );
controls.update();

function animate() {

	requestAnimationFrame( animate );

	// controls.enableDamping 或 controls.autoRotate 设置为 true，必须调用 controls.update()
	controls.update();

	renderer.render( scene, camera );

}
```

## 坐标轴辅助对象（[AxesHelper](https://threejs.org/docs/index.html#api/zh/helpers/AxesHelper)）
> 用于简单模拟3个坐标轴的对象.
>
> 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
>

+ **构造函数：**`**AxesHelper( size : Number )**`
+ **参数：**
    - `**size**` - (可选的) 表示代表轴的线段长度. 默认为 1.

```javascript
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
```

## 网格（[Mesh](https://threejs.org/docs/index.html?q=Mesh#api/zh/objects/Mesh)）
+ **构造器：**`**Mesh( geometry : BufferGeometry, material : Material )**`
+ **属性:**
    - `**.material**` - 由Material基类或者一个包含材质的数组派生而来的材质实例，定义了物体的外观。默认值是一个MeshBasicMaterial。
    - 共有属性请参见其基类[Object3D](https://threejs.org/docs/index.html#api/zh/core/Object3D)。
        * `**.visible**` - 可见性。这个值为`**true**`时，物体将被渲染。默认值为`**true**`。
+ **方法：**
    - 共有方法请参见其基类[Object3D](https://threejs.org/docs/index.html#api/zh/core/Object3D)。
        * `**.position**` - 表示对象局部位置的Vector3（三维向量）。默认值为`**(0, 0, 0)**`。
        * `**.rotation**` - 物体的局部旋转，以弧度来表示。
        * `**.scale**` - 物体的局部缩放。默认值是Vector3`**( 1, 1, 1 )**`。

```javascript
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.Mesh( geometry, material );

// 位移 position 属性
// mesh.position.x = 5
mesh.position.set(5, 0, 0)

// 旋转 rotation 属性
// mesh.rotation.x = Math.PI / 4
mesh.rotation.set(Math.PI / 4, 0, 0)

// 缩放 scale 属性
// cube.scale.z = 2
mesh.scale.set(1, 1, 2)

scene.add( mesh );
```

## GUI 工具的使用
> 在Three.js中，可以使用`**dat.GUI**`库来创建和管理GUI工具。`**dat.GUI**`是一个用于创建简单的用户界面控件的库，可以用于调整和控制Three.js场景中的对象属性。
>

1. 首先，将`**dat.GUI**`库的脚本文件添加到HTML文件中，可以通过下载库文件并将其添加到项目中，或者使用CDN链接添加到HTML文件中。

```shell
npm install --save dat.gui
```

2. 创建一个GUI对象：

```javascript
// import * as dat from 'dat.gui'

var gui = new dat.GUI();
```

3. 创建一个需要控制的对象，并设置默认属性值：

```javascript
var object = {
  property: defaultValue
};
```

4. 将属性添加到GUI中，并指定属性的最小值、最大值和步长（如果需要）：

```javascript
gui.add(object, 'property', minValue, maxValue, step);
```

5. 可以通过添加回调函数来监听属性值的变化，并在属性值发生变化时执行相应的操作：

```javascript
gui.add(object, 'property').onChange(function(value) {
  // 在属性值发生变化时执行的操作
});
```

6. 可以使用`**dat.GUI**`库提供的其他控件类型来创建更复杂的GUI工具，例如下拉菜单、颜色选择器等。

```javascript
gui.add(object, 'property', ['option1', 'option2', 'option3']);
gui.addColor(object, 'property');
```

7. 创建分组

```javascript
const folder = gui.addFolder('组名称')
folder.add(object, 'property', minValue, maxValue, step)
```

