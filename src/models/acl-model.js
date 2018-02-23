'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	cod: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		unique: true,
		required: true
	},
	resources: [
		{
			cod: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			actions: [
				{
					type: String,
					default: "*",
					required: true
				}
			]
		}
	],
	rules: [
		{
			cod: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			value: {
				type: String,
				required: true
			}
		}
	],
	products: [
		{
			cod: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			modules: [
				{
					cod: {
						type: String,
						required: true
					},
					name: {
						type: String,
						required: true
					}
				}
			]
		}
	]
});

module.exports = mongoose.model('Acl', schema);