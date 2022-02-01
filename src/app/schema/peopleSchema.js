const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Enum = require('../utils/Enums.js');

const bcrypt = require('bcryptjs');

const peopleSchema = mongoose.Schema({
  nome: {
    type: String,
    requerid: true,
    minLength: 3,
    maxLength: 40
  },
  cpf: {
    type: String,
    requerid: true,
    minLength:11,
    maxLength: 11   
  },
  data_nascimento: {
    type: String,
    requerid: true
  },
  email: {
    type: String,
    requerid: true,
    unique: true
  },
  senha: {
    type: String,
    requerid: true,
    select: false,
    minLength: 6
  },
  habilitado: {
    type: String, 
    enum: Enum.Habilitado,
    requerid: true
  }
});

peopleSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

peopleSchema.method('toJSON', function () {
  /* eslint-disable no-unused-vars */
  const { __v, ...people } = this.toObject();
  return people;
}); 

peopleSchema.plugin(mongoosePaginate);
const People = mongoose.model('People', peopleSchema);
module.exports = People;
