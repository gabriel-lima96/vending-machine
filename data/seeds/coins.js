function generateCoins(value, howMany) {
  const arr = [];
  for(let i = 0; i < howMany; i++) {
    arr.push({
      value,
      underTransaction: false
    })
  }
  return arr;
}


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('coins').del()
    .then(function () {
      // Inserts seed entries
      return knex('coins').insert([
        ...generateCoins(1, 3),
        ...generateCoins(5, 3),
        ...generateCoins(10, 3),
        ...generateCoins(25, 3),
        ...generateCoins(50, 3),
        ...generateCoins(100, 3),
      ]);
    });
};
