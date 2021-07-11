const rolePerController = require('../controllers/rolepermission.controller');

const express = require('express');
const rolePerRouter = express();

rolePerRouter.post('/rolepermissions', rolePerController.addNewRolePermission);
rolePerRouter.put('/rolepermissions/:id', rolePerController.updateRolePermission);
rolePerRouter.delete('/rolepermissions/:id', rolePerController.deleteRolePermission);


module.exports = rolePerRouter;