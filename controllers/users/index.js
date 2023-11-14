const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { User } = require("../../db");
const {
  generateHashPassword,
  generateUserVerifyToken,
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

    const email_token = generateUserVerifyToken({
      _id: user.id,
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

module.exports = {
  createNewUser,
};
