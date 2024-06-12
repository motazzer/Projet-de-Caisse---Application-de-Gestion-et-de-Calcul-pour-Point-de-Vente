// AddProduct page

function deleteProduct(id) {
	const url = window.location.origin + '/products';
	const params = {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id: id }),
		method: 'DELETE',
	};
	fetch(url, params);
	window.location.reload();
}

function deleteUser(username) {
	const url = window.location.origin + '/user';
	const params = {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username: username }),
		method: 'DELETE',
	};
	fetch(url, params);
	window.location.reload();
}

function switchUserState(username) {
	const url = window.location.origin + '/user/activate';
	const params = {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username: username }),
		method: 'PUT',
	};
	fetch(url, params);
	window.location.reload();
}

function AddProduct({ id, quantity, name }) {
	console.log('inserting');
	const url = window.location.origin + '/product/insert';
	const params = {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ productId: id, quantity, name }),
		method: 'PUT',
	};
	fetch(url, params);
	window.location.reload();
}

function confirmTransaction() {
	const url = window.location.origin + '/products/confirm';
	const params = {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({}),
		method: 'POST',
	};
	fetch(url, params);
	window.location.reload();
}
