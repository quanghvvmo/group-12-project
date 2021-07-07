const express = require("express");
const {
  createNewModule,
  getAllModules,
  updateModule,
  deleteModule,
} = require("../controllers/module.controllers");
const {
  checkCanRead,
  checkCanWrite,
  checkCanUpdate,
  checkCanDelete,
} = require("../middlewares/permission.middlewares");
const router = express.Router();

router.get("/modules", checkCanRead, getAllModules);
router.post("/modules", checkCanWrite, createNewModule);
router.put("/modules/:id", checkCanUpdate, updateModule);
router.patch("/modules/:id", checkCanDelete, deleteModule);

module.exports = router;
