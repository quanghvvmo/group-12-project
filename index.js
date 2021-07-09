const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { sequelize } = require("./models");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const userRoleRoutes = require("./routes/user-role.routes");
const formRoutes = require("./routes/form.routes");
const moduleRoutes = require("./routes/module.routes");

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
