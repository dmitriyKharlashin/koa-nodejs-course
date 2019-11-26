const LIVR = require('livr');
const array_get = require('lodash/get');

LIVR.Validator.defaultAutoTrim(true);

module.exports = validationRules => {
    return async (ctx, next) => {
        const rules = array_get(validationRules, [ctx._matchedRoute, ctx.request.method]);

        if (rules && rules.params) {
            const validator = new LIVR.Validator(rules.params);
            if (!validator.validate({
                ...ctx.params
            })) {
                ctx.body = validator.getErrors();
                ctx.status = 400;
                return;
            }
        }
        if (rules && rules.body) {
            const validator = new LIVR.Validator(rules.body);
            if (!validator.validate({
                ...ctx.request.body
            })) {
                ctx.body = validator.getErrors();
                ctx.status = 400;
                return;
            }
        }

        await next();
    }
};
