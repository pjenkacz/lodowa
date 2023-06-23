https://devhints.io/knex

knex migrate:make --help
knex migrate:make initial_schema

To rollback all the completed migrations:
knex migrate:rollback --all

To run the next migration that has not yet been run:
knex migrate:up

To run the specified migration that has not yet been run:
knex migrate:up 001_migration_name.js

To undo the last migration that was run:
knex migrate:down

To undo the specified migration that was run:
knex migrate:down 001_migration_name.js