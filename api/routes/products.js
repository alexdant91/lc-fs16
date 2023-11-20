const express = require("express");
const { createNewProduct, paginateAllProducts } = require("../../controllers/products");
const app = express.Router();

/**
 * create a new product
 * @path /api/products
 */
app.post('/', createNewProduct);

/**
 * products paginated
 * @path /api/products?page=1&limit=25
 */
app.get('/', paginateAllProducts);

module.exports = app;