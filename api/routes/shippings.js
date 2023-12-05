const express = require("express");
const { authAdmin } = require("../../middleware/auth");
const {
  createNewShipping,
  getAllShippings,
  updateShippingById,
  deleteShippingById,
} = require("../../controllers/shippings");
const app = express.Router();

/**
 * create new shipping
 * @path /api/shippings
 */
app.post("/", authAdmin, createNewShipping);

/**
 * get all shippings
 * @path /api/shippings
 */
app.get("/", getAllShippings);

/**
 * update shipping by id
 * @path /api/shippings/:id
 */
app.put("/:id", authAdmin, updateShippingById);

/**
 * delete shipping by id
 * @path /api/shippings/:id
 */
app.delete("/:id", authAdmin, deleteShippingById);

module.exports = app;
