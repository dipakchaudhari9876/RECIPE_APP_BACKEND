const User = require("./../model/UserSchema")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = async (req, res, next) => {
    try {
        const token = req.query.jwtoken
        if (!token) {
            return res.status(201).json({ error: "User not verified" })
        }
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)

        const user = await User.findOne({_id:verifyToken.id})
        if(!user){
            return res.status(201).json({ error: "User not verified" })
        }
        req.userid = user._id
        next()

    } catch (err) {
        return res.status(201).json({ error: "Invalid credentials" })
    }
}

module.exports = authenticate