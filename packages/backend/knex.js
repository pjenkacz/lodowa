const environment = process.env.MODE || 'development';
const config = require('./knexfile.js')[environment];
module.exports = require('knex')(config);