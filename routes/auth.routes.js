const express = require("express");
const { login } = require("../controllers/auth.controllers");
const {
  createNewRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/role.controllers");
const {
  createNewRolePermissionForm,
  getAllRolePermissionForms,
  updateRolePermissionForm,
  deleteRolePermissionForm,
} = require("../controllers/permission.controllers");
const {
  checkCanRead,
  checkCanWrite,
  checkCanUpdate,
  checkCanDelete,
} = require("../middlewares/permission.middlewares");

const router = express.Router();

// Auth routes
router.post("/login", login);

// Roles routes
router.get("/roles", checkCanRead, getAllRoles);
router.get("/roles/:id", checkCanRead, getRoleById);
router.post("/roles", checkCanWrite, createNewRole);
router.put("/roles/:id", checkCanUpdate, updateRole);
router.patch("/roles/:id", checkCanDelete, deleteRole);

// Role permission form routes
router.get("/permissions", checkCanRead, getAllRolePermissionForms);
router.post("/permissions", checkCanWrite, createNewRolePermissionForm);
router.patch("/permissions/:id", checkCanUpdate, updateRolePermissionForm);
router.put("/permissions/:id", checkCanDelete, deleteRolePermissionForm);

module.exports = router;
