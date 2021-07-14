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

const router = express.Router();

// Form routes
router.get("/forms", checkCanRead, getAllForm);
router.get("/forms/:id", checkCanRead, getFormById);
router.post("/forms", checkCanWrite, createNewForm);
router.patch("/forms/:id", checkCanUpdate, updateForm);
router.put("/forms/:id", checkCanApprove, approveForm);
router.put("/forms-close/:id", checkCanUpdate, closeForm);
router.patch("/forms/delete/:id", checkCanDelete, deleteForm);

// Report routes
router.get("/reports/forms", checkCanRead, getAllReports);
router.get("/reports-status/forms", checkCanRead, getAllReportByStatus);
router.get("/reports-manager/forms", checkCanRead, getAllManagerReport);

module.exports = router;
