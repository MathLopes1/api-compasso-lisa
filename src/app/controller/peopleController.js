const peopleService = require('../service/peopleService.js');
const NotFound = require('../utils/Error/notFound.js');

class PeopleController {
  async create(req, res){
    try {
      const data = await peopleService.create(req.body);
      return res.status(201).json(data);
    } 
    catch (error) {
      return res.status(400).json({
        'message': 'bad request',
        'details': [{ 'message': error.message }]
      });      
    }
  }
  async find(req, res) {
    try {
      const data = await peopleService.find(req.query);
      return res.status(200).json(data);
    } 
    catch (error) {
      return res.status(400).json({
        'message': 'bad request',
        'details': [{ 'message': error.message }]
      });
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const people = await peopleService.findId({ _id: id });

      if (!people) {
        throw new NotFound;
      }

      await peopleService.delete({ _id: id });
      return res.status(204).json();
    } 
    catch (error) {
      return res.status(400).json({
        'message': 'Bad request',
        'details': [{ 'message': error }]
      });
    }
  }
  async update(req, res) {

    const id = req.params.id;
    const data = req.body;
    try {
      const people = await peopleService.findId(id);
      if (!people) {
        throw new NotFound;
      }
      const updatedPeople = await peopleService.update(id, data);
      res.status(200).json(updatedPeople);
    }
    catch (error) {
      return res.status(400).json({
        'message': 'bad request',
        'details': [{ 'message': error.message }]
      });
    }
  }
  async findId (req, res) {
    const { id } = req.params;
    try {
      const people = await peopleService.findId(id);
      if (!people) {
        throw new NotFound;
      }
      return res.status(200).json({
        'veiculos': people
      });
    } catch (error) {
      return res.status(400).json({
        'message': 'bad request',
        'details': [{ 'message': error.message }]
      });
    }
  }      
}

module.exports = new PeopleController;