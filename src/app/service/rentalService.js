/* eslint-disable no-plusplus */
const rentalRepository = require('../repository/rentalRepository.js');
const findCep = require('../utils/functions/FindCep/findCep.js');

class RentalService {
  async create(payload, data) {
    let i = 0;
    do {
      const Ceps = payload.endereco;
      const adress = Ceps[i];
      const data = await findCep.findCep(adress.cep);
      const { cep, logradouro, complemento, bairro, localidade, uf } = data;
      adress.cep = cep;
      adress.logradouro = logradouro;
      adress.complemento = complemento;
      adress.bairro = bairro;
      adress.localidade = localidade;
      adress.uf = uf;
      i++;
    } while (i < payload.endereco.length);
    const result = await rentalRepository.create(payload, data);
    return result;
  }

  async find(payload) {
    const data = await rentalRepository.find(payload);
    return data;
  }

  async findId(id) {
    return rentalRepository.findId(id);
  }

  async delete(id) {
    const rental = await rentalRepository.delete(id);
    return rental;
  }

  async update(id, payload) {
    const data = await rentalRepository.update(id, payload);
    return data;
  }
}

module.exports = new RentalService();
