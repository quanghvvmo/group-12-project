import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/check-auth.js';

import ProjectTypeController from '../controllers/project-type-controller.js';

router.post('/', checkAuth, ProjectTypeController.createProjectType);
router.get('/', checkAuth, ProjectTypeController.getTypes);
router.get('/:id', checkAuth, ProjectTypeController.getType);
router.put('/:id', checkAuth, ProjectTypeController.updateType);
router.delete('/:id', checkAuth, ProjectTypeController.deleteType);

export default router;