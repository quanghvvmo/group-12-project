const { sequelize, user, account, form, user_role } = require("../models");
const bcrypt = require("bcrypt");

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
    createBy,
    updateBy,
  } = req.body;

  const avatar = req.file.path;

  try {
    // Initialize transaction
    const transaction = await sequelize.transaction();

    // Encode password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
        createBy,
        updateBy,
      },
      { transaction }
    );

    // Create new account
    const newAccount = await account.create(
      {
        user_id: newUser.id,
        email,
        password: hashedPassword,
        createBy,
        updateBy,
      },
      { transaction }
    );

    // Create role
    const addRole = await user_role.create(
      {
        user_id: newUser.id,
        role_id,
      },
      { transaction }
    );

    // Commit transaction
    await transaction.commit();

    return res.status(200).json({
      message: "Created New User Successfully",
      newUser,
      newAccount,
      addRole,
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(402).json({ message: "Create New User Failed" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Get all users
    const allUsers = await user.findAll({
      include: { model: user_role, attributes: { exclude: ["id"] } },
    });

    // const allUsers = await user.findAll({
    //   attributes: {
    //     exclude: ["id"],
    //   },
    // });

    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Users Not Found" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user id
    const userId = await user.findOne({
      where: { id },
      // Get account info of user and hide account id and password
      include: [
        { model: account, attributes: { exclude: ["id", "password"] } },
        { model: form, attributes: ["id"] },
        {
          model: user_role,
          attributes: {
            exclude: ["id", "createdAt", "updatedAt", "createBy", "updateBy"],
          },
        },
      ],
    });

    // Check if invalid user id
    if (!userId) {
      return res.status(404).json({ message: "Invalid User ID" });
    }

    return res.status(200).json({ message: "User Found", userId });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User Not Found" });
  }
};

const updateUser = async (req, res) => {
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

  const { id } = req.params;

  const avatar = req.file.path;

  try {
    // Initialize transaction
    const transaction = await sequelize.transaction();

    const userId = await user.findOne({ where: { id }, transaction });

    // Check if user does not exsist
    if (!userId) {
      res.status(404).json({
        message: "Invalid user ID",
      });
    }
    // Encode password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user info
    await userId.update(
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
      },
      { where: { id }, transaction }
    );

    // Update account info
    const accountUpdated = await account.update(
      {
        user_id: userId.id,
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
      userId,
      accountUpdated,
      updateRoleId,
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(402).json({ message: "Update User Failed" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Initialize transaction
    const transaction = await sequelize.transaction();

    // Get user id
    const userId = await user.findByPk(id);

    if (!userId) {
      return res.status(404).json({ message: "Invalid User ID" });
    }

    // Delete user
    await userId.destroy({
      where: { id },
      transaction,
    });

    // Delete account
    const accountId = await account.destroy({
      where: { user_id: id },
      transaction,
    });

    // Commit transaction
    await transaction.commit();

    return res.status(200).json({
      message: "Delete User and Account Successfully",
      accountId,
      userId,
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return res.status(404).json({ message: "Delete User and Account Failed" });
  }
};

// User Account APIs
const getAllAccounts = async (req, res) => {
  try {
    // Find all user accounts
    const accounts = await account.findAll({ include: { model: user } });

    if (!accounts) {
      return res.status(404).json({ message: "User Accounts Not Found" });
    }

    return res.status(200).json({ message: "User Accounts Found", accounts });
  } catch (error) {
    console.log(error);
  }
};

const getUserAccountById = async (req, res) => {
  const { id } = req.params;

  try {
    const accountId = await account.findOne({
      where: { id },
      include: { model: user },
    });

    if (!accountId) {
      return res.status(404).json({ message: "Invalid Account Id" });
    }

    return res.status(200).json({ message: "User Account Found", accountId });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User Account Not Found" });
  }
};

const updateUserAccount = async (req, res) => {
  const { id } = req.params;
  const { user_id, email, password } = req.body;

  try {
    // Initialize transaction
    const transaction = await sequelize.transaction();

    // Check user id
    const userId = await user.findOne({ where: { id: user_id } });

    if (!userId) {
      return res.status(404).json({ message: "User ID does not exist" });
    }

    // Get account id
    const accountId = await account.findOne({
      where: { id },
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
        user_id,
        email,
        password: hashedPassword,
      },
      { where: { id }, transaction }
    );

    // Update email to user
    // const userInfo = await user.update(
    //   {
    //     email,
    //   },
    //   { where: { id: user_id }, transaction }
    // );
    await userId.update(
      {
        email,
      },
      { where: { id: user_id }, transaction }
    );

    await transaction.commit();
    return res.status(200).json({
      message: "Update User Account Successfuly",
      accountInfo,
      userId,
    });
  } catch (error) {
    console.log(error);
    return res.status(204).json({ message: "Update User Account Failed" });
  }
};

const deleteUserAccount = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user account id
    const accountId = await account.findByPk(id);

    if (!accountId) {
      return res.status(404).json({ message: "Invalid Account ID" });
    }

    // Delete user account
    await accountId.destroy({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "Deleted User Account Successfully", accountId });
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
