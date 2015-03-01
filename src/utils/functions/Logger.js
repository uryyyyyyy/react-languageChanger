'use strict';

export default {
	info(message, title) {
		alert(`${title} : ${message}`);
	},
	debug(obj) {
		console.debug(obj);
	},
	error(message, title) {
		alert(`${title} : ${message}`);
	},
	networkError(obj) {
		console.log(obj);
		throw Error('network error');
	},
	success(message, title) {
		alert(`${title} : ${message}`);
	}
}
