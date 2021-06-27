const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { userRole, role } = require('../models');

const checkRoleGetReport = async(req, res, next) => {
  //check if not token in request
  const token = req.header('token');
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }
  const payload = jwt.verify(token, config.secret);
  try {
    const Temp = await userRole.findOne({
      where: {
        userId: payload.id
      }
    });

    if (!Temp) {
      res.status(404).send("Not found user in token");
      return;
    }
    const roleTemp = await role.findOne({
      where: {
        id: Temp.roleId
      }
    });
    if (!roleTemp) {
      res.status(404).send("Not found role in token");
      return;
    }
    if (roleTemp.roleName === "hr" || roleTemp.roleName === "admin") {
      next();
    } else {
      res.send("Permission deny");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = checkRoleGetReport;