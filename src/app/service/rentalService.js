const rentalRepository = require('../repository/rentalRepository.js');
const findCep = require('../utils/functions/FindCep/findCep.js');
const ConflictError = require('../errors/others/conflictError.js');
const NotFound = require('../errors/http/notFound.js');
const ConflicUtils = require('../errors/others/conflictUtils.js');

class RentalService {
  async create(payload, data) {
    await ConflicUtils.ConflicCnpj(payload.cnpj);
    await ConflicUtils.ConflicFilial(payload.endereco);

    try {
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
        i += 1;
      } while (i < payload.endereco.length);
      const result = await rentalRepository.create(payload, data);
      return result;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new ConflictError(Object.keys(error.keyPattern).map((key) => key));
      } else {
        throw error;
      }
    }
  }

  async find(payload) {
    const data = await rentalRepository.find(payload);
    return data;
  }

  async findId(id) {
    const data = await rentalRepository.findId(id);
    if (data == null) throw new NotFound(id);
    return data;
  }

  async delete(id) {
    const rental = await rentalRepository.delete(id);
    if (rental == null) throw new NotFound(id);
    return rental;
  }

  async update(id, payload) {
    await ConflicUtils.ConflicFilial(payload.endereco);
    const data = await rentalRepository.update(id, payload);
    return data;
  }
}

module.exports = new RentalService();
