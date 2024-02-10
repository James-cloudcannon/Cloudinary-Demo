// const crypto = require('crypto');

module.exports = {
	excerpt: function(post) {
		const content = post.replace(/(<([^>]+)>)/gi, "");
		return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
	},

	uuid: function(name) {
		for (var s=''; s.length < 20; s += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random()*62|0));
		return name + "-" + s;
	},

	is_integer: function(i) {
		if (
			i === null ||
			i === undefined ||
			i === false ||
			i === ""   ) {
			return false;
		}
		return Number.isInteger(Number(i))
	},

	push_to_array: function(arr, el) {
		arr.push(el);
		return arr;
	}
};
