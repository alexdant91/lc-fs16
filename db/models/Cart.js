const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  shipping: {
    type: Schema.Types.ObjectId,
    ref: 'Shipping',
    default: null
  },
  promo_code: {
    type: Schema.Types.ObjectId,
    ref: 'PromoCode',
    default: null
  },
}, { strict: true, timestamps: true, versionKey: false })

const Cart = model("Cart", CartSchema);

module.exports = Cart;
