
exports.seed = function(knex) {
  return knex('recipes').insert([
    { recipe_id: 1,
      recipe_title: 'German Pancakes',
      from_kitchen_of: 'Grandma Lora Cox',
      category: 'breakfast',
      prep_time: '10 minutes',
      cook_time: '20 minutes',
      servings: 6,
      directions: 'Start by preheating oven to 425° Fahrenheit or 218° Celsius. Gather the recipe ingredients ensureing you have enough, and set aside.In a rectangle cake pan or pirex place cubed butter and place in the oven to melt. In a large bowl or blender mix the milk, flour, eggs, and salt. Carefully pour the ingredients into the butter pan. Bake for 20 minutes or until the edges are golden brown. Serve with syrup, cream, and or your favorite jam, enjoy. '
      },
  ]);
};