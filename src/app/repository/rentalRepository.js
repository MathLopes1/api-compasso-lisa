const rentalSchema = require('../schema/rentalSchema.js');

class RentalRepository {
  async create(payload){
    return rentalSchema.create(payload);
  }
  async find(payload) {
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Locadoras',
      page: 'offset',
      nextPage: false,
      prevPage: false,
      totalPages: 'offsets',
      pagingCounter: false,
      meta: false,
      hasPrevPage: false,
      hasNextPage: false
    };
    const options = {
      page: 1,
      limit: 100,
      customLabels: myCustomLabels
    };
    return rentalSchema.paginate(payload,options,{});
  }
  async findId(id) {
    return rentalSchema.findOne({ _id: id });
  }
  async delete(id) {
    return rentalSchema.deleteOne({ _id: id });
  }
}

module.exports = new RentalRepository;