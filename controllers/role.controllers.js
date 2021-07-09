const { role, user_role, role_permission_form, user } = require("../models");

const createNewRole = async (req, res) => {
  const { role_name } = req.body;

  try {
    // Get role id
    const roleId = await role.findOne({ where: { role_name } });
    // Check if role already exists
    if (roleId) {
      return res.status(409).json({ message: "Role Already Exist" });
    }

    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId },
      include: { model: role },
    });

    // Check if admin then can create new role
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === "admin") {
        // Create new role
        const newRole = await role.create({
          role_name,
          createBy: adminId,
          updateBy: adminId,
        });

        return res
          .status(200)
          .json({ message: "Created New Role Successfully", newRole });
      } else {
        return res
          .status(404)
          .json({ message: "You have no permission to create new role" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Create Role Failed" });
  }
};

const getAllRoles = async (req, res) => {
  try {
    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId },
      include: { model: role },
    });

    // Check if admin then can get all roles info
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === "admin") {
        // Get all roles
        const roles = await role.findAll();

        // Count role
        const count = roles.length;

        return res.status(200).json({ count, roles });
      } else {
        return res.status(404).json({
          message: "You have no permission to get all roles information",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Roles Not Found" });
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId },
      include: { model: role },
    });

    // Check if admin then can get role detail
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === "admin") {
        // Show role info and detail role permission
        const roleId = await role.findOne({
          where: { id },
          include: { model: role_permission_form },
        });

        if (!roleId) {
          return res.status(404).json({ message: "Invalid role id" });
        }

        return res.status(200).json({ message: "Role Found", roleId });
      } else {
        return res.status(404).json({
          message: "You have no permission to get role detail information",
        });
      }
    }
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

    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId },
      include: { model: role },
    });

    // Check if admin then can update role info
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === "admin") {
        const updatedRole = await role.update(
          { createBy, updateBy },
          { where: { id } }
        );
        return res
          .status(200)
          .json({ message: "Updated Role Successfully", updatedRole });
      } else {
        return res.status(404).json({
          message: "You have no permission to update role information",
        });
      }
    }
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

    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: adminId },
      include: { model: role },
    });

    // Check if admin then can update role info
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === "admin") {
        // Delete role
        await roleId.destroy({ where: { id } });

        return res
          .status(200)
          .json({ message: "Deleted Role Successfully", roleId });
      } else {
        return res.status(404).json({
          message: "You have no permission to delete role",
        });
      }
    }
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
