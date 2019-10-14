const Koa = require('koa');
const Router = require('koa-router');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');

const some = require('./module');
const helloMiddleware = require('./helloMiddleware');
const timeLoggerMiddleware = require('./timeLoggerMiddleware');

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

app.use(timeLoggerMiddleware).use(helloMiddleware);
app.use(morgan('dev')).use(bodyParser());

router
  .get('/', async ctx => {
    // ctx.body = { message: 'Hello, World!!!' };
    ctx.body = users;
  })
  .get('/users/:id', async ctx => {
    ctx.body = users.filter(user => user && user.id == ctx.params.id);
  })
  .post('/users', async ctx => {
    ctx.body = some.greetings(ctx.request.body.name);
  });

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGTERM', () => {
  console.log('\nI receive signal interrupt');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log("\nControl+C pushed! I'm exiting!\nBYE BYE!");
  process.exit(0);
});
