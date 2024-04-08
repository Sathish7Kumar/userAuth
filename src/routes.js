const express = require('express')
const bcrypt = require('bcrypt')
const UserAuth = require('./schema')
const generateToken = require('./token')
const verifyToken = require('./verifyToken')


const router = express.Router()

router.get('/',(req,res)=>{
    res.send({messgae:"Welcome Express"})
})

router.post('/users',async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const user = await UserAuth.findOne({email})

        if(user){
            res.send({message:"mail Id already exists"})
        }else{
            const hashPswd = await bcrypt.hash(password,10)
            const newUser = new UserAuth({name,email,password:hashPswd})
            await newUser.save()
            res.send({message:"User Created"})
        }
        
    } catch (error) {
        console.log("Error Creating User");
    }

})

router.post('/user/loginToken',async(req,res)=>{
    try {
       const {name,email,password} = req.body 
       const user = await UserAuth.findOne({email})
       if(user){
        const compare = await bcrypt.compare(password,user.password)
        if(compare){
            const token = generateToken(user)
            res.send(token)
        }else{
            res.send("invalid password")
        }
       }else{
         return res.send("can't find ur emailID / unauth access")
       }
    } catch (error) {
        
    }
})

router.get('/authUser',verifyToken,(req,res)=>{
    res.send({message:"Welcome User"})
})

router.get('/users',async(req,res)=>{
    try {
        const user = await UserAuth.find()
        res.send(user)
    } catch (error) {
        console.log("error Getting User");
    }
})

router.put("/users/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const {name,email,password} = req.body
        const hashPswd = await bcrypt.hash(password,10)
        await UserAuth.findByIdAndUpdate(id,{name,email,password:hashPswd})
        res.send({message:"User Updated"})
    } catch (error) {
        console.log("Error in Updating User" + error);  
    }
})

router.delete('/users/:id',async(req,res)=>{
    try {
        const id = req.params.id
        await UserAuth.findByIdAndDelete(id)
        res.send({message:"User Deleted"})
    } catch (error) {
        console.log("Error Deleting User" + error);
    }
})

module.exports = router



// "email": "satz@gmail.com",
// "password" : "251096" // $2b$10$tP9A85H8RpbnoSRywVP02OKAjca3eDD6hRuMhoaIu3KtCSy5DLcmO
