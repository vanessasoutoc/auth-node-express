'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');
const aclService = require('../services/acl-service');

router.post('/', /* authService.authorize, aclService.preFilter('USUARIO'), */ controller.create);
//router.post('/', controller.create);

module.exports = router;