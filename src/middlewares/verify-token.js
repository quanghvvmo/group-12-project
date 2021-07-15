const jwt = require("jwt");

const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("jwt");

    // Check if have no token
    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }

    // Verify token
    const verifyToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verifyToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { verifyToken };
