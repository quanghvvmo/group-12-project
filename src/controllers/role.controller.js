const { role, userRole, rolePermission, sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//create new role
const addNewRole = async(req, res) => {
  const token = req.header('token');
  let {
    roleName
  } = req.body;

  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const temp = await role.findOne({
      where: {
        roleName: roleName
      }
    });
    if (temp) {
      res.send("This Role is already exist");
      return;
    }
    const newRole = await role.create({
      roleName,
      createBy: payload.id,
      updateBy: payload.id,
      isDelete: 0
    });
    res.status(200).send(newRole);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//update a role by id
const updateRole = async(req, res) => {
  const token = req.header('token');
  const id = req.params.id;
  let {
    roleName
  } = req.body;

  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const result = await role.update({
      roleName,
      updateBy: payload.id
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });

    if (!result[0]) {
      res.send("Can not update this role");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//delete role by Id
const deleteRole = async(req, res) => {
  const id = req.params.id;
  try {
    const result = await role.update({
      isDelete: 1
    }, {
      where: {
        id: id
      }
    });
    if (!result[0]) {
      await t.rollback();
      res.send('Can not delete this role');
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all user's permission when login
const getAllRoleOfUser = async(req, res) => {
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    const roleCheck = await userRole.findAll({
      where: {
        userId: payload.id,
        isDelete: 0
      },
      include: {
        model: role,
        include: {
          model: rolePermission,
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'createBy',
              'updateBy',
              'isDelete'
            ]
          }
        },
      },

    });
    let result = [];
    for (let x in roleCheck) {
      result.push(roleCheck[x].role.rolePermission);
    }
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all role
const getAllRole = async(req, res) => {
  const pageNum = req.query.currentPage;
  const size = req.query.pageSize;

  try {
    const result = await role.findAll({
      limit: parseInt(size),
      offset: (parseInt(pageNum) - 1) * parseInt(size),
    });
    if (!result.length) {
      res.status(404).send("Can not get all role");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { addNewRole, updateRole, deleteRole, getAllRoleOfUser, getAllRole }