const express = require("express");
const {
  createNewForm,
  getAllForm,
  getFormById,
  updateForm,
  approveForm,
  closeForm,
  deleteForm,
} = require("../controllers/form.controllers");
const {
  getAllReports,
  getAllReportByStatus,
  getAllManagerReport,
} = require("../controllers/report.controllers");
const {
  checkCanRead,
  checkCanWrite,
  checkCanUpdate,
  checkCanDelete,
  checkCanApprove,
} = require("../middlewares/permission.middlewares");
const { checkAdminOrHr } = require("../middlewares/check-role.middlewares");

const router = express.Router();

// Form routes
router.get("/forms", checkCanRead, checkAdminOrHr, getAllForm);
router.get("/forms/:id", checkCanRead, getFormById);
router.post("/forms", checkCanWrite, checkAdminOrHr, createNewForm);
router.patch("/forms/:id", checkCanUpdate, updateForm);
router.put("/forms/:id", checkCanApprove, approveForm);
router.put("/forms-close/:id", checkCanUpdate, checkAdminOrHr, closeForm);
router.patch("/forms/delete/:id", checkCanDelete, checkAdminOrHr, deleteForm);

// Report routes
router.get("/reports/forms", checkCanRead, checkAdminOrHr, getAllReports);
router.get(
  "/reports-status/forms",
  checkCanRead,
  checkAdminOrHr,
  getAllReportByStatus
);
router.get("/reports-manager/forms", checkCanRead, getAllManagerReport);

module.exports = router;
