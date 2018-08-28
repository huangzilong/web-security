# CSRF

**CSRF（Cross Site Request Forgery）**， 跨站请求伪造。也被称为 One Click Attack。攻击者（黑客，钓鱼网站）盗用了你的身份，诱导你进入第三方站点，以你的名义发送恶意请求，这些请求包括发送邮件、发送消息、盗取账号、购买商品、银行转账，从而使你的个人隐私泄露和财产损失。

## 举例

继续以删除账号的链接为例:

`http://www.zaihuiba.com/operation/accounts/?phone=15689890989&spell=avada_kedavra`

当用户在`http://www.zaihuiba.com/`登录后，本地已经有了鉴定该用户身份的 cookie。此时只需要诱导用户在该浏览器打开第三方的网页，而该网页包含有删除该用户账号的 get 请求，便可达到 CSRF。

比如，在该用户浏览器中打开`http://www.kezaihui.com/csrf.html`，这个页面包含一张 src 为`http://www.zaihuiba.com/operation/accounts/?phone=15689890989&spell=avada_kedavra`的图片，就可以达到目的。

## CSRF原理理

![csrf](http://static.huangzilong.com/static/csrf.png)

## 浏览器有可能会拦截第三方Cookie

如果一个域的页面要加载另一个域的资源，是否带上cookie每个浏览器以及浏览器的版本策略都不太一样。

最新版的chrome会禁止带上cookie，但是safari还是会带上cookie。

## CSRF 的防御

### 使用验证码

  可以对重要接口，要求进行二维码验证。但是也有弊端，所有地方使用用验证，会影响用户体验

### 检查 Http 中的 refer

  服务器并不是任何时候都能取到refer

### 如果开启了 CORS，还可以检查去 origin

### 在header中加入token，而不是用过cookie鉴权

### SameSite Cookies

[http Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)

---

参考：

- [WEB 安全之-CSRF（跨站请求伪造）](https://www.jianshu.com/p/855395f9603b)
- [跨站请求伪造已死！](https://juejin.im/post/58c669b6a22b9d0058b3c630)
