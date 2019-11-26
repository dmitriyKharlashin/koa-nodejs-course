const Koa = require('koa');
const Router = require('koa-router');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');

const initRoutes = require('./src/routes');
const helloMiddleware = require('./src/middlewares/helloMiddleware');
const timeLoggerMiddleware = require('./src/middlewares/timeLoggerMiddleware');
const dbConnectorMiddleware = require('./src/middlewares/DbConnectorMiddleware');

const app = new Koa();
const router = new Router();

const port = 3009;

app
    .use(timeLoggerMiddleware)
    .use(helloMiddleware)
    .use(dbConnectorMiddleware)
    .use(morgan('dev'));

initRoutes(router);

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app.listen(port, () => {
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
