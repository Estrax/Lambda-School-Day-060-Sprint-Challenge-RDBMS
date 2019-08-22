exports.seed = function(knex, Promise) {
  return knex('actions').truncate()
    .then(function () {
      return knex('actions').insert([
        {id: 1, description: 'Do the thing with ID 1', notes: 'Notes for action 1', completed: false, project_id: 1},
        {id: 2, description: 'Do the thing with ID 2', notes: 'Notes for action 2', completed: false, project_id: 1},
        {id: 3, description: 'Do the thing with ID 3', notes: 'Notes for action 3', completed: false, project_id: 1},
        {id: 4, description: 'Do the thing with ID 4', notes: 'Notes for action 4', completed: false, project_id: 2},
        {id: 5, description: 'Do the thing with ID 5', notes: 'Notes for action 5', completed: false, project_id: 2},
        {id: 6, description: 'Do the thing with ID 6', notes: 'Notes for action 6', completed: false, project_id: 2},
        {id: 7, description: 'Do the thing with ID 7', notes: 'Notes for action 7', completed: false, project_id: 3},
        {id: 8, description: 'Do the thing with ID 8', notes: 'Notes for action 8', completed: false, project_id: 3},
        {id: 9, description: 'Do the thing with ID 9', notes: 'Notes for action 9', completed: false, project_id: 3}
      ]);
    });
};