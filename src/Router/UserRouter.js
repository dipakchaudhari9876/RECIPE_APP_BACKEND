const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require("./../model/UserSchema")
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', async (req, res) => {
    try {
        const { email, password, Cpassword } = req.body
        const securePass = await bcrypt.hash(password, 12)

        const uploadData = new User({
            email, password: securePass, Cpassword: securePass
        })

        const saveData = await uploadData.save()
        if (saveData) {
            return res.status(201).json({ message: "Successfull Register",pass:securePass })
        }


    } catch (err) {
        return res.status(201).json({ error: "Invalid credentials" })

    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const data = await User.findOne({email})
        if(!data){
            return res.status(400).json({error:"Invalid credentials"})
        }
        const checkPass = await bcrypt.compare(password,data.password)

        if(!checkPass){
            return res.status(400).json({error:"Invalid credentials"})
        }else{
            const token = jwt.sign({id:data._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            return res.status(200).json({message:"Login Successfull",token:token})
        }


    }catch(err){
        return res.status(201).json({ error: "Invalid credentials" })
    }
})

module.exports = router