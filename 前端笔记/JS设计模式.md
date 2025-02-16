## 构造者模式
> 构造器模式是一种对象创建模式，它通过构造函数创建对象并初始化其属性和方法。构造器模式允许我们创建具有相同属性和方法的多个对象。
>

```javascript
// 定义一个构造函数
function Person(name, age, gender) {
  this.name = name
  this.age = age
  
  this.introduce = function() {
    console.log(this.name + '-' + this.age);
  }
}

// 创建对象实例
var person1 = new Person("John", 25)
var person2 = new Person("Jane", 30)

// 调用对象方法
person1.introduce() // John-25
person2.introduce() // Jane-30
```

## 原型模式
> 原型模式是一种对象创建模式，它利用原型链来共享方法和属性。在原型模式中，每个对象实例都有一个指向其原型对象的链接，该原型对象包含了共享的属性和方法。
>

### 使用构造函数
```javascript
// 定义一个构造函数
function Person(name, age, gender) {
  this.name = name
  this.age = age
}

// 在构造函数的原型上定义方法
Person.prototype.introduce = function() {
  console.log(this.name + '-' + this.age);
}

// 创建对象实例
var person1 = new Person('John', 25)
var person2 = new Person('Jane', 30)

// 调用对象方法
person1.introduce() // John-25
person2.introduce() // Jane-30
```

### 使用 Class
```javascript
class Person {
  constructor(name, age, gender) {
    this.name = name
    this.age = age
  }
  
  introduce = function() {
    console.log(this.name + '-' + this.age);
  }
}

// 创建对象实例
var person1 = new Person('John', 25)
var person2 = new Person('Jane', 30)

// 调用对象方法
person1.introduce() // John-25
person2.introduce() // Jane-30
```

## 工厂模式
> 工厂模式是一种对象创建模式，它通过工厂函数来创建对象实例。工厂模式允许我们抽象出对象的创建过程，使代码更具灵活性和可维护性。
>

```javascript
// 定义一个工厂函数
function createPerson(name, age, gender) {
  return {
    name: name,
    age: age,
    
    introduce: function() {
	    console.log(this.name + '-' + this.age);
    }
  }
}

// 使用工厂函数创建对象实例
var person1 = createPerson('John', 25)
var person2 = createPerson('Jane', 30)

// 调用对象方法
person1.introduce() // John-25
person2.introduce() // Jane-30
```

## 抽象工厂模式
> 抽象工厂模式是一种创建对象的设计模式，它提供了一种将相关的工厂组织在一起的方式，使得我们可以动态地创建一系列相关的对象。
>

> 抽象工厂模式通过使用接口或抽象类作为基类，并定义一组工厂方法来创建不同类型的对象。这些工厂方法可以根据条件或参数来选择创建的具体对象类型。
>

```javascript
// 定义抽象工厂
class AbstractFactory {
  createObject() {
    throw new Error("This is an abstract method.")
  }
}

// 定义具体工厂 A
class ConcreteFactoryA extends AbstractFactory {
  createObject() {
    return new ObjectA()
  }
}

// 定义具体工厂 B
class ConcreteFactoryB extends AbstractFactory {
  createObject() {
    return new ObjectB()
  }
}

// 定义抽象产品
class AbstractProduct {
  use() {
    throw new Error("This is an abstract method.")
  }
}

// 定义具体产品 A
class ObjectA extends AbstractProduct {
  use() {
    console.log("Using Object A.")
  }
}

// 定义具体产品 B
class ObjectB extends AbstractProduct {
  use() {
    console.log("Using Object B.")
  }
}

// 使用抽象工厂创建对象
const factoryA = new ConcreteFactoryA()
const productA = factoryA.createObject()
productA.use() // Using Object A.

const factoryB = new ConcreteFactoryB()
const productB = factoryB.createObject()
productB.use() // Using Object B.
```

## 建造者模式
> 建造者模式是一种用于创建复杂对象的创建型设计模式。它允许您逐步构建复杂对象，同时将其构建过程与表示分离，从而使您能够灵活地构建不同类型和配置的对象。
>

> 建造者模式通常由一个指导者（Director）和一个构建器（Builder）组成。指导者负责定义对象的构建步骤和顺序，而构建器负责执行每个构建步骤的具体操作。
>

```javascript
// 定义产品类
class Product {
  constructor() {
    this.part1 = ""
    this.part2 = ""
  }

  setPart1(part1) {
    this.part1 = part1
  }

  setPart2(part2) {
    this.part2 = part2
  }

  show() {
    console.log("Product Parts: ", this.part1, this.part2)
  }
}

// 定义建造者类
class Builder {
  constructor() {
    this.product = new Product()
  }

  buildPart1(part1) {
    this.product.setPart1(part1)
  }

  buildPart2(part2) {
    this.product.setPart2(part2)
  }

  getResult() {
    return this.product
  }
}

// 定义指导者类
class Director {
  constructor(builder) {
    this.builder = builder
  }

  construct() {
    this.builder.buildPart1("Part 1")
    this.builder.buildPart2("Part 2")
    return this.builder.getResult()
  }
}

// 使用建造者模式创建对象
const builder = new Builder()
const director = new Director(builder)
const product = director.construct()
product.show(); // Product Parts: Part 1 Part 2
```

## 单例模式
> 单例模式是一种创建型设计模式，用于限制类的实例化为唯一的一个对象。它确保一个类只有一个实例，并提供了全局访问该实例的方式。
>

### 使用对象字面量
> 通过直接创建一个全局对象，我们可以确保只有一个实例。其他地方可以通过访问`singleton`来使用它的属性和方法。
>

```javascript
const singleton = {
  attribute: 'value',
  method() {
    console.log('method called')
  }
}
```

### 使用闭包
> 这种方式利用了闭包和立即执行函数，将实例化的逻辑封装在闭包中，并通过`getInstance`方法返回单例实例。
>

```javascript
const Singleton = (function() {
  let instance

  function init() {
    // 私有成员和方法
    return {
      attribute: 'value',
      method() {
        console.log('method called')
      }
    }
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init()
      }
      return instance
    }
  }
})()
```

## 装饰器模式
> 装饰器模式是一种结构型设计模式，它允许动态地给一个对象添加新的行为或修改现有行为，而无需修改其原始类。
>

> 装饰器模式通过将对象包装在装饰器类中，以在运行时动态地添加新的功能。装饰器类实现与原始类相同的接口，并在需要扩展功能时调用原始类的方法。这样，原始对象可以被多个装饰器类进行包装，每个装饰器类都可以添加自己独特的行为。
>

```javascript
// 定义原始类
class Component {
  operation() {
    console.log("Component is doing operation.");
  }
}

// 定义装饰器类
class Decorator {
  constructor(component) {
    this.component = component;
  }

  operation() {
    this.component.operation();
    this.extraOperation();
  }

  extraOperation() {
    console.log("Decorator is adding extra operation.");
  }
}

// 创建原始对象
const component = new Component();

// 创建装饰器对象并应用于原始对象
const decoratedComponent = new Decorator(component);

// 调用装饰后的操作
decoratedComponent.operation();
```

## 适配器模式
> 适配器模式是一种结构型设计模式，用于将一个接口转换成另一个接口，以满足不同对象之间的兼容性需求。
>

### 类适配器
> 在类适配器中，适配器类继承了要转换的类，并实现了目标接口。适配器类将调用原始类的方法来实现接口的需求。
>

```javascript
// 原始类
class Adaptee {
  specificRequest() {
    console.log("Adaptee specific request");
  }
}

// 目标接口
class Target {
  request() {
    console.log("Target request");
  }
}

// 适配器类
class Adapter extends Adaptee {
  request() {
    this.specificRequest();
  }
}

// 实例化适配器对象，并调用目标接口方法
const adapter = new Adapter();
adapter.request();
```

### 对象适配器
> 在对象适配器中，适配器类将目标接口的实现委托给一个已有的对象，而不是继承它。适配器类包含了要转换的对象，并实现了目标接口。
>

```javascript
// 原始类
class Adaptee {
  specificRequest() {
    console.log("Adaptee specific request");
  }
}

// 目标接口
class Target {
  request() {
    console.log("Target request");
  }
}

// 适配器类
class Adapter {
  constructor(adaptee) {
    this.adaptee = adaptee;
  }

  request() {
    this.adaptee.specificRequest();
  }
}

// 实例化适配器对象，并调用目标接口方法
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
adapter.request();
```

## 策略模式
> 策略模式是一种行为型设计模式，它允许在运行时选择算法的行为。
>

> 策略模式通过将不同的算法封装在各自的策略类中，使得这些算法可以互相替换。它将算法的选择和使用与算法本身的实现分离开来，提高了代码的灵活性和可维护性。
>

```javascript
// 策略类
class Strategy {
  doOperation() {
    throw new Error("Strategy doOperation method should be implemented.");
  }
}

// 具体策略类
class ConcreteStrategyA extends Strategy {
  doOperation() {
    console.log("ConcreteStrategyA doOperation");
  }
}

class ConcreteStrategyB extends Strategy {
  doOperation() {
    console.log("ConcreteStrategyB doOperation");
  }
}

// 上下文类
class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    this.strategy.doOperation();
  }
}

// 使用示例
const contextA = new Context(new ConcreteStrategyA());
contextA.executeStrategy();

const contextB = new Context(new ConcreteStrategyB());
contextB.executeStrategy();
```

## 代理模式
> 代理模式是一种结构型设计模式，它允许通过代理对象控制对真实对象的访问。
>

> 代理模式通过引入代理对象，将客户端和真实对象解耦，从而可以在访问真实对象之前或之后进行一些额外的操作，例如权限控制、缓存、延迟加载等。
>

### 虚拟代理
> 虚拟代理在访问真实对象之前进行一些预处理，可以用于延迟加载大型资源或优化性能。
>

```javascript
class Image {
  constructor(url) {
    this.url = url;
    this.loaded = false;
    console.log("Image created.");
  }

  load() {
    console.log("Image loading: " + this.url);
    this.loaded = true;
  }

  display() {
    if (!this.loaded) {
      this.load();
    }
    console.log("Image displaying: " + this.url);
  }
}

class ProxyImage {
  constructor(url) {
    this.url = url;
    this.image = null;
  }

  display() {
    if (!this.image) {
      this.image = new Image(this.url);
    }
    this.image.display();
  }
}

const proxyImage = new ProxyImage("example.jpg");
proxyImage.display(); // 只有在第一次调用display时，真实的Image对象才会被创建和加载
proxyImage.display(); // 后续的调用直接显示已加载的Image对象
```

### 保护代理
> 保护代理用于控制对真实对象的访问，可用于权限校验。
>

```javascript
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrew ${amount} dollars. Balance: ${this.balance}`);
    } else {
      console.log("Insufficient balance.");
    }
  }
}

class BankAccountProxy {
  constructor(balance, accessCode) {
    this.bankAccount = new BankAccount(balance);
    this.accessCode = accessCode;
  }

  withdraw(amount, accessCode) {
    if (accessCode === this.accessCode) {
      this.bankAccount.withdraw(amount);
    } else {
      console.log("Invalid access code.");
    }
  }
}

const proxyAccount = new BankAccountProxy(1000, "1234");
proxyAccount.withdraw(500, "1234"); // 有效的访问
proxyAccount.withdraw(800, "4321"); // 无效的访问
```

## 观察者模式
> 观察者模式（Observer Pattern）是一种设计模式，用于实现对象之间的一对多关系，以便当一个对象的状态发生变化时，所有依赖于它的对象都能够被通知并自动更新。
>

> 观察者模式由两个主要的角色组成：观察者和目标（也称为主题或可观察对象）。
>

> 观察者（Observer）是具有订阅/取消订阅功能的对象。它们将自己注册到目标对象上，并在目标对象的状态发生改变时接收相应的通知。
>

> 目标（Subject）是一个可被观察的对象。它维护一个观察者列表，并提供订阅和取消订阅的方法。当其状态发生变化时，会遍历观察者列表，并调用观察者的更新方法。
>

```javascript
// 观察者对象
class Observer {
  update(data) {
    console.log('Received data:', data);
  }
}

// 目标对象
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

// 创建观察者和目标对象
const observer1 = new Observer();
const observer2 = new Observer();
const subject = new Subject();

// 订阅观察者
subject.subscribe(observer1);
subject.subscribe(observer2);

// 发送通知
subject.notify('Hello, observers!');

// 输出:
// Received data: Hello, observers!
// Received data: Hello, observers!
```

## 发布订阅模式
> 发布订阅模式（Publish-Subscribe Pattern）是一种常见的设计模式，它用于在程序中实现组件之间的解耦和通信。在JavaScript中，可以使用发布订阅模式来实现事件驱动的编程。
>

> 在发布订阅模式中，通常有两个角色：发布者（Publisher）和订阅者（Subscriber）。发布者负责发布事件或消息，而订阅者则注册自己感兴趣的事件，并在事件发生时被通知。
>

```javascript
// 发布者
const publisher = {
  subscribers: [],
  subscribe(callback) {
    this.subscribers.push(callback);
  },
  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
  },
  publish(data) {
    this.subscribers.forEach(callback => callback(data));
  }
};

// 订阅者
const subscriber1 = data => {
  console.log('Subscriber 1:', data);
};

const subscriber2 = data => {
  console.log('Subscriber 2:', data);
};

// 订阅事件
publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

// 发布事件
publisher.publish('Hello, world!');

// 取消订阅
publisher.unsubscribe(subscriber2);

// 再次发布事件
publisher.publish('Goodbye, world!');
```

## 模块模式
> 模块模式是一种在JavaScript中组织和封装代码的常用模式。它通过使用闭包和私有变量来创建私有作用域，从而实现信息隐藏和代码封装。
>

```javascript
var myModule = (function() {
  // 私有变量
  var privateVariable = "私有变量";

  // 私有函数
  function privateFunction() {
    console.log("私有函数被调用");
  }

  // 公共接口
  return {
    // 公共变量
    publicVariable: "公共变量",

    // 公共方法
    publicFunction: function() {
      console.log("公共方法被调用");
      // 在公共方法中可以访问私有变量和函数
      console.log(privateVariable);
      privateFunction();
    }
  };
})();

// 使用模块
console.log(myModule.publicVariable);
myModule.publicFunction();
```

## 桥接模式
> 桥接模式（Bridge Pattern）是一种软件设计模式，该模式通过将抽象和实现分离，允许它们独立地进行扩展、修改和重用。
>

> 桥接模式的核心思想是将一个大类（抽象部分）与该类的实现细节（实现部分）分离开来。它使用了组合关系，将抽象部分和实现部分分别定义为两个独立的类层次结构。抽象部分包含一个对实现部分的引用，从而将两者连接起来。这样，抽象部分和实现部分可以独立地进行变化和扩展。
>

```javascript
// 实现部分
class Implementor {
  operation() {
    throw new Error('This method must be overwritten!');
  }
}

class ConcreteImplementorA extends Implementor {
  operation() {
    return 'ConcreteImplementorA';
  }
}

class ConcreteImplementorB extends Implementor {
  operation() {
    return 'ConcreteImplementorB';
  }
}

// 抽象部分
class Abstraction {
  constructor(implementor) {
    this.implementor = implementor;
  }

  operation() {
    return `Abstraction: ${this.implementor.operation()}`;
  }
}

// 使用示例
const implementorA = new ConcreteImplementorA();
const abstractionA = new Abstraction(implementorA);
console.log(abstractionA.operation()); // 输出: "Abstraction: ConcreteImplementorA"

const implementorB = new ConcreteImplementorB();
const abstractionB = new Abstraction(implementorB);
console.log(abstractionB.operation()); // 输出: "Abstraction: ConcreteImplementorB"
```

## 组合模式
> 组合模式是一种设计模式，用于将对象组合成树形结构以表示“部分-整体”的层次关系。它允许我们以一种灵活的方式构造对象，从而使对象可以通过组合形成更复杂的结构。
>

> 在组合模式中，有两种基本的对象类型：叶节点和组合节点。叶节点表示树中的最小单位，它们不再包含其他对象。组合节点则表示树中的分支节点，它们可以包含其他叶节点或组合节点。
>

```javascript
// 基本对象类型：叶节点
class Leaf {
  constructor(name) {
    this.name = name;
  }

  // 叶节点的操作
  operation() {
    console.log(`执行叶节点操作: ${this.name}`);
  }
}

// 组合对象类型：组合节点
class Composite {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  // 组合节点的操作
  operation() {
    console.log(`执行组合节点操作: ${this.name}`);
    this.children.forEach(child => {
      child.operation(); // 递归执行子节点的操作
    });
  }

  // 添加子节点
  add(child) {
    this.children.push(child);
  }

  // 删除子节点
  remove(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
}

// 使用组合模式构造对象树
const root = new Composite("根节点");
const branch1 = new Composite("分支节点1");
const branch2 = new Composite("分支节点2");
const leaf1 = new Leaf("叶节点1");
const leaf2 = new Leaf("叶节点2");
const leaf3 = new Leaf("叶节点3");

branch1.add(leaf1);
branch2.add(leaf2);
root.add(branch1);
root.add(branch2);
root.add(leaf3);

// 执行操作
root.operation();
```

## 命令模式
> 命令模式是一种行为设计模式，它将方法的调用、请求或操作封装在一个单一对象中，并将其作为参数传递给其他对象。这种模式允许我们将方法调用的发送者和接收者解耦，从而更灵活地控制方法的调用和执行。
>

```javascript
// 定义接收者对象
const receiver = {
  execute: function() {
    console.log("接收者执行操作");
  }
};

// 定义命令对象
const command = {
  execute: function() {
    receiver.execute();
  }
};

// 定义发送者对象
const invoker = {
  command: null,
  setCommand: function(command) {
    this.command = command;
  },
  executeCommand: function() {
    this.command.execute();
  }
};

// 使用命令模式
invoker.setCommand(command);
invoker.executeCommand(); // 输出：接收者执行操作
```

## 模板方法模式
> 模板方法模式（Template Method Pattern）是一种行为设计模式，它定义了一个算法的框架并允许子类为特定步骤提供实现。这种模式通过将算法的通用部分放在父类中，并将特定的实现留给子类来完成，以实现代码的重用和灵活性。
>

> 在模板方法模式中，父类通常包含一个模板方法，该方法定义了算法的框架，它由一个或多个具体的步骤组成。这些步骤可以是具体方法，也可以是抽象方法，由子类来实现。
>

```javascript
class AbstractClass {
  templateMethod() {
    this.stepOne();
    this.stepTwo();
    this.stepThree();
  }

  stepOne() {
    console.log('AbstractClass: stepOne');
  }

  stepTwo() {
    console.log('AbstractClass: stepTwo');
  }

  stepThree() {
    console.log('AbstractClass: stepThree');
  }
}

class ConcreteClass extends AbstractClass {
  stepTwo() {
    console.log('ConcreteClass: stepTwo');
  }
}

// 使用示例
const myObject = new ConcreteClass();
myObject.templateMethod();
```

## 迭代器模式
> 迭代器模式是一种设计模式，它用于提供一种逐个访问聚合对象（如数组或列表）元素的方法，而不需要暴露聚合对象的内部结构。在 JavaScript 中，迭代器模式可以以不同的方式实现。
>

### 手动实现迭代器
```javascript
const customIterator = (array) => {
  let index = 0;
  return {
    next: () => {
      if (index < array.length) {
        return { value: array[index++], done: false };
      } else {
        return { done: true };
      }
    }
  };
};

const arr = [1, 2, 3];
const iterator = customIterator(arr);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }
```

### 使用 Generator 实现迭代器
> Generator 是一种特殊的函数，可以通过使用`yield`关键字来定义迭代过程。当调用 Generator 函数时，它返回一个迭代器对象，可以通过调用`next`方法来逐步执行生成器函数的代码。
>

```javascript
function* generatorIterator(array) {
  yield* array;
}

const arr = [1, 2, 3];
const iterator = generatorIterator(arr);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }
```

## 职责链模式
> 职责链模式（Chain of Responsibility Pattern）是一种行为设计模式，它可以将请求发送者和接收者解耦，使多个对象都有机会处理请求。
>

> 在职责链模式中，通常会创建一个处理请求的抽象基类，并定义一个处理请求的方法。然后，可以创建多个具体的处理者类，它们继承自抽象基类，实现自己的处理逻辑。
>

> 处理者类之间通过一个指向下一个处理者的引用来形成一个链。当请求传递给链中的第一个处理者时，它会沿着链依次经过每个处理者，直到遇到一个能够处理该请求的处理者为止，或者链结束。
>

```javascript
// 抽象处理者类
class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNextHandler(handler) {
    this.nextHandler = handler;
  }

  handleRequest(request) {
    // 处理请求的逻辑
    // 如果能处理该请求，就处理；否则将请求传递给下一个处理者
    if (this.canHandle(request)) {
      this.processRequest(request);
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    } else {
      console.log("无法处理该请求。");
    }
  }

  canHandle(request) {
    throw new Error("子类必须实现canHandle方法。");
  }

  processRequest(request) {
    throw new Error("子类必须实现processRequest方法。");
  }
}

// 具体处理者类A
class ConcreteHandlerA extends Handler {
  canHandle(request) {
    return request === 'A';
  }

  processRequest(request) {
    console.log("具体处理者A处理请求：" + request);
  }
}

// 具体处理者类B
class ConcreteHandlerB extends Handler {
  canHandle(request) {
    return request === 'B';
  }

  processRequest(request) {
    console.log("具体处理者B处理请求：" + request);
  }
}

// 使用示例
const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();

handlerA.setNextHandler(handlerB);

handlerA.handleRequest('A'); // 输出：具体处理者A处理请求：A
handlerA.handleRequest('B'); // 输出：具体处理者B处理请求：B
handlerA.handleRequest('C'); // 输出：无法处理该请求。
```

