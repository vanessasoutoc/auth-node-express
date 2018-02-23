'use strict';

const repository = require('../repositories/user-repository');
const md5 = require('md5');

exports.create = async (req, res, next) => {
	console.log('user-controller create');
	try {
		await repository.create({
			name: req.body.name,
			email: req.body.email,
			password: md5(req.body.password + global.SALT_KEY),
			roles: req.body.roles
		});

		res.status(201).send({
			message: 'Usuário cadastrado com sucesso!'
		});
	} catch (e) {
		res.status(500).send({
			function: "create",
			error: e,
			message: 'Falha ao processar sua requisição!'
		});
	}
};