const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const rentalSchema = mongoose.Schema({
  nome: {
    type:String,
    required:true
  },
  cnpj: {
    type:String,
    required:true
  },
  atividades: {
    type:String,
    required:true
  },
  endereco: [{
    cep: {
      type:String,
      required:true
    },
    number: {
      type:Number,
      required:true,
    },
    isFilial: {
      type:Boolean,
      required:true,
      default:false
    }
  }],
});
rentalSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...rental } = this.toObject();
  return rental;
});

rentalSchema.plugin(mongoosePaginate);
const Rental = mongoose.model('Locadoras', rentalSchema);
module.exports = Rental;