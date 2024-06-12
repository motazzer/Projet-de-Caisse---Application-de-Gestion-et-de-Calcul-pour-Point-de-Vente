const { DB } = require('../config');

const Recipe = require('./recipe');
const Transaction = require('./transaction');

const RecipeTransation = DB.sequelize.define(
	'recipetransation',
	{},
	{
		timestamps: false,
	}
);

Recipe.belongsToMany(Transaction, { through: RecipeTransation });
Transaction.hasOne(Recipe, { through: RecipeTransation });

module.exports = RecipeTransation;
