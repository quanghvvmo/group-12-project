const { user_role, user, role, role_permission_form } = require("../models");

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
      where: { id: user_id },
    });
    // Get role id
    const roleId = await role.findOne({ where: { id: role_id } });

    // Check if invalid user id and role id
    if (!userId) {
      return res.status(404).json({ message: "Invalid User ID" });
    }
    if (!roleId) {
      return res.status(404).json({ message: "Invalid Role ID" });
    }

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
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Create New User Role Failed" });
  }
};

const getAllUserRoles = async (req, res) => {
  try {
    // Get All User Role
    const allUserRole = await user_role.findAll({
      include: {
        model: role,
        include: { model: role_permission_form },
      },
    });

    // Count number of user role based on isDeleted props
    let count = 0;
    for (let ur in allUserRole) {
      allUserRole[ur].isDeleted === "0";
      count++;
    }

    return res
      .status(200)
      .json({ message: "User Role Found", count, allUserRole });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User Role Not Found" });
  }
};

const getUserRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get All User Role
    const userRoleId = await user_role.findOne({
      where: { id },
    });

    if (!userRoleId) {
      return res.status(404).json({ message: "Invalid User Role ID" });
    }

    return res.status(200).json({ message: "User Role Found", userRoleId });
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
      where: { id: createBy },
    });

    if (!userId) {
      return res.status(404).json({ message: "Invalid User Id" });
    }

    // Update role
    const updatedUserRole = await user_role.update(
      { updateBy: adminId },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "Update User Role Successfully", updatedUserRole });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Update User Role Failed" });
  }
};

const deleteUserRole = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user role ID
    const userRole = await user_role.findOne({
      where: { id },
    });

    // Check if invalid user role id
    if (!userRole) {
      return res.status(404).json({ message: "Invalid User Role ID" });
    }

    // Delete user role
    await userRole.destroy({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "Deleted User Role Successfully", userRole });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Delete User Role Failed" });
  }
};

module.exports = {
  createNewUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
};
