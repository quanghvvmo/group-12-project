const rolePerController = require('../controllers/rolepermission.controller');

const express = require('express');
const rolePerRouter = express();

rolePerRouter.post('/rolepermissions', rolePerController.addNewRolePermission);
rolePerRouter.patch('/rolepermissions/:id', rolePerController.updateRolePermission);
rolePerRouter.patch('/rolepermissions/:id', rolePerController.deleteRolePermission);
rolePerRouter.get('/rolepermissions', rolePerController.getAllRolePermission);



module.exports = rolePerRouter;