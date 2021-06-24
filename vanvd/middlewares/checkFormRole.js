const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { userRole, rolePermission } = require('../models');
const Module = require('../models').module;

const checkCanWrite = async(req, res, next) => {
  const token = req.header('token');
  //check if not token in request
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    //get UserRole through userId in token 
    const userRoleCheck = await userRole.findOne({
      where: {
        userId: payload.id
      }
    });
    if (!userRoleCheck) {
      res.send("UserId in token is not exist");
      return;
    } else {
      //get Role Permissio through RoleId 
      const RolePms = await rolePermission.findOne({
        where: {
          roleId: userRoleCheck.roleId
        }
      });
      if (!RolePms) {
        res.send("Role Permission is not exist");
        return;
      } else {
        //get modulename through moduleId
        const moduleTemp = await Module.findOne({
          where: {
            id: RolePms.moduleId
          }
        });
        if (!moduleTemp) {
          res.status(404).send("Module Id is not exist");
          return;
        } else {
          if ((moduleTemp.moduleName === 'form') && (RolePms.canWrite === 1)) {
            req.rolePms = RolePms;
            next();
          } else {
            res.send("Permission deny");
            return;
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const checkCanRead = async(req, res) => {
  const token = req.header('token');
  //check if not token in request
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    //get UserRole through userId in token 
    const userRoleCheck = await userRole.findOne({
      where: {
        userId: payload.id
      }
    });
    if (!userRoleCheck) {
      res.send("UserId in token is not exist");
      return;
    } else {
      //get Role Permissio through RoleId 
      const RolePms = await rolePermission.findOne({
        where: {
          roleId: userRoleCheck.roleId
        }
      });
      if (!RolePms) {
        res.send("Role Permission is not exist");
        return;
      } else {
        //get modulename through moduleId
        const moduleTemp = await Module.findOne({
          where: {
            id: RolePms.moduleId
          }
        });
        if (!moduleTemp) {
          res.status(404).send("Module Id is not exist");
          return;
        } else {
          if ((moduleTemp.moduleName === 'form') && (RolePms.canRead === 1)) {
            req.rolePms = RolePms;
            next();
          } else {
            res.send("Permission deny");
            return;
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const checkCanUpdate = async(req, res) => {
  const token = req.header('token');
  //check if not token in request
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    //get UserRole through userId in token 
    const userRoleCheck = await userRole.findOne({
      where: {
        userId: payload.id
      }
    });
    if (!userRoleCheck) {
      res.send("UserId in token is not exist");
      return;
    } else {
      //get Role Permissio through RoleId 
      const RolePms = await rolePermission.findOne({
        where: {
          roleId: userRoleCheck.roleId
        }
      });
      if (!RolePms) {
        res.send("Role Permission is not exist");
        return;
      } else {
        //get modulename through moduleId
        const moduleTemp = await Module.findOne({
          where: {
            id: RolePms.moduleId
          }
        });
        if (!moduleTemp) {
          res.status(404).send("Module Id is not exist");
          return;
        } else {
          if ((moduleTemp.moduleName === 'form') && (RolePms.canUpdate === 1)) {
            req.rolePms = RolePms;
            next();
          } else {
            res.send("Permission deny");
            return;
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const checkCanDelete = async(req, res) => {
  const token = req.header('token');
  //check if not token in request
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    //get UserRole through userId in token 
    const userRoleCheck = await userRole.findOne({
      where: {
        userId: payload.id
      }
    });
    if (!userRoleCheck) {
      res.send("UserId in token is not exist");
      return;
    } else {
      //get Role Permissio through RoleId 
      const RolePms = await rolePermission.findOne({
        where: {
          roleId: userRoleCheck.roleId
        }
      });
      if (!RolePms) {
        res.send("Role Permission is not exist");
        return;
      } else {
        //get modulename through moduleId
        const moduleTemp = await Module.findOne({
          where: {
            id: RolePms.moduleId
          }
        });
        if (!moduleTemp) {
          res.status(404).send("Module Id is not exist");
          return;
        } else {
          if ((moduleTemp.moduleName === 'form') && (RolePms.canDelete === 1)) {
            req.rolePms = RolePms;
            next();
          } else {
            res.send("Permission deny");
            return;
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const checkCanApprove = async(req, res) => {
  const token = req.header('token');
  //check if not token in request
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    //get UserRole through userId in token 
    const userRoleCheck = await userRole.findOne({
      where: {
        userId: payload.id
      }
    });
    if (!userRoleCheck) {
      res.send("UserId in token is not exist");
      return;
    } else {
      //get Role Permissio through RoleId 
      const RolePms = await rolePermission.findOne({
        where: {
          roleId: userRoleCheck.roleId
        }
      });
      if (!RolePms) {
        res.send("Role Permission is not exist");
        return;
      } else {
        //get modulename through moduleId
        const moduleTemp = await Module.findOne({
          where: {
            id: RolePms.moduleId
          }
        });
        if (!moduleTemp) {
          res.status(404).send("Module Id is not exist");
          return;
        } else {
          if ((moduleTemp.moduleName === 'form') && (RolePms.canApprove === 1)) {
            req.rolePms = RolePms;
            next();
          } else {
            res.send("Permission deny");
            return;
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  checkCanWrite,
  checkCanRead,
  checkCanUpdate,
  checkCanDelete,
  checkCanApprove
}