const authController = require('../../app/controller/authController.js');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
  routes.post('/',authController.authenticate);
  server.use(prefix, routes);
};