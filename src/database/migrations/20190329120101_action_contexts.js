const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('action_contexts', table => {
        table.increments();
        fkey(table, 'action_id', 'actions');
        fkey(table, 'context_id', 'contexts');
    });
};

exports.down = dropTable('action_contexts');
