const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { User } = require("../../db");
const { generateHashPassword } = require("../../utilities/auth");


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
        password: Joi.string().regex(/[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]{8,}/i).required(),
    })

    try {
        const data = await schema.validateAsync(req.body)

        data.password = generateHashPassword(data.password)

        const user = (await new User(data).save()).toObject()

        return res.status(201).json(user)
    } catch (error) {
       return outErrors(error, res)
    }
};

module.exports = {
    createNewUser,

};