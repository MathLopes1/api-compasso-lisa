const jwt = require('jsonwebtoken');
const authI = require('../../config/auth.json');

module.exports = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    if(!token) 
      return res.status(401).send('Unauthorized access');
    const compare = jwt.verify(token, authI.secret);
    req.client = compare;
    return next();
  } catch (error) {
    return res.status(401).send({ 
      description: 'Unauthorized', 
      message: 'Invalid login token'});
  }
};