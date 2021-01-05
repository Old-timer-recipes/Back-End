const router = require('express').Router();
const restricted = require('../middlewares/restricted');

const Users = require('./users-modal');

// GET request to users endpoint
router.get('/', restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

// GET request to suers endpoint with a specified userID

router.get('/:id', (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'the data could not be retrieved' });
    });
});
