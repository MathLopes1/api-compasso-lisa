const carRepository = require('../repository/carRepository.js');
const NotFound = require('../errors/http/notFound.js');
const ConflictError = require('../errors/others/conflictError.js');

class CarService {
  async create(payload) {
    try {
      const data = await carRepository.create(payload);
      return data;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new ConflictError(Object.keys(error.keyPattern).map((key) => key));
      } else {
        throw error;
      }
    }
  }

  async find(payload) {
    const data = await carRepository.find(payload);
    return data;
  }

  async findId(id) {
    const data = await carRepository.findId(id);
    if (data == null) throw new NotFound(id);
    return data;
  }

  async delete(id) {
    const data = await carRepository.delete(id);
    if (data == null) throw new NotFound(id);
    return data;
  }

  async update(id, payload) {
    const data = await carRepository.update(id, payload);
    if (data == null) throw new NotFound(id);
    return data;
  }

  async updateAccessorie(id, idAccessories, payload) {
    const data = await carRepository.updateAccessorie(id, idAccessories, payload);
    return data;
  }
}

module.exports = new CarService();
