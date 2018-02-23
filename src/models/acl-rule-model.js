'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	cod: {
		type: String,
		required: true,
		unique: true
  },
	name: {
		type: String,
		required: true
  },
	value: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('AclRule', schema);