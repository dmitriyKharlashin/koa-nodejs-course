const itemsController = require('./controllers/items');
const authoriseMiddleware = require('./middlewares/authoriseMiddleware');

const validationRules = {
    '/items/:itemId': {
        PUT: {
            params: {
                itemId: ['required', 'string'],
            }
        },
        DELETE: {
            params: {
                itemId: ['required', 'string'],
            }
        },
        GET: {
            params: {
                itemId: ['required', 'string'],
            }
        }
    },
    '/items': {
        POST: {
            body: {
                name: ['required'],
                price: ['required']
            }
        }
    }
};

const validationMiddleware = require('./middlewares/validatorMiddleware')(validationRules);

const initRoutes = router => {
    router.get('/', async ctx => {
        ctx.body = {message: 'Hello, World!!!'};
    });

    router
        .get('/items/:itemId', validationMiddleware, itemsController.getItem)
        .get('/items', itemsController.getItems)
        .post('/items', authoriseMiddleware, validationMiddleware, itemsController.createItem)
        .delete('/items/:itemId', authoriseMiddleware, validationMiddleware, itemsController.deleteItem)
        .put('/items/:itemId', authoriseMiddleware, validationMiddleware, itemsController.updateItem);
};

module.exports = initRoutes;
