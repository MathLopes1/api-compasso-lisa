const carSchema = require('../schema/carSchema.js');

class CarRepository {
    async create(payload) {
        return carSchema.create(payload);
    };

    async find(payload) {
        return carSchema.find(payload);
    };

    async findId(id) {
        return carSchema.findOne({ _id: id });
      }

    async delete(id) {
        return carSchema.deleteOne({_id: id});
      }
};


module.exports = new CarRepository;