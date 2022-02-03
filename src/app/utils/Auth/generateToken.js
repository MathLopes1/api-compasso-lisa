const jwt = require('jsonwebtoken');
const md5 = require('../../config/auth.json');

function gerenateToken(params = {}) {
  return jwt.sign({ params }, md5.secret, {
    expiresIn: 86400,
  });
}

module.exports = gerenateToken;