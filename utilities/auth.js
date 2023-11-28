const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateHashPassword = (password) => {
  return bcrypt.hashSync(password, 12);
};

const compareHashPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const generateUserToken = (payload) => {
  return jwt.sign(payload, process.env.SERVER_PRIVATE_KEY);
};

const verifyUserToken = (token) => {
  return jwt.verify(token, process.env.SERVER_PRIVATE_KEY);
};

const generateUserVerifyToken = (payload) => {
  return jwt.sign(
    { ...payload, scope: "EMAIL_VERIFICATION_PROCESS" },
    process.env.SERVER_PRIVATE_KEY
  );
};

const verifyUserVerifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.SERVER_PRIVATE_KEY);
  if (decoded.scope !== "EMAIL_VERIFICATION_PROCESS") {
    throw new Error("invalid token");
  }
  return decoded;
};

const generateUserPassToken = (payload) => {
  return jwt.sign(
    { ...payload, scope: "RECOVERY_PASSWORD_PROCESS" },
    process.env.SERVER_PRIVATE_KEY
  );
};

const verifyUserPassToken = (token) => {
  const decoded = jwt.verify(token, process.env.SERVER_PRIVATE_KEY);
  if (decoded.scope !== "RECOVERY_PASSWORD_PROCESS") {
    throw new Error("invalid token");
  }
  return decoded;
};

module.exports = {
  generateHashPassword,
  compareHashPassword,
  generateUserToken,
  verifyUserToken,
  generateUserVerifyToken,
  verifyUserVerifyToken,
  generateUserPassToken,
  verifyUserPassToken,
};
