'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

// Conecta ao banco
mongoose.connect(config.connectionString, { useMongoClient: true });

// Carrega os Models
const userModel = require('./models/user-model');
const authModel = require('./models/auth-model');
const aclModel = require('./models/acl-model');
const aclResourceMode = require('./models/acl-resource-model');
const aclRuleModel = require('./models/acl-rule-model');
const aclProductModel = require('./models/acl-product-model');
const aclProductModuleModel = require('./models/acl-product-module-model');

// Carrega ACL
const acl = require('./repositories/acl-repository');
acl.init();

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');
const aclRoute = require('./routes/acl-route');

// Parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Inclui as Rotas
app.use('/api', indexRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/acl', aclRoute);

module.exports = app;