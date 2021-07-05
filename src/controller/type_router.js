import express from "express"
const router = express.Router(); 

import type from "../api/api_type.js";
import authorization from "../middleware/authorization.js";

router.post('/', authorization, type.add_tpye);
router.patch('/:id', authorization, type.update_tpye);
router.get('/', authorization, type.list_type);
router.get('/:id', authorization, type.type_detail);
router.patch('/delete/:id', authorization, type.delete_type);

export default router;