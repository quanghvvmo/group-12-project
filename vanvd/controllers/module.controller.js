const Module = require('../models').module;

const addNewModule = async(req, res) => {
  let {
    moduleName
  } = req.body;

  try {
    const existModule = await Module.findOne({
      where: {
        moduleName: moduleName
      }
    });
    if (existModule) {
      res.send({
        message: "This module is already exist"
      });
      return;
    }
    const newModule = await Module.create({
      moduleName
    });
    res.status(200).send(newModule);
  } catch (error) {
    console.log(error);
  }

}

const updateModule = async(req, res) => {
  const id = req.params.id;
  let {
    moduleName
  } = req.body;

  try {
    const result = Module.update({
      moduleName
    }, {
      where: {
        id: id
      }
    });

    if (!result) {
      res.send("Can not update this module");
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

const deleteModule = async(req, res) => {
  const id = req.params.id;
  try {
    const result = await Module.destroy({
      where: {
        id: id
      }
    });

    if (!result) {
      console.log('Can not delete this module');
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addNewModule, updateModule, deleteModule }