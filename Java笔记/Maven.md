> Maven 是一款用于管理和构建 Java 项目的工具，是 apache 旗下的一个开源项目。
>

## Maven 的作用
1. **依赖管理：** 方便快捷的管理项目依赖的资源（jar包）
2. **项目构建：** 标准化的跨平台（Linux、Windows、MacOS）的自动化项目构建方式
3. **统一项目结构：** 提供标准、统一的项目结构

## Maven 坐标
+ **什么是坐标？**
    - Maven 中的坐标是**<font style="color:#DF2A3F;">资源（jar）的唯一标识，通过该坐标可以唯一定位资源位置。</font>**
    - 使用坐标来**<font style="color:#DF2A3F;">定义项目</font>**或**<font style="color:#DF2A3F;">引入项目中需要的依赖</font>**。
+ **Maven 坐标主要组成**
    - `**groupId**`：定义当前的 Maven 项目隶属组织名称（通常是域名反写，例如：com.hkeji）
    - `**artifactId**`：定义当前 Maven 项目名称（通常是模块名称，例如 order-service、goods-service）
    - `**version**`：定义当前项目版本号
        * `**SNAPSHOT**`：功能不稳定、尙处于开发中的版本，即快照版本
        * `**RELEASE**`：功能趋于稳定、当前更新停止，可以用于发行的版本

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712664385602-79f5de8b-cf56-41ed-84ae-7267dc983493.png)

## 依赖管理
### 依赖配置
> 依赖查询地址：[https://mvnrepository.com](https://mvnrepository.com)
>

+ **依赖：**指当前项目运行时所需要的 jar 包，一个项目中可以引入多个依赖。
+ **配置：**
    1. 在 pom.xml 中编写 `**<dependencies>**` 标签
    2. 在 `**<dependencies>**` 标签中使用 `**<dependency>**` 引入坐标
    3. 定义坐标的 `**groupId**`，`**artifactId**`，`**version**`
    4. 点击刷新按钮，引入最新加入的坐标

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712668055205-95fabd7e-4e0e-458f-96f1-120ddffa94cc.png)

### 依赖传递
+ **依赖具有传递性**
    - **直接依赖：**在当前项目中通过依赖配置建立的依赖关系
    - **间接依赖：**被依赖的资源如果依赖其他资源，当前项目间接依赖其他资源

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712668757036-b1f86317-d9fa-4927-ade8-b5ef725712ec.png)

+ **排除依赖：**指主动断开依赖的资源，被排除的资源**<font style="color:#DF2A3F;">无需指定版本</font>**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712669114794-a624b4d7-111a-48bc-825d-5be5286574ee.png)

### 生命周期
> Maven 的生命周期就是为了对所有的 maven 项目构建过程进行抽象和统一
>

+ Maven 中有 3 套**<font style="color:#DF2A3F;">相互独立</font>**的生命周期：
    - `**clean**`：清理工作
    - `**default**`：核心工作，如：编译、测试、打包、安装、	部署等
    - `**site**`：生成报告、发布站点等
+ 每套生命周期包含一些阶段（phase），阶段是有顺序的，后面的阶段依赖于前面的阶段
    - **<font style="color:#DF2A3F;">clean</font>**：移除上一次构建生成的文件
    - **<font style="color:#DF2A3F;">compile</font>**：编译项目源代码
    - **<font style="color:#DF2A3F;">test</font>**：使用合适的单元测试框架运行测试（junit）
    - **<font style="color:#DF2A3F;">package</font>**：将编译后的文件打包，如：jar、war等
    - **<font style="color:#DF2A3F;">install</font>**：安装项目到本地仓库
+ **<font style="color:#DF2A3F;">注意：</font>**<font style="color:#DF2A3F;">在</font>**<font style="color:#DF2A3F;">同一套</font>**<font style="color:#DF2A3F;">生命周期中，当运行后面的阶段时，前面的阶段都会运行。</font>

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712669816619-5bc08fe1-ad37-4b48-84d0-e5e630875269.png)

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712670639402-0ec6ab79-2b11-4d0c-834a-28e45a5a5668.png)

## 单元测试
### 测试
> 是一种用来促进鉴定软件的正确性、完整性、安全性和质量的过程
>

+ **阶段划分：**单元测试（白盒测试）、集成测试（灰盒测试）、系统测试（黑盒测试）、验收测试（黑盒测试）

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712719655195-75fbc5f1-76b3-4c34-8846-23674c444bcb.png)

+ **测试方法：**白盒测试、黑盒测试、灰盒测试

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712720132972-9abf9a60-a166-4f4f-b9a8-81462e14aecd.png)

### 单元测试
> 单元测试就是针对最小的功能单元（方法），编写测试代码对其正确性进行测试
>

+ **JUnit（第三方公司提供）：**最流行的 Java 测试框架之一，提供了一些功能，方便程序进行单元测试

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712720570901-2171f350-fee0-49b2-80e4-7550678eae14.png)

+ **<font style="color:#DF2A3F;">注意：JUnit 单元测试类名命名规范：XxxxxTest【规范】。JUnit 单元测试的方法，必须声明为 public void【规定】</font>**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1712758337742-c9ff6d77-e9b8-4026-b2ff-fcc2d5cf083c.png)

### 常见注解
| 注解 | 说明 | 备注 |
| :---: | --- | :---: |
| @Test | 测试类中的方法用它修饰才能成为测试方法，才能启动执行 | 单元测试 |
| @BeforeEach | 用来修饰一个实例方法，该方法会在**<font style="color:#DF2A3F;">每一个</font>**测试方法执行之前执行一次 | 初始化资源（准备工作） |
| @AfterEach | 用来修饰一个实例方法，该方法会在**<font style="color:#DF2A3F;">每一个</font>**测试方法执行之后执行一次 | 释放资源（清理工作） |
| @BeforeAll | 用来修饰一个静态方法，该方法会在所有测试方法之前**<font style="color:#DF2A3F;">只执行一次</font>** | 初始化资源（准备工作） |
| @AfterAll | 用来修饰一个静态方法，该方法会在所有测试方法之后**<font style="color:#DF2A3F;">只执行一次</font>** | 释放资源（清理工作） |
| @ParameterizedTest | 参数化测试的注解（可以让单个测试运行多次，每次运行时仅参数不同） | **<font style="color:#DF2A3F;">用了该注解，就不需要@Test注解了</font>** |
| @ValueSource | 参数化测试的参数来源，赋予测试方法参数 | 与参数化测试注解配合使用 |
| @DisplayName | 指定测试类，测试方法显示的名称（默认为类名、方法名） |  |


### 断言
> JUnit 提供了一些辅助方法，用来帮我们确定被测试的方法是否按照预期的效果正常工作，这种方式被称为**<font style="color:#DF2A3F;">断言</font>**
>

| 断言方法 | 描述 |
| --- | --- |
| assertEquals(Object exp, Object act, String msg) | 检查两个值是否相等，不相等就报错 |
| assertNotEquals(Object unexp, Object act, String msg) | 检查两个值是否不相等，相等就报错 |
| assertNull(Object act, String msg) | 检查对象是否为 null，不为 null，就报错 |
| assertNotNull(Object act, String msg) | 检查对象是否不为 null，为 null，就报错 |
| assertTrue(boolean, condition, String msg) | 检查条件是否为 true，不为 true，就报错 |
| assertFalse(boolean, condition, String msg) | 检查条件是否为 false，不为 false，就报错 |
| assertSame(Object exp, Object act, String msg) | 检查两个对象引用是否相等，不相等，就报错 |


## 依赖范围
+ 依赖的 jar 包，默认情况下，可以在任何地方使用。可以通过 `**<scope>...<scope>**`** **设置其作用范围
+ 作用范围：
    - 主程序范围有效（main文件夹范围内）
    - 测试程序范围有效（test文件夹范围内）
    - 是否参与打包运行（package指令范围内）

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713006587775-eb9cdb6e-0f1a-4eb1-84ee-35ee63890743.png)



