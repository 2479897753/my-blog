> Spring Boot 是一个开源的 Java 框架，它可以帮助我们非常快速的构建应用程序、简化开发、提高效率
>

## 入门程序解析
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713106313573-bcf6c893-c37f-4c63-b1b8-4f0cae771fdb.png)

_**SpringbootWebQuickstartApplication.java**_

```java
package com.itheima;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootWebQuickstartApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootWebQuickstartApplication.class, args);
    }

}
```

_**HelloController.java**_

```java
package com.itheima;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String hello(String name) {
        System.out.println("hello " + name);
        // 返回一个字符串
        return "hello " + name;
    }
}
```

**Tomcat 是一个 Servlet 容器，为什么可以运行我们编写的 HelloController？**

+ 由于在 SpringBoot 进行 web 程序开发时，底层提供了一个非常核心的 DispatcherServlet，请求到达 DispatchServlet 之后，会根据请求路径，将请求转给我们定义的 Controller 程序，最终由 Controller 程序进行逻辑的处理

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713106085136-7d7696e6-86f8-48eb-920b-2010405474d8.png)

## 统一响应结果
+ 无论执行的是增删改查什么样的业务操作，都返回一个统一的响应结果

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713591566259-7785fd44-fa2b-4b8d-9d69-fa4d1020df47.png)

:::info
**提示：**限制接口请求方式必须为 GET，可以通过 @RequestMapping 注解的 `**method**` 属性指定，也可以使用 @GetMapping

:::

```java
// @RequestMapping(value = "/depts", method = RequestMethod.GET)
@GetMapping("/depts")
```

## 分层解耦
### 三层架构
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713678665578-afc950dd-86ca-42d4-a9f7-26fc4709c149.png)

+ **controller：**控制层，接收前端发送的请求，对请求进行处理，并响应数据
+ **service：**业务逻辑层，处理具体的业务逻辑
+ **dao：**数据访问层(Data Access Object)（持久层），负责数据访问操作，包括数据的增、删、改、查

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713680559100-025ac5e2-1f55-4248-b077-de0230a105c5.png)

**程序优化**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713680893076-5f29d817-88cf-4b07-994e-abff9f895fab.png)

### 分层解耦
+ **耦合：**衡量软件中各个层/模块之间的依赖、关联的程度。
+ **内聚：**软件中各个功能模块内部的功能联系。
+ **软件设计原则：**高内聚低耦合。

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713682686968-58d5fd65-d9b9-4b65-a1b2-91091d58ad9e.png)

+ **控制反转：**Inversion Of Control，简称 **<font style="color:#DF2A3F;">IOC</font>**。对象的创建控制权由程序自身转移到外部（容器），这种思想称为控制反转
+ **依赖注入：**Dependency Injection，简称 **<font style="color:#DF2A3F;">DI</font>**。容器为应用程序提供运行时，所依赖资源，称之为依赖注入
+ **Bean 对象：**IOC 容器中创建、管理的对象，称之为 Bean

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713684349694-9609b65c-413a-4880-bd5f-913271a1ef2e.png)

### IOC 详解
+ 要把某个对象交给 IOC 容器管理，需要在对应的类上加上如下注解之一：
+ **注意：**声明 bean 的时候，可以通过注解的 value 属性指定 bean 的名字，如果没有指定，默认为类名首字母小写。

| 注解 | 说明 | 位置 |
| :---: | :---: | --- |
| @Component | 声明 bean 的基础注解 | 不属于以下三类时，用此注解 |
| @Controller | @Component 的衍生注解 | 标注在控制层类上 |
| @Service | @Component 的衍生注解 | 标注在业务层类上 |
| @Repository | @Component 的衍生注解 | 标注在数据访问层类上（由于与 mybatis 整合，用的少） |


+ 前面声明 bean 的四大注解，要想生效，还需要被组件扫描注解 `**@ComponentScan**` 扫描
+ 该注解虽然没有显式配置，但是实际上已经包含在了启动类声明注解 `**@SpringBootApplication**` 中，默认**<font style="color:#DF2A3F;">扫描的范围是启动类所在包及其子包</font>**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713688475940-bfdcc591-7811-47fd-b6e8-72641b039ae0.png)

### DI 详解
+ @Autowired 注解，默认是按照**<font style="color:#DF2A3F;">类型</font>**进行，如果存在多个相同类型的 bean，将会报出如下错误：

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713689317289-324a213c-abb5-473f-bf6f-e977bb93999c.png)

+ **@Resource 和 @Autowired 的区别？**
    - @Autowired 是 Spring 框架提供的注解，而 @Resource 是 JavaEE 规范提供的
    - @Autowired 默认是按照类型注入，而 @Resource 默认是按照名称注入



