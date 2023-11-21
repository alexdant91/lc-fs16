const express = require("express")
const app = express.Router()

/**
 * @path /auth/users
 */
app.use("/users", require("./routes/users"))

/**
 * @path /auth/admins
 */
app.use("/admins", require("./routes/admins"))


module.exports = app;