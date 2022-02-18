const bcrypt = require('bcryptjs');
const authService = require('../service/authService.js');
const Token = require('../utils/Auth/generateToken.js');
const Erros = require('../utils/Error/Erros.js');

class AuthenticateController {
  async authenticate(req, res) {
    const { email, senha } = req.body;
    try {
      const user = await authService.findAuth({ email });
      if (!user) {
        return Erros.notFound(res, 'User not found');
      }
      if (!(await bcrypt.compare(senha, user.senha))) {
        return Erros.invalidPassword(res, 'Invalid password, try again with valid password');
      }

      user.senha = undefined;

      const token = Token({ id: user.id });

      res.status(200).send({ user, token });
    } catch (error) {
      return Erros.badRequest(res, error.message);
    }
  }
}

module.exports = new AuthenticateController();
