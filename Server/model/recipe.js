const { DataTypes } = require('sequelize');
const { DB } = require('../config');

const Recipe = DB.sequelize.define(
	'recipe',
	{
		date: {
			type: DataTypes.DATEONLY,
			primaryKey: true,
			defaultValue: DataTypes.NOW,
		},
		total: { type: DataTypes.FLOAT },
	},
	{
		timestamps: false,
	}
);

module.exports = Recipe;
