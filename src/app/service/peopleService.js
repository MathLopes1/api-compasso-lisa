const peopleRepository = require('../repository/peopleRepository.js');
const formatCPF = require('../utils/functions/FormatCpf/formatCpf.js');

class PeopleService {
  async create(payload){
    const Cpfvalidate = await peopleRepository.find({cpf:payload.cpf});
    if(Cpfvalidate.length > 0){
      throw new Error('CPF already exists');
    }
    const data = await peopleRepository.create(payload);
    const people = formatCPF(data);
    return people;
  }
  async find(payload) {
    const data = await peopleRepository.find(payload);
    return data;
  }
  async findId(id) {
    return peopleRepository.findId(id);
  } 
  async delete(id) {
    const people = await peopleRepository.delete(id);
    return people;
  } 
  async update(id, payload) {
    const data = await peopleRepository.update(id, payload);
    return data;
  }
}

module.exports = new PeopleService;