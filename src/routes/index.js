const { Router } = require('express');
const carRouter = require('./car.routes.js');
const peopleRouter = require('./people.routes.js');
const authRouter = require('./auth.router');

module.exports = server => {
  server.use((req, res, next) => {
    carRouter(server, new Router());
    peopleRouter(server, new Router());
    authRouter(server, new Router());
    next();
  });
};