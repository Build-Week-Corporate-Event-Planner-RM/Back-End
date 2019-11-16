
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events-vendors').del()
    .then(function () {
      // Inserts seed entries
      return knex('events-vendors').insert([
        {id: 1, event_id: 1, vendor_id: 1},
        {id: 2, event_id: 1, vendor_id: 2},
        {id: 3, event_id: 2, vendor_id: 1}
      ]);
    });
};
