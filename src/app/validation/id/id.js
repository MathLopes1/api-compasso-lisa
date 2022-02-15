const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const validate = Joi.object({id: Joi.string().min(24).max(24)});
    const { error } = await validate.validate(req.params, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      'description': error.details[0].path[0],
      'name':error.message
    });
  }
};