const rentalRepository = require('../repository/rentalRepository.js');

class RentalService {
  async create(payload){
    const data = await rentalRepository.create(payload);
    return data;
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

module.exports = new RentalService;