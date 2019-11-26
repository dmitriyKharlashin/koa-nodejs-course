module.exports = async (ctx, next) => {
    if (ctx.headers.authorization !== 'admin') {
        ctx.body = {status: 'you not allowed'};
        ctx.status = 401;

        return;
    }

    await next();
};
