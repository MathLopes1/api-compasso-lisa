const authRepository = require('../repository/authRepository.js');

class authService{  
  async findAuth(payload){
    return await authRepository.findAuth(payload);
  }
}

module.exports = new authService;