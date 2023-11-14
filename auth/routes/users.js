const express = require("express");
const { userLogin, verifySuccess } = require("../../controllers/auth");
const { verifyUser } = require("../../middleware/auth");
const app = express.Router();

/**
 * @path /auth/users/token
 */
app.post("/token", userLogin);

/**
 * @path /auth/users/verify
 */
app.get("/verify", verifyUser, verifySuccess);

module.exports = app;
