const express = require("express");
const { authUser } = require("../../middleware/auth");
const { createNewWishlist, updateWishlistInfo, addWishlistProduct, deleteWishlistProduct, deleteWishlist,  getWhistlistById, getAllWishlists } = require("../../controllers/wishlists");
const app = express.Router();

/**
 * get all wishlists
 * @path /api/wishlists
 */
app.get("/", authUser, getAllWishlists);

/**
 * get wishlistById
 * @path /api/wishlists/:id
 */
app.get("/:id", authUser, getWhistlistById);

/**
 * create a new wishlist
 * @path /api/wishlists
 */
app.post("/", authUser, createNewWishlist);

/**
 * update wishlistInfo
 * @path /api/wishlists/info/:id
 */
app.put("/info/:id", authUser, updateWishlistInfo);

/**
 * add addWishlistProduct
 * @path /api/wishlists/products/:id
 */
app.post("/products/:id", authUser, addWishlistProduct);

/**
 * delete Wishlist
 * @path /api/wishlists/:id
 */
app.delete("/:id", authUser, deleteWishlist);

/**
 * delete addWishlistProduct
 * @path /api/wishlists/products/:id
 */
app.delete("/products/:id", authUser, deleteWishlistProduct);


module.exports = app;
