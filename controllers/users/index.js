const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { User, Cart } = require("../../db");
const {
  generateHashPassword,
  generateUserVerifyToken,
  generateUserPassToken,
} = require("../../utilities/auth");
const { sendMail } = require("../../utilities/mailer");

/**
 * Create new user
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/users
 * @method POST
 */
const createNewUser = async (req, res) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]{8,}/i)
      .required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    data.password = generateHashPassword(data.password);

    const user = (await new User(data).save()).toObject();

    await new Cart({
      user: user._id,
    }).save();

    const email_token = generateUserVerifyToken({
      _id: user._id,
      evt: user.email_verification_token,
    });

    const email_verification_link = `${process.env.SERVER_HOST}/auth/users/verify?token=${email_token}`;

    sendMail({
      to: user.email,
      subject: "verify your email",
      html: `
            <p>
                To verify your email follow the link <a href="${email_verification_link}">${email_verification_link}</a>.
            </p>
            `,
    });

    return res.status(201).json(user);
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Recovery user password
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/users/recovery-password
 * @method POST
 */
const recoveryUserPassword = async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const user = await User.findOne(
      { email: data.email, is_active: true, is_verified: true },
      null,
      {
        lean: true,
      }
    );

    if (user == null) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const token = generateUserPassToken({ _id: user._id, email: user.email });

    const url = `${process.env.CLIENT_HOST}${CLIENT_USER_PASS_RECOVERY_PATH}?token=${token}`;

    sendMail({
      to: user.email,
      subject: "Recovery password process",
      html: `
      <p>Recovery passsword process <a href="${url}">here</a></p>
      `,
    });

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Update user password from recovery process
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/users/update-password
 * @method POST
 */
const updateUserPassword = async (req, res) => {
  const _id = req.user._id;
  const schema = Joi.object().keys({
    password: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    data.password = generateHashPassword(data.password);

    await User.updateOne({ _id }, { password: data.password });

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  createNewUser,
  recoveryUserPassword,
  updateUserPassword,
};
