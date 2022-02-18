const axios = require('axios');

class CEP {
  async findCep(cep) {
    const result = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    return result.data;
  }
}
module.exports = new CEP();
