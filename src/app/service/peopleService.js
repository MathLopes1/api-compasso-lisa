const peopleRepository = require('../repository/peopleRepository.js');

class PeopleService {
  async create(payload){
    const Cpfvalidate = await peopleRepository.find({cpf:payload.cpf});
    if(Cpfvalidate.length > 0){
      throw new Error('CPF already exists');
    }
    const data = await peopleRepository.create(payload);
    const people = this.formatCPF(data);
    return people;
  }
  async find(payload) {
    const data = await peopleRepository.find(payload);
    return data;
  }
  formatCPF(payload) {
    const cpf = payload.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    const people = Object.assign(payload, { cpf: cpf });
    return people;
  }
}

module.exports = new PeopleService;