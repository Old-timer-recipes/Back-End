const db = require('../../database/dbConfig');

module.exports = {
  add,
  remove,
  find,
  findBy,
  findById,
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}
async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return findById(id);
}
function remove(id) {
  return db('users').where({ id }).del();
}
function findById(id) {
  return db('users').where({ id }).first();
}
