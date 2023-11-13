const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const generateHashPassword = (password) => {
    return bcrypt.hashSync(password, 12);
    
}

const compareHashPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const generateUserToken = (payload) => {
    return jwt.sign(payload, process.env.SERVER_PRIVATE_KEY)
}

const verifyUserToken = (token) => {
    return jwt.verify(token, process.env.SERVER_PRIVATE_KEY)
}

module.exports = {
    generateHashPassword,
    compareHashPassword,
    generateUserToken,
    verifyUserToken,
    
}
