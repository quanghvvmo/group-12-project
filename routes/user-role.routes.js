const express = require("express");
const {
  createNewUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
} = require("../controllers/user-role.controllers");
const {
  checkCanRead,
  checkCanWrite,
  checkCanUpdate,
  checkCanDelete,
} = require("../middlewares/permission.middlewares");
const router = express.Router();

router.get("/user-roles", checkCanRead, getAllUserRoles);
router.get("/user-roles/:id", checkCanRead, getUserRoleById);
router.post("/user-roles", checkCanWrite, createNewUserRole);
router.put("/user-roles/:id", checkCanUpdate, updateUserRole);
router.patch("/user-roles/:id", checkCanDelete, deleteUserRole);

module.exports = router;
