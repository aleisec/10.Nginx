### Nginx
#### 一、什么是Nginx
Nginx 是一款高性能的 Web和 反向代理 服务器，简单来说就是和apache-tomcat、express、koa是一个性质的东西，都是WEB服务器。

#### 二、Nginx可做什么
1. 做服务器代理，解决跨域问题。
2. 作为前端资源的服务（类似于开发时，利用webpack-dev启动服务访问前端项目）。
2. 为多台服务器之间做负载均衡。

#### 正向代理和反向代理的区别：



##### 正向代理：

`正向代理 是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。`

例如翻墙、vpn、代理解决跨域、爬虫
![正向代理图](./img/zxdl.jpg)
---
##### 反向代理：
`基本上就是一个服务端的负载均衡器，在计算机世界里，由于单个服务器的处理客户端（用户）请求能力有一个极限，当用户的接入请求蜂拥而入时，会造成服务器忙不过来的局面，可以使用多个服务器来共同分担成千上万的用户请求，这些服务器提供相同的服务，通过一台代理服务器集成，对于用户来说，根本感觉不到任何差别。`

例如  服务端的负载均衡器
![反向代理图](./img/zxdl.jpg)
---
总结：
1. 正向代理是代理(v)客户端，为客户端收发请求，使真实客户端对服务器不可见。
2. 反向代理是代理(v)服务器，为服务器收发请求，使真实服务器对客户端不可见。
3. 因为服务对象和自身角色不同，所以刚好是相反的。（v代表动词）
4. 相对于代理的服务器来说，两者的区别在于代理的对象不一样：正向代理代理的对象是客户端，反向代理代理的对象是服务端。