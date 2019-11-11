const Koa = require('koa');
const Router = require('koa-router');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');

const initRoutes = require('./src/routes');
const helloMiddleware = require('./src/middlewares/helloMiddleware');
const timeLoggerMiddleware = require('./src/middlewares/timeLoggerMiddleware');

const DB = require('./src/initializers/db');

const app = new Koa();
const router = new Router();

const port = 3009;

app.use(timeLoggerMiddleware).use(helloMiddleware);
app.use(morgan('dev'));

initRoutes(router);

app.db = new DB();
// const db = new DB();
// db.getItems()
//   .then(items => {
//     console.log(items);

//     return db.createItem({ price: 20, name: 'Hooba Booba' });
//   })
//   .then(item => {
//     console.log(item);

//     return db.getItem(item.id);
//   })
//   .then(item => {
//     console.log(item);

//     return db.updateItem(item.id, {
//       price: 50,
//       name: 'Hooba Booba Mega DRIVE!!!',
//     });
//   })
//   .then(updatedItem => {
//     console.log(updatedItem);
//   })
//   .then(() => {
//     return db.getItems();
//   })
//   .then(items => {
//     console.log(items);

//     return db.deleteItem(items[items.length - 1].id);
//   })
//   .then(() => {
//     return db.getItems();
//   })
//   .then(items => {
//     console.log(items);
//   })
//   .catch(error => console.error(error));

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
