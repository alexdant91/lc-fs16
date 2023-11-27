const express = require("express");

const { authUser } = require("../../middleware/auth");
const {
  createNewRating,
  paginateAllRatings,
} = require("../../controllers/ratings");
const app = express.Router();

/**
 * Create new rating
 * @path /api/ratings/:product_id
 */
app.post("/:product_id", authUser, createNewRating);

/**
 * Paginate all product ratings
 * @path /api/ratings/:product_id
 */
app.get("/:product_id", authUser, paginateAllRatings);

module.exports = app;
