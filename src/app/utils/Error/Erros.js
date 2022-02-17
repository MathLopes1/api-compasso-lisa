class Erros {
  invalidPassword(res, menssage) {
    return res.status(400).json({
      description: 'Invalid password',
      name: menssage
    });
  }
}

module.exports = new Erros();
