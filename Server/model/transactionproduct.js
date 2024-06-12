const { DataTypes } = require('sequelize');
const { DB } = require('../config');

const Product = require('./product');
const Transaction = require('./transaction');

const TransactionProduct = DB.sequelize.define(
	'transactionproduct',
	{
		quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
	},
	{
		timestamps: false,
	}
);

Product.belongsToMany(Transaction, { through: TransactionProduct });
Transaction.belongsToMany(Product, { through: TransactionProduct });

module.exports = TransactionProduct;
