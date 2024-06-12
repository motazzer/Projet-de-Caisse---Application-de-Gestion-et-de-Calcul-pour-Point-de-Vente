const { DataTypes } = require('sequelize');
const { DB } = require('../config');

const Product = DB.sequelize.define(
	'product',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false,
		},
		name: { type: DataTypes.STRING, allowNull: false },
		category: { type: DataTypes.STRING, allowNull: false },
		price: { type: DataTypes.FLOAT, allowNull: false },
		quantity: { type: DataTypes.INTEGER, allowNull: false },
		isFavorite: { type: DataTypes.BOOLEAN, defaultValue: false },
	},
	{
		timestamps: false,
	}
);

module.exports = Product;
