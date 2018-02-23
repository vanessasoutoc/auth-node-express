'use strict';

const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/auth-repository');
global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';

exports.generateToken = async (data) => {
	return jwt.sign(data, global.SALT_KEY);
}

exports.decodeToken = async (token) => {
	const data = await jwt.verify(token, global.SALT_KEY, {ignoreExpiration : true});
	return data;
}

exports.authorize = async (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
	
	if (!token) {
		res.status(401).send({
			message: 'Acesso Restrito'
		});
	} else {
		// Verifica Token
		jwt.verify(token, global.SALT_KEY, {ignoreExpiration : true}, async (error, decoded) => {
			
			// Valida Token
			if (error) {
				res.status(401).send({
					message: 'Token Inválido'
				});
			} else {
				
				try {
					// Buscar Token no banco
					const result = await authRepository.searchToken({
						token: token
					});

					// Verifica se o token existe
					if (!result) {
						res.status(401).send({
							message: 'Token não encontrado'
						});
						return;
					} else {
						// Atualiza data de expiração do Token
						await authRepository.updateExpireAt({
							token: token
						});
					}

					// Passa para o middleware de ACL
					next();
					
				} catch (e) {
					res.status(500).send({
						function: 'authorize',
						error: e, 
						 message: 'Falha ao processar sua requisição!'
					});
				}
			}
		});
	}
};