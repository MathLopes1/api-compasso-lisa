const rentalService = require('../service/rentalService.js');
const Erros = require('../utils/Error/Erros.js');
const axios = require('axios');

class RentalController {
  async create(req, res){
    const payload = req.body;
    try {
      const adress = payload.endereco.find(element =>
        element !== undefined
      );
      const { cep } = adress;

      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
      const { logradouro, bairro, localidade, uf } = data;

      Object.assign(adress, { logradouro: logradouro, bairro: bairro, localidade: localidade, uf: uf });
      const createRen = await rentalService.create(payload);

      return res.status(200).json(createRen);
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
  async delete(req, res) {
    try {
      const id = req.params.id;
      const rental = await rentalService.findId({ _id: id });

      if (!rental) {
        return Erros.notFound(res, 'rental company id not found');
      }

      await rentalService.delete({ _id: id });
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
      const rental = await rentalService.findId(id);
      if (!rental) {
        return Erros.badRequest(res, 'rental company id not found');
      }
      const updatedRental = await rentalService.update(id, data);
      res.status(200).json(updatedRental);
    }
    catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }   
}

module.exports = new RentalController;

