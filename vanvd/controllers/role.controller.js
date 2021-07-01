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
      res.send({
        message: "This Role is already exist"
      });
      return;
    }
    const newRole = await role.create({
      roleName,
      createBy: payload.id,
      updateBy: payload.id,
      isDelete: 0
    });
    res.status(200).send(newRole);
  } catch (err) {
    console.log(err);
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
    const result = role.update({
      roleName,
      updateBy: payload.id
    }, {
      where: {
        id: id
      }
    });

    if (!result) {
      res.send("Can not update this role");
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

//delete role by Id
const deleteRole = async(req, res) => {
  const id = req.params.id;
  try {
    const t = await sequelize.transaction();
    const resultUserRole = userRole.update({
      isDelete: 1
    }, {
      where: {
        roleId: id
      }
    }, { transaction: t });
    if (!resultUserRole) {
      await t.rollback();
      res.send('Can not delete userRole contains this roleId');
    }
    const resultRolePermission = rolePermission.update({
      isDelete: 1
    }, {
      where: {
        roleId: id
      }
    }, { transaction: t });
    if (!resultRolePermission) {
      await t.rollback();
      res.send('Can not delete RolePermission contain this roleId');
    }
    const result = await role.update({
      isDelete: 1
    }, {
      where: {
        id: id
      }
    }, { transaction: t });
    if (!result) {
      await t.rollback();
      res.send('Can not delete this role');
    } else {
      await t.commit();
      res.sendStatus(200);
    }
  } catch (err) {
    await t.rollback();
    console.log(err);
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
  }
}

module.exports = { addNewRole, updateRole, deleteRole, getAllRoleOfUser }