const rentalSchema = require('../schema/rentalSchema.js');

class RentalRepository {
  async create(payload){
    return rentalSchema.create(payload);
  }
}

module.exports = new RentalRepository;