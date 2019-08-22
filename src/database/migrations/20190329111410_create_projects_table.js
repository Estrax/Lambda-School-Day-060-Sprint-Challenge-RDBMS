const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', table => {
        table.increments();
        table.string('name').notNullable();
        table.text('description');
        table.boolean('completed').defaultTo(false);
    });
};

exports.down = dropTable('projects');