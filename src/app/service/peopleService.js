const peopleRepository = require('../repository/peopleRepository.js');

class PeopleService {
  async create(payload){
    const data = await peopleRepository.create(payload);
    return data;
  }
}

module.exports = new PeopleService;