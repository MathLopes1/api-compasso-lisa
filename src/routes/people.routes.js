const PeopleController = require('../app/controller/peopleController.js');
const createValidation = require('../app/validation/people/create.js');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/',createValidation, PeopleController.create);
  server.use(prefix, routes);
};