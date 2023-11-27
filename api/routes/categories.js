const express = require("express");
const { createNewCategory } = require("../../controllers/categories");
const { authAdmin } = require("../../middleware/auth");
const app = express.Router();

/**
 * Create new category
 * @path /api/categories
 */
app.post("/", authAdmin, createNewCategory);

module.exports = app;
