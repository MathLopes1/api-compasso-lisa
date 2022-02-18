const express = require('express');
const cors = require('cors');
const router = require('./routes/index.js');
require('./infra/database/mongo/index.js');
const erroModify = require('./app/middlewares/erroModify.js');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.erroModify();
  }

  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    router(this.server);
  }

  erroModify() {
    this.server.use(erroModify);
  }
}

module.exports = new App().server;
