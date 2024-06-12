const { UserService } = require('../service');
const { Logger } = require('../util');

function isAuth(req, res, next) {
	const isAuth = req.cookies.isAuth == 'true' ? true : false;
	const isAdmin = req.cookies.isAdmin == 'true' ? true : false;
	const id = Number(req.cookies.userId) || null;
	res.locals.isAuth = isAuth;
	res.locals.isAdmin = isAdmin;
	res.locals.id = id;
	// Logger.info({ isAdmin, isAuth, id });
	if (isAuth === true || req.path == '/login' || req.path == '/signup') {
		next();
	} else {
		res.redirect('/login');
	}
}

function isAdmin(req, res, next) {
	const isAdmin = req.cookies.isAdmin == 'true' ? true : false;

	if (isAdmin) {
		next();
	} else {
		res.redirect('/');
	}
}

function postLogin(req, res) {
	const { username, password } = req.body;
	try {
		UserService.authenticateByUsername({ username, password }).then(
			({ isAuth = false, isAdmin, id = true }) => {
				console.log(id);
				isAdmin = isAdmin == 'on' ? true : false;
				 Logger.info({ isAdmin, isAuth, id });
				res.cookie('isAuth', isAuth, { httpOnly: true, maxAge: 43200000 });
				if (id) {
					res.cookie('isAdmin', isAdmin, {
						httpOnly: true,
						maxAge: 43200000,
					});
					res.cookie('userId', id, { httpOnly: true, maxAge: 43200000 });
				}
				res.redirect('/');
			}
		);
	} catch (error) {
		res.redirect('/login');
	}
}

function getLogin(req, res) {
	const isAuth = req.cookies.isAuth;
	if (isAuth == 'true') {
		res.redirect('/');
	} else {
		res.render('login');
	}
}

function postSingup(req, res) {
	const { username, password, isAdmin } = req.body;
	UserService.add({ username, password, isAdmin}).then(() => res.redirect('/'));
}

function getSignup(req, res) {
	const isAuth = req.cookies.isAuth;
	if (isAuth == 'true') {
		res.redirect('/');
	} else {
		res.render('signup');
	}
}

module.exports = {
	getLogin,
	getSignup,
	postLogin,
	postSingup,
	isAuth,
	isAdmin,
};
