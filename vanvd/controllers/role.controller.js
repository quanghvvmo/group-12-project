const { role, userRole, rolePermission, sequelize } = require('../models');

const addNewRole = async(req, res) => {
  let {
    roleName
  } = req.body;

  try {
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
    } else {
      const newRole = await role.create({
        roleName
      });

      res.status(200).send(newRole);
    }

  } catch (err) {
    console.log(err);
  }
}

const updateRole = async(req, res) => {
  const id = req.params.id;
  let {
    roleName
  } = req.body;

  try {
    const result = role.update({
      roleName
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

const deleteRole = async(req, res) => {
  const id = req.params.id;
  try {
    const t = await sequelize.transaction();
    const resultUserRole = userRole.destroy({
      where: {
        roleId: id
      }
    }, { transaction: t });
    if (!resultUserRole) {
      await t.rollback();
      res.send('Can not delete userRole contains this roleId');
    }
    const resultRolePermission = rolePermission.destroy({
      where: {
        roleId: id
      }
    }, { transaction: t });
    if (!resultRolePermission) {
      await t.rollback();
      res.send('Can not delete RolePermission contain this roleId');
    }
    const result = await role.destroy({
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

module.exports = { addNewRole, updateRole, deleteRole }