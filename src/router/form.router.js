const formController = require('../controllers/form.controller');
const checkRole = require('../middlewares/checkRole');
const emailController = require('../controllers/mail.controller');
const express = require('express');
const formRouter = express.Router();

formRouter.post('/forms', checkRole.checkCanWrite, checkRole.checkClosedForm, formController.addNewForm);
formRouter.patch('/forms', checkRole.checkCanUpdate, formController.submitForm);
formRouter.patch('/forms/:id/approve', checkRole.checkCanUpdate, formController.approveForm);
formRouter.patch('/forms/:id/closed', checkRole.checkCanClose, formController.closeForm);
formRouter.patch('/forms/:id', checkRole.checkCanDelete, formController.deleteForm);
formRouter.get('/forms', checkRole.checkCanRead, formController.getFormOfUser);
formRouter.get('/forms/all', checkRole.checkCanRead, formController.getAllForm);

formRouter.get('/forms/:id', checkRole.checkCanRead, formController.getFormById);
formRouter.get('/reports/yearly/finish', checkRole.checkRoleGetReport, formController.reportFinishYearlyForm);
formRouter.get('/reports/basic/finish', checkRole.checkRoleGetReport, formController.reportFinishBasicForm);
formRouter.get('/reports/basic/incomplete', checkRole.checkRoleGetReport, formController.reportIncompleteBasicForm);
formRouter.get('/reports/yearly/incomplete', checkRole.checkRoleGetReport, formController.reportIncompleteYearlyForm);
formRouter.post('/sendmails', emailController.sendMail);

module.exports = formRouter;