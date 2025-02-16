**Oh My Posh 主题官网：**[https://ohmyposh.dev/](https://ohmyposh.dev/)

## 安装最新版本的 PowerShell
1. 搜索最新版本的 PowerShell

```shell
winget search Microsoft.PowerShell
```

2. 使用 id 参数安装 PowerShell

```shell
winget install --id Microsoft.Powershell --source winget
```

##  配置主题
+ **注意：** 修改完 PowerShell 配置文件后，需要重新加载，可执行命令 `**. $PROFILE**` 或 重启 PowerShell
1. 安装 Oh My Posh 主题 **（安装完需重启终端）**

```shell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

2. 运行 `**notepad $PROFILE**` 命令，打开配置文件脚本，添加以下一行

```shell
# 默认主题
oh-my-posh init pwsh | Invoke-Expression

# 或 robbyrussell 主题
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\robbyrussell.omp.json" | Invoke-Expression
```

:::info
**Tips：**

+ 当上述命令出现错误时，请确保先创建配置文件，可执行以下命令：

`**New-Item -Path $PROFILE -Type File -Force**`

:::

## 配置字体
1. 安装 Meslo 字体**（管理员身份运行）**

```shell
oh-my-posh font install meslo

# 或 使用代理下载
oh-my-posh font install https://mirror.ghproxy.com/https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/meslo.zip
```

2. 通过快捷键 `**CTRL + SHIFT + ,**` 打开 settings.json，在 profiles.defaults 属性下添加属性 font.face

```json
{
    "profiles":
    {
        "defaults":
        {
            "font":
            {
                "face": "MesloLGM Nerd Font"
            }
        }
    }
}
```

