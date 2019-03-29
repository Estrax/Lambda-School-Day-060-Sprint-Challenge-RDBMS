exports.seed = function(knex, Promise) {
  return knex('contexts').truncate()
    .then(function () {
      return knex('contexts').insert([
        {id: 1, name: 'at work'},
        {id: 2, name: 'at home'},
        {id: 3, name: 'at computer'},
        {id: 4, name: 'online'},
      ]);
    });
};