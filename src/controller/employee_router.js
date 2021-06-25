import express from "express"
const router = express.Router(); 

import employee from "../api/api_employee.js"
import authorization from "../middleware/authorization.js"

router.post('/', authorization, employee.add_employee);
router.patch('/:id', authorization, employee.update_employee);

export default router;