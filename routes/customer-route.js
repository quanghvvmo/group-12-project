import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/check-auth.js';

import CustomerController from '../controllers/customer-controller.js';

router.post('/', checkAuth, CustomerController.createCustomer);
router.get('/', checkAuth, CustomerController.getCustomers);
router.get('/:id', checkAuth, CustomerController.getCustomer);
router.put('/:id', checkAuth, CustomerController.updateCustomer);
router.delete('/:id', checkAuth, CustomerController.deleteCustomer);

export default router;