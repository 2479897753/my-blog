> Scoop 是 Windows 的命令行安装程序
>

**官网：**[https://scoop.sh/](https://scoop.sh/)	

## 安装
1. 自定义 Scoop 安装目录，应保证目录存在 **（管理员身份运行）**

```shell
$env:SCOOP='C:\Services\Scoop'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'Machine')
```

2. 自定义 Scoop 全局包安装目录，应保证目录存在 **（管理员身份运行）**

```shell
$env:SCOOP_GLOBAL='C:\Services\Scoop_Global'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
```

3. 允许运行本地脚本和已签名的远程脚本

```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

4. 安装 scoop

```shell
irm https://mirror.ghproxy.com/raw.githubusercontent.com/scoopinstaller/install/master/install.ps1 | iex
```

## 配置镜像源
```shell
scoop config scoop_repo https://mirror.ghproxy.com/github.com/ScoopInstaller/Scoop.git
```

## 配置存储桶
**Scoop buckets 代理镜像库：**[https://github.com/lzwme/scoop-proxy-cn](https://github.com/lzwme/scoop-proxy-cn)

```shell
# 需先安装 git
scoop bucket add spc https://mirror.ghproxy.com/github.com/lzwme/scoop-proxy-cn
scoop bucket rm main
scoop bucket add main https://mirror.ghproxy.com/github.com/ScoopInstaller/Main

# 安装应用
scoop install spc/<app_name> # 例如：scoop install spc/aria2
```

## 安装必备神器
1. 安装 aria2

```shell
scoop install aria2

# 禁用警告
scoop config aria2-warning-enabled false

# 禁用 aria2
scoop config aria2-enabled false
```

2. 安装 scoop-search

```shell
scoop install scoop-search

# 使用
scoop-search act
```

:::info
**Tips：**

+ 若下载时出现 `**Hash Check Failed**` 的问题，可以添加参数 `**-s**`** **以忽略：

scoop install scoop-search -s

+ 若下载报错，禁用 aria2，使用普通下载

:::

## Scoop 常用命令
```shell
# 查看已安装软件
scoop list

# 搜索、安装
scoop search <app> # 搜索软件
scoop install <app> # 下载并安装软件

# 更新
scoop update # 更新 scoop 和所有 bucket
scoop status # 检查已安装包是否有更新
scoop update <app> # 更新指定包
scoop update * # 更新所有包

# bucket
scoop bucket list # 查看已添加的存储桶
scoop bucket known # 查看官方支持的下载源
scoop bucket add <name> [<repo>] # 添加下载源

# scoop 更新 app 后，其旧版本并不会被删除，可通过以下命令删除
scoop cleanup <app>
scoop cleanup *
scoop hold <app> # 锁定版本（暂停更新）
scoop unhold <app> # 解除版本锁定
scoop reset <app@版本号> # 切换包到指定版本（scoop 特色）
scoop cache rm * # 清空缓存（清空cache目录）

# 备份
scoop export > scoopfile.json # 导出包
scoop import scoopfile.json # 导入包

# 打开应用主页
scoop home <app>

# 自身诊断
scoop checkup
```

