const { form, user_role } = require("../models");
const jwt = require("jsonwebtoken");

const getAllReports = async (req, res) => {
  try {
    // Get user id from payload
    const userId = req.user.id;

    const rolePermission = await user_role.findOne({
      where: { user_id: userId },
    });

    console.log(rolePermission);
    // Check user role permission
    if (
      rolePermission.role_id === "ce9ee71e-e287-4998-912f-bc70b708fb53" ||
      rolePermission.role_id === "c6220169-3d04-4ce4-86bc-e5ddb251e3dc" ||
      rolePermission.role_id === "ffc8c623-ee2f-48e7-9f7c-42edad317a69"
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
    });

    if (
      rolePermission.role_id === "ffc8c623-ee2f-48e7-9f7c-42edad317a69" ||
      rolePermission.role_id === "7b8badc1-44a6-4e12-9f25-5d7753468549" ||
      rolePermission.role_id === "ffc8c623-ee2f-48e7-9f7c-42edad317a69"
    ) {
      const reports = await form.findOne({
        where: { manager: userId },
      });

      return res
        .status(200)
        .json({ message: "Manager's Report Found", reports });
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
    });

    // Check user role permission
    if (
      rolePermission.role_id === "ce9ee71e-e287-4998-912f-bc70b708fb53" ||
      rolePermission.role_id === "c6220169-3d04-4ce4-86bc-e5ddb251e3dc" ||
      rolePermission.role_id === "ffc8c623-ee2f-48e7-9f7c-42edad317a69"
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

        let count = 0;
        for (let rp in allSubmittedReport) {
          allSubmittedReport[rp].status;
          count++;
        }

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
