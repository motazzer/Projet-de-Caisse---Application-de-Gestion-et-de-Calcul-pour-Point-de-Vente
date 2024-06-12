const { ProductService } = require('../service');

async function fetchProducts(req, res, next) {
	const { id, name, category } = req.query;
	if (id) {
		var products = await ProductService.findById(id);
	} else if (name) {
		var products = await ProductService.findByName(name);
	} else if (category) {
		var products = await ProductService.findByCategory(category);
	} else {
		var products = await ProductService.fetchAll();
	}
	req.products = products;
	if (next) {
		next();
	} else res.send(products);
}

module.exports = { fetchProducts };
