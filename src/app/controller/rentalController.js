const rentalService = require('../service/rentalService.js');

class RentalController {
  async create(req, res) {
    const payload = req.body;
    try {
      const data = await rentalService.create(payload);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async find(req, res) {
    try {
      const data = await rentalService.find(req.query);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async findId(req, res) {
    const { id } = req.params;
    try {
      const rental = await rentalService.findId(id);
      return res.status(200).json({
        Locadoras: rental
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await rentalService.delete({ _id: id });
      return res.status(204).json();
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedRental = await rentalService.update(id, data);
      res.status(200).json(updatedRental);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new RentalController();
