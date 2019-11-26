const itemsController = {
    async getItem(ctx, next) {
        const item = await ctx.app.db.getItem(ctx.params.itemId);
        ctx.body = item || {status: 'not found'};
        ctx.status = item ? 200 : 404;
    },
    async getItems(ctx, next) {
        ctx.body = await ctx.app.db.getItems();
    },
    async createItem(ctx, next) {
        ctx.body = await ctx.app.db.createItem(ctx.request.body);
        ctx.status = 201;
    },
    async deleteItem(ctx, next) {
        await ctx.app.db.deleteItem(ctx.params.itemId);
        ctx.body = '';
        ctx.status = 204;
    },
    async updateItem(ctx, next) {
        const itemId = ctx.params.itemId;
        const itemData = ctx.request.body;
        const updatedItem = await ctx.app.db.updateItem(itemId, itemData);

        ctx.body = updatedItem || {status: 'not found'};
        ctx.status = updatedItem ? 200 : 404;
    },
};

module.exports = itemsController;
