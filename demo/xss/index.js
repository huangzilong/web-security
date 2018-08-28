var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', (ctx, next) => {
  console.log(ctx.query)
  ctx.body = `<script>alert(/xss/)</script>`
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app
  .listen(3000);