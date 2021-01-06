const db = require('../../database/dbConfig');

module.exports = {
    getRecipes() {
        return db('recipes as r')
        .orderBy('recipe_title', 'asc')
    },
    async getRecipeById(id) {
        const ingredients = await db('ingredients')
        .where('recipe_id', id)
        .select('ingredient_amount', 'ingredient_name')
        .orderBy('ingredient_id', 'asc')
        const recipes = await db('recipes')
        .where('recipe_id', id).first()
        const allrecipes = {...recipes, ingredients}
        return allrecipes
    },
     async addRecipe(recipe, ingredients) {
        const [id] = await db('recipes').insert(recipe, 'recipe_id');
        const rec_id = {recipe_id: id};
        ingredients.forEach(ingredient => {
            const newIngredient = { ...ingredient, ...rec_id }
        db('ingredients').insert(newIngredient).then(() => {})
        })
        return recipe
    }     
} 