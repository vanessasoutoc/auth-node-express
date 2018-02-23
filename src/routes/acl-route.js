'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/acl-controller');

router.get('/', controller.list);
router.get('/resources', controller.listResources);
router.get('/rules', controller.listRules);
router.get('/products', controller.listProducts);
router.get('/product-modules', controller.listProductModules);

router.post('/', controller.create);
router.post('/resource', controller.createResource);
router.post('/rule', controller.createRule);
router.post('/product', controller.createProduct);
router.post('/product-module', controller.createProductModule);

module.exports = router;