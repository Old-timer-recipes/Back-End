const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

// middlewares

const { checkUsernameUnique } = require('../middlewares/unique-user');
const { checkPayload } = require('../middlewares/user-schema');
const { checkUsernameExists } = require('../middlewares/validate-user');

const Users = require('../users/users-modal');
const { isValid } = require('../users/users-service');

// register
router.post('/register', checkPayload, checkUsernameUnique, (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = 10;

    //  hash the raw password
    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // adding the user credential to the database
    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } else {
    res
      .status(400)
      .json({ message: 'please provide valid username and password' });
  }
});

// login
router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
  const { username, password } = req.body;
  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        const token = TokenGenerator(user);
        if (user && bcrypt.compareSync(password, user.password)) {
          res
            .status(200)
            .json({ message: `Welcome back ${user.username}`, token });
        } else {
          res.status(401).json({ message: 'invalid credentials' });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: 'please provide username and password' });
  }
});

function TokenGenerator(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };
  const options = {
    expiresIn: '800s',
  };
  // token's been generated
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
