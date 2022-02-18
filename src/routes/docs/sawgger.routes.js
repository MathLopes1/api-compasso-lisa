const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const LisaDocs = require('../../../lisa-documentation.json');

router.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(LisaDocs));

module.exports = router;
