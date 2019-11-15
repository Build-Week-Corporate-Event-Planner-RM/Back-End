const knex = require('knex');
const config = require('../knexfile.js/index.js');

const environment = process.env.DB_ENV || 'development';

module.exports = knex(config[environment]);