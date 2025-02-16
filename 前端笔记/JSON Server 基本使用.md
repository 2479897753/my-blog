> 具体查看：[https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)
>

## 安装
```shell
npm install -g json-server
```

## 启动
```shell
json-server --watch db.json --port 8888
```

## 使用
> 首先准备一个 db.json 文件，存储数据
>

```json
{
  "todos": [
    {
      "id": 1,
      "name": "吃饭",
      "done": false
    },
    {
      "id": 2,
      "name": "睡觉",
      "done": false
    },
    {
      "id": 3,
      "name": "打豆豆",
      "done": true
    }
  ]
}
```

### 发送 GET 请求
#### 获取所有数据
+ 请求方式：`**GET**`
+ 请求地址：`**http://localhost:8888/todos**`
+ 返回数据：

```json
[
  {
    "id": 1,
    "name": "吃饭",
    "done": false
  },
  {
    "id": 2,
    "name": "睡觉",
    "done": false
  },
  {
    "id": 3,
    "name": "打豆豆",
    "done": true
  }
]
```

#### 根据ID获取数据
+ 请求方式：`**GET**`
+ 请求地址：`**http://localhost:8888/todos/2**`
+ 请求参数：

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675319858486-81014a88-a105-4a4c-bccc-8ee4fff0834f.png)

+ 返回数据：

```json
{
  "id": 2,
  "name": "睡觉",
  "done": false
}
```

### 发送 POST 请求
> 新增数据
>

+ 请求方式：`**POST**`
+ 请求地址：`**http://localhost:8888/todos**`
+ 请求参数：

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675319978511-a1b34edc-48ec-4049-8366-1104671fe482.png)

+ 返回数据：

```json
{
  "name": "干饭",
  "done": false,
  "id": 4
}
```

### 发送 PUT 请求
> 更新数据
>

+ 请求方式：`**PUT**`
+ 请求地址：`**http://localhost:8888/todos/4**`
+ 请求参数：

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675320102623-02617a47-6f68-4201-89f0-8159cd21db7c.png)

+ 返回数据：

```json
{
  "name": "干饭去喽",
  "done": false,
  "id": 4
}
```

### 发送 PATCH 请求
> 局部更新数据
>

+ 请求方式：`**PATCH**`
+ 请求地址：`**http://localhost:8888/todos/4**`
+ 请求参数：

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675320331879-eb7f3a3a-1e18-4f55-b73a-e7c9737c46c1.png)

+ 返回数据：

```json
{
  "name": "干饭去喽",
  "done": true,
  "id": 4
}
```

### 发送 DELETE 请求
> 删除数据
>

+ 请求方式：`**DELETE**`
+ 请求地址：`**http://localhost:8888/todos/4**`
+ 请求参数：

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1675320499006-45abb40b-75e0-47cc-994a-e1f990916552.png)

+ 返回数据：

```json
{}
```

