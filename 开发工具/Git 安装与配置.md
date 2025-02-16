## 下载
**Git 中文网：**[https://git.p2hp.com/](https://git.p2hp.com/)

**镜像站：**[https://registry.npmmirror.com/binary.html?path=git-for-windows/](https://registry.npmmirror.com/binary.html?path=git-for-windows/)

## 安装
1. 双击运行 Git-2.46.0-64-bit.exe

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997366436-41d0d9f2-4a12-40f7-85e4-7ca7c09e5c1b.png)

2. 选择 git 安装路径

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997396489-45f29b90-7dab-402f-89ea-26f570cbaa68.png)

3. 选择安装组件

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997482424-82e1727b-7fbf-4c91-b8d7-f9110fa26253.png)

4. 选择开始菜单文件夹

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997530519-c0bed127-f283-4415-afd1-08be374fcfc6.png)

5. 选择 git 默认编辑器

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997560590-ac0d96c7-8948-43c5-8d42-e9a76cbffaf9.png)

6. 调整新仓库初始分支的名称

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997720519-9ad02dd4-3c07-4413-9107-b6918b0ac1d4.png)

7. 调整 git 环境变量

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997767813-8b9a926a-b494-45cf-83d9-ef1789a1d80f.png)

8. 选择 SSH 可执行文件

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997827033-59af88e1-efab-4e74-b80c-5bcf33f19702.png)

9. 选择 HTTPS 后端传输

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997871354-935f07a6-28b9-475e-98a8-1b2a4ac24b98.png)

10. 配置行尾符号转换

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997908754-dc255f0a-66ed-4d18-9fd9-49802840abeb.png)

11. 配置与 Git Bash 一起使用的终端模拟器

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723997997006-757565bd-f861-48f9-9bc5-8eb85024a28d.png)

12. 选择 git pull 的默认行为

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723998031719-5a33ebc4-bf78-4ad6-b077-b7679e234839.png)

13. 选择一个凭证帮助程序

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723998065333-aafec7f4-6728-4a23-ae74-3a0baf8a6e9a.png)

14. 配置额外选项

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723998095042-15ecabfc-2eac-43ad-91c7-1975a77de6fb.png)

15. 配置实验性选项

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723998130042-39e66a84-f4e2-4b67-ad51-5409cd6a724e.png)

16. 安装完成

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723998185203-73b088d1-6c4f-4dda-bcf7-7d2f07fae64c.png)

## 配置本地信息
```shell
git config --global user.name "用户名"
git config --global user.email "邮箱"

# 查看配置信息
git config --list
```

## 配置 SSH
1. 生成 SSH Key

```shell
ssh-keygen -t rsa -C "注册邮箱"
```

2. 获取 SSH Key 公钥

```shell
cd ~/.ssh
cat id_rsa.pub
```

3. 将公钥配置到 Github 上
    1. 打开设置

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723999010712-b71c5bf1-7ba1-4284-b6cb-f131a4312090.png)

    2. 点击 SSH 和 GPG 密钥

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723999030972-f1d94079-ad8e-41c5-ab54-d29f573ba9d3.png)

    3. 点击新的 SSH 密钥

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723998794494-57e82da7-9e6e-4245-ab4c-7049a68704ce.png)

    4. 设置新增 SSH 密钥的标题和公钥

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723998900522-c6ae46c9-b310-493c-82d2-8d76d46efd12.png)

4. 验证是否配置成功

```shell
ssh -T git@github.com
```

