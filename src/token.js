const jwt = require('jsonwebtoken')
const privateKey = "sathish"
const generateToken =  (user) => jwt.sign(
    {id:user.id},
    privateKey,
    {expiresIn : "2m"}
)
module.exports = generateToken
