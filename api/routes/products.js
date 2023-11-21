const express = require("express");
const { createNewProduct, paginateAllProducts, updateProductById, deleteProductById, getProductById } = require("../../controllers/products");
const { authAdmin } = require("../../middleware/auth");
const app = express.Router();

/**
 * create a new product
 * @path /api/products
 */
app.post('/', authAdmin, createNewProduct);

/**
 * products paginated
 * @path /api/products?page=1&limit=25
 */
app.get('/', paginateAllProducts);

/**
 * get product by id
 * @path /api/products/:id
 */
app.get('/:id', getProductById);

/**
 * update product by id
 * @path /api/products/:id
 */
app.put('/:id', authAdmin, updateProductById);

/**
 * delete product by id
 * @path /api/products/:id
 */
app.delete('/:id', authAdmin, deleteProductById);

module.exports = app;