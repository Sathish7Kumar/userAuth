const jwt = require('jsonwebtoken')
const UserAuth = require('./schema')
const privateKey = "sathish"

const verifyToken = (req,res,next) =>{
    const auth = req.headers.authorization
    if(auth){
        const token = auth.split(" ")[1]
        jwt.verify(token,privateKey,(err,decode)=>{
            if(err){
                res.send({message:"token invalid / expired"})
            }
            const user =  UserAuth.findOne({email:decode.email})
            if(!user){
                res.send({message:"token invalid / expired"})
            }
        })
        next()
        }
        else{
            res.send({message:"token needed to authorize"})
    }
}

module.exports = verifyToken