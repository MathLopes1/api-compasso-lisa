const rentalController = require('../app/controller/rentalController.js');

module.exports = (server, routes, prefix = '/api/v1/rental') =>{
  routes.post('/', rentalController.create);
  routes.get('/', rentalController.find);
  routes.get('/:id', rentalController.findId); 
  routes.delete('/:id', rentalController.delete); 
  server.use(prefix, routes);
};