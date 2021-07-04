const userRoleController = require('../controllers/userrole.controller');
const checkRole = require('../middlewares/checkRole');
const express = require('express');
const userRoleRouter = express();

userRoleRouter.post('/userroles', userRoleController.addNewUserRole);
userRoleRouter.put('/userroles/:id', userRoleController.updateUserRole);

module.exports = userRoleRouter;