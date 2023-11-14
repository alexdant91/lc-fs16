const express = require("express");
const { authUser } = require("../../middleware/auth");
const { getCurrentUserInfo } = require("../../controllers/me");
const app = express.Router()

/**
 * @path /api/me
 */
app.get("/", authUser, getCurrentUserInfo);


module.exports = app;