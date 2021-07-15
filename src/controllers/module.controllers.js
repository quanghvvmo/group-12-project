const { modules, user_role, role } = require("../models");
const { ROLE_ENUMS } = require("../constants/role-enums");
const { FORM_ENUMS } = require("../constants/form-enums");

const createNewModule = async (req, res) => {
  const { module_name } = req.body;

  try {
    // Get admin id from token
    const userId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new module
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Create new module
        const newModule = await modules.create({
          module_name,
          createBy: userId,
          updateBy: userId,
        });

        return res
          .status(200)
          .json({ message: "Created New Module Successfully", newModule });
      } else {
        return res.status(403).json({
          message: "You have no permission to create new module",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Create New Module Failed" });
  }
};

const getAllModules = async (req, res) => {
  try {
    // Get admin id from token
    const userId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new module
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // / Find all modules which has isDeleted properties equal to 0
        const allModules = await modules.findAll({
          where: { isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
        });

        return res.status(200).json({ message: "Module Found", allModules });
      } else {
        return res.status(403).json({
          message: "You have no permission to get all modules information",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Module Not Found" });
  }
};

const deleteModule = async (req, res) => {
  const { id } = req.params;

  try {
    // Get admin id from token
    const userId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new module
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Delete module
        const deletedModule = await modules.update(
          {
            isDeleted: FORM_ENUMS.IS_DELETE.DELETED,
            updateBy: userId,
          },
          { where: { id } }
        );

        return res
          .status(200)
          .json({ message: "Deleted Module Successfully", deletedModule });
      } else {
        return res.status(403).json({
          message: "You have no permission to delete module",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Delete Module Failed" });
  }
};

const updateModule = async (req, res) => {
  const { id } = req.params;
  const { module_name } = req.body;

  try {
    // Get admin id from token
    const userId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can create new module
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Udpate module
        const updatedModule = await modules.update(
          {
            module_name,
            createBy: adminId,
            updateBy: adminId,
          },
          { where: { id } }
        );

        return res
          .status(200)
          .json({ message: "Updated Module Successfully", updatedModule });
      } else {
        return res.status(403).json({
          message: "You have no permission to update module information",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Update Module Failed" });
  }
};

module.exports = { createNewModule, getAllModules, updateModule, deleteModule };
