const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
  try {
    const validation = Joi.object({
      modelo: Joi.string().min(2).max(25),
      cor: Joi.string().min(2).max(25),
      ano: Joi.date().format('YYYY').min('1950-01-01').max('2022-12-31'),
      acessorios: Joi.string().min(2).max(25),
      quantidadePassageiros: Joi.number().min(1)
    });
    const { error } = await validation.validate(req.query, { abortEarl: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      'message': 'bad request',
      'details': [{ 'message': error.message }]
    });
  }
};