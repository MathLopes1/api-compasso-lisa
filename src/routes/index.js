const { Router } = require('express');
const carRouter = require('./features/car.routes.js');
const peopleRouter = require('./features/people.routes.js');
const authRouter = require('./features/auth.routes.js');
const rentalRouter = require('./features/rental.routes.js');
const swaggerRouter = require('./docs/sawgger.routes.js');

module.exports = (server) => {
  server.use((req, res, next) => {
    carRouter(server, new Router());
    peopleRouter(server, new Router());
    authRouter(server, new Router());
    rentalRouter(server, new Router());
    server.use(swaggerRouter, new Router());
    next();
  });
};
