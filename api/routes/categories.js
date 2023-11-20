const express = require("express");
const { createNewCategory } = require("../../controllers/categories");
const app = express.Router();

/**
 * Create new category
 * @path /api/categories
 */
app.post('/', createNewCategory);

module.exports = app;