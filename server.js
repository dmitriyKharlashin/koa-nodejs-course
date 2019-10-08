const Koa = require('koa');
const Router = require('koa-router');

const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const port = 3009;
const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
  },
];

app.use(morgan('dev')).use(bodyParser());

router
  .get('/', async ctx => {
    // ctx.body = { message: 'Hello, World!!!' };
    ctx.body = users;
  })
  .get('/users/:id', async ctx => {
    // ctx.body = { message: 'Hello, World!!!' };
    ctx.body = users.filter(user => user && user.id == ctx.params.id);
  })
  .post('/users', async ctx => {
    ctx.body = ctx.request.body;
  });

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
