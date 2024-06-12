const { User } = require('../model');
const { Logger } = require('../util');

async function addUser({ id, username, password, isAdmin }) {
	try {
		await User.create({ id, username, password, isAdmin, active : isAdmin == 'on' });
		Logger.success('User added successfully!');
	} catch (error) {
		Logger.error('Error adding user:\t', error);
	}
}

async function findUserByUsername(username) {
	try {
		const user = await User.findOne({
			raw: true,
			where: { username: username },
		});
		Logger.success(user);
		Logger.success('User found!');

		return user;
	} catch (error) {
		Logger.error('Error while searching for user:\t', error);
		return {};
	}
}

async function authenticateUserbyUsername({ username, password }) {
	try {
		const {
			username: DBusername,
			password: DBpassword,
			isAdmin,
			id,
			active,
		} = await findUserByUsername(username);
		console.log(DBusername,
			DBpassword,
			isAdmin,
			id,
			active,)
		if ((username == DBusername) & (password == DBpassword) & active) {
			return { isAuth: true, isAdmin, id };
		} else return { isAuth: false };
	} catch (error) {
		Logger.error('Error while authenticating user:\t', error);
		return { isAuth: false };
	}
}

async function activateUser(username) {
	try {
		const user = await findUserByUsername(username);
		Logger.info({ user });
		if (user.active == false) {
			await User.update({ active: true }, { where: { username } });
		} else {
			await User.update({ active: false }, { where: { username } });
		}

		Logger.success('User activated!');
	} catch (error) {
		Logger.longError('Error while activating user:\t', error);
	}
}

async function updateUser(user) {
	try {
		const oldUser = await findUserByUsername(user.username);
		await oldUser.update(user);

		Logger.success('User updated!');
	} catch (error) {
		Logger.error('Error while updating user:\t', error);
	}
}

async function deleteUser(username) {
	try {
		await User.destroy({ where: { username } });

		Logger.success('User deleted!');
	} catch (error) {
		Logger.error('Error while deleting user:\t', error);
	}
}

async function fetchUsers() {
	try {
		const users = await User.findAll({ raw: true });
		Logger.success('Users fetched successfully!');

		return users;
	} catch (error) {
		Logger.error('Error while fetching users: ', error);
		return [];
	}
}

function CheckRecipe({ d1, d2, d5, d10, d20, d50, m50, m100, m200, m500, b }, recipe) {
	let Total =
		d1 * 1 +
		d2 * 2 +
		d5 * 5 +
		d10 * 10 +
		d20 * 20 +
		d50 * 50 +
		m50 * 0.5 +
		m100 * 0.1 +
		m200 * 0.2 +
		m500 * 0.5 -
		b;

	if (Total == recipe) {
		return true;
	} else return false;
}

module.exports = {
	add: addUser,
	fetch: fetchUsers,
	findByUsername: findUserByUsername,
	activate: activateUser,
	update: updateUser,
	delete: deleteUser,
	authenticateByUsername: authenticateUserbyUsername,
	CheckRecipe: CheckRecipe,
};
