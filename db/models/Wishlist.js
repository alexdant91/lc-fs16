const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const WishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    versionKey: false,
  }
);

WishlistSchema.plugin(mongoosePaginate);

const Wishlist = model("Wishlist", WishlistSchema);

module.exports = Wishlist;
