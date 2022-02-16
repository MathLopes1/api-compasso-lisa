const mongoose = require('mongoose');
require('dotenv/config');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const db = process.env.DATABASE || 'mongodb://127.0.0.1:27017/apilisa';
    return mongoose.connect(db).catch((error) => console.log(error));
  }
}

module.exports = new Database().connect();
