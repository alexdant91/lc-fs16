const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const RatingSchema = new Schema(
  {
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    content: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { strict: true, timestamps: true, versionKey: false }
);

RatingSchema.plugin(mongoosePaginate);

const Rating = model("Rating", RatingSchema);

module.exports = Rating;
