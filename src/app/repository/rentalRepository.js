const rentalSchema = require('../schema/rentalSchema.js');

class RentalRepository {
  async create(payload) {
    return rentalSchema.create(payload);
  }

  async find(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return rentalSchema.paginate(
      { ...query },
      {
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit)
      }
    );
  }

  async findId(id) {
    return rentalSchema.findById(id);
  }

  async delete(id) {
    return rentalSchema.findByIdAndDelete(id);
  }

  async update(id, payload) {
    return rentalSchema.findByIdAndUpdate(id, payload, { new: true });
  }
}

module.exports = new RentalRepository();
