const { RecipeService } = require('../service');
const { convertDate } = require('../util');

function getRecipes(req, res) {
	RecipeService.fetch().then((recipes) => {
		res.locals.recipesList = recipes;
		res.render('recipes');
	});
}

function getRecipe(req, res) {
	const { recipeId } = req.body;

	RecipeService.find(recipeId).then((recipe) => {
		res.locals.recipeTotal = recipe.total;

		res.render('verifyRecipe');
	});
}

function getVerifyRecipe(req, res) {
	const date = new Date(Date.now());
	const recipeId = req.body.recipeId || convertDate.ToDateOnly(date);
	RecipeService.find(recipeId).then((recipe) => {
		if (recipe) {
			res.locals.recipeId = recipe.id;
			res.locals.total = recipe.total;
		}

		res.render('verifyRecipe');
	});
}

function postVerifyRecipe() {
	const { d1, d2, d5, d10, d20, d50, m50, m100, m200, m500 } = req.body;
	const date = new Date(Date.now());
	const recipeId = req.body.recipeId || convertDate.ToDateOnly(date);
	RecipeService.find(recipeId).then((recipe) => {
		if (recipe) {
			res.locals.recipeId = recipe.id;
			const recipeTotal = recipe.total;
			res.locals.total = recipeTotal;
			const total =
				d1 * 1 +
				d2 * 2 +
				d5 * 5 +
				d10 * 10 +
				d20 * 20 +
				d50 * 50 +
				m50 * 0.05 +
				m100 * 0.1 +
				m200 * 0.2 +
				m500 * 0.5;

			const diff = recipeTotal - total;
			res.locals.diff = diff;
		}
		res.render('verifyRecipe');
	});
}

module.exports = {
	getRecipes,
	getRecipe,
	getVerifyRecipe,
	postVerifyRecipe,
};
