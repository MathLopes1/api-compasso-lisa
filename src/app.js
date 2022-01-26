const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
require('./infra/database/mongo/index.js');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    router(this.server);
  }
}
module.exports = new App().server;

