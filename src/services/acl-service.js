'use strict';

const authService = require('../services/auth-service');
const aclRepository = require('../repositories/acl-repository');

exports.preFilter = (resource) => {
  return async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    try {
      // Decode Token para pegar as Roles
      const user = await authService.decodeToken(token);
      // Carrega ACL
      const ac = aclRepository.load();
      let permission = false;
      let possesion = 'any';

      const arrRoles = await getRoles(user);

      // Checa se a(s) role(s) do usuário tem permissão para o CRUD
      switch (req.method.toLowerCase()) {

        case 'get':
          if (ac.can(arrRoles).readAny(resource).granted ||
            ac.can(arrRoles).readOwn(resource).granted) {
            permission = true;
            possesion = ac.can(arrRoles).readAny(resource).granted ? 'any' : 'own';
          }
          break;

        case 'post':
          if (ac.can(arrRoles).createAny(resource).granted ||
            ac.can(arrRoles).createOwn(resource).granted) {
            permission = true;
            possesion = ac.can(arrRoles).createAny(resource).granted ? 'any' : 'own';
          }

          break;

        case 'update':
          if (ac.can(arrRoles).updateAny(resource).granted ||
            ac.can(arrRoles).updateOwn(resource).granted) {
            permission = true;
            possesion = ac.can(arrRoles).updateAny(resource).granted ? 'any' : 'own';
          }
          break;

        case 'delete':
          if (ac.can(arrRoles).deleteAny(resource).granted ||
            ac.can(arrRoles).deleteOwn(resource).granted) {
            permission = true;
            possesion = ac.can(arrRoles).deleteAny(resource).granted ? 'any' : 'own';
          }
          break;

        default:
          return res.status(401).send({
            message: 'Método não encontrado para autorizar o acesso ao recurso'
          });
      }

      if (permission) {
        // Pegar as regras de negócio
        // const rules = await getRules(user);
        // Incluir variável APP_ACL no request com a possesion e regras de negócio da role
        //  req.app_acl = {possesion: possesion, rules : rules};
        // Passa para o middleware controller
        return next();

      } else {
        return res.status(401).send({
          message: 'O recurso está bloqueado para este usuário / grupo'
        });
      }

    } catch (e) {
      return res.status(500).send({
        function: 'PreFilter',
        error: e,
        message: 'Falha ao processar sua requisição!'
      });
    }
  }
};

/* async function getRules(data) {
  var arrRules = [];
  // Loop para cada role
  for (let roles in data.roles) {
    // Buscar roles
    let arr = await aclRepository.readRule({
      role: data.roles[parseInt(role)]
    });
    arrRules.push(...arr.rules);
  }

  return JSON.parse(JSON.stringify(arrRules));
} */

async function getRoles(data) {

  data = await aclRepository.idRolesUser(data);

  var arrRoles = [];
  // Loop para cada role

  for (let role in data.roles) {
    // Buscar roles
    let obj = await aclRepository.readRole(data.roles[role].id);
    arrRoles.push(obj.name);
  }

  return JSON.parse(JSON.stringify(arrRoles));
}