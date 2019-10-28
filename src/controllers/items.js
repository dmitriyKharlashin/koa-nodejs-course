const db = require('../db');

const itemsController = {
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
    const updatedItem = db.updateItem(
      Number(ctx.params.itemId),
      ctx.request.body
    );

    ctx.body = updatedItem;
    ctx.status = updatedItem ? 204 : 404;
  },
};

module.exports = itemsController;
