const carRepository = require('../repository/carRepository.js')
class CarService{
    async create(payload){
      const data = await carRepository.create(payload);
      return data;
    }
}
module.exports = new CarService;