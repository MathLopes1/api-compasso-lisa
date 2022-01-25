const { Router } = require('express');
const carRouter = require('./car.routes.js');

module.exports = server => {
  server.use((req, res, next) => {
    carRouter(server, new Router());
    next();
  });
};