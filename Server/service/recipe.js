const { Transaction } = require('../model');
const { Recipe } = require('../model');
const { Logger, convertDate } = require('../util');
const { fetchPerDate } = require('./transaction');

async function addTransactionsToRecipe() {
	const date = convertDate.ToDateOnly(new Date(Date.now()));
	Logger.info({ date });
	try {
		const transactions = await fetchPerDate(date);
		Logger.info({ transactions });
		const recipe = await findRecipe(date);
		if (!recipe) {
			recipe = await Recipe.create();
		}
		getRecipeTotal(recipe.id);

		Logger.success('Added transactions to Recipe!');
	} catch (error) {
		Logger.longError('Error adding transactions to recipe: ', error);
	}
}

async function findRecipe(recipeId) {
	try {
		// await addTransactionsToRecipe(recipeId);
		const recipe = await Recipe.findOne({ raw: true }, { where: { id: recipeId } });

		Logger.success('Recipe found!');

		return recipe;
	} catch (error) {
		Logger.error('Error finding recipe: ', error);
		return null;
	}
}

async function fetchRecipeTransactions(recipeId) {
	try {
		const Transactions = await Recipe.findAll({
			where: { id: recipeId },
			include: {
				model: Transaction,
			},
		});

		Logger.success('Tansactions found successfully from recipe!');

		const list = JSON.parse(JSON.stringify(Transactions))[0].transactions;

		return list;
	} catch (error) {
		Logger.error('Error fetching transacions from recipe:\t', error);
	}
}

async function fetchRecipe() {
	try {
		const recipes = await Recipe.findAll({ raw: true });
		Logger.success('Recipes fetched successfully!');
		recipes.forEach(async (r) => {
			await getRecipeTotal(r.id);
		});
		return recipes;
	} catch (error) {
		Logger.error('Error fetching recipes: ', error);
		return [];
	}
}

async function getRecipeTotal(recipeId) {
	try {
		const transactions = await fetchRecipeTransactions(recipeId);
		const recipe = await findRecipe(recipeId);
		var Total = 0;
		transactions.forEach((t) => {
			Total += t.total;
		});
		await Recipe.update({ Total }, { where: { id: recipe.id } });
		Logger.success('Recipe total updated successfully!');
	} catch (error) {
		Logger.error('Error calculating recipe Total:\t', error);
	}
}

module.exports = {
	addTransactions: addTransactionsToRecipe,
	fetchTransactions: fetchRecipeTransactions,
	fetch: fetchRecipe,
	find: findRecipe,
	getTotal: getRecipeTotal,
};
