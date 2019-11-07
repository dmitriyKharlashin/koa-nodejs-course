module.exports = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(
    `MY MORGAN: ${ctx.method} ${ctx.originalUrl} ${
      ctx.response.status
    } ${ms} ms - ${ctx.response.header['content-length']}`
  );
};
