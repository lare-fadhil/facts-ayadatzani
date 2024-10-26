
const Joi = require('@hapi/joi');
class ValidationForm {
    createValidation(reques) {
        const schema = Joi.object({
            add_fact_id: Joi.number().integer(),add_facts_text: Joi.string().required(),category_id: Joi.number().required(),add_fact_review: Joi.string().optional().allow(null,''),add_fact_date: Joi.date().optional().allow(null,''),
        });
        return schema.validate(reques)
    }
    updateValidation(reques) {
        const schema = Joi.object({
            add_fact_id: Joi.number().integer(),add_facts_text: Joi.string().required(),category_id: Joi.number().required(),add_fact_review: Joi.string().optional().allow(null,''),add_fact_date: Joi.date().optional().allow(null,''),
        });
        return schema.validate(reques)
    }
}
module.exports = new ValidationForm();
        