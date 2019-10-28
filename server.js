const Koa = require('koa');
const Router = require('koa-router');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');

const initRoutes = require('./src/routes');
const helloMiddleware = require('./helloMiddleware');
const timeLoggerMiddleware = require('./timeLoggerMiddleware');

const app = new Koa();
const router = new Router();

const port = 3009;

app.use(timeLoggerMiddleware).use(helloMiddleware);
app.use(morgan('dev'));

initRoutes(router);

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

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
