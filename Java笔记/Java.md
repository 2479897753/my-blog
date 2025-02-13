## 注释
| 注释类型 | 区别 |
| --- | --- |
| 单行：`//` | 只需要注释一行时使用 |
| 多行注释：`/* */` | 需要注释多行时使用 |
| 文档注释：`/ */` | 一般用在类、方法、成员变量上，且在其上的注释内容会被提取到程序说明文档中去 |


## 字面量
| 常用数据 | 写法 |
| --- | --- |
| 整数（int） | 666、-88 |
| 小数（double） | 13.14、-5.21 |
| 字符（char） | 'A'、'0'、'我' |
| 字符串（String） | "HelloWorld"、"黑马程序员" |
| 布尔值（boolean） | true、false |
| 空值 | null |
| 特殊字符字面量 | \t、\n |


## 变量
+ **语法：**`变量类型 变量名 = 值;`

```java
int x = 10;
double price = 19.99;
String name = "John";
char c = 'a';
boolean state = true;
```

## 常量
> 使用 `static final` 修饰的成员变量被称为常量
>

+ **作用：** 通常用于记录系统的配置信息
+ **优势：** 代码可读性好，可维护性也更好
+ **执行原理：** 程序编译后，常量会被 "宏替换" ：出现常量的地方全部会被替换成其记住的字面量，这样可以保证使用常量和直接使用字面量的性能是一样的。
+ **注意：** 常量名一般使用大写英文单词，多个单词使用下划线连接起来

```java
public class Constant {
    public static final String SCHOOL_NAME = "北京大学";
}
```

## 关键字和标识符
+ **关键字：** 关键字是Java语言中预定义的具有特殊含义的单词，不能用作标识符（变量名、方法名等）。如：public、class、static、void、if、else、for、while 等
+ **标识符：** 标识符是程序员定义的用来表示变量、方法、类等的名称。标识符可以由字母、数字、下划线和美元符号组成，但必须遵循以下规则：
    - 标识符不能以数字开头。
    - 标识符区分大小写。
    - 标识符不能是Java关键字。
    - 标识符不能包含特殊字符（如 @、# 等）。

## 二进制转换
:::info
**Tip：**

+ **计算机中表示数据的单元：** 字节（byte，简称 B，是使用 8 个二进制位组成的）
+ 字节中的每个二进制位就称为 位（bit，简称 b），1B = 8b

:::

+ **注意：**Java 程序中支持写**二进制**、**八进制**、**十六进制**的数据，分别需要以**0B或者0b**、**0**、**0X或者0x**开头

### 十进制转二进制
**除二取余法**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713704138972-ae12dd52-1f1c-4e2a-9f5f-92ffde31d0c9.png)

### 二进制转十进制
**8 4 2 1 法**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713788348344-3a631e01-f918-499a-a7d4-b1b472259766.png)

### 八进制、十六进制
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713788703848-661b04a6-3b63-49e2-bca8-10268a2c7bf4.png)

## 数据类型
### 基本数据类型
| 数据类型 | | 内存占用(字节数) | 数据范围 |
| :---: | --- | :---: | --- |
| 整型 | byte | 1 | -128~127 |
| | short | 2 | -32768~32767 |
| | int(默认) | 4 | -2147483648~2147483647(10位数，大概21亿多) |
| | long | 8 | -9223372036854775808~9223372036854775807(19位数) |
| 浮点数(小数) | float | 4 | 1.401298 E -45 ~ 3.4028235 E +38 |
| | double(默认) | 8 | 4.9000000 E -324 ~ 1.797693 E +308 |
| 字符型 | char | 2 | 0~65535 |
| 布尔型 | boolean | 1 | true、false |


### 引用数据类型
+ **引用数据类型包括：** String、数组、对象等

### 包装类
> 把基本类型的数据包装成对象
>

+ **自动装箱：** 基本数据类型可以自动转换成包装类型
+ **自动拆箱：** 包装类型可以自动转换为基本数据类型

| 基本数据类型 | 对应的包装类（引用数据类型） |
| --- | --- |
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| char | Character |
| float | Float |
| double | Double |
| boolean | Boolean |


```java
Integer a = 1;
String a1 = a.toString();
String a2 = Integer.toString(a);
String a3 = String.valueOf(a);
String a4 = a + "";
System.out.println(Objects.equals(a1, "1")); // true
System.out.println(Objects.equals(a2, "1")); // true
System.out.println(Objects.equals(a3, "1")); // true
System.out.println(Objects.equals(a4, "1")); // true

String b = "2";
int b1 = Integer.parseInt(b);
int b2 = Integer.valueOf(b);
System.out.println(b1 == 2); // true
System.out.println(b2 == 2); // true
```

## 类型转换
### 自动类型转换
> **类型范围小**的变量，可以**直接赋值**给**类型范围大**的变量
>

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713793895966-984057d8-b4f0-471c-8597-e481445c3fa1.png)

### 强制类型转换
> **类型范围大**的数据或者变量，直接**赋值**给**类型范围小**的变量，会报错
>

+ **注意：**
    - 强制类型转换**可能造成数据(丢失)溢出**
    - 浮点型强转成整型，**直接丢掉小数部分，保留整数部分返回**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713794699810-89ff1d7a-1bf5-4787-901f-7d14c2b99fec.png)

### 表达式的自动类型转换
+ 注意：
    - 表达式的最终结果类型由表达式中的**最高类型决定**
    - **在表达式中 byte、short、char** 是**直接转换成 int 类型**参与运算的

```java
byte a = 23;
int b = 128;
long c = 256;
long res1 = a + b + c;

byte x = 10;
short y = 20;
char z = 30;
int res2 = x + y + z;
```

## 运算符
+ 与字符串做 + 运算时会被当成**连接符**，其结果还是字符串

| 符号 | 作用 | 说明 |
| :---: | :---: | --- |
| + | 加 | 略 |
| - | 减 | 略 |
| * | 乘 | 略 |
| / | 除 | 与 "**÷**" 相同，**注意：在 Java 中两个整数相除结果还是整数** |
| % | 取余 | 获取的是两个数据做除法的**余数** |


### 自增、自减运算符
| 符号 | 作用 |
| :---: | --- |
| 自增：++ | 放在某个变量前面或者后面，对变量自身的值加 1 |
| 自减：-- | 放在某个变量前面或者后面，对变量自身的值减 1 |


```java
int i = 10;
int temp = ++i;
System.out.println(i); // 11
System.out.println(temp); // 11

int j = 10;
int temp2 = j++;
System.out.println(j); // 11
System.out.println(temp2); // 10
```

### 扩展赋值运算符
+ **注意：扩展的赋值运算符隐含了强制类型转换**

| 符号 | 用法 | 作用 | 底层代码形式 |
| :---: | :---: | :---: | :---: |
| += | a += b | 加后赋值 | a = (a 的类型)(a + b); |
| -= | a -= b | 减后赋值 | a = (a 的类型)(a - b); |
| *= | a *= b | 乘后赋值 | a = (a 的类型)(a * b); |
| /= | a /= b | 除后赋值 | a = (a 的类型)(a / b); |
| %= | a %= b | 取余后赋值 | a = (a 的类型)(a % b); |


### 关系运算符
| 符号 | 例子 | 作用 | 结果 |
| :---: | :---: | :---: | :---: |
| > | a > b | 判断 a 是否**大于** b | 成立返回 true，不成立返回 false |
| >= | a >= b | 判断 a 是否**大于或等于** b | 成立返回 true，不成立返回 false |
| < | a < b | 判断 a 是否**小于** b | 成立返回 true，不成立返回 false |
| <= | a <= b | 判断 a 是否**小于或等于** b | 成立返回 true，不成立返回 false |
| == | a == b | 判断 a 是否**等于** b | 成立返回 true，不成立返回 false |
| != | a != b | 判断 a 是否**不等于** b | 成立返回 true，不成立返回 false |


### 逻辑运算符
| 符号 | 叫法 | 例子 | 运算逻辑 |
| :---: | :---: | :---: | --- |
| & | 逻辑与 | 2 > 1 & 3 > 2 | 多个条件必须都是 true，结果才是 true<br/>有一个是 false，结果就是 false |
| | | 逻辑或 | 2 > 1 | 3 < 5 | 多个条件中只要有一个是 true，结果就是 true |
| ! | 逻辑非 | !(2 > 1) | 就是取反：`**!true == false**`、`**!false == true**` |
| ^ | 逻辑异或 | 2 > 1 ^ 3 > 1 | 前后条件结果相同，就直接返回 false<br/>前后条件结果不同，才返回 true |


| 符号 | 叫法 | 例子 | 运算逻辑 |
| :---: | :---: | :---: | --- |
| && | 短路与 | 2 > 10 && 3 > 2 | 判断结果与 "&" 一样，过程不同：左边为 false，右边则不执行 |
| || | 短路或 | 2 > 1 || 3 < 5 | 判断结果与 "|" 一样，过程不同：左边为 true，右边则不执行 |


### 三元运算符
+ **语法：**`条件表达式 ? 值1 : 值2;`

```java
int a = 2 > 1 ? 12 : 23;
System.out.println(a); // 12

int b = 2 < 1 ? 12 : 23;
System.out.println(b); // 23
```

### 优先级
+ **注意：**`&&` 的优先级**高于** `||`

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713798940247-d4d69260-3af5-4467-a566-84d114ec41fc.png)

## 分支结构
### if 分支
+ 如果 if 语句的 {} 中只有一行代码的情况， {} 可以省略不写（**但是不推荐省略**）

```java
if (条件表达式) {
    // 代码
}

if (条件表达式) {
    // 代码1
} else {
    // 代码2
}

if (条件表达式1) {
    // 代码1
} else if (条件表达式2) {
    // 代码2
} else if (条件表达式3) {
    // 代码3
} ...
else {
    // 代码n
}
```

### switch 分支
+ **注意：**
    - 表达式类型只能是 byte、short、int、char，JDK5 开始支持枚举，JDK 7 开始支持 String，不支持 double、float、long
    - case 给出的值不允许重复，且只能是字面量，不能是变量
    - 正常使用 switch 的时候，不要忘记写 break，否则会出现穿透现象

```java
switch(表达式) {
    case 值1:
        // 代码1
        break;
    case 值2:
        // 代码2
        break;
    ...
    case 值n-1:
        // 代码n-1
        break;
    default:
        // 代码n
}
```

## 循环结构
### for 循环
```java
// 语法
for(初始化语句; 循环条件; 迭代语句) {
    // 循环体语句
}

// 示例
for(int i = 0; i < 3; i++) {
    System.out.println("Hello World"); // 输出3次 Hello World
}
```

### 增强 for 循环
```java
// 语法
for(元素的数据类型 变量名 : 数组或集合) {
    /* ... */
}

// 示例
int[] numbers = {10, 20, 30, 40, 50};
for (int x : numbers) {
    System.out.print(x);
    System.out.print(","); // 10,20,30,40,50,
}
```

### while 循环
```java
// 语法
初始化语句;
while(循环条件) {
    // 循环体语句;
    迭代语句;
}

// 示例
int 1 = 0;
while(i < 3) {
    System.out.println("Hello World");
    i++;
}
```

### do-while 循环
```java
// 语法
初始化语句;
do {
    // 循环体语句;
    迭代语句;
} while(循环条件);

// 示例
int i = 0;
do {
    System.out.println("Hello World");
    i++;
} while(i < 3)
```

### 死循环
```java
for( ; ; ) {
    System.out.println("Hello World1");
}

while(true) {
    System.out.println("Hello World2");
}

do {
    System.out.println("Hello World3");
} while(true)
```

### 循环嵌套
```java
for(int i = 0; i < 3; i++) {
    for(int j = 0; j < 5; j++) {
        System.out.println("Hello World");
    }
}
```

### break、continue
+ `break`：跳出并结束当前所在循环的执行
+ `continue`：用于跳出当前循环的当次执行，直接进入循环的下一次执行
+ **注意：**
    - `break`：只能用于结束所在循环，或者结束所在 switch 分支的执行
    - `continue`：只能在循环中进行使用

## 方法
```java
// 格式
修饰符 返回值类型 方法名(形参列表) {
    方法体代码;
    return 返回值;
}

// 示例
// public static 方法修饰符
// int 返回值类型
// sum 方法名
// int a, int b 形参列表
public static int sum(int a, int b) {
    int max = a > b ? a : b; // 方法执行代码
    return max; // 返回处理后的结果
}
```

### 方法重载
> 一个类中，出现多个方法的名称相同，形参列表不同，就被称为方法重载
>

```java
public class Test {
    public static void fire() {
        System.out.println("默认发射一枚武器给米国！");
    }

    public static void fire(String location) {
        System.out.println("给" + location + "发射一枚武器！");
    }

    public static void fire(String location, int nums) {
        System.out.println("给" + location + "发射" + nums + "枚武器！");
    }
}
```

### 方法重写
> 子类对父类的方法进行重新定义，返回值类型、方法名、参数列表完全相同
>

+ **注意事项：**
    1. 子类重写父类方法时，访问权限必须大于或者等于父类该方法的权限（public > protected > 缺省）
    2. 重写的方法返回值类型，必须与被重写方法的返回值类型一样，或者范围更小
    3. 私有方法、静态方法不能被重写，如果重写会报错。

```java
public class Parent {
    public void show() {
        System.out.println("父类的show方法");
    }
}
```

```java
public class Son extends Parent{
    @Override
    public void show() {
        System.out.println("子类的show方法");
    }
}
```

### 可变参数
> 可以传入任意个数的参数
>

+ **格式：**`类型... 变量名`
+ **说明：** 可变参数在方法中是数组
+ **注意：** 可变参数只能有一个，并且必须放在参数列表的最后

```java
public static int sum(int... nums) {
    int sum = 0;
    for (int num : nums) {
        sum += num;
    }
    return sum;
}
```

```java
public static void main(String[] args) {
    System.out.println(sum(1, 2, 3, 4, 5)); // 15
    System.out.println(sum(1, 2, 3)); // 6
    System.out.println(sum()); // 0
    
    int[] nums = {1, 2, 3, 4, 5};
    System.out.println(sum(nums)); // 15
}
```

## 数组
> 数组就是一个容器，用来存一批同种类型的数据
>

```java
int[] arr = {20, 10, 80, 60, 90};
String[] names = {"牛儿", "西门", "全蛋"};
```

### 静态初始化数组
> 定义数组的时候直接给数组赋值
>

+ **注意：**
    - `数据类型[] 数组名` 也可以写成 `数据类型 数组名[]`
    - 什么类型的数组只能存放什么类型的数据

```java
// 完整格式
数据类型[] 数组名 = new 数据类型[]{元素1, 元素2, 元素3, ...};
int[] args = new int[]{12, 24, 36};
double scores new double[]{89.9, 99.5, 59.5, 88.0};

// 简化格式
数据类型[] 数组名 = {元素1, 元素2, 元素3, ...};
int[] ages = {12, 24, 36};
```

### 数组的访问
```java
// 语法
数组名[索引]

// 取值
System.out.println(arr[0]); // 12

// 赋值
arr[2] = 100;
System.out.println(arr[2]); // 100

// 数组的长度属性：length
System.out.println(arr.length); // 3
```

### 数组的遍历
```java
int[] arr = {12, 24, 36, 28};
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

for (int j : arr) {
    System.out.println(j);
}
```

### 动态初始化数组
> 定义数组时先不存入具体的元素值，**只确定数组存储的数据类型和长度**
>

+ **注意：** 静态初始化和动态初始化数组的写法不能混用

```java
// 格式
数据类型[] 数组名 = new 数据类型[长度];
int[] arr = new int[3];
```

| 数据类型 | 明细 | 默认值 |
| :---: | --- | --- |
| 基本数据类型 | byte、short、char、int、long | 0 |
| | float、double | 0.0 |
| | boolean | false |
| 引用类型 | 类、接口、数组、String | null |


### 数组在计算机中的执行原理
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713969285184-73513929-a437-4399-8850-af5f6768cd78.png)

## 对象
### 对象在计算机中的执行原理
![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1713975417194-a0146a71-9cea-49a6-94a2-6a3faa672e85.png)

### 成员变量和局部变量的区别
| 区别 | 成员变量 | 局部变量 |
| :---: | --- | --- |
| 类中位置不同 | 类中，方法外 | 常见于方法中 |
| 初始化值不同 | 有默认值，不需要初始化赋值 | 没有默认值，使用之前必须完成赋值 |
| 内存位置不同 | 堆内存 | 栈内存 |
| 作用域不同 | 整个对象 | 在所归属的大括号中 |
| 生命周期不同 | 与对象共存亡 | 随着方法的调用而生，随着方法的运行结束而亡 |


### 子父类的访问特点
```java
public class Parent {
    String name = "父类 name";

    public void run() {
        System.out.println("父类的 run() 方法");
    }
}
```

```java
public class Son {
    String name = "子类 name";

    @Override
    public void run() {
        System.out.println("子类的 run() 方法");
    }

    public void show() {
        String name = "局部 name";

        System.out.println(name); // "局部 name"
        System.out.println(this.name); // "子类 name"
        System.out.println(super.name); // "父类 name"

        run(); // "子类的 run() 方法"
        super.run(); // "父类的 run() 方法"
    }
}
```

### this(...) 和 super(...) 使用时的注意事项
+ **this(...)、super(...) 都只能放在构造器的第一行，因此，有了 this(...) 就不能写 super(...)，反之亦然**

### this 关键字
> this 就是一个变量，可以用在方法中，来拿到当前对象
>

```java
public class Student {
    String name;
    double score;
    int age;

    public Student() {
        System.out.println("无参构造器");
    }

    public Student(String name, double score) {
        this("张三", 38, 18);
    }

    public Student(String name, double score, int age) {
        this.name = name;
        this.score = score;
        this.age = age;
    }

    public void checkPass(double score) {
        if (this.score >= score) {
            System.out.println("恭喜您，考入哈佛，走向巅峰~~~");
        } else {
            System.out.println("不好意思，您没有考上~~~");
        }
    }
}
```

**this 的执行原理**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1714137995468-d7e8dee1-4bd9-40a4-bf15-7a73429e40b1.png)

### 构造器
> 一个特殊的方法，没有返回值类型声明，名称必须与所在类名称一模一样
>

+ 在创建对象时，对象会自动调用构造器。
+ **作用：** 创建对象时，完成对对象成员变量（属性）的初始化赋值。
+ **注意事项：**
    - 类在设计时，如果不写构造器，Java 会为类自动生成一个无参构造器
    - 一旦定义了有参构造器，Java 就不会帮我们的类自动生成无参构造器了，此时就建议自己手写一个无参构造器出来
    - **在继承中，子类构造方法的第一行会默认调用父类的无参构造方法** `super();`

```java
public class Student extends Person {
    String name;
    int age;
    
    // 无参构造
    public Student() {
        // super();
        // ...
    }

    // 有参构造
    public Student(String name, int age) {
        // super();
        this.name = name;
        this.age = age;
        // ...
    }
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1715180145434-f84cab38-6e8b-4a65-98ab-58effe984fed.png)

### 实体类
> 实体类就是一种特殊的类
>

1. 这个类中的成员变量都要私有，并且要对外提供相应的 getXxx，setXxx 方法
2. 类中必须要有一个公共的无参的构造器
+ 实体类的对象只负责数据存取，而对数据的处理交给其他类的对象来完成，以实现数据和数据业务处理相分离

```java
public class Student {
    private String name;
    private double score;

    // getter setter 方法
}
```

## 面向对象的三大特征
### 封装
> 封装就是用类设计对象处理某一个事物的数据时，应该把要处理的数据，以及处理这些数据的方法设计到对象中去。
>

+ 合理隐藏，合理暴露

```java
public class Student {
    private String name; // 姓名
    private double chinese; // 语文成绩
    private double math; // 数学成绩

    public String getName() {
        return name
    }

    public void setName(String name) {
        this.name = name
    }

    // 其他的getter和setter方法
}
```

```java
public class StudentOperator {
    private Student s;

    public StudentOperator(Student s) {
        this.s = s;
    }

    // 处理成绩是否及格的方法
    // 处理成绩等级的方法
    // ...
}
```

### 继承
> 一个类可以派生出一个或多个子类，子类拥有父类的所有属性和方法
>

+ **语法：**`class 子类名 extends 父类名 {}`
+ **作用：** 提高代码的复用性，减少代码的冗余
+ **特点：**
    - 子类只能继承父类的非私有成员（成员变量、成员方法）
    - 子类的对象是由子类和父类共同完成的
+ **注意：Java 中只支持单继承，一个类只能有一个父类**

```java
public class Animal {
    // 属性
    String name;
    int age;

    // 方法
    public void eat() {
        System.out.println("吃饭");
    }

    public void sleep() {
        System.out.println("睡觉");
    }
}
```

```java
public class Dog extends Animal {
    // 属性
    String color;

    // 方法
    public void lookHome() {
        System.out.println("看家");
    }
}
```

_**测试**_

```java
public class Test {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.name = "旺财"; // 继承父类的属性
        dog.age = 3; // 继承父类的属性
        dog.color = "白色"; // 子类自己的属性
        dog.eat(); // 继承父类的方法
        dog.sleep(); // 继承父类的方法
        dog.lookHome(); // 子类自己的方法
    }
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1715096941836-cc09f7c9-79b2-4354-bc9c-15f095426188.png)

### 多态
> 多态是指在继承/实现情况下的一种现象，表现为：对象多态、行为多态
>

+ **前提：**有**继承/实现**关系，存在父类引用子类对象，**存在方法重写**
+ **注意：** 多态是对象、行为的多态，Java 中的属性(成员变量)不谈多态

```java
public class Animal {
    public void run() {
        System.out.println("动物在跑");
    }

    public void bark() {
        System.out.println("动物在叫");
    }
}
```

```java
public class Cat extends Animal {
    @Override
    public void run() {
        System.out.println("猫跑的贼快");
    }
}
```

```java
public class Dog extends Animal {
    @Override
    public void run() {
        System.out.println("狗跑的贼六");
    }

    public void bark() {
        System.out.println("汪汪汪");
    }

    public void eat() {
        System.out.println("狗吃骨头");
    }
}
```

_**测试**_

```java
public class Test {
    public static void main(String[] args) {
        Animal a = new Cat();
        a.run(); // 猫跑的贼快
        a.bark(); // 动物在叫
        a = new Dog();
        a.run(); // 狗跑的贼六
        a.bark(); // 汪汪汪
        // a.eat(); // 报错
        Dog d = (Dog) a; // 向下转型：将父类对象转换为子类对象
        d.eat(); // 狗吃骨头
    }
}
```

#### 类型转换
+ **自动类型转换：**`父类 变量名 = new 子类();`
+ **强制类型转换：**`子类 变量名 =  (子类) 父类变量();`
+ **注意：** 强制类型转换在运行时，如果对象的真实类型与强转后的类型不同，就会报类型转换异常（ClassCastException）的错误，因此，强转前可以使用 `instanceof` 关键字，来判断当前对象的真实类型，再进行强转

```java
public class Test {
    public static void main(String[] args) {
        Test t = new Test();
        t.test(new Dog());
        System.out.println("------------");
        t.test(new Cat());
    }

    public void test(Animal a) {
        a.run();
        a.bark();
        if (a instanceof Dog) {
            Dog d = (Dog) a;
            d.eat();
        }

        // 也可直接写成
        // if (a instanceof Dog d) {
        //     d.eat();
        // }
    }
}
```

## 修饰符
### static 修饰符
> 静态，可以修饰成员变量、成员方法，最常见的应用场景是做工具类
>

+ **注意事项：**
    - **静态方法中可以直接访问类的静态成员，不可以直接访问实例成员**
    - **实例方法中既可以直接访问静态成员，也可以直接访问实例成员**
    - **实例方法中可以使用 this 关键字，静态方法中不可以使用 this 关键字**
1. **成员变量：**
    - **静态变量（类变量）：** 有 `static` 修饰，属于类，在计算机中只有一份，会被类的全部对象共享
    - **实例变量（对象的变量）：** 无 `static` 修饰，属于每个对象的

```java
public class Student {
    // 静态变量，推荐使用类名访问 类名.静态变量（Student.name）
    static String name;

    // 实例变量，只能通过对象访问
    int age;
}
```

+ **成员变量的执行原理**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1714312225124-fb3f14dc-40da-4282-b79f-cd9179e11ac4.png)

2. **成员方法：**
    - **静态方法：** 有 `static` 修饰的成员方法，属于类
    - **实例方法：** 无 `static` 修饰的成员方法，属于对象

```java
public class Student {
    // 静态方法，推荐使用类名访问 类名.静态方法（Student.printHelloWorld()）
    public static void printHelloWorld() {
        // ...
    }
    
    // 实例方法，只能通过对象访问
    public void printPass() {
        // ...
    }   
}
```

+ **成员方法的执行原理**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1714313618079-953f33c7-bb91-4b3a-878d-b60caec73b48.png)

### 权限修饰符
> 用来限制类中的成员（成员变量、成员方法、构造器）能够被访问的范围
>

1. **public：** 任意位置都能访问
2. **private：** 只能在本类中访问
3. **protected：** 本类，同一个包中的类、子孙类中可以访问
4. **缺省：** 本类，同一个包中的类可以访问
+ **private < 缺省 < protected < public**

```java
public class Parent {
    public void publicMethod() {
        System.out.println("=====publicMethod======");
    }

    private void privateMethod() {
        System.out.println("=====privateMethod======");
    }

    protected void protectedMethod() {
        System.out.println("=====protectedMethod======");
    }

    void method() {
        System.out.println("=====method======");
    }

    public static void main(String[] args) {
        Parent p = new Parent();
        // 本类中都可以访问
        p.publicMethod();
        p.privateMethod();
        p.protectedMethod();
        p.method();
    }
}
```

### final 关键字
+ final 关键字是最终的意思，可以修饰（类、方法、变量）
+ 修饰类：该类被称为最终类，特点是不能被继承了
+ 修饰方法：该方法被称为最终方法，特点是不能被重写了
+ 修饰变量：该变量只能被赋值一次

```java
public class Test {
    public static final int NUM = 10; // 常量
    public static final String NAME;
    static {
        NAME = "张三";
    }

    public static void main(String[] args) {
        // final 关键字的使用
        final int a = 10;
        // a = 20; // 报错，final修饰的变量不可被修改

        // final 修饰的引用类型变量，不可再指向其他对象
        final User user = new User();
        // user = new User(); // 报错，final修饰的引用类型变量不可再指向其他对象
        
        // 但是，final修饰的引用类型变量指向的对象的属性是可以修改的
        user.name = "张三";
        System.out.println(user.name); // 张三
    }
}
```

## 代码块
### 静态代码块
+ **格式：**`static {}`
+ **特点：** 类加载时自动执行，由于类只会加载一次，所以静态代码块也只会执行一次
+ **作用：** 完成类的初始化，例如：对类变量的初始化赋值

```java
public class Test {
    public static String[] arr = new String[3];

    // 静态代码块：在类加载时执行，只执行一次
    static {
        System.out.println("静态代码块执行了");
        arr[0] = "张三";
        arr[1] = "李四";
        arr[2] = "王五";
    }

    public static void main(String[] args) {
        System.out.println("main方法执行了");
        // 遍历数组
        for (String s : arr) {
            System.out.println(s);
        }
    }
}
```

### 实例代码块
+ **格式：**`{}`
+ **特点：** 每次创建对象时，执行实例代码块，并在构造器前执行
+ **作用：** 和构造器一样，都是用来完成对象的初始化的，例如：对实例变量进行初始化赋值

```java
public class Test {
    public Test() {
        System.out.println("构造方法执行了");
    }

    // 实例代码块：在创建对象时执行，每次创建对象都会执行，优先于构造方法执行
    {
        System.out.println("实例代码块执行了");
    }

    public static void main(String[] args) {
        System.out.println("main方法执行了");
        new Test();
    }
}
```

## 内部类
> 是类中的五大成分之一（成员变量、方法、构造器、内部类、代码块），如果一个类定义在另一个类的内部，这个类就是内部类
>

### 成员内部类
> 就是类中的一个普通成员
>

```java
public class Outer {
    // 成员内部类
    public class Inner {
        
    }
}

// 创建对象的格式：
外部类名.内部类名 对象名 = new 外部类(...).new 内部类(...);
Outer.Innter in = new Outer().new Inner();
```

```java
public class Body {
    int heartBeat = 120;

    public class Heart {
        int hearBeat = 90;
        
        public void show() {
            int heartBear = 80;

            System.out.println(heartBear); // 80
            System.out.println(this.heartBear); // 90
            System.out.println(Body.this.heartBear); // 120
        }
    }
}
```

### 静态内部类
> 有 static 修饰的内部类，属于外部类自己持有
>

```java
public class Outer {
    // 静态内部类
    public static class Inner {
    }
}

// 创建对象的格式
外部类名.内部类名 对象名 = new 外部类.内部类(...);
Outer.Inner in = new Outer.Inner();
```

### 匿名内部类
> 就是一种特殊的局部内部类
>

+ **作用：** 更方便的创建一个子类对象
+ **注意：** 匿名内部类本质是一个子类，同时也是一个子类对象

```java
new 类和接口(参数值...) {
    类体(一般是方法重写);
}
```

**应用场景：**

```java
interface Swimming {
    void swim();
}

public class Test {
    public static void main(String[] args) {
        Swimming s1 = new Swimming() {
            @Override
            public void swim() {
                System.out.println("学生游泳贼快~~~");
            }
        }
        go(s1);
        System.out.println("-------------");
        go(new Swimming() {
            @Override
            public void swim() {
                System.out.println("老师游泳贼溜~~~");
            }
        });
    }

    public static void go(Swimming s) {
        s.swim()
    }
}
```

## 枚举
> 枚举是一种特殊类，使用 enum 关键字声明
>

+ **注意：**
    - 枚举类中的第一行，只能写一些合法的标识符（名称），多个名称用逗号隔开。
    - 这些名称，本质是常量，每个常量都会记住枚举类的一个对象

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1715268431394-c44864f6-f287-4db7-8083-063641ec8e36.png)

**应用场景：**

```java
public enum EnumDemo {
    A, B, C;
}
```

```java
public class Main {
    public static void main(String[] args) {
        EnumDemo enumDemo = EnumDemo.A;
        printEnum(enumDemo);
    }

    public static void printEnum(EnumDemo enumDemo) {
        switch (enumDemo) {
            case A:
                System.out.println("输出 A");
                break;
            case B:
                System.out.println("输出 B");
                break;
            case C:
                System.out.println("输出 C");
                break;
        }
    }
}
```

## 抽象类
> 使用 abstract 修饰的类就是抽象类，修饰的方法就是抽象方法
>

+ **特点：**
    - 抽象类中不一定有抽象方法，有抽象方法的类一定是抽象类
    - 类该有的成员（成员变量、方法、构造器）抽象类都可以有
    - 一个类继承抽象类，必须重写完抽象类的全部抽象方法，否则这个类也必须定义成抽象类
+ **作用：** 为了更好的支持多态
+ **注意：抽象类不能创建对象，仅作为一个特殊的父类，让子类继承并实现**

```java
public abstract class AbstractDeom {
    // 抽象方法：没有方法体，用abstract修饰
    public abstract void show();

    public void print() {
        System.out.println("print");
    }
}
```

_**测试**_

```java
public class Test extends AbstractDeom {
    @Override
    public void show() {
        System.out.println("show");
    }

    public static void main(String[] args) {
        Test t = new Test();
        t.show();
        t.print();
    }
}
```

## 接口
> 使用 interface 声明的特殊结构就是接口
>

+ **注意：**
    - 接口不能创建对象，接口是用来被类实现（implements）的，实现接口的类称为实现类
    - 一个类可以实现多个接口，实现类实现多个接口，必须重写完全部接口的全部抽象方法，否则实现类需要定义成抽象类
+ **优点：**
    - 弥补了类单继承的不足，一个类同时可以实现多个接口
    - 让程序可以面向接口编程，更有利于程序的解耦合

```java
public interface 接口名 {
    // 成员变量（常量）
    // 成员方法（抽象方法）
}

修饰符 class 实现类 implements 接口1, 接口2, 接口3, ... {
    
}
```

+ **一个接口可以同时继承多个接口**

```java
public class D implements C {
    @Override
    public void testA() {}

    @Override
    public void testB() {}

    @Override
    public void testC() {}
}

public interface A {
    void testA();
}

public interface B {
    void testB();
}

public interface C extends A, B {
    void testC();
}
```

**JDK 8 开始新增了三种方法**

```java
public interface A {
    /**
    * 1. 默认方法（实例方法）：使用 default 修饰，默认会被加上 public 修饰
    * 注意：只能使用接口的实现类对象调用
    */
    default void test1();

    /**
    * 2. 私有方法：必须用 private 修饰（JDK 9 开始才支持）
    */
    private void test2();

    /**
    * 3. 类方法（静态方法）：使用 static 修饰，默认会被加上 public 修饰
    * 注意：只能用接口名来调用
    */
    static void test3();
}
```

```java
public interface A {
    // 必须用接口的实现类对象来调用默认方法
    default void methodA() {
        methodB();
        System.out.println("methodA");
    }

    // 只能在本接口中的其他默认方法和私有方法中调用
    private void methodB() {
        System.out.println("methodB");
    }

    // 只能用接口名调用
    static void methodC() {
        System.out.println("methodC");
    }
}
```

```java
public class B implements A {
    public static void main(String[] args) {
        B b = new B();
        b.methodA();
        // b.methodB(); // 编译错误
        // A.methodB(); // 编译错误
        A.methodC();
    }
}
```

## 泛型
> 定义类、接口、方法时，同时声明了一个或者多个类型变量（如：`<E>`），称为泛型类、泛型接口、泛型方法、它们统称为泛型。
>

+ **注意：**
    - 类型变量建议用大写的英文字母，常用的有：E、T、K、V 等
    - 泛型和集合都只能支持引用数据类型

### 泛型类
```java
// 语法
修饰符 class 类名<类型变量, 类型变量, ...> {
    /* ... */
}

// 示例
public class ArrayList<E> {
    /* ... */
}

// 使用
ArrayList<String> list = new ArrayList<>();
list.add("Java");
```

### 泛型接口
```java
// 语法
修饰符 interface 接口名<类型变量, 类型变量, ...> {
    /* ... */
}

// 示例
public interface Data<T> {
    void add(T t);
    boolean delete(T t);
    T getById(int id);
    // ...
}

// 使用
public class StudentDao implements Data<Student>{
    @Override
    public void add(Student student) {

    }

    @Override
    public boolean remove(Student student) {
        return false;
    }

    @Override
    public Student getById(int id) {
        return null;
    }
}
```

### 泛型方法
+ **通配符：**`?`
+ **泛型上下限：**
    - **泛型上限：**`? extends Car` ? 能接收的必须是 Car 或者子类
    - **泛型下限：**`? super Car` ? 能接收的必须是 Car 或者其父类

```java
// 语法
修饰符 <类型变量, 类型变量, ...> 返回值类型 方法名(形参列表) {
    /* ... */
}

// 示例
public static <T> void test(T t) {
    /* ... */
}

// 这里的问号是通配符，表示任何类型
public static void go(ArrayList<?> cars) { /* ... */ }
// 这里的问号是通配符，表示任何类型，但是必须是Car的子类 或者 Car本身
public static void go(ArrayList<? extends Car> cars) { /* ... */ }
// 这里的问号是通配符，表示任何类型，但是必须是Car的父类 或者 Car本身
public static void go(ArrayList<? super Car> cars) { /* ... */ }
```

## Lambda 表达式
> 用于简化匿名内部类的代码写法
>

:::info
**Tip：函数式接口：** 有且仅有一个抽象方法的接口

:::

+ **注意：Lambda 表达式只能简化函数式接口的匿名内部类**
+ **Lambda 表达式的省略规则：**
    - 参数类型可以省略
    - 如果只有一个参数，`()` 可以省略
    - 如果方法体只有一行代码，可以省略大括号，同时要省略分号，此时如果这行代码是 return 语句，`return` 关键字可以省略

```java
// 语法格式
(被重写方法的形参列表) -> {
    被重写方法的方法体代码
}
```

## 方法引用
### 静态方法引用
+ **语法：**`类名::静态方法`
+ **使用场景：** 如果某个 Lambda 表达式中只是调用一个静态方法，并且前后参数的形式一致，就可以使用静态方法引用

```java
Arrays.asList(1, 2, 3, 4, 5).forEach(System.out::println);
// 完整写法
Arrays.asList(1, 2, 3, 4, 5).forEach((x) -> System.out.println(x));
```

### 实例方法引用
+ **语法：**`对象名::实例方法`
+ **使用场景：** 如果某个 Lambda 表达式中只是调用一个实例方法，并且前后参数的形式一致，就可以使用实例方法引用

```java
Student s = new Student();
Arrays.sort(String, s::compareByAgeObject);
// 完整写法
// Arrays.sort(String, (o1, o2) -> s.compareByAgeObject(o1, o2));
```

### 特定类型的方法引用
+ **语法：**`类型::方法`
+ **使用场景：** 如果某个 Lambda 表达式中只是调用一个实例方法，并且前面参数列表中的第一个参数是作为方法的主调，后面的所有参数都是作为该实例方法的入参的，则此时就可以使用特定类型的方法引用

```java
String[] strings = {"admin", "Root", "root",  "Admin"};
Arrays.sort(strings, String::compareToIgnoreCase); // 忽略大小写排序
// 完整写法
// Arrays.sort(strings, (s1, s2) -> s1.compareToIgnoreCase(s2));
System.out.println(Arrays.toString(strings)); // [admin, Admin, Root, root]
```

### 构造器引用
+ **语法：**`类名::new`
+ **使用场景：** 如果某个 Lambda 表达式中只是在创建对象，并且前后参数情况一致，就可以使用构造器引用

## 工具类
> 工具类中的方法都是一些静态方法，每个方法都是用来完成一个功能的，工具类是给开发人员共同使用的
>

+ **作用：** 提高代码的复用性，提高了开发效率

```java
public class XxxUtil {
    private XxxUtil() {}
    
    public static void xxx() {
        // ...
    }

    public static boolean xxx(String email) {
        // ...
    }

    public static String xxx(int n) {
        // ...
    }
}
```

### Math 常用方法
#### abs()
> 返回参数的绝对值。
>

+ **方法签名：**`public static double abs(double a)`
+ **语法：**`Math.abs(a)`
+ **参数：**`a` 需要计算绝对值的 double 值。
+ **返回值：**`a` 的绝对值。

```java
double a = -3.14;
double absValue = Math.abs(a);
System.out.println(absValue); // 输出：3.14
```

#### ceil()
> 返回大于或等于参数值的最小整数，即向上取整。
>

+ **方法签名：**`public static double ceil(double a)`
+ **语法：**`Math.ceil(a)`
+ **参数：**`a` 需要进行向上取整的参数值。
+ **返回值：** 大于或等于参数值的最小整数。

```java
double num = 3.7;
double result = Math.ceil(num);
System.out.println(result); // 输出 4.0
```

#### floor()
> 返回小于或等于指定 double 值的最大整数，即向下取整。
>

+ **方法签名：**`public static double floor(double a)`
+ **语法：**`Math.floor(a)`
+ **参数：**`a` 要进行向下取整的 double 值。
+ **返回值：** 小于或等于参数值的最大整数。

```java
double a = 12.3456789d;
double result = Math.floor(a);
System.out.println(result); // 输出：12.0
```

#### round()
> 四舍五入，返回一个 long 类型值。
>

+ **方法签名：**`public static long round(double a)`
+ **语法：**`Math.round(a)`
+ **参数：**`a` 需要四舍五入的数字。
+ **返回值：** 四舍五入后的 long 类型值。

```java
double a = 12.5;
long result = Math.round(a);
System.out.println(result); // 输出：13
```

#### max()
> 返回两个数中的较大值。如果两个数相等，则返回任何一个。
>

+ **方法签名：**`public static double max(double a, double b)`
+ **语法：**`Math.max(a, b)`
+ **参数：**`a` 和 `b` 是要比较的数字。
+ **返回值：** 较大的数字。

```java
double max = Math.max(5.0, 10.0);
System.out.println(max); // 输出 10.0
```

#### pow()
> 计算一个数的幂次方。
>

+ **方法签名：**`public static double pow(double a, double b)`
+ **语法：**`Math.pow(a, b)`
+ **参数:**`a` 底数，`b` 指数。
+ **返回值：** a 的 b 次幂。

```java
double result = Math.pow(2, 3);
System.out.println(result); // 输出 8.0
```

#### random()
> 生成一个 0 到 1 之间的随机数。
>

+ **方法签名：**`public static double random()`
+ **语法：**`Math.random()`
+ **参数：** 无
+ **返回值：** 0 到 1 之间的随机数，包括 0 但不包括 1。

```java
double randomNumber = Math.random();
System.out.println(randomNumber); // 输出一个 0 到 1 之间的随机数
```

### Arrays 常用方法
#### toString()
> 将数组转换为字符串
>

+ **方法签名：**`public static String toString(类型[] arr)`
+ **语法：**`Arrays.toString(arr)`
+ **参数：**`arr` 要转换的数组
+ **返回值：** 返回转换后的字符串

```java
int[] arr = {1, 2, 3, 4, 5};
String str = Arrays.toString(arr);
System.out.println(str); // [1, 2, 3, 4, 5]
```

#### copyOfRange()
> 复制指定范围的数组
>

+ **方法签名：**`public static int[] copyOfRange(类型[] original, int from, int to)`
+ **语法：**`Arrays.copyOfRange(original, from, to)`
+ **参数：**
    - `original` 要复制的数组
    - `from` 起始索引（包括）
    - `to` 结束索引（不包含）
+ **返回值：** 复制后的数组

```java
int[] arr = {1, 2, 3, 4, 5};
int[] copy = Arrays.copyOfRange(arr, 1, 3);
System.out.println(Arrays.toString(copy));  // [2, 3]
```

#### copyOf()
> 复制数组
>

+ **方法签名：**`public static int[] copyOf(类型[] original, int newLength)`
+ **语法：**`Arrays.copyOf(original, newLength**)**`
+ **参数：**
    - `original` 要拷贝的数组
    - `newLength` 新数组的长度
+ **返回值：** 复制后的数组

```java
int[] arr = {1, 2, 3, 4, 5};
int[] newArr = Arrays.copyOf(arr, 3);
System.out.println(Arrays.toString(newArr)); // [1, 2, 3]
```

#### setAll()
> 使用生成器函数生成的值填充指定的数组
>

+ **方法签名：**`public static void setAll(类型[] array, IntUnaryOperator generator)`
+ **语法：**`Arrays.setAll(array, i -> generator.apply(i))`
+ **参数：**
    - `array` 要填充的数组
    - `generator` 生成器函数
+ **返回值：** 无

```java
int[] array = new int[5];
Arrays.setAll(array, i -> i * 2);
System.out.println(Arrays.toString(array)); // [0, 2, 4, 6, 8]
```

#### sort()
> 对数组进行排序
>

+ **方法签名：**`public static void sort(类型[] arr)`
+ **语法：**`Arrays.sort(arr)`
+ **参数：**`arr` 要排序的数组
+ **返回值：** 无

```java
int[] arr = {13, 7, 6, 45, 21, 9, 101, 102};
Arrays.sort(arr);
System.out.println(Arrays.toString(arr)); // [6, 7, 9, 13, 21, 45, 101, 102]
```

#### asList()
> 将数组转换为 List
>

+ **方法签名：**`public static <T> List<T> asList(T... a)`
+ **语法：**`Arrays.asList(arr)`
+ **参数：**`arr` 数组
+ **返回值：**`List`

```java
String[] arr = {"a", "b", "c"};
ArrayList<String> list = new ArrayList<>(Arrays.asList(arr));
System.out.println(list); // [a, b, c]
```

#### stream()
> 将数组转换为流对象，可以对流对象进行各种操作，比如过滤、排序、映射等
>

+ **方法签名：**`public static <T> Stream<T> stream(T[] array)`
+ **语法：**`Arrays.stream(arr)`
+ **参数：**`arr` - 要转换的数组
+ **返回值：** `Stream<T>` 流对象

```java
// 示例：
int[] arr = {1, 2, 3, 4, 5};
IntStream stream = Arrays.stream(arr);
stream.forEach(System.out::println); // 输出 1  2  3  4  5
```

### Collections 常用方法
#### addAll()
> 将所有指定元素添加到指定集合中
>

+ **方法签名：**`public static <T> boolean addAll(Collection<? super T> c, T... elements)`
+ **语法：**`Collections.addAll(c, ...elements)`
+ **参数：**
    - `c` - 要添加元素的集合
    - `...elements` - 要添加到集合 c 中的元素
+ **返回值：** 如果集合 c 由于调用而更改，则返回 true

```java
List<String> list = new ArrayList<>();
boolean result = Collections.addAll(list, "A", "B", "C");
System.out.println(result); // true
```

#### shuffle()
> 随机打乱集合中元素的顺序
>

+ **方法签名：**`public static void shuffle(List<?> list)`
+ **语法：**`Collections.shuffle(list)`
+ **参数：**`list` - 要打乱顺序的集合
+ **返回值：** 无

```java
List<String> list = new ArrayList<>();
Collections.addAll(list, "A", "B", "C", "D", "E");
System.out.println("打乱前：" + list); // 打乱前：[A, B, C, D, E]
Collections.shuffle(list);
System.out.println("打乱后：" + list); // 打乱后：[D, A, E, B, C]
```

#### sort()
> 对 List 集合进行排序
>

1. `public static <T> void sort(List<T> list)`
    - **语法：**`Collections.sort(list)`
    - **参数：**`list` - 要排序的 List 集合
    - **返回值：** 无

```java
List<Integer> list = new ArrayList<>();
Collections.addAll(list, 3, 1, 2, 5, 4);
System.out.println("排序前：" + list); // [3, 1, 2, 5, 4]
Collections.sort(list);
System.out.println("排序后：" + list); // [1, 2, 3, 4, 5]
```

2. `public static <T> void sort(List<T> list, Comparator<? super T> c)`
    - **语法：**`Collections.sort(list, c)`
    - **参数：**
        * `list` - 要排序的 List 集合
        * `c` - 比较器
    - **返回值：** 无

```java
List<Student> list2 = new ArrayList<>();
Student s1 = new Student("张三", 18, 95.0);
Student s2 = new Student("李四", 20, 90.0);
Student s3 = new Student("王五", 19, 92.0);
Collections.addAll(list2, s1, s2, s3);
System.out.println("排序前：" + list2); // [Student{name='张三', age=18, score=95.0}, Student{name='李四', age=20, score=90.0}, Student{name='王五', age=19, score=92.0}]
// 按照分数降序排序
Collections.sort(list2, (o1, o2) -> Double.compare(o2.getScore(), o1.getScore()));
System.out.println("排序后：" + list2); // [Student{name='张三', age=18, score=95.0}, Student{name='王五', age=19, score=92.0}, Student{name='李四', age=20, score=90.0}]
```

### Objects 常用方法
#### equals()
> 比较两个对象是否相等
>

+ **方法签名：**`public static boolean equals(Object a, Object b)`
+ **语法：**`Objects.equals(a, b)`
+ **参数：**
    - `a` 一个对象
    - `b` 另一个对象
+ **返回值：**如果两个对象相等，则返回 true；否则返回 false

```java
String str1 = "Hello";
String str2 = "Hello";
System.out.println(Objects.equals(str1, str2)); // true
```

#### isNull()
> 判断对象是否为 null
>

+ **方法签名：**`public static boolean isNull(Object obj)`
+ **语法：**`Objects.isNull(obj)`
+ **参数：**`obj` 要检查的对象
+ **返回值：** 如果对象为 null，则返回 true；否则返回 false

```java
String str = null;
System.out.println(Objects.isNull(str)); // true
```

#### nonNull()
> 判断对象是否不为 null
>

+ **方法签名：**`public static Boolean nonNull(Object obj)`
+ **语法：**`Objects.nonNull(obj)`
+ **参数：**`obj` - 要检查的对象
+ **返回值：** 如果对象不为 null，则返回 true；否则返回 false

```java
String str = "hello";
System.out.println(Objects.nonNull(str)); // true
```

### System 常用方法
#### exit()
> 退出程序，结束当前正在运行的 Java 虚拟机
>

+ **方法签名：**`public static void exit(int status)`
+ **语法：**`System.exit(status)`
+ **参数：**`status` 退出状态码，0 表示正常退出，非 0 表示异常退出
+ **返回值：** 无

```java
System.out.println("程序开始");
System.exit(0);
System.out.println("程序结束"); // 这行代码不会被执行
```

#### currentTimeMillis()
> 返回当前时间的毫秒数
>

+ **方法签名：**`public static long currentTimeMillis()`
+ **语法：**`System.currentTimeMillis()`
+ **参数：** 无
+ **返回值：** long 类型的时间戳

```java
long currentTime = System.currentTimeMillis();
System.out.println("当前时间的毫秒数：" + currentTime);
```

### Executors 常用方法
#### newFixedThreadPool()
> 
>

#### newSingleThreadExecutor()
#### newCachedThreadPool()
#### newScheduledThreadPool()
## String
### String 对象创建的方式
> String 用于创建字符串常量（不可变）
>

1. **Java 程序中的所有字符串文字（例如 "abc"）都为此类的对象**

```java
String name = "小黑";
String schoolName = "程序员";
```

2. **调用 String 类的构造器初始化字符串对象**

| 构造器 | 说明 |
| --- | --- |
| public String() | 创建一个空白字符串对象，不含有任何内容 |
| public String(String original) | 根据传入的字符串内容，来创建字符串对象 |
| public String(char[] chars) | 根据字符数组的内容，来创建字符串对象 |
| public String(byte[] bytes) | 根据字节数组的内容，来创建字符串对象 |


```java
String s1 = new String(); ""
String s2 = new String("Hello World"); // "Hello World"
String s3 = new String({'a', 'b', 'c'}); // "abc"
String s4 = new String({97, 98, 99}); // "abc"
```

### String 注意事项
1. **String 对象是不可变字符串对象**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1714217393206-76708928-ff4b-42aa-8979-c3c02c56496d.png)

2. **只要是以 **`""`** 方式写出的字符串对象，会存储到堆内存的字符串常量池中，且相同内容的字符串只存储一份**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1714217898296-d835ccab-2b12-4928-b211-15c33122ea96.png)

3. **但通过 new 的方式创建的字符串对象，每 new 一次都会产生一个新的对象放在堆内存中**

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1714218183890-8e0274ca-a585-4aa9-b4e7-6c3138748446.png)

### String 常用方法
#### length()
> 返回字符串的长度
>

+ **方法签名：**`public int length()`
+ **语法：**`str.length()`
+ **参数：** 无
+ **返回值：** 整数，表示字符串的长度。

```java
String str = "Hello, world!";

int length = str.length();
System.out.println("字符串的长度为：" + length); // 输出：字符串的长度为：13
```

#### charAt()
> 返回指定索引处的字符。索引范围从0到length() - 1。索引为负或大于等于length()将导致异常。
>

+ **方法签名：**`public char charAt(int index)`
+ **语法：**`str.charAt(index)`
+ **参数：**`index` 要返回字符的索引。从0开始。
+ **返回值：** 指定索引处的字符。如果索引为负或大于等于 length，则抛出 StringIndexOutOfBoundsException。

```java
String str = "Hello";

char c = str.charAt(0);
System.out.println(c); // Output: 'H'
```

#### toCharArray()
> 将字符串转换为字符数组。
>

+ **方法签名：**`public char[] toCharArray()`
+ **语法：**`str.toCharArray()`
+ **参数：** 无
+ **返回值：** 一个字符数组，包含字符串的所有字符。

```java
String str = "Hello, World!";

char[] charArray = str.toCharArray();
for (char c : charArray) {
    System.out.println(c); // 输出：'H' 'e' 'l' 'l' 'o' ',' ' ' 'W' 'o' 'r' 'l' 'd' '!'
}
```

#### equals()
> 比较两个字符串是否相等，区分大小写。如果两个字符串相等，则返回 true，否则返回 false。
>

+ **方法签名：**`public boolean equals(Object anObject)`
+ **语法：**`str.equals(anObject)`
+ **参数：**`anObject` 需要比较的字符串。
+ **返回值：** 如果两个字符串相等，则返回 true，否则返回 false。

```java
String str1 = "Hello";
String str2 = "World";

boolean result = str1.equals(str2);
System.out.println(result); // 输出 false，因为 "Hello" 和 "World" 不相等。
```

#### equalsIgnoreCase()
> 忽略大小写比较两个字符串是否相等。
>

+ **方法签名：**`public boolean equalsIgnoreCase(String anotherString)`
+ **语法：**`str.equalsIgnoreCase(anotherString)`
+ **参数：**`anotherString` 要与当前字符串进行比较的字符串。
+ **返回值：** 如果两个字符串相等（忽略大小写），则返回 true，否则返回 false。

```java
String str1 = "Hello";
String str2 = "hello";

boolean result = str1.equalsIgnoreCase(str2);
System.out.println(result); // 输出 true，因为 "Hello" 和 "hello" 相等（忽略大小写）
```

#### subString()
> 返回一个新的字符串，该字符串是此字符串的一个子字符串。
>

1. `public String substring(int beginIndex, int endIndex)`
+ **语法：**`str.substring(beginIndex, endIndex)`
+ **参数：**
    - `beginIndex` 起始索引（包括）。必须是非负的且小于等于endIndex。
    - `endIndex` 结束索引（不包括）。必须大于等于beginIndex，且小于字符串长度。
2. `public String substring(int beginIndex)`
+ **语法：**`str.substring(beginIndex)`
+ **参数：**`beginIndex` 起始索引（包括），指定子字符串的开始位置。

```java
String str = "Hello, World!";

String subStr = str.substring(7, 12);
System.out.println(subStr); // 输出 "World"

String subStr = str.substring(7); // 从索引 7 开始到字符串末尾的子字符串。
System.out.println(subStr); // 输出 "World!"
```

#### replace()
> 将字符串中的指定字符或字符串替换为另一个字符或字符串。返回替换后的新字符串。不改变原字符串。
>

+ **方法签名：**`public String replace(CharSequence target, CharSequence replacement)`
+ **语法：**`str.replace(target, replacement)`
+ **参数：**
    - `target` 要替换的子字符串或字符。
    - `replacement` 替换字符串。
+ **返回值：** 替换后的新字符串。如果原字符串没有要替换的子字符串，则返回原字符串。

```java
String str = "Hello, world!";

String replacedStr = str.replace("Hello", "Hi"); // 将 "Hello" 替换为 "Hi"
System.out.println(replacedStr); // 输出 "Hi, world!"
```

#### replaceAll()
> 将字符串中所有出现的 old 字符串替换为 new 字符串
>

+ **方法签名：**`public String replaceAll(String old, String new)`
+ **语法：**`str.replaceAll(old, new)`
+ **参数：**
    - `old` - 要替换的字符串
    - `new` - 替换后的字符串
+ **返回值：** 替换后的字符串

```java
String str = "hello world, hello java";
String newStr = str.replaceAll("hello", "hi");
System.out.println(newStr); // hi world, hi java
```

#### contains()
> 判断字符串是否包含指定的子字符串。返回一个布尔值。
>

+ **方法签名：**`public boolean contains(CharSequence s)`
+ **语法：**`str.contains(s)`
+ **参数：**`s` 表示要查找的子字符串。可以是 String、StringBuilder 或 StringBuffer 对象。
+ **返回值：** 如果字符串包含指定的子字符串，则返回 true，否则返回 false。

```java
String str = "Hello, World!";

boolean containsHello = str.contains("Hello");
System.out.println(containsHello); // 输出：true
```

#### startsWith()
> 检查字符串是否以指定的前缀开头。返回布尔值。
>

+ **方法签名：**`public boolean startsWith(String prefix)`
+ **语法：**`str.startsWith(prefix)`
+ **参数：**`prefix` 要检查的前缀字符串。
+ **返回值：** 如果字符串以指定的前缀开头，则返回 true，否则返回 false。

```java
String str = "Hello, world!";

boolean startsWithHello = str.startsWith("Hello");
System.out.println(startsWithHello); // 输出 true
```

#### split()
> 将字符串按照指定的分隔符进行分割，返回一个字符串数组。
>

+ **方法签名：**`public String[] split(String regex)`
+ **语法：**`str.split(regex)`
+ **参数：**`regex` - 指定的分隔符，可以是正则表达式。
+ **返回值：** String[] 分割后的字符串数组。

```java
String str = "hello world,java,python,c++";

String[] result = str.split(","); // 按照逗号进行分割
for (String s : result) {
    System.out.println(s); // 输出："hello world" "java" "python" "c++"
}

String regex = "[, ]+"; // 以逗号或空格分割
String[] arr = str.split(regex);
for (String s : arr) {
    System.out.println(s); // 输出："hello" "world" "java" "python" "c++"
}
```

#### matches()
> 判断字符串是否匹配正则表达式
>

+ **方法签名：**`public boolean matches(String regex)`
+ **语法：**`str.matches(regex)`
+ **参数：**`regex` - 正则表达式字符串
+ **返回值：** true - 字符串匹配正则表达式；false - 字符串不匹配正则表达式

```java
String str = "hello world";
String regex = "hello";
boolean flag = str.matches(regex);
System.out.println(flag); // false
```

#### getBytes()
> 将字符串转换为字节数组
>

1. **public byte[] getBytes()**
    - **语法：**`string.getBytes()`
    - **参数：** 无
    - **返回值：** 字节数组

```java
String str = "Hello World";
// 编码：
byte[] bytes = str.getBytes();
System.out.println(Arrays.toString(bytes)); // 输出：[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
// 解码：
String str2 = new String(bytes);
System.out.println(str2); // 输出：Hello World
```

2. **public byte[] getBytes(String charsetName) throws UnsupportedEncodingException**
    - **语法：**`string.getBytes(charsetName)`
    - **参数：**`charsetName` - 指定字符集，如"UTF-8"、"GBK"等。如果不指定，则使用平台默认字符集。
    - **返回值：** 字节数组

```java
String str = "Hello, 世界！";
byte[] bytes = null;
try {
    // 编码：
    bytes = str.getBytes("GBK");
    System.out.println(Arrays.toString(bytes)); // [72, 101, 108, 108, 111, 44, 32, -54, -64, -67, -25, -93, -95]
    // 解码：
    String str2 = new String(bytes, "GBK");
    System.out.println(str2); // Hello, 世界！
} catch (UnsupportedEncodingException e) {
    e.printStackTrace();
}
```

### StringBuilder 和 StringBuffer
+ **区别：**
    - `StringBuilder` 和 `StringBuffer` 在使用上一样，都用于创建可变字符串
    - `StringBuilder` 线程不安全，`StringBuffer` 线程安全
+ **注意：**
    - **StringBuilder 和 StringBuffer 通常用于需要频繁修改字符串内容的情况，以提高性能。**
    - **如果不考虑线程，推荐使用 StringBuilder，因为它比 StringBuffer 更高效。**

#### 常用方法
##### append()
> 将参数添加到当前字符串的末尾
>

+ **方法签名：**`public StringBuilder append(参数类型 参数名)`
+ **语法：**`sb.append(参数)`
+ **参数：** 可以是任意类型
+ **返回值：** 当前对象本身

```java
StringBuilder sb = new StringBuilder("hello");
sb.append(" world").append("!");
System.out.println(sb); // hello world!
```

##### reverse()
> 将 StringBuilder 对象中的字符序列逆序
>

+ **方法签名：**`public StringBuilder reverse()`
+ **语法：**`sb.reverse()`
+ **参数：** 无
+ **返回值：** 当前对象本身

```java
StringBuilder sb = new StringBuilder("hello");
System.out.println(sb.reverse()); // olleh
```

##### length()
> 返回当前 StringBuilder 的长度
>

+ **方法签名：**`public int length()`
+ **语法：**`sb.length()`
+ **参数：** 无
+ **返回值：** int，当前 StringBuilder 的长度

```java
StringBuilder sb = new StringBuilder("Hello");
System.out.println(sb.length()); // 5
```

##### toString()
> 将 StringBuilder 对象转换为 String 对象
>

+ **方法签名：**`public String toString()`
+ **语法：**`sb.toString()`
+ **参数：** 无
+ **返回值：** String 对象

```java
StringBuilder sb = new StringBuilder("Hello");
String str = sb.toString();
System.out.println(str); // Hello
```

### StringJoiner
> 用于构建一系列字符串，可以指定分隔符
>

#### StringJoiner 常用方法
##### add()
> 添加一个元素
>

+ **方法签名：**`public StringJoiner add(CharSequence newElement)`
+ **语法：**`joiner.add(newElement)`
+ **参数：**`newElement` 要添加的元素
+ **返回值：** StringJoiner 对象本身

```java
StringJoiner joiner = new StringJoiner(", ");
joiner.add("foo").add("bar").add("baz");
System.out.println(joiner); // foo, bar, baz
```

##### length()
> 返回当前 StringJoiner 实例中字符序列的长度
>

+ **方法签名：**`public int length()`
+ **语法：**`joiner.length()`
+ **参数：** 无
+ **返回值：** 当前 StringJoiner 实例中字符序列的长度

```java
StringJoiner joiner = new StringJoiner(", ");
joiner.add("A").add("B").add("C");
System.out.println(joiner.length()); // 7
```

##### toString()
> 将 StringJoiner 对象转换为字符串
>

+ **方法签名：**`public String toString()`
+ **语法：**`joiner.toString()`
+ **参数：** 无
+ **返回值：** String 类型，StringJoiner 对象的字符串表示形式

```java
StringJoiner joiner = new StringJoiner(", ", "[", "]");
joiner.add("A").add("B").add("C");
String result = joiner.toString();
System.out.println(result); // [A, B, C]
```

## Collection
> 单列集合，每个元素只包含一个值
>

### Collection 常用方法
#### add()
> 将指定的元素添加到此集合（可选操作）
>

+ **方法签名：**`public boolean add(E e)`
+ **语法：**`list.add(e)`
+ **参数：**`e` - 要添加到此集合的元素
+ **返回值：** 如果此集合因调用而更改，则返回 true

```java
Collection<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");
System.out.println(list); // [Hello, World]
```

#### clear()
> 清空集合中的所有元素
>

+ **方法签名：**`public void clear()`
+ **语法：**`list.clear()`
+ **参数：** 无
+ **返回值：** 无

```java
Collection<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
list.add("cherry");
System.out.println("清空前：" + list); // [apple, banana, cherry]
list.clear();
System.out.println("清空后：" + list); // []
```

#### remove()
> 删除集合中的指定元素
>

+ **方法签名：**`public boolean remove(Object o)`
+ **语法：**`list.remove(o)`
+ **参数：**`o` - 要从此列表中删除的元素（如果存在）
+ **返回值：** 如果此列表包含指定的元素，则返回 true

```java
Collection<String> list = new ArrayList<>();
list.add("a");
list.add("b");
list.add("c");
System.out.println(list); // [a, b, c]
System.out.println(list.remove("b")); // true
System.out.println(list); // [a, c]
System.out.println(list.remove("d")); // false
System.out.println(list); // [a, c]
```

#### contains()
> 判断集合中是否包含某个元素
>

+ **方法签名：**`public boolean contains(Object o)`
+ **语法：**`list.contains(o)`
+ **参数：**`o` - 要测试其是否在此列表中的元素
+ **返回值：** 如果此列表包含指定的元素，则返回 true

```java
Collection<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
list.add("cherry");
System.out.println(list.contains("apple")); // true
System.out.println(list.contains("orange")); // false
```

#### isEmpty()
> 判断集合是否为空
>

+ **方法签名：**`public boolean isEmpty()`
+ **语法：**`list.isEmpty()`
+ **参数：** 无
+ **返回值：** boolean

```java
Collection<String> list = new ArrayList<>();
System.out.println(list.isEmpty()); // true
list.add("Hello");
System.out.println(list.isEmpty()); // false
```

#### size()
> 返回集合中元素的个数
>

+ **方法签名：**`public int size()`
+ **语法：**`list.size()`
+ **参数：** 无
+ **返回值：** 集合中元素的个数

```java
Collection<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");
System.out.println(list.size()); // 2
```

#### toArray()
> 将集合转换为数组
>

+ **方法签名：**`public Object[] toArray()`
+ **语法：**`list.toArray()`
+ **参数：** 无
+ **返回值：** Object[]，包含集合中所有元素的数组

```java
Collection<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
list.add("cherry");
Object[] array = list.toArray();
for (Object item : array) {
    System.out.println(item); // apple banana cherry
}
```

#### iterator()
> 返回一个迭代器，用于遍历集合中的元素
>

+ **方法签名：**`Iterator<E> iterator()`
+ **语法：**`list.iterator()`
+ **参数：** 无
+ **返回值：** `Iterator<E>`
+ **说明：**`E` 为集合中元素的类型

```java
Collection<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");
list.add("Java");
list.add("Python");
Iterator<String> iterator = list.iterator();
// hasNext() 方法 用于判断是否有下一个元素 有返回 true 没有返回 false
while (iterator.hasNext()) {
    // next() 方法 用于获取下一个元素 并将指针移动到下一个元素 如果没有下一个元素会抛出异常 NoSuchElementException
    System.out.println(iterator.next()); // Hello World Java Python
}
```

#### forEach()
> 对集合中的每个元素执行指定操作
>

+ **方法签名：**`default void forEach(Consumer<? super T> action)`
+ **语法：**`list.forEach(action)`
+ **参数：**`action` - 对每个元素要执行的操作
+ **返回值：** 无
+ **说明：** Consumer 是一个函数式接口，它包含一个抽象方法 `**void accept(T t)**`

```java
Collection<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.forEach(System.out::println); // A B C
```

#### stream()
> 将集合转换为流，可以对流进行各种操作，比如过滤、排序、映射等
>

+ **方法签名：**`default Stream<E> stream()`
+ **语法：**`list.stream()`
+ **参数：** 无
+ **返回值：**`Stream<E>`

```java
// 过滤
Collection<String> list = new ArrayList<>();
Collections.addAll(list, "apple", "banana", "orange", "pear");
list.stream().filter(s -> s.length() > 5).forEach(System.out::println); // banana  orange
```

### List
> List 集合的特点：有序、可重复、有索引
>

#### ArrayList 与 LinkedList 的区别
1. **ArrayList 集合的底层原理（****查询快、增删慢****）**
    1. 利用无参构造器创建的集合，会在底层创建一个默认长度为 0 的数组
    2. 添加第一个元素时，底层会创建一个新的长度为 10 的数组
    3. 存满时，会扩容 1.5 倍
    4. 如果一次添加多个元素，1.5 倍还放不下，则新创建数组的长度以实际为准
2. **LinkedList 集合的底层原理（****查询慢、增删相对较快****）**
    1. 基于双链表实现的
    2. 查询慢，增删相对较快，**对首尾元素进行增删改查的速度极快**

#### List 常用方法
##### add()
> 在指定位置插入元素
>

+ **方法签名：**`void add(int index, E element)`
+ **语法：**`list.add(index, element)`
+ **参数：**
    - `index` - 要插入的位置
    - `element` - 要插入的元素
+ **返回值：** 如果插入成功，则返回 true，否则返回 false

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
System.out.println(list); // [A, B, C]
list.add(1, "D");
System.out.println(list); // [A, D, B, C]
```

##### remove()
> 删除指定索引位置的元素
>

+ **方法签名：**`E remove(int index)`
+ **语法：**`list.remove(index)`
+ **参数：**`index` - 要删除的元素的索引
+ **返回值：** 如果删除成功，则返回 true；否则返回 false

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.add("D");
System.out.println("删除前：" + list); // [A, B, C, D]
// 删除索引为 1 的元素
list.remove(1);
System.out.println("删除后：" + list); // [A, C, D]
```

##### get()
> 获取指定索引位置的元素
>

+ **方法签名：**`E get(int index)`
+ **语法：**`list.get(index)`
+ **参数：**`index` - 索引位置
+ **返回值：** 指定索引位置的元素

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
System.out.println(list.get(1)); // B
```

##### set()
> 用指定的元素替换此列表中指定位置上的元素
>

+ **方法签名：**`E set(int index, E element)`
+ **语法：**`list.set(index, element)`
+ **参数：**
    - `index` - 要替换的元素的索引
    - `element` - 要存储在指定位置的元素
+ **返回值：** 以前位于指定位置的元素

```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
System.out.println("list: " + list); // list: [A, B, C]
String oldValue = list.set(1, "D");
System.out.println("oldValue: " + oldValue); // oldValue: B
System.out.println("list: " + list); // list: [A, D, C]
```

##### subList()
> 返回一个新的列表
>

+ **方法签名：**`List<E> subList(int fromIndex, int toIndex)`
+ **语法：**`list.subList(fromIndex, toIndex)`
+ **参数：**
    - `fromIndex` - 开始索引（包含）
    - `toIndex` - 结束索引（不包含）
+ **返回值：** 返回一个新的列表，包含指定范围的元素

```java
List<String> list = new ArrayList<>();
list.add("a");
list.add("b");
list.add("c");
list.add("d");
list.add("e");
list.add("f");
list.add("g");

// 取子列表
List<String> subList = list.subList(2, 5);
System.out.println(subList); // [c, d, e]
```

#### LinkedList 常用方法
##### addFirst()
> 将指定元素插入此列表的开头
>

+ **方法签名：**`public void addFirst(E e)`
+ **语法：**`list.addFirst(e)`
+ **参数：**`e` - 要插入的元素
+ **返回值：** 无

```java
LinkedList<String> list = new LinkedList<>();
list.add("A");
list.add("B");
list.add("C");
System.out.println("插入前：" + list); // [A, B, C]
list.addFirst("D");
System.out.println("插入后：" + list); // [D, A, B, C]
```

##### addLast()
> 将指定的元素添加到此列表的结尾
>

+ **方法签名：**`public void addLast(E e)`
+ **语法：**`list.addLast(e)`
+ **参数：**`e` - 要添加到此列表的元素
+ **返回值：** 无

```java
LinkedList<String> list = new LinkedList<>();
list.add("A");
list.add("B");
list.add("C");
System.out.println(list); // [A, B, C]
list.addLast("D");
System.out.println(list); // [A, B, C, D]
```

##### getFirst()
> 获取链表的第一个元素
>

+ **方法签名：**`public E getFirst()`
+ **语法：**`list.getFirst()`
+ **参数：** 无
+ **返回值：** 链表的第一个元素

```java
LinkedList<String> list = new LinkedList<>();
list.add("apple");
list.add("banana");
list.add("cherry");
System.out.println(list.getFirst()); // apple
```

##### getLast()
> 获取链表中的最后一个元素
>

+ **方法签名：**`public E getLast()`
+ **语法：**`list.getLast()`
+ **参数：** 无
+ **返回值：** 链表中的最后一个元素

```java
LinkedList<String> list = new LinkedList<>();
list.add("a");
list.add("b");
list.add("c");
System.out.println(list.getLast()); // c
```

##### removeFirst()
> 删除链表中的第一个元素
>

+ **方法签名：**`public E removeFirst()`
+ **语法：**`list.removeFirst()`
+ **参数：** 无
+ **返回值：** 被删除的元素

```java
LinkedList<String> list = new LinkedList<>();
list.add("a");
list.add("b");
list.add("c");
System.out.println(list); // [a, b, c]
String first = list.removeFirst();
System.out.println(first); // a
System.out.println(list); // [b, c]
```

##### removeLast()
> 删除链表中的最后一个元素
>

+ **方法签名：**`public E removeLast()`
+ **语法：**`list.removeLast()`
+ **参数：** 无
+ **返回值：** 被删除的元素

```java
LinkedList<String> list = new LinkedList<>();
list.add("A");
list.add("B");
list.add("C");
System.out.println(list); // [A, B, C]
String last = list.removeLast();
System.out.println(last); // C
System.out.println(list); // [A, B]
```

### Set
> Set 集合的特点：无序、不重复、无索引
>

#### HashSet、LinkedHashSet、TreeSet 的区别
1. **HashSet**
    - **特点：无序、不重复、无索引**
    - 底层是基于**哈希表（数组+链表+红黑树）**
    - 实现集合去重，需要重写元素对象的 `hashCode` 和 `equals` 方法
2. **LinkedHashSet**
    - **特点：****有序****、不重复、无索引**
    - 其底层也是基于哈希表实现的
    - 但是，它的每个元素都额外多了一个双链表的机制记录它前后元素的位置
3. **TreeSet**
    - **特点：****可排序（默认升序排序）****、不重复、无索引**
    - 底层是基于红黑树实现的排序
    - 集合中存储自定义类型的对象时，必须指定排序规则

## Map
> 双列集合，每个元素包含两个值（键值对）
>

### HashMap、LinkedHashMap、TreeMap 的区别
1. **HashMap**
    - **特点：无序、不重复、无索引**
    - **原理：**底层是基于**哈希表（数组 + 链表 + 红黑树）** 实现的
2. **LinkedHashMap**
    - **特点：****有序****、不重复、无索引**
    - **原理：** 底层数据结构也是基于哈希表实现的，只是每个键值对元素又额外多了一个双链表的机制记录元素顺序（**保证有序**）
3. **TreeMap**
    - **特点：****按照大小默认升序排序****、不重复、无索引**
    - **原理：** 底层是基于红黑树实现的排序

### Map 常用方法
#### put()
> 向 Map 中添加一个键值对
>

+ **方法签名：**`V put(K key, V value)`
+ **语法：**`map.put(key, value)`
+ **参数：**
    - `key` - 键，可以是任何对象，但一般使用字符串、数字等简单类型
    - `value` - 值，可以是任何对象
+ **返回值：** 如果键已经存在，则返回旧值，否则返回 null

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 10);
map.put("banana", 20);
map.put("apple", 30); // 键已经存在，旧值 10 被替换为 30
System.out.println(map); // {banana=20, apple=30}
```

#### size()
> 返回 Map 中元素的个数
>

+ **方法签名：**`int size()`
+ **语法：**`map.size()`
+ **参数：** 无
+ **返回值：** int 类型，Map 中元素的个数

```java
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
map.put("c", 3);
System.out.println(map.size()); // 3
```

#### clear()
> 清空 Map 中的所有元素，使其大小为 0
>

+ **方法签名：**`void clear()`
+ **语法：**`map.clear()`
+ **参数：** 无
+ **返回值：** 无

```java
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
map.put("c", 3);
System.out.println(map); // {a=1, b=2, c=3}
map.clear();
System.out.println(map); // {}
```

#### isEmpty()
> 判断 Map 是否为空，如果为空返回 true，否则返回 false。
>

+ **方法签名：**`boolean isEmpty()`
+ **语法：**`map.isEmpty()`
+ **参数：** 无
+ **返回值：** boolean 类型，true 表示 Map 为空，false 表示 Map 不为空。

```java
Map<String, String> map = new HashMap<>();
if (map.isEmpty()) {
    System.out.println("Map is empty"); // 输出 Map is empty
} else {
    System.out.println("Map is not empty");
}
```

#### get()
> 根据 key 获取 value
>

+ **方法签名：**`V get(Object key)`
+ **语法：**`map.get(key)`
+ **参数：**`key` - 要获取的 key
+ **返回值：** 如果 key 存在于 map 中，则返回对应的 value，否则返回 null

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 10);
map.put("banana", 20);
map.put("orange", 30);
System.out.println(map.get("apple")); // 10
System.out.println(map.get("banana")); // 20
System.out.println(map.get("orange")); // 30
System.out.println(map.get("grape")); // null
```

#### remove()
> 删除键值对，返回值是被删除的值，如果不存在则返回 null
>

+ **方法签名：**`V remove(Object key)`
+ **语法：**`map.remove(key)`
+ **参数：**`key` - 要删除的键
+ **返回值：** 如果存在，返回被删除的值；否则返回 null

```java
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
map.put("c", 3);
System.out.println(map); // {a=1, b=2, c=3}
System.out.println(map.remove("b")); // 2
System.out.println(map); // {a=1, c=3}
System.out.println(map.remove("b")); // null
System.out.println(map); // {a=1, c=3}
```

#### containsKey()
> 判断 Map 中是否包含指定的 key
>

+ **方法签名：**`boolean containsKey(Object key)`
+ **语法：**`map.containsKey(key)`
+ **参数：**`key` - 指定的 key
+ **返回值：** 如果 Map 中包含指定的 key，则返回 true；否则返回 false

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 10);
map.put("banana", 20);
map.put("orange", 30);
if (map.containsKey("apple")) {
    System.out.println("Map contains key 'apple'"); // 输出：Map contains key 'apple'
}
if (map.containsKey("grape")) {
    // 这行代码不会被执行
    System.out.println("Map contains key 'grape'");
}
```

#### containsValue()
> 判断 Map 中是否包含指定的值
>

+ **方法签名：**`boolean containsValue(Object value)`
+ **语法：**`map.containsValue(value)`
+ **参数：**`value` - 要在 Map 中查找的值
+ **返回值：** 如果 Map 中包含指定的值，则返回 true；否则返回 false。

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 10);
map.put("banana", 20);
map.put("orange", 30);
System.out.println(map.containsValue(10)); // true
System.out.println(map.containsValue(40)); // false
```

#### keySet()
> 返回此映射中包含的键的集合。
>

+ **方法签名：**`Set<K> keySet()`
+ **语法：**`map.keySet()`
+ **参数：** 无
+ **返回值：** 返回一个包含此映射中所有键的 Set 视图。

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);
map.put("orange", 3);
map.put("grape", 4);
System.out.println(map.keySet()); // [banana, orange, apple, grape]
```

#### values()
> 返回此映射中包含的值的集合视图。
>

+ **方法签名：**`Collection<V> values()`
+ **语法：**`map.values()`
+ **参数：** 无
+ **返回值：**`Collection<V>` 类型，包含此映射中包含的值的集合视图。

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);
map.put("orange", 3);
System.out.println(map.values()); // [2, 3, 1]
```

#### entrySet()
> 返回一个 Set 视图，其中包含此映射中的所有映射关系
>

+ **方法签名：**`Set<Map.Entry<K, V>> entrySet()`
+ **语法：**`map.entrySet()`
+ **参数：** 无
+ **返回值：** Set<Map.Entry<K,V>>

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);
map.put("orange", 3);
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    // getKey() 方法用于获取键，getValue() 方法用于获取值
    System.out.println(entry.getKey() + " : " + entry.getValue()); // banana : 2    orange : 3    apple : 1
}
```

#### forEach()
> 遍历 Map 中的所有 key-value 对，并对每个 key-value 对执行一个操作
>

+ **方法签名：**`default void forEach(BiConsumer<? super K, ? super V> action)`
+ **语法：**`map.forEach(action)`
+ **参数：** action 是一个 BiConsumer 接口，它定义了一个方法 accept()，该方法接收两个参数：key 和 value。
+ **返回值：** 无

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);
map.put("orange", 3);
map.forEach((k, v) -> System.out.println(k + " : " + v)); // banana : 2    orange : 3    apple : 1
```

## Stream 流
> Stream 流，用于操作集合或者数组的数据
>

### Stream 常用方法
#### of()
> 将传递的参数转换为 Stream 流
>

1. `public static<T> Stream<T> of(T... values)`
    - **语法：**`Stream.of(value1, value2, value3,...)`
    - **参数：**`value1, value2, value3, …` - 要转换为 Stream 流的元素
    - **返回值：**`Stream<T>` - 包含传递参数的 Stream 流

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream.forEach(System.out::println); // 1  2  3  4  5
```

2. `public static<T> Stream<T> of(T t)`
    - **语法：**`Stream.of(array)`
    - **参数：**`array` - 一个数组
    - **返回值：**`Stream<T>` - 包含数组元素的 Stream 流

```java
String[] arr = {"1", "2", "3", "4", "5"};
Stream<String> stream2 = Stream.of(arr);
stream2.forEach(System.out::println); // "1"  "2"  "3"  "4"  "5"
```

#### concat()
> 将两个流合并为一个流
>

+ **方法签名：**`public static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)`
+ **语法：**`Stream.concat(stream1, stream2)`
+ **参数：**
    - `stream1` - 第一个流
    - `stream2` - 第二个流
+ **返回值：** 合并后的流

```java
Stream<Integer> stream1 = Stream.of(1, 2, 3);
Stream<Integer> stream2 = Stream.of(4, 5, 6);
Stream<Integer> stream3 = Stream.concat(stream1, stream2);
stream3.forEach(System.out::println); // 1 2 3 4 5 6
```

### Stream 常用中间方法
#### filter()
> 对 Stream 中的元素进行过滤
>

+ **方法签名：**`Stream<T> filter(Predicate<? super T> predicate)`
+ **语法：**`stream.filter(Predicate)`
+ **参数：**`Predicate` - 是一个函数式接口，只有一个方法 test(T t)，返回 boolean 类型。
+ **返回值：**`Stream<T>` - 过滤后的 Stream。

```java
// 过滤出 Stream 中大于 3 的元素
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
stream.filter(i -> i > 3).forEach(System.out::println); // 输出 4 5
```

#### sorted()
> 对流中的元素进行排序
>

1. `Stream<T> sorted()`
    - **语法：**`stream.sorted()`
    - **参数：** 无
    - **返回值：** Stream 类型

```java
Stream.of("a", "c", "b").sorted().forEach(System.out::println); // a  b  c
```

2. `Stream<T> sorted(Comparator<? super T> comparator)`
    - **语法：**`stream.sorted(comparator)`
    - **参数：**`comparator` - 排序规则
    - **返回值：** Stream 类型

```java
Stream.of("a", "c", "b").sorted((a, b) -> b.compareTo(a)).forEach(System.out::println); // c  b  a
```

#### limit()
> 限制流中元素的数量
>

+ **方法签名：**`Stream<T> limit(long maxSize)`
+ **语法：**`stream.limit(maxSize)`
+ **参数：**`maxSize` - 要限制的元素数量
+ **返回值：**`Stream<T>` - 新的流，包含了 maxSize 个元素

```java
Stream<String> stream = Stream.of("apple", "banana", "orange", "grape", "pear");
stream.limit(3).forEach(System.out::println); // apple banana orange
```

#### skip()
> 跳过指定数量的元素，返回一个新的流
>

+ **方法签名：**`Stream<T> skip(long n)`
+ **语法：**`stream.skip(n)`
+ **参数：**`n` - 表示要跳过的元素数量
+ **返回值：** 返回一个新的流，包含了原流中从 n+1 开始的元素

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
stream.skip(3).forEach(System.out::println); // 输出 4 5 6 7 8 9 10
```

#### distinct()
> 去除重复元素
>

+ **方法签名：**`Stream<T> distinct()`
+ **语法：**`stream.distinct()`
+ **参数：** 无
+ **返回值：**`Stream<T>`，去除重复元素后的流

```java
String[] arr = {"apple", "banana", "apple", "orange", "banana"};
Stream<String> stream = Stream.of(arr);
Stream<String> distinctStream = stream.distinct();
distinctStream.forEach(System.out::println); // apple, banana, orange
```

#### map()
> 对元素进行转换，返回新的 Stream
>

+ **方法签名：**`<R> Stream<R> map(Function<? super T, ? extends R> mapper)`
+ **语法：**`stream.map(mapper)`
+ **参数：**`mapper` - 一个转换函数，将 T 类型转换为 R 类型
+ **返回值：** 一个新的 Stream，包含了转换后的元素

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
Stream<Integer> newStream = stream.map(i -> i + 1);
newStream.forEach(System.out::println); // 输出：2 3 4 5 6
```

### Stream 常用终结方法
#### forEach()
> 遍历流中的元素，并对每个元素进行操作
>

+ **方法签名：**`void forEach(Consumer<? super T> action)`
+ **语法：**`stream.forEach(action)`
+ **参数：**`action` - Consumer 接口的实例，用于对流中的元素进行操作
+ **返回值：** 无

```java
Stream<String> stream = Stream.of("张三", "李四", "王五");
stream.forEach(System.out::println); // 张三  李四   王五
```

#### count()
> 统计流中元素的个数
>

+ **方法签名：**`long count()`
+ **语法：**`stream.count()`
+ **参数：** 无
+ **返回值：** long类型，流中元素的个数

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
long count = stream.count();
System.out.println(count); // 5
```

#### max()
> 返回流中最大的元素
>

+ **方法签名：**`Optional<T> max(Comparator<? super T> comparator)`
+ **语法：**`stream.max(comparator)`
+ **参数：**`comparator` - 比较器
+ **返回值：**`Optional<T>` - 最大元素的 Optional 对象

```java
String[] arr = {"apple", "banana", "orange", "pear"};
Stream<String> stream = Stream.of(arr);
// get() 方法获取 Optional 对象中的值
String maxStr = stream.max((s1, s2) -> s1.length() - s2.length()).get();
System.out.println(maxStr); // banana
```

#### min()
> 找到流中最小的元素
>

+ **方法签名：**`Optional<T> min(Comparator<? super T> comparator)`
+ **语法：**`stream.min(comparator)`
+ **参数：**`comparator` - 用于比较元素的 Comparator
+ **返回值：**`Optional<T>` - 最小元素的 Optional 对象

```java
Integer[] arr = {1, 3, 5, 7, 9};
Stream<Integer> stream = Stream.of(arr);
Optional<Integer> min = stream.min(Integer::compare);
System.out.println(min.get()); // 1
```

#### collect()
> 将流中的元素收集到一个新的容器中，并返回这个容器。
>

+ **方法签名：**`<R, A> R collect(Collector<? super T, A, R> collector)`
+ **语法：**`stream.collect(collector)`
+ **参数：**`collector` - 一个 Collector 接口的实现类
+ **返回值：** R - 收集到的结果

```java
String[] arr = {"张无忌", "张三丰", "张翠山", "张一山"};
Stream<String> stream = Stream.of(arr);
// 收集到一个字符串数组中
String[] result = stream.collect(Collectors.toList()).toArray(new String[0]);
System.out.println(result); // [张无忌, 张三丰, 张翠山, 张一山]
```

#### toArray()
> 将流转换为数组
>

+ **方法签名：**`<A> A[] toArray(IntFunction<A[]> generator)`
+ **语法：**`stream.toArray(generator)`
+ **参数：**`generator` - 是一个函数接口
+ **返回值：** 一个数组

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);
Integer[] arr = stream.toArray(Integer[]::new);
System.out.println(Arrays.toString(arr)); // [1, 2, 3, 4, 5]
```

## Object
### Object 常用方法
#### toString()
> 返回对象的字符串表示，用于方法重写
>

+ **方法签名：**`public String toString()`
+ **语法：**`对象.toString()`
+ **参数：** 无
+ **返回值：** 字符串

```java
Person person = new Person("张三", 18);
// 调用对象重写的 toString 方法
String str = person.toString();
System.out.println(str); // Person{name='张三', age=18}
```

#### equals()
> 判断两个对象是否相等，用于方法重写
>

+ **方法签名：**`public boolean equals(Object obj)`
+ **语法：**`obj1.equals(obj2)`
+ **参数：** obj2 要比较的对象
+ **返回值：** 如果两个对象相等，返回 true；否则返回 false

```java
String str1 = new String("hello");
String str2 = new String("hello");
// String 类重写了 equals 方法，比较的是字符串的内容
System.out.println(str1.equals(str2)); // true
```

#### hashCode()
> 返回对象的哈希码值
>

+ **方法签名：**`public native int hashCode()`
+ **语法：**`obj.hashCode()`
+ **参数：** 无
+ **返回值：** int
+ **说明：** 哈希码值是由对象的内存地址经过哈希算法得到的一个整数
+ **作用：** 哈希码值是用于快速查找的，可以提高查找效率
+ **注意：哈希码值不是对象的内存地址，不同对象的哈希码值可能相同**

```java
Object obj = new Object();
int hashCode = obj.hashCode();
System.out.println(hashCode); // 189568618
```

#### wait()
> 让当前线程等待，直到其他线程调用 notify() 方法或 notifyAll() 方法唤醒当前线程。
>

+ **方法签名：**`public final void wait() throws InterruptedException`
+ **语法：**`obj.wait()`
+ **参数：** 无
+ **返回值：** 无
+ **注意：** 调用 wait() 方法的线程必须持有对象的监视器锁，否则会抛出 IllegalMonitorStateException 异常。

```java
// 创建一个锁对象
Object lock = new Object();
// 创建两个线程
Thread t1 = new Thread(() -> {
    synchronized (lock) {
        System.out.println("线程1获取到锁对象，开始等待...");
        try {
            lock.wait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("线程1被唤醒，继续执行...");
    }
});
Thread t2 = new Thread(() -> {
    synchronized (lock) {
        System.out.println("线程2获取到锁对象，开始等待...");
        try {
            Thread.sleep(2000);
            lock.notify();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("线程2通知线程1，继续执行...");
    }
});
// 启动线程
t1.start();
t2.start();
```

## Scanner
> 从控制台读取输入
>

### Scanner 常用方法
#### next()
> 读取一个字符串，直到遇到空格为止
>

+ **方法签名：**`public String next()`
+ **语法：**`scanner.next()`
+ **参数：** 无
+ **返回值：** String 类型，读取到的字符串

```java
Scanner scanner = new Scanner(System.in);
System.out.println("请输入一个字符串：");
String str = scanner.next();
System.out.println("读取到的字符串是：" + str);
```

#### nextLine()
> 读取一行输入，直到遇到换行符为止
>

+ **方法签名：**`public String nextLine()`
+ **语法：**`scanner.nextLine()`
+ **参数：** 无
+ **返回值：** String

```java
Scanner scanner = new Scanner(System.in);
System.out.println("请输入一行文本：");
String line = scanner.nextLine();
System.out.println("你输入的文本是：" + line);
```

#### nextInt()
> 读取一个整数
>

+ **方法签名：**`public int nextInt()`
+ **语法：**`scanner.nextInt()`
+ **参数：** 无
+ **返回值：** int

```java
Scanner scanner = new Scanner(System.in);
System.out.println("请输入一个整数：");
int num = scanner.nextInt();
System.out.println("你输入的整数是：" + num);
```

#### nextDouble()
> 读取一个 double 类型的数值
>

+ **方法签名：**`public double nextDouble()`
+ **语法：**`scanner.nextDouble()`
+ **参数：** 无
+ **返回值：** double 类型，读取到的 double 类型的数值

```java
Scanner scanner = new Scanner(System.in);
System.out.println("请输入一个 double 类型的数值：");
double num = scanner.nextDouble();
System.out.println("读取到的 double 类型的数值是：" + num);
```

#### close()
> 关闭此扫描器
>

+ **方法签名：**`public void close()`
+ **语法：**`scanner.close()`
+ **参数：** 无
+ **返回值：** 无

```java
Scanner scanner = new Scanner(System.in);
System.out.println("请输入一个整数：");
int num = scanner.nextInt();
System.out.println("num = " + num);
scanner.close();
```

## Random
> 用于生成随机数
>

### Random 常用方法
#### nextInt()
> 生成一个 int 类型的随机数
>

+ **方法签名：**`public int nextInt(int bound)`
+ **语法：**`random.nextInt(bound)`
+ **参数：**`bound` 生成的随机数的范围是 [0, bound)
+ **返回值：** int 类型的随机数

```java
Random random = new Random();
int num = random.nextInt(100);
System.out.println(num);
```

#### nextBoolean()
> 返回一个随机的 boolean 值
>

+ **方法签名：**`public boolean nextBoolean()`
+ **语法：**`random.nextBoolean()`
+ **参数：** 无参数
+ **返回值：** 返回一个随机的 boolean 值

```java
Random random = new Random();
boolean b = random.nextBoolean();
System.out.println(b); // true 或 false
```

#### nextDouble()
> 返回一个大于等于 0.0 且小于 1.0 的随机浮点数
>

+ **方法签名：**`public double nextDouble()`
+ **语法：**`random.nextDouble()`
+ **参数：** 无参数
+ **返回值：** 一个大于等于 0.0 且小于 1.0 的随机浮点数

```java
Random random = new Random();
double randomDouble = random.nextDouble();
System.out.println(randomDouble);
```

#### nextFloat()
> 返回一个伪随机数，范围在 0.0 和 1.0 之间
>

+ **方法签名：**`public float nextFloat()`
+ **语法：**`random.nextFloat()`
+ **参数：** 无参数
+ **返回值：** 返回一个伪随机数，范围在 0.0 和 1.0 之间

```java
Random random = new Random();
float result = random.nextFloat();
System.out.println(result);
```

## BigDeciaml
> 高精度计算
>

### BigDeciaml 常用方法
#### add()
> 加法
>

+ **方法签名：**`public BigDecimal add(BigDecimal augend)`
+ **语法：**`bigDecimal.add(augend)`
+ **参数：**`augend` 要添加的值
+ **返回值：** BigDecimal 类型，表示两个值的和

```java
BigDecimal bigDecimal1 = new BigDecimal("123.456");
BigDecimal bigDecimal2 = new BigDecimal("654.321");
BigDecimal result = bigDecimal1.add(bigDecimal2);
System.out.println(result); // 777.777
```

#### subtract()
> 减法
>

+ **方法签名：**`public BigDecimal subtract(BigDecimal subtrahend)`
+ **语法：**`subtrahend.subtract(minuend)`
+ **参数：**`minuend` 要减去的值
+ **返回值：** subtrahend - minuend 的差

```java
BigDecimal a = new BigDecimal("10.0");
BigDecimal b = new BigDecimal("5.0");
BigDecimal c = a.subtract(b);
System.out.println(c); // 5.0
```

#### multiply()
> 乘法
>

+ **方法签名：**`public BigDecimal multiply(BigDecimal multiplicand)`
+ **语法：**`bigDecimal.multiply(multiplicand)`
+ **参数：**`minuend` - 乘数
+ **返回值：** 两个 BigDecimal 的乘积

```java
BigDecimal b1 = new BigDecimal("123.456");
BigDecimal b2 = new BigDecimal("654.321");
BigDecimal b3 = b1.multiply(b2);
System.out.println(b3); // 80779.853376
```

#### divide()
> 除法
>

1. `public BigDecimal divide(BigDecimal divisor)`
    - **语法：**`dividend.divide(divisor)`
    - **参数：**`divisor` - 除数
    - **返回值：** BigDecimal - 商

```java
BigDecimal dividend = new BigDecimal("9.0");
BigDecimal divisor = new BigDecimal("3.0");
BigDecimal result = dividend.divide(divisor);
System.out.println(result); // 3
```

2. `public BigDecimal divide(BigDecimal divisor, int scale, RoundingMode roundingMode)`
    - **语法：**`dividend.divide(divisor, scale, roundingMode)`
    - **参数：**
        * `divisor` - 除数
        * `scale` - 保留小数位数
        * `roundingMode` - 舍入模式
    - **返回值：** BigDecimal - 商

```java
BigDecimal dividend = new BigDecimal("10");
BigDecimal divisor = new BigDecimal("3");
BigDecimal result = dividend.divide(divisor, 2, 4); // 保留两位小数，四舍五入
System.out.println(result); // 3.33
```

#### valueOf()
> 将 double 类型的数据转换为 BigDecimal 类型
>

+ **方法签名：**`public static BigDecimal valueOf(double val)`
+ **语法：**`BigDecimal.valueOf(val)`
+ **参数：**`val` - double 类型的数据
+ **返回值：** BigDecimal 类型的数据

```java
BigDecimal bigDecimal = BigDecimal.valueOf(3.14);
System.out.println(bigDecimal); // 3.14
```

#### doubleValue()
> 将 BigDecimal 对象转换为 double 类型
>

+ **方法签名：**`public double doubleValue()`
+ **语法：**`bigDecimal.doubleValue()`
+ **参数：** 无
+ **返回值：** double 类型的值

```java
BigDecimal bigDecimal = new BigDecimal("12345678901234567890.123456789");
double value = bigDecimal.doubleValue();
System.out.println(value); // 1.2345678901234568E19
```

## Runtime
> Runtime 是一个单例类，JVM 运行时
>

### Runtime 常用方法
#### getRuntime()
> 返回与当前 Java 应用程序相关的运行时对象
>

+ **方法签名：**`public static Runtime getRuntime()`
+ **语法：**`Runtime.getRuntime()`
+ **参数：** 无
+ **返回值：** 与当前 Java 应用程序相关的运行时对象

```java
Runtime runtime = Runtime.getRuntime();
System.out.println("Runtime.getRuntime() -> " + runtime);
```

#### exit()
> 终止当前正在运行的 Java 虚拟机
>

+ **方法签名：**`public void exit(int status)`
+ **语法：**`runtime.exit(status)`
+ **参数：**`status` 退出状态。0 表示正常退出，非 0 表示异常退出
+ **返回值：** 无

```java
Runtime runtime = Runtime.getRuntime();
System.out.println("程序开始运行");
runtime.exit(0);
System.out.println("程序结束运行"); // 这行代码不会被执行
```

#### availableProcessors()
> 返回 Java 虚拟机可用的处理器数量
>

+ **方法签名：**`public int availableProcessors()`
+ **语法：**`runtime.availableProcessors()`
+ **参数：** 无
+ **返回值：** 返回 Java 虚拟机可用的处理器数量

```java
Runtime runtime = Runtime.getRuntime();
int processors = runtime.availableProcessors();
System.out.println("Java 虚拟机可用的处理器数量：" + processors);
```

#### totalMemory()
> 返回 Java 虚拟机中的内存总量
>

+ **方法签名：**`public long totalMemory()`
+ **语法：**`runtime.totalMemory()`
+ **参数：** 无
+ **返回值：** 返回 Java 虚拟机中的内存总量（字节数）

```java
Runtime runtime = Runtime.getRuntime();
System.out.println("Total memory: " + runtime.totalMemory());
```

#### freeMemory()
> 返回 Java 虚拟机中的空闲内存量
>

+ **方法签名：**`public long freeMemory()`
+ **语法：**`runtime.freeMemory()`
+ **参数：** 无
+ **返回值：** 返回 Java 虚拟机中的空闲内存量（字节数）

```java
Runtime runtime = Runtime.getRuntime();
System.out.println("空闲内存量：" + runtime.freeMemory());
```

#### exec()
> 执行命令行命令
>

+ **方法签名：**`public Process exec(String command) throws IOException`
+ **语法：**`runtime.exec(command)`
+ **参数：**`command` 要执行的命令
+ **返回值：** 返回一个新的 Process 对象，表示进程

```java
try {
    Runtime runtime = Runtime.getRuntime();
    Process process = runtime.exec("calc");
    System.out.println(process);
    Scanner scanner = new Scanner(System.in);
    System.out.println("是否关闭计算器？(y/n)");
    String input = scanner.next();
    if (input.equals("y")) {
        process.destroy(); // 关闭进程
    } else {
        System.out.println("未关闭计算器");
    }
} catch (Exception e) {
    e.printStackTrace();
}
```

## 时间相关的类
### LocalDate 常用方法
#### now()
> 获取当前日期
>

+ **方法签名：**`public static LocalDate now()`
+ **语法：**`LocalDate.now()`
+ **参数：** 无
+ **返回值：** LocalDate 对象

```java
LocalDate now = LocalDate.now();
System.out.println(now); // 2024-05-26
```

#### of()
> 创建一个 LocalDate 实例
>

+ **方法签名：**`public static LocalDate of(int year, int month, int dayOfMonth)`
+ **语法：**`LocalDate.of(year, month, dayOfMonth)`
+ **参数：**
    - `year` - 年份
    - `month` - 月份
    - `dayOfMonth` - 当月的第几天
+ **返回值：** LocalDate 对象

```java
LocalDate date = LocalDate.of(2021, 9, 1);
System.out.println(date); // 2021-09-01
```

#### getYear()
> 获取年份
>

+ **方法签名：**`public int getYear()`
+ **语法：**`date.getYear()`
+ **参数：** 无
+ **返回值：** int 类型，年份

```java
LocalDate date = LocalDate.now();
int year = date.getYear();
System.out.println(year); // 2024
```

#### getMonthValue()
> 获取月份
>

+ **方法签名：**`public int getMonthValue()`
+ **语法：**`date.getMonthValue()`
+ **参数：** 无
+ **返回值：** int 类型，月份

```java
LocalDate date = LocalDate.now();
int month = date.getMonthValue();
System.out.println(month); // 5
```

#### getDayOfMonth()
> 获取当前日期是这个月的第几天
>

+ **方法签名：**`public int getDayOfMonth()`
+ **语法：**`date.getDayOfMonth()`
+ **参数：** 无
+ **返回值：** int 类型，当前日期是这个月的第几天

```java
LocalDate date = LocalDate.now();
int dayOfMonth = date.getDayOfMonth();
System.out.println(dayOfMonth); // 26
```

#### getDayOfYear()
> 获取当前日期是当年的第几天
>

+ **方法签名：**`public int getDayOfYear()`
+ **语法：**`date.getDayOfYear()`
+ **参数：** 无
+ **返回值：** int 类型，当前日期是当年的第几天

```java
LocalDate date = LocalDate.now();
int dayOfYear = date.getDayOfYear();
System.out.println(dayOfYear); // 147
```

#### getDayOfWeek()
> 获取当前日期是星期几
>

+ **方法签名：**`public DayOfWeek getDayOfWeek()`
+ **语法：**`date.getDayOfWeek()`
+ **参数：** 无
+ **返回值：** DayOfWeek 枚举类型，表示星期几

```java
LocalDate date = LocalDate.now();
DayOfWeek dayOfWeek = date.getDayOfWeek();
System.out.println(dayOfWeek.name()); // SUNDAY
System.out.println(dayOfWeek.getValue()); // 7
```

#### withYear()、withMonth()、withDayOfMonth()、withDayOfYear()
```java
LocalDate date = LocalDate.now();
System.out.println(date); // 2024-05-26

// withYear() 修改年份 - 返回新的 LocalDate 实例
System.out.println(date.withYear(2023)); // 2023-05-26
// withMonth() 修改月份 - 返回新的 LocalDate 实例
System.out.println(date.withMonth(6)); // 2024-06-26
// withDayOfMonth() 修改当月第几天 - 返回新的 LocalDate 实例
System.out.println(date.withDayOfMonth(15)); // 2024-05-15
// withDayOfYear() 修改当年第几天 - 返回新的 LocalDate 实例
System.out.println(date.withDayOfYear(100)); // 2024-04-09
```

#### plusYears()、plusMonths()、plusDays()、plusWeeks()
```java
LocalDate date = LocalDate.now();
System.out.println(date); // 2024-05-26

// plusYears() 增加年份 - 返回新的 LocalDate 实例
System.out.println(date.plusYears(1)); // 2025-05-26
// plusMonths() 增加月份 - 返回新的 LocalDate 实例
System.out.println(date.plusMonths(1)); // 2024-06-26
// plusDays() 增加天数 - 返回新的 LocalDate 实例
System.out.println(date.plusDays(1)); // 2024-05-27
// plusWeeks() 增加周数 - 返回新的 LocalDate 实例
System.out.println(date.plusWeeks(1)); // 2024-06-02
```

#### minusYears()、minusMonths()、minusDays()、minusWeeks()
```java
LocalDate date = LocalDate.now();
System.out.println(date); // 2024-05-26

// minusYears() 减少年份 - 返回新的 LocalDate 实例
System.out.println(date.minusYears(1)); // 2023-05-26
// minusMonths() 减少月份 - 返回新的 LocalDate 实例
System.out.println(date.minusMonths(1)); // 2024-04-26
// minusDays() 减少天数 - 返回新的 LocalDate 实例
System.out.println(date.minusDays(1)); // 2024-05-25
// minusWeeks() 减少周数 - 返回新的 LocalDate 实例
System.out.println(date.minusWeeks(1)); // 2024-05-19
```

#### equals()、isBefore()、isAfter()
```java
LocalDate date1 = LocalDate.of(2020, 1, 1);
LocalDate date2 = LocalDate.of(2020, 1, 2);

// equals() 判断两个日期是否相等 - 返回 boolean
System.out.println(date1.equals(date2)); // false
// isBefore() 判断日期是否在指定日期之前 - 返回 boolean
System.out.println(date1.isBefore(date2)); // true
// isAfter() 判断日期是否在指定日期之后 - 返回 boolean
System.out.println(date1.isAfter(date2)); // false
```

### LocalTime 常用方法
#### now()
> 获取当前时间
>

+ **方法签名：**`public static LocalTime now()`
+ **语法：**`LocalTime.now()`
+ **参数：** 无
+ **返回值：** LocalTime 对象

```java
LocalTime now = LocalTime.now();
System.out.println(now); // 18:37:01.833735
```

#### of()
> 创建一个 LocalTime 实例
>

+ **方法签名：**`public static LocalTime of(int hour, int minute, int second, int nanoOfSecond)`
+ **语法：**`LocalTime.of(hour, minute, second, nanoOfSecond)`
+ **参数：**
    - `hour` - 小时，取值范围是 0-23
    - `minute` - 分钟，取值范围是 0-59
    - `second` - 秒，取值范围是 0-59
    - `nanoOfSecond` - 纳秒，取值范围是 0-999999999
+ **返回值：** LocalTime 实例

```java
LocalTime time = LocalTime.of(12, 30, 45, 123456789);
System.out.println(time); // 12:30:45.123456789
```

#### getHour()
> 获取当前时间的小时数
>

+ **方法签名：**`public int getHour()`
+ **语法：**`localTime.getHour()`
+ **参数：** 无
+ **返回值：** int 类型，当前时间的小时数

```java
LocalTime localTime = LocalTime.now();
int hour = localTime.getHour();
System.out.println(hour); // 15
```

#### getMinute()
> 获取当前时间的分钟数
>

+ **方法签名：**`public int getMinute()`
+ **语法：**`localTime.getMinute()`
+ **参数：** 无
+ **返回值：** int 类型，当前时间的分钟数

```java
LocalTime localTime = LocalTime.now();
int minute = localTime.getMinute();
System.out.println(minute); // 9
```

#### getSecond()
> 获取当前时间的秒数
>

+ **方法签名：**`public int getSecond()`
+ **语法：**`localTime.getSecond()`
+ **参数：** 无
+ **返回值：** int 类型，当前时间的秒数

```java
LocalTime localTime = LocalTime.now();
int second = localTime.getSecond();
System.out.println(second); // 0
```

#### getNano()
> 获取纳秒数
>

+ **方法签名：**`public int getNano()`
+ **语法：**`localTime.getNano()`
+ **参数：** 无
+ **返回值：** int 类型，纳秒数

```java
LocalTime localTime = LocalTime.now();
int nano = localTime.getNano();
System.out.println(nano); // 474725000
```

#### withHour()、withMinute()、withSecond()、withNano()
```java
LocalTime time = LocalTime.of(12, 30, 45, 123456789);
System.out.println(time); // 12:30:45.123456789

// withHour 修改小时，返回新的 LocalTime 对象
System.out.println(time.withHour(15)); // 15:30:45.123456789
// withMinute 修改分钟，返回新的 LocalTime 对象
System.out.println(time.withMinute(20)); // 12:20:45.123456789
// withSecond 修改秒，返回新的 LocalTime 对象
System.out.println(time.withSecond(50)); // 12:30:50.123456789
```

#### plusHours()、plusMinutes()、plusSeconds()、plusNanos()
```java
LocalTime now = LocalTime.now();
System.out.println(now); // 21:21:26.822514900

// plusHours() 增加小时，返回新的 LocalTime 对象
System.out.println(now.plusHours(1)); // 22:21:26.822514900
// plusMinutes() 增加分钟，返回新的 LocalTime 对象
System.out.println(now.plusMinutes(1)); // 21:22:26.822514900
// plusSeconds() 增加秒，返回新的 LocalTime 对象
System.out.println(now.plusSeconds(1)); // 21:21:27.822514900
// plusNanos() 增加纳秒，返回新的 LocalTime 对象
System.out.println(now.plusNanos(1)); // 21:21:26.822514901
```

#### minusHours()、minusMinutes()、minusSeconds()、minusNanos()
```java
LocalTime localTime = LocalTime.of(12, 30, 45, 999);
System.out.println(localTime); // 12:30:45.000000999

// minusHours() 减少小时数，返回新的 LocalTime 实例
System.out.println(localTime.minusHours(1)); // 11:30:45.000000999
// minusMinutes() 减少分钟数，返回新的 LocalTime 实例
System.out.println(localTime.minusMinutes(1)); // 12:29:45.000000999
// minusSeconds() 减少秒数，返回新的 LocalTime 实例
System.out.println(localTime.minusSeconds(1)); // 12:30:44.000000999
// minusNanos() 减少纳秒数，返回新的 LocalTime 实例
System.out.println(localTime.minusNanos(1)); // 12:30:45.000000998
```

#### equals()、isBefore()、isAfter()
```java
LocalTime time1 = LocalTime.of(12, 0, 0);
LocalTime time2 = LocalTime.of(12, 0, 0);
// equals() 比较两个 LocalTime 是否相等，返回 Boolean 类型
System.out.println(time1.equals(time2)); // true
// isBefore() 比较两个 LocalTime 的先后顺序，返回 Boolean 类型
System.out.println(time1.isBefore(time2)); // false
// isAfter() 比较两个 LocalTime 的先后顺序，返回 Boolean 类型
System.out.println(time1.isAfter(time2)); // false
```

### LocalDateTime 常用方法
#### now()
> 获取当前日期时间
>

+ **方法签名：**`public static LocalDateTime now()`
+ **语法：**`LocalDateTime.now()`
+ **参数：** 无
+ **返回值：** LocalDateTime 类型的对象

```java
LocalDateTime now = LocalDateTime.now();
System.out.println(now); // 2024-05-26T18:39:08.637598300
```

#### toLocalDate()
> 获取 LocalDateTime 对象的日期部分
>

+ **方法签名：**`public LocalDate toLocalDate()`
+ **语法：**`localDateTime.toLocalDate()`
+ **参数：** 无
+ **返回值：** LocalDate 对象

```java
LocalDateTime localDateTime = LocalDateTime.now();
LocalDate localDate = localDateTime.toLocalDate();
System.out.println(localDate); // 2024-05-26
```

#### toLocalTime()
> 获取 LocalDateTime 对象的时间部分
>

+ **方法签名：**`public LocalTime toLocalTime()`
+ **语法：**`localDateTime.toLocalTime()`
+ **参数：** 无
+ **返回值：** LocalTime 对象

```java
LocalDateTime localDateTime = LocalDateTime.now();
LocalTime localTime = localDateTime.toLocalTime();
System.out.println(localTime); // 22:25:21.430481300
```

#### format()
> 格式化 LocalDateTime 对象为字符串
>

+ **方法签名：**`public String format(DateTimeFormatter formatter)`
+ **语法：**`localDateTime.format(formatter)`
+ **参数：**`formatter` - 格式化器对象
+ **返回值：** 格式化后的字符串

```java
LocalDateTime now = LocalDateTime.now();
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String str = now.format(formatter);
System.out.println(now); // 2024-05-27T21:59:25.809224800
System.out.println(str); // 2024-05-27 21:59:25
```

#### parse()
> 将字符串转换为 LocalDateTime 对象
>

+ **方法签名：**`public static LocalDateTime parse(CharSequence text, DateTimeFormatter formatter)`
+ **语法：**`LocalDateTime.parse(text, formatter)`
+ **参数：**
    - `text` - 要解析的字符串
    - `formatter` - 解析器，用于指定日期时间格式
+ **返回值：** LocalDateTime 对象

```java
String text = "2021-08-01 12:00:00";
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
LocalDateTime localDateTime = LocalDateTime.parse(text, formatter);
System.out.println(localDateTime); // 2021-08-01T12:00
```

### ZoneId 常用方法
#### getAvailableZoneIds()
> 获取所有可用的时区
>

+ **方法签名：**`public static Set<String> getAvailableZoneIds()`
+ **语法：**`ZoneId.getAvailableZoneIds()`
+ **参数：** 无
+ **返回值：**`Set<String>`，所有可用的时区

```java
Set<String> availableZoneIds = ZoneId.getAvailableZoneIds();
System.out.println(availableZoneIds); // [Asia/Aden, America/Cuiaba, Etc/GMT+9, Etc/GMT+8, ...]
```

#### SystemDefault()
> 获取系统默认时区
>

+ **方法签名：**`public static ZoneId systemDefault()`
+ **语法：**`ZoneId.systemDefault()`
+ **参数：** 无
+ **返回值：** ZoneId 对象

```java
ZoneId zoneId = ZoneId.systemDefault();
System.out.println(zoneId); // GMT+08:00
```

#### of()
> 根据时区的 ID 获取 ZoneId 对象
>

+ **方法签名：**`public static ZoneId of(String zoneId)`
+ **语法：**`ZoneId.of(zoneId)`
+ **参数：**`zoneId` - 时区的 ID
+ **返回值：** ZoneId 对象

```java
ZoneId zoneId = ZoneId.of("Asia/Shanghai");
System.out.println(zoneId); // Asia/Shanghai
```

### ZonedDateTime 常用方法
#### now()
> 获取当前时间
>

1. `public static ZonedDateTime now()`
    - **语法：**`ZonedDateTime.now()`
    - **参数：** 无
    - **返回值：** ZonedDateTime 对象

```java
ZonedDateTime zonedDateTime = ZonedDateTime.now();
System.out.println(zonedDateTime); // 2024-05-26T22:51:43.397988700+08:00[GMT+08:00]
```

2. `public static ZonedDateTime now(ZoneId zone)`
    - **语法：**`ZonedDateTime.now(zone)`
    - **参数：**`zone` - 时区
    - **返回值：** ZonedDateTime 对象

```java
ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
System.out.println(zonedDateTime); // 2024-05-26T10:52:06.309157900-04:00[America/New_York]
```

### Instant 常用方法
#### now()
> 返回当前时间点的日期和时间
>

+ **方法签名：**`public static Instant now()`
+ **语法：**`Instant.now()`
+ **参数：** 无
+ **返回值：** Instant 类型，表示当前时间点的日期和时间
+ **注意：** 返回的时间点是 UTC 时间，与本地时间有时差

```java
Instant now = Instant.now();
System.out.println(now); // 2024-05-27T13:05:20.035784600Z
```

#### getEpochSecond()
> 获取当前时间戳，单位为秒
>

+ **方法签名：**`public long getEpochSecond()`
+ **语法：**`instant.getEpochSecond()`
+ **参数：** 无
+ **返回值：** long 类型

```java
Instant instant = Instant.now();
long epochSecond = instant.getEpochSecond();
System.out.println(epochSecond); // 1716817406
```

#### getNano()
> 返回纳秒部分
>

+ **方法签名：**`public int getNano()`
+ **语法：**`instant.getNano()`
+ **参数：** 无
+ **返回值：** int 类型，表示纳秒部分

```java
Instant instant = Instant.now();
int nano = instant.getNano();
System.out.println(nano); // 145307500
```

#### plusNanos()
> 给当前时间增加纳秒数
>

+ **方法签名：**`public Instant plusNanos(long nanosToAdd)`
+ **语法：**`oldInstant.plusNanos(nanosToAdd)`
+ **参数：**`nanosToAdd` - 要增加的纳秒数
+ **返回值：** 返回一个新的 Instant 对象，该对象的时间比当前时间晚 nanosToAdd 纳秒

```java
Instant now = Instant.now();
Instant later = now.plusNanos(1000000000);
System.out.println(now); // 2024-05-27T13:49:23.055811100Z
System.out.println(later); // 2024-05-27T13:49:24.055811100Z
```

#### minusNanos()
> 返回此 Instant 的副本，并减去指定的纳秒数
>

+ **方法签名：**`public Instant minusNanos(long nanosToSubtract)`
+ **语法：**`oldInstant.minusNanos(nanosToSubtract)`
+ **参数：**`nanosToSubtract` - 要减去的纳秒数
+ **返回值：** 返回减去指定纳秒数后的 Instant 实例

```java
Instant instant = Instant.now();
Instant newInstant = instant.minusNanos(1000000000);
System.out.println(instant); // 2024-05-27T13:52:09.544749500Z
System.out.println(newInstant); // 2024-05-27T13:52:08.544749500Z
```

#### equals()、isBefore、isAfter()
```java
Instant instant1 = Instant.now();
Instant instant2 = Instant.now();
// equals() 判断两个 Instant 对象是否相等，返回 Boolean
System.out.println(instant1.equals(instant2)); // true
// isBefore() 判断 instant1 是否在 instant2 之前，返回 Boolean
System.out.println(instant1.isBefore(instant2)); // false
// isAfter() 判断 instant1 是否在 instant2 之后，返回 Boolean
System.out.println(instant1.isAfter(instant2)); // false
```

### DateTimeFormatter 常用方法
#### ofPattern()
> 根据指定的格式化字符串来格式化 LocalDateTime 对象
>

+ **方法签名：**`public static DateTimeFormatter ofPattern(String pattern)`
+ **语法：**`DateTimeFormatter.ofPattern(pattern)`
+ **参数：**`pattern` - 格式化字符串
+ **返回值：** 返回 DateTimeFormatter 对象

```java
LocalDateTime now = LocalDateTime.now();
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formatted = now.format(formatter);
System.out.println(now); // 2024-05-27T22:05:18.688714200
System.out.println(formatted); // 2024-05-27 22:05:18
```

#### format()
> 将日期时间对象转换为字符串
>

+ **方法签名：**`public String format(TemporalAccessor temporal)`
+ **语法：**`DateTimeFormatter.ofPattern(text).format(date)`
+ **参数：**
    - `text` - 日期时间格式字符串
    - `date` - 日期时间对象
+ **返回值：** 格式化后的字符串

```java
LocalDateTime now = LocalDateTime.now();
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formattedNow = formatter.format(now);
System.out.println(now); // 2024-05-27T22:11:35.193231600
System.out.println(formattedNow); // 2024-05-27 22:11:35
```

### Period 常用方法
#### between()
> 计算两个日期之间的间隔天数
>

+ **方法签名：**`public static Period between(LocalDate startInclusive, LocalDate endExclusive)`
+ **语法：**`Period.between(startInclusive, endExclusive)`
+ **参数：**
    - `startInclusive` - 开始日期，LocalDate类型
    - `endExclusive` - 结束日期，LocalDate类型
+ **返回值：** Period类型，表示两个日期之间的间隔天数

```java
LocalDate start = LocalDate.of(2021, 1, 1);
LocalDate end = LocalDate.of(2021, 4, 10);
Period period = Period.between(start, end);
// getYears() - 获取年数，返回int类型
System.out.println(period.getYears()); // 0
// getMonths() - 获取月数，返回int类型
System.out.println(period.getMonths()); // 3
// getDays() - 获取天数，返回int类型
System.out.println(period.getDays()); // 9
```

### Duration 常用方法
#### between()
> 计算两个时间点之间的时间差
>

+ **方法签名：**`public static Duration between(LocalDateTime startInclusive, Temporal endExclusive)`
+ **语法：**`Duration.between(startInclusive, endExclusive)`
+ **参数：**
    - `startInclusive` - 开始时间点
    - `endExclusive` - 结束时间点
+ **返回值：** Duration 对象，表示两个时间点之间的时间差

```java
LocalDateTime start = LocalDateTime.of(2020, 1, 1, 0, 0, 0);
LocalDateTime end = LocalDateTime.of(2021, 2, 10, 0, 0, 0);
Duration duration = Duration.between(start, end);
// toDays() - 获取时间差的天数，返回 long 类型
System.out.println(duration.toDays()); // 406
// toHours() - 获取时间差的小时数，返回 long 类型
System.out.println(duration.toHours()); // 9744
// toMinutes() - 获取时间差的分钟数，返回 long 类型
System.out.println(duration.toMinutes()); // 584640
// toSeconds() - 获取时间差的秒数，返回 long 类型
System.out.println(duration.toSeconds()); // 35078400
// toMillis() - 获取时间差的毫秒数，返回 long 类型
System.out.println(duration.toMillis()); // 35078400000
// toNanos() - 获取时间差的纳秒数，返回 long 类型
System.out.println(duration.toNanos()); // 35078400000000000

// 计算距离高考还有多少时间
String time = "2024-06-07 09:00:00";
LocalDateTime now = LocalDateTime.now();
LocalDateTime exam = LocalDateTime.parse(time, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
Duration duration = Duration.between(now, exam);
System.out.println("距离高考还有" + duration.toDays() + "天" + duration.toHoursPart() + "小时" + duration.toMillisPart() + "分钟" + duration.toSecondsPart() + "秒");
```

## 正则表达式
| 符号 | 含义 | 举例 |
| :---: | :---: | :---: |
| [] | 里面的内容出现一次 | [abc] |
| ^ | 取反 | [^abc] |
| && | 交集，不能写单个的& | [a-z&&m-p] |
| . | 任意字符 | \n回车符号不匹配 |
| \ | 转义字符 | \\d |
| \\d | 0-9 | \\d+ |
| \\D | 非0-9 | \\D+ |
| \\s | 空白字符 |   |
| \\S | 非空白字符 | [^\s] |
| \\w | 单词字符 | [a-zA-Z_0-9] |
| \\W | 非单词字符 | [^\w] |
| () | 分组 | a(bc)+ |
| | | 写在方括号外面表示并集 | ab|AB |


| 符号 | 含义 | 举例 |
| :---: | :---: | :---: |
| ? | 0次或1次 | \\d? |
| * | 0次或多次 | \\d*     (abc)* |
| + | 1次或多次 | \\d+    (abc)+ |
| {} | 具体次数 | `a{7}    \\d{7, 19}` |
| (?i) | 忽略后面字符的大小写 | (?i)abc |
| a((?i)b)c | 只忽略b的大小写 | a((?i)b)c |


### Pattern 常用方法
#### matcher()
> 用来匹配字符串
>

+ **方法签名：**`public Matcher matcher(String regex)`
+ **语法：**`pattern.matcher(regex)`
+ **参数：**`regex` - 正则表达式
+ **返回值：** Matcher 对象

```java
String regex = "hello";
String str = "hello world";
// compile() 方法用于编译正则表达式
Pattern pattern = Pattern.compile(regex);
Matcher matcher = pattern.matcher(str);
// find 方法用于查找字符串中是否有匹配的子串
if (matcher.find()) {
    System.out.println("匹配成功");
}
```

## 异常
### 自定义异常
#### 自定义编译时异常
+ 定义一个异常类继承 `Exception`
+ 重写构造器
+ 通过 `throw new 异常类(xxx)` 来创建异常对象并抛出

```java
public class MyException extends Exception{
    public MyException() {
        super();
    }

    public MyException(String message) {
        super(message);
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        try {
            new Test().test();
        } catch (MyException e) {
            e.printStackTrace();
        }
    }

    public void test() throws MyException {
        throw new MyException("自定义异常");
    }
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1717212133843-b3bc6d2d-37f1-42b1-be7d-93a581063c4e.png)

#### 自定义运行时异常
+ 定义一个异常类继承 `RuntimeException`
+ 重写构造器
+ 通过 `throw new 异常类(xxx)` 来创建异常对象并抛出

```java
public class MyRuntimeException extends RuntimeException{
    public MyRuntimeException() {
        super();
    }

    public MyRuntimeException(String message) {
        super(message);
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        try {
            new Test().test();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void test() {
        throw new MyRuntimeException("自定义异常");
    }
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1717212761271-9b24590f-3658-4d0c-8b3a-a9f00820e185.png)

## File
### File 常用方法
#### exists()
> 判断文件是否存在
>

+ **方法签名：**`public boolean exists()`
+ **语法：**`file.exists()`
+ **参数：** 无
+ **返回值：** boolean 类型，true 表示文件存在，false 表示文件不存在

```java
File file = new File("D:/test.txt");
if (file.exists()) {
    System.out.println("文件存在");
} else {
    System.out.println("文件不存在");
}
```

#### isFile()
> 判断一个文件是否为文件
>

+ **方法签名：**`public boolean isFile()`
+ **语法：**`file.isFile()`
+ **参数：** 无
+ **返回值：** boolean 类型，true 表示当前 File 对象是一个文件，false 表示不是文件

```java
File file = new File("D:/demo/web-project/java-demo/src/com/itheima/demo1/Demo1.java");
if (file.isFile()) {
    System.out.println("是文件");
} else {
    System.out.println("不是文件");
}
```

#### isDirectory()
> 判断一个文件是否是目录
>

+ **方法签名：**`public boolean isDirectory()`
+ **语法：**`file.isDirectory()`
+ **参数：** 无
+ **返回值：** boolean 类型，true 表示是目录，false 表示不是目录

```java
File file = new File(".");
if (file.isDirectory()) {
    System.out.println(file.getName() + " 是目录"); // . 是目录
} else {
    System.out.println(file.getName() + " 不是目录");
}
```

#### getName()
> 获取文件名
>

+ **方法签名：**`public String getName()`
+ **语法：**`file.getName()`
+ **参数：** 无
+ **返回值：** String 类型，文件名

```java
File file = new File("D:/java-demo/src/com/itheima/demo1/Demo1.java");
String name = file.getName();
System.out.println(name); // Demo1.java
```

#### length()
> 获取文件大小，单位为字节
>

+ **方法签名：**`public long length()`
+ **语法：**`file.length()`
+ **参数：** 无
+ **返回值：** long 类型，文件大小，单位为字节

```java
File file = new File("D:\\a.txt");
long size = file.length();
System.out.println("文件大小：" + size + "字节"); // 文件大小：0字节
```

#### lastModified()
> 获取文件最后修改时间
>

+ **方法签名：**`public long lastModified()`
+ **语法：**`file.lastModified()`
+ **参数：** 无
+ **返回值：** long 类型，表示文件最后修改时间，单位为毫秒

```java
File file = new File("D:\\test\\a.txt");
long lastModified = file.lastModified();
System.out.println(lastModified); // 0
```

#### getPath()
> 获取文件的路径
>

+ **方法签名：**`public String getPath()`
+ **语法：**`file.getPath()`
+ **参数：** 无
+ **返回值：** String 类型，表示文件的路径

```java
File file = new File("java-demo/src/com/itheima/demo1/Demo1.java");
String path = file.getPath();
System.out.println(path); // 输出：java-demo/src/com/itheima/demo1/Demo1.java
```

#### getAbsolutePath()
> 获取文件的绝对路径
>

+ **方法签名：**`public String getAbsolutePath()`
+ **语法：**`file.getAbsolutePath()`
+ **参数：** 无
+ **返回值：** String 类型，表示文件的绝对路径

```java
File file = new File("java-demo/src/com/itheima/demo1/Demo1.java");
String absolutePath = file.getAbsolutePath();
System.out.println(absolutePath); // 输出：D:\demo\web-project\java-demo\src\com\itheima\demo1\Demo1.java
```

#### createNewFile()
> 创建文件，如果文件不存在，则创建文件，如果文件存在，则不创建文件，并返回 false
>

+ **方法签名：**`public boolean createNewFile() throws IOException`
+ **语法：**`file.createNewFile()`
+ **参数：** 无
+ **返回值：** true 表示创建成功，false 表示文件已存在

```java
File file = new File("test.txt");
try {
    if (file.createNewFile()) {
        System.out.println("创建成功");
    } else {
        System.out.println("文件已存在");
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

#### mkdir()
> 创建文件夹
>

+ **方法签名：**`public boolean mkdir()`
+ **语法：**`file.mkdir()`
+ **参数：** 无
+ **返回值：** true 表示创建成功，false 表示创建失败

```java
File file = new File("test");
if (file.mkdir()) {
    System.out.println("创建成功");
} else {
    System.out.println("创建失败");
}
```

#### mkdirs()
> 创建文件夹，如果父文件夹不存在，则创建父文件夹
>

+ **方法签名：**`public boolean mkdirs()`
+ **语法：**`file.mkdirs()`
+ **参数：** 无
+ **返回值：** true 表示创建成功，false 表示创建失败

```java
File file = new File("D:/java-demo/src/com/itheima/demo1/test");
if (file.mkdirs()) {
    System.out.println("创建成功");
} else {
    System.out.println("创建失败");
}
```

#### delete()
> 删除文件或目录
>

+ **方法签名：**`public boolean delete()`
+ **语法：**`file.delete()`
+ **参数：** 无
+ **返回值：** true 表示删除成功，false 表示删除失败

```java
File file = new File("test.txt");
if (file.exists()) {
    if (file.delete()) {
        System.out.println("删除成功！");
    } else {
        System.out.println("删除失败！");
    }
} else {
    System.out.println("文件不存在！");
}
```

#### list()
> 列出指定目录下的所有文件和目录
>

+ **方法签名：**`public String[] list()`
+ **语法：**`file.list()`
+ **参数：** 无
+ **返回值：** String[]，数组中包含指定目录下的所有文件和目录的名称

```java
File file = new File(".");
String[] list = file.list();
for (String name : list) {
    System.out.println(name);
}
```

#### listFiles()
> 列出指定目录下的所有文件和目录
>

+ **方法签名：**`public File[] listFiles()`
+ **语法：**`list.listFiles()`
+ **参数：** 无
+ **返回值：** File[] 数组，包含指定目录下的所有文件和目录

```java
File file = new File("."); // 当前目录
File[] files = file.listFiles();
for (File f : files) {
    System.out.println(f.getName());
}
```

#### renameTo()
> 重命名文件或目录
>

+ **方法签名：**`public boolean renameTo(File dest)`
+ **语法：**`file.renameTo(dest)`
+ **参数：**`dest` - 新的文件或目录的路径名
+ **返回值：** true - 重命名成功；false - 重命名失败

```java
File file = new File("D:\\test.txt");
File dest = new File("D:\\test1.txt");
boolean result = file.renameTo(dest);
if (result) {
    System.out.println("重命名成功！");
} else {
    System.out.println("重命名失败！");
}
```

## IO 流
> IO 框架：commons-io
>

### IO 流的四大类
+ **字节输入流(InputStream)：**以内存为基准，将磁盘文件/网络中的数据**以字节的形式读入到内存**中去的流
+ **字节输出流(OutputStream)：**以内存为基准，把内存中的数据**以字节写出到磁盘文件或网络介质中**去的流
+ **字符输入流(Reader)：**以内存为基准，将磁盘文件/网络中的数据**以字符的形式读入到内存**中去的流
+ **字节输入流(Writer)：**以内存为基准，把内存中的数据**以字符写出到磁盘文件或网络介质中**去的流

### FileInputStream
> 文件字节输入流
>

```java
try {
    // 创建文件字节输入流
    FileInputStream fis = new FileInputStream("test.txt");
    // 读取文件内容
    byte[] bytes = new byte[1024];
    int len;
    while ((len = fis.read(bytes)) != -1) {
        System.out.println(new String(bytes, 0, len)); // 0 - len 之间的字节
    }
    // 关闭文件字节输入流
    fis.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

### FileOutputStream
> 文件字节输出流
>

```java
try {
    // 创建文件字节输出流
    // FileOutputStream fos = new FileOutputStream("test.txt"); // 覆盖写入
    FileOutputStream fos = new FileOutputStream("test.txt", true); // 追加写入
    // 写入数据
    fos.write(97);
    byte[] bytes = "你好，世界！".getBytes();
    fos.write(bytes);
    // 关闭流
    fos.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

### 文件复制（字节流）
```java
// 使用 try-with-resources 语句，确保在代码块结束后自动关闭资源
try (
    InputStream is = new FileInputStream("test.txt");
    OutputStream os = new FileOutputStream("test copy.txt")
) {
    byte[] bytes = new byte[1024];
    int len;
    while ((len = is.read(bytes)) != -1) {
        os.write(bytes, 0, len);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 使用缓冲流提高 IO 效率
try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream("test.txt"));
     BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("test copy.txt"))) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = bis.read(buffer)) != -1) {
        bos.write(buffer, 0, len);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### FileReader
> 文件字符输入流
>

```java
try (Reader fr = new FileReader("test.txt")) {
    char[] buffer = new char[1024];
    int len;
    while ((len = fr.read(buffer))!= -1) {
        System.out.println(new String(buffer, 0, len));
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### FileWriter
> 文件字符输出流
>

```java
try (Writer fw = new FileWriter("test.txt")) {
    fw.write("hello, world!\r\n");
    char[] chars = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
    fw.write(chars);
} catch (Exception e) {
    e.printStackTrace();
}
```

### 缓冲流
+ **作用：** 提高读取数据的性能

#### BufferedInputStream
> 字节输入缓冲流
>

```java
try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream("test.txt"))) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = bis.read(buffer))!= -1) {
        System.out.println(new String(buffer, 0, len));
    }
} catch (Exception e) {
    e.printStackTrace();
}
```

#### BufferedOutputStream
> 字节输出缓冲流
>

```java
try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("test.txt"))) {
    bos.write("hello world!".getBytes());
} catch (Exception e) {
    e.printStackTrace();
}
```

#### BufferedReader
> 字符输入缓冲流
>

```java
try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
    String line;
    // 读取文件每一行
    while ((line = br.readLine())!= null) {
        System.out.println(line);
    }
} catch (Exception e) {
    e.printStackTrace();
}
```

#### BufferedWriter
> 字符输出缓冲流
>

```java
try (BufferedWriter writer = new BufferedWriter(new FileWriter("test.txt"))) {
    writer.write("Hello, world!");
    // newLine() - 换行
    writer.newLine();
    char[] chars = {'a', 'b', 'c', 'd', 'e'};
    writer.write(chars);
} catch (Exception e) {
    e.printStackTrace();
}
```

### 转换流
> 解决不同编码时，字符流读取文本内容乱码的问题
>

#### InputStreamReader
> 字符输入转换流
>

```java
try (
    Reader isr = new InputStreamReader(new FileInputStream("test.txt"), "GBK");
    BufferedReader br = new BufferedReader(isr)
) {
    char[] chars = new char[1024];
    int len;
    while ((len = br.read(chars)) != -1) {
        System.out.println(new String(chars, 0, len));
    }
} catch (Exception e) {
    e.printStackTrace();
}
```

#### OutputStreamWriter
> 字符输出转换流
>

```java
try (
    Writer osw = new OutputStreamWriter(new FileOutputStream("test.txt"), "GBK");
    BufferedWriter bw = new BufferedWriter(osw)
) {
    bw.write("你好，世界！");
    bw.newLine();
    bw.write("你好，世界！");
} catch (Exception e) {
    e.printStackTrace();
}
```

### 打印流
#### PrintStream
> 字节打印流
>

```java
try (
    // PrintStream ps = new PrintStream("test.txt"); // 覆盖
    PrintStream ps = new PrintStream(new FileOutputStream("test.txt", true)) // 追加
) {
    ps.println("Hello, world!");
    ps.println("你好，世界！");
} catch (Exception e) {
    e.printStackTrace();
}

// 输出语句重定向 - 可以把输出语句的打印位置改到某个文件中去
try {
    System.setOut(new PrintStream("output.txt"));
} catch (FileNotFoundException e) {
    throw new RuntimeException(e);
}
System.out.println("Hello World");
System.out.println("你好，世界");
```

#### PrintWriter
> 字符打印流
>

```java
try (
    // PrintWriter pw = new PrintWriter("test.txt") // 覆盖
    PrintWriter pw = new PrintWriter(new FileWriter("test.txt", true)) // 追加
) {
    pw.println("Hello, world!");
    pw.println("你好，世界！");
} catch (Exception e) {
    e.printStackTrace();
}
```

### 数据流
#### DataOutputStream
> 数据输出流
>

```java
try (DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.txt"))) {
    dos.writeInt(100);
    dos.writeDouble(3.14);
    dos.writeUTF("你好");
} catch (Exception e) {
    e.printStackTrace();
}
```

#### DataInputStream
> 数据输入流
>

```java
try (DataInputStream dis = new DataInputStream(new FileInputStream("data.txt"))) {
    int a = dis.readInt();
    double b = dis.readDouble();
    String c = dis.readUTF();
    System.out.println(a);
    System.out.println(b);
    System.out.println(c);
} catch (Exception e) {
    e.printStackTrace();
}
```

### 序列化流
> 序列化和反序列化
>

#### ObjectOutStream
> 序列化
>

+ **注意：**如果对象要被序列化，必须实现 `Serializable` 接口
+ **说明：**
    - `transient` 关键字修饰的变量不会被序列化，例如：`private transient String password`
    - `serialVersionUID` 是用来标识类的版本的，如果类的版本发生变化，会导致之前序列化后的对象无法反序列化，例如：`private static final long serialVersionUID = 1L`

```java
User user = new User("Tom", 20, "Male");
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("user.txt"))) {
    oos.writeObject(user);
} catch (Exception e) {
    e.printStackTrace();
}
```

#### ObjectInputStream
> 反序列化
>

```java
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("user.txt"))) {
    User user = (User) ois.readObject();
    System.out.println(user);
} catch (Exception e) {
    e.printStackTrace();
}
```

## 多线程
+ **并发：** 多个任务交替执行，互不影响
+ **并行：** 多个任务同时执行，互不干扰

### 创建线程的方式
#### 继承 Thread 类
```java
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("MyThread: " + i);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        Thread t = new MyThread();
        t.start();
        for (int i = 0; i < 10; i++) {
            System.out.println("Main: " + i);
        }
    }
}
```

#### 实现 Runnable 接口
```java
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("MyThread1: " + i);
        }
    }
};
Thread thread = new Thread(runnable);
thread.start();

// Lambda 表达式的用法
new Thread(() -> {
    for (int i = 0; i < 10; i++) {
        System.out.println("MyThread2: " + i);
    }
}).start();

for (int i = 0; i < 10; i++) {
    System.out.println("Main: " + i);
}
```

#### 实现 Callable 接口
```java
public class MyCallable implements Callable<Integer> {
    private final int num;

    public MyCallable(int num) {
        this.num = num;
    }

    @Override
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 0; i <= num; i++) {
            sum += i;
        }
        return sum;
    }
}

public class Test {
    public static void main(String[] args) {
        Callable<Integer> myCallable = new MyCallable(10);
        FutureTask<Integer> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();

        try {
            // futureTask 的 get 方法会阻塞线程直到任务完成，并获取结果
            System.out.println("总和为：" + futureTask.get()); // 总和为：45
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Thread 常用方法
#### run()
> 当调用 start 方法时，run 方法会被执行
>

+ **方法签名：**`public void run()`

```java
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello, world!");
    }
}).start();
```

#### start()
> 启动线程，调用 run 方法
>

+ **方法签名：**`public void start()`
+ **语法：**`threadObject.start()`
+ **参数：** 无
+ **返回值：** 无

```java
new Thread(() -> System.out.println("Hello, world!")).start();
```

#### getName()
> 获取线程的名字
>

+ **方法签名：**`public final String getName()`
+ **语法：**`thread.getName()`
+ **参数：** 无
+ **返回值：** String类型
+ **注意：** 如果线程没有名字，则该方法返回“Thread-n”，其中 n 是线程的编号。

```java
public class MyThread extends Thread {
    public MyThread(String myThread) {
        super(myThread);
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("MyThread: " + i);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        String threadName = Thread.currentThread().getName();
        System.out.println("线程名：" + threadName); // 线程名：main

        MyThread myThread = new MyThread("MyThread");
        System.out.println("子线程名：" + myThread.getName()); // 子线程名：MyThread
    }
}
```

#### setName()
> 设置线程的名字
>

+ **方法签名：**`public final synchronized void setName(String name)`
+ **语法：**`thread.setName(name)`
+ **参数：**`name` - 新的线程名字
+ **返回值：** 无
+ **注意：** 线程的名字在整个程序中应当是唯一的。

```java
Thread myThread = new MyThread();
myThread.setName("MyThread");
System.out.println("线程名: " + myThread.getName()); // 线程名: MyThread
```

#### currentThread()
> 返回当前正在执行的线程对象
>

+ **方法签名：**`public static native Thread currentThread()`
+ **语法：**`Thread.currentThread()`
+ **参数：** 无
+ **返回值：** 当前正在执行的线程对象
+ **注意：** 如果当前线程正在执行，则返回当前线程对象；否则，返回调用该方法的线程对象。

```java
Thread currentThread = Thread.currentThread();
System.out.println("当前线程名: " + currentThread.getName());
```

#### sleep()
> 让当前线程暂停执行指定的时间
>

+ **方法签名：**`public static void sleep(long millis) throws InterruptedException`
+ **语法：**`Thread.sleep(millis)`
+ **参数：**`millis` - 表示要暂停的时间，单位为毫秒
+ **返回值：** 无

```java
try {
    Thread.sleep(1000); // 睡眠 1 秒
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

#### join()
> 让当前线程等待，直到被调用 join() 方法的线程执行完毕后，才继续执行。
>

+ **方法签名：**`public final void join() throws InterruptedException`
+ **语法：**`thread.join()`
+ **参数：** 无
+ **返回值：** 无

```java
Thread t = new Thread(() -> {
    for (int i = 0; i < 10; i++) {
        System.out.println("t: " + i);
    }
});
t.start();
for (int i = 0; i < 10; i++) {
    System.out.println("main: " + i);

    // 当 main 线程执行到 i == 2 时，调用 t 线程的 join 方法 等待 t 线程执行完毕
    if (i == 2) {
        try {
            t.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

### 线程同步
#### 同步代码块
> 同步代码块是一种特殊的语法结构，它允许在同一时间只允许一个线程执行该代码块。
>

+ **使用规范：**
    - 对于实例方法，建议使用 `this` 作为锁对象
    - 对于静态方法，建议使用 **字节码（类名.class）** 对象作为锁对象

```java
// 格式：
// synchronized (同步监视器) {
//     // 需要同步的代码
// }

public void test1() {
    // 同步代码块 
    synchronized (this) {
        System.out.println("test1");
    }
}

public static void test2() {
    // 静态同步代码块
    synchronized (Demo1.class) {
        System.out.println("test2");
    }
}
```

#### 同步方法
> 调用该方法的线程必须等待该方法执行完毕后才能执行下面的代码
>

```java
public synchronized void method() {
    System.out.println("method");
}
```

#### Lock 锁
```java
private final Lock lock = new ReentrantLock(); // 定义一个锁

public void getMoney(int money) {
    // 加锁
    lock.lock();
    try {
        if (money > 1000) {
            System.out.println(Thread.currentThread().getName() + "取钱成功，金额为：" + money);
        } else {
            System.out.println(Thread.currentThread().getName() + "取钱失败，金额不足1000");
        }
    } finally {
        // 解锁
        lock.unlock();
    }
}
```

### 线程池 - ExecutorService
#### ExecutorService 常用方法
##### execute()
##### submit()
##### shutdown()
##### shutdownNow()
#### ThreadPoolExecutor
> 创建线程池，并提交任务，线程池管理线程，并发执行任务。
>

+ **语法：**`new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory, handler)`
+ **参数：**
    - `corePoolSize` - 核心线程数，线程池中始终存活的线程数量
    - `maximumPoolSize` - 最大线程数，线程池中允许的最大线程数量
    - `keepAliveTime` - 线程存活时间，当线程空闲时间超过该值时，线程会被回收
    - `unit` - 时间单位，如：TimeUnit.SECONDS、TimeUnit.MINUTES、TimeUnit.HOURS 等
    - `workQueue` - 任务队列，用于存放等待执行的任务，有以下几种实现：
        * `ArrayBlockingQueue` - 基于数组的有界队列
        * `LinkedBlockingQueue` - 基于链表的无界队列
    - `threadFactory` - 线程工厂，用于创建线程
    - `handler` - 拒绝策略，当线程池饱和时，如何处理新任务，有以下四种策略：
        * `AbortPolicy` - 丢弃任务并抛出RejectedExecutionException异常
        * `CallerRunsPolicy` - 由调用者线程来执行任务
        * `DiscardOldestPolicy` - 丢弃队列中等待最久的任务
        * `DiscardPolicy` - 直接丢弃任务

##### 处理 Runnable 任务
```java
// 创建线程池
// try-with-resources 语法，自动关闭 ExecutorService（线程池）
try (ExecutorService executor = new ThreadPoolExecutor(
        2,
        5,
        10,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(10),
        Executors.defaultThreadFactory(),
        new ThreadPoolExecutor.AbortPolicy()
)) {
    // 创建任务
    Runnable task = () -> {
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + " " + i);
        }
    };
    // 提交任务
    // execute() - 用于提交不需要返回值的任务，所以无法判断任务是否被线程池执行成功
    executor.execute(task);
}
```

##### 处理 Callable 任务
```java
// 创建线程池
Future<Integer> future1;
Future<Integer> future2;
// try-with-resources 语法，自动关闭 ExecutorService（线程池）
try (ExecutorService executor = new ThreadPoolExecutor(
        2,
        5,
        10,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(10),
        Executors.defaultThreadFactory(),
        new ThreadPoolExecutor.AbortPolicy()
)) {
    // 提交任务
    future1 = executor.submit(new MyCallable(100));
    future2 = executor.submit(new MyCallable(200));
}
// 获取结果
try {
    System.out.println("future1 result: " + future1.get());
    System.out.println("future2 result: " + future2.get());
} catch (InterruptedException e) {
    e.printStackTrace();
} catch (ExecutionException e) {
    throw new RuntimeException(e);
}
```

## InetAddress
+ **网络通信三要素：** IP、端口、协议
    - **IP：** IP地址，唯一标识网络上的计算机，如192.168.1.100
    - **端口：** 端口号，用于区分不同的服务，如HTTP的端口号是80
    - **协议：** 协议，规定了数据包如何在网络上传输，如TCP/IP协议

### InetAddress 常用方法
#### getLocalHost()
> 获取本机的IP地址
>

+ **方法签名：**`public static InetAddress getLocalHost() throws UnknownHostException`
+ **语法：**`InetAddress.getLocalHost()`
+ **参数：** 无
+ **返回值：** InetAddress 类型，表示本机的IP地址

```java
try {
    InetAddress address = InetAddress.getLocalHost();
    System.out.println("本机的IP地址：" + address.getHostAddress()); // 本地的IP地址：192.168.1.100
} catch (Exception e) {
    e.printStackTrace();
}
```

#### getByName()
> 根据域名或IP地址获取 InetAddress 对象
>

+ **方法签名：**`public static InetAddress getByName(String host) throws UnknownHostException`
+ **语法：**`InetAddress.getByName(host)`
+ **参数：**`host` - 域名或IP地址
+ **返回值：** InetAddress 对象

```java
try {
    InetAddress address = InetAddress.getByName("www.baidu.com");
    System.out.println(address); // www.baidu.com/180.101.50.188
} catch (Exception e) {
    e.printStackTrace();
}
```

#### getHostName()
> 获取本地计算机的主机名
>

+ **方法签名：**`public String getHostName()`
+ **语法：**`InetAddress.getLocalHost().getHostName()`
+ **参数：** 无
+ **返回值：** String 类型，表示本地计算机的主机名

```java
try {
    String hostname = InetAddress.getLocalHost().getHostName();
    System.out.println("本地计算机的主机名：" + hostname); // 本地计算机的主机名：H-BOSS
} catch (Exception e) {
    e.printStackTrace();
}
```

#### getHostAddress()
> 获取IP地址
>

+ **方法签名：**`public String getHostAddress()`
+ **语法：**`InetAddress.getLocalHost().getHostAddress()`
+ **参数：** 无
+ **返回值：** String类型，表示IP地址

```java
try {
    String ip = InetAddress.getLocalHost().getHostAddress();
    System.out.println("本机IP地址：" + ip); // 本机IP地址：192.168.1.100
} catch (Exception e) {
    e.printStackTrace();
}
```

#### isReachable()
> 判断当前主机是否可以到达指定的 IP 地址
>

+ **方法签名：**`public boolean isReachable(int timeout) throws IOException`
+ **语法：**`instance.isReachable(timeout)`
+ **参数：**`timeout` 表示超时时间，单位为毫秒，如果超时，则返回 `false`
+ **返回值：**`true` 表示可以到达，`false` 表示无法到达

```java
try {
    InetAddress addr = InetAddress.getByName("www.baidu.com");
    if (addr.isReachable(5000)) {
        System.out.println("网络连接正常！"); // 网络连接正常！
    } else {
        System.out.println("网络连接异常！");
    }
} catch (Exception e) {
    e.printStackTrace();
}
```

## UDP 通信
+ **特点：无连接、不可靠通信**

```java
public class UDPServer {
    public static void main(String[] args) {
        System.out.println("服务器启动成功，等待客户端连接...");
        // 创建UDP服务器
        try (DatagramSocket socket = new DatagramSocket(8888)) {
            byte[] buffer = new byte[1024];
            DatagramPacket receivePacket = new DatagramPacket(buffer, buffer.length);

            while (true) {
                // 接收消息
                // 阻塞等待客户端连接
                socket.receive(receivePacket);
                String receivedMessage = new String(receivePacket.getData(), 0, receivePacket.getLength());
                System.out.println("接收到客户端的消息：" + receivedMessage);

                // 发送消息
                String responseMessage = "服务器收到消息：" + receivedMessage;
                byte[] responseData = responseMessage.getBytes();
                DatagramPacket sendPacket = new DatagramPacket(responseData, responseData.length, receivePacket.getAddress(), receivePacket.getPort());
                socket.send(sendPacket);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

```java
public class UDPClient {
    public static void main(String[] args) {
        System.out.println("客户端启动成功，向服务器发送消息...");
        // 创建UDP客户端
        try (DatagramSocket socket = new DatagramSocket()) {
            // 发送消息
            Scanner scanner = new Scanner(System.in);
            while (true) {
                System.out.print("请输入要发送的消息：");
                String message = scanner.nextLine();

                if (message.equals("exit")) {
                    System.out.println("客户端已退出！");
                    break;
                }
                byte[] data = message.getBytes();
                DatagramPacket packet = new DatagramPacket(data, data.length, InetAddress.getLocalHost(), 8888);
                socket.send(packet);

                // 接收消息
                byte[] buffer = new byte[1024];
                DatagramPacket receivePacket = new DatagramPacket(buffer, buffer.length);
                socket.receive(receivePacket);
                String receivedMessage = new String(receivePacket.getData(), 0, receivePacket.getLength());
                System.out.println("接收到服务器的消息：" + receivedMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

## TCP 通信
+ **特点：面向连接、可靠通信**

```java
public class ServerRunnable implements Runnable {
    private Socket socket;

    public ServerRunnable(Socket socket) {
        this.socket = socket;
    }

    public void run() {
        try {
            // 获取输入输出流
            PrintStream out = new PrintStream(socket.getOutputStream());
            // 向客户端发送消息
            out.println("Hello, client!");
            // 关闭输出流
            out.close();
            // 关闭socket
            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

```java
public class TCPServer {
    public static void main(String[] args) {
        ExecutorService pool = new ThreadPoolExecutor(10, 10, 10, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(10));

        // 监听端口
        int port = 8888;
        try {
            // 启动监听
            ServerSocket serverSocket = new ServerSocket(port);
            System.out.println("服务器启动，监听端口：" + port);

            // 循环监听
            while (true) {
                // 等待客户端连接
                Socket socket = serverSocket.accept();
                // 创建线程处理客户端请求
                pool.execute(new ServerRunnable(socket));
                System.out.println("客户端连接成功：" + socket.getInetAddress().getHostAddress());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

```java
public class TCPClient {
    public static void main(String[] args) {
        // 连接服务器
        try {
            // 创建socket
            Socket socket = new Socket("127.0.0.1", 8888);
            // 获取输入输出流
            PrintStream out = new PrintStream(socket.getOutputStream());
            // 向服务器发送消息
            out.println("Hello, server!");
            // 关闭输出流
            out.close();
            // 关闭socket
            socket.close();
            System.out.println("客户端发送消息成功！");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

