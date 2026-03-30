const userMOdel = require("../models/user.model")
const jwt = require('jsonwebtoken');


async function registerUser(req ,res) {
    const {username , email , password} = req.body;


    const isUserExist = await userMOdel.findOne({
        email
    })
    if(isUserExist){
        return res.status(409).json({
            massage: "User already exist with this email"
        })
    }

    const user = await userMOdel.create({
        username, email, password
    })
    const token = jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET)

    res.cookie('token',token)
    res.status(201).json({
        massage: "user registered successfully",
        user,
        
    })
}


module.exports = {registerUser}