const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  qnt: {
    type: Number,
    default: 1
  }
}, { strict: true, timestamps: true, versionKey: false })

const CartProduct = model("CartProduct", CartProductSchema);

module.exports = CartProduct;
