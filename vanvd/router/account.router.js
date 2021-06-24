const accountController = require('../controllers/account.controller');
const authController = require('../controllers/auth.controller');
const checkFormRole = require('../middlewares/checkFormRole');
const express = require('express');
const accountRouter = express.Router();

accountRouter.post('/accounts', checkFormRole.checkCanWrite, accountController.addNewAccount);
accountRouter.patch('/accounts/:id', accountController.updateAccount)

accountRouter.delete('/accounts/:id', accountController.deleteAccount)
accountRouter.post('/signins', authController.signIn)
module.exports = accountRouter;