'use strict';

const aclRepository = require('../repositories/acl-repository');


exports.list = async (req, res, next) => {
	try {

		// Busca lista de ACL's
		const lst = await aclRepository.list();

		res.status(201).send(lst);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.listResources = async (req, res, next) => {
	try {

		// Busca lista de Recursos
		const lst = await aclRepository.listResources();

		res.status(201).send(lst);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.listRules = async (req, res, next) => {
	try {

		// Busca lista de Regras
		const lst = await aclRepository.listRules();

		res.status(201).send(lst);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.listProducts = async (req, res, next) => {
	try {

		// Busca lista de Produtos
		const lst = await aclRepository.listProducts();

		res.status(201).send(lst);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.listProductModules = async (req, res, next) => {
	try {

		// Busca lista de Produtos Módulos
		const lst = await aclRepository.listProductModules();

		res.status(201).send(lst);
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.create = async (req, res, next) => {
	try {

		const cod = req.body.cod;
		const name = req.body.name;
		const resources = req.body.resources;
		const rules = req.body.rules;
		const products = req.body.products;

		// Salvar ACL
		await aclRepository.create({
			cod: cod,
			name: name,
			resources: resources,
			rules: rules,
			products: products
		});

		res.status(201).send({
			message: 'Recurso criado com sucesso'
		});
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.createResource = async (req, res, next) => {
	try {

		const cod = req.body.cod;
		const name = req.body.name;

		await aclRepository.createResource({
			cod: cod,
			name: name,
		});

		res.status(201).send({
			message: 'Recurso criado com sucesso'
		});
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.createRule = async (req, res, next) => {
	try {

		const cod = req.body.cod;
		const name = req.body.name;
		const value = req.body.value;

		await aclRepository.createRule({
			cod: cod,
			name: name,
			value: value
		});

		res.status(201).send({
			message: 'Recurso criado com sucesso'
		});
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.createProduct = async (req, res, next) => {
	try {

		const cod = req.body.cod;
		const name = req.body.name;

		await aclRepository.createProduct({
			cod: cod,
			name: name,
		});

		res.status(201).send({
			message: 'Recurso criado com sucesso'
		});
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};

exports.createProductModule = async (req, res, next) => {
	try {

		const cod = req.body.cod;
		const name = req.body.name;
		const objProduct = req.body.objProduct;

		await aclRepository.createProductModule({
			cod: cod,
			name: name,
			objProduct: objProduct
		});

		res.status(201).send({
			message: 'Recurso criado com sucesso'
		});
	} catch (e) {
		res.status(500).send({
			message: 'Falha ao processar sua requisição'
		});
	}
};