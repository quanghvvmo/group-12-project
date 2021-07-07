import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/check-auth.js';

import DepartmentController from '../controllers/department-controller.js';

router.post('/', checkAuth, DepartmentController.addDepartment);
router.get('/', checkAuth, DepartmentController.getDepartments);
router.get('/:id', checkAuth, DepartmentController.getDepartment);
router.put('/:id', checkAuth, DepartmentController.updateDepartment);
router.delete('/:id', checkAuth, DepartmentController.deleteDepartment);

export default router;