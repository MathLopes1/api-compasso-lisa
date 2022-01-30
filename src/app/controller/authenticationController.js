const peopleSchema = require('../schema/peopleSchema.js');
const bcrypt = require('bcryptjs');
const Token = require('../utils/generateToken.js');

class AuthenticateController {
  async authenticate (req, res) {
    const { email, senha } = req.body;
    try {
      const user = await peopleSchema.findOne({ email }).select('+senha');
      if(!user){
        return res.status(400).send({error: 'User not found'});
      }
      if(!await bcrypt.compare(senha, user.senha)){
        return res.status(400).send({error: 'Invalid password'});
      }

      user.senha = undefined;
      
      const token = Token({id: user.id});
      
      res.send({user, token});        
    } catch (error) {{
      return res.status(400).json({
        'message': 'Bad request',
        'details': [{ 'message': error }]
      });
    }
    }
  }
}

module.exports = new AuthenticateController();