const userModel = require ('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser (req,res){
    const jwtSecret = process.env.JWT_SECRET || process.env.JWT_secret;
    const {username,email,password,role} = req.body;

    if (!jwtSecret){
        return res.status(500).json({
            message:"JWT secret is not configured"
        })
    }

    if (!username || !email || !password){
        return res.status(400).json({
            message:"username, email and password are required"
        })
    }


    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if (isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password:hash,
        role
    })

    const token = jwt.sign({
        id:user._id,
        role:user.role,
    },jwtSecret)

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        },
    })

}   




async function loginUser(req,res){
    const jwtSecret = process.env.JWT_SECRET || process.env.JWT_secret;
    const {username,email,password} =req.body;

    if (!jwtSecret){
        return res.status(500).json({
            message:"JWT secret is not configured"
        })
    }

    if (!password || (!username && !email)){
        return res.status(400).json({
            message:"username or email, and password are required"
        })
    }

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if (!user){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const isPasswordvalid = await bcrypt.compare(password,user.password)

    if (!isPasswordvalid){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        role:user.role,
    },jwtSecret)

    res.cookie('token',token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
    })

}

module.exports={
    registerUser,loginUser
}