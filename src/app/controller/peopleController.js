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
}

module.exports = new PeopleController;