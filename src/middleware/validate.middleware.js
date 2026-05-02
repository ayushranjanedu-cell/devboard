import { validationResult } from "express-validator";

export const validate =(req,res,next)=>{
    const errors = validationResult(req);
    if(!error.empty()){
        return res.status(400).json({
            error:'Validation Failed',
            details: error.array().map(err=>({
                field:err.path,
                message:err.msg
            }))
        });
    }
    next();
};