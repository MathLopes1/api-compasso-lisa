const Joi = require('joi');
const Erros = require('../../utils/Error/Erros.js');

module.exports = async (req, res, next) => {
  try {
    const validate = Joi.object({id: Joi.string().min(24).max(24)});
    const { error } = await validate.validate(req.params, { abortEarl: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return Erros.badRequest(res, error.message);
  }
};