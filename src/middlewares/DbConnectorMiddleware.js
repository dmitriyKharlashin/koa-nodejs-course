const DB = require('../initializers/db');

module.exports = async ({app}, next) => {
    app.db = new DB();

    await next();
};
