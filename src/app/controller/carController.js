const carService = require('../service/carService');

class CarController {
  async create(req, res) {
    try {
      const data = await carService.create(req.body);
      return res.status(201).json({
        'modelo': data.modelo,
        'cor': data.cor,
        'ano': data.ano,
        'acessorios': data.acessorios,
        'quantidadePassageiros': data.quantidadePassageiros
      });
    } catch (error) {
      return res.status(400).json({
        'message': 'bad request',
        'details': [{ 'message': error.message }]
      });
    }
  }
  async find(req, res) {
    try {
      const data = await carService.find();
      return res.status(200).json({
        'veiculos': data
      });
    } catch (error) {
      return res.status(400).json({
        'message': 'bad request',
        'details': [{ 'message': error.message }]
      });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const car = await carService.findId({ _id: id });

      if (!car) {
        return res.status(404).json({ message: 'Id not found' });
      }

      await carService.delete({ _id: id });
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({
        'message': 'Bad request',
        'details': [{ 'message': error }]
      });
    }
  }
}

module.exports = new CarController;