const { rolePermission, role } = require('../models');
const Module = require('../models').module;

const addNewRolePermission = async(req, res) => {
  let {
    roleId,
    moduleId,
    canRead,
    canWrite,
    canUpdate,
    canDelete,
    canApprove
  } = req.body;

  try {
    const roleTemp = await role.findOne({
      where: {
        id: roleId
      }
    });
    const moduleTemp = await Module.findOne({
      where: {
        id: moduleId
      }
    });

    if (!roleTemp) {
      res.status(404).send({ message: "ID of this role is not exist" });
    }
    if (!moduleTemp) {
      res.status(404).send({ message: "ID of this module is not exist" });
    }

    const newRolePermission = await rolePermission.create({
      roleId,
      moduleId,
      canRead,
      canWrite,
      canUpdate,
      canDelete,
      canApprove
    });

    res.send(newRolePermission);

  } catch (error) {
    console.log(error);
  }
}

const updateRolePermission = async(req, res) => {
  const id = req.params.id;
  let {
    roleId,
    moduleId,
    canRead,
    canWrite,
    canUpdate,
    canDelete,
    canApprove
  } = req.body;

  try {
    const roleTemp = await role.findOne({
      where: {
        id: roleId
      }
    });
    const moduleTemp = await Module.findOne({
      where: {
        id: moduleId
      }
    });

    if (!roleTemp) {
      res.status(404).send({ message: "ID of this role is not exist" });
    }
    if (!moduleTemp) {
      res.status(404).send({ message: "ID of this module is not exist" });
    }

    const result = await rolePermission.update({
      roleId,
      moduleId,
      canRead,
      canWrite,
      canUpdate,
      canDelete,
      canApprove
    }, {
      where: {
        id: id
      }
    });
    if (!result) {
      res.send("Can not update this rolePermission");
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
}

const deleteRolePermission = async(req, res) => {
  const id = req.params.id;
  try {
    const result = await rolePermission.destroy({
      where: {
        id: id
      }
    });

    if (!result) {
      res.send("Can not delete this RolePermission");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

module.exports = { addNewRolePermission, updateRolePermission, deleteRolePermission }