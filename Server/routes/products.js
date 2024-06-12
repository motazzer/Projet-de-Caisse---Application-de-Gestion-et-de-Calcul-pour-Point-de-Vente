const router = require('express').Router();

const { isAdmin } = require('../controller/auth');
const {
	getProducts,
	getAddProduct,
	getId,
	getCategory,
	getName,
	postAddProduct,
	putProduct,
	deleteProduct,
	getCategories,
	getModifyProduct,
	getProductsList,
	insertProduct,
} = require('../controller/product');

router.use(getCategories);

router.get('/', getId, getName, getCategory, getProducts);

router.get('/add', isAdmin, getProductsList, getAddProduct);

router.post('/add', isAdmin, postAddProduct);

router.get('/modify', isAdmin, getProductsList, getModifyProduct);

router.put('/modify', isAdmin, putProduct);

// router.get('/:id', getProduct);

router.delete('/', isAdmin, deleteProduct);

router.put('/insert', insertProduct);

module.exports = router;
