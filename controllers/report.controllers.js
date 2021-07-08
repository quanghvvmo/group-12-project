const { form, user_role, role } = require("../models");

const getAllReports = async (req, res) => {
  try {
    // Get user id from payload
    const userId = req.user.id;

    const rolePermission = await user_role.findOne({
      where: { user_id: userId },
      include: { model: role },
    });

    console.log(rolePermission.role.role_name);
    // Check user role permission
    if (
      rolePermission.role.role_name === "manager" ||
      rolePermission.role.role_name === "director" ||
      rolePermission.role.role_name === "admin"
    ) {
      // Find form by status
      const allSubmittedReport = await form.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "isDeleted"] },
      });

      return res
        .status(200)
        .json({ message: "All Submitted Report Found", allSubmittedReport });
    } else {
      return res
        .status(404)
        .json({ message: "Your role have no access to view all reports" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Submit Report Not Found" });
  }
};

const getAllManagerReport = async (req, res) => {
  try {
    // Get user id from payload
    const userId = req.user.id;

    // Check if invalid user id
    const rolePermission = await user_role.findOne({
      where: { user_id: userId },
      include: { model: role },
    });

    if (
      rolePermission.role.role_name === "manager" ||
      rolePermission.role.role_name === "director" ||
      rolePermission.role.role_name === "admin"
    ) {
      const reports = await form.findOne({
        where: { manager: userId },
      });

      return res
        .status(200)
        .json({ message: "Manager's Report Found", count, reports });
    } else {
      return res
        .status(404)
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
      where: { user_id: userId },
      include: { model: role },
    });

    // Check user role permission
    if (
      rolePermission.role.role_name === "manager" ||
      rolePermission.role.role_name === "director" ||
      rolePermission.role.role_name === "admin"
    ) {
      // Check if invalid status
      if (
        status === "submitted" ||
        status === "pending approve" ||
        status === "approved"
      ) {
        // Find form by status
        const allSubmittedReport = await form.findAll({
          where: { status },
        });

        let count = allSubmittedReport.length;

        return res
          .status(200)
          .json({ message: "Report Found", count, allSubmittedReport });
      } else {
        return res.status(404).json({ message: "Invalid Form Status" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Your role have no access to view all reports" });
    }
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
