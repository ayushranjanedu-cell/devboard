export const errorHandler = (err,req,res,next)=>{
    console.error(err.stack);

    if(err.name === 'ValidatioError'){
        return res.status(400).json({
            error:  'Validation Error',
            details: Object.values(err.errors).map(e=>({
                field: e.path,
                message:e.message
            }))
        });
    }
 
    if(err.code = 11000){
        const field = err.keyvalue ? Object.keys(err.keyValue)[0]:'Field';
        return res.status(400).json({
            error:`${field} already exists` 
        });
    }

    if(err.name === 'JsonWebToken'){
        return res.status(401).json({
            error:'Invalid Token'
        });
    }

    if(err.name === 'TokenExpiredError'){
        return res.status(401).json({error:'Token Expired'});
    }

    if(err.name === 'CastError'){
        return res.status(400).json({error:'Invalid ID format'});
    }

    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
};