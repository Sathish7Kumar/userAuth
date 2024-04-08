const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const router = require('./src/routes')
const connectDB = require('./src/db')
connectDB()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/' , router)
const port = process.env.PORT

app.listen(port,()=>{
    console.log("server running in PORT :" + port);
})