## Nginx
### 一、前言：
#### *1、什么是Nginx？*    
Nginx 是一款高性能的 Web和 反向代理 服务器，简单来说就是和apache-tomcat、express、koa是一个性质的东西，都是WEB服务器。

#### *2、Nginx可做什么*
1. 做服务器代理，解决跨域问题（正向代理）。
2. 提供静态文件服务（前端项目存放处）。
3. 作为图片资源网络资源服务器。
4. 为多台服务器之间做负载均衡（反向代理）。
5. Nginx可以对不同的文件做不同的缓存处理，配置灵活。

#### *3、正向代理和反向代理的区别：*
##### 正向代理：


`正向代理 是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。`

例如翻墙、vpn、代理解决跨域、爬虫
![正向代理图](./img/zxdl.jpg)

##### 反向代理：
`基本上就是一个服务端的负载均衡器，在计算机世界里，由于单个服务器的处理客户端（用户）请求能力有一个极限，当用户的接入请求蜂拥而入时，会造成服务器忙不过来的局面，可以使用多个服务器来共同分担成千上万的用户请求，这些服务器提供相同的服务，通过一台代理服务器集成，对于用户来说，根本感觉不到任何差别。`

例如  服务端的负载均衡器
![反向代理图](./img/zxdl.jpg)

总结：
1. 正向代理是代理(v)客户端，为客户端收发请求，使真实客户端对服务器不可见。
2. 反向代理是代理(v)服务器，为服务器收发请求，使真实服务器对客户端不可见。
3. 因为服务对象和自身角色不同，所以刚好是相反的。（v代表动词）
4. 相对于代理的服务器来说，两者的区别在于代理的对象不一样：正向代理代理的对象是客户端，反向代理代理的对象是服务端。


---
### 二、安装
[下载nginx](http://nginx.org/en/download.html)

* 解压，存放在心仪的，这里我们存放到 `G:\`， 注意目录中不能有中文
* 打开cmd,进入`G:\nginx-1.14.1` 目录,
* 运行命令`start nginx`启动nginx服务。访问localhost:80（默认，可以自己设置）测试是否访问成功。
>至此，nginx服务器安装和启动完毕

---
### 三、常用nginx命令：
* 验证配置是否正确: nginx -t
* 查看Nginx的版本号：nginx -V
* 启动Nginx：start nginx
* 配置文件修改重装载命令：nginx -s +eload
* 快速停止或关闭Nginx：nginx -s stop
* 正常停止或关闭Nginx：nginx -s quit
* window下终止所有的nginx进程命令：taskkill /im nginx.exe /f
>tip：多次在没有nginx -s stop 的情况下 start nginx 会启动多个nginx服务，而且通过 nginx -s stop 只能关闭最后一个nginx进程，通过`taskkill /im nginx.exe /f`这种方式可以关闭所有的nginx进程。
window下测试nginx,感觉好像配置修改后不生效，服务器关了还能访问，因为后台没有真正关闭nginx服务，在任务管理器中可以查看到有多个nginx服务，可以通知这种方式结束nginx任务。

---
### 四、把nginx作为静态资源服务器：
*nginx.conf文件中，http指令增加一个server指令，配置如下，启动或重载nginx,访问 localhost:3000/+ 项目具体路径*
```
    server {
        listen       3000;
		root   G:\WEB\web前端\vueMysize\vue大屏框架\LS\dist;
    }
```

---
### 五、把nginx作为静态资源服务器，并且提供正向代理服务器：
*nginx.conf文件中，http指令增加一个server指令，配置如下，启动或重载nginx,访问 localhost:3000/+ 项目具体路径*
* 第1个location指令匹配所有前缀为api的请求，并交给http://localhost:8000服务（tomcat/express）处理。前端访问localhost:3000/api/test 会代理到 =》localhost:8000/api/test，就像webpack-dev的proxyTable服务器代理,解决跨域问题。

```
server {
        listen       3000;
		root   G:\WEB\web前端\vueMysize\vue大屏框架\LS\dist;
		#api为后端文件夹名称
		location /api/ {
	         proxy_pass http://localhost:8000;
	    }
    }
```

---
### 六、把nginx设置为反向代理服务器，实现负载均衡：
```
 #配置负载均衡的服务器
upstream myapp {
       		# ip_hash; # 使用这个指令，会分析ip地址再去分配该请求，确保一个客户只和一台服务器通信，解决session\cookies共享问题
            server localhost:4000; #express服务
            server localhost:8000; #express服务
}
server {
    listen       3000;
    # 后端接口负载均衡
	location ^~ /api/ {
        proxy_pass http://myapp;
    }
    # 前端页面负载均衡，设置静态文件路径需要在 upstream 2个server中配置
    location / {
		proxy_pass http://myapp;
    }
}
```

---
### 七、参数解读：
nginx.conf配置参数亲测：
```
server {
        listen      7000;  #端口，默认80
    server_name  test.com; #可以通过test.com:3000访问这个nginx服务，不使用这个指令的话需要在host文件中配置test.com=>127.0.0.1的映射，然后才能通过test.com:3000去访问这个服务。也可以直接使用127.0.0.1:3000访问。配置后在server_name不同的情况下可以重复使用端口

		location / {                   location指令后面为为匹配url的规则，相当于if
            root   html;
            index  index.html index.htm;
        }
        location /aaa/ {  #匹配localhost:7000/aaa/  把root替换了localhost:7000 然后查找资源，实际查找路径为 G:\www\aaa\index.html
            root   G:\www;   root 指令声明了要查找文件的目录。Nginx 会把请求的 URI 添加到 root 指令指定的路径之后，来获取请求文件对应的目录。root 指令可以放在 http、server 或 location 上下文的任何位置。 没有root指令会使用server下的root指令

            index  index.html index.htm 50x.html;  index 指令中可以列出多个文件。Nginx 会按顺序查找文件并返回第一个找到的文件。
            autoindex on;   与index只能存在一个，谁先写谁生效，autoindex 指令如果设置为 on，则 Nginx 会返回自动生成的目录列表：
        }
   }

```
location匹配优先级排序：

1. 等号类型（=）的优先级最高。一旦匹配成功，则不再查找其他匹配项。（location = abc ）
2.^~类型表达式。一旦匹配成功，则不再查找其他匹配项。（location ^~ /images/）
3.正则表达式类型（~ ~*）的优先级次之。如果有多个location的正则能匹配的话，则使用正则表达式最长的那个。（location ~* \.(gif|jpg|jpeg)$）
4.常规字符串匹配类型。按前缀匹配。（location /documents/ ）


---


### 注意点：
1. nginx服务可以根据请求的路径，通过location指令分别控制他们的缓存机制，重定向寻找资源的位置...等各种各样的操作，(通俗来说：如果请求路径中包含XXX，那就....)
2. 通过nginx服务器正向代理后，谷歌浏览器network显示的响应头信息**是 proxy_pass指令指向的服务设置的，而不是nginx服务设置的。请求头时前端设置的，也不是nginx设置的**。
>正向代理只是起到一个桥梁的左右，可以设置多个桥梁，例如前端请求node服务代理，node代理请求nginx搭理，nginx搭理请求真正的后台。
3. nginx正向代理服务也支持跨域，即*浏览器访问的地址的协议域名端口*与*nginx代理服务的协议域名端口*可以不一致。
>（例如：访问地址localhost:8080、nginx地址：localhost:3000、后端地址：localhost:8000）这种情况会出现跨域，因为访问地址localhost:8080与请求地址localhost:3000不同，会导致跨域，需要在localhost:8000的服务上设置响应头支持跨域。
### 遇见的报错error
nginx: [emerg] invalid number of arguments in "root" directive    
root参数的属性值无效，（路径错误）