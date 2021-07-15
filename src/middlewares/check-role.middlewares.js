const jwt = require("jsonwebtoken");
const { user_role, role_permission_form, role } = require("../models");
const { ROLE_ENUMS } = require("../constants/role-enums");

const checkAdminOrHr = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("jwt");
    // Check if have no token
    if (!token) {
      return res.status(400).json({ message: "Access Denied" });
    }
    // Verify token
    const verifyToken = await jwt.verify(token, process.env.SECRET_TOKEN);

    // Check if verifyToken is null or undefined
    if (!verifyToken) {
      return res.status(404).json({ message: "Token is null or undefined" });
    }

    // Get user id from payload
    const userId = verifyToken.id;

    // Get user id in user_role
    const rolePermission = await user_role.findAll({
      where: { user_id: userId },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "updateBy",
          "createBy",
          "isDeleted",
        ],
      },
      include: {
        model: role,
        attributes: {
          exclude: [
            "createBy",
            "updateBy",
            "createdAt",
            "updatedAt",
            "isDeleted",
          ],
        },
        include: {
          model: role_permission_form,
          attributes: {
            exclude: [
              "createBy",
              "updateBy",
              "createdAt",
              "updatedAt",
              "isDeleted",
            ],
          },
        },
      },
    });

    let temp = false;

    for (let userRole in rolePermission) {
      rolePermission[userRole].role.role_permission_forms.forEach(function (
        check
      ) {
        if (
          (!temp &&
            rolePermission[userRole].role.role_name ===
              ROLE_ENUMS.ROLE.ADMIN) ||
          (!temp &&
            rolePermission[userRole].role.role_name === ROLE_ENUMS.ROLE.HR)
        ) {
          return (temp = true);
        }
      });
    }

    if (temp) {
      req.user = verifyToken;
      return next();
    } else {
      return res.status(403).json({ message: "Your role have no access" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkAdminOrHr };
