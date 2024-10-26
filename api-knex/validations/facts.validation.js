
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            fact_id: Joi.number().integer(),fact_text: Joi.string().required(),category_id: Joi.number().required(),fact_date: Joi.date().optional().allow(null,''),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            fact_id: Joi.number().integer(),fact_text: Joi.string().required(),category_id: Joi.number().required(),fact_date: Joi.date().optional().allow(null,''),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        