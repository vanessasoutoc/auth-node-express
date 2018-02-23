'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	token: {
		type: String,
		unique: true,
		required: true
	},
	expireAt: {
		type: Date,
		required: true
	},
	revoked: {
		type: Boolean,
		default: false
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Auth', schema);