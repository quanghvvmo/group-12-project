import express from "express"
const router = express.Router();

import project from "../api/api_project.js"
import authorization from "../middleware/authorization.js"

router.post('/', authorization, project.add_project);
router.patch('/:id', authorization, project.update_project);
router.get('/', authorization, project.list_project);
router.get('/:id', authorization, project.project_detail);

export default router;