const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { sequelize } = require("./src/models");
const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");
const userRoleRoutes = require("./src/routes/user-role.routes");
const formRoutes = require("./src/routes/form.routes");
const moduleRoutes = require("./src/routes/module.routes");

// Dotenv config
dotenv.config();

// App Config
const app = express();
app.use(cors());
app.use(express.json());

// APIs
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoleRoutes);
app.use("/api/v1", formRoutes);
app.use("/api/v1", moduleRoutes);

// Listener
const port = process.env.PORT || 5002;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await sequelize.authenticate();
  console.log("DB Created");
});
