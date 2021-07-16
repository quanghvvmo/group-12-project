const moduleController = require('../controllers/module.controller');
const CheckExist = require('../middlewares/checkExist');
const express = require('express');
const moduleRouter = express();

moduleRouter.post('/modules', CheckExist.checkExistModule, moduleController.addNewModule);
moduleRouter.get('/modules', moduleController.getALlModule);
moduleRouter.patch('/modules/:id', moduleController.updateModule);
moduleRouter.patch('/modules/:id', moduleController.deleteModule);
moduleRouter.get('/modules/:id', moduleController.getModuleById);

module.exports = moduleRouter;