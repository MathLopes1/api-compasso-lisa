const peopleService = require('../service/peopleService.js');
const pagination = require('../utils/paginate/peoplePaginate.js');

class PeopleController {
  async create(req, res) {
    try {
      const data = await peopleService.create(req.body);
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
      const data = await peopleService.find(req.query);
      return res.status(200).json(pagination(data));
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
      await peopleService.delete({ _id: id });
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
      const updatedPeople = await peopleService.update(id, data);
      res.status(200).json(updatedPeople);
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
      const people = await peopleService.findId(id);
      return res.status(200).json({
        Pessoas: people
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new PeopleController();
