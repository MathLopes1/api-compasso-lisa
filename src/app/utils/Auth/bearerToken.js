const jwt = require('jsonwebtoken');
const auth = require('../../config/auth.json');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, auth.secret);
    req.client = decode;
    return next();
  } catch (error) {
    return res.status(401).send({ 
      description: 'Unauthorized', 
      message: 'Invalid login token'});
  }
};