const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');

const peopleSchema = mongoose.Schema({
  nome: {
    type: String,
    requerid: true
  },
  cpf: {
    type: String,
    requerid: true   
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
    select: false
  },
  habilitado: {
    type: String, 
    enum: ['sim', 'não'],
    requerid: true
  }
});

peopleSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

peopleSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
  }
}); 

peopleSchema.plugin(mongoosePaginate);
const People = mongoose.model('People', peopleSchema);
module.exports = People;
