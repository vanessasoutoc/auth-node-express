'use strict';

const mongoose = require('mongoose');
const AccessControl = require('accesscontrol');
const Acl = mongoose.model('Acl');
const User = mongoose.model('User');
const AclResource = mongoose.model('AclResource');
const AclRule = mongoose.model('AclRule');
const AclProduct = mongoose.model('AclProduct');
const AclProductModule = mongoose.model('AclProductModule');

let ac = null;

// Inicializa ACL, consulta o banco e coloca em memória
exports.init = async () => {
	const lst = await loadFromBd();
	const lstObj = convertObjToAcl(lst);
	ac = new AccessControl(lstObj);
}

// Carrega o que está em memória
exports.load = () => {
	return ac;
}

// Cria ACL
exports.create = async (data) => {
	const acl = new Acl(data);
	await acl.save();
}

// Cria Recurso
exports.createResource = async (data) => {
	const aclResource = new AclResource(data);
	await aclResource.save();
}

// Cria Regra
exports.createRule = async (data) => {
	const aclRule = new AclRule(data);
	await aclRule.save();
}

// Cria Produto
exports.createProduct = async (data) => {
	const aclProduct = new AclProduct(data);
	await aclProduct.save();
}

// Cria Módulo do Produto
exports.createProductModule = async (data) => {
	const aclProductModule = new AclProductModule(data);
	await aclProductModule.save();
}

// Lista ACL's
exports.list = async () => {
	const res = await Acl.find({}, { '_id': false, 'resources._id': false, 'rules._id': false, 'products._id': false, 'products.modules._id': false, '__v': false });
	return res;
}

// Lista Recursos
exports.listResources = async () => {
	const res = await AclResource.find({}, { '_id': false, '__v': false });
	return res;
}

// Lista Regras
exports.listRules = async () => {
	const res = await AclRule.find({}, { '_id': false, '__v': false });
	return res;
}

// Lista Produtos
exports.listProducts = async () => {
	const res = await AclProduct.find({}, { '_id': false, '__v': false });
	return res;
}

// Lista Produtos Módulos
exports.listProductModules = async () => {
	const res = await AclProductModule.find({}, { '_id': false, '__v': false });
	return res;
}

/* exports.readRule = async (data) => {
	const res = await AclRule.findOne({role: data.role}, {'_id': false, 'rules': true});
	return res;
} */

exports.readRole = async (data) => {
	const res = await Acl.findOne({ _id: data }, { '_id': false });
	return JSON.parse(JSON.stringify(res));
}

exports.idRolesUser = async (data) => {
	const res = await User.findOne({ _id: data.id }, { '_id': false });
	return JSON.parse(JSON.stringify(res));
}


/*
	MÉTODOS PRIVADOS
*/

// Carrega ACL do banco
async function loadFromBd() {
	const res = await Acl.find({}, { '_id': false, 'resources._id': false, 'rules._id': false, 'products._id': false, 'products.modules._id': false, '__v': false });
	return res;
}

// Converter obj do banco para obj acl
function convertObjToAcl(data) {

	const arrRoles = JSON.parse(JSON.stringify(data));
	let arrAcl = [];

	// Para cada action é necessário inserir na array
	for (let role in arrRoles) {

		const arrResources = arrRoles[role].resources;

		for (let resource in arrResources) {

			const arrActions = arrResources[resource].actions;

			for (let action in arrActions) {

				let obj = {};
				obj.role = arrRoles[role].name;
				obj.resource = arrResources[resource].name;
				obj.action = arrActions[action] + ':any';
				obj.attributes = ['*'];

				arrAcl.push(obj);
			}
		}
	}

	return arrAcl;
}