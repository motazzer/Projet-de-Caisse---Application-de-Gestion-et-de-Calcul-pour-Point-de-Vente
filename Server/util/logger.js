const colors = require('colors/safe');
const { time } = require('console');
const fs = require('fs');
const path = require('path');

function success(message) {
	console.log(colors.green(message));
}

function warn(message, error) {
	console.trace(colors.yellow(message), error.name);
}

function error(message, error) {
	console.trace(colors.red(message), error.name);
}

function longError(message, error) {
	console.trace(colors.red(message), error);
}

function info(message, ...data) {
	console.info(colors.blue(message), ...data);
}

function important(message, ...data) {
	console.log(colors.inverse(message), ...data);
}

function fileLog(message, file = 'LOGS/log.log', callback) {
	const dir = path.dirname(file);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	const data = new Date().toUTCString() + '\t' + message + '\n';
	fs.appendFile(file, data, (err) => {
		if (err) longError('Error wirting to log', err);
		if (callback) callback(data);
	});
}

module.exports = {
	success,
	warn,
	error,
	longError,
	info,
	important,
	fileLog,
};
