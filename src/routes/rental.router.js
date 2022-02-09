const rentalController = require('../app/controller/rentalController.js');

module.exports = (server, routes, prefix = '/api/v1/rental') =>{
  routes.post('/', rentalController.create);

  server.use(prefix, routes);
};