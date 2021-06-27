const e = require('express');
const { user, userRole, sequelize, role } = require('../models');

const addNewUser = async(req, res) => {
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
    const t = await sequelize.transaction();
    const userCheck = await user.findOne({
      where: {
        id: managerId
      }
    });
    const RoleCheck = await role.findOne({
      where: {
        id: roleId
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
      insuranceNumber
    }, { transaction: t });
    const newUserRole = await userRole.create({
      userId: newUser.id,
      roleId
    }, { transaction: t });
    await t.commit();
    res.status(200).send(newUser);
  } catch (err) {
    await t.rollback();
    console.log(err);
  }
}

const updateUser = async(req, res) => {
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
    const userCheck = await user.findOne({
      where: {
        id: managerId
      }
    });
    if (!userCheck) {
      res.status(404).send("ID of Manager is incorrect");
      return;
    }
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
      insuranceNumber
    }, {
      where: {
        id: id
      }
    });

    if (!result) {
      res.send("Can not update this user");
      return;
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
}

const deleteUser = async(req, res) => {
  const id = req.params.id;
  try {
    const t = await sequelize.transaction();
    const resultUserRole = await userRole.destroy({
      where: {
        userId: id
      }
    }, { transaction: t });
    const resultuser = await user.destroy({
      where: {
        id: id
      }
    }, { transaction: t });
    if (!resultuser) {
      await t.rollback();
      res.send("Can not delete this user");
      return;
    }
    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    await t.rollback();
    console.log(error)
  }
}

const getUserById = async(req, res) => {
  const id = req.params.id;
  try {
    const User = await user.findAll({
      where: {
        id: id
      },
      include: {
        model: userRole
      }
    });
    if (!User) {
      res.send("can get this user");
      return;
    }
    res.status(200).send(User);
  } catch (error) {
    console.log(error)
  }
}

module.exports = { addNewUser, updateUser, deleteUser, getUserById }