const bcrypt = require('bcryptjs');
const authRepository = require('../repository/authRepository.js');
const Token = require('../utils/Auth/generateToken.js');
const NotFound = require('../errors/http/notFound.js');

class authService {
  async findAuth(payload) {
    const { senha } = payload;
    const people = await authRepository.findAuth(payload.email);
    if (!people) throw new NotFound('email');
    if (!(await bcrypt.compare(senha, people.senha)));
    const { email, habilitado } = people;
    const token = Token({ id: people.id });
    const response = { email, habilitado, token };
    return response;
  }
}

module.exports = new authService();
