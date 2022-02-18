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
    const people = await peopleRepository.findId(id);
    if (people == null) throw new NotFound(id);
    return people;
  }

  async delete(id) {
    const people = await peopleRepository.delete(id);
    if (people == null) throw new NotFound(id);
    return people;
  }

  async update(id, payload) {
    const people = await peopleRepository.update(id, payload);
    if (people == null) throw new NotFound(id);
    return people;
  }
}

module.exports = new PeopleService();
