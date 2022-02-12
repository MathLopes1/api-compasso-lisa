/*const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../lisa-documentation.json');

module.exports = (server, routes, prefix = '/api/v1/') =>{
  routes.get('api-docs', swaggerUi.setup(swaggerDocument));
  routes.use('api-docs', swaggerUi.serve);
  server.use(prefix, routes);
};*/