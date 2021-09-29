const knex = require('knex');

exports.up = function(knex) {
  return knex.schema.createTable('coins', (table) => {
    table.increments('id').primary();
    table.integer('value').unsigned().notNullable();
    table.boolean('underTransaction').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('coins');
};
