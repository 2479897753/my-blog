## Vim 模式
+ 分类：
    - 普通模式 - `**-- NORMAL --**`
    - 插入模式 - `**-- INSERT --**`
    - 可视模式 - `**-- VISUAL --**`
    - 命令模式

### 模式相互转换
#### 普通模式 <--> 插入模式
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692511751299-4f0afadf-b725-4912-91e6-dc8c8875abae.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692511978492-19b22fd7-0d13-46fd-8d04-160434d2c97d.png)

#### 普通模式 <--> 可视模式
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692512316943-a7efaa44-e6e6-4c14-a343-90dc17a1bfc2.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692512357475-855dc4dd-1a2c-4e94-8e64-82a2eee24972.png)

#### 普通模式 <--> 命令模式
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692512600614-fe019fee-5a1d-4795-b610-bae775958587.png)

## 光标移动
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692513084787-1b0422d5-4ad1-469f-acd5-0dd55989d5aa.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692513449329-57dd9e57-03a0-4998-b693-5eea6591d6ed.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692513814637-ec69d22d-fe34-4d1e-a9e4-a542964c09de.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692514105026-a2265bea-2fdc-4c09-9d65-9b1352617b7c.png)

## 动作 motion
+ **注意：动作**需结合**操作符**来完成操作
+ 例如：

```vue
<template>
  <!-- 在div所在标签这一行，普通模式下输入cit，就会将div中的全部内容删除并切换到插入模式 -->
  <div class="box">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    <ul>
  <div>
</template>

<script>
  // di' 表示删除foo
	console.log('foo') // console.log('')
</script>
```

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692515804948-c7218036-2598-4dd0-884c-bc6923ea5e95.png)

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692515910269-944910eb-ef55-4604-a76d-0d912ba608aa.png)

## 操作符 operator
+ `**p**`** **- 粘贴
+ `**u**` - 撤销
+ **删除一行：**dd
+ **删除两行：**2dd
+ **修改一行：**cc
+ **修改两行：**2cc
+ **复制一行：**yy
+ **复制两行：**2yy

![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692516076372-3b122ffc-b3a6-4005-b6ad-4bc9ae07bc20.png)

## 切换大小写
![](https://cdn.nlark.com/yuque/0/2023/png/33977556/1692519306372-f27d2768-71cc-488e-b824-a0fa69e3e8e7.png)

## 实践
+ `**gd**` - 跳转到定义
+ `**gh**` - 鼠标悬停提示
+ `**gt**` - 跳转至下一标签页（`**2gt**`表示跳转至第二个标签页）
+ `**Ctrl + 0**` - 将光标跳至文件选择处

```javascript
// cs"]
"foo" // [foo]
// ysiw'
foo // 'foo'
```

