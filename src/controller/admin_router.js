import express from "express"
const router = express.Router();

import admin from "../api/api_admin.js"

router.post('/', admin.register);
router.post('/login', admin.login);

export default router;