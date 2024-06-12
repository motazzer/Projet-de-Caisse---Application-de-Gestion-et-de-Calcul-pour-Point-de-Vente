const { Op } = require('sequelize');

const { Transaction, Product } = require('../model');
const { Logger, convertDate } = require('../util');

async function addTransaction({ cashier, products }) {
	try {
		const transaction = await Transaction.create({
			cashier: cashier,
		});

		await products.forEach(async (p) => {
			await transaction.addProducts(p.id, { through: { quantity: p.quantity } });
		});

		Logger.info({ transaction });
		Logger.success('Transaction created successfully!');

		return transaction;
	} catch (error) {
		Logger.longError('Error creating transaction:\t', error);
	}
}

async function fetchTransactions({ offset = 0, limit = 10 }) {
	try {
		const { count, rows: list } = await Transaction.findAndCountAll({
			raw: true,
			limit: limit,
			offset: offset,
		});

		Logger.success('Transactions found successfully!');

		list.forEach(async (t) => {
			await getTransactionTotal();
		});

		return { count, list };
	} catch (error) {
		Logger.error('Error fetching transaction:\t', error);
		return { count: 0, list: [] };
	}
}

async function fetchTransactionsPerDate(date) {
	date = convertDate.ToDateOnly(new Date(date || Date.now()));
	try {
		const transactions = await Transaction.findAll({
			where: {
				id: {
					[Op.startsWith]: date,
				},
			},
			raw: true,
		});
		transactions.forEach(async (t) => {
			await getTransactionTotal(t.id);
		});
		Logger.success('Transactions found successfully!');
		return transactions;
	} catch (error) {
		Logger.error('Error fetching transaction:\t', error);
		return [];
	}
}

async function fetchTransactionProducts(transactionId) {
	try {
		const products = await Transaction.findAll({
			where: { id: transactionId },
			include: {
				model: Product,
				through: { attributes: [['quantity', 'quantity']] },
			},
		});

		Logger.success('Products found successfully from transaction!');

		const list = JSON.parse(JSON.stringify(products))[0].products;

		return list;
	} catch (error) {
		Logger.error('Error fetching products from transaction:\t', error);
	}
}

async function getTransactionTotal(transactionId) {
	try {
		const products = await fetchTransactionProducts(transactionId);

		var total = 0;

		products.forEach((product) => {
			total =
				total +
				parseFloat(product.price, 10) *
					parseInt(product.transactionproduct.quantity, 10);
		});

		const transaction = await findTransaction();
		await Transaction.update({ total }, { where: { id: transaction.id } });

		Logger.success('Transaction total calculated successfully!');
	} catch (error) {
		Logger.longError('Error calculating transaction total:\t', error);
	}
}

async function findTransaction(id) {
	try {
		const transaction = await Transaction.findOne(
			{ raw: true },
			{ where: { id: id } }
		);

		Logger.success('Transaction found successfully!');

		return transaction;
	} catch (error) {
		Logger.error('Error fetching transaction:\t', error);
	}
}

module.exports = {
	add: addTransaction,
	fetch: fetchTransactions,
	fetchPerDate: fetchTransactionsPerDate,
	find: findTransaction,
	getProducts: fetchTransactionProducts,
	getTotal: getTransactionTotal,
};
