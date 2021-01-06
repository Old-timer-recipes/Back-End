
exports.seed = function(knex) {
  return knex('ingredients').insert([
    { ingredient_name: 'butter',
      ingredient_amount: '1 stick or 1/2 cup',
      recipe_id: 1},
    { ingredient_name: 'eggs',
      ingredient_amount: '6',
      recipe_id: 1},
    { ingredient_name: 'milk',
      ingredient_amount: '1 cup',
      recipe_id: 1},
    { ingredient_name: 'All-purpose flour',
      ingredient_amount: '1 cup',
      recipe_id: 1},
    { ingredient_name: 'salt',
      ingredient_amount: '1.2 tsp',
      recipe_id: 1},
  ]);
};
