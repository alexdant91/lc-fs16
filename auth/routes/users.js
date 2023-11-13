const express = require("express");
const { userLogin } = require("../../controllers/auth");
const app = express.Router()

/**
 * @path /auth/users/token
 */
app.post("/token", userLogin)

module.exports = app;