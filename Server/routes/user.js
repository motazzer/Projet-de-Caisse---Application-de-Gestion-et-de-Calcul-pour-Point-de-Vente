const {
	getUsers,
	postUser,
	// putUser,
	deleteUser,
	activateUser,
	// getLogout,
} = require('../controller/user');

const router = require('express').Router();

router.get('/', getUsers);

router.post('/', postUser);

router.put('/activate', activateUser);

// router.put('/', putUser);

router.delete('/', deleteUser);

module.exports = router;
