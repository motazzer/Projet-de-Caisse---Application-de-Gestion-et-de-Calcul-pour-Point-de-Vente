const { TransactionService, RecipeService } = require('../service');
const { Logger } = require('../util');

function getTransactions(req, res) {
	const id = req.body.RecipeId;
	TransactionService.fetchPerDate(id).then((transactions) => {
		res.locals.transactionsList = transactions;
		res.render('transactions');
	});
}

function getTransaction(req, res) {
	const id = req.params.TransactionId;
	TransactionService.getProducts(id).then((products) => {
		res.locals.products = products;
		res.locals.transaction = id;
		res.render('transaction');
	});
}

function postCreateTransaction(req, res) {
	const products = req.body.productsList;
	const userId = req.cookies.userId;

	TransactionService.add({ cashier: userId, products }).then(() => {
		RecipeService.addTransactions().then(() => {
			res.redirect('transaction');
		});
	});
}

module.exports = {
	getTransactions,
	getTransaction,
	postCreateTransaction,
};
