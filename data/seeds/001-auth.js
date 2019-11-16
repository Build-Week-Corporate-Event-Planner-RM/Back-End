
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auth').del()
    .then(function () {
      // Inserts seed entries
      return knex('auth').insert([
        {id: 1, username: 'emily', email: 'richard.emily.e@gmail.com', password: 'password', company: 'Lambda School', role: 'Student'},
        {id: 2, username: 'stephen', email: 'stephen@gmail.com', password: 'password', company: 'WalMart', role: 'Manager'},
        {id: 3, username: 'henry', email: 'henry@gmail.com', password: 'password', company: 'Facebook', role: 'Data Scientist'},
      ]);
    });
};
