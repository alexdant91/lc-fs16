const express = require("express");
const app = express.Router();

/**
 * @path /api/ping
 */
app.get("/ping", (_, res) => {
    return res.status(200).json({ message:"status online"})
})

/**
 * @path /api/users
 */

app.use("/users", require("./routes/users"))


module.exports = app;