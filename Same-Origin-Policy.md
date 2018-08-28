# 同源策略
> 同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。
>
> 简言之，不同源的客户端脚本，在没有明确授权的情况下，不能读取对方的资源。

## 什么是同源

> 如果两个页面的协议，端口（如果有指定）和域名都相同，则两个页面具有相同的源。

与`http://www.kezaihui.com`比较:

站点 | 是否同源 | 原因 |
:-- | :-- | :-- |
https://www.kezaihui.com | 否 | 协议不同
http://lx.kezaihui.com | 否 | 域名不同
http://www.kezaihui.com:8000 | 否 | 端口不同

## 客户端脚本

**客户端**: 一般指浏览器。
**脚本**：包括JavaScript、ActionScript(Flash脚本)等

## 授权

比如AJAX是禁止跨域访问资源，一般会报`No 'Access-Control-Allow-Origin' header is present on the requested`跨域错误。但是在请求的header里我们加上了'Access-Control-Allow-Origin: *'，那该请求就不会被浏览器拦截。

## 读写权限

Web上有很多资源，有些是可以读，有些可以写。比如，HTTP header里的 refer 只能读取，而cookie既可以读，又可以写。

## 资源

同源策略里的资源，一般指Web客户端里的资源，一般来说，包括HTTP中的内容，整个DOM树，浏览器存储(cookies、localStorage)、图片等。

HTTP中的response也是一种资源，图片也是一种资源，所以在同源策略限制下，是不能读取不同源下的repsponse或者图片的。

## 为什么要有同源策略

保证数据安全，防止不同网站跨域读取资源。比如，当你打开了`www.facebook.com`的同时，又在同一个tab里跳转到了`www.google.com`中，那www.google.com就可以读取你在`www.facebook.com`中的资源。

## 同源策略的常用解决办法

- jsonp

- CORS(Cross- Origin Resource Sharing)
 > Access-Control-Allow-Origin: *
---

参考资料:
- [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
- [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
- [Web开发中跨域的几种解决方案](https://harttle.land/2015/10/10/cross-origin.html)