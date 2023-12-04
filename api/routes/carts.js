const express = require("express");
const { authUser } = require("../../middleware/auth");
const { addProduct, getCart, updateCart, deleteCart } = require("../../controllers/carts");
const app = express.Router();

/**
 * add product to cart
 * @path /api/carts
 */
app.post('/', authUser, addProduct);

/**
 * get user cart
 * @path /api/carts
 */
app.get('/', authUser, getCart);

/**
 * update cart product
 * @path /api/carts/:product_cart_id
 */
app.put('/:product_cart_id', authUser, updateCart);

/**
 * delete cart product
 * @path /api/carts/:product_cart_id
 */
app.delete('/:product_cart_id', authUser, deleteCart);

module.exports = app;