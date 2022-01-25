const carSchema = require('../schema/carSchema.js');

class CarRepository {
    async create(payload) {
        return carSchema.create(payload);
    };
}

module.exports = new CarRepository;