const express = require("express");
const { authUser } = require("../../middleware/auth");
const { createNewWishlist } = require("../../controllers/wishlists");
const app = express.Router();

/**
 * create a new wishlist
 * @path /api/wishlists
 */
app.post("/", authUser, createNewWishlist);

module.exports = app;
