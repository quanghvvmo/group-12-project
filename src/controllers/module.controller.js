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
      res.send("This module is already exist");
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
  const token = req.header('token');
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
    const result = await Module.update({
      moduleName,
      updateBy: payload.id
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!result[0]) {
      res.send("Can not update this module");
      return;
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

    if (!result[0]) {
      console.log('Can not delete this module');
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get module by id 
const getModuleById = async(req, res) => {
  const id = req.params.id;
  try {
    const getModule = await Module.findAll({
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!getModule.length) {
      res.status(404).send("Can not get this module");
      return;
    }
    res.status(200).send(getModule);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all module
const getALlModule = async(req, res) => {
  const pageNum = req.query.currentPage;
  const size = req.query.pageSize;

  try {
    const result = await Module.findAll({
      limit: parseInt(size),
      offset: (parseInt(pageNum) - 1) * parseInt(size),
    });
    if (!result.length) {
      res.status(404).send("Can not get all moudle");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { addNewModule, getALlModule, updateModule, deleteModule, getModuleById }