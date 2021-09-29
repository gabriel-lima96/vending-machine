
exports.up = function(knex) {
    return knex.schema.createTable('products_inventory', (table) => {
        table.increments('id').primary();
        table.integer('price').unsigned().notNullable();
        table.string('type').notNullable();
        table.integer('quantity').unsigned().notNullable().defaultTo(0);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products_inventory');
};
