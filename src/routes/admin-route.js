import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/check-auth.js';

import AdminController from '../controllers/admin-controller.js';

router.post('/', AdminController.addAdmin);
router.post('/login', AdminController.login);
router.get('/', checkAuth, AdminController.getAdmins);
router.get('/:id', checkAuth, AdminController.getAdmin);
router.put('/:id', checkAuth, AdminController.updateAdmin);
router.delete('/:id', checkAuth, AdminController.deleteAdmin);

export default router;