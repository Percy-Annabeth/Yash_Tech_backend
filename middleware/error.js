const ErrorHandler = require("../utils/errorHandler");


module.exports=(err,req,res,next)=>{

    err.statusCode = err.statudCode || 500;
    err.message = err.message || "internal server error."

    //cast error (wrong mongodb id, etc, like only 9 digits of id.)
    if(err.name==="CastError"){
        const message=`resource not found. invalid : ${err.path}`;
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}