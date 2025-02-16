> 快速简单的 Node.js 版本管理器，内置 Rust
>

**github 地址：**[https://github.com/Schniz/fnm](https://github.com/Schniz/fnm)

## 安装
```shell
scoop install fnm
```

## 配置
1. 打开 PowerShell 配置文件

```shell
notepad $profile
```

2. 在配置文件中添加以下内容

```shell
fnm env --use-on-cd | Out-String | Invoke-Expression
```

3. 重新加载配置文件

```shell
. $PROFILE
```

## 配置共享全局包目录
1. 设置全局包目录和缓存目录

```shell
npm config set prefix "C:\Services\node\node_global"
npm config set cache "C:\Services\node\node_cache"
```

2. 配置环境变量
    1. 新建环境变量，变量名为 NODE_PATH，变量值为全局包所在路径

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723882555926-9b354fdd-8570-45bb-a6be-5e54c75aa2f9.png)

    2. 将新建的环境变量，配置到系统变量 Path 下

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1723882674543-a2990806-9f9f-4c6a-8f9d-a816c60ee496.png)

## 配置 npm 镜像源
```shell
npm config set registry https://registry.npmmirror.com/
```

## fnm 常用命令
```shell
# 列出本地安装的所有 Node.js 版本
fnm list

# 安装新的 Node.js 版本
fnm install 22

# 更改 Node.js 版本
fnm use 22

# 将某个版本设为默认版本
fnm default 22

# 卸载 Node.js 版本
fnm uninstall 16
```

