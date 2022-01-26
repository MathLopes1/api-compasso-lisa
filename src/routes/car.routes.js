const carController = require('../app/controller/carController');
const createValidation = require('../app/validation/car/create.js');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/',createValidation,carController.create);
    routes.get('/', carController.find);
    routes.delete('/:id', carController.delete)
    server.use(prefix, routes);
  };