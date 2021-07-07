import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/check-auth.js';

import ReportController from '../controllers/report-controller.js';

router.get('/employees', checkAuth, ReportController.employeeReport);
router.get('/projects', checkAuth, ReportController.projectReport);

export default router;