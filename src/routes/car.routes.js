const carController = require('../app/controller/carController');
const validateBody = require('../app/validation/car/body.js');
const validateId = require('../app/validation/id/id.js');
const validateFind = require('../app/validation/car/findCar.js');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/',validateBody, carController.create);
  routes.get('/',validateFind, carController.find);
  routes.get('/:id',validateId, validateFind, carController.findId);
  routes.delete('/:id',validateId, carController.delete);
  routes.put('/:id',validateId, validateBody, carController.update);
  // routes.patch('/:id/acessorios/:id_accessories)',carController.updateAccessories);
  server.use(prefix, routes);
};