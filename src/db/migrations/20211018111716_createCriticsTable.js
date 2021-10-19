
exports.up = function(knex) {
  return knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary();
      table.string("preferred_name");
      table.string("surname");
      table.string("organization_name");
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("critics");
};
