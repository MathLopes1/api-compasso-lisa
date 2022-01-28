const peopleSchema = require('../schema/peopleSchema.js');

class PeopleRepository {
  async create(payload) {
    return peopleSchema.create(payload);
  }
  async find(payload) {
    return peopleSchema.find(payload);
  }
  async findId(id) {
    return peopleSchema.findOne({ _id: id });
  }
  async delete(id) {
    return peopleSchema.deleteOne({ _id: id });
  }
  async update(id, payload) {
    await peopleSchema.updateOne({ _id: id }, payload);
    return peopleSchema.findOne({ _id: id });
  }
}

module.exports = new PeopleRepository;