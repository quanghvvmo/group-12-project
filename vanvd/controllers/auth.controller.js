const Config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const account = require('../models').account;

//create sign in method
const signIn = async(req, res) => {
  const temp = await account.findOne({
    where: {
      username: req.body.username,
      isDelete: 0
    }
  });
  if (!temp) {
    res.status(404).send({
      message: 'user not found'
    });
  }
  //use bcrypt check password
  const passIsValid = await bcrypt.compare(req.body.password, temp.password);
  if (!passIsValid) {
    res.status(404).send({
      message: "username or passowrd is incorrect"
    })
    return;
  }

  const token = jwt.sign({ id: temp.userId }, Config.secret, {
    expiresIn: 86400 //24 hours
  });

  res.status(200).send({
    status: "Success",
    username: temp.username,
    accessToken: token
  })
}

module.exports = { signIn }