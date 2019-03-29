const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', table => {
        table.increments();
        table.text('description');
        table.text('notes');
        table.boolean('completed').defaultTo(false);
        fkey(table, 'project_id', 'projects');
    });
};

exports.down = dropTable('actions');
