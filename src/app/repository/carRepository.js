const carSchema = require('../schema/carSchema.js');

class CarRepository {
  async create(payload) {
    return carSchema.create(payload);
  }

  async find(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return carSchema.paginate(
      { ...query },
      {
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit)
      }
    );
  }

  async findId(id) {
    return carSchema.findById({ _id: id });
  }

  async delete(id) {
    return carSchema.findByIdAndDelete(id);
  }

  async update(id, payload) {
    return carSchema.findByIdAndUpdate(id, payload, { new: true });
  }

  async updateAccessorie(id, acessorioId, payload) {
    await carSchema.updateOne(
      { _id: id },
      { $set: { 'acessorios.$[outer].descricao': payload.descricao } },
      { arrayFilters: [{ 'outer._id': acessorioId }] }
    );
    return carSchema.findOne({ _id: id });
  }
}

module.exports = new CarRepository();
