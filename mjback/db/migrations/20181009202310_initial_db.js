
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('people', (table) => {
      table.increments('person_id').primary();
      table.string('full_name');
      table.string('email').unique();
      table.string('password_hash');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('journal_entries', (table) => {
      table.increments('entry_id').primary();
      table.string('title');
      table.text('encrypted_content');
      table.integer('entry_maker_id')
        .references('person_id')
        .inTable('people');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('online_resources', (table) => {
      table.increments('resource_id').primary();
      table.string('title');
      table.string('link');
      table.text('description');
      table.string('tags');

      table.timestamps(true, true);
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('counsellors'),
    knex.schema.dropTable('clients'),
    knex.schema.dropTable('journal_entries'),
    knex.schema.dropTable('online_resources')
  ])
};
