const { DataTypes } = require('sequelize');
const { DB } = require('../config');

const User = require('./user');

const Transaction = DB.sequelize.define(
	'transaction',
	{
		id: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(),
			primaryKey: true,
			autoIncrement: false,
		},
		cashier: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'id',
			},
		},
		total: DataTypes.FLOAT,
	},
	{
		timestamps: false,
	}
);

module.exports = Transaction;
