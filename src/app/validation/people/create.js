const Joi = require('joi').extend(require('@joi/date'));
const validateCpf = require('./validateCpf.js');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().required(),
      cpf: Joi.string().min(11).max(11).required().custom((value,help)=>{
        if(!validateCpf(value)){
          return help.message('Invalid cpf, enter a valid one');
        }else{
          return true;
        }
      }),
      data_nascimento: Joi.date().format('DD/MM/YYYY').less('2004-01-01').max('now').required(),
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required(),
      habilitado: Joi.string().required()
    });
    const { error } = await schema.validate(req.body, { abortEarl: true });
    if (error) throw new error;
    return next();
  }
  catch (error) {
    return res.status(400).json({
      'message': 'bad request',
      'details': [{ 'message': error.message }]
    });
  }
};