const { User, Admin } = require("../db");
const { verifyUserToken, verifyUserVerifyToken } = require("../utilities/auth");
const { outErrors } = require("../utilities/errors");

const authUser = async (req, res, next) => {
  const token =
    req.headers?.authorization?.replace("Bearer ", "") ||
    req.query.token ||
    false;

  if (!token) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const decoded = verifyUserToken(token);

    const user = await User.findOne(
      {
        _id: decoded._id,
        session_key: decoded.sk,
        is_active: true,
        is_verified: true,
      },
      "-password -session_key -email_verification_token",
      { lean: true }
    );

    if (user == null) {
      return res.status(403).json({ message: "Not authorized" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return outErrors(error, res);
  }
};

const verifyUser = async (req, res, next) => {
  const token = req.query.token || false;

  if (!token) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const decoded = verifyUserVerifyToken(token);

    const user = await User.findOne(
      {
        _id: decoded._id,
        email_verification_token: decoded.evt,
        is_active: true,
        is_verified: false,
      },
      "_id",
      { lean: true }
    );

    if (user == null) {
      return res.status(403).json({ message: "Not authorized" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return outErrors(error, res);
  }
};

const authAdmin = async (req, res, next) => {
  const token =
    req.headers?.authorization?.replace("Bearer ", "") ||
    req.query.token ||
    false;

  if (!token) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const decoded = verifyUserToken(token);

    const admin = await Admin.findOne(
      {
        _id: decoded._id,
        session_key: decoded.sk,
      },
      "-password -session_key",
      { lean: true }
    );

    if (admin == null) {
      return res.status(403).json({ message: "Not authorized" });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  authUser,
  verifyUser,
  authAdmin,
};
