const moduleController = require('../controllers/module.controller');

const express = require('express');
const moduleRouter = express();

moduleRouter.post('/modules', moduleController.addNewModule);
moduleRouter.put('/modules/:id', moduleController.updateModule);
moduleRouter.delete('/modules/:id', moduleController.deleteModule);


module.exports = moduleRouter;