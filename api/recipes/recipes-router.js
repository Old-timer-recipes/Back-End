const router = require('express').Router();
const Recipes = require('./recipes-modal');

router.get('/', (req, res) => {
    Recipes.getRecipes()
        .then(recipes => {
            res.status(200).json(recipes)
        })
        .catch(e => {
            res.status(500).json({ message: 'failed to get recipes'})
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    Recipes.getRecipeById(id)
        .then(ingredients => {
            res.status(200).json(ingredients)
        })
        .catch(e => {
            res.status(500).json({ message: 'failed to get ingredients'})
        })
});

router.post('/', async (req, res) => {
    try {
    const recipe = req.body.recipe
    const ingredients = req.body.ingredients
    const data = await Recipes.addRecipe(recipe, ingredients)
        res.status(201).json({ message: 'Your recipe has been added.'})
    } catch (e) {
        res.status(500).json(e.message)
    }
});


module.exports = router;