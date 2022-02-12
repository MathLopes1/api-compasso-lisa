const express = require('express');
const router = require('../../src/routes/index.js');
require('./infra/database/mongo-test/index.js');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    router(this.server);
  }
}

module.exports = new App().server;