const account = require('../models').account;
const bcrypt = require('bcrypt');
const addNewAccount = async(req, res) => {
  let {
    userId,
    username,
    password
  } = req.body;

  //hash pasword
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);
  try {
    const newAccount = await account.create({
      userId,
      username,
      password: hashedPwd
    });
    res.send(newAccount);
  } catch (err) {
    console.log(err);
  }
}

const updateAccount = async(req, res) => {
  const id = req.params.id;
  let {
    userId,
    username,
    password
  } = req.body;
  //hash pasword
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);
  try {
    const result = await account.update({
      userId,
      username,
      password: hashedPwd
    }, {
      where: {
        id: id
      }
    });
    if (!result) {
      res.send("Can not update this account");
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
}

const deleteAccount = async(req, res) => {
  const id = req.params.id;
  try {
    const temp = await account.destroy({
      where: {
        id: id
      }
    });

    if (!temp) {
      console.log('Can not delete this account');
    } else(
      res.status(200).send("Deleted!")
    )
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addNewAccount, updateAccount, deleteAccount }