const { account } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { FORM_ENUMS } = require("../constants/form-enums");

const login = async (req, res) => {
  // Get email and password from body
  const { email, password } = req.body;

  // Check if emai and password are empty
  if (!email || !password) {
    return res
      .status(406)
      .json({ message: "Please provide email and password!" });
  }

  try {
    // Get email and password
    const userCredential = await account.findOne({
      where: { email, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if email do not exist
    if (!userCredential) {
      return res.status(404).json({ message: "Could not found email" });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      password,
      userCredential.password
    );

    if (!validPassword) {
      return res.status(404).json({ message: "Invalid password" });
    }

    // Signup token
    const token = jwt.sign(
      { id: userCredential.user_id },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      message: "Login Successfully",
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Login Failed" });
  }
};

module.exports = { login };
