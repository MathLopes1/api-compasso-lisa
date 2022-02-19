const authService = require('../service/authService.js');

class AuthenticateController {
  async authenticate(req, res) {
    const payload = req.body;
    try {
      const auth = await authService.findAuth(payload);
      return res.status(200).json(auth);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new AuthenticateController();
