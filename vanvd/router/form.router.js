const formController = require('../controllers/form.controller');
const checkFormRole = require('../middlewares/checkFormRole');
const checkReportRole = require('../middlewares/checkReportRole');
const emailController = require('../controllers/mail.controller');
const express = require('express');
const formRouter = express.Router();

formRouter.post('/forms', checkFormRole.checkCanWrite, formController.addNewForm);
formRouter.put('/forms', checkFormRole.checkCanUpdate, formController.updateForm);
formRouter.put('/forms/:id', checkFormRole.checkCanUpdate, formController.approveForm);
formRouter.delete('/forms/:id', checkFormRole.checkCanDelete, formController.deleteForm);
formRouter.get('/forms', checkFormRole.checkCanRead, formController.getAllFormOfUser);
formRouter.get('/reports/yearly/finish', checkReportRole, formController.reportFinishYearlyForm);
formRouter.get('/reports/basic/finish', checkReportRole, formController.reportFinishBasicForm);
formRouter.get('/reports/basic/incomplete', checkReportRole, formController.reportIncompleteBasicForm);
formRouter.get('/reports/yearly/incomplete', checkReportRole, formController.reportIncompleteYearlyForm);
formRouter.post('/sendmails', emailController.sendMail);

module.exports = formRouter;