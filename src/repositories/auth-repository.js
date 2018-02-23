'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Auth = mongoose.model('Auth');
const Acl = mongoose.model('Acl');
const dateService = require('../services/date-service');

exports.login = async (data) => {
	const roles = [];

	const res = await User.findOne({
		email: data.email,
		password: data.password
	});

	return res;
}

exports.create = async (data) => {
	const auth = new Auth(data);
	await auth.save();
}

exports.searchToken = async (data) => {
	const res = await Auth.findOne({
		token: data.token,
		revoked: false
	});
	return res;
}

exports.aclRole = async (data) => {
	const rolesId = [];
	for (let role of data) {

		rolesId.push(role.id);
	}

	return rolesId;
}

exports.aclsUser = async (data) => {
	const res = await Acl.find({
		_id: {$in: data}
	})
	return res;
}

exports.updateExpireAt = async (data) => {
	await Auth
		.findOneAndUpdate({ token: data.token }, {
			$set: {
				expireAt: dateService.getExpireAt()
			}
		});
}