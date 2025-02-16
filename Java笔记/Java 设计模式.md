## 单例设计模式
> 确保一个类只有一个实例，并提供一个全局访问点
>

**步骤：**

1. 构造方法私有化
2. 提供一个静态方法，返回实例
3. 多线程下，可能会创建多个实例，需要加锁

### 饿汉式
```java
public class Singleton {
    private static final Singleton instance = new Singleton();

    private Singleton() {
    }

    public static Singleton getInstance() {
        return instance;
    }
}
```

_**测试**_

```java
public class Test {
    public static void main(String[] args) {
        Singleton instance1 = Singleton.getInstance();
        Singleton instance2 = Singleton.getInstance();
        System.out.println(instance1 == instance2); // true
    }
}
```

### 懒汉式
```java
public class Singleton {
    private static Singleton instance;

    private Singleton() {
    }

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

_**测试**_

```java
public class Test {
    public static void main(String[] args) {
        Singleton instance1 = Singleton.getInstance();
        Singleton instance2 = Singleton.getInstance();
        System.out.println(instance1 == instance2); // true
    }
}
```

## 模板方法设计模式
> 定义一个操作中的算法的骨架，而将一些步骤延迟到子类中，以解决方法中重复代码问题
>

**步骤：**

1. 定义一个抽象类，将具体方法和抽象方法定义在抽象类中
2. 定义一个具体的子类，实现抽象方法
3. 在子类中调用抽象类中的具体方法

```java
public abstract class Animal {

    public final void ability(String name) {
        System.out.println(name + "的能力：");
        displayAbilities();
    }

    public abstract void displayAbilities();
}
```

```java
public class Dog extends Animal {
    @Override
    public void displayAbilities() {
        System.out.println("跑得快");
        System.out.println("会看家");
    }
}
```

```java
public class Cat extends Animal{
    @Override
    public void displayAbilities() {
        System.out.println("会抓老鼠");
        System.out.println("会爬树");
    }
}
```

_**测试**_

```java
public class Test {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.ability("狗");
        System.out.println("------------");
        Cat cat = new Cat();
        cat.ability("猫");
    }
}
```

