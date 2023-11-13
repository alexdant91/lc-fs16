const express = require("express");
const { createNewUser } = require("../../controllers/users");
const app = express.Router()

/**
 * create new user
 * @path /api/users
 */
app.post("/", createNewUser)


module.exports = app;