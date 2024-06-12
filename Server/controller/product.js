const { ProductService } = require('../service');
const { Logger } = require('../util');

function getProductsList(req, res, next) {
	ProductService.fetchAll().then((products) => {
		res.locals.productsList = products.list;
		// Logger.info({ products });
		next();
	});
}

function getAddProduct(req, res) {
	res.render('addProduct');
}

function postAddProduct(req, res) {
	const { id, name, category, price, quantity } = req.body;

	ProductService.add({ id, name, category, price, quantity }).then(() => {
		res.redirect('add');
	});
}

function getId(req, res, next) {
	const { productId } = req.body;
	if (productId) {
		ProductService.findById(productId).then((product) => {
			res.locals.productsList = [product];
			res.render('products');
		});
	} else {
		next();
	}
}

function getCategories(req, res, next) {
	ProductService.fetchCategories().then((categories) => {
		res.locals.categoriesList = categories.list;
		next();
	});
}

function getProducts(req, res) {
	ProductService.fetchAll().then((products) => {
		res.locals.productsList = products.list;
		res.locals.productsCount = products.count;
		res.render('products');
	});
}

function getCategory(req, res, next) {
	const category = req.query.category;
	Logger.info(req.query);

	if (category) {
		ProductService.findByCategory(category).then((products) => {
			res.locals.productsList = products.list;
			res.locals.productCount = products.count;
			res.locals.category = category;

			res.render('products');
		});
	} else {
		next();
	}
}

function getName(req, res, next) {
	const { productName } = req.query;

	if (productName) {
		ProductService.findByName(productName).then((products) => {
			res.locals.productsList = products.list;
			res.render('products');
		});
	} else {
		next();
	}
}

function getModifyProduct(req, res) {
	res.render('modifyProduct');
}

function putProduct(req, res) {
	const { oldId: productId, id, name, price, quantity, category } = req.body;
	// Logger.info({ productId, id, name, price, quantity, category });
	ProductService.update(productId, { id, name, price, quantity, category }).then(() => {
		res.redirect('modify');
	});
}

function insertProduct(req, res) {
	const { productId: id, name, quantity } = req.body;

	console.log({ id, name, quantity });

	var transactionProductsList = req.cookie.transactionProductsList;

	transactionProductsList.push({ id, name, quantity });

	res.sendCookie(transactionProductsList);
}

function deleteProduct(req, res) {
	// Logger.info(req.body);
	const productId = req.body.id;
	ProductService.remove(productId).then(() => {
		return 0;
	});
	return 1;
}

module.exports = {
	getProductsList,
	getAddProduct,
	getCategories,
	getCategory,
	getId,
	getName,
	getProducts,
	getModifyProduct,
	postAddProduct,
	putProduct,
	deleteProduct,
	insertProduct,
};
