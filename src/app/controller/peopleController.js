const peopleService = require('../service/peopleService.js');

class PeopleController {
  async create(req, res){
    try {
      const data = await peopleService.create(req.body);
      return res.status(201).json({
        'nome': data.nome,
        'cpf': data.cpf,
        'data_nascimento': data.data_nascimento,
        'email': data.email,
        'senha': data.senha,
        'habilitado': data.habilitado
      });
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
      return res.status(200).json({
        'Pessoas': data
      });
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
        return res.status(404).json({
          'message': 'Bad request',
          'details': [{ 'message': 'Id not found' }]
        });
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
}

module.exports = new PeopleController;