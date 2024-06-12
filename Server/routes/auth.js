const { getLogin, postLogin, getSignup, postSingup } = require('../controller/auth');
const { getLogout } = require('../controller/user');

const router = require('express').Router();

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/signup', getSignup);

router.post('/signup', postSingup);

router.get('/logout', getLogout);

module.exports = router;
