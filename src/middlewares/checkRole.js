const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { userRole, role, rolePermission, form } = require('../models');
const FORM_ENUM = require('../const/form.enum');

//check role from id in token
const checkRole = async(id) => {
  const roleCheck = await userRole.findAll({
    where: {
      userId: id
    },
    include: {
      model: role,
      include: {
        model: rolePermission,
      },
    },
  });
  return roleCheck;
}

//check if user can create new form
const checkCanWrite = async(req, res, next) => {
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    const itemCheck = await checkRole(payload.id);
    let check = false;
    for (let x in itemCheck) {
      if (!check && itemCheck[x].role.rolePermission.canWrite && req.url.startsWith(itemCheck[x].role.rolePermission.url)) {
        check = true;
      }
    }
    if (check) {
      next();
    } else {
      res.status(403).send("Permission deny");
      return;
    }
  } catch (error) {
    console.log(error)
  }
}

//check if user can read information of form
const checkCanRead = async(req, res, next) => {
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    const itemCheck = await checkRole(payload.id);
    let check = false;
    let roleName = [];
    for (let x in itemCheck) {
      if (req.url.startsWith(itemCheck[x].role.rolePermission.url)) {
        roleName.push(itemCheck[x].role.roleName);
        if (!check && itemCheck[x].role.rolePermission.canRead) {
          check = true;
        }
      }
    }
    if (check) {
      req.role = roleName;
      next();
    } else {
      res.status(403).send("Permission deny");
      return;
    }
  } catch (error) {
    console.log(error)
  }
}

//check if user can update and submit form 
const checkCanUpdate = async(req, res, next) => {
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    const itemCheck = await checkRole(payload.id);
    let check = false;
    let roleName = [];
    for (let x in itemCheck) {
      if (req.url.startsWith(itemCheck[x].role.rolePermission.url)) {
        //create role array of user in token
        roleName.push(itemCheck[x].role.roleName);
        if (!check && itemCheck[x].role.rolePermission.canUpdate) {
          check = true;
        }
      }
    }
    if (check) {
      req.role = roleName;
      next();
    } else {
      res.status(403).send("Permission deny");
      return;
    }
  } catch (error) {
    console.log(error)
  }
}

//check if user can delete a form
const checkCanDelete = async(req, res, next) => {
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    const itemCheck = await checkRole(payload.id);
    let check = false;
    for (let x in itemCheck) {
      if (!check && itemCheck[x].role.rolePermission.canDelete && req.url.startsWith(itemCheck[x].role.rolePermission.url)) {
        check = true;
      }
    }
    if (check) {
      next();
    } else {
      res.status(403).send("Permission deny");
      return;
    }
  } catch (error) {
    console.log(error)
  }
}

//check if user can approve a form of employee
const checkCanApprove = async(req, res, next) => {
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    const itemCheck = await checkRole(payload.id);
    let check = false;
    for (let x in itemCheck) {
      if (!check && itemCheck[x].role.rolePermission.canApprove && req.url.startsWith(itemCheck[x].role.rolePermission.url)) {
        check = true;
      }
    }
    if (check) {
      next();
    } else {
      res.status(403).send("Permission deny");
      return;
    }
  } catch (error) {
    console.log(error)
  }
}

const checkCanClose = async(req, res, next) => {
  const token = req.header('token');
  let check = false;
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    const itemCheck = await checkRole(payload.id);
    for (let x in itemCheck) {
      if (!check && itemCheck[x].role.roleName === 'hr') {
        check = true;
      }
    }
    if (!check) {
      res.status(403).send("Permission deny");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

//check if user have a form not closed yet
const checkClosedForm = async(req, res, next) => {
  let { userId } = req.body;
  const FormClose = await form.findAll({
    where: {
      userId: userId,
      isDelete: 0
    }
  });
  if (FormClose.length) {
    for (let i in FormClose) {
      if (FormClose[i].status !== FORM_ENUM.STATUS.CLOSED) {
        res.send(`${FormClose[i].userId} has a form not closed yet`);
        return;
      }
    }
  }
  next();
}

const checkRoleGetReport = async(req, res, next) => {
  const token = req.header('token');
  const payload = jwt.verify(token, config.secret);
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const Temp = await userRole.findAll({
      where: {
        userId: payload.id
      },
      include: {
        model: role
      }
    });
    if (!Temp) {
      res.status(404).send("Not found user in token");
      return;
    }
    let check = false;
    let roleName = [];
    for (let x in Temp) {
      roleName.push(Temp[x].role.roleName);
      if (Temp[x].role.roleName === "hr" || Temp[x].role.roleName === "admin") {
        check = true;
      }
    }
    if (check) {
      req.role = roleName;
      next();
    } else {
      res.status(403).send("Permission deny");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  checkCanWrite,
  checkCanRead,
  checkCanUpdate,
  checkCanDelete,
  checkCanApprove,
  checkCanClose,
  checkClosedForm,
  checkRoleGetReport,
}