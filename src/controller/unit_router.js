import express from "express"
const router = express.Router(); 

import unit from "../api/api_unit.js"
import authorization from "../middleware/authorization.js"

router.post('/', authorization, unit.add_unit);
router.patch('/:id', authorization, unit.update_unit)
router.get('/', authorization, unit.list_unit);
router.get('/:id', authorization, unit.unit_detail);


export default router;