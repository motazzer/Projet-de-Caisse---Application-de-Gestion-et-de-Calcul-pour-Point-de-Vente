const { UserService } = require('../service');
const { Logger } = require('../util');

function getUsers(req, res) {
	UserService.fetch().then((users) => {
		Logger.info({ users });
		res.locals.usersList = users;
		res.render('users');
	});
}

// function putUser(req, res) {
// 	const { user } = req.body;
// 	UserService.update(user).then(() => {
// 		res.redirect('profile');
// 	});
// }

function activateUser(req, res) {
	const { username } = req.body;
	UserService.activate(username).then(() => {
		res.redirect('user');
	});
}

function deleteUser(req, res) {
	const { username } = req.body;

	UserService.delete(username).then(() => {
		res.redirect('user');
	});
}

function postUser(req, res) {
	const { id, username, password, isAdmin } = req.body;
	UserService.add({ id, username, password, isAdmin }).then(() => {
		res.redirect('/');
	});
}

function getLogout(req, res) {
	res.clearCookie('isAuth');
	res.clearCookie('isAdmin');
	res.clearCookie('id');

	res.redirect('login');
}

module.exports = {
	getUsers,
	postUser,
	deleteUser,
	activateUser,
	getLogout,
	// putUser,
};
