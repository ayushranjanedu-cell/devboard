import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async(req,res,next)=>{
    try{
        // get token from header
        const authHeader = req.headers.authorization;
        if(!authHeader||!authHeader.startsWith('Bearer ')){
            return res.status(401).json({error:'No token provided'});
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(401).json({error:'User no longer exists'});
        }
        req.user=user;
        next();
        
    }catch(error){
        res.status(401).json({error:'Invalid or expired token'});
    }
};

export const isAdmin = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({error:'Admin access required'});
    }
    next();
};