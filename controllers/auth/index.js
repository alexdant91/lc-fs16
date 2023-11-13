const Joi = require("joi")
const { outErrors } = require("../../utilities/errors")
const { User } = require("../../db")
const { compareHashPassword, generateUserToken } = require("../../utilities/auth")


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
        password: Joi.string().required()
    })

    try {
        const data = await schema.validateAsync(req.body)

        const user = await User.findOne({ email: data.email, is_active: true, is_verified: true }, null, { lean: true })

        if(user == null){
            return res.status(403).json({ message: "Not authorized" })
        }

        const is_valid_password = compareHashPassword(data.password, user.password)

        if(!is_valid_password){
            return res.status(403).json({ message: "Not authorized" })
        }

        const token = generateUserToken({ _id: user._id, email: user.email, role: "USER", sk: user.session_key })

        return res.status(200).json({token})
    } catch (error) {
        return outErrors(error, res)
    }
}

module.exports = {
    userLogin
} 