const { form, user } = require('../models');

const addNewForm = async(req, res) => {
  let {
    userId,
    typeOf,
    managerId,
    note,
    task,
    achievement,
    managerComment,
    status
  } = req.body;

  try {
    const userTemp = await user.findOne({
      where: {
        id: userId
      }
    });
    const manager = await user.findOne({
      where: {
        id: managerId
      }
    });
    if (!userTemp) {
      res.status(404).send("UserId is not exist");
      return;
    }
    if (!manager) {
      res.status(404).send("ManagerId is not exist");
      return;
    }

    const newForm = await form.create({
      userId,
      typeOf,
      managerId,
      note,
      task,
      achievement,
      managerComment,
      status
    });
    res.status(200).send(newForm);
  } catch (error) {
    console.log(error)
  }
}

const updateForm = async(req, res) => {

}

const deleteForm = async(req, res) => {

}

module.exports = { addNewForm, updateForm, deleteForm }