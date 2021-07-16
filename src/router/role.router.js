const roleController = require('../controllers/role.controller');
const express = require('express');
const roleRouter = express();

roleRouter.post('/roles', roleController.addNewRole);
roleRouter.patch('/roles/:id', roleController.updateRole);
roleRouter.patch('/roles/:id', roleController.deleteRole);
roleRouter.get('/roles', roleController.getAllRoleOfUser);
roleRouter.get('/roles/all', roleController.getAllRole);


module.exports = roleRouter;