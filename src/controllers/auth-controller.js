'use strict';

const authRepository = require('../repositories/auth-repository');
const authService = require('../services/auth-service');
const dateService = require('../services/date-service');
const md5 = require('md5');
global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';


exports.login = async (req, res, next) => {

	const role = [];
	try {
		// Efetuar Login
		const user = await authRepository.login({
			email: req.body.email,
			password: md5(req.body.password + global.SALT_KEY)
		});


		// Validar Login
		if (!user) {
			res.status(404).send({
				message: 'Usuário ou senha inválidos'
			});
			return;
		}

		// Gerar Token
		const token = await authService.generateToken({
			id: user._id,
			email: user.email,
			name: user.name,
			//roles: user.roles
		});

		// Salvar Token
		await authRepository.create({
			token: token,
			expireAt: dateService.getExpireAt(),
			userId: user._id
		});
	
		// Monta array de acls ids
		const roles = await authRepository.aclRole(user.roles);

		//returna os objetos acl em array
		const arAcls = await authRepository.aclsUser(roles);

		res.status(201).send({
			token: token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				roles: arAcls
			}
			
		});
	} catch (e) {
		res.status(500).send({
			function: "login",
			error: e,
			message: 'Falha ao processar sua requisição'
		});
	}
};