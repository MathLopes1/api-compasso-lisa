class Erros {
  invalidPassword(res, menssage) {
    return res.status(400).json({
      description: 'Invalid password',
      name: menssage
    });
  }

  invalidCpf(res, menssage) {
    return res.status(400).json({
      description: 'Conflict',
      name: menssage
    });
  }
}

module.exports = new Erros();
