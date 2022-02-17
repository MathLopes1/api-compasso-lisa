const HttpError = require('./httpError');

class Unauthorized extends HttpError {
  constructor() {
    super();

    this.statusCode = 401;
    this.name = 'Unauthorized Token';
  }
}

module.exports = Unauthorized;
