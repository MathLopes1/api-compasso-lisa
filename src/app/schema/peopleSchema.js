const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
  nome: {
    type: String,
    requerid: true
  },
  cpf: {
    type: String,
    requerid: true   
  },
  data_nascimentoo: {
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
    requerid: true
  },
  habilitado: {
    type: String, 
    enum: ['sim', 'não'],
    requerid: true
  }
});

peopleSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
  }
}); 

const People = mongoose.model('People', peopleSchema);
module.exports = People;
