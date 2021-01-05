const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'you are not authorized without a token' });
  } else {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        res
          .status(401)
          .json({ message: 'token is invalid or cannot be verified' });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }
};
