'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	roles: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Acl',
				required: true
			}
		}
	]
});

module.exports = mongoose.model('User', schema);