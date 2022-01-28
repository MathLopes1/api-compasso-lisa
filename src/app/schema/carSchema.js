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
    required: true
  }
});
carSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
  }
}); 

carSchema.plugin(mongoosePaginate);
const Car = mongoose.model('Veiculos', carSchema);
module.exports = Car;