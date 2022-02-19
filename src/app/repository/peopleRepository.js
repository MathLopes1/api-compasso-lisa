const peopleSchema = require('../schema/peopleSchema.js');

class PeopleRepository {
  async create(payload) {
    return peopleSchema.create(payload);
  }

  async find(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return peopleSchema.paginate(
      { ...query },
      {
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit)
      }
    );
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
