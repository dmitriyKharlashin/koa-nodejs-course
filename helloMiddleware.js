module.exports = async (ctx, next) => {
  console.log('Hello from middleware!');
  await next();
};
