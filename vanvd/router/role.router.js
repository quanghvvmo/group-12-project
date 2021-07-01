const roleController = require('../controllers/role.controller');

const express = require('express');
const roleRouter = express();

roleRouter.post('/roles', roleController.addNewRole);
roleRouter.put('/roles/:id', roleController.updateRole);
roleRouter.delete('/roles/:id', roleController.deleteRole);
roleRouter.get('/roles', roleController.getAllRoleOfUser);

module.exports = roleRouter;