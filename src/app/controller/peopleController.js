const peopleService = require('../service/peopleService.js');
const Erros = require('../utils/Error/Erros.js');

class PeopleController {
  async create(req, res){
    try {
      const data = await peopleService.create(req.body);
      return res.status(201).json(data);
    } 
    catch (error) {
      return Erros.badRequest(res, error.message); 
    }
  }
  async find(req, res) {
    try {
      const data = await peopleService.find(req.query);
      return res.status(200).json(data);
    } 
    catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const people = await peopleService.findId({ _id: id });

      if (!people) {
        return Erros.notFound(res, 'People not found');
      }

      await peopleService.delete({ _id: id });
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
      const people = await peopleService.findId(id);
      if (!people) {
        return Erros.badRequest(res, 'People not found');
      }
      const updatedPeople = await peopleService.update(id, data);
      res.status(200).json(updatedPeople);
    }
    catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
  async findId (req, res) {
    const { id } = req.params;
    try {
      const people = await peopleService.findId(id);
      if (!people) {
        return Erros.badRequest(res, 'People not found');
      }
      return res.status(200).json({
        'veiculos': people
      });
    } catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }      
}

module.exports = new PeopleController;