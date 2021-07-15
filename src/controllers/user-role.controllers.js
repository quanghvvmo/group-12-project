const { user_role, user, role, role_permission_form } = require("../models");
const { ROLE_ENUMS } = require("../constants/role-enums");
const { FORM_ENUMS } = require("../constants/form-enums");

const createNewUserRole = async (req, res) => {
  const { role_id, user_id } = req.body;

  if (!role_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Please provide role id and user id!" });
  }

  try {
    const adminId = req.user.id;

    // Get user id
    const userId = await user.findOne({
      where: { id: user_id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });
    // Get role id
    const roleId = await role.findOne({
      where: { id: role_id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if invalid user id and role id
    if (!userId) {
      return res.status(404).json({ message: "Invalid User ID" });
    }
    if (!roleId) {
      return res.status(404).json({ message: "Invalid Role ID" });
    }

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new user
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Create new user role
        const newUserRole = await user_role.create({
          role_id,
          user_id,
          createBy: adminId,
          updateBy: adminId,
        });

        return res
          .status(200)
          .json({ message: "Created New User Role Successfully", newUserRole });
      } else {
        return res
          .status(403)
          .json({ message: "You have no permission to create new user role" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Create New User Role Failed" });
  }
};

const getAllUserRoles = async (req, res) => {
  try {
    // Get admin id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can get all user roles
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Get All User Role
        const allUserRole = await user_role.findAll({
          where: { isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
          include: {
            model: role,
            attributes: {
              exclude: [
                "id",
                "createBy",
                "updateBy",
                "isDeleted",
                "createdAt",
                "updatedAt",
              ],
            },
            include: {
              model: role_permission_form,
              attributes: {
                exclude: [
                  "id",
                  "createBy",
                  "updateBy",
                  "isDeleted",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          },
        });

        // Count number of user role based on isDeleted props

        let count = allUserRole.length;
        return res
          .status(200)
          .json({ message: "User Role Found", count, allUserRole });
      } else {
        return res
          .status(403)
          .json({ message: "You have no permission to get all user roles" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User Role Not Found" });
  }
};

const getUserRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get admin id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can get user role detail
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Get All User Role
        const userRoleId = await user_role.findOne({
          where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
        });

        if (!userRoleId) {
          return res.status(404).json({ message: "Invalid User Role ID" });
        }

        return res.status(200).json({ message: "User Role Found", userRoleId });
      } else {
        return res
          .status(403)
          .json({ message: "You have no permission to get user role detail" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User Role Not Found" });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;

  try {
    // Get admin id from token
    const adminId = req.user.id;
    // Check if invalid user id
    const userId = await user.findOne({
      where: { id: createBy, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    if (!userId) {
      return res.status(404).json({ message: "Invalid User Id" });
    }

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can update user role
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Update role
        const updatedUserRole = await user_role.update(
          { updateBy: adminId },
          { where: { id } }
        );

        return res
          .status(200)
          .json({ message: "Update User Role Successfully", updatedUserRole });
      } else {
        return res
          .status(403)
          .json({ message: "You have no permission to update user role" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Update User Role Failed" });
  }
};

const deleteUserRole = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user role ID
    const userRole = await user_role.findOne({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if invalid user role id
    if (!userRole) {
      return res.status(404).json({ message: "Invalid User Role ID" });
    }

    // Get user id from token
    const userIdToken = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: {
        user_id: userIdToken,
        isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED,
      },
      include: { model: role },
    });

    // Check if admin then can delete user role
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Delete user role
        await userRole.update(
          {
            isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED,
          },
          { where: { id } }
        );

        return res
          .status(200)
          .json({ message: "Deleted User Role Successfully", userRole });
      } else {
        return res.status(403).json({
          message: "You have no permission to delete user role",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Delete User Role Failed" });
  }
};

module.exports = {
  createNewUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
};
