const { modules, user } = require("../models");

const createNewModule = async (req, res) => {
  const { module_name } = req.body;

  try {
    // Get admin id from token
    const adminId = req.user.id;

    // Create new module
    const newModule = await modules.create({
      module_name,
      createBy: adminId,
      updateBy: adminId,
    });

    return res
      .status(200)
      .json({ message: "Created New Module Successfully", newModule });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Create New Module Failed" });
  }
};

const getAllModules = async (req, res) => {
  try {
    const allModules = await modules.findAll({ where: { isDeleted: "0" } });

    return res.status(200).json({ message: "Module Found", allModules });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Module Not Found" });
  }
};

const deleteModule = async (req, res) => {
  const { id } = req.params;

  try {
    const adminId = req.user.id;

    // Udpate module
    const deletedModule = await modules.update(
      {
        isDeleted: "1",
        updateBy: adminId,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "Deleted Module Successfully", deletedModule });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Delete Module Failed" });
  }
};

const updateModule = async (req, res) => {
  const { id } = req.params;
  const { module_name } = req.body;

  try {
    // Get admin from token
    const adminId = req.user.id;

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
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Update Module Failed" });
  }
};

module.exports = { createNewModule, getAllModules, updateModule, deleteModule };
