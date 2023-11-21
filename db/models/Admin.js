const mongoose = require("mongoose");
const crypto = require("crypto");
const { Schema, model } = mongoose;

const AdminSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  session_key: {
    type: String,
    unique: true,
    default: crypto.randomBytes(12).toString("hex"),
  },
}, { strict: true, timestamps: true, versionKey: false })

const Admin = model("Admin", AdminSchema);

module.exports = Admin;