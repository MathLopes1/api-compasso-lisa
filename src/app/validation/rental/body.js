const Joi = require('joi');
const validateCnpj = require('../../utils/validation/validateCnpj.js');
const Erros = require('../../utils/Error/Erros.js');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim().min(3).max(20).required(),
      cnpj: Joi.string().trim().min(14).max(14).custom((value) => {
        if (!validateCnpj(value)) {
          return Erros.badRequest(res, 'Invalid CNPJ');
        }
        return true;
      }),
      atividades: Joi.string().min(5).max(40).trim().required(),
      endereco: Joi.array().min(1).unique('cep')
        .items(
          Joi.object({
            cep: Joi.string().min(8).max(8).trim().required(),
            number: Joi.string().min(1).trim().required(),
            complemento: Joi.string().min(5).max(40).trim(),
            isFilial: Joi.boolean().required()
          }))
    });
    const { error } = await schema.validate(req.body, { abortEarl: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      'description': error.details[0].path[0],
      'name':error.message
    });
  }
};