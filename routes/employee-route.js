import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/check-auth.js';

import EmployeeController from '../controllers/employee-controller.js';

router.post('/', checkAuth, EmployeeController.createEmployee);
router.get('/', checkAuth, EmployeeController.getEmployees);
router.get('/:id', checkAuth, EmployeeController.getEmployee);
router.put('/:id', checkAuth, EmployeeController.updateEmployee);
router.patch('/:id', checkAuth, EmployeeController.setAdmin);
router.delete('/:id', checkAuth, EmployeeController.deleteEmployee);

export default router;