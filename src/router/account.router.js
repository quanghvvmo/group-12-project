const accountController = require('../controllers/account.controller');
const authController = require('../controllers/auth.controller');
const express = require('express');
const accountRouter = express.Router();
const CheckExist = require('../middlewares/checkExist');

accountRouter.post('/accounts', CheckExist.checkExistAccount, accountController.addNewAccount);
accountRouter.put('/accounts/:id', accountController.updateAccount);
accountRouter.get('/accounts/:id', accountController.getAccountById);
accountRouter.get('/accounts', accountController.getAllAccount);
accountRouter.delete('/accounts/:id', accountController.deleteAccount);
accountRouter.post('/signins', authController.signIn);

module.exports = accountRouter;