const jwt = require("jsonwebtoken");
const { user_role, role_permission_form, modules } = require("../models");

const checkCanWrite = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("jwt");

    // Check if have no token
    if (!token) {
      return res.status(400).json({ message: "Access Denied" });
    }

    // Verify token
    const verifyToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verifyToken;

    // Get user id from payload
    const userId = verifyToken.id;
    // console.log(userId);

    // Get user id in user_role
    const rolePermission = await user_role.findOne({
      where: { user_id: userId },
    });
    // console.log(rolePermission);

    // Check user role permission
    if (!rolePermission) {
      return res.status(404).json({ message: "Your role have no access" });
    } else {
      //Check role permission to access form
      const rolePermissionForm = await role_permission_form.findOne({
        where: { role_id: rolePermission.role_id },
      });

      // Check canCreate permission
      if (rolePermissionForm.canCreate === 1) {
        // Check module permission
        const formPermission = await modules.findOne({
          where: { id: rolePermissionForm.module_id },
        });

        if (formPermission.module_name === "form") {
          return next();
        }
      } else {
        return res.status(401).json({ message: "You can not write" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const checkCanUpdate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("jwt");

    // Check if have no token
    if (!token) {
      return res.status(400).json({ message: "Access Denied" });
    }

    // Verify token
    const verifyToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verifyToken;

    // Get user id from payload
    const userId = verifyToken.id;
    // console.log(userId);

    // Get user id in user_role
    const rolePermission = await user_role.findOne({
      where: { user_id: userId },
    });
    // console.log(rolePermission);

    // Check user role permission
    if (!rolePermission) {
      return res.status(404).json({ message: "Your role have no access" });
    } else {
      //Check role permission to access form
      const rolePermissionForm = await role_permission_form.findOne({
        where: { role_id: rolePermission.role_id },
      });

      // Check canCreate permission
      if (rolePermissionForm.canUpdate === 1) {
        // Check module permission
        const formPermission = await modules.findOne({
          where: { id: rolePermissionForm.module_id },
        });

        console.log(formPermission);

        if (formPermission.module_name === "form") {
          return next();
        }
      } else {
        return res.status(401).json({ message: "You can not update" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const checkCanDelete = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("jwt");

    // Check if have no token
    if (!token) {
      return res.status(400).json({ message: "Access Denied" });
    }

    // Verify token
    const verifyToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verifyToken;

    // Get user id from payload
    const userId = verifyToken.id;
    // console.log(userId);

    // Get user id in user_role
    const rolePermission = await user_role.findOne({
      where: { user_id: userId },
    });

    // Check user role permission
    if (!rolePermission) {
      return res.status(404).json({ message: "Your role have no access" });
    } else {
      //Check role permission to access form
      const rolePermissionForm = await role_permission_form.findOne({
        where: { role_id: rolePermission.role_id },
      });

      // Check canCreate permission
      if (rolePermissionForm.canDelete === 1) {
        // Check module permission
        const formPermission = await modules.findOne({
          where: { id: rolePermissionForm.module_id },
        });

        if (formPermission.module_name === "form") {
          return next();
        }
      } else {
        return res.status(401).json({ message: "You can not delete" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const checkCanApprove = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("jwt");

    // Check if have no token
    if (!token) {
      return res.status(400).json({ message: "Access Denied" });
    }

    // Verify token
    const verifyToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verifyToken;

    // Get user id from payload
    const userId = verifyToken.id;

    // Get user id in user_role
    const rolePermission = await user_role.findOne({
      where: { user_id: userId },
    });

    // Check user role permission
    if (!rolePermission) {
      return res.status(404).json({ message: "Your role have no access" });
    } else {
      //Check role permission to access form
      const rolePermissionForm = await role_permission_form.findOne({
        where: { role_id: rolePermission.role_id },
      });

      // Check canCreate permission
      if (rolePermissionForm.canApprove === 1) {
        // Check module permission
        const formPermission = await modules.findOne({
          where: { id: rolePermissionForm.module_id },
        });

        if (formPermission.module_name === "form") {
          return next();
        }
      } else {
        return res.status(401).json({ message: "You can not approve" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkCanWrite,
  checkCanUpdate,
  checkCanApprove,
  checkCanDelete,
};
