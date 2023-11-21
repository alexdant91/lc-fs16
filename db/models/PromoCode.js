const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PromoCodeSchema = new Schema({
  code: {
    type: String,
    required: true
  }, 
  value: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    enum: ['AMOUNT', 'PERCENTAGE']
  },
  start_limit: {
    type: Number,
    default: 0
  }
}, { strict: true, timestamps: true, versionKey: false })

const PromoCode = model("PromoCode", PromoCodeSchema);

module.exports = PromoCode;
