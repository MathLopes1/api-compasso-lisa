const peopleSchema = require('../schema/peopleSchema.js');

class PeopleRepository {
  async create(payload) {
    return peopleSchema.create(payload);
  }

  async find(payload) {
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Pessoas',
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
    return peopleSchema.paginate(payload, options, {});
  }

  async findId(id) {
    return peopleSchema.findById(id);
  }

  async delete(id) {
    return peopleSchema.findByIdAndDelete(id);
  }

  async update(id, payload) {
    return peopleSchema.findByIdAndUpdate(id, payload, { new: true });
  }
}

module.exports = new PeopleRepository();
