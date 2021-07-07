const { role, role_permission_form, user } = require("../models");

const createNewRole = async (req, res) => {
  const { role_name } = req.body;

  try {
    // Get role id
    const roleId = await role.findOne({ where: { role_name } });

    if (roleId) {
      return res.status(409).json({ message: "Role Already Exist" });
    }

    // Create new role
    const newRole = await role.create({
      role_name,
    });

    return res
      .status(200)
      .json({ message: "Created New Role Successfully", newRole });
  } catch (error) {
    console.log(error);
    return res.status(204).json({ message: "Create Role Failed" });
  }
};

const getAllRoles = async (req, res) => {
  try {
    // Get all roles
    const roles = await role.findAll();

    return res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Roles Not Found" });
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const roleId = await role.findOne({
      where: { id },
      include: { model: role_permission_form },
    });

    if (!roleId) {
      return res.status(404).json({ message: "Invalid role id" });
    }

    return res.status(200).json({ message: "Role Found", roleId });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Role Not Found" });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { createBy, updateBy } = req.body;

  try {
    // Check if invalid user id
    const userId = await user.findOne({ where: { id: createBy } });

    if (!userId) {
      return res.status(404).json({ message: "Invalid User Id" });
    }

    const updatedRole = await role.update(
      { createBy, updateBy },
      { where: { id } }
    );
    return res
      .status(200)
      .json({ message: "Updated Role Successfully", updatedRole });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Update Role Failed" });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    // Get role id
    const roleId = await role.findOne({ where: { id } });

    if (!roleId) {
      return res.status(404).json({ message: "Invalid Role Id" });
    }

    await roleId.destroy({ where: { id } });

    return res
      .status(200)
      .json({ message: "Deleted Role Successfully", roleId });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Delete Role Failed" });
  }
};

module.exports = {
  createNewRole,
  getAllRoles,
  updateRole,
  getRoleById,
  deleteRole,
};
