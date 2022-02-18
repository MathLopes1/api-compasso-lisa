const peopleSchema = require('../../schema/peopleSchema.js');
const rentalSchema = require('../../schema/rentalSchema.js');
const ConflicError = require('./conflictError.js');

class ConflicUtils {
  async ConflicEmail(email) {
    const getEmail = await peopleSchema.find({ email });
    if (getEmail.length > 0) throw new ConflicError(email);
  }

  async ConflicCpf(cpf) {
    const getCpf = await peopleSchema.find({ cpf });
    if (getCpf.length > 0) throw new ConflicError(cpf);
  }

  async ConflicCnpj(cnpj) {
    const getCnpj = await rentalSchema.find({ cnpj });
    if (getCnpj.length > 0) throw new ConflicError(cnpj);
  }

  async ConflicFilial(filial) {
    let count = 0;
    filial.forEach((body) => {
      if (!body.isFilial) {
        count += 1;
      }
      if (count > 1) throw new ConflicError('isFilial');
    });
  }
}

module.exports = new ConflicUtils();
