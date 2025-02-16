## 下载
**官网：**[https://github.com/tporadowski/redis/releases](https://github.com/tporadowski/redis/releases)

## 安装
1. 安装之前先检查是否已安装 Redis，如果已安装则需要删除

```shell
# 停止 Redis 服务
redis-server --service-stop

# 卸载 Redis 服务
redis-server --service-uninstall
```

2. 将 Redis-x64-5.0.14.1_2.zip 解压到指定位置，例如 "C:\Services"
3. 启动 Redis 临时服务**（在 Redis 所在目录运行）**

```shell
redis-server.exe  redis.windows.conf
```

4. 测试连接

```shell
redis-cli

ping # 返回 PONG 说明连接成功
```

5. 创建永久服务

```shell
redis-server.exe --service-install redis.windows.conf --loglevel verbose
```

6. 启动服务

```shell
redis-server --service-start
```

