const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { User, Admin } = require("../../db");
const {
  compareHashPassword,
  generateUserToken,
} = require("../../utilities/auth");

/**
 * Login user
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /auth/users/token
 * @method POST
 */
const userLogin = async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const user = await User.findOne(
      { email: data.email, is_active: true, is_verified: true },
      null,
      { lean: true }
    );

    if (user == null) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const is_valid_password = compareHashPassword(data.password, user.password);

    if (!is_valid_password) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const token = generateUserToken({
      _id: user._id,
      email: user.email,
      role: "USER",
      sk: user.session_key,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return outErrors(error, res);
  }
};

const verifySuccess = async (req, res) => {
  try {
    await User.updateOne({ _id: req.user._id }, { is_verified: true });
    return res.status(200).json({ message: "Email verified" });
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Login admin
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /auth/admins/token
 * @method POST
 */
const adminLogin = async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const admin = await Admin.findOne(
      { email: data.email },
      null,
      { lean: true }
    );

    if (admin == null) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const is_valid_password = compareHashPassword(data.password, admin.password);

    if (!is_valid_password) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const token = generateUserToken({
      _id: admin._id,
      email: admin.email,
      role: "ADMIN",
      sk: admin.session_key,
    });

    return res.status(200).json({ token });
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  userLogin,
  verifySuccess,
  adminLogin,
};
