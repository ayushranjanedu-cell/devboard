import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


// Generate JWT Token
const generateToken = (userId)=>{
    return jwt.sign(
            {userId},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
    );
};

// Register
export const register = async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.staus(400).json({error:'Email already registered'});
        }

        const hashedPassword = await bcrypt.hash(password,12);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        
        const token = generateToken(user._id);
        res.status(201).json({
            message:'User registered Successfully',
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

// Login
export const login = async(req,res)=>{
    try{
        const{email,password}=req.body;
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:'Invalid email or password'});   
        }
        // verify Password
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({error:'Invalid email or password'});
        }
        const token = generateToken(user._id);

        res.status(201).json({
            message:'Login Successful',
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }catch(error){
        res.status(500).json({error:error.message});
    }
};