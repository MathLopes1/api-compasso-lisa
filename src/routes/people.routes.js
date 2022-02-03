const PeopleController = require('../app/controller/peopleController.js');
const validateBody = require('../app/validation/people/body.js');
const validateFind = require('../app/validation/people/findPeople.js');
const validateId = require('../app/validation/id/id.js');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/',validateBody, PeopleController.create);
  routes.get('/',validateFind, PeopleController.find);
  routes.get('/:id',validateId, validateFind, PeopleController.findId);
  routes.delete('/:id',validateId, PeopleController.delete);
  routes.put('/:id',validateId, validateBody ,PeopleController.update);
  server.use(prefix, routes);
};