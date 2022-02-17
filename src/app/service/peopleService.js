const peopleRepository = require('../repository/peopleRepository.js');
const formatCPF = require('../utils/functions/FormatCpf/formatCpf.js');
const NotFound = require('../errors/http/notFound.js');
const ConflicUtils = require('../errors/others/conflictUtils.js');
const ConflictError = require('../errors/others/conflictError.js');

class PeopleService {
  async create(payload) {
    try {
      await ConflicUtils.ConflicCpf(payload.cpf);
      await ConflicUtils.ConflicEmail(payload.email);
      const data = await peopleRepository.create(payload);
      const people = formatCPF(data);
      return people;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new ConflictError(Object.keys(error.keyPattern).map((key) => key));
      } else {
        throw error;
      }
    }
  }

  async find(payload) {
    const data = await peopleRepository.find(payload);
    return data;
  }

  async findId(id) {
    const data = await peopleRepository.findId(id);
    if (data == null) throw new NotFound(id);
    return data;
  }

  async delete(id) {
    const data = await peopleRepository.delete(id);
    if (data == null) throw new NotFound(id);
    return data;
  }

  async update(id, payload) {
    const result = await peopleRepository.update(id, payload);
    if (result == null) throw new NotFound(id);
    return result;
  }
}

module.exports = new PeopleService();
