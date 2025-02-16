## 反射
> 在运行时，通过反射可以获取到类的信息，并调用类的方法。
>

### 获取 Class 对象
```java
// 1. 类名.class
Class clazz = Student.class;

// 2. 对象.getClass()
Student student = new Student();
Class clazz2 = student.getClass();

// 3. Class.forName()
try {
    Class clazz3 = Class.forName("com.itheima.demo.Student");
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}
```

### 获取构造器对象
#### getConstructors()
> 获取某个类的所有构造方法（只能获取 public 修饰的）
>

+ **方法签名：**`**public Constructor<?>[] getConstructors()**`
+ **语法：**`**clazz.getConstructors()**`
+ **参数：**无
+ **返回值：**`**Constructor<?>[]**` 数组，数组中包含了该类所有非私有构造方法的对象

```java
Class clazz = Student.class;
Constructor[] constructors = clazz.getConstructors();
for (Constructor constructor : constructors) {
    System.out.println(constructor);
}
// 输出：
// public com.itheima.demo.Student()
// public com.itheima.demo.Student(java.lang.String,int,java.lang.String)
```

#### getDeclaredConstructors()
> 获取某个类的所有构造方法
>

+ **方法签名：**`**public Constructor<?>[] getDeclaredConstructors() throws SecurityException**`
+ **语法：**`**clazz.getDeclaredConstructors()**`
+ **参数：**无
+ **返回值：**`**Constructor<?>[]**` 数组，数组中包含了该类所有构造方法的对象

```java
Class clazz = Student.class;
Constructor[] constructors = clazz.getDeclaredConstructors();
for (Constructor constructor : constructors) {
    System.out.println(constructor);
}
// 输出：
// private com.itheima.demo.Student()
// private com.itheima.demo.Student(java.lang.String,int,java.lang.String)
```

#### getConstructor()
> 获取某个类的指定构造器（只能获取 public 修饰的）
>

+ **方法签名：**`**public Constructor<T> getConstructor(Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException**`
+ **语法：**`**clazz.getConstructor(parameterTypes)**`
+ **参数：**`**parameterTypes**` - 指定构造器的参数类型
+ **返回值：**`**Constructor<T>**`** **- 该类的指定构造器对象

```java
try {
    Class<Student> clazz = Student.class;
    Constructor<Student> constructor = clazz.getConstructor(String.class, int.class, String.class);
    Student student = constructor.newInstance("Tom", 18, "Male");
    System.out.println(student); // Student{name='Tom', age=18, gender='Male'}
} catch (Exception e) {
    e.printStackTrace();
}
```

#### getDeclaredConstructor()
> 获取某个类的指定构造器
>

+ **方法签名：**`**public Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException**`
+ **语法：**`**clazz.getDeclaredConstructor(parameterTypes)**`
+ **参数：**`**parameterTypes**` - 指定构造器的参数类型
+ **返回值：**`**Constructor<T>**`** **- 该类的指定构造器对象

```java
try {
    Class<Student> clazz = Student.class;
    Constructor<Student> constructor = clazz.getDeclaredConstructor(String.class, int.class, String.class);
    Student student = constructor.newInstance("Tom", 18, "Male");
    System.out.println(student); // Student{name='Tom', age=18, gender='Male'}
} catch (Exception e) {
    e.printStackTrace();
}
```

### 获取成员变量对象
#### getFields()
> 获取某个类的所有成员变量（只能获取 public 修饰的）
>

+ **方法签名：**`**public Field[] getFields() throws SecurityException**`
+ **语法：**`**clazz.getFields()**`
+ **参数：**无
+ **返回值：**`**Field[]**` 数组，包含了该类所有的成员变量

```java
Class<Student> clazz = Student.class;
Field[] fields = clazz.getFields();
for (Field field : fields) {
    System.out.println(field.getName());
}
// 输出：name
```

#### getDeclaredFields()
> 获取某个类的所有成员变量
>

+ **方法签名：**`**public Field[] getDeclaredFields() throws SecurityException**`
+ **语法：**`**clazz.getDeclaredFields()**`
+ **参数：**无
+ **返回值：**`**Field[]**`，数组中包含了该类所有的成员变量（包括私有变量）

```java
Student student = new Student("Tom", 18);
Class clazz = student.getClass();
Field[] fields = clazz.getDeclaredFields();
for (Field field : fields) {
    System.out.println(field.getName());
}
// 输出：name, age
```

#### getField()
> 获取类的某个成员变量（只能获取 public 修饰的）
>

+ **方法签名：**`**public Field getField(String name) throws NoSuchFieldException, SecurityException**`
+ **语法：**`**clazz.getField(name)**`
+ **参数：**`**name**` - 成员变量的名称
+ **返回值：**`**Field**`** **- 成员变量的 Field 对象

```java
try {
    Class<?> clazz = Class.forName("com.h.demo.Student");
    Field nameField = clazz.getField("name");
    System.out.println(nameField.getName());
} catch (Exception e) {
    e.printStackTrace();
}
```

#### getDeclaredField()
> 获取类的某个成员变量
>

+ **方法签名：**`**public Field getDeclaredField(String name) throws NoSuchFieldException, SecurityException**`
+ **语法：**`**clazz.getDeclaredField(name)**`
+ **参数：**`**name**` - 成员变量的名称
+ **返回值：**`**Field**`** **- 成员变量的 Field 对象

```java
try {
    Class<?> clazz = Class.forName("com.h.demo.Student");
    Field nameField = clazz.getDeclaredField("name");
    Field ageField = clazz.getDeclaredField("age");
    System.out.println(nameField.getName());
    System.out.println(ageField.getName());
} catch (Exception e) {
    e.printStackTrace();
}
```

### 获取方法对象
#### getMethods()
> 获取某个类的所有方法（只能获取 public 修饰的）
>

+ **方法签名：**`**public Method[] getMethods() throws SecurityException**`
+ **语法：**`**clazz.getMethods()**`
+ **参数：**无
+ **返回值：**`**Method[]**` 数组，数组中包含了该类所有 public 方法的 Method 对象

```java
Student student = new Student("Tom", 20);
Class<? extends Student> clazz = student.getClass();
for (Method method : clazz.getMethods()) {
    System.out.println(method.getName());
}
// 输出：
// setAge
// getAge
// getName
// toString
// setName
// equals
// hashCode
// getClass
// notify
// notifyAll
// wait
// wait
// wait
```

#### getDeclaredMethods()
> 获取某个类的所有方法
>

+ **方法签名：**`**public Method[] getDeclaredMethods() throws SecurityException**`
+ **语法：**`**clazz.getDeclaredMethods()**`
+ **参数：**无
+ **返回值：**`**Method[]**`，数组中包含了该类所有的方法对象

```java
Class<Student> clazz = Student.class;
Method[] methods = clazz.getDeclaredMethods();
for (Method method : methods) {
    System.out.println(method.getName());
}
// 输出：
// getAge
// setAge
// getName
// toString
// setName
```

#### getMethod()
> 获取某个类的某个方法（只能获取 public 修饰的）
>

+ **方法签名：**`**public Method getMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException**`
+ **语法：**`**clazz.getMethod(methodName, parameterTypes)**`
+ **参数：**
    - `**methodName**` - 方法名
    - `**parameterTypes**` - 方法参数类型数组
+ **返回值：**Method 对象

```java
Class clazz = Student.class;
try {
    // 获取方法对象
    Method method = clazz.getMethod("getName");
    // 调用方法
    // invoke() - 调用对象方法，并返回方法的返回值
    Object result = method.invoke(new Student("Tom", 20));
    System.out.println(result);
} catch (Exception e) {
    e.printStackTrace();
}
```

#### getDeclaredMethod()
> 获取某个类的某个方法
>

+ **方法签名：**`**public Method getDeclaredMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException, SecurityException**`
+ **语法：**`**clazz.getDeclaredMethod(methodName, parameterTypes)**`
+ **参数：**
    - `**methodName**` - 方法名
    - `**parameterTypes**` - 方法参数类型数组
+ **返回值：**Method 对象

```java
try {
    Class<?> clazz = Class.forName("com.h.demo.Student");
    Method method = clazz.getDeclaredMethod("getName");
    // newInstance() - 创建类的实例
    Object obj = clazz.newInstance();
    // 调用方法
    String name = (String) method.invoke(obj);
    System.out.println(name); // null
} catch (Exception e) {
    e.printStackTrace();
}
```

## 注解
> 就是在代码中添加一些元数据，这些元数据可以被编译器或者运行时环境所使用
>

```java
// 自定义注解格式：
// @interface 注解名 {
//     属性类型 属性名();
//     属性类型 属性名() default 值;
// }

// 示例：
public @interface MyAnnotation {
    String name();
    int age();
}
```

### 元注解
> 用于描述注解的注解
>

+ `**@Target(ElementType.TYPE)**` - 注解的作用范围
    - `**TYPE**`- 表示注解可以作用于类、接口、枚举等类型
    - `**METHOD**` - 表示注解可以作用于方法
    - `**FIELD**` - 表示注解可以作用于成员变量
    - `**CONSTRUCTOR**` - 表示注解可以作用于构造器
    - `**PARAMETER**` - 表示注解可以作用于方法参数
    - `**LOCAL_VARIABLE**` - 表示注解可以作用于局部变量
+ `**@Retention(RetentionPolicy.RUNTIME)**` - 注解的生命周期
    - `**SOURCE**` - 表示在源代码中有效
    - `**CLASS**` - 表示在编译后有效
    - `**RUNTIME**` - 表示在运行时有效

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
    String name();
    int age();
}
```

### 注解的解析
> 就是判断类上、方法上、成员变量上是否存在注解，如果存在，则解析注解，并执行相应的逻辑。
>

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyTest {
    String value();
    double aaa() default 100;
    String[] bbb();
}
```

```java
@MyTest(value = "TEST", aaa = 9.9, bbb = {"A", "B", "C"})
public class Demo {
    @MyTest(value = "test", bbb = {"a", "b", "c"})
    public void test() {
    }
}
```

```java
public class AnnotationDemo3 {
    public static void main(String[] args) {
        // 1. 获取Demo类的MyTest注解
        Class c = Demo.class;
        // 判断Demo类是否有MyTest注解
        if (c.isAnnotationPresent(MyTest.class)) {
            MyTest myTest = (MyTest) c.getDeclaredAnnotation(MyTest.class);
            System.out.println(myTest.value()); // TEST
            System.out.println(myTest.aaa()); // 9.9
            System.out.println(Arrays.toString(myTest.bbb())); // [A, B, C]
        }

        // 2. 获取Demo类的test方法的MyTest注解
        try {
            Method m = c.getDeclaredMethod("test");
            // 判断test方法是否有MyTest注解
            if (m.isAnnotationPresent(MyTest.class)) {
                MyTest myTest = (MyTest) m.getDeclaredAnnotation(MyTest.class);
                System.out.println(myTest.value()); // test
                System.out.println(myTest.aaa()); // 100.0
                System.out.println(Arrays.toString(myTest.bbb())); // [a, b, c]
            }
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }
}
```

## 代理
```java
public interface StarService {
    String sing(String name);
    void dance();
}
```

```java
public class Star implements StarService {
    private final String name;

    public Star(String name) {
        this.name = name;
    }

    @Override
    public String sing(String name) {
        System.out.println(this.name + "正在唱" + name);
        return "啦啦啦啦啦啦";
    }

    @Override
    public void dance() {
        System.out.println(name + "正在跳舞...");
    }
}
```

```java
public class ProxyUtil {
    public static StarService getProxy(final StarService star) {
        return (StarService) Proxy.newProxyInstance(star.getClass().getClassLoader(), star.getClass().getInterfaces(), (proxy, method, args) -> {
            if (method.getName().equals("sing")) {
                System.out.println("准备唱歌...");
            } else if (method.getName().equals("dance")) {
                System.out.println("准备跳舞...");
            }
            return method.invoke(star, args);
        });
    }
}
```

```java
public class Test {
    public static void main(String[] args) {
        Star star = new Star("杨超越");
        StarService proxy = ProxyUtil.getProxy(star);
        System.out.println(proxy.sing("偏爱"));
        proxy.dance();
    }
}
```

