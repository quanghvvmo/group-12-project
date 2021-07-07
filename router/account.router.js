const accountController = require('../controllers/account.controller');
const authController = require('../controllers/auth.controller');
const express = require('express');
const accountRouter = express.Router();

accountRouter.post('/accounts', accountController.addNewAccount);
accountRouter.put('/accounts/:id', accountController.updateAccount)

accountRouter.delete('/accounts/:id', accountController.deleteAccount)
accountRouter.post('/signins', authController.signIn)
module.exports = accountRouter;