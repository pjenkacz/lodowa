const knexfile = require('../knexfile.js')
const knex = require('knex') 
const { Model } = require('objection')


function setupDb(){
    const db = knex(knexfile.development);

    Model.knex(db)
}

module.exports = setupDb