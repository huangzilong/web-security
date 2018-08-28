var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/login', (ctx, next) => {
  ctx.cookies.set(
    'cook1', 
    'hello world',
    {
      expires: new Date('2019-02-15'),  // cookie失效时间
    }
  )
  ctx.cookies.set(
    'cook2',
    'hello zaihui',
    {
    }
  )
  ctx.body = 'ok'
});

router.get('/give_me_your_money', (ctx, next) => {
  ctx.body = 'your mondy'
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app
  .listen(3000);