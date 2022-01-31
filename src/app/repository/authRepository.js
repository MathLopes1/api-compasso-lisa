const peopleSchema = require('../schema/peopleSchema.js');

class AuthRepository {
  async findAuth(payload){
    return await peopleSchema.findOne(payload).select('+senha');
  }
}
module.exports = new AuthRepository; 