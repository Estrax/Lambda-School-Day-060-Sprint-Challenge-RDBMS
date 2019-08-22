exports.seed = function(knex, Promise) {
  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        {id: 1, name: 'First project', description: 'Description of first project', completed: false},
        {id: 2, name: 'Second project', description: 'Description of second project', completed: false},
        {id: 3, name: 'Third project', description: 'Description of third project', completed: false},
      ]);
    });
};