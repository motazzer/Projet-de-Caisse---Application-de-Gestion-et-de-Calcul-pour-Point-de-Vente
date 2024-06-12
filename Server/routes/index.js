const router = require('express').Router();

const authRouter = require('./auth');
const productRouter = require('./products');
const transactionRouter = require('./transactions');
const recipeRouter = require('./recipe');
const userRouter = require('./user');
const { isAuth, isAdmin } = require('../controller/auth');

router.use(isAuth);

router.get('/', (req, res) => {
	res.redirect('/products');
});

router.use('/', authRouter);

router.use('/products', productRouter);

router.use('/transaction', isAdmin, transactionRouter);

router.use('/recipe', isAdmin, recipeRouter);

router.use('/user', userRouter);

// router.use('*', (req, res) => {
// 	res.render('pageNotFound');
// });

module.exports = router;
