import express from "express"
const router = express.Router(); 

import customer from "../api/api_customer.js";
import authorization from "../middleware/authorization.js"

router.post('/',authorization, customer.add_customer);
router.patch('/:id', authorization, customer.update_customer);
router.get('/', authorization, customer.list_customer);
router.get('/:id', authorization, customer.customer_detail);

export default router;