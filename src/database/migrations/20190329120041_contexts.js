const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('contexts', table => {
        table.increments();
        table.string('name').notNullable();
    });
};

exports.down = dropTable('contexts');
