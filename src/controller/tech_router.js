import express from "express"
const router = express.Router(); 

import tech from "../api/api_tech.js";
import authorization from "../middleware/authorization.js";

router.post('/', authorization, tech.add_tech);
router.patch('/:id', authorization, tech.update_tech);
router.get('/', authorization, tech.list_tech);
router.get('/:id', authorization, tech.tech_detail);
router.patch('/delete/:id', authorization, tech.delete_tech);

export default router;