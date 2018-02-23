'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.create = async (data) => {
	console.log(data);
	const user = new User(data);
	await user.save();
}