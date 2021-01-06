
exports.up = function(knex) {
    return knex.schema
        .createTable('recipes', tbl => {
            tbl.increments('recipe_id')
            tbl.text('recipe_title', 128).notNullable()
            tbl.text('from_kitchen_of', 128).nullable()
            tbl.text('category', 128).nullable()
            tbl.text('prep_time', 128).nullable()
            tbl.text('cook_time', 128).nullable()
            tbl.integer('servings').nullable()
            tbl.text('directions').notNullable()
        })
        .createTable('ingredients', tbl => {
            tbl.increments('ingredient_id')
            tbl.text('ingredient_name', 128).notNullable()
            tbl.text('ingredient_amount').notNullable()
            tbl.integer('recipe_id')
                .unsigned().notNullable()
                .references('recipe_id').inTable('recipes')
                .onDelete('RESTRICT').onUpdate('RESTRICT')
        })
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes')
};
