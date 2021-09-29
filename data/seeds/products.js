
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products_inventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('products_inventory').insert([
        {type: 'coke', price: 200, quantity: 5 },
        {type: 'chocolate', price: 150, quantity: 5 },
        {type: 'popcorn', price: 500, quantity: 5 },
      ]);
    });
};
