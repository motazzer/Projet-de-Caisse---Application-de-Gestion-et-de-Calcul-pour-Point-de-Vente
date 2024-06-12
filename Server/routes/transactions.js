const router = require('express').Router();

const {
	getTransactions,
	postCreateTransaction,
	getTransaction,
} = require('../controller/transaction');

router.get('/', getTransactions);

router.get('/:id', getTransaction);

router.post('/', postCreateTransaction);

module.exports = router;
