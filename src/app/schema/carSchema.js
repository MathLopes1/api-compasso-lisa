const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const carSchema = mongoose.Schema({
  modelo: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 25
  },
  cor: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15    
  },
  ano: {
    type: String,
    required: true,
  },
  acessorios: {
    type: Array,
    required: true,
    minLength: 3,
    maxLength: 25      
  },
  quantidadePassageiros: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 5
  }
});
carSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...car } = this.toObject();
  return car;
});

carSchema.plugin(mongoosePaginate);
const Car = mongoose.model('Veiculos', carSchema);
module.exports = Car;