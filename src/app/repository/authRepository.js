const peopleSchema = require('../schema/peopleSchema.js');

class AuthRepository {
  async findAuth(email) {
    return peopleSchema.findOne({ email });
  }
}
module.exports = new AuthRepository();
