
exports.up = function(knex) {
  return knex.schema
  .createTable('auth', table => {
      table.increments();
      table.string('username', 164)
      .notNullable()
      .unique();
      table.string('email', 255)
      .notNullable()
      .unique();
      table.string('password', 164)
      .notNullable();
      table.string('company', 164);
      table.string('role', 164);
  })
  .createTable('events', table => {
      table.increments();
      table.string('name', 164)
      .notNullable();
      table.string('description', 500)
      .notNullable();
      table.datetime('datetime')
      .notNullable();
      table.integer('budget');
  })
  .createTable('todos', table => {
      table.increments();
      table.integer('event_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
      table.string('name', 255)
      .notNullable();
      table.boolean('completed')
      .notNullable()
      .defaultTo(0);
  })
  .createTable('vendors', table => {
      table.increments();
      table.string('name;, 264')
      .notNullable()
      .unique();
  })
  .createTable('events-vendors', table => {
      table.increments();
      table.integer('event_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
      table.integer('vendor_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropIfTableExists('events-vendors')
  .dropIfTableExists('vendors')
  .dropIfTableExists('todos')
  .dropIfTableExists('events')
  .dropIfTableExists('auth');
};
