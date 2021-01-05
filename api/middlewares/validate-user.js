// function validateUser(req, res, next) {
//   next();
// }

const Users = require('../users/users-modal');
// username must be in the db already for a user to login
const checkUsernameExists = async (req, res, next) => {
  try {
    const rows = await Users.findBy({ username: req.body.username });
    if (rows.length) {
      req.userData = rows[0];
      next();
    } else {
      res.status(401).json('the username does not exist');
    }
  } catch (err) {
    res.status(500).json('something failed');
  }
};
module.exports = {
  checkUsernameExists,
};
