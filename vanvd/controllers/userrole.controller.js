const { userRole, user, role } = require('../models');
const addNewUserRole = async(req, res) => {
  let {
    userId,
    roleId
  } = req.body;
  try {
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
      roleId
    });
    res.status(200).send(newUserRole);
  } catch (err) {
    console.log(err);
  }

}

const updateUserRole = async(req, res) => {

}

const deleteUserRole = async(req, res) => {

}

module.exports = { addNewUserRole, updateUserRole, deleteUserRole }