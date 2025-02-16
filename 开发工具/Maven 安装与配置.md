## 下载
**官网：**[https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)

## 安装
1. 将 apache-maven-3.9.9-bin.zip 解压到指定位置，例如 "C:\Services"

## 配置环境变量
1. 新建系统变量 `**MAVEN_HOME**`

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724382147578-55f3c0ac-7494-4a96-9e19-19313d61d3e0.png)

2. 将变量配置到系统环境变量 Path 中

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724382264446-edc74a77-c56b-423c-8d3e-c506e933f535.png)

## 配置本地仓库
1. 在 "C:\Services\apache-maven-3.9.9" 路径下新建 `**repository**` 文件夹
2. 在 "C:\Services\apache-maven-3.9.9\conf" 路径下找到 settings.xml 并打开，新增如下内容

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724383089930-31fcfb1d-ab47-40aa-9ac7-70d95c3f091f.png)

## 配置镜像
+ 在 "C:\Services\apache-maven-3.9.9\conf" 路径下找到 settings.xml 并打开，新增如下内容

```xml
<!-- 阿里云仓库 -->
<mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>https://maven.aliyun.com/repository/public</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724383857093-12f82b92-b174-4114-a9d8-df061286b1bb.png)

