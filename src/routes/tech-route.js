import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/check-auth.js';

import TechController from '../controllers/tech-controller.js';

router.post('/', checkAuth, TechController.createTech);
router.get('/', checkAuth, TechController.getTechs);
router.get('/:id', checkAuth, TechController.getTech);
router.put('/:id', checkAuth, TechController.updateTech);
router.delete('/:id', checkAuth, TechController.deleteTech);

export default router;