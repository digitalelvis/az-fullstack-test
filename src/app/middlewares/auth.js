import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: true, message: 'Token not informed' });
  }

  //Pegando apenas o token authorization header
  const [, token] = authHeader.split(' ');
  
  // decodificando o token e coletando o id do usuário
  const decoded = jwt.verify(token, authConfig.secret);  
  const userId = decoded.id;

  try {
    jwt.verify(token, authConfig.secret, async (error, response) => {
      if (!error && response) {
        
        req.token = token;
        req.decoded = decoded;
        req.userId = userId;
        return next();
      } else {
        return res.status(401).json({ error: true, message: 'Invalid token' });
      }
    });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Invalid Token' });
  }
}