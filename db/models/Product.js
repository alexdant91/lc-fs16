const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String, 
    default: null
  },
  price: {
    type: Number,
    required: true
  },
  categories: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    default: []
  },
  rating: {
    type: Number,
    default: 0
  },
  rating_count: {
    type: Number,
    default: 0
  },
  cover: {
    type: String,
    default: null
  },
  images: {
    type: [{
      type: String,
    }],
    default: []
  },
  discount: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    required: false
  }
}, { strict: true, timestamps: true, versionKey: false });


ProductSchema.pre('save', function (next) {
  this.slug = this.title.toLowerCase().replace(/\s+/ig, '-');
  return next();
})

ProductSchema.plugin(mongoosePaginate);

const Product = model('Product', ProductSchema);

module.exports = Product;