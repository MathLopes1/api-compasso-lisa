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
}

module.exports = new RentalController;

