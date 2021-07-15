const account = require('../models').account;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

//create new account
const addNewAccount = async(req, res) => {
  const token = req.header('token');
  let {
    userId,
    username,
    password,
  } = req.body;

  //hash pasword
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const newAccount = await account.create({
      userId,
      username,
      password: hashedPwd,
      createBy: payload.id,
      updateBy: payload.id,
      isDelete: 0,
    });
    if (!newAccount) {
      res.send("Can not create new account");
      return;
    }
    res.status(200).send(newAccount);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
}

//update account by id
const updateAccount = async(req, res) => {
  const id = req.params.id;
  const token = req.header('token');
  let {
    userId,
    username,
    password
  } = req.body;
  //hash pasword
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const result = await account.update({
      userId,
      username,
      password: hashedPwd,
      updateBy: payload.id,
      isDelete: 0
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!result[0]) {
      res.send("Can not update this account");
      return;
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
    return;
  }
}

//delete account by id
const deleteAccount = async(req, res) => {
  const id = req.params.id;
  try {
    const result = await account.update({
      isDelete: 1
    }, {
      where: {
        id: id,
      }
    });
    if (!result[0]) {
      res.send('Can not delete this account');
      return;
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
}

//get account by id
const getAccountById = async(req, res) => {
  const id = req.params.id;
  try {
    const Account = await account.findAll({
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!Account.length) {
      res.status(404).send("Can not get this account");
      return;
    }
    res.status(200).send(Account);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

// get all account
const getAllAccount = async(req, res) => {
  const pageNum = req.query.currentPage;
  const size = req.query.pageSize;

  try {
    const result = await account.findAll({
      limit: parseInt(size),
      offset: (parseInt(pageNum) - 1) * parseInt(size),
    });
    if (!result.length) {
      res.status(404).send("Can not get all account");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { addNewAccount, updateAccount, deleteAccount, getAccountById, getAllAccount }