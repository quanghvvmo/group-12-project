const accountController = require('../controllers/account.controller');
const authController = require('../controllers/auth.controller');
const express = require('express');
const accountRouter = express.Router();
const CheckExist = require('../middlewares/checkExist');

accountRouter.post('/accounts', CheckExist.checkExistAccount, accountController.addNewAccount);
accountRouter.patch('/accounts/:id', accountController.updateAccount);
accountRouter.get('/accounts/:id', accountController.getAccountById);
accountRouter.get('/accounts', accountController.getAllAccount);
accountRouter.patch('/accounts/:id', accountController.deleteAccount);
accountRouter.post('/signins', authController.signIn);

module.exports = accountRouter;