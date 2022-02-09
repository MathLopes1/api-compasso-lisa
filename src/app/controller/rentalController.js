const rentalService = require('../service/rentalService.js');
const Erros = require('../utils/Error/Erros.js');

class RentalController {
  async create(req, res){
    try {
      const data = await rentalService.create(req.body); 
      return res.status(201).json(data);
    } catch (error) {
      return Erros.badRequest(res, error.message); 
    }
  }
  async find(req, res) {
    try {
      const data = await rentalService.find(req.query);
      return res.status(200).json(data);
    } 
    catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
  async findId(req, res) {
    const { id } = req.params;
    try {
      const rental = await rentalService.findId(id);
      if (!rental) {
        return Erros.badRequest(res, 'rental company id not found');
      }
      return res.status(200).json({
        'Locadoras': rental
      });
    } catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }    
}

module.exports = new RentalController;

