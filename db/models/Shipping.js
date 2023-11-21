const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ShippingSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  price: {
    type: Number,
    required: true
  }
}, { strict: true, timestamps: true, versionKey: false })

const Shipping = model("Shipping", ShippingSchema);

module.exports = Shipping;
