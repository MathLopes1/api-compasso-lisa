class Erros {
  notFound(res, menssage) {
    return res.status(404).json({
      'description': 'Not Found',
      'name': menssage
    });
  }
  badRequest(res, menssage) {
    return res.status(400).json({
      'description': 'Bad Request',
      'name': menssage
    });
  }
  invalidPassword(res, menssage) {
    return res.status(400).json({
      'description': 'Invalid password',
      'name': menssage
    });
  } 
  invalidCpf(res, menssage) {
    return res.status(400).json({
      'description': 'Conflict',
      'name': menssage
    });
  }  

}

module.exports = new Erros();