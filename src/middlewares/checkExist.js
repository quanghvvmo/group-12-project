const { account, } = require('../models');
const Module = require('../models').module;

//check exist account when create a new account
const checkExistAccount = async(req, res, next) => {
  const { username } = req.body;
  try {
    const ExistAccount = await account.findOne({
      where: {
        username: username,
        isDelete: 0
      }
    });
    if (ExistAccount) {
      res.status(406).send("username is already exist");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    req.status(500).send("Internal server error");
    return;
  }
}

//check exist module
const checkExistModule = async(req, res, next) => {
  const { moduleName } = req.body;
  try {
    const ExistModule = await Module.findOne({
      where: {
        moduleName: moduleName,
        isDelete: 0
      }
    });
    if (ExistModule) {
      res.status(406).send("module is already exist");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    req.status(500).send("Internal server error");
    return;
  }
}

module.exports = {
  checkExistAccount,
  checkExistModule
}