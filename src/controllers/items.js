const LIVR = require('livr');

const db = require('../initializers/db');

LIVR.Validator.defaultAutoTrim(true);

const itemsController = {
  getItem(ctx, next) {
    const item = db.getItem(Number(ctx.params.itemId));
    ctx.body = item || { status: 'not found' };
    ctx.status = item ? 200 : 404;
  },
  getItems(ctx, next) {
    ctx.body = db.getItems();
  },
  createItem(ctx, next) {
    if (ctx.headers.authorization === 'admin') {
      ctx.body = db.writeItem(null, ctx.request.body);
      ctx.status = 201;
    } else {
      ctx.body = { status: 'you not allowed' };
      ctx.status = 401;
    }
  },
  deleteItem(ctx, next) {
    db.deleteItem(Number(ctx.params.itemId));
    ctx.body = '';
    ctx.status = 204;
  },
  updateItem(ctx, next) {
    const validator = new LIVR.Validator({
      itemId: 'positive_integer',
    });
    const itemId = Number(ctx.params.itemId);
    const itemData = ctx.request.body;

    const validData = validator.validate({ itemId });

    if (!validData) {
      ctx.body = validator.getErrors();
      ctx.status = 400;
      return;
    }

    const updatedItem = db.updateItem(itemId, itemData);

    ctx.body = updatedItem || { status: 'not found' };
    ctx.status = updatedItem ? 204 : 404;
  },
};

module.exports = itemsController;
