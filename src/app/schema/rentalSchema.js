const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const rentalSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  cnpj: {
    type: String,
    required: true,
    minLength: 14,
    maxLength: 14
  },
  atividades: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 40
  },
  endereco: [
    {
      cep: {
        type: String,
        required: true
      },
      logradouro: {
        type: String
      },
      complemento: {
        type: String
      },
      number: {
        type: Number,
        required: true,
        minLength: 1
      },
      isFilial: {
        type: Boolean,
        required: true,
        default: false
      },
      bairro: {
        type: String
      },
      localidade: {
        type: String
      },
      uf: {
        type: String
      },
      _id: false
    }
  ]
});
rentalSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...rental } = this.toObject();
  return rental;
});

rentalSchema.plugin(mongoosePaginate);
const Rental = mongoose.model('Locadoras', rentalSchema);
module.exports = Rental;
