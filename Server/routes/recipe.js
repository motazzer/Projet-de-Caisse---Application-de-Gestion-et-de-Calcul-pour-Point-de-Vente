const {
	getRecipes,
	getRecipe,
	getVerifyRecipe,
	postVerifyRecipe,
} = require('../controller/recipe');

const router = require('express').Router();

router.get('/', getRecipes);

router.get('/verify', getVerifyRecipe);

router.post('/verify', postVerifyRecipe);

router.get('/:id', getRecipe);

module.exports = router;
