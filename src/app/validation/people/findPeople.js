const Joi = require('joi').extend(require('@joi/date'));
const validateCpf = require('../../utils/validation/validateCpf.js');
const Enum = require('../../utils/Enums.js');
const Erros = require('../../utils/Error/Erros.js');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().min(3).max(40).trim(),
      cpf: Joi.string()
        .min(11)
        .max(11)
        .trim()
        .custom((value) => {
          if (!validateCpf(value)) {
            return Erros.badRequest(res, 'Invalid CPF');
          }
          return true;
        }),
      data_nascimento: Joi.date().format('DD/MM/YYYY').less('2004-01-01').max('now'),
      email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: Enum.email } }),
      senha: Joi.string().min(6).trim(),
      habilitado: Joi.string()
        .trim()
        .valid(...Object.values(Enum.Habilitado))
    });
    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      description: error.details[0].path[0],
      name: error.message
    });
  }
};
