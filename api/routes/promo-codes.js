const express = require("express");
const { authAdmin } = require("../../middleware/auth");
const {
  createNewPromoCode,
  getAllPromoCodes,
  updatePromoCodeById,
  deletePromoCodeById,
} = require("../../controllers/promo-codes");
const app = express.Router();

/**
 * create new promo-code
 * @path /api/promo-codes
 */
app.post("/", authAdmin, createNewPromoCode);

/**
 * get all promo_codes
 * @path /api/promo-codes
 */
app.get("/", getAllPromoCodes);

/**
 * update promo-codes by id
 * @path /api/promo-codes/:id
 */
app.put("/:id", authAdmin, updatePromoCodeById);

/**
 * delete promo-codes by id
 * @path /api/promo-codes/:id
 */
app.delete("/:id", authAdmin, deletePromoCodeById);

module.exports = app;
