const rentalController = require('../app/controller/rentalController.js');
const validateId = require('../app/validation/id/id.js');
const validateFind = require('../app/validation/rental/findRental.js');
const validateBody = require('../app/validation/rental/body.js');

module.exports = (server, routes, prefix = '/api/v1/rental') =>{
  routes.post('/', validateBody, rentalController.create);
  routes.get('/', validateFind, rentalController.find);
  routes.get('/:id', validateId, validateFind, rentalController.findId); 
  routes.delete('/:id', validateId, rentalController.delete); 
  routes.put('/:id', validateId, validateBody, rentalController.update);
  server.use(prefix, routes);
};