exports.seed = function(knex, Promise) {
  return knex('action_contexts').truncate()
    .then(function () {
      return knex('action_contexts').insert([
        {id: 1, action_id: 1, context_id: 1},
        {id: 2, action_id: 2, context_id: 2},
        {id: 3, action_id: 3, context_id: 3},
        {id: 4, action_id: 4, context_id: 4},
        {id: 5, action_id: 5, context_id: 4},
        {id: 6, action_id: 6, context_id: 3},
        {id: 7, action_id: 7, context_id: 2},
        {id: 8, action_id: 8, context_id: 1},
        {id: 9, action_id: 9, context_id: 4},
        {id: 10, action_id: 9, context_id: 3},
        {id: 11, action_id: 1, context_id: 4},
        {id: 12, action_id: 3, context_id: 2},
        {id: 13, action_id: 7, context_id: 4}
      ]);
    });
};
