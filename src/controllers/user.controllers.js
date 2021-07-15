const {
  sequelize,
  user,
  account,
  form,
  user_role,
  role,
} = require("../models");
const bcrypt = require("bcrypt");
const { sendMail } = require("./mail.controllers");
const EventEmitter = require("events");
const emailEvent = new EventEmitter();
const { ROLE_ENUMS } = require("../constants/role-enums");
const { FORM_ENUMS } = require("../constants/form-enums");

// User APIs
const createNewUser = async (req, res) => {
  const {
    employee_code,
    firstname,
    lastname,
    email,
    phone,
    identification_card,
    social_insurance,
    address,
    department,
    parent,
    position,
    password,
    role_id,
  } = req.body;

  const avatar = req.file.path;

  try {
    // Initialize transaction
    const transaction = await sequelize.transaction();

    // Get email from database
    const checkEmail = await user.findOne(
      { where: { email, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED } },
      { transaction }
    );

    // Check if email is existed
    if (checkEmail) {
      return res.status(409).json({
        message:
          "Email is already used by another account. Please use a new email",
      });
    }

    // Encode password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Get user id from token
    const adminId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll(
      {
        where: {
          user_id: adminId,
          isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED,
        },
        include: { model: role },
      },
      { transaction }
    );

    // Check if admin then can create new user
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Create new user
        const newUser = await user.create(
          {
            employee_code,
            firstname,
            lastname,
            email,
            phone,
            avatar,
            identification_card,
            social_insurance,
            address,
            department,
            parent,
            position,
            createBy: adminId,
            updateBy: adminId,
          },
          { transaction }
        );

        // Create new account
        const newAccount = await account.create(
          {
            user_id: newUser.id,
            email,
            password: hashedPassword,
            createBy: adminId,
            updateBy: adminId,
          },
          { transaction }
        );

        // Create role
        const addRole = await user_role.create(
          {
            user_id: newUser.id,
            role_id,
            createBy: adminId,
            updateBy: adminId,
          },
          { transaction }
        );

        // Define subject and text for email
        const subject = "[Register] - HRM Register Notification";
        const text = `Your account is created`;

        // Initialize an event
        emailEvent.on("createNewUser", async () => {
          await sendMail(email, subject, text);
        });

        // Emit event
        emailEvent.emit("createNewUser");

        // Commit transaction
        await transaction.commit();

        return res.status(201).json({
          message: "Created New User Successfully",
          newUser,
          newAccount,
          addRole,
        });
      } else {
        return res
          .status(403)
          .json({ message: "You have no permission to create new user" });
      }
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(400).json({ message: "Create New User Failed" });
  }
};

const getAllUsers = async (req, res) => {
  const { page, size } = req.query;

  const pageSize = parseInt(size);
  const currentPage = parseInt(page);

  try {
    // Get user id from token
    const userIdToken = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: {
        user_id: userIdToken,
        isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED,
      },
      include: { model: role },
    });

    // Check if admin then can get all users
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Get all users
        const allUsers = await user.findAll({
          where: { isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
          include: { model: user_role, attributes: { exclude: ["id"] } },
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
        });

        // Count number of users
        let count = allUsers.length;

        return res.status(200).json({ count, allUsers });
      } else {
        return res.status(403).json({
          message: "You have no permission to get all users information",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Users Not Found" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user id from token
    const userId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can get user info detail
    for (let checkAdmin in checkRole) {
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        userId === id
      ) {
        // Get user id
        const userId = await user.findOne({
          where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
          // Get account info of user and hide account id and password
          include: [
            { model: account, attributes: { exclude: ["id", "password"] } },
            { model: form, attributes: ["id"] },
            {
              model: user_role,
              attributes: {
                exclude: [
                  "id",
                  "createdAt",
                  "updatedAt",
                  "createBy",
                  "updateBy",
                ],
              },
            },
          ],
        });

        // Check if invalid user id
        if (!userId) {
          return res.status(404).json({ message: "Invalid User ID" });
        }

        return res.status(200).json({ message: "User Found", userId });
      } else {
        return res
          .status(403)
          .json({ message: "You have no permission to read user information" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User Not Found" });
  }
};

const updateUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    identification_card,
    social_insurance,
    address,
    department,
    parent,
    position,
    password,
    role_id,
  } = req.body;

  const { id } = req.params;

  const avatar = req.file.path;

  try {
    // Initialize transaction
    const transaction = await sequelize.transaction();

    // Get email from database
    const checkEmail = await user.findOne(
      { where: { email, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED } },
      { transaction }
    );

    // Check if email is existed
    if (checkEmail) {
      return res.status(409).json({
        message:
          "Email is already used by another account. Please use a new email",
      });
    }

    // Encode password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Get user id from token
    const userId = req.user.id;

    // Check if user does not exsist
    if (!userId) {
      res.status(404).json({
        message: "Invalid user ID",
      });
    }

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin then can update user info
    for (let checkAdmin in checkRole) {
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        userId === id
      ) {
        // Update user info
        const userUpdated = await user.update(
          {
            firstname,
            lastname,
            email,
            phone,
            avatar,
            identification_card,
            social_insurance,
            address,
            department,
            parent,
            position,
          },
          { where: { id }, transaction }
        );

        // Update account info
        const accountUpdated = await account.update(
          {
            user_id: userId,
            email,
            password: hashedPassword,
          },
          { where: { user_id: id }, transaction }
        );

        // Update role id to  role
        const updateRoleId = await user_role.update(
          {
            user_id: id,
            role_id,
          },
          { where: { user_id: id }, transaction }
        );

        // Commit transaction
        await transaction.commit();

        return res.status(200).json({
          message: "Update User and Account Successfully",
          userUpdated,
          accountUpdated,
          updateRoleId,
        });
      } else {
        return res.status(403).json({
          message: "You have no permission to update this user information",
        });
      }
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(400).json({ message: "Update User Failed" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Initialize transaction
    const transaction = await sequelize.transaction();

    // Get user id
    const userCheck = await user.findOne({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Get user id from token
    const userId = req.user.id;

    if (!userId === userCheck.id) {
      return res.status(404).json({ message: "Invalid User ID" });
    }

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
      transaction,
    });

    // Check if admin then can delete user
    for (let checkAdmin in checkRole) {
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        userId === id
      ) {
        // Delete user
        await userCheck.update(
          {
            isDeleted: FORM_ENUMS.IS_DELETE.DELETED,
          },
          { where: { id }, transaction }
        );

        // Delete account
        const accountId = await account.update(
          {
            isDeleted: FORM_ENUMS.IS_DELETE.DELETED,
          },
          { where: { user_id: id }, transaction }
        );

        // Commit transaction
        await transaction.commit();

        return res.status(200).json({
          message: "Delete User and Account Successfully",
          accountId,
        });
      } else {
        return res.status(403).json({
          message: "You have no permission to delete this user information",
        });
      }
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(400).json({ message: "Delete User and Account Failed" });
  }
};

// User Account APIs
const getAllAccounts = async (req, res) => {
  try {
    // Get user id from token
    const userIdToken = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: {
        user_id: userIdToken,
        isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED,
      },
      include: { model: role },
    });

    // Check if admin then can get all accounts
    for (let checkAdmin in checkRole) {
      if (checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN) {
        // Find all user accounts
        const accounts = await account.findAll({
          where: { isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
          include: { model: user },
        });

        if (!accounts) {
          return res.status(404).json({ message: "User Accounts Not Found" });
        }

        return res
          .status(200)
          .json({ message: "User Accounts Found", accounts });
      } else {
        return res.status(403).json({
          message:
            "You have no permission to get all user accounts information",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Get all accounts failed",
    });
  }
};

const getUserAccountById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user id from token
    const userId = req.user.id;

    // Get user owns account
    const userIdAccount = await account.findOne({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Check if admin or user owns account then can get user account info detail
    for (let checkAdmin in checkRole) {
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        userIdAccount
      ) {
        const accountId = await account.findOne({
          where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
          include: { model: user },
        });

        if (!accountId) {
          return res.status(404).json({ message: "Invalid Account Id" });
        }

        return res
          .status(200)
          .json({ message: "User Account Found", accountId });
      } else {
        return res.status(403).json({
          message: "You have no permission to get user account information",
          accountId,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "User Account Not Found" });
  }
};

const updateUserAccount = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    // Initialize transaction
    const transaction = await sequelize.transaction();

    // Get user id from token
    const userIdToken = req.user.id;

    // Get user id from user table
    const userId = await user.findOne({
      where: { id: userIdToken, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if invalid user id
    if (!userId === userIdToken) {
      return res.status(404).json({ message: "User ID does not exist" });
    }

    // Get role name
    const checkRole = await user_role.findAll({
      where: {
        user_id: userIdToken,
        isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED,
      },
      include: { model: role },
    });

    // Check if admin then can update user account info
    for (let checkAdmin in checkRole) {
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        userIdToken === userId.id
      ) {
        // Get account id
        const accountId = await account.findOne({
          where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
          transaction,
        });

        // Check if account id is invalid
        if (!accountId) {
          return res.status(404).json({ message: "Invalid Account ID" });
        }

        // Encode password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update account info
        const accountInfo = await account.update(
          {
            user_id: userIdToken,
            email,
            password: hashedPassword,
          },
          { where: { id }, transaction }
        );

        // Update email to user table
        await userId.update(
          {
            email,
          },
          { where: { id: userIdToken }, transaction }
        );

        await transaction.commit();
        return res.status(200).json({
          message: "Update User Account Successfuly",
          accountInfo,
          userId,
        });
      } else {
        return res.status(403).json({
          message: "You have no permission to update user account information",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Update User Account Failed" });
  }
};

const deleteUserAccount = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user account id from database
    const accounts = await account.findOne({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: user },
    });

    // Get user id from token
    const userIdToken = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: {
        user_id: userIdToken,
        isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED,
      },
      include: { model: role },
    });

    // Check if admin then can update user account info
    for (let checkAdmin in checkRole) {
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        userIdToken === accounts.user.id
      ) {
        // Get user account id
        const accountId = await account.findOne({
          where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
        });

        if (!accountId) {
          return res.status(404).json({ message: "Invalid Account ID" });
        }

        // Delete user account
        await accountId.update(
          {
            isDeleted: FORM_ENUMS.IS_DELETE.DELETED,
          },
          { where: { id } }
        );

        return res
          .status(200)
          .json({ message: "Deleted User Account Successfully", accountId });
      } else {
        return res.status(403).json({
          message: "You have no permission to delete this user account",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Delete User Account Failed" });
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllAccounts,
  getUserAccountById,
  updateUserAccount,
  deleteUserAccount,
};
