const express = require("express");
const app = express.Router();

/**
 * @path /api/ping
 */
app.get("/ping", (_, res) => {
    return res.status(200).json({ message: "status online" })
})

/**
 * @path /api/users
 */
app.use("/users", require("./routes/users"))

/**
 * @path /api/me
 */
app.use("/me", require("./routes/me"))

/**
 * @path /api/products
 */
app.use("/products", require("./routes/products"))

/**
 * @path /api/categories
 */
app.use("/categories", require("./routes/categories"))



module.exports = app;