const db = require('../data/dbConfig');

function find() {
    return db('events')
    .select('id')
}