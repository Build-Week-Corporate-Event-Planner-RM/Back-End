
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, user_id: 1, name: 'React Conference 2019', description: 'This year’s conference features a mix of panels and talks set against the backdrop of beautiful Lake Las Vegas. In addition to a can’t-miss schedule, we’re organizing off-hour activities providing opportunities for relaxation, adventure, and getting to other React enthusiasts.', datetime: '2019-10-24 12:00:00', budget: 5000},
        {id: 2, user_id: 3, name: 'Facebook Christmas Party', description: 'Facebook\'s annual company-wide Christmas party! Food, events, and holiday fun for everyone.', datetime: '2019-12-12 17:00:00', budget: 1000},
        {id: 3, user_id: 2, name: 'Potluck Cookout', description: 'Cookout for the management and staff. Bring guests! BYOB and see sign up sheet for food signup and options!', datetime: '2020-05-16 13:00:00'},
      ]);
    });
};
