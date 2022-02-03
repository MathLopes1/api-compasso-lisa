const carService = require('../service/carService.js');
const Erros = require('../utils/Error/Erros.js');

class CarController {
  async create(req, res) {
    try {
      const data = await carService.create(req.body);
      return res.status(201).json(data);
    } 
    catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
  async find(req, res) {
    try {
      const data = await carService.find(req.query);
      return res.status(200).json(data);
    } 
    catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const car = await carService.findId({ _id: id });

      if (!car) {
        return Erros.notFound(res, 'Car not found');
      }
      await carService.delete({ _id: id });
      return res.status(204).json();
    } 
    catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
  async update(req, res) {

    const id = req.params.id;
    const data = req.body;
    try {
      const car = await carService.findId(id);
      if (!car) {
        return Erros.notFound(res, 'Car not Found');
      }
      const updatedCar = await carService.update(id, data);
      res.status(200).json(updatedCar);
    }
    catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
  async findId (req, res) {
    const { id } = req.params;
    try {
      const car = await carService.findId(id);
      if (!car) {
        if (!car) {
          return Erros.notFound(res, 'Car not Found');
        }
      }
      return res.status(200).json({
        'veiculos': car
      });
    } catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
}

module.exports = new CarController;