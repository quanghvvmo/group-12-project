const { rolePermission, role } = require('../models');
const Module = require('../models').module;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//create new role-permission
const addNewRolePermission = async(req, res) => {
  const token = req.header('token');
  let {
    roleId,
    moduleId,
    url,
    canRead,
    canWrite,
    canUpdate,
    canDelete,
    canApprove
  } = req.body;

  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
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
      res.status(404).send("ID of this role is not exist");
      return;
    }
    if (!moduleTemp) {
      res.status(404).send("ID of this module is not exist");
      return;
    }
    const newRolePermission = await rolePermission.create({
      roleId,
      moduleId,
      url,
      canRead,
      canWrite,
      canUpdate,
      canDelete,
      canApprove,
      createBy: payload.id,
      updateBy: payload.id,
      isDelete: 0
    });
    res.status(200).send(newRolePermission);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//update a role-permission by id
const updateRolePermission = async(req, res) => {
  const token = req.header('token');
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
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
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
      res.status(404).send("ID of this role is not exist");
      return;
    }
    if (!moduleTemp) {
      res.status(404).send("ID of this module is not exist");
      return;
    }
    const result = await rolePermission.update({
      roleId,
      moduleId,
      canRead,
      canWrite,
      canUpdate,
      canDelete,
      canApprove,
      updateBy: payload.id
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!result[0]) {
      res.send("Can not update this rolePermission");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//delete a role-permission by id
const deleteRolePermission = async(req, res) => {
  const id = req.params.id;
  try {
    const result = await rolePermission.update({
      isDelete: 1
    }, {
      where: {
        id: id
      }
    });

    if (!result[0]) {
      res.send("Can not delete this RolePermission");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all role-permission
const getAllRolePermission = async(req, res) => {
  const pageNum = req.query.currentPage;
  const size = req.query.pageSize;
  try {
    const result = await rolePermission.findAll({
      limit: parseInt(size),
      offset: (parseInt(pageNum) - 1) * parseInt(size),
    });
    if (!result.length) {
      res.status(404).send("Can not get all role-permission");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { addNewRolePermission, updateRolePermission, getAllRolePermission, deleteRolePermission }