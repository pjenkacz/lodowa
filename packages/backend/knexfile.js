/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config()


module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './database/migrations'
    },
    seeds: {
      tableName: 'seeds',
      directory: './database/seeds'
    }
  }
};
