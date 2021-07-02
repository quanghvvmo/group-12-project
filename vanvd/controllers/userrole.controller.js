const { userRole, user, role } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const addNewUserRole = async(req, res) => {
  const token = req.header('token');
  let {
    userId,
    roleId
  } = req.body;
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    //check if user and role is exist in database
    const existUser = await user.findOne({
      where: {
        id: userId
      }
    });
    const existRole = await role.findOne({
      where: {
        id: roleId
      }
    });
    if (!existUser) {
      res.status(404).send({
        message: "ID of this user is not exist"
      });
      return;
    }
    if (!existRole) {
      res.status(404).send({
        message: "ID of this role is not exist"
      });
      return;
    }

    const newUserRole = await userRole.create({
      userId,
      roleId,
      createBy: payload.id,
      updateBy: payload.id,
      isDelete: 0
    });
    res.status(200).send(newUserRole);
  } catch (err) {
    console.log(error);
    res.status(500).send("Internal server error");
  }

}

const updateUserRole = async(req, res) => {

}

const deleteUserRole = async(req, res) => {

}

module.exports = { addNewUserRole, updateUserRole, deleteUserRole }