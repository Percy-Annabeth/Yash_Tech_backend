const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("please login to access this resource",401));
    }

    decodedData = jwt.verify(token,process.env.SECRET_KEY);

    req.user = await User.findById(decodedData.id);
});
