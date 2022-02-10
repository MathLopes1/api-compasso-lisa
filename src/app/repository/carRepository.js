const carSchema = require('../schema/carSchema.js');

class CarRepository {
  async create(payload) {
    return carSchema.create(payload);
  }
  async find(payload) {
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Veiculos',
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
    return carSchema.paginate(payload,options,{});
  }
  async findId(id) {
    return carSchema.findOne({ _id: id });
  }
  async delete(id) {
    return carSchema.deleteOne({ _id: id });
  }
  async update(id, payload) {
    await carSchema.updateOne({ _id: id }, payload);
    return carSchema.findOne({ _id: id });
  }
  async updateAccessorie(id, acessorioId, payload) {
    await carSchema.updateOne({_id: id},
      { $set: {'acessorios.$[outer].descricao': payload.descricao} },
      { arrayFilters: [{'outer._id': acessorioId }] });
    return carSchema.findOne({_id: id});
  }
}

module.exports = new CarRepository;
