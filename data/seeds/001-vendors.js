
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vendors').del()
    .then(function () {
      // Inserts seed entries
      return knex('vendors').insert([
        {id: 1, name: 'Fine Family Catering'},
        {id: 2, name: 'Your Local Security'},
      ]);
    });
};
