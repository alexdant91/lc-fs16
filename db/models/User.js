const mongoose = require("mongoose");
const crypto = require("crypto");
const {Schema, model} = mongoose;

const UserSchema = new Schema({
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
    is_active: {
        type: Boolean,
        default: true,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    email_verification_token: {
        type: String,
        default: crypto.randomBytes(12).toString("hex"),
    },
    session_key: {
        type: String,
        unique: true,
        default: crypto.randomBytes(12).toString("hex"),
    },
}, { strict: true, timestamps: true, versionKey: false })

const User = model("User", UserSchema);

module.exports = User;