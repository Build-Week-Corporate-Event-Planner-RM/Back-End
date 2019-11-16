
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {id: 1, event_id: 1, name: 'Confirm guest speakers.', completed: 1},
        {id: 2, event_id: 1, name: 'Schedule security presence.', completed: 1},
        {id: 3, event_id: 2, name: 'Send invites out to all company employees.', completed: 0},
        {id: 4, event_id: 2, name: 'Confirm menu with catering company.', completed: 0},
        {id: 5, event_id: 3, name: 'Make sign up sheet and post around staff area.', completed: 0},
        {id: 6, event_id: 3, name: 'Create schedule for day of cookout.', completed: 0},
      ]);
    });
};
