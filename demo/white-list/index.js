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
const result = myxss.process('<a href="http://www.kezaihui.com"></a><p>123</p><script>alert("xss");</script>')
console.log(result)