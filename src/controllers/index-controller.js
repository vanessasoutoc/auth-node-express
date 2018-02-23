'use strict';

// Raiz da API
exports.get = (req, res, next) => {
	res.status(200).send({
		title: "Bravo API",
		version: "0.0.1"
	});
};