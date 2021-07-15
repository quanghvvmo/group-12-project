const express = require("express");
const { upload } = require("../controllers/upload.controllers");
const {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllAccounts,
  getUserAccountById,
  updateUserAccount,
  deleteUserAccount,
} = require("../controllers/user.controllers");

const {
  checkCanRead,
  checkCanWrite,
  checkCanUpdate,
  checkCanDelete,
} = require("../middlewares/permission.middlewares");

const router = express.Router();

// User routes
router.get("/users", checkCanRead, getAllUsers);
router.get("/users/:id", checkCanRead, getUserById);
router.post("/users", checkCanWrite, upload.single("avatar"), createNewUser);
router.put("/users/:id", checkCanUpdate, upload.single("avatar"), updateUser);
router.patch("/users/:id", checkCanDelete, deleteUser);

// User account routes
router.get("/accounts", checkCanRead, getAllAccounts);
router.get("/accounts/:id", checkCanRead, getUserAccountById);
router.put("/accounts/:id", checkCanUpdate, updateUserAccount);
router.patch("/accounts/:id", checkCanDelete, deleteUserAccount);

module.exports = router;
