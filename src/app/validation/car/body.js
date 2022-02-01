const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
  try {
    const validation = Joi.object({
      modelo: Joi.string().min(5).max(25).trim().required(),
      cor: Joi.string().min(3).max(15).required(),
      ano: Joi.date().format('YYYY').min('1950-01-01').max('2022-12-31').required(),
      acessorios: Joi.array().min(3).max(25).items(Joi.object({descricao: Joi.string().trim().required()})).required(),
      quantidadePassageiros: Joi.number().integer().min(1).max(5).required()
    });
    const { error } = await validation.validate(req.body, { abortEarl: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      'message': 'bad request',
      'details': [{ 'message': error.message }]
    });
  }
};