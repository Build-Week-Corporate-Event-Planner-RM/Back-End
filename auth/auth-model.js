const db = require('../data/dbConfig');

function find() {
  return db('auth').select('id', 'username', 'email', 'company', 'role');
}

function findBy(filter) {
  return db('auth').where(filter);
}

async function add(user) {
  const [id] = await db('auth').insert(user);
  return findById(id);
}

function findById(id) {
  return db('auth')
    .where({ id })
    .first();
}

function remove(id) {
  return db('auth')
  .where({ id })
  .first()
  .del();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
  };