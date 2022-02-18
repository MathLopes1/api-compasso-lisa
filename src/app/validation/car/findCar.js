const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
  try {
    const validation = Joi.object({
      modelo: Joi.string().min(5).max(25).trim(),
      cor: Joi.string().min(3).max(15).trim(),
      ano: Joi.date().format('YYYY').min('1950-01-01').max('2022-12-31'),
      acessorios: Joi.string().min(1).max(25).trim(),
      quantidadePassageiros: Joi.number().min(1).max(5)
    });
    const { error } = await validation.validate(req.query, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      description: error.details[0].path[0],
      name: error.message
    });
  }
};
