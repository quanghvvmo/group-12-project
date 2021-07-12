import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/check-auth.js';

import ProjectController from '../controllers/project-controller.js';

router.post('/', checkAuth, ProjectController.addProject);
router.get('/', checkAuth, ProjectController.getProjects);
router.get('/:id', checkAuth, ProjectController.getProject);
router.put('/:id', checkAuth, ProjectController.updateProject);
router.delete('/:id', checkAuth, ProjectController.deleteProject);

export default router;