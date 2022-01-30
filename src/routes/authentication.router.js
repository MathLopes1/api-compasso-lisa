const authenticationController = require('../app/controller/authenticationController.js');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
  routes.post('/',authenticationController.authenticate);
  server.use(prefix, routes);
};