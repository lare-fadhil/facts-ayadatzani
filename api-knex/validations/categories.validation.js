
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            category_id: Joi.number().integer(),category_title: Joi.string().required(),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            category_id: Joi.number().integer(),category_title: Joi.string().required(),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        