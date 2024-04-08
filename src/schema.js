const mongoose = require('mongoose')

const userAuth = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const UserAuth = mongoose.model("UserAuth",userAuth)

module.exports = UserAuth


