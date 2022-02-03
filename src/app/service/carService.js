const carRepository = require('../repository/carRepository.js');

class CarService {
  async create(payload) {
    const data = await carRepository.create(payload);
    return data;
  }
  async find(payload) {
    const data = await carRepository.find(payload);
    return data;
  }
  async findId(id) {
    return carRepository.findId(id);
  }
  async delete(id) {
    const car = await carRepository.delete(id);
    return car;
  }
  async update(id, payload) {
    const data = await carRepository.update(id, payload);
    return data;
  }
}

module.exports = new CarService; 