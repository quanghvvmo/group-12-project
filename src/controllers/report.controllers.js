const { form, user_role, role } = require("../models");
const { ROLE_ENUMS } = require("../constants/role-enums");
const { FORM_ENUMS } = require("../constants/form-enums");

const getAllReports = async (req, res) => {
  try {
    // Get user id from payload
    const userId = req.user.id;

    const rolePermission = await user_role.findOne({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // console.log(rolePermission.role.role_name);
    // Check user role permission
    if (
      rolePermission.role.role_name === ROLE_ENUMS.ROLE.MANAGER ||
      rolePermission.role.role_name === ROLE_ENUMS.ROLE.DIRECTOR ||
      rolePermission.role.role_name === ROLE_ENUMS.ROLE.ADMIN
    ) {
      // Find form by status
      const allSubmittedReport = await form.findAll({
        where: { isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
        attributes: { exclude: ["createdAt", "updatedAt", "isDeleted"] },
      });

      return res
        .status(200)
        .json({ message: "All Submitted Report Found", allSubmittedReport });
    } else {
      return res
        .status(403)
        .json({ message: "Your role have no access to view all reports" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "All Reports Not Found" });
  }
};

const getAllManagerReport = async (req, res) => {
  try {
    // Get user id from payload
    const userId = req.user.id;

    // Check if invalid user id
    const rolePermission = await user_role.findOne({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    if (
      rolePermission.role.role_name === ROLE_ENUMS.ROLE.MANAGER ||
      rolePermission.role.role_name === ROLE_ENUMS.ROLE.DIRECTOR ||
      rolePermission.role.role_name === ROLE_ENUMS.ROLE.ADMIN
    ) {
      const reports = await form.findOne({
        where: { manager: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      });

      return res
        .status(200)
        .json({ message: "Manager's Report Found", count, reports });
    } else {
      return res
        .status(403)
        .json({ message: "You have no permission to get manager report" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Manager's Report Not Found" });
  }
};

const getAllReportByStatus = async (req, res) => {
  const { status } = req.query;

  try {
    // Get user id from payload
    const userId = req.user.id;

    // Check if invalid user id
    const rolePermission = await user_role.findOne({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check user role permission
    if (
      rolePermission.role.role_name !== ROLE_ENUMS.ROLE.MANAGER &&
      rolePermission.role.role_name !== ROLE_ENUMS.ROLE.DIRECTOR &&
      rolePermission.role.role_name !== ROLE_ENUMS.ROLE.ADMIN
    ) {
      return res
        .status(403)
        .json({ message: "Your role have no access to view all reports" });
    }

    // Check if invalid status
    if (
      status !== FORM_ENUMS.STATUS.SUBMITTED &&
      status !== FORM_ENUMS.STATUS.PENDING_APPROVAL &&
      status !== FORM_ENUMS.STATUS.APPROVED &&
      status !== FORM_ENUMS.STATUS.CLOSED
    ) {
      return res.status(406).json({ message: "Invalid Form Status" });
    }
    // Find form by status
    const allSubmittedReport = await form.findAll({
      where: { status, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Count number of reports
    let count = allSubmittedReport.length;

    return res
      .status(200)
      .json({ message: "Report Found", count, allSubmittedReport });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Report Not Found" });
  }
};

module.exports = {
  getAllReports,
  getAllReportByStatus,
  getAllManagerReport,
};
