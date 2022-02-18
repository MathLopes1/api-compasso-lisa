const carController = require('../../app/controller/carController');
const validateBody = require('../../app/validation/car/body.js');
const validateId = require('../../app/validation/id/id.js');
const validateFind = require('../../app/validation/car/findCar.js');
const createToken = require('../../app/middlewares/bearerToken.js');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', createToken, validateBody, carController.create);
  routes.get('/', createToken, validateFind, carController.find);
  routes.get('/:id', createToken, validateId, validateFind, carController.findId);
  routes.delete('/:id', createToken, validateId, carController.delete);
  routes.put('/:id', createToken, validateId, validateBody, carController.update);
  routes.patch('/:id/acessorios/:id_accessories', createToken, carController.updateAccessories);
  server.use(prefix, routes);
};
