const itemsController = require('./controllers/items');
const initRoutes = router => {
  router.get('/', async ctx => {
    ctx.body = { message: 'Hello, World!!!' };
  });

  router
    .get('/items/:itemId', itemsController.getItem)
    .get('/items', itemsController.getItems)
    .post('/items', itemsController.createItem)
    .delete('/items/:itemId', itemsController.deleteItem)
    .put('/items/:itemId', itemsController.updateItem);
};

module.exports = initRoutes;
