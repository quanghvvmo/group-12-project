const userController = require('../controllers/user.controller');
const Upload = require('../middlewares/avatar.middleware').upload;
const checkRoleGetReport = require('../middlewares/checkReportRole');
const express = require('express');
const userRouter = express.Router();

userRouter.post('/users', Upload.single('avatar'), userController.addNewUser);
userRouter.get('/users/:id', checkRoleGetReport, userController.getUserById);
userRouter.put('/users/:id', Upload.single('avatar'), userController.updateUser);
userRouter.delete('/users/:id', userController.deleteUser);

module.exports = userRouter;