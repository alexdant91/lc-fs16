const express = require("express")
const app = express.Router()

/**
 * @path /auth/users
 */
app.use("/users", require("./routes/users"))


module.exports = app;