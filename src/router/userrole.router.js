const userRoleController = require('../controllers/userrole.controller');
const express = require('express');
const userRoleRouter = express();

userRoleRouter.post('/userroles', userRoleController.addNewUserRole);
userRoleRouter.patch('/userroles/:id', userRoleController.updateUserRole);
userRoleRouter.get('/userroles', userRoleController.getAllUserRole);

module.exports = userRoleRouter;