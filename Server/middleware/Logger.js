const { fileLog } = require('../util/logger');

async function Logger(req, res, next) {
	const message = `method: ${req.method}\turl: ${
		req.baseUrl + req.path
	}\tquery: ${JSON.stringify(req.query)}\trequest body: ${JSON.stringify(req.body)}`;
	fileLog(message, 'LOG/server.log');

	if (next) next();
}

module.exports = Logger;
