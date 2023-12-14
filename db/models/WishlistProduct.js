const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const WishlistProductSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "Wishlist",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  }
);

WishlistProductSchema.plugin(mongoosePaginate);

const WishlistProduct = model("WishlistProduct", WishlistProductSchema);

module.exports = WishlistProduct;
