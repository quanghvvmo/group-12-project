const jwt = require("jsonwebtoken");
const { user_role, role_permission_form, role } = require("../models");

const checkCanRead = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("jwt");
    // Check if have no token
    if (!token) {
      return res.status(400).json({ message: "Access Denied" });
    }
    // Verify token
    const verifyToken = await jwt.verify(token, process.env.SECRET_TOKEN);

    // Check if verifyToken is null or undefined
    if (!verifyToken) {
      return res.status(404).json({ message: "Token is null or undefined" });
    }

    req.user = verifyToken;

    // Get user id from payload
    const userId = verifyToken.id;

    // Get user id in user_role
    const rolePermission = await user_role.findAll({
      where: { user_id: userId },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "updateBy",
          "createBy",
          "isDeleted",
        ],
      },
      include: {
        model: role,
        attributes: {
          exclude: [
            "createBy",
            "updateBy",
            "createdAt",
            "updatedAt",
            "isDeleted",
          ],
        },
        include: {
          model: role_permission_form,
          attributes: {
            exclude: [
              "createBy",
              "updateBy",
              "createdAt",
              "updatedAt",
              "isDeleted",
            ],
          },
        },
      },
    });

    let temp = false;

    for (let userRole in rolePermission) {
      rolePermission[userRole].role.role_permission_forms.forEach(function (
        check
      ) {
        // console.log(rolePermission[userRole].role.role_name);
        if (
          (!temp && check.canRead === 1 && req.url.includes(check.url)) ||
          rolePermission[userRole].role.role_name === "admin"
        ) {
          return (temp = true);
        }
      });
    }

    if (temp) {
      return next();
    } else {
      return res
        .status(404)
        .json({ message: "Your role have no access. You can not read" });
    }
  } catch (error) {
    console.log(error);
  }
};

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

    // Check if verifyToken is null or undefined
    if (!verifyToken) {
      return res.status(404).json({ message: "Token is null or undefined" });
    }

    req.user = verifyToken;
    // Get user id from payload
    const userId = verifyToken.id;

    // Get user id in user_role
    const rolePermission = await user_role.findAll({
      where: { user_id: userId },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "updateBy",
          "createBy",
          "isDeleted",
        ],
      },
      include: {
        model: role,
        attributes: {
          exclude: [
            "createBy",
            "updateBy",
            "createdAt",
            "updatedAt",
            "isDeleted",
          ],
        },
        include: {
          model: role_permission_form,
          attributes: {
            exclude: [
              "createBy",
              "updateBy",
              "createdAt",
              "updatedAt",
              "isDeleted",
            ],
          },
        },
      },
    });

    let temp = false;

    for (let userRole in rolePermission) {
      rolePermission[userRole].role.role_permission_forms.forEach(function (
        check
      ) {
        if (
          (!temp && check.canCreate === 1 && req.url.includes(check.url)) ||
          rolePermission[userRole].role.role_name === "admin"
        ) {
          return (temp = true);
        }
      });
    }

    if (temp) {
      return next();
    } else {
      return res
        .status(404)
        .json({ message: "Your role have no access. You can not write" });
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

    // Check if verifyToken is null or undefined
    if (!verifyToken) {
      return res.status(404).json({ message: "Token is null or undefined" });
    }

    req.user = verifyToken;
    // Get user id from payload
    const userId = verifyToken.id;

    // Get user id in user_role
    const rolePermission = await user_role.findAll({
      where: { user_id: userId },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "updateBy",
          "createBy",
          "isDeleted",
        ],
      },
      include: {
        model: role,
        attributes: {
          exclude: [
            "createBy",
            "updateBy",
            "createdAt",
            "updatedAt",
            "isDeleted",
          ],
        },
        include: {
          model: role_permission_form,
          attributes: {
            exclude: [
              "createBy",
              "updateBy",
              "createdAt",
              "updatedAt",
              "isDeleted",
            ],
          },
        },
      },
    });

    let temp = false;

    for (let userRole in rolePermission) {
      rolePermission[userRole].role.role_permission_forms.forEach(function (
        check
      ) {
        if (
          (!temp && check.canUpdate === 1 && req.url.includes(check.url)) ||
          rolePermission[userRole].role.role_name === "admin"
        ) {
          return (temp = true);
        }
      });
    }

    if (temp) {
      return next();
    } else {
      return res
        .status(404)
        .json({ message: "Your role have no access. You can not update" });
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

    // Check if verifyToken is null or undefined
    if (!verifyToken) {
      return res.status(404).json({ message: "Token is null or undefined" });
    }

    req.user = verifyToken;
    // Get user id from payload
    const userId = verifyToken.id;

    // Get user id in user_role
    const rolePermission = await user_role.findAll({
      where: { user_id: userId },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "updateBy",
          "createBy",
          "isDeleted",
        ],
      },
      include: {
        model: role,
        attributes: {
          exclude: [
            "createBy",
            "updateBy",
            "createdAt",
            "updatedAt",
            "isDeleted",
          ],
        },
        include: {
          model: role_permission_form,
          attributes: {
            exclude: [
              "createBy",
              "updateBy",
              "createdAt",
              "updatedAt",
              "isDeleted",
            ],
          },
        },
      },
    });

    let temp = false;

    for (let userRole in rolePermission) {
      rolePermission[userRole].role.role_permission_forms.forEach(function (
        check
      ) {
        if (
          (!temp && check.canDelete === 1 && req.url.includes(check.url)) ||
          rolePermission[userRole].role.role_name === "admin"
        ) {
          return (temp = true);
        }
      });
    }

    if (temp) {
      return next();
    } else {
      return res
        .status(404)
        .json({ message: "Your role have no access. You can not delete" });
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

    // Check if verifyToken is null or undefined
    if (!verifyToken) {
      return res.status(404).json({ message: "Token is null or undefined" });
    }

    req.user = verifyToken;
    // Get user id from payload
    const userId = verifyToken.id;

    // Get user id in user_role
    const rolePermission = await user_role.findAll({
      where: { user_id: userId },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "updateBy",
          "createBy",
          "isDeleted",
        ],
      },
      include: {
        model: role,
        attributes: {
          exclude: [
            "createBy",
            "updateBy",
            "createdAt",
            "updatedAt",
            "isDeleted",
          ],
        },
        include: {
          model: role_permission_form,
          attributes: {
            exclude: [
              "createBy",
              "updateBy",
              "createdAt",
              "updatedAt",
              "isDeleted",
            ],
          },
        },
      },
    });

    let temp = false;

    for (let userRole in rolePermission) {
      rolePermission[userRole].role.role_permission_forms.forEach(function (
        check
      ) {
        if (
          (!temp && check.canApprove === 1 && req.url.includes(check.url)) ||
          rolePermission[userRole].role.role_name === "admin"
        ) {
          return (temp = true);
        }
      });
    }

    if (temp) {
      return next();
    } else {
      return res
        .status(404)
        .json({ message: "Your role have no access. You can not approve" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkCanRead,
  checkCanWrite,
  checkCanUpdate,
  checkCanDelete,
  checkCanApprove,
};
