function ToDateOnly(date) {
	const year = date.getUTCFullYear();
	const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
	const day = ('0' + date.getUTCDate()).slice(-2);

	const sqlDate = `${year}-${month}-${day}`;

	return sqlDate;
}

function ToDate(date) {
	const year = date.getUTCFullYear();
	const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
	const day = ('0' + date.getUTCDate()).slice(-2);
	const hours = ('0' + date.getHours()).slice(-2);
	const minutes = ('0' + date.getMinutes()).slice(-2);
	const seconds = ('0' + date.getSeconds()).slice(-2);

	const sqlDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

	return sqlDate;
}

module.exports = {
	ToDate,
	ToDateOnly,
};
