const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const carSchema = mongoose.Schema({
  modelo: {
    type: String,
    required: true
  },
  cor: {
    type: String,
    required: true
  },
  ano: {
    type: String,
    required: true
  },
  acessorios: {
    type: Array,
    required: true
  },
  quantidadePassageiros: {
    type: Number,
    required: true,
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