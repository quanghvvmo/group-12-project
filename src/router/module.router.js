const moduleController = require('../controllers/module.controller');

const express = require('express');
const moduleRouter = express();

moduleRouter.post('/modules', moduleController.addNewModule);
moduleRouter.get('/modules', moduleController.getALlModule);
moduleRouter.put('/modules/:id', moduleController.updateModule);
moduleRouter.delete('/modules/:id', moduleController.deleteModule);
moduleRouter.get('/modules/:id', moduleController.getModuleById);

module.exports = moduleRouter;