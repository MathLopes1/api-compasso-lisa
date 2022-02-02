class Erros {
  notFound(res, menssage) {
    return res.status(404).json({
      'message': 'Not Found',
      'details': menssage
    });
  }
  badRequest(res, menssage) {
    return res.status(400).json({
      'message': 'Bad Request',
      'details': menssage
    });
  }
  invalidPassword(res, menssage) {
    return res.status(400).json({
      'message': 'Invalid password',
      'details': menssage
    });
  }  

}

module.exports = new Erros();