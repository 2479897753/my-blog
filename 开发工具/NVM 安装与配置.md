> nvm 全英文也叫 node.js version management，是一个 nodejs 的版本管理工具
>

**nvm 中文网：**[https://nvm.uihtm.com/](https://nvm.uihtm.com/)

## 下载
[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

## 安装
1. 双击运行 nvm-setup.exe

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723876340620-4c130b77-5220-4f60-994b-16887184dbee.png)

2. 选择 nvm 安装路径

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723876552959-ced4c1f7-1cb0-49d3-82c7-2cd214cf6897.png)

3. 选择 node.js 安装路径

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723876598279-2e97e848-3476-42c3-8c79-9a0b1df64f8c.png)

4. 点击 Install

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723876735026-bd11923b-bbe5-484f-a37b-9c59d72bb026.png)

5. 安装完成

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723876764587-85a1e443-8247-420d-9980-27403e1d6105.png)

## 配置环境
1. 新建系统变量，变量名为 NVM_HOME，变量值为 nvm 安装路径

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723877614634-cd1f3546-6bf6-401b-9e5d-53bb17c8435f.png)

2. 新建系统变量，变量名为 NVM_SYMLINK，变量值为 nodejs 安装路径

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723877649817-c5bae839-2af7-4b88-9c3e-e0391b4283b9.png)

3. 配置到系统变量 Path 下

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723877704865-65e1293d-69de-44f2-b978-a924f415782e.png)

## 配置镜像源
+ 打开 nvm 安装路径下的 setting.txt，写入 node_mirror 和 npm_mirror

**阿里云镜像**

```shell
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

## 配置共享全局包目录
1. 新建 node 文件夹，在 node 文件夹下新建全局包目录和缓存目录：node_global 和 node_cache
2. 设置全局包目录和缓存目录

```shell
npm config set prefix "C:\Services\node\node_global"
npm config set cache "C:\Services\node\node_cache"
```

3. 配置环境变量
    1. 新建环境变量，变量名为 NODE_PATH，变量值为全局包所在路径

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723882555926-9b354fdd-8570-45bb-a6be-5e54c75aa2f9.png)

    2. 将新建的环境变量，配置到系统变量 Path 下

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723882674543-a2990806-9f9f-4c6a-8f9d-a816c60ee496.png)

## 配置 npm 镜像源
```shell
npm config set registry https://registry.npmmirror.com/
```

## nvm 常用命令
```shell
# 查看已安装的 Node.js 版本
nvm ls

# 安装指定版本的 Node.js
nvm install <version> # 例如: nvm install 18.20.4 或 nvm install 18

# 使用指定版本的 Node.js
nvm use <version> # 例如: nvm use 18.20.4 或 nvm use 18

# 卸载指定版本的 Node.js
nvm uninstall <version> # 例如: nvm uninstall 18.20.4
```

