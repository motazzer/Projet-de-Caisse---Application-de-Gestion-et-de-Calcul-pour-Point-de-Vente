const { DataTypes } = require('sequelize');
const { DB } = require('../config');

const User = DB.sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
		isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
		active: { type: DataTypes.BOOLEAN, defaultValue: false },
	},
	{
		timestamps: false,
	}
);

module.exports = User;
