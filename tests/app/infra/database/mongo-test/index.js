const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect('mongodb://127.0.0.1:27017/tests')
      .catch((error) => console.log(error));
  }
}

module.exports = new Database().connect();