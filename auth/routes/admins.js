const express = require("express");
const { adminLogin } = require("../../controllers/auth");
const app = express.Router();

/**
 * @path /auth/admins/token
 */
app.post("/token", adminLogin);

module.exports = app;
