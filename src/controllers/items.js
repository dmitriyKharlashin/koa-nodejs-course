const LIVR = require('livr');

LIVR.Validator.defaultAutoTrim(true);
const dataValidation = itemData => {
  const validator = new LIVR.Validator({
    price: 'positive_integer',
    name: ['required', { max_length: 255 }],
  });

  return validator.validate(itemData);
};

const itemsController = {
  async getItem(ctx, next) {
    const item = await ctx.app.db.getItem(ctx.params.itemId);
    ctx.body = item || { status: 'not found' };
    ctx.status = item ? 200 : 404;
  },
  async getItems(ctx, next) {
    ctx.body = await ctx.app.db.getItems();
  },
  async createItem(ctx, next) {
    if (ctx.headers.authorization !== 'admin') {
      ctx.body = { status: 'you not allowed' };
      ctx.status = 401;
      return;
    }

    const itemData = ctx.request.body;
    if (!dataValidation(itemData)) {
      ctx.body = validator.getErrors();
      ctx.status = 400;
      return;
    }

    ctx.body = await ctx.app.db.createItem(ctx.request.body);
    ctx.status = 201;
  },
  async deleteItem(ctx, next) {
    if (ctx.headers.authorization !== 'admin') {
      ctx.body = { status: 'you not allowed' };
      ctx.status = 401;
      return;
    }

    await ctx.app.db.deleteItem(ctx.params.itemId);
    ctx.body = '';
    ctx.status = 204;
  },
  async updateItem(ctx, next) {
    if (ctx.headers.authorization !== 'admin') {
      ctx.body = { status: 'you not allowed' };
      ctx.status = 401;
      return;
    }

    const itemId = ctx.params.itemId;
    const itemData = ctx.request.body;

    if (!dataValidation(itemData)) {
      ctx.body = validator.getErrors();
      ctx.status = 400;
      return;
    }

    const updatedItem = await ctx.app.db.updateItem(itemId, itemData);

    ctx.body = updatedItem || { status: 'not found' };
    ctx.status = updatedItem ? 204 : 404;
  },
};

module.exports = itemsController;
