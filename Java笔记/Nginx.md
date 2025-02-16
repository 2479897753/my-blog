> Nginx 是一个高性能的 HTTP 和 反向代理服务器
>

## 安装 Nginx
### 包管理器
#### Linux
```shell
$ sudo apt update
$ sudo apt install nginx
```

#### macOS
```shell
$ brew install nginx
```

#### Windows
> nginx 安装地址：[https://nginx.org/en/download.html](https://nginx.org/en/download.html)
>

```shell
# iwr -useb get.scoop.sh | iex 这条命令是安装 scoop 命令行软件管理工具
$ scoop install nginx
$ choco install nginx
```

### 编译安装
> 预编译 -> 编译 -> 安装
>

```shell
$ ./configure
  --sbin-path=/usr/local/nginx/nginx
  --conf-path=/usr/local/nginx/nginx.conf
  --pid-path=/usr/local/nginx/nginx.pid
  --width-http_ssl_module
  --width-pcre=../pcre2-10.39
  --width-zlib=../zlib-1.2.11
$ make
$ make install
```

### 使用 Docker 安装
```shell
$ docker pull nginx
```

## 常用命令
```shell
nginx # 启动 Nginx 服务器

ps -ef|grep nginx # 查看进程：master（主进程） 负责读取和验证配置文件以及管理 worker 进程，worker（工作进程） 负责理实际的请求

lsof -i:80 # 查看端口占用情况

nginx -s stop # 立即停止：quit 优雅停止，stop 立即停止，reload 重载配置文件，reopen 重新打开日志文件

nginx -V # 查看 Nginx 安装目录，配置文件等信息

nginx -t # 查看配置文件是否正确
```

**Windows 下启动 Nginx**

> 命令需在 nginx 文件夹下运行
>

```shell
./nginx -v # 查看 nginx 版本
start nginx # 启动 nginx 服务
./nginx -s stop # 关闭 nginx 服务
./nginx -s reload # 重新加载 nginx

tasklist /fi "imagename eq nginx.exe" # 查看正在运行的服务

taskkill /pid [PID] /f # 关闭指定的服务

taskkill /IM nginx.exe /F # 关闭所有服务
```

## 配置文件
> 反向代理、负载均衡、HTTPS 配置、虚拟主机
>

_**nginx.conf**_

```shell
# 全局块
#user  root;
worker_processes  1; # 可以设置成 auto，Nginx 会根据内核的数量来自动设置 worker 进程的数量

#error_log  logs/error.log; # 错误日志文件路径
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

# events 块
events {
    worker_connections  1024; # 每个 worker 进程最大处理1024个连接
}

# http 块
http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    # 反向代理配置 upstream，后面的名字可以随便起
    upstream backend {
        ip_hash; # 这个策略会根据客户端的 IP 地址来进行一个哈希，同一个 IP 地址会被分配到同一个服务器上
        server 127.0.0.1:8000 weight=3; # 增加权重，权重越大被分到的请求次数越多
        server 127.0.0.1:8001;
        server 127.0.0.1:8002;
    }

    # 将 http 重定向到 https
    # server {
    #     listen       80;
    #     server_name  hkeji.net www.hkeji.net;
    #     return 301  https://$server_name$request_uri;
    # }

    # 每个 server 块就是一个 虚拟主机
    # 可以将 server 块提取到单独的 .conf 文件中，使用 include 进行引入
    include servers/*.conf;

    upstream myapp1 {
        ip_hash;
        server 127.0.0.1:8080;
    }

    # server 块
    server {
        listen       80; # 监听的端口号
        server_name  localhost; # 主机名称

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # 所有以 /app 开头的请求都被代理到刚刚配置的 upstream 中
        location /app {
            proxy_pass http://backend # 这里的地址需要和 upstream 中配置的名字一致
        }

        # 匹配以 /api 开头的请求，^~ 表示优先匹配
        location ^~ /api {
            rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://myapp1;
        }

        location / {
            root   html; # 要运行的文件目录
            index  index.html index.htm; # 要运行的文件
            try_files $uri $uri/ /index.html; # 处理根路径请求
        }

        #error_page  404              /404.html;

        # 将服务器错误页面重定向到静态页面 /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # 将 PHP 脚本代理到 Apache，监听 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # 将 PHP 脚本传递给在 127.0.0.1:9000 上监听的 FastCGI 服务器
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # 拒绝访问 .htaccess 文件，如果 Apache 的文档根目录
        # 与 nginx 的一致
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # 使用基于 IP、名称和端口的混合配置，创建另一个虚拟主机
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
         # HTTPS 服务器配置
         # listen       443 ssl;
         # server_name  hkeji.com www.hkeji.com;
         # # 证书文件名称
         # ssl_certificate       /opt/homebrew/etc/nginx/cacert.pem;
         # # 证书私钥文件名称
         # ssl_certificate_key   /opt/homebrew/etc/nginx/private.key;
         # # ssl 验证配置
         # ssl_session_timeout   5m; # 缓存有效期
         # # 安全链接可选的加密协议
         # ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
         # # 配置加密套件 / 加密算法，写法尊存 openssl 标准
         # ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
         # # 使用服务器端的首选算法
         # ssl_prefer_server_ciphers on;

         # location / {
         #     root   html;
         #     index  index.html index.htm;
         # }
    
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

:::info
**Tips：使用 openssl 生成证书**

1. 生成私钥文件（private key）

`**openssl genrsa -out private.key 2048**`

2. 根据私钥生成证书签名请求文件（Certificate Signing Request，简称 CSR 文件）

`**openssl req -new -key private.key -out cert.csr**`

3. 使用私钥对称证书申请进行签名从而生成证书文件（pem文件）

`**openssl x509 -req -in cert.csr -out cacert.pem -signkey private.key**`

:::

