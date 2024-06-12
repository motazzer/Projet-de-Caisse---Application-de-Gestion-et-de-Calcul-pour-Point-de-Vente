const { Sequelize } = require('sequelize');
const { Logger } = require('../../util');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'DATA/caisse.sqlite',
});

async function DB_connect() {
	try {
		await sequelize.authenticate();
		Logger.success('Connection has been established successfully.');
	} catch (error) {
		Logger.error('Unable to connect to the database:', error);
	}
}

module.exports = {
	sequelize,
	DB_connect,
};
