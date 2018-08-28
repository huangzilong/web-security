var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/login', (ctx, next) => {
  // ctx.router available
  console.log(ctx.query)
  ctx.body = '<script>alert("/xss/")</script>'
});

router.get('/give_me_your_money') 

app
  .use(router.routes())
  .use(router.allowedMethods());

app
  .listen(3000);