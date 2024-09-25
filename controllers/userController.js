const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

//register a user
exports.registerUser = catchAsyncErrors( async (req,res,next)=>{

    const {name,email,password}=req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"temp",
            url:"tempp"
        }
    });

    sendToken(user,201,res);


});

//login a user.

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email||!password){
        return next(new ErrorHandler("please enter both email and password",400));
    }
    const user = await User.findOne({email:email}.select("+password"));

    if(!user){
        return next(new ErrorHandler("please enter correct email and password",401))
    }
    
    //comparePassword method in user model. all password things and jwt token things are there and not in controller
    const isPasswordMatched =  await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("please enter correct password",401))
    }

    sendToken(user,200,res);


});