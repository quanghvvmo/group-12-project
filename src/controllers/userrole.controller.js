const { userRole, user, role } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//create new user-role
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
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }

}

//update user-role
const updateUserRole = async(req, res) => {
  const id = req.params.id;
  const token = req.header('token');
  try {
    const payload = jwt.verify(token, config.secret);
    let {
      userId,
      roleId
    } = req.body;
    const userCheck = await user.findOne({
      where: {
        id: userId,
        isDelete: 0
      }
    });
    const roleCheck = await role.findOne({
      where: {
        id: roleId,
        isDelete: 0
      }
    });
    if (!userCheck) {
      res.status(404).send("userId is not exist");;
      return;
    }
    if (!roleCheck) {
      res.status(404).send("roleId is not exist");
      return;
    }
    const userRoleCheck = await userRole.update({
      userId,
      roleId,
      updateBy: payload.id
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!userRoleCheck[0]) {
      res.send("Can not update this user-role");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all user-role
const getAllUserRole = async(req, res) => {
  const pageNum = req.query.currentPage;
  const size = req.query.pageSize;

  try {
    const result = await userRole.findAll({
      limit: parseInt(size),
      offset: (parseInt(pageNum) - 1) * parseInt(size),
    });
    if (!result.length) {
      res.status(404).send("Can not get all user-role");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}
module.exports = { addNewUserRole, updateUserRole, getAllUserRole }