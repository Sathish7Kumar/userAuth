const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = async () =>{
    try {
       await mongoose.connect(process.env.MONGODB) 
       console.log("DB Connected Successfully");
    } catch (error) {
        console.log("Error connecting dataBase" + error);
    }
}

module.exports = connectDB


