## 下载
**官网：**[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

## 安装
1. 安装之前先检查是否已安装 MySQL，如果已安装则需要删除

```shell
# 查询 mysql 服务
sc query mysql

# 停止 mysql 服务
net stop mysql

# 删除 mysql 服务
sc delete mysql
```

2. 将 mysql-8.4.2-winx64.zip 解压到指定位置，例如 "C:\Services\MySQL"
3. 在 mysql 根目录，新建 my.ini 文件并配置如下内容
+ **注意：**后期修改该配置文件，需重启服务

```properties
[client] # 客户端设置，即客户端默认的连接参数
# 设置mysql客户端连接服务端时默认使用的端口
port=3306

# 默认编码
default-character-set=utf8mb4

[mysql] # 客户端设置
# MySQL 提示符配置
# 用户名@主机名+mysql版本号+数据库名
prompt=\\u@\\h \\v [\\d]>\\_

# 设置MySQL客户端默认字符集
default-character-set=utf8mb4

[mysqld] # 服务端基本设置
# 默认连接端口
port=3306

# MySQL安装根目录的路径
basedir=C:\Services\MySQL\mysql-8.4.2-winx64

# MySQL服务器数据目录的路径
datadir=C:\Services\MySQL\mysql-8.4.2-winx64\data

# 允许最大连接数
max_connections=200

# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10

# 服务端默认编码
character_set_server=utf8mb4

# 在创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

# 配置时区
default-time_zone='+8:00'
```

4. 安装 MySQL 服务并指定配置文件**（在 MySQL 所在 bin 目录下运行）**

```shell
mysqld --install "MySQL" --defaults-file="C:\Services\MySQL\mysql-8.4.2-winx64\my.ini"
```

5. 初始化 MySQL

```shell
mysqld --initialize --console
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724397386304-f0c7e0a3-5e1c-4b89-94e0-d1049aa205f9.png)

:::info
**Tips：**

+ 初始化会生成一个 data 文件夹并产生一个随机密码，该密码会在后面登录验证时用到，如果忘记密码，可以删除初始化生成的 data 文件夹，重新初始化即可

:::

6. 开启 MySQL 服务

```shell
net start mysql
```

7. 登录 MySQL

```shell
mysql -uroot -p

# 简写
mysql -uroot -hlocalhost -proot
```

8. 修改 root 密码

```shell
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
```

9. 验证配置文件是否生效

```shell
\s
```

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724397855761-4c4e8ddb-79b6-4b13-bbb8-985e63c2f1a2.png)

10. 退出 MySQL

```shell
\q
```

## 配置环境变量
1. 新建系统变量 `**MYSQL_HOME8**`

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724398061947-151ae78e-6c29-4858-91b3-d52ab00ec661.png)

2. 新建系统变量 `**MYSQL_HOME**`，值为上一步创建的变量

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724398166253-46c219a8-6421-4799-8ee1-260e48c62bc7.png)

3. 将变量配置到系统变量 Path 中

![](https://cdn.nlark.com/yuque/0/2024/png/33977556/1724398384730-a17ef1de-e97d-422e-ade4-49d94f106a57.png)

