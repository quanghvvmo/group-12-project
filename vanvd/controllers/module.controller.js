const Module = require('../models').module;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//create new module
const addNewModule = async(req, res) => {
  const token = req.header('token');
  let {
    moduleName
  } = req.body;

  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
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
      moduleName,
      createBy: payload.id,
      updateBy: payload.id,
      isDelete: 0,
    });
    res.status(200).send(newModule);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }

}

//update a module by id
const updateModule = async(req, res) => {
  const token = req.header(token);
  const id = req.params.id;
  let {
    moduleName
  } = req.body;

  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const result = Module.update({
      moduleName,
      updateBy: payload.id
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
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//delete module by id
const deleteModule = async(req, res) => {
  const id = req.params.id;
  try {
    const result = await Module.update({
      isDelete: 1
    }, {
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
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { addNewModule, updateModule, deleteModule }