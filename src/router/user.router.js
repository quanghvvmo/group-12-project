const userController = require('../controllers/user.controller');
const Upload = require('../middlewares/avatar.middleware').upload;
const checkRole = require('../middlewares/checkRole');
const express = require('express');
const userRouter = express.Router();

userRouter.post('/users', Upload.single('avatar'), checkRole.checkCanWrite, userController.addNewUser);
userRouter.get('/users/:id', checkRole.checkCanRead, userController.getUserById);
userRouter.patch('/users/:id', Upload.single('avatar'), checkRole.checkCanUpdate, userController.updateUser);
userRouter.patch('/users/:id', checkRole.checkCanDelete, userController.deleteUser);
userRouter.get('/users', checkRole.checkCanRead, userController.getAllUser);

module.exports = userRouter;