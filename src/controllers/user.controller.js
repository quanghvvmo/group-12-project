const e = require('express');
const { user, userRole, sequelize, role } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//create new user, and create new user-role
const addNewUser = async(req, res) => {
  const token = req.header('token');
  if (!req.file) {
    res.send('Please upload a iamge');
    return;
  }
  const avatar = req.file.path;
  let {
    roleId,
    employeeId,
    managerId,
    firstName,
    lastName,
    email,
    phone,
    address,
    department,
    identificationNumber,
    insuranceNumber
  } = req.body;
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const t = await sequelize.transaction();
    const userCheck = await user.findOne({
      where: {
        id: managerId,
        isDelete: 0
      }
    });
    const RoleCheck = await role.findOne({
      where: {
        id: roleId,
        isDelete: 0
      }
    });
    if (!userCheck) {
      res.status(404).send("ID of Manager is incorrect");
      return;
    }
    if (!RoleCheck) {
      res.status(404).send("ID of role is incorrect");
      return;
    }
    const newUser = await user.create({
      employeeId,
      managerId,
      firstName,
      lastName,
      email,
      phone,
      avatar,
      address,
      department,
      identificationNumber,
      insuranceNumber,
      createBy: payload.id,
      updateBy: payload.id,
      isDelete: 0
    }, { transaction: t });
    const newUserRole = await userRole.create({
      userId: newUser.id,
      roleId,
      createBy: payload.id,
      updateBy: payload.id,
      isDelete: 0
    }, { transaction: t });
    await t.commit();
    res.status(200).send(newUser);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//update user by id
const updateUser = async(req, res) => {
  const token = req.header('token');
  const id = req.params.id;
  const avatar = req.file.path;
  let {
    employeeId,
    managerId,
    firstName,
    lastName,
    email,
    phone,
    address,
    department,
    identificationNumber,
    insuranceNumber
  } = req.body;
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const userCheck = await user.findOne({
      where: {
        id: managerId,
        isDelete: 0
      }
    });
    if (!userCheck) {
      res.status(404).send("ID of Manager is incorrect");
      return;
    }
    let check = false;
    for (let x in req.role) {
      if ((req.role[x] == 'hr') || (req.role[x] == 'admin')) {
        check = true;
      } else {
        if (id === payload.id) {
          check = true;
        }
      }
    }
    if (check) {
      const result = await user.update({
        employeeId,
        managerId,
        firstName,
        lastName,
        email,
        phone,
        avatar,
        address,
        department,
        identificationNumber,
        insuranceNumber,
        updateBy: payload.id
      }, {
        where: {
          id: id,
          isDelete: 0
        }
      });
      if (!result[0]) {
        res.send("Can not update this user");
        return;
      }
      res.sendStatus(200);
      return;
    }
    res.send("Can not update information of this user\n Permission deny");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
    return;
  }
}

//delete user and user-role 
const deleteUser = async(req, res) => {
  const id = req.params.id;
  try {
    const t = await sequelize.transaction();
    const resultUserRole = await userRole.update({
      isDelete: 1
    }, {
      where: {
        userId: id
      }
    }, { transaction: t });
    const resultuser = await user.update({
      isDelete: 1
    }, {
      where: {
        id: id
      }
    }, { transaction: t });
    if (!resultuser[0]) {
      await t.rollback();
      res.send("Can not delete this user");
      return;
    }
    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get user bu Id
const getUserById = async(req, res) => {
  const id = req.params.id;
  try {
    const User = await user.findAll({
      where: {
        id: id,
        isDelete: 0
      },
      include: {
        model: userRole
      }
    });
    if (!User.length) {
      res.status(404).send("Can not get this user");
      return;
    }
    res.status(200).send(User);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all user
const getAllUser = async(req, res) => {
  const pageNum = req.query.currentPage;
  const size = req.query.pageSize;

  try {
    const result = await user.findAll({
      limit: parseInt(size),
      offset: (parseInt(pageNum) - 1) * parseInt(size),
    });
    if (!result.length) {
      res.status(404).send("Can not get all user");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}
module.exports = { addNewUser, updateUser, deleteUser, getUserById, getAllUser }