const e = require('express');
const { user, userRole } = require('../models');

const addNewUser = async(req, res) => {
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
    });

    res.status(200).send(newUser);
  } catch (err) {
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
    const result = await user.destroy({
      where: {
        id: id
      }
    });

    if (!result) {
      res.send("Can not delete this user");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
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