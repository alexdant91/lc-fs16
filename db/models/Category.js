const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    default: null
  }
}, { strict: true, timestamps: true, versionKey: false });

const Category = model('Category', CategorySchema);

module.exports = Category;