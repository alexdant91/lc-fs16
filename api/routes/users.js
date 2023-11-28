const express = require("express");
const {
  updateUserPassword,
  createNewUser,
  recoveryUserPassword,
} = require("../../controllers/users");
const { authUserRecoveryPassword } = require("../../middleware/auth");
const app = express.Router();

/**
 * create new user
 * @path /api/users
 */
app.post("/", createNewUser);

/**
 * recovery user password
 * @path /api/users/recovery-password
 */
app.post("/recovery-password", recoveryUserPassword);

/**
 * update user password
 * @path /api/users/update-password
 */
app.post("/update-password", authUserRecoveryPassword, updateUserPassword);

module.exports = app;
