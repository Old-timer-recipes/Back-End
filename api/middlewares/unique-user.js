// check the username, no duplicate usernames should be stored in db

const Users = require('../users/users-modal');
const checkUsernameUnique = async (req, res, next) => {
  try {
    const rows = await Users.findBy({ username: req.body.username });
    if (!rows.length) {
      next();
    } else {
      res
        .status(401)
        .json({ message: 'please register with a different username' });
    }
  } catch (err) {
    res.status(500).json('something failed');
  }
};
module.exports = {
  checkUsernameUnique,
};
