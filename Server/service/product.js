const { Op, Sequelize } = require('sequelize');
const { Product } = require('../model');
const { Logger } = require('../util');

async function addProduct({ id, name, category, price, quantity }) {
	try {
		await Product.create({ id, name, category, price, quantity });
		Logger.success('Product added successfully!');
	} catch (error) {
		Logger.error('Error adding product:\t', error);
	}
}

async function findProductsById(id, orderBy = 'name', DESC) {
	try {
		const product = await Product.findOne({
			raw: true,
			where: { id: id },
			order: [[orderBy, DESC ? 'DESC' : 'ASC']],
		});
		Logger.success('Products found!');

		return product;
	} catch (error) {
		Logger.longError('Error while searching for products:\t', error);
		return null;
	}
}

async function findProductsByCategory(category, orderBy = 'name', DESC) {
	try {
		const { count, rows: list } = await Product.findAndCountAll({
			raw: true,
			where: { category: { [Op.like]: '%' + category.trim() + '%' } },
			order: [[orderBy, DESC ? 'DESC' : 'ASC']],
		});
		Logger.success('Products found!');

		return { count, list };
	} catch (error) {
		Logger.error('Error while searching for products:\t', error);
		return { count: 0, list: [] };
	}
}

async function findProductsByName(name, orderBy = 'name', DESC) {
	try {
		const { count, rows: list } = await Product.findAndCountAll({
			raw: true,
			where: { name: { [Op.like]: '%' + name.trim() + '%' } },
			order: [[orderBy, DESC ? 'DESC' : 'ASC']],
		});
		Logger.success('Products found!');

		return { count, list };
	} catch (error) {
		Logger.error('Error while searching for products:\t', error);
		return { count: 0, list: [] };
	}
}

async function removeProduct(id) {
	try {
		await Product.destroy({ where: { id: id } });
		Logger.success('Product deleted!');
	} catch (error) {
		Logger.error('Error while deleting product:\t', error);
	}
}

async function updateProduct(id, product) {
	try {
		await Product.update(product, { where: { id: id } });
		Logger.success('Product modified!');
	} catch (error) {
		Logger.error('Error while modifying product:\t', error);
	}
}

async function fetchCategories() {
	try {
		const rows = await Product.findAll({
			raw: true,
			attributes: [
				[Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category'],
			],
		});
		Logger.success('Categories fetched!');

		let list = [];
		rows.forEach((row) => {
			list.push(row.category);
		});

		return { count: list.length, list };
	} catch (error) {
		Logger.error('Error while fetching categories:\t', error);

		return { count: 0, list: [] };
	}
}

async function findProducts(orderBy = 'name', DESC) {
	try {
		const { count, rows: list } = await Product.findAndCountAll({
			raw: true,
			order: [[orderBy, DESC ? 'DESC' : 'ASC']],
		});
		Logger.success('Products found!');

		return { count, list };
	} catch (error) {
		Logger.error('Error while searching for products:\t', error);
		return { count: 0, list: [] };
	}
}

async function countProducts() {
	try {
		const { count } = await Product.findAndCountAll({ raw: true });
		Logger.success('Products Counted!');
		return count;
	} catch (error) {
		Logger.error('Error while counting products:\t', error);
	}
}

module.exports = {
	add: addProduct,
	fetchAll: findProducts,
	findById: findProductsById,
	findByCategory: findProductsByCategory,
	findByName: findProductsByName,
	count: countProducts,
	remove: removeProduct,
	update: updateProduct,
	fetchCategories: fetchCategories,
};
