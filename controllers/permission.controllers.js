const { role_permission_form, role, user } = require("../models");

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
    createBy,
    updateBy,
  } = req.body;

  try {
    // Get role id
    const roleId = await role.findOne({ where: { id: role_id } });

    // Check if invalid role id
    if (!roleId) {
      return res.status(404).json({ message: "Invalid Role ID" });
    }
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
      createBy,
      updateBy,
    });

    return res.status(200).json({
      message: "Created New Permission Form Successfully",
      rolePermission,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(204)
      .json({ message: "Create New Permission Form Failed" });
  }
};

const getAllRolePermissionForms = async (req, res) => {
  try {
    // Get all role permission form and their detail roles
    const rolePermission = await role_permission_form.findAll({
      include: { model: role },
    });

    return res.status(200).json(rolePermission);
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
      where: { id: createBy },
    });

    if (!userId) {
      return res.status(404).json({ message: "Invalid User Id" });
    }

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
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Update Role Permission Form Failed" });
  }
};

const deleteRolePermissionForm = async (req, res) => {
  const { id } = req.params;

  try {
    // Get role permission id
    const rolePermissionId = await role_permission_form.findOne({
      where: { id },
    });

    // Check if invalid role permission id
    if (!rolePermissionId) {
      return res.status(404).json({ message: "Invalid Role Permission ID" });
    }

    // Delete role permission
    await rolePermissionId.destroy({
      where: { id },
    });

    return res.status(200).json({
      message: "Deleted Role Permission Successfully",
      rolePermissionId,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Delete Failed" });
  }
};

module.exports = {
  createNewRolePermissionForm,
  getAllRolePermissionForms,
  updateRolePermissionForm,
  deleteRolePermissionForm,
};
