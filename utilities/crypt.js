const crypto = require("crypto");

const generateRandomString = (length = 6) => {
  return crypto.randomBytes(length).toString("hex");
};

module.exports = {
  generateRandomString,
};
