const { role_permission_form, role, user, user_role } = require("../models");
const { ROLE_ENUMS } = require("../constants/role-enums");
const { FORM_ENUMS } = require("../constants/form-enums");

const createNewRolePermissionForm = async (req, res) => {
  const {
    role_id,
    module_id,
    canCreate,
    canRead,
    canUpdate,
    canDelete,
    canApprove,
    url,
  } = req.body;

  try {
    // Get role id
    const roleId = await role.findOne({
      where: { id: role_id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if invalid role id
    if (!roleId) {
      return res.status(404).json({ message: "Invalid Role ID" });
    }

    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new role permission form
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Create new role permission form
        const rolePermission = await role_permission_form.create({
          role_id,
          module_id,
          canCreate,
          canRead,
          canUpdate,
          canDelete,
          canApprove,
          url,
          createBy: adminId,
          updateBy: adminId,
        });

        return res.status(200).json({
          message: "Created New Permission Form Successfully",
          rolePermission,
        });
      } else {
        return res.status(403).json({
          message: "You have no permission to create new role permission form",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Create New Permission Form Failed" });
  }
};

const getAllRolePermissionForms = async (req, res) => {
  try {
    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new role permission form
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Get all role permission form and their detail roles
        const rolePermissions = await role_permission_form.findAll({
          where: { isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
          include: { model: role },
        });

        // Count number of role permission form
        const count = rolePermissions.length;

        return res.status(200).json({ count, rolePermissions });
      } else {
        return res.status(403).json({
          message: "You have no permission to get all role permission forms",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Role Permission Form Not Found" });
  }
};

const updateRolePermissionForm = async (req, res) => {
  const { id } = req.params;
  const { createBy } = req.body;

  try {
    // Check if invalid user id
    const userId = await user.findOne({
      where: { id: createBy, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    if (!userId) {
      return res.status(404).json({ message: "Invalid User Id" });
    }

    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new role permission form
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Update role permission form
        const rolePermissionForm = await role_permission_form.update(
          {
            ...req.body,
          },
          { where: { id } }
        );

        return res.status(200).json({
          message: "Update Role Permission Form Successfully",
          rolePermissionForm,
        });
      } else {
        return res.status(403).json({
          message: "You have no permission to update role permission form",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Update Role Permission Form Failed" });
  }
};

const deleteRolePermissionForm = async (req, res) => {
  const { id } = req.params;

  try {
    // Get role permission id
    const rolePermissionId = await role_permission_form.findOne({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if invalid role permission id
    if (!rolePermissionId) {
      return res.status(404).json({ message: "Invalid Role Permission ID" });
    }

    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new role permission form
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Delete role permission
        await rolePermissionId.update(
          {
            isDeleted: FORM_ENUMS.IS_DELETE.DELETED,
          },
          { where: { id } }
        );

        return res.status(200).json({
          message: "Deleted Role Permission Successfully",
          rolePermissionId,
        });
      } else {
        return res.status(403).json({
          message: "You have no permission to delete role permission form",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Delete Failed" });
  }
};

module.exports = {
  createNewRolePermissionForm,
  getAllRolePermissionForms,
  updateRolePermissionForm,
  deleteRolePermissionForm,
};
