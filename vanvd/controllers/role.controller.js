const role = require('../models').role;

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
    const result = await role.destroy({
      where: {
        id: id
      }
    });

    if (!result) {
      console.log('Can not delete this role');
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addNewRole, updateRole, deleteRole }